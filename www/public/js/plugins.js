 /*-------------------------------  validate  ------------------------------------*/

    $.extend($.fn, {
        validateDelegate: function(delegate, type, handler) {
            return this.bind(type, function(event) {
                var target = $(event.target);
                if (target.is(delegate)) {
                    return handler.apply(target, arguments);
                }
            });
        }
    });

    $.extend($.fn, {
        // http://jqueryvalidation.org/validate/
        validate: function(options) {

            // if nothing is selected, return nothing; can't chain anyway
            if (!this.length) {
                if (options && options.debug && window.console) {
                    console.warn("Nothing selected, can't validate, returning nothing.");
                }
                return;
            }

            // check if a validator for this form was already created
            var validator = $.data(this[0], "validator");
            if (validator) {
                return validator;
            }

            // Add novalidate tag if HTML5.
            this.attr("novalidate", "novalidate");

            validator = new $.validator(options, this[0]);
            $.data(this[0], "validator", validator);

            if (validator.settings.onsubmit) {

                this.validateDelegate(":submit", "click", function(event) {
                    if (validator.settings.submitHandler) {
                        validator.submitButton = event.target;
                    }
                    // allow suppressing validation by adding a cancel class to the submit button
                    if ($(event.target).hasClass("cancel")) {
                        validator.cancelSubmit = true;
                    }

                    // allow suppressing validation by adding the html5 formnovalidate attribute to the submit button
                    if ($(event.target).attr("formnovalidate") !== undefined) {
                        validator.cancelSubmit = true;
                    }
                });

                // validate the form on submit
                this.submit(function(event) {
                    if (validator.settings.debug) {
                        // prevent form submit to be able to see console output
                        event.preventDefault();
                    }

                    function handle() {
                        var hidden, result;
                        if (validator.settings.submitHandler) {
                            if (validator.submitButton) {
                                // insert a hidden input as a replacement for the missing submit button
                                hidden = $("<input type='hidden'/>")
                                    .attr("name", validator.submitButton.name)
                                    .val($(validator.submitButton).val())
                                    .appendTo(validator.currentForm);
                            }
                            result = validator.settings.submitHandler.call(validator, validator.currentForm, event);
                            if (validator.submitButton) {
                                // and clean up afterwards; thanks to no-block-scope, hidden can be referenced
                                hidden.remove();
                            }
                            if (result !== undefined) {
                                return result;
                            }
                            return false;
                        }
                        return true;
                    }

                    // prevent submit for invalid forms or custom submit handlers
                    if (validator.cancelSubmit) {
                        validator.cancelSubmit = false;
                        return handle();
                    }
                    if (validator.form()) {
                        if (validator.pendingRequest) {
                            validator.formSubmitted = true;
                            return false;
                        }
                        return handle();
                    } else {
                        validator.focusInvalid();
                        return false;
                    }
                });
            }

            return validator;
        },
        // http://jqueryvalidation.org/valid/
        valid: function() {
            var valid, validator, errorList;

            if ($(this[0]).is("form")) {
                valid = this.validate().form();
            } else if ($(this[0]).is("div")) {
                valid = this.validate().form();
            } else {
                errorList = [];
                valid = true;
                validator = $(this[0].form).validate();
                this.each(function() {
                    valid = validator.element(this) && valid;
                    errorList = errorList.concat(validator.errorList);
                });
                validator.errorList = errorList;
            }
            return valid;
        },
        // attributes: space separated list of attributes to retrieve and remove
        removeAttrs: function(attributes) {
            var result = {},
                $element = this;
            $.each(attributes.split(/\s/), function(index, value) {
                result[value] = $element.attr(value);
                $element.removeAttr(value);
            });
            return result;
        },
        // http://jqueryvalidation.org/rules/
        rules: function(command, argument) {
            var element = this[0],
                settings, staticRules, existingRules, data, param, filtered;

            if (command) {
                settings = $.data(element.form, "validator").settings;
                staticRules = settings.rules;
                existingRules = $.validator.staticRules(element);
                switch (command) {
                    case "add":
                        $.extend(existingRules, $.validator.normalizeRule(argument));
                        // remove messages from rules, but allow them to be set separately
                        delete existingRules.messages;
                        staticRules[element.name] = existingRules;
                        if (argument.messages) {
                            settings.messages[element.name] = $.extend(settings.messages[element.name], argument.messages);
                        }
                        break;
                    case "remove":
                        if (!argument) {
                            delete staticRules[element.name];
                            return existingRules;
                        }
                        filtered = {};
                        $.each(argument.split(/\s/), function(index, method) {
                            filtered[method] = existingRules[method];
                            delete existingRules[method];
                            if (method === "required") {
                                $(element).removeAttr("aria-required");
                            }
                        });
                        return filtered;
                }
            }

            data = $.validator.normalizeRules(
                $.extend({},
                    $.validator.classRules(element),
                    $.validator.attributeRules(element),
                    $.validator.dataRules(element),
                    $.validator.staticRules(element)
                ), element);

            // make sure required is at front
            if (data.required) {
                param = data.required;
                delete data.required;
                data = $.extend({
                    required: param
                }, data);
                $(element).attr("aria-required", "true");
            }

            // make sure remote is at back
            if (data.remote) {
                param = data.remote;
                delete data.remote;
                data = $.extend(data, {
                    remote: param
                });
            }

            return data;
        }
    });

    // Custom selectors
    $.extend($.expr[":"], {
        // http://jqueryvalidation.org/blank-selector/
        blank: function(a) {
            return !$.trim("" + $(a).val());
        },
        // http://jqueryvalidation.org/filled-selector/
        filled: function(a) {
            return !!$.trim("" + $(a).val());
        },
        // http://jqueryvalidation.org/unchecked-selector/
        unchecked: function(a) {
            return !$(a).prop("checked");
        }
    });

    // constructor for validator
    $.validator = function(options, form) {
        this.settings = $.extend(true, {}, $.validator.defaults, options);
        this.currentForm = form;
        this.init();
    };

    // http://jqueryvalidation.org/jQuery.validator.format/
    $.validator.format = function(source, params) {
        if (arguments.length === 1) {
            return function() {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.validator.format.apply(this, args);
            };
        }
        if (arguments.length > 2 && params.constructor !== Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor !== Array) {
            params = [params];
        }
        $.each(params, function(i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), function() {
                return n;
            });
        });
        return source;
    };

    $.extend($.validator, {

        defaults: {
            messages: {},
            groups: {},
            rules: {},
            errorClass: "error",
            validClass: "valid",
            errorElement: "label",
            focusCleanup: false,
            focusInvalid: true,
            errorContainer: $([]),
            errorLabelContainer: $([]),
            onsubmit: true,
            ignore: ":hidden",
            ignoreTitle: false,
            onfocusin: function(element) {
                this.lastActive = element;

                // Hide error label and remove error class on focus if enabled
                if (this.settings.focusCleanup) {
                    if (this.settings.unhighlight) {
                        this.settings.unhighlight.call(this, element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.hideThese(this.errorsFor(element));
                }
            },
            onfocusout: function(element) {
                if (!this.checkable(element) && (element.name in this.submitted || !this.optional(element))) {
                    this.element(element);
                }
            },
            onkeyup: function(element, event) {
                if (event.which === 9 && this.elementValue(element) === "") {
                    return;
                } else if (element.name in this.submitted || element === this.lastElement) {
                    this.element(element);
                }
            },
            onclick: function(element) {
                // click on selects, radiobuttons and checkboxes
                if (element.name in this.submitted) {
                    this.element(element);

                    // or option elements, check parent select in that case
                } else if (element.parentNode.name in this.submitted) {
                    this.element(element.parentNode);
                }
            },
            highlight: function(element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).addClass(errorClass).removeClass(validClass);
                } else {
                    $(element).addClass(errorClass).removeClass(validClass);
                }
            },
            unhighlight: function(element, errorClass, validClass) {
                if (element.type === "radio") {
                    this.findByName(element.name).removeClass(errorClass).addClass(validClass);
                } else {
                    $(element).removeClass(errorClass).addClass(validClass);
                }
            }
        },

        // http://jqueryvalidation.org/jQuery.validator.setDefaults/
        setDefaults: function(settings) {
            $.extend($.validator.defaults, settings);
        },

        messages: {
            required: "This field is required.",
            remote: "Please fix this field.",
            email: "Please enter a valid email address.",
            url: "Please enter a valid URL.",
            date: "Please enter a valid date.",
            dateISO: "Please enter a valid date ( ISO ).",
            number: "Please enter a valid number.",
            digits: "Please enter only digits.",
            creditcard: "Please enter a valid credit card number.",
            equalTo: "Please enter the same value again.",
            maxlength: $.validator.format("Please enter no more than {0} characters."),
            minlength: $.validator.format("Please enter at least {0} characters."),
            rangelength: $.validator.format("Please enter a value between {0} and {1} characters long."),
            range: $.validator.format("Please enter a value between {0} and {1}."),
            max: $.validator.format("Please enter a value less than or equal to {0}."),
            min: $.validator.format("Please enter a value greater than or equal to {0}.")
        },

        autoCreateRanges: false,

        prototype: {

            init: function() {
                this.labelContainer = $(this.settings.errorLabelContainer);
                this.errorContext = this.labelContainer.length && this.labelContainer || $(this.currentForm);
                this.containers = $(this.settings.errorContainer).add(this.settings.errorLabelContainer);
                this.submitted = {};
                this.valueCache = {};
                this.pendingRequest = 0;
                this.pending = {};
                this.invalid = {};
                this.reset();

                var groups = (this.groups = {}),
                    rules;
                $.each(this.settings.groups, function(key, value) {
                    if (typeof value === "string") {
                        value = value.split(/\s/);
                    }
                    $.each(value, function(index, name) {
                        groups[name] = key;
                    });
                });
                rules = this.settings.rules;
                $.each(rules, function(key, value) {
                    rules[key] = $.validator.normalizeRule(value);
                });

                function delegate(event) {
                    var validator, form, eventType;
                    form = this[0].form;

                    if (!form) {
                        form = $(this).closest("div[data-form='true']").get(0);
                    }
                    validator = $.data(form, "validator"),
                    eventType = "on" + event.type.replace(/^validate/, ""),
                    this.settings = validator.settings;
                    if (this.settings[eventType] && !this.is(this.settings.ignore)) {
                        this.settings[eventType].call(validator, this[0], event);
                    }
                }
                $(this.currentForm)
                    .validateDelegate(":text, [type='password'], [type='file'], select, textarea, " +
                        "[type='number'], [type='search'] ,[type='tel'], [type='url'], " +
                        "[type='email'], [type='datetime'], [type='date'], [type='month'], " +
                        "[type='week'], [type='time'], [type='datetime-local'], " +
                        "[type='range'], [type='color'], [type='radio'], [type='checkbox']",
                        "focusin focusout keyup", delegate)
                // Support: Chrome, oldIE
                // "select" is provided as event.target when clicking a option
                .validateDelegate("select, option, [type='radio'], [type='checkbox']", "click", delegate);

                if (this.settings.invalidHandler) {
                    $(this.currentForm).bind("invalid-form.validate", this.settings.invalidHandler);
                }

                // Add aria-required to any Static/Data/Class required fields before first validation
                // Screen readers require this attribute to be present before the initial submission http://www.w3.org/TR/WCAG-TECHS/ARIA2.html
                $(this.currentForm).find("[required], [data-rule-required], .required").attr("aria-required", "true");
            },

            // http://jqueryvalidation.org/Validator.form/
            form: function() {
                this.checkForm();
                $.extend(this.submitted, this.errorMap);
                this.invalid = $.extend({}, this.errorMap);
                if (!this.valid()) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                }
                this.showErrors();
                return this.valid();
            },

            checkForm: function() { 
                this.prepareForm();
                for ( var i = 0, elements = (this.currentElements = this.elements()); elements[i]; i++ ) {
                    if (this.findByName( elements[i].name ).length != undefined && this.findByName( elements[i].name ).length > 1) {
                        for (var cnt = 0; cnt < this.findByName( elements[i].name ).length; cnt++) {
                                this.check( this.findByName( elements[i].name )[cnt] );
                        }
                    } else {
                        this.check( elements[i] );
                    }
                }
                return this.valid();
            },

            // http://jqueryvalidation.org/Validator.element/
            element: function(element) {
                var cleanElement = this.clean(element),
                    checkElement = this.validationTargetFor(cleanElement),
                    result = true;

                this.lastElement = checkElement;

                if (checkElement === undefined) {
                    delete this.invalid[cleanElement.name];
                } else {
                    this.prepareElement(checkElement);
                    this.currentElements = $(checkElement);

                    result = this.check(checkElement) !== false;
                    if (result) {
                        delete this.invalid[checkElement.name];
                    } else {
                        this.invalid[checkElement.name] = true;
                    }
                }
                // Add aria-invalid status for screen readers
                $(element).attr("aria-invalid", !result);

                if (!this.numberOfInvalids()) {
                    // Hide error containers on last error
                    this.toHide = this.toHide.add(this.containers);
                }
                this.showErrors();
                return result;
            },

            // http://jqueryvalidation.org/Validator.showErrors/
            showErrors: function(errors) {
                if (errors) {
                    // add items to error list and map
                    $.extend(this.errorMap, errors);
                    this.errorList = [];
                    for (var name in errors) {
                        this.errorList.push({
                            message: errors[name],
                            element: this.findByName(name)[0]
                        });
                    }
                    // remove items from success list
                    this.successList = $.grep(this.successList, function(element) {
                        return !(element.name in errors);
                    });
                }
                if (this.settings.showErrors) {
                    this.settings.showErrors.call(this, this.errorMap, this.errorList);
                } else {
                    this.defaultShowErrors();
                }
            },

            // http://jqueryvalidation.org/Validator.resetForm/
            resetForm: function() {
                if ($.fn.resetForm) {
                    $(this.currentForm).resetForm();
                }
                this.submitted = {};
                this.lastElement = null;
                this.prepareForm();
                this.hideErrors();
                var i, elements = this.elements()
                        .removeData("previousValue")
                        .removeAttr("aria-invalid");

                if (this.settings.unhighlight) {
                    for (i = 0; elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i],
                            this.settings.errorClass, "");
                    }
                } else {
                    elements.removeClass(this.settings.errorClass);
                }
            },

            numberOfInvalids: function() {
                return this.objectLength(this.invalid);
            },

            objectLength: function(obj) {
                /* jshint unused: false */
                var count = 0,
                    i;
                for (i in obj) {
                    count++;
                }
                return count;
            },

            hideErrors: function() {
                this.hideThese(this.toHide);
            },

            hideThese: function(errors) {
                errors.not(this.containers).text("");
                this.addWrapper(errors).hide();
            },

            valid: function() {
                return this.size() === 0;
            },

            size: function() {
                return this.errorList.length;
            },

            focusInvalid: function() {
                if (this.settings.focusInvalid) {
                    try {
                        $(this.findLastActive() || this.errorList.length && this.errorList[0].element || [])
                            .filter(":visible")
                            .focus()
                        // manually trigger focusin event; without it, focusin handler isn't called, findLastActive won't have anything to find
                        .trigger("focusin");
                    } catch (e) {
                        // ignore IE throwing errors when focusing hidden elements
                    }
                }
            },

            findLastActive: function() {
                var lastActive = this.lastActive;
                return lastActive && $.grep(this.errorList, function(n) {
                    return n.element.name === lastActive.name;
                }).length === 1 && lastActive;
            },

            elements: function() {
                var validator = this,
                    rulesCache = {};

                // select all valid inputs inside the form (no submit or reset buttons)
                return $(this.currentForm)
                    .find("input, select, textarea")
                    .not(":submit, :reset, :image, [disabled]")
                    .not(this.settings.ignore)
                    .filter(function() {
                        if (!this.name && validator.settings.debug && window.console) {
                            console.error("%o has no name assigned", this);
                        }

                        // select only the first element for each name, and only those with rules specified
                        if (this.name in rulesCache || !validator.objectLength($(this).rules())) {
                            return false;
                        }

                        rulesCache[this.name] = true;
                        return true;
                    });
            },

            clean: function(selector) {
                return $(selector)[0];
            },

            errors: function() {
                var errorClass = this.settings.errorClass.split(" ").join(".");
                return $(this.settings.errorElement + "." + errorClass, this.errorContext);
            },

            reset: function() {
                this.successList = [];
                this.errorList = [];
                this.errorMap = {};
                this.toShow = $([]);
                this.toHide = $([]);
                this.currentElements = $([]);
            },

            prepareForm: function() {
                this.reset();
                this.toHide = this.errors().add(this.containers);
            },

            prepareElement: function(element) {
                this.reset();
                this.toHide = this.errorsFor(element);
            },

            elementValue: function(element) {
                var val,
                    $element = $(element),
                    type = element.type;

                if (type === "radio" || type === "checkbox") {
                    return $("input[name='" + element.name + "']:checked").val();
                } else if (type === "number" && typeof element.validity !== "undefined") {
                    return element.validity.badInput ? false : $element.val();
                }

                val = $element.val();
                if (typeof val === "string") {
                    return val.replace(/\r/g, "");
                }
                return val;
            },

            check: function(element) {
                element = this.validationTargetFor(this.clean(element));

                var rules = $(element).rules(),
                    rulesCount = $.map(rules, function(n, i) {
                        return i;
                    }).length,
                    dependencyMismatch = false,
                    val = this.elementValue(element),
                    result, method, rule;

                for (method in rules) {
                    rule = {
                        method: method,
                        parameters: rules[method]
                    };
                    try {

                        result = $.validator.methods[method].call(this, val, element, rule.parameters);

                        // if a method indicates that the field is optional and therefore valid,
                        // don't mark it as valid when there are no other rules
                        if (result === "dependency-mismatch" && rulesCount === 1) {
                            dependencyMismatch = true;
                            continue;
                        }
                        dependencyMismatch = false;

                        if (result === "pending") {
                            this.toHide = this.toHide.not(this.errorsFor(element));
                            return;
                        }

                        if (!result) {
                            this.formatAndAdd(element, rule);
                            return false;
                        }
                    } catch (e) {
                        if (this.settings.debug && window.console) {
                            console.log("Exception occurred when checking element " + element.id + ", check the '" + rule.method + "' method.", e);
                        }
                        throw e;
                    }
                }
                if (dependencyMismatch) {
                    return;
                }
                if (this.objectLength(rules)) {
                    this.successList.push(element);
                }
                return true;
            },

            // return the custom message for the given element and validation method
            // specified in the element's HTML5 data attribute
            // return the generic message if present and no method specific message is present
            customDataMessage: function(element, method) {
                return $(element).data("msg" + method.charAt(0).toUpperCase() +
                    method.substring(1).toLowerCase()) || $(element).data("msg");
            },

            // return the custom message for the given element name and validation method
            customMessage: function(name, method) {
                var m = this.settings.messages[name];
                return m && (m.constructor === String ? m : m[method]);
            },

            // return the first defined argument, allowing empty strings
            findDefined: function() {
                for (var i = 0; i < arguments.length; i++) {
                    if (arguments[i] !== undefined) {
                        return arguments[i];
                    }
                }
                return undefined;
            },

            defaultMessage: function(element, method) {
                return this.findDefined(
                    this.customMessage(element.name, method),
                    this.customDataMessage(element, method),
                    // title is never undefined, so handle empty string as undefined
                    !this.settings.ignoreTitle && element.title || undefined,
                    $.validator.messages[method],
                    "<strong>Warning: No message defined for " + element.name + "</strong>"
                );
            },

            formatAndAdd: function(element, rule) {
                var message = this.defaultMessage(element, rule.method),
                    theregex = /\$?\{(\d+)\}/g;
                if (typeof message === "function") {
                    message = message.call(this, rule.parameters, element);
                } else if (theregex.test(message)) {
                    message = $.validator.format(message.replace(theregex, "{$1}"), rule.parameters);
                }
                this.errorList.push({
                    message: message,
                    element: element,
                    method: rule.method
                });

                this.errorMap[element.name] = message;
                this.submitted[element.name] = message;
            },

            addWrapper: function(toToggle) {
                if (this.settings.wrapper) {
                    toToggle = toToggle.add(toToggle.parent(this.settings.wrapper));
                }
                return toToggle;
            },

            defaultShowErrors: function() {
                var i, elements, error;
                for (i = 0; this.errorList[i]; i++) {
                    error = this.errorList[i];
                    if (this.settings.highlight) {
                        this.settings.highlight.call(this, error.element, this.settings.errorClass, this.settings.validClass);
                    }
                    this.showLabel(error.element, error.message);
                }
                if (this.errorList.length) {
                    this.toShow = this.toShow.add(this.containers);
                }
                if (this.settings.success) {
                    for (i = 0; this.successList[i]; i++) {
                        this.showLabel(this.successList[i]);
                    }
                }
                if (this.settings.unhighlight) {
                    for (i = 0, elements = this.validElements(); elements[i]; i++) {
                        this.settings.unhighlight.call(this, elements[i], this.settings.errorClass, this.settings.validClass);
                    }
                }
                this.toHide = this.toHide.not(this.toShow);
                this.hideErrors();
                this.addWrapper(this.toShow).show();
            },

            validElements: function() {
                return this.currentElements.not(this.invalidElements());
            },

            invalidElements: function() {
                return $(this.errorList).map(function() {
                    return this.element;
                });
            },

            showLabel: function(element, message) {
                var place, group, errorID,
                    error = this.errorsFor(element),
                    elementID = this.idOrName(element),
                    describedBy = $(element).attr("aria-describedby");
                if (error.length) {
                    // refresh error/success class
                    error.removeClass(this.settings.validClass).addClass(this.settings.errorClass);
                    // replace message on existing label
                    error.html(message);
                } else {
                    // create error element
                    error = $("<" + this.settings.errorElement + ">")
                        .attr("id", elementID + "-error")
                        .addClass(this.settings.errorClass)
                        .html(message || "");

                    // Maintain reference to the element to be placed into the DOM
                    place = error;
                    if (this.settings.wrapper) {
                        // make sure the element is visible, even in IE
                        // actually showing the wrapped element is handled elsewhere
                        place = error.hide().show().wrap("<" + this.settings.wrapper + "/>").parent();
                    }
                    if (this.labelContainer.length) {
                        this.labelContainer.append(place);
                    } else if (this.settings.errorPlacement) {
                        this.settings.errorPlacement(place, $(element));
                    } else {
                        place.insertAfter(element);
                    }

                    // Link error back to the element
                    if (error.is("label")) {
                        // If the error is a label, then associate using 'for'
                        error.attr("for", elementID);
                    } else if (error.parents("label[for='" + elementID + "']").length === 0) {
                        // If the element is not a child of an associated label, then it's necessary
                        // to explicitly apply aria-describedby

                        errorID = error.attr("id").replace(/(:|\.|\[|\]|\$)/g, "\\$1");
                        // Respect existing non-error aria-describedby
                        if (!describedBy) {
                            describedBy = errorID;
                        } else if (!describedBy.match(new RegExp("\\b" + errorID + "\\b"))) {
                            // Add to end of list if not already present
                            describedBy += " " + errorID;
                        }
                        $(element).attr("aria-describedby", describedBy);

                        // If this element is grouped, then assign to all elements in the same group
                        group = this.groups[element.name];
                        if (group) {
                            $.each(this.groups, function(name, testgroup) {
                                if (testgroup === group) {
                                    $("[name='" + name + "']", this.currentForm)
                                        .attr("aria-describedby", error.attr("id"));
                                }
                            });
                        }
                    }
                }
                if (!message && this.settings.success) {
                    error.text("");
                    if (typeof this.settings.success === "string") {
                        error.addClass(this.settings.success);
                    } else {
                        this.settings.success(error, element);
                    }
                }
                this.toShow = this.toShow.add(error);
            },

            errorsFor: function(element) {
                var name = this.idOrName(element),
                    describer = $(element).attr("aria-describedby"),
                    selector = "label[for='" + name + "'], label[for='" + name + "'] *";

                // aria-describedby should directly reference the error element
                if (describer) {
                    selector = selector + ", #" + describer.replace(/\s+/g, ", #");
                }
                return this
                    .errors()
                    .filter(selector);
            },

            idOrName: function(element) {
                return this.groups[element.name] || (this.checkable(element) ? element.name : element.id || element.name);
            },

            validationTargetFor: function(element) {

                // If radio/checkbox, validate first element in group instead
                if (this.checkable(element)) {
                    element = this.findByName(element.name);
                }

                // Always apply ignore filter
                return $(element).not(this.settings.ignore)[0];

            },

            checkable: function(element) {
                return (/radio|checkbox/i).test(element.type);
            },

            findByName: function(name) {
                return $(this.currentForm).find("[name='" + name + "']");
            },

            getLength: function(value, element) {
                switch (element.nodeName.toLowerCase()) {
                    case "select":
                        return $("option:selected", element).length;
                    case "input":
                        if (this.checkable(element)) {
                            return this.findByName(element.name).filter(":checked").length;
                        }
                }
                return value.length;
            },

            depend: function(param, element) {
                return this.dependTypes[typeof param] ? this.dependTypes[typeof param](param, element) : true;
            },

            dependTypes: {
                "boolean": function(param) {
                    return param;
                },
                "string": function(param, element) {
                    return !!$(param, element.form).length;
                },
                "function": function(param, element) {
                    return param(element);
                }
            },

            optional: function(element) {
                var val = this.elementValue(element);
                return !$.validator.methods.required.call(this, val, element) && "dependency-mismatch";
            },

            startRequest: function(element) {
                if (!this.pending[element.name]) {
                    this.pendingRequest++;
                    this.pending[element.name] = true;
                }
            },

            stopRequest: function(element, valid) {
                this.pendingRequest--;
                // sometimes synchronization fails, make sure pendingRequest is never < 0
                if (this.pendingRequest < 0) {
                    this.pendingRequest = 0;
                }
                delete this.pending[element.name];
                if (valid && this.pendingRequest === 0 && this.formSubmitted && this.form()) {
                    $(this.currentForm).submit();
                    this.formSubmitted = false;
                } else if (!valid && this.pendingRequest === 0 && this.formSubmitted) {
                    $(this.currentForm).triggerHandler("invalid-form", [this]);
                    this.formSubmitted = false;
                }
            },

            previousValue: function(element) {
                return $.data(element, "previousValue") || $.data(element, "previousValue", {
                    old: null,
                    valid: true,
                    message: this.defaultMessage(element, "remote")
                });
            }

        },

        classRuleSettings: {
            required: {
                required: true
            },
            email: {
                email: true
            },
            url: {
                url: true
            },
            date: {
                date: true
            },
            dateISO: {
                dateISO: true
            },
            number: {
                number: true
            },
            digits: {
                digits: true
            },
            creditcard: {
                creditcard: true
            }
        },

        addClassRules: function(className, rules) {
            if (className.constructor === String) {
                this.classRuleSettings[className] = rules;
            } else {
                $.extend(this.classRuleSettings, className);
            }
        },

        classRules: function(element) {
            var rules = {},
                classes = $(element).attr("class");

            if (classes) {
                $.each(classes.split(" "), function() {
                    if (this in $.validator.classRuleSettings) {
                        $.extend(rules, $.validator.classRuleSettings[this]);
                    }
                });
            }
            return rules;
        },

        attributeRules: function(element) {
            var rules = {},
                $element = $(element),
                type = element.getAttribute("type"),
                method, value;

            for (method in $.validator.methods) {

                // support for <input required> in both html5 and older browsers
                if (method === "required") {
                    value = element.getAttribute(method);
                    // Some browsers return an empty string for the required attribute
                    // and non-HTML5 browsers might have required="" markup
                    if (value === "") {
                        value = true;
                    }
                    // force non-HTML5 browsers to return bool
                    value = !! value;
                } else {
                    value = $element.attr(method);
                }

                // convert the value to a number for number inputs, and for text for backwards compability
                // allows type="date" and others to be compared as strings
                if (/min|max/.test(method) && (type === null || /number|range|text/.test(type))) {
                    value = Number(value);
                }

                if (value || value === 0) {
                    rules[method] = value;
                } else if (type === method && type !== "range") {
                    // exception: the jquery validate 'range' method
                    // does not test for the html5 'range' type
                    rules[method] = true;
                }
            }

            // maxlength may be returned as -1, 2147483647 ( IE ) and 524288 ( safari ) for text inputs
            if (rules.maxlength && /-1|2147483647|524288/.test(rules.maxlength)) {
                delete rules.maxlength;
            }

            return rules;
        },

        dataRules: function(element) {
            var method, value,
                rules = {}, $element = $(element);
            for (method in $.validator.methods) {
                value = $element.data("rule" + method.charAt(0).toUpperCase() + method.substring(1).toLowerCase());
                if (value !== undefined) {
                    rules[method] = value;
                }
            }
            return rules;
        },

        staticRules: function(element) {
            if (element.form) {
                validator = $.data(element.form, "validator");
            } else {
                validator = $.data($(element).closest("div[data-form='true']").get(0), "validator");
            }

            var rules = {},
                validator = validator;

            if (validator.settings.rules) {
                rules = $.validator.normalizeRule(validator.settings.rules[element.name]) || {};
            }
            return rules;
        },

        normalizeRules: function(rules, element) {
            // handle dependency check
            $.each(rules, function(prop, val) {
                // ignore rule when param is explicitly false, eg. required:false
                if (val === false) {
                    delete rules[prop];
                    return;
                }
                if (val.param || val.depends) {
                    var keepRule = true;
                    switch (typeof val.depends) {
                        case "string":
                            keepRule = !! $(val.depends, element.form).length;
                            break;
                        case "function":
                            keepRule = val.depends.call(element, element);
                            break;
                    }
                    if (keepRule) {
                        rules[prop] = val.param !== undefined ? val.param : true;
                    } else {
                        delete rules[prop];
                    }
                }
            });

            // evaluate parameters
            $.each(rules, function(rule, parameter) {
                rules[rule] = $.isFunction(parameter) ? parameter(element) : parameter;
            });

            // clean number parameters
            $.each(["minlength", "maxlength"], function() {
                if (rules[this]) {
                    rules[this] = Number(rules[this]);
                }
            });
            $.each(["rangelength", "range"], function() {
                var parts;
                if (rules[this]) {
                    if ($.isArray(rules[this])) {
                        rules[this] = [Number(rules[this][0]), Number(rules[this][1])];
                    } else if (typeof rules[this] === "string") {
                        parts = rules[this].replace(/[\[\]]/g, "").split(/[\s,]+/);
                        rules[this] = [Number(parts[0]), Number(parts[1])];
                    }
                }
            });

            if ($.validator.autoCreateRanges) {
                // auto-create ranges
                if (rules.min != null && rules.max != null) {
                    rules.range = [rules.min, rules.max];
                    delete rules.min;
                    delete rules.max;
                }
                if (rules.minlength != null && rules.maxlength != null) {
                    rules.rangelength = [rules.minlength, rules.maxlength];
                    delete rules.minlength;
                    delete rules.maxlength;
                }
            }

            return rules;
        },

        // Converts a simple string to a {string: true} rule, e.g., "required" to {required:true}
        normalizeRule: function(data) {
            if (typeof data === "string") {
                var transformed = {};
                $.each(data.split(/\s/), function() {
                    transformed[this] = true;
                });
                data = transformed;
            }
            return data;
        },

        // http://jqueryvalidation.org/jQuery.validator.addMethod/
        addMethod: function(name, method, message) {
            $.validator.methods[name] = method;
            $.validator.messages[name] = message !== undefined ? message : $.validator.messages[name];
            if (method.length < 3) {
                $.validator.addClassRules(name, $.validator.normalizeRule(name));
            }
        },

        methods: {

            // http://jqueryvalidation.org/required-method/
            required: function(value, element, param) {
                // check if dependency is met
                if (!this.depend(param, element)) {
                    return "dependency-mismatch";
                }
                if (element.nodeName.toLowerCase() === "select") {
                    // could be an array for select-multiple or a string, both are fine this way
                    var val = $(element).val();
                    return val && val.length > 0;
                }
                if (this.checkable(element)) {
                    return this.getLength(value, element) > 0;
                }
                return $.trim(value).length > 0;
            },

            phone: function(value, element, param) {
                return this.optional(element) || /^([+]?[0-9]{0,2})?([0-9]{0,3})([\d]{0,7})$/.test(value);
            },

            phoneUA: function(value, element, param) {
                return this.optional(element) || /^([+]38)?([0-9]{3})([\d]{7})$/.test(value);
            },

            validTrue: function(value, element, param) {
                if ($(element).data('valid') === true) {
                    return true;
                } else {
                    return false;
                }
            },

            filesize: function(value, element, param) {
                // param = size (en bytes) 
                return this.optional(element) || (element.files[0].size <= param);
            },

            filetype: function(value, element, param) {
                param = typeof param === "string" ? param.replace(/,/g, "|") : "png|jpe?g|doc|pdf|gif|zip|rar|tar|html|swf|txt|xls|docx|xlsx|odt";
                return this.optional(element) || value.match(new RegExp(".(" + param + ")$", "i"));
            },

            word: function(value, element) {
                return this.optional(element) || /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\'\`\- ]*$/.test(value);
            },

            login: function(value, element) {
                return this.optional(element) || /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ][0-9a-zA-Zа-яА-ЯіІїЇєЄґҐ\-\._| ]+$/.test(value);
            },

            // http://jqueryvalidation.org/email-method/
            email: function(value, element) {
                return this.optional(element) || /^([a-zA-Z0-9_\.\-]{2,})+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/.test(value);
            },

            // http://jqueryvalidation.org/url-method/
            url: function(value, element) {
                // contributed by Scott Gonzalez: http://projects.scottsplayground.com/iri/
                return this.optional(element) || /^((https?|s?ftp):\/\/)?(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value);
            },

            // http://jqueryvalidation.org/date-method/
            date: function(value, element) {
                return this.optional(element) || !/Invalid|NaN/.test(new Date(value).toString());
            },

            // http://jqueryvalidation.org/dateISO-method/
            dateISO: function(value, element) {
                return this.optional(element) || /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
            },

            // http://jqueryvalidation.org/number-method/
            number: function(value, element) {
                return this.optional(element) || /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
            },

            // http://jqueryvalidation.org/digits-method/
            digits: function(value, element) {
                return this.optional(element) || /^\d+$/.test(value);
            },

            // http://jqueryvalidation.org/creditcard-method/
            // based on http://en.wikipedia.org/wiki/Luhn_algorithm
            creditcard: function(value, element) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }
                // accept only spaces, digits and dashes
                if (/[^0-9 \-]+/.test(value)) {
                    return false;
                }
                var nCheck = 0,
                    nDigit = 0,
                    bEven = false,
                    n, cDigit;

                value = value.replace(/\D/g, "");

                // Basing min and max length on
                // http://developer.ean.com/general_info/Valid_Credit_Card_Types
                if (value.length < 13 || value.length > 19) {
                    return false;
                }

                for (n = value.length - 1; n >= 0; n--) {
                    cDigit = value.charAt(n);
                    nDigit = parseInt(cDigit, 10);
                    if (bEven) {
                        if ((nDigit *= 2) > 9) {
                            nDigit -= 9;
                        }
                    }
                    nCheck += nDigit;
                    bEven = !bEven;
                }

                return (nCheck % 10) === 0;
            },

            // http://jqueryvalidation.org/minlength-method/
            minlength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length >= param;
            },

            // http://jqueryvalidation.org/maxlength-method/
            maxlength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || length <= param;
            },

            // http://jqueryvalidation.org/rangelength-method/
            rangelength: function(value, element, param) {
                var length = $.isArray(value) ? value.length : this.getLength(value, element);
                return this.optional(element) || (length >= param[0] && length <= param[1]);
            },

            // http://jqueryvalidation.org/min-method/
            min: function(value, element, param) {
                return this.optional(element) || value >= param;
            },

            // http://jqueryvalidation.org/max-method/
            max: function(value, element, param) {
                return this.optional(element) || value <= param;
            },

            // http://jqueryvalidation.org/range-method/
            range: function(value, element, param) {
                return this.optional(element) || (value >= param[0] && value <= param[1]);
            },

            // http://jqueryvalidation.org/equalTo-method/
            equalTo: function(value, element, param) {
                // bind to the blur event of the target in order to revalidate whenever the target field is updated
                // TODO find a way to bind the event just once, avoiding the unbind-rebind overhead
                var target = $(param);
                if (this.settings.onfocusout) {
                    target.unbind(".validate-equalTo").bind("blur.validate-equalTo", function() {
                        $(element).valid();
                    });
                }
                return value === target.val();
            },

            // http://jqueryvalidation.org/remote-method/
            remote: function(value, element, param) {
                if (this.optional(element)) {
                    return "dependency-mismatch";
                }

                var previous = this.previousValue(element),
                    validator, data;

                if (!this.settings.messages[element.name]) {
                    this.settings.messages[element.name] = {};
                }
                previous.originalMessage = this.settings.messages[element.name].remote;
                this.settings.messages[element.name].remote = previous.message;

                param = typeof param === "string" && {
                    url: param
                } || param;

                if (previous.old === value) {
                    return previous.valid;
                }

                previous.old = value;
                validator = this;
                this.startRequest(element);
                data = {};
                data[element.name] = value;
                $.ajax($.extend(true, {
                    url: param,
                    mode: "abort",
                    port: "validate" + element.name,
                    dataType: "json",
                    data: data,
                    context: validator.currentForm,
                    success: function(response) {
                        var valid = response === true || response === "true",
                            errors, message, submitted;

                        validator.settings.messages[element.name].remote = previous.originalMessage;
                        if (valid) {
                            submitted = validator.formSubmitted;
                            validator.prepareElement(element);
                            validator.formSubmitted = submitted;
                            validator.successList.push(element);
                            delete validator.invalid[element.name];
                            validator.showErrors();
                        } else {
                            errors = {};
                            message = response || validator.defaultMessage(element, "remote");
                            errors[element.name] = previous.message = $.isFunction(message) ? message(value) : message;
                            validator.invalid[element.name] = true;
                            validator.showErrors(errors);
                        }
                        previous.valid = valid;
                        validator.stopRequest(element, valid);
                    }
                }, param));
                return "pending";
            }

        }

    });
    if ($('html').attr('lang').split('-').shift() === 'ru') {
        $.extend($.validator.messages, {
            required: "Это поле необходимо заполнить.",
            remote: "Пожалуйста, введите правильное значение.",
            email: "Пожалуйста, введите корректный адрес электронной почты.",
            url: "Пожалуйста, введите корректный URL.",
            date: "Пожалуйста, введите корректную дату.",
            dateISO: "Пожалуйста, введите корректную дату в формате ISO.",
            number: "Пожалуйста, введите число.",
            digits: "Пожалуйста, вводите только цифры.",
            creditcard: "Пожалуйста, введите правильный номер кредитной карты.",
            equalTo: "Пожалуйста, введите такое же значение ещё раз.",
            extension: "Пожалуйста, выберите файл с правильным расширением.",
            maxlength: $.validator.format("Пожалуйста, введите не больше {0} символов."),
            minlength: $.validator.format("Пожалуйста, введите не меньше {0} символов."),
            rangelength: $.validator.format("Пожалуйста, введите значение длиной от {0} до {1} символов."),
            range: $.validator.format("Пожалуйста, введите число от {0} до {1}."),
            max: $.validator.format("Пожалуйста, введите число, меньшее или равное {0}."),
            min: $.validator.format("Пожалуйста, введите число, большее или равное {0}.")
        });
    }

    $.format = function deprecated() {
        throw "$.format has been deprecated. Please use $.validator.format instead.";
    };


 /*-------------------------------  Magnific  ------------------------------------*/
    /*! Magnific Popup - v0.9.9 - 2014-09-06
     * http://dimsemenov.com/plugins/magnific-popup/
     * Copyright (c) 2014 Dmitry Semenov; */
    ;
    (function($) {

        /*>>core*/
        /**
         *
         * Magnific Popup Core JS file
         *
         */


        /**
         * Private static constants
         */
        var CLOSE_EVENT = 'Close',
            BEFORE_CLOSE_EVENT = 'BeforeClose',
            AFTER_CLOSE_EVENT = 'AfterClose',
            BEFORE_APPEND_EVENT = 'BeforeAppend',
            MARKUP_PARSE_EVENT = 'MarkupParse',
            OPEN_EVENT = 'Open',
            CHANGE_EVENT = 'Change',
            NS = 'mfp',
            EVENT_NS = '.' + NS,
            READY_CLASS = 'mfp-ready',
            REMOVING_CLASS = 'mfp-removing',
            PREVENT_CLOSE_CLASS = 'mfp-prevent-close';


        /**
         * Private vars
         */
        var mfp, // As we have only one instance of MagnificPopup object, we define it locally to not to use 'this'
            MagnificPopup = function() {},
            _isJQ = !! (window.jQuery),
            _prevStatus,
            _window = $(window),
            _body,
            _document,
            _prevContentType,
            _wrapClasses,
            _currPopupType;


        /**
         * Private functions
         */
        var _mfpOn = function(name, f) {
            mfp.ev.on(NS + name + EVENT_NS, f);
        },
            _getEl = function(className, appendTo, html, raw) {
                var el = document.createElement('div');
                el.className = 'mfp-' + className;
                if (html) {
                    el.innerHTML = html;
                }
                if (!raw) {
                    el = $(el);
                    if (appendTo) {
                        el.appendTo(appendTo);
                    }
                } else if (appendTo) {
                    appendTo.appendChild(el);
                }
                return el;
            },
            _mfpTrigger = function(e, data) {
                mfp.ev.triggerHandler(NS + e, data);

                if (mfp.st.callbacks) {
                    // converts "mfpEventName" to "eventName" callback and triggers it if it's present
                    e = e.charAt(0).toLowerCase() + e.slice(1);
                    if (mfp.st.callbacks[e]) {
                        mfp.st.callbacks[e].apply(mfp, $.isArray(data) ? data : [data]);
                    }
                }
            },
            _getCloseBtn = function(type) {
                if (type !== _currPopupType || !mfp.currTemplate.closeBtn) {
                    mfp.currTemplate.closeBtn = $(mfp.st.closeMarkup.replace('%title%', mfp.st.tClose));
                    _currPopupType = type;
                }
                return mfp.currTemplate.closeBtn;
            },
            // Initialize Magnific Popup only when called at least once
            _checkInstance = function() {
                if (!$.magnificPopup.instance) {
                    mfp = new MagnificPopup();
                    mfp.init();
                    $.magnificPopup.instance = mfp;
                }
            },
            // CSS transition detection, http://stackoverflow.com/questions/7264899/detect-css-transitions-using-javascript-and-without-modernizr
            supportsTransitions = function() {
                var s = document.createElement('p').style, // 's' for style. better to create an element if body yet to exist
                    v = ['ms', 'O', 'Moz', 'Webkit']; // 'v' for vendor

                if (s['transition'] !== undefined) {
                    return true;
                }

                while (v.length) {
                    if (v.pop() + 'Transition' in s) {
                        return true;
                    }
                }

                return false;
            };



        /**
         * Public functions
         */
        MagnificPopup.prototype = {

            constructor: MagnificPopup,

            /**
             * Initializes Magnific Popup plugin.
             * This function is triggered only once when $.fn.magnificPopup or $.magnificPopup is executed
             */
            init: function() {
                var appVersion = navigator.appVersion;
                mfp.isIE7 = appVersion.indexOf("MSIE 7.") !== -1;
                mfp.isIE8 = appVersion.indexOf("MSIE 8.") !== -1;
                mfp.isLowIE = mfp.isIE7 || mfp.isIE8;
                mfp.isAndroid = (/android/gi).test(appVersion);
                mfp.isIOS = (/iphone|ipad|ipod/gi).test(appVersion);
                mfp.supportsTransition = supportsTransitions();

                // We disable fixed positioned lightbox on devices that don't handle it nicely.
                // If you know a better way of detecting this - let me know.
                mfp.probablyMobile = (mfp.isAndroid || mfp.isIOS || /(Opera Mini)|Kindle|webOS|BlackBerry|(Opera Mobi)|(Windows Phone)|IEMobile/i.test(navigator.userAgent));
                _document = $(document);

                mfp.popupsCache = {};
            },

            /**
             * Opens popup
             * @param  data [description]
             */
            open: function(data) {

                if (!_body) {
                    _body = $(document.body);
                }

                var i;

                if (data.isObj === false) {
                    // convert jQuery collection to array to avoid conflicts later
                    mfp.items = data.items.toArray();

                    mfp.index = 0;
                    var items = data.items,
                        item;
                    for (i = 0; i < items.length; i++) {
                        item = items[i];
                        if (item.parsed) {
                            item = item.el[0];
                        }
                        if (item === data.el[0]) {
                            mfp.index = i;
                            break;
                        }
                    }
                } else {
                    mfp.items = $.isArray(data.items) ? data.items : [data.items];
                    mfp.index = data.index || 0;
                }

                // if popup is already opened - we just update the content
                if (mfp.isOpen) {
                    mfp.updateItemHTML();
                    return;
                }

                mfp.types = [];
                _wrapClasses = '';
                if (data.mainEl && data.mainEl.length) {
                    mfp.ev = data.mainEl.eq(0);
                } else {
                    mfp.ev = _document;
                }

                if (data.key) {
                    if (!mfp.popupsCache[data.key]) {
                        mfp.popupsCache[data.key] = {};
                    }
                    mfp.currTemplate = mfp.popupsCache[data.key];
                } else {
                    mfp.currTemplate = {};
                }



                mfp.st = $.extend(true, {}, $.magnificPopup.defaults, data);
                mfp.fixedContentPos = mfp.st.fixedContentPos === 'auto' ? !mfp.probablyMobile : mfp.st.fixedContentPos;

                if (mfp.st.modal) {
                    mfp.st.closeOnContentClick = false;
                    mfp.st.closeOnBgClick = false;
                    mfp.st.showCloseBtn = false;
                    mfp.st.enableEscapeKey = false;
                }


                // Building markup
                // main containers are created only once
                if (!mfp.bgOverlay) {

                    // Dark overlay
                    mfp.bgOverlay = _getEl('bg').on('click' + EVENT_NS, function() {
                        mfp.close();
                    });

                    mfp.wrap = _getEl('wrap').attr('tabindex', -1).on('click' + EVENT_NS, function(e) {
                        if (mfp._checkIfClose(e.target)) {
                            mfp.close();
                        }
                    });

                    mfp.container = _getEl('container', mfp.wrap);
                }

                mfp.contentContainer = _getEl('content');
                if (mfp.st.preloader) {
                    mfp.preloader = _getEl('preloader', mfp.container, mfp.st.tLoading);
                }


                // Initializing modules
                var modules = $.magnificPopup.modules;
                for (i = 0; i < modules.length; i++) {
                    var n = modules[i];
                    n = n.charAt(0).toUpperCase() + n.slice(1);
                    mfp['init' + n].call(mfp);
                }
                _mfpTrigger('BeforeOpen');


                if (mfp.st.showCloseBtn) {
                    // Close button
                    if (!mfp.st.closeBtnInside) {
                        mfp.wrap.append(_getCloseBtn());
                    } else {
                        _mfpOn(MARKUP_PARSE_EVENT, function(e, template, values, item) {
                            values.close_replaceWith = _getCloseBtn(item.type);
                        });
                        _wrapClasses += ' mfp-close-btn-in';
                    }
                }

                if (mfp.st.alignTop) {
                    _wrapClasses += ' mfp-align-top';
                }



                if (mfp.fixedContentPos) {
                    mfp.wrap.css({
                        overflow: mfp.st.overflowY,
                        overflowX: 'hidden',
                        overflowY: mfp.st.overflowY
                    });
                } else {
                    mfp.wrap.css({
                        top: _window.scrollTop(),
                        position: 'absolute'
                    });
                }
                if (mfp.st.fixedBgPos === false || (mfp.st.fixedBgPos === 'auto' && !mfp.fixedContentPos)) {
                    mfp.bgOverlay.css({
                        height: _document.height(),
                        position: 'absolute'
                    });
                }



                if (mfp.st.enableEscapeKey) {
                    // Close on ESC key
                    _document.on('keyup' + EVENT_NS, function(e) {
                        if (e.keyCode === 27) {
                            mfp.close();
                        }
                    });
                }

                _window.on('resize' + EVENT_NS, function() {
                    mfp.updateSize();
                });


                if (!mfp.st.closeOnContentClick) {
                    _wrapClasses += ' mfp-auto-cursor';
                }

                if (_wrapClasses)
                    mfp.wrap.addClass(_wrapClasses);


                // this triggers recalculation of layout, so we get it once to not to trigger twice
                var windowHeight = mfp.wH = _window.height();


                var windowStyles = {};

                if (mfp.fixedContentPos) {
                    if (mfp._hasScrollBar(windowHeight)) {
                        var s = mfp._getScrollbarSize();
                        if (s) {
                            windowStyles.marginRight = s;
                        }
                    }
                }

                if (mfp.fixedContentPos) {
                    if (!mfp.isIE7) {
                        windowStyles.overflow = 'hidden';
                    } else {
                        // ie7 double-scroll bug
                        $('body, html').css('overflow', 'hidden');
                    }
                }



                var classesToadd = mfp.st.mainClass;
                if (mfp.isIE7) {
                    classesToadd += ' mfp-ie7';
                }
                if (classesToadd) {
                    mfp._addClassToMFP(classesToadd);
                }

                // add content
                mfp.updateItemHTML();

                _mfpTrigger('BuildControls');

                // remove scrollbar, add margin e.t.c
                $('html').css(windowStyles);

                // add everything to DOM
                mfp.bgOverlay.add(mfp.wrap).prependTo(mfp.st.prependTo || _body);

                // Save last focused element
                mfp._lastFocusedEl = document.activeElement;

                // Wait for next cycle to allow CSS transition
                setTimeout(function() {

                    if (mfp.content) {
                        mfp._addClassToMFP(READY_CLASS);
                        mfp._setFocus();
                    } else {
                        // if content is not defined (not loaded e.t.c) we add class only for BG
                        mfp.bgOverlay.addClass(READY_CLASS);
                    }

                    // Trap the focus in popup
                    _document.on('focusin' + EVENT_NS, mfp._onFocusIn);

                }, 16);

                mfp.isOpen = true;
                mfp.updateSize(windowHeight);
                _mfpTrigger(OPEN_EVENT);

                return data;
            },

            /**
             * Closes the popup
             */
            close: function() {
                if (!mfp.isOpen) return;
                _mfpTrigger(BEFORE_CLOSE_EVENT);

                mfp.isOpen = false;
                // for CSS3 animation
                if (mfp.st.removalDelay && !mfp.isLowIE && mfp.supportsTransition) {
                    mfp._addClassToMFP(REMOVING_CLASS);
                    setTimeout(function() {
                        mfp._close();
                    }, mfp.st.removalDelay);
                } else {
                    mfp._close();
                }
            },

            /**
             * Helper for close() function
             */
            _close: function() {
                _mfpTrigger(CLOSE_EVENT);

                var classesToRemove = REMOVING_CLASS + ' ' + READY_CLASS + ' ';

                mfp.bgOverlay.detach();
                mfp.wrap.detach();
                mfp.container.empty();

                if (mfp.st.mainClass) {
                    classesToRemove += mfp.st.mainClass + ' ';
                }

                mfp._removeClassFromMFP(classesToRemove);

                if (mfp.fixedContentPos) {
                    var windowStyles = {
                        marginRight: ''
                    };
                    if (mfp.isIE7) {
                        $('body, html').css('overflow', '');
                    } else {
                        windowStyles.overflow = '';
                    }
                    $('html').css(windowStyles);
                }

                _document.off('keyup' + EVENT_NS + ' focusin' + EVENT_NS);
                mfp.ev.off(EVENT_NS);

                // clean up DOM elements that aren't removed
                mfp.wrap.attr('class', 'mfp-wrap').removeAttr('style');
                mfp.bgOverlay.attr('class', 'mfp-bg');
                mfp.container.attr('class', 'mfp-container');

                // remove close button from target element
                if (mfp.st.showCloseBtn &&
                    (!mfp.st.closeBtnInside || mfp.currTemplate[mfp.currItem.type] === true)) {
                    if (mfp.currTemplate.closeBtn)
                        mfp.currTemplate.closeBtn.detach();
                }


                if (mfp._lastFocusedEl) {
                    $(mfp._lastFocusedEl).focus(); // put tab focus back
                }
                mfp.currItem = null;
                mfp.content = null;
                mfp.currTemplate = null;
                mfp.prevHeight = 0;

                _mfpTrigger(AFTER_CLOSE_EVENT);
            },

            updateSize: function(winHeight) {

                if (mfp.isIOS) {
                    // fixes iOS nav bars https://github.com/dimsemenov/Magnific-Popup/issues/2
                    var zoomLevel = document.documentElement.clientWidth / window.innerWidth;
                    var height = window.innerHeight * zoomLevel;
                    mfp.wrap.css('height', height);
                    mfp.wH = height;
                } else {
                    mfp.wH = winHeight || _window.height();
                }
                // Fixes #84: popup incorrectly positioned with position:relative on body
                if (!mfp.fixedContentPos) {
                    mfp.wrap.css('height', mfp.wH);
                }

                _mfpTrigger('Resize');

            },

            /**
             * Set content of popup based on current index
             */
            updateItemHTML: function() {
                var item = mfp.items[mfp.index];

                // Detach and perform modifications
                mfp.contentContainer.detach();

                if (mfp.content)
                    mfp.content.detach();

                if (!item.parsed) {
                    item = mfp.parseEl(mfp.index);
                }

                var type = item.type;

                _mfpTrigger('BeforeChange', [mfp.currItem ? mfp.currItem.type : '', type]);
                // BeforeChange event works like so:
                // _mfpOn('BeforeChange', function(e, prevType, newType) { });

                mfp.currItem = item;





                if (!mfp.currTemplate[type]) {
                    var markup = mfp.st[type] ? mfp.st[type].markup : false;

                    // allows to modify markup
                    _mfpTrigger('FirstMarkupParse', markup);

                    if (markup) {
                        mfp.currTemplate[type] = $(markup);
                    } else {
                        // if there is no markup found we just define that template is parsed
                        mfp.currTemplate[type] = true;
                    }
                }

                if (_prevContentType && _prevContentType !== item.type) {
                    mfp.container.removeClass('mfp-' + _prevContentType + '-holder');
                }

                var newContent = mfp['get' + type.charAt(0).toUpperCase() + type.slice(1)](item, mfp.currTemplate[type]);
                mfp.appendContent(newContent, type);

                item.preloaded = true;

                _mfpTrigger(CHANGE_EVENT, item);
                _prevContentType = item.type;

                // Append container back after its content changed
                mfp.container.prepend(mfp.contentContainer);

                _mfpTrigger('AfterChange');
            },


            /**
             * Set HTML content of popup
             */
            appendContent: function(newContent, type) {
                mfp.content = newContent;

                if (newContent) {
                    if (mfp.st.showCloseBtn && mfp.st.closeBtnInside &&
                        mfp.currTemplate[type] === true) {
                        // if there is no markup, we just append close button element inside
                        if (!mfp.content.find('.mfp-close').length) {
                            mfp.content.append(_getCloseBtn());
                        }
                    } else {
                        mfp.content = newContent;
                    }
                } else {
                    mfp.content = '';
                }

                _mfpTrigger(BEFORE_APPEND_EVENT);
                mfp.container.addClass('mfp-' + type + '-holder');

                mfp.contentContainer.append(mfp.content);
            },




            /**
             * Creates Magnific Popup data object based on given data
             * @param  {int} index Index of item to parse
             */
            parseEl: function(index) {
                var item = mfp.items[index],
                    type;

                if (item.tagName) {
                    item = {
                        el: $(item)
                    };
                } else {
                    type = item.type;
                    item = {
                        data: item,
                        src: item.src
                    };
                }

                if (item.el) {
                    var types = mfp.types;

                    // check for 'mfp-TYPE' class
                    for (var i = 0; i < types.length; i++) {
                        if (item.el.hasClass('mfp-' + types[i])) {
                            type = types[i];
                            break;
                        }
                    }

                    item.src = item.el.attr('data-mfp-src');
                    if (!item.src) {
                        item.src = item.el.attr('href');
                    }
                }

                item.type = type || mfp.st.type || 'inline';
                item.index = index;
                item.parsed = true;
                mfp.items[index] = item;
                _mfpTrigger('ElementParse', item);

                return mfp.items[index];
            },


            /**
             * Initializes single popup or a group of popups
             */
            addGroup: function(el, options) {
                var eHandler = function(e) {
                    e.mfpEl = this;
                    mfp._openClick(e, el, options);
                };

                if (!options) {
                    options = {};
                }

                var eName = 'click.magnificPopup';
                options.mainEl = el;

                if (options.items) {
                    options.isObj = true;
                    el.off(eName).on(eName, eHandler);
                } else {
                    options.isObj = false;
                    if (options.delegate) {
                        el.off(eName).on(eName, options.delegate, eHandler);
                    } else {
                        options.items = el;
                        el.off(eName).on(eName, eHandler);
                    }
                }
            },
            _openClick: function(e, el, options) {
                var midClick = options.midClick !== undefined ? options.midClick : $.magnificPopup.defaults.midClick;


                if (!midClick && (e.which === 2 || e.ctrlKey || e.metaKey)) {
                    return;
                }

                var disableOn = options.disableOn !== undefined ? options.disableOn : $.magnificPopup.defaults.disableOn;

                if (disableOn) {
                    if ($.isFunction(disableOn)) {
                        if (!disableOn.call(mfp)) {
                            return true;
                        }
                    } else { // else it's number
                        if (_window.width() < disableOn) {
                            return true;
                        }
                    }
                }

                if (e.type) {
                    e.preventDefault();

                    // This will prevent popup from closing if element is inside and popup is already opened
                    if (mfp.isOpen) {
                        e.stopPropagation();
                    }
                }


                options.el = $(e.mfpEl);
                if (options.delegate) {
                    options.items = el.find(options.delegate);
                }
                mfp.open(options);
            },


            /**
             * Updates text on preloader
             */
            updateStatus: function(status, text) {

                if (mfp.preloader) {
                    if (_prevStatus !== status) {
                        mfp.container.removeClass('mfp-s-' + _prevStatus);
                    }

                    if (!text && status === 'loading') {
                        text = mfp.st.tLoading;
                    }

                    var data = {
                        status: status,
                        text: text
                    };
                    // allows to modify status
                    _mfpTrigger('UpdateStatus', data);

                    status = data.status;
                    text = data.text;

                    mfp.preloader.html(text);

                    mfp.preloader.find('a').on('click', function(e) {
                        e.stopImmediatePropagation();
                    });

                    mfp.container.addClass('mfp-s-' + status);
                    _prevStatus = status;
                }
            },


            /*
                "Private" helpers that aren't private at all
             */
            // Check to close popup or not
            // "target" is an element that was clicked
            _checkIfClose: function(target) {

                if ($(target).hasClass(PREVENT_CLOSE_CLASS)) {
                    return;
                }

                var closeOnContent = mfp.st.closeOnContentClick;
                var closeOnBg = mfp.st.closeOnBgClick;

                if (closeOnContent && closeOnBg) {
                    return true;
                } else {

                    // We close the popup if click is on close button or on preloader. Or if there is no content.
                    if (!mfp.content || $(target).hasClass('mfp-close') || (mfp.preloader && target === mfp.preloader[0])) {
                        return true;
                    }

                    // if click is outside the content
                    if ((target !== mfp.content[0] && !$.contains(mfp.content[0], target))) {
                        if (closeOnBg) {
                            // last check, if the clicked element is in DOM, (in case it's removed onclick)
                            if ($.contains(document, target)) {
                                return true;
                            }
                        }
                    } else if (closeOnContent) {
                        return true;
                    }

                }
                return false;
            },
            _addClassToMFP: function(cName) {
                mfp.bgOverlay.addClass(cName);
                mfp.wrap.addClass(cName);
            },
            _removeClassFromMFP: function(cName) {
                this.bgOverlay.removeClass(cName);
                mfp.wrap.removeClass(cName);
            },
            _hasScrollBar: function(winHeight) {
                return ((mfp.isIE7 ? _document.height() : document.body.scrollHeight) > (winHeight || _window.height()));
            },
            _setFocus: function() {
                (mfp.st.focus ? mfp.content.find(mfp.st.focus).eq(0) : mfp.wrap).focus();
            },
            _onFocusIn: function(e) {
                if (e.target !== mfp.wrap[0] && !$.contains(mfp.wrap[0], e.target)) {
                    mfp._setFocus();
                    return false;
                }
            },
            _parseMarkup: function(template, values, item) {
                var arr;
                if (item.data) {
                    values = $.extend(item.data, values);
                }
                _mfpTrigger(MARKUP_PARSE_EVENT, [template, values, item]);

                $.each(values, function(key, value) {
                    if (value === undefined || value === false) {
                        return true;
                    }
                    arr = key.split('_');
                    if (arr.length > 1) {
                        var el = template.find(EVENT_NS + '-' + arr[0]);

                        if (el.length > 0) {
                            var attr = arr[1];
                            if (attr === 'replaceWith') {
                                if (el[0] !== value[0]) {
                                    el.replaceWith(value);
                                }
                            } else if (attr === 'img') {
                                if (el.is('img')) {
                                    el.attr('src', value);
                                } else {
                                    el.replaceWith('<img src="' + value + '" class="' + el.attr('class') + '" />');
                                }
                            } else {
                                el.attr(arr[1], value);
                            }
                        }

                    } else {
                        template.find(EVENT_NS + '-' + key).html(value);
                    }
                });
            },

            _getScrollbarSize: function() {
                // thx David
                if (mfp.scrollbarSize === undefined) {
                    var scrollDiv = document.createElement("div");
                    scrollDiv.style.cssText = 'width: 99px; height: 99px; overflow: scroll; position: absolute; top: -9999px;';
                    document.body.appendChild(scrollDiv);
                    mfp.scrollbarSize = scrollDiv.offsetWidth - scrollDiv.clientWidth;
                    document.body.removeChild(scrollDiv);
                }
                return mfp.scrollbarSize;
            }

        }; /* MagnificPopup core prototype end */




        /**
         * Public static functions
         */
        $.magnificPopup = {
            instance: null,
            proto: MagnificPopup.prototype,
            modules: [],

            open: function(options, index) {
                _checkInstance();

                if (!options) {
                    options = {};
                } else {
                    options = $.extend(true, {}, options);
                }


                options.isObj = true;
                options.index = index || 0;
                return this.instance.open(options);
            },

            close: function() {
                return $.magnificPopup.instance && $.magnificPopup.instance.close();
            },

            registerModule: function(name, module) {
                if (module.options) {
                    $.magnificPopup.defaults[name] = module.options;
                }
                $.extend(this.proto, module.proto);
                this.modules.push(name);
            },

            defaults: {

                // Info about options is in docs:
                // http://dimsemenov.com/plugins/magnific-popup/documentation.html#options

                disableOn: 0,

                key: null,

                midClick: false,

                mainClass: '',

                preloader: true,

                focus: '', // CSS selector of input to focus after popup is opened

                closeOnContentClick: false,

                closeOnBgClick: true,

                closeBtnInside: true,

                showCloseBtn: true,

                enableEscapeKey: true,

                modal: false,

                alignTop: false,

                removalDelay: 0,

                prependTo: null,

                fixedContentPos: 'auto',

                fixedBgPos: 'auto',

                overflowY: 'auto',

                closeMarkup: '<button title="%title%" type="button" class="mfp-close"></button>',

                tClose: 'Close (Esc)',

                tLoading: 'Loading...'

            }
        };



        $.fn.magnificPopup = function(options) {
            _checkInstance();

            var jqEl = $(this);

            // We call some API method of first param is a string
            if (typeof options === "string") {

                if (options === 'open') {
                    var items,
                        itemOpts = _isJQ ? jqEl.data('magnificPopup') : jqEl[0].magnificPopup,
                        index = parseInt(arguments[1], 10) || 0;

                    if (itemOpts.items) {
                        items = itemOpts.items[index];
                    } else {
                        items = jqEl;
                        if (itemOpts.delegate) {
                            items = items.find(itemOpts.delegate);
                        }
                        items = items.eq(index);
                    }
                    mfp._openClick({
                        mfpEl: items
                    }, jqEl, itemOpts);
                } else {
                    if (mfp.isOpen)
                        mfp[options].apply(mfp, Array.prototype.slice.call(arguments, 1));
                }

            } else {
                // clone options obj
                options = $.extend(true, {}, options);

                /*
                 * As Zepto doesn't support .data() method for objects
                 * and it works only in normal browsers
                 * we assign "options" object directly to the DOM element. FTW!
                 */
                if (_isJQ) {
                    jqEl.data('magnificPopup', options);
                } else {
                    jqEl[0].magnificPopup = options;
                }

                mfp.addGroup(jqEl, options);

            }
            return jqEl;
        };


        //Quick benchmark
        /*
        var start = performance.now(),
            i,
            rounds = 1000;

        for(i = 0; i < rounds; i++) {

        }
        console.log('Test #1:', performance.now() - start);

        start = performance.now();
        for(i = 0; i < rounds; i++) {

        }
        console.log('Test #2:', performance.now() - start);
        */


        /*>>core*/

        /*>>inline*/

        var INLINE_NS = 'inline',
            _hiddenClass,
            _inlinePlaceholder,
            _lastInlineElement,
            _putInlineElementsBack = function() {
                if (_lastInlineElement) {
                    _inlinePlaceholder.after(_lastInlineElement.addClass(_hiddenClass)).detach();
                    _lastInlineElement = null;
                }
            };

        $.magnificPopup.registerModule(INLINE_NS, {
            options: {
                hiddenClass: 'hide', // will be appended with `mfp-` prefix
                markup: '',
                tNotFound: 'Content not found'
            },
            proto: {

                initInline: function() {
                    mfp.types.push(INLINE_NS);

                    _mfpOn(CLOSE_EVENT + '.' + INLINE_NS, function() {
                        _putInlineElementsBack();
                    });
                },

                getInline: function(item, template) {

                    _putInlineElementsBack();

                    if (item.src) {
                        var inlineSt = mfp.st.inline,
                            el = $(item.src);

                        if (el.length) {

                            // If target element has parent - we replace it with placeholder and put it back after popup is closed
                            var parent = el[0].parentNode;
                            if (parent && parent.tagName) {
                                if (!_inlinePlaceholder) {
                                    _hiddenClass = inlineSt.hiddenClass;
                                    _inlinePlaceholder = _getEl(_hiddenClass);
                                    _hiddenClass = 'mfp-' + _hiddenClass;
                                }
                                // replace target inline element with placeholder
                                _lastInlineElement = el.after(_inlinePlaceholder).detach().removeClass(_hiddenClass);
                            }

                            mfp.updateStatus('ready');
                        } else {
                            mfp.updateStatus('error', inlineSt.tNotFound);
                            el = $('<div>');
                        }

                        item.inlineElement = el;
                        return el;
                    }

                    mfp.updateStatus('ready');
                    mfp._parseMarkup(template, {}, item);
                    return template;
                }
            }
        });

        /*>>inline*/

        /*>>ajax*/
        var AJAX_NS = 'ajax',
            _ajaxCur,
            _removeAjaxCursor = function() {
                if (_ajaxCur) {
                    _body.removeClass(_ajaxCur);
                }
            },
            _destroyAjaxRequest = function() {
                _removeAjaxCursor();
                if (mfp.req) {
                    mfp.req.abort();
                }
            };

        $.magnificPopup.registerModule(AJAX_NS, {

            options: {
                settings: null,
                cursor: 'mfp-ajax-cur',
                tError: '<a href="%url%">The content</a> could not be loaded.'
            },

            proto: {
                initAjax: function() {
                    mfp.types.push(AJAX_NS);
                    _ajaxCur = mfp.st.ajax.cursor;

                    _mfpOn(CLOSE_EVENT + '.' + AJAX_NS, _destroyAjaxRequest);
                    _mfpOn('BeforeChange.' + AJAX_NS, _destroyAjaxRequest);
                },
                getAjax: function(item) {

                    if (_ajaxCur)
                        _body.addClass(_ajaxCur);

                    mfp.updateStatus('loading');

                    var opts = $.extend({
                        url: item.src,
                        success: function(data, textStatus, jqXHR) {
                            var temp = {
                                data: data,
                                xhr: jqXHR
                            };

                            _mfpTrigger('ParseAjax', temp);

                            mfp.appendContent($(temp.data), AJAX_NS);

                            item.finished = true;

                            _removeAjaxCursor();

                            mfp._setFocus();

                            setTimeout(function() {
                                mfp.wrap.addClass(READY_CLASS);
                            }, 16);

                            mfp.updateStatus('ready');

                            _mfpTrigger('AjaxContentAdded');
                        },
                        error: function() {
                            _removeAjaxCursor();
                            item.finished = item.loadError = true;
                            mfp.updateStatus('error', mfp.st.ajax.tError.replace('%url%', item.src));
                        }
                    }, mfp.st.ajax.settings);

                    mfp.req = $.ajax(opts);

                    return '';
                }
            }
        });







        /*>>ajax*/

        /*>>image*/
        var _imgInterval,
            _getTitle = function(item) {
                if (item.data && item.data.title !== undefined)
                    return item.data.title;

                var src = mfp.st.image.titleSrc;

                if (src) {
                    if ($.isFunction(src)) {
                        return src.call(mfp, item);
                    } else if (item.el) {
                        return item.el.attr(src) || '';
                    }
                }
                return '';
            };

        $.magnificPopup.registerModule('image', {

            options: {
                markup: '<div class="mfp-figure">' +
                    '<div class="mfp-close"></div>' +
                    '<figure>' +
                    '<div class="mfp-img"></div>' +
                    '<figcaption>' +
                    '<div class="mfp-bottom-bar">' +
                    '<div class="mfp-title"></div>' +
                    '<div class="mfp-counter"></div>' +
                    '</div>' +
                    '</figcaption>' +
                    '</figure>' +
                    '</div>',
                cursor: 'mfp-zoom-out-cur',
                titleSrc: 'title',
                verticalFit: true,
                tError: '<a href="%url%">The image</a> could not be loaded.'
            },

            proto: {
                initImage: function() {
                    var imgSt = mfp.st.image,
                        ns = '.image';

                    mfp.types.push('image');

                    _mfpOn(OPEN_EVENT + ns, function() {
                        if (mfp.currItem.type === 'image' && imgSt.cursor) {
                            _body.addClass(imgSt.cursor);
                        }
                    });

                    _mfpOn(CLOSE_EVENT + ns, function() {
                        if (imgSt.cursor) {
                            _body.removeClass(imgSt.cursor);
                        }
                        _window.off('resize' + EVENT_NS);
                    });

                    _mfpOn('Resize' + ns, mfp.resizeImage);
                    if (mfp.isLowIE) {
                        _mfpOn('AfterChange', mfp.resizeImage);
                    }
                },
                resizeImage: function() {
                    var item = mfp.currItem;
                    if (!item || !item.img) return;

                    if (mfp.st.image.verticalFit) {
                        var decr = 0;
                        // fix box-sizing in ie7/8
                        if (mfp.isLowIE) {
                            decr = parseInt(item.img.css('padding-top'), 10) + parseInt(item.img.css('padding-bottom'), 10);
                        }
                        item.img.css('max-height', mfp.wH - decr);
                    }
                },
                _onImageHasSize: function(item) {
                    if (item.img) {

                        item.hasSize = true;

                        if (_imgInterval) {
                            clearInterval(_imgInterval);
                        }

                        item.isCheckingImgSize = false;

                        _mfpTrigger('ImageHasSize', item);

                        if (item.imgHidden) {
                            if (mfp.content)
                                mfp.content.removeClass('mfp-loading');

                            item.imgHidden = false;
                        }

                    }
                },

                /**
                 * Function that loops until the image has size to display elements that rely on it asap
                 */
                findImageSize: function(item) {

                    var counter = 0,
                        img = item.img[0],
                        mfpSetInterval = function(delay) {

                            if (_imgInterval) {
                                clearInterval(_imgInterval);
                            }
                            // decelerating interval that checks for size of an image
                            _imgInterval = setInterval(function() {
                                if (img.naturalWidth > 0) {
                                    mfp._onImageHasSize(item);
                                    return;
                                }

                                if (counter > 200) {
                                    clearInterval(_imgInterval);
                                }

                                counter++;
                                if (counter === 3) {
                                    mfpSetInterval(10);
                                } else if (counter === 40) {
                                    mfpSetInterval(50);
                                } else if (counter === 100) {
                                    mfpSetInterval(500);
                                }
                            }, delay);
                        };

                    mfpSetInterval(1);
                },

                getImage: function(item, template) {

                    var guard = 0,

                        // image load complete handler
                        onLoadComplete = function() {
                            if (item) {
                                if (item.img[0].complete) {
                                    item.img.off('.mfploader');

                                    if (item === mfp.currItem) {
                                        mfp._onImageHasSize(item);

                                        mfp.updateStatus('ready');
                                    }

                                    item.hasSize = true;
                                    item.loaded = true;

                                    _mfpTrigger('ImageLoadComplete');

                                } else {
                                    // if image complete check fails 200 times (20 sec), we assume that there was an error.
                                    guard++;
                                    if (guard < 200) {
                                        setTimeout(onLoadComplete, 100);
                                    } else {
                                        onLoadError();
                                    }
                                }
                            }
                        },

                        // image error handler
                        onLoadError = function() {
                            if (item) {
                                item.img.off('.mfploader');
                                if (item === mfp.currItem) {
                                    mfp._onImageHasSize(item);
                                    mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src));
                                }

                                item.hasSize = true;
                                item.loaded = true;
                                item.loadError = true;
                            }
                        },
                        imgSt = mfp.st.image;


                    var el = template.find('.mfp-img');
                    if (el.length) {
                        var img = document.createElement('img');
                        img.className = 'mfp-img';
                        item.img = $(img).on('load.mfploader', onLoadComplete).on('error.mfploader', onLoadError);
                        img.src = item.src;

                        // without clone() "error" event is not firing when IMG is replaced by new IMG
                        // TODO: find a way to avoid such cloning
                        if (el.is('img')) {
                            item.img = item.img.clone();
                        }

                        img = item.img[0];
                        if (img.naturalWidth > 0) {
                            item.hasSize = true;
                        } else if (!img.width) {
                            item.hasSize = false;
                        }
                    }

                    mfp._parseMarkup(template, {
                        title: _getTitle(item),
                        img_replaceWith: item.img
                    }, item);

                    mfp.resizeImage();

                    if (item.hasSize) {
                        if (_imgInterval) clearInterval(_imgInterval);

                        if (item.loadError) {
                            template.addClass('mfp-loading');
                            mfp.updateStatus('error', imgSt.tError.replace('%url%', item.src));
                        } else {
                            template.removeClass('mfp-loading');
                            mfp.updateStatus('ready');
                        }
                        return template;
                    }

                    mfp.updateStatus('loading');
                    item.loading = true;

                    if (!item.hasSize) {
                        item.imgHidden = true;
                        template.addClass('mfp-loading');
                        mfp.findImageSize(item);
                    }

                    return template;
                }
            }
        });



        /*>>image*/

        /*>>zoom*/
        var hasMozTransform,
            getHasMozTransform = function() {
                if (hasMozTransform === undefined) {
                    hasMozTransform = document.createElement('p').style.MozTransform !== undefined;
                }
                return hasMozTransform;
            };

        $.magnificPopup.registerModule('zoom', {

            options: {
                enabled: false,
                easing: 'ease-in-out',
                duration: 300,
                opener: function(element) {
                    return element.is('img') ? element : element.find('img');
                }
            },

            proto: {

                initZoom: function() {
                    var zoomSt = mfp.st.zoom,
                        ns = '.zoom',
                        image;

                    if (!zoomSt.enabled || !mfp.supportsTransition) {
                        return;
                    }

                    var duration = zoomSt.duration,
                        getElToAnimate = function(image) {
                            var newImg = image.clone().removeAttr('style').removeAttr('class').addClass('mfp-animated-image'),
                                transition = 'all ' + (zoomSt.duration / 1000) + 's ' + zoomSt.easing,
                                cssObj = {
                                    position: 'fixed',
                                    zIndex: 9999,
                                    left: 0,
                                    top: 0,
                                    '-webkit-backface-visibility': 'hidden'
                                },
                                t = 'transition';

                            cssObj['-webkit-' + t] = cssObj['-moz-' + t] = cssObj['-o-' + t] = cssObj[t] = transition;

                            newImg.css(cssObj);
                            return newImg;
                        },
                        showMainContent = function() {
                            mfp.content.css('visibility', 'visible');
                        },
                        openTimeout,
                        animatedImg;

                    _mfpOn('BuildControls' + ns, function() {
                        if (mfp._allowZoom()) {

                            clearTimeout(openTimeout);
                            mfp.content.css('visibility', 'hidden');

                            // Basically, all code below does is clones existing image, puts in on top of the current one and animated it

                            image = mfp._getItemToZoom();

                            if (!image) {
                                showMainContent();
                                return;
                            }

                            animatedImg = getElToAnimate(image);

                            animatedImg.css(mfp._getOffset());

                            mfp.wrap.append(animatedImg);

                            openTimeout = setTimeout(function() {
                                animatedImg.css(mfp._getOffset(true));
                                openTimeout = setTimeout(function() {

                                    showMainContent();

                                    setTimeout(function() {
                                        animatedImg.remove();
                                        image = animatedImg = null;
                                        _mfpTrigger('ZoomAnimationEnded');
                                    }, 16); // avoid blink when switching images 

                                }, duration); // this timeout equals animation duration

                            }, 16); // by adding this timeout we avoid short glitch at the beginning of animation


                            // Lots of timeouts...
                        }
                    });
                    _mfpOn(BEFORE_CLOSE_EVENT + ns, function() {
                        if (mfp._allowZoom()) {

                            clearTimeout(openTimeout);

                            mfp.st.removalDelay = duration;

                            if (!image) {
                                image = mfp._getItemToZoom();
                                if (!image) {
                                    return;
                                }
                                animatedImg = getElToAnimate(image);
                            }


                            animatedImg.css(mfp._getOffset(true));
                            mfp.wrap.append(animatedImg);
                            mfp.content.css('visibility', 'hidden');

                            setTimeout(function() {
                                animatedImg.css(mfp._getOffset());
                            }, 16);
                        }

                    });

                    _mfpOn(CLOSE_EVENT + ns, function() {
                        if (mfp._allowZoom()) {
                            showMainContent();
                            if (animatedImg) {
                                animatedImg.remove();
                            }
                            image = null;
                        }
                    });
                },

                _allowZoom: function() {
                    return mfp.currItem.type === 'image';
                },

                _getItemToZoom: function() {
                    if (mfp.currItem.hasSize) {
                        return mfp.currItem.img;
                    } else {
                        return false;
                    }
                },

                // Get element postion relative to viewport
                _getOffset: function(isLarge) {
                    var el;
                    if (isLarge) {
                        el = mfp.currItem.img;
                    } else {
                        el = mfp.st.zoom.opener(mfp.currItem.el || mfp.currItem);
                    }

                    var offset = el.offset();
                    var paddingTop = parseInt(el.css('padding-top'), 10);
                    var paddingBottom = parseInt(el.css('padding-bottom'), 10);
                    offset.top -= ($(window).scrollTop() - paddingTop);


                    /*
                    
                    Animating left + top + width/height looks glitchy in Firefox, but perfect in Chrome. And vice-versa.

                     */
                    var obj = {
                        width: el.width(),
                        // fix Zepto height+padding issue
                        height: (_isJQ ? el.innerHeight() : el[0].offsetHeight) - paddingBottom - paddingTop
                    };

                    // I hate to do this, but there is no another option
                    if (getHasMozTransform()) {
                        obj['-moz-transform'] = obj['transform'] = 'translate(' + offset.left + 'px,' + offset.top + 'px)';
                    } else {
                        obj.left = offset.left;
                        obj.top = offset.top;
                    }
                    return obj;
                }

            }
        });



        /*>>zoom*/

        /*>>iframe*/

        var IFRAME_NS = 'iframe',
            _emptyPage = '//about:blank',

            _fixIframeBugs = function(isShowing) {
                if (mfp.currTemplate[IFRAME_NS]) {
                    var el = mfp.currTemplate[IFRAME_NS].find('iframe');
                    if (el.length) {
                        // reset src after the popup is closed to avoid "video keeps playing after popup is closed" bug
                        if (!isShowing) {
                            el[0].src = _emptyPage;
                        }

                        // IE8 black screen bug fix
                        if (mfp.isIE8) {
                            el.css('display', isShowing ? 'block' : 'none');
                        }
                    }
                }
            };

        $.magnificPopup.registerModule(IFRAME_NS, {

            options: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" src="//about:blank" frameborder="0" allowfullscreen></iframe>' +
                    '</div>',

                srcAction: 'iframe_src',

                // we don't care and support only one default type of URL by default
                patterns: {
                    youtube: {
                        index: 'youtube.com',
                        id: 'v=',
                        src: '//www.youtube.com/embed/%id%?autoplay=1'
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                        index: '//maps.google.',
                        src: '%id%&output=embed'
                    }
                }
            },

            proto: {
                initIframe: function() {
                    mfp.types.push(IFRAME_NS);

                    _mfpOn('BeforeChange', function(e, prevType, newType) {
                        if (prevType !== newType) {
                            if (prevType === IFRAME_NS) {
                                _fixIframeBugs(); // iframe if removed
                            } else if (newType === IFRAME_NS) {
                                _fixIframeBugs(true); // iframe is showing
                            }
                        } // else {
                        // iframe source is switched, don't do anything
                        //}
                    });

                    _mfpOn(CLOSE_EVENT + '.' + IFRAME_NS, function() {
                        _fixIframeBugs();
                    });
                },

                getIframe: function(item, template) {
                    var embedSrc = item.src;
                    var iframeSt = mfp.st.iframe;

                    $.each(iframeSt.patterns, function() {
                        if (embedSrc.indexOf(this.index) > -1) {
                            if (this.id) {
                                if (typeof this.id === 'string') {
                                    embedSrc = embedSrc.substr(embedSrc.lastIndexOf(this.id) + this.id.length, embedSrc.length);
                                } else {
                                    embedSrc = this.id.call(this, embedSrc);
                                }
                            }
                            embedSrc = this.src.replace('%id%', embedSrc);
                            return false; // break;
                        }
                    });

                    var dataObj = {};
                    if (iframeSt.srcAction) {
                        dataObj[iframeSt.srcAction] = embedSrc;
                    }
                    mfp._parseMarkup(template, dataObj, item);

                    mfp.updateStatus('ready');

                    return template;
                }
            }
        });



        /*>>iframe*/

        /*>>gallery*/
        /**
         * Get looped index depending on number of slides
         */
        var _getLoopedId = function(index) {
            var numSlides = mfp.items.length;
            if (index > numSlides - 1) {
                return index - numSlides;
            } else if (index < 0) {
                return numSlides + index;
            }
            return index;
        },
            _replaceCurrTotal = function(text, curr, total) {
                return text.replace(/%curr%/gi, curr + 1).replace(/%total%/gi, total);
            };

        $.magnificPopup.registerModule('gallery', {

            options: {
                enabled: false,
                arrowMarkup: '<button title="%title%" type="button" class="mfp-arrow mfp-arrow-%dir%"></button>',
                preload: [0, 2],
                navigateByImgClick: true,
                arrows: true,

                tPrev: 'Previous (Left arrow key)',
                tNext: 'Next (Right arrow key)',
                tCounter: '%curr% of %total%'
            },

            proto: {
                initGallery: function() {

                    var gSt = mfp.st.gallery,
                        ns = '.mfp-gallery',
                        supportsFastClick = Boolean($.fn.mfpFastClick);

                    mfp.direction = true; // true - next, false - prev

                    if (!gSt || !gSt.enabled) return false;

                    _wrapClasses += ' mfp-gallery';

                    _mfpOn(OPEN_EVENT + ns, function() {

                        if (gSt.navigateByImgClick) {
                            mfp.wrap.on('click' + ns, '.mfp-img', function() {
                                if (mfp.items.length > 1) {
                                    mfp.next();
                                    return false;
                                }
                            });
                        }

                        _document.on('keydown' + ns, function(e) {
                            if (e.keyCode === 37) {
                                mfp.prev();
                            } else if (e.keyCode === 39) {
                                mfp.next();
                            }
                        });
                    });

                    _mfpOn('UpdateStatus' + ns, function(e, data) {
                        if (data.text) {
                            data.text = _replaceCurrTotal(data.text, mfp.currItem.index, mfp.items.length);
                        }
                    });

                    _mfpOn(MARKUP_PARSE_EVENT + ns, function(e, element, values, item) {
                        var l = mfp.items.length;
                        values.counter = l > 1 ? _replaceCurrTotal(gSt.tCounter, item.index, l) : '';
                    });

                    _mfpOn('BuildControls' + ns, function() {
                        if (mfp.items.length > 1 && gSt.arrows && !mfp.arrowLeft) {
                            var markup = gSt.arrowMarkup,
                                arrowLeft = mfp.arrowLeft = $(markup.replace(/%title%/gi, gSt.tPrev).replace(/%dir%/gi, 'left')).addClass(PREVENT_CLOSE_CLASS),
                                arrowRight = mfp.arrowRight = $(markup.replace(/%title%/gi, gSt.tNext).replace(/%dir%/gi, 'right')).addClass(PREVENT_CLOSE_CLASS);

                            var eName = supportsFastClick ? 'mfpFastClick' : 'click';
                            arrowLeft[eName](function() {
                                mfp.prev();
                            });
                            arrowRight[eName](function() {
                                mfp.next();
                            });

                            // Polyfill for :before and :after (adds elements with classes mfp-a and mfp-b)
                            if (mfp.isIE7) {
                                _getEl('b', arrowLeft[0], false, true);
                                _getEl('a', arrowLeft[0], false, true);
                                _getEl('b', arrowRight[0], false, true);
                                _getEl('a', arrowRight[0], false, true);
                            }

                            mfp.container.append(arrowLeft.add(arrowRight));
                        }
                    });

                    _mfpOn(CHANGE_EVENT + ns, function() {
                        if (mfp._preloadTimeout) clearTimeout(mfp._preloadTimeout);

                        mfp._preloadTimeout = setTimeout(function() {
                            mfp.preloadNearbyImages();
                            mfp._preloadTimeout = null;
                        }, 16);
                    });


                    _mfpOn(CLOSE_EVENT + ns, function() {
                        _document.off(ns);
                        mfp.wrap.off('click' + ns);

                        if (mfp.arrowLeft && supportsFastClick) {
                            mfp.arrowLeft.add(mfp.arrowRight).destroyMfpFastClick();
                        }
                        mfp.arrowRight = mfp.arrowLeft = null;
                    });

                },
                next: function() {
                    mfp.direction = true;
                    mfp.index = _getLoopedId(mfp.index + 1);
                    mfp.updateItemHTML();
                },
                prev: function() {
                    mfp.direction = false;
                    mfp.index = _getLoopedId(mfp.index - 1);
                    mfp.updateItemHTML();
                },
                goTo: function(newIndex) {
                    mfp.direction = (newIndex >= mfp.index);
                    mfp.index = newIndex;
                    mfp.updateItemHTML();
                },
                preloadNearbyImages: function() {
                    var p = mfp.st.gallery.preload,
                        preloadBefore = Math.min(p[0], mfp.items.length),
                        preloadAfter = Math.min(p[1], mfp.items.length),
                        i;

                    for (i = 1; i <= (mfp.direction ? preloadAfter : preloadBefore); i++) {
                        mfp._preloadItem(mfp.index + i);
                    }
                    for (i = 1; i <= (mfp.direction ? preloadBefore : preloadAfter); i++) {
                        mfp._preloadItem(mfp.index - i);
                    }
                },
                _preloadItem: function(index) {
                    index = _getLoopedId(index);

                    if (mfp.items[index].preloaded) {
                        return;
                    }

                    var item = mfp.items[index];
                    if (!item.parsed) {
                        item = mfp.parseEl(index);
                    }

                    _mfpTrigger('LazyLoad', item);

                    if (item.type === 'image') {
                        item.img = $('<img class="mfp-img" />').on('load.mfploader', function() {
                            item.hasSize = true;
                        }).on('error.mfploader', function() {
                            item.hasSize = true;
                            item.loadError = true;
                            _mfpTrigger('LazyLoadError', item);
                        }).attr('src', item.src);
                    }


                    item.preloaded = true;
                }
            }
        });

        /*
        Touch Support that might be implemented some day

        addSwipeGesture: function() {
            var startX,
                moved,
                multipleTouches;

                return;

            var namespace = '.mfp',
                addEventNames = function(pref, down, move, up, cancel) {
                    mfp._tStart = pref + down + namespace;
                    mfp._tMove = pref + move + namespace;
                    mfp._tEnd = pref + up + namespace;
                    mfp._tCancel = pref + cancel + namespace;
                };

            if(window.navigator.msPointerEnabled) {
                addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
            } else if('ontouchstart' in window) {
                addEventNames('touch', 'start', 'move', 'end', 'cancel');
            } else {
                return;
            }
            _window.on(mfp._tStart, function(e) {
                var oE = e.originalEvent;
                multipleTouches = moved = false;
                startX = oE.pageX || oE.changedTouches[0].pageX;
            }).on(mfp._tMove, function(e) {
                if(e.originalEvent.touches.length > 1) {
                    multipleTouches = e.originalEvent.touches.length;
                } else {
                    //e.preventDefault();
                    moved = true;
                }
            }).on(mfp._tEnd + ' ' + mfp._tCancel, function(e) {
                if(moved && !multipleTouches) {
                    var oE = e.originalEvent,
                        diff = startX - (oE.pageX || oE.changedTouches[0].pageX);

                    if(diff > 20) {
                        mfp.next();
                    } else if(diff < -20) {
                        mfp.prev();
                    }
                }
            });
        },
        */


        /*>>gallery*/

        /*>>retina*/

        var RETINA_NS = 'retina';

        $.magnificPopup.registerModule(RETINA_NS, {
            options: {
                replaceSrc: function(item) {
                    return item.src.replace(/\.\w+$/, function(m) {
                        return '@2x' + m;
                    });
                },
                ratio: 1 // Function or number.  Set to 1 to disable.
            },
            proto: {
                initRetina: function() {
                    if (window.devicePixelRatio > 1) {

                        var st = mfp.st.retina,
                            ratio = st.ratio;

                        ratio = !isNaN(ratio) ? ratio : ratio();

                        if (ratio > 1) {
                            _mfpOn('ImageHasSize' + '.' + RETINA_NS, function(e, item) {
                                item.img.css({
                                    'max-width': item.img[0].naturalWidth / ratio,
                                    'width': '100%'
                                });
                            });
                            _mfpOn('ElementParse' + '.' + RETINA_NS, function(e, item) {
                                item.src = st.replaceSrc(item, ratio);
                            });
                        }
                    }

                }
            }
        });

        /*>>retina*/

        /*>>fastclick*/
        /**
         * FastClick event implementation. (removes 300ms delay on touch devices)
         * Based on https://developers.google.com/mobile/articles/fast_buttons
         *
         * You may use it outside the Magnific Popup by calling just:
         *
         * $('.your-el').mfpFastClick(function() {
         *     console.log('Clicked!');
         * });
         *
         * To unbind:
         * $('.your-el').destroyMfpFastClick();
         *
         *
         * Note that it's a very basic and simple implementation, it blocks ghost click on the same element where it was bound.
         * If you need something more advanced, use plugin by FT Labs https://github.com/ftlabs/fastclick
         *
         */

        (function() {
            var ghostClickDelay = 1000,
                supportsTouch = 'ontouchstart' in window,
                unbindTouchMove = function() {
                    _window.off('touchmove' + ns + ' touchend' + ns);
                },
                eName = 'mfpFastClick',
                ns = '.' + eName;


            // As Zepto.js doesn't have an easy way to add custom events (like jQuery), so we implement it in this way
            $.fn.mfpFastClick = function(callback) {

                return $(this).each(function() {

                    var elem = $(this),
                        lock;

                    if (supportsTouch) {

                        var timeout,
                            startX,
                            startY,
                            pointerMoved,
                            point,
                            numPointers;

                        elem.on('touchstart' + ns, function(e) {
                            pointerMoved = false;
                            numPointers = 1;

                            point = e.originalEvent ? e.originalEvent.touches[0] : e.touches[0];
                            startX = point.clientX;
                            startY = point.clientY;

                            _window.on('touchmove' + ns, function(e) {
                                point = e.originalEvent ? e.originalEvent.touches : e.touches;
                                numPointers = point.length;
                                point = point[0];
                                if (Math.abs(point.clientX - startX) > 10 ||
                                    Math.abs(point.clientY - startY) > 10) {
                                    pointerMoved = true;
                                    unbindTouchMove();
                                }
                            }).on('touchend' + ns, function(e) {
                                unbindTouchMove();
                                if (pointerMoved || numPointers > 1) {
                                    return;
                                }
                                lock = true;
                                e.preventDefault();
                                clearTimeout(timeout);
                                timeout = setTimeout(function() {
                                    lock = false;
                                }, ghostClickDelay);
                                callback();
                            });
                        });

                    }

                    elem.on('click' + ns, function() {
                        if (!lock) {
                            callback();
                        }
                    });
                });
            };

            $.fn.destroyMfpFastClick = function() {
                $(this).off('touchstart' + ns + ' click' + ns);
                if (supportsTouch) _window.off('touchmove' + ns + ' touchend' + ns);
            };
        })();

        /*>>fastclick*/
        _checkInstance();
    })(window.jQuery || window.Zepto);
 !function(){"use strict";function e(e){e.fn.swiper=function(s){var t;return e(this).each(function(){var e=new a(this,s);t||(t=e)}),t}}var a=function(e,s){function t(){return"horizontal"===h.params.direction}function r(){h.autoplayTimeoutId=setTimeout(function(){h.params.loop?(h.fixLoop(),h._slideNext()):h.isEnd?s.autoplayStopOnLast?h.stopAutoplay():h._slideTo(0):h._slideNext()},h.params.autoplay)}function i(e,a){var s=v(e.target);if(!s.is(a))if("string"==typeof a)s=s.parents(a);else if(a.nodeType){var t;return s.parents().each(function(e,s){s===a&&(t=a)}),t?a:void 0}return 0===s.length?void 0:s[0]}function n(e,a){a=a||{};var s=window.MutationObserver||window.WebkitMutationObserver,t=new s(function(e){e.forEach(function(e){h.onResize(!0),h.emit("onObserverUpdate",h,e)})});t.observe(e,{attributes:"undefined"==typeof a.attributes?!0:a.attributes,childList:"undefined"==typeof a.childList?!0:a.childList,characterData:"undefined"==typeof a.characterData?!0:a.characterData}),h.observers.push(t)}function o(e){e.originalEvent&&(e=e.originalEvent);var a=e.keyCode||e.charCode;if(!h.params.allowSwipeToNext&&(t()&&39===a||!t()&&40===a))return!1;if(!h.params.allowSwipeToPrev&&(t()&&37===a||!t()&&38===a))return!1;if(!(e.shiftKey||e.altKey||e.ctrlKey||e.metaKey||document.activeElement&&document.activeElement.nodeName&&("input"===document.activeElement.nodeName.toLowerCase()||"textarea"===document.activeElement.nodeName.toLowerCase()))){if(37===a||39===a||38===a||40===a){var s=!1;if(h.container.parents(".swiper-slide").length>0&&0===h.container.parents(".swiper-slide-active").length)return;var r={left:window.pageXOffset,top:window.pageYOffset},i=window.innerWidth,n=window.innerHeight,o=h.container.offset();h.rtl&&(o.left=o.left-h.container[0].scrollLeft);for(var l=[[o.left,o.top],[o.left+h.width,o.top],[o.left,o.top+h.height],[o.left+h.width,o.top+h.height]],d=0;d<l.length;d++){var p=l[d];p[0]>=r.left&&p[0]<=r.left+i&&p[1]>=r.top&&p[1]<=r.top+n&&(s=!0)}if(!s)return}t()?((37===a||39===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),(39===a&&!h.rtl||37===a&&h.rtl)&&h.slideNext(),(37===a&&!h.rtl||39===a&&h.rtl)&&h.slidePrev()):((38===a||40===a)&&(e.preventDefault?e.preventDefault():e.returnValue=!1),40===a&&h.slideNext(),38===a&&h.slidePrev())}}function l(e){e.originalEvent&&(e=e.originalEvent);var a=h.mousewheel.event,s=0;if(e.detail)s=-e.detail;else if("mousewheel"===a)if(h.params.mousewheelForceToAxis)if(t()){if(!(Math.abs(e.wheelDeltaX)>Math.abs(e.wheelDeltaY)))return;s=e.wheelDeltaX}else{if(!(Math.abs(e.wheelDeltaY)>Math.abs(e.wheelDeltaX)))return;s=e.wheelDeltaY}else s=e.wheelDelta;else if("DOMMouseScroll"===a)s=-e.detail;else if("wheel"===a)if(h.params.mousewheelForceToAxis)if(t()){if(!(Math.abs(e.deltaX)>Math.abs(e.deltaY)))return;s=-e.deltaX}else{if(!(Math.abs(e.deltaY)>Math.abs(e.deltaX)))return;s=-e.deltaY}else s=Math.abs(e.deltaX)>Math.abs(e.deltaY)?-e.deltaX:-e.deltaY;if(h.params.mousewheelInvert&&(s=-s),h.params.freeMode){var r=h.getWrapperTranslate()+s;if(r>0&&(r=0),r<h.maxTranslate()&&(r=h.maxTranslate()),h.setWrapperTransition(0),h.setWrapperTranslate(r),h.updateProgress(),h.updateActiveIndex(),h.params.freeModeSticky&&(clearTimeout(h.mousewheel.timeout),h.mousewheel.timeout=setTimeout(function(){h.slideReset()},300)),0===r||r===h.maxTranslate())return}else{if((new window.Date).getTime()-h.mousewheel.lastScrollTime>60)if(0>s)if(h.isEnd){if(h.params.mousewheelReleaseOnEdges)return!0}else h.slideNext();else if(h.isBeginning){if(h.params.mousewheelReleaseOnEdges)return!0}else h.slidePrev();h.mousewheel.lastScrollTime=(new window.Date).getTime()}return h.params.autoplay&&h.stopAutoplay(),e.preventDefault?e.preventDefault():e.returnValue=!1,!1}function d(e,a){e=v(e);var s,r,i;s=e.attr("data-swiper-parallax")||"0",r=e.attr("data-swiper-parallax-x"),i=e.attr("data-swiper-parallax-y"),r||i?(r=r||"0",i=i||"0"):t()?(r=s,i="0"):(i=s,r="0"),r=r.indexOf("%")>=0?parseInt(r,10)*a+"%":r*a+"px",i=i.indexOf("%")>=0?parseInt(i,10)*a+"%":i*a+"px",e.transform("translate3d("+r+", "+i+",0px)")}function p(e){return 0!==e.indexOf("on")&&(e=e[0]!==e[0].toUpperCase()?"on"+e[0].toUpperCase()+e.substring(1):"on"+e),e}if(!(this instanceof a))return new a(e,s);var u={direction:"horizontal",touchEventsTarget:"container",initialSlide:0,speed:300,autoplay:!1,autoplayDisableOnInteraction:!0,freeMode:!1,freeModeMomentum:!0,freeModeMomentumRatio:1,freeModeMomentumBounce:!0,freeModeMomentumBounceRatio:1,freeModeSticky:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",coverflow:{rotate:50,stretch:0,depth:100,modifier:1,slideShadows:!0},cube:{slideShadows:!0,shadow:!0,shadowOffset:20,shadowScale:.94},fade:{crossFade:!1},parallax:!1,scrollbar:null,scrollbarHide:!0,keyboardControl:!1,mousewheelControl:!1,mousewheelReleaseOnEdges:!1,mousewheelInvert:!1,mousewheelForceToAxis:!1,hashnav:!1,spaceBetween:0,slidesPerView:1,slidesPerColumn:1,slidesPerColumnFill:"column",slidesPerGroup:1,centeredSlides:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,onlyExternal:!1,threshold:0,touchMoveStopPropagation:!0,pagination:null,paginationClickable:!1,paginationHide:!1,paginationBulletRender:null,resistance:!0,resistanceRatio:.85,nextButton:null,prevButton:null,watchSlidesProgress:!1,watchSlidesVisibility:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,lazyLoading:!1,lazyLoadingInPrevNext:!1,lazyLoadingOnTransitionStart:!1,preloadImages:!0,updateOnImagesReady:!0,loop:!1,loopAdditionalSlides:0,loopedSlides:null,control:void 0,controlInverse:!1,allowSwipeToPrev:!0,allowSwipeToNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",slideClass:"swiper-slide",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideDuplicateClass:"swiper-slide-duplicate",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",bulletClass:"swiper-pagination-bullet",bulletActiveClass:"swiper-pagination-bullet-active",buttonDisabledClass:"swiper-button-disabled",paginationHiddenClass:"swiper-pagination-hidden",observer:!1,observeParents:!1,a11y:!1,prevSlideMessage:"Previous slide",nextSlideMessage:"Next slide",firstSlideMessage:"This is the first slide",lastSlideMessage:"This is the last slide",runCallbacksOnInit:!0},c=s&&s.virtualTranslate;s=s||{};for(var m in u)if("undefined"==typeof s[m])s[m]=u[m];else if("object"==typeof s[m])for(var f in u[m])"undefined"==typeof s[m][f]&&(s[m][f]=u[m][f]);var h=this;h.version="3.0.8",h.params=s,h.classNames=[];var v;if(v="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7,v&&(h.$=v,h.container=v(e),0!==h.container.length)){if(h.container.length>1)return h.container.each(function(){new a(this,s)}),void 0;h.container[0].swiper=h,h.container.data("swiper",h),h.classNames.push("swiper-container-"+h.params.direction),h.params.freeMode&&h.classNames.push("swiper-container-free-mode"),h.support.flexbox||(h.classNames.push("swiper-container-no-flexbox"),h.params.slidesPerColumn=1),(h.params.parallax||h.params.watchSlidesVisibility)&&(h.params.watchSlidesProgress=!0),["cube","coverflow"].indexOf(h.params.effect)>=0&&(h.support.transforms3d?(h.params.watchSlidesProgress=!0,h.classNames.push("swiper-container-3d")):h.params.effect="slide"),"slide"!==h.params.effect&&h.classNames.push("swiper-container-"+h.params.effect),"cube"===h.params.effect&&(h.params.resistanceRatio=0,h.params.slidesPerView=1,h.params.slidesPerColumn=1,h.params.slidesPerGroup=1,h.params.centeredSlides=!1,h.params.spaceBetween=0,h.params.virtualTranslate=!0,h.params.setWrapperSize=!1),"fade"===h.params.effect&&(h.params.slidesPerView=1,h.params.slidesPerColumn=1,h.params.slidesPerGroup=1,h.params.watchSlidesProgress=!0,h.params.spaceBetween=0,"undefined"==typeof c&&(h.params.virtualTranslate=!0)),h.params.grabCursor&&h.support.touch&&(h.params.grabCursor=!1),h.wrapper=h.container.children("."+h.params.wrapperClass),h.params.pagination&&(h.paginationContainer=v(h.params.pagination),h.params.paginationClickable&&h.paginationContainer.addClass("swiper-pagination-clickable")),h.rtl=t()&&("rtl"===h.container[0].dir.toLowerCase()||"rtl"===h.container.css("direction")),h.rtl&&h.classNames.push("swiper-container-rtl"),h.rtl&&(h.wrongRTL="-webkit-box"===h.wrapper.css("display")),h.params.slidesPerColumn>1&&h.classNames.push("swiper-container-multirow"),h.device.android&&h.classNames.push("swiper-container-android"),h.container.addClass(h.classNames.join(" ")),h.translate=0,h.progress=0,h.velocity=0,h.lockSwipeToNext=function(){h.params.allowSwipeToNext=!1},h.lockSwipeToPrev=function(){h.params.allowSwipeToPrev=!1},h.lockSwipes=function(){h.params.allowSwipeToNext=h.params.allowSwipeToPrev=!1},h.unlockSwipeToNext=function(){h.params.allowSwipeToNext=!0},h.unlockSwipeToPrev=function(){h.params.allowSwipeToPrev=!0},h.unlockSwipes=function(){h.params.allowSwipeToNext=h.params.allowSwipeToPrev=!0},h.params.grabCursor&&(h.container[0].style.cursor="move",h.container[0].style.cursor="-webkit-grab",h.container[0].style.cursor="-moz-grab",h.container[0].style.cursor="grab"),h.imagesToLoad=[],h.imagesLoaded=0,h.loadImage=function(e,a,s,t){function r(){t&&t()}var i;e.complete&&s?r():a?(i=new window.Image,i.onload=r,i.onerror=r,i.src=a):r()},h.preloadImages=function(){function e(){"undefined"!=typeof h&&null!==h&&(void 0!==h.imagesLoaded&&h.imagesLoaded++,h.imagesLoaded===h.imagesToLoad.length&&(h.params.updateOnImagesReady&&h.update(),h.emit("onImagesReady",h)))}h.imagesToLoad=h.container.find("img");for(var a=0;a<h.imagesToLoad.length;a++)h.loadImage(h.imagesToLoad[a],h.imagesToLoad[a].currentSrc||h.imagesToLoad[a].getAttribute("src"),!0,e)},h.autoplayTimeoutId=void 0,h.autoplaying=!1,h.autoplayPaused=!1,h.startAutoplay=function(){return"undefined"!=typeof h.autoplayTimeoutId?!1:h.params.autoplay?h.autoplaying?!1:(h.autoplaying=!0,h.emit("onAutoplayStart",h),r(),void 0):!1},h.stopAutoplay=function(){h.autoplayTimeoutId&&(h.autoplayTimeoutId&&clearTimeout(h.autoplayTimeoutId),h.autoplaying=!1,h.autoplayTimeoutId=void 0,h.emit("onAutoplayStop",h))},h.pauseAutoplay=function(e){h.autoplayPaused||(h.autoplayTimeoutId&&clearTimeout(h.autoplayTimeoutId),h.autoplayPaused=!0,0===e?(h.autoplayPaused=!1,r()):h.wrapper.transitionEnd(function(){h&&(h.autoplayPaused=!1,h.autoplaying?r():h.stopAutoplay())}))},h.minTranslate=function(){return-h.snapGrid[0]},h.maxTranslate=function(){return-h.snapGrid[h.snapGrid.length-1]},h.updateContainerSize=function(){var e,a;e="undefined"!=typeof h.params.width?h.params.width:h.container[0].clientWidth,a="undefined"!=typeof h.params.height?h.params.height:h.container[0].clientHeight,0===e&&t()||0===a&&!t()||(h.width=e,h.height=a,h.size=t()?h.width:h.height)},h.updateSlidesSize=function(){h.slides=h.wrapper.children("."+h.params.slideClass),h.snapGrid=[],h.slidesGrid=[],h.slidesSizesGrid=[];var e,a=h.params.spaceBetween,s=0,r=0,i=0;"string"==typeof a&&a.indexOf("%")>=0&&(a=parseFloat(a.replace("%",""))/100*h.size),h.virtualSize=-a,h.rtl?h.slides.css({marginLeft:"",marginTop:""}):h.slides.css({marginRight:"",marginBottom:""});var n;h.params.slidesPerColumn>1&&(n=Math.floor(h.slides.length/h.params.slidesPerColumn)===h.slides.length/h.params.slidesPerColumn?h.slides.length:Math.ceil(h.slides.length/h.params.slidesPerColumn)*h.params.slidesPerColumn);var o,l=h.params.slidesPerColumn,d=n/l,p=d-(h.params.slidesPerColumn*d-h.slides.length);for(e=0;e<h.slides.length;e++){o=0;var u=h.slides.eq(e);if(h.params.slidesPerColumn>1){var c,m,f;"column"===h.params.slidesPerColumnFill?(m=Math.floor(e/l),f=e-m*l,(m>p||m===p&&f===l-1)&&++f>=l&&(f=0,m++),c=m+f*n/l,u.css({"-webkit-box-ordinal-group":c,"-moz-box-ordinal-group":c,"-ms-flex-order":c,"-webkit-order":c,order:c})):(f=Math.floor(e/d),m=e-f*d),u.css({"margin-top":0!==f&&h.params.spaceBetween&&h.params.spaceBetween+"px"}).attr("data-swiper-column",m).attr("data-swiper-row",f)}"none"!==u.css("display")&&("auto"===h.params.slidesPerView?o=t()?u.outerWidth(!0):u.outerHeight(!0):(o=(h.size-(h.params.slidesPerView-1)*a)/h.params.slidesPerView,t()?h.slides[e].style.width=o+"px":h.slides[e].style.height=o+"px"),h.slides[e].swiperSlideSize=o,h.slidesSizesGrid.push(o),h.params.centeredSlides?(s=s+o/2+r/2+a,0===e&&(s=s-h.size/2-a),Math.abs(s)<.001&&(s=0),i%h.params.slidesPerGroup===0&&h.snapGrid.push(s),h.slidesGrid.push(s)):(i%h.params.slidesPerGroup===0&&h.snapGrid.push(s),h.slidesGrid.push(s),s=s+o+a),h.virtualSize+=o+a,r=o,i++)}h.virtualSize=Math.max(h.virtualSize,h.size);var v;if(h.rtl&&h.wrongRTL&&("slide"===h.params.effect||"coverflow"===h.params.effect)&&h.wrapper.css({width:h.virtualSize+h.params.spaceBetween+"px"}),(!h.support.flexbox||h.params.setWrapperSize)&&(t()?h.wrapper.css({width:h.virtualSize+h.params.spaceBetween+"px"}):h.wrapper.css({height:h.virtualSize+h.params.spaceBetween+"px"})),h.params.slidesPerColumn>1&&(h.virtualSize=(o+h.params.spaceBetween)*n,h.virtualSize=Math.ceil(h.virtualSize/h.params.slidesPerColumn)-h.params.spaceBetween,h.wrapper.css({width:h.virtualSize+h.params.spaceBetween+"px"}),h.params.centeredSlides)){for(v=[],e=0;e<h.snapGrid.length;e++)h.snapGrid[e]<h.virtualSize+h.snapGrid[0]&&v.push(h.snapGrid[e]);h.snapGrid=v}if(!h.params.centeredSlides){for(v=[],e=0;e<h.snapGrid.length;e++)h.snapGrid[e]<=h.virtualSize-h.size&&v.push(h.snapGrid[e]);h.snapGrid=v,Math.floor(h.virtualSize-h.size)>Math.floor(h.snapGrid[h.snapGrid.length-1])&&h.snapGrid.push(h.virtualSize-h.size)}0===h.snapGrid.length&&(h.snapGrid=[0]),0!==h.params.spaceBetween&&(t()?h.rtl?h.slides.css({marginLeft:a+"px"}):h.slides.css({marginRight:a+"px"}):h.slides.css({marginBottom:a+"px"})),h.params.watchSlidesProgress&&h.updateSlidesOffset()},h.updateSlidesOffset=function(){for(var e=0;e<h.slides.length;e++)h.slides[e].swiperSlideOffset=t()?h.slides[e].offsetLeft:h.slides[e].offsetTop},h.updateSlidesProgress=function(e){if("undefined"==typeof e&&(e=h.translate||0),0!==h.slides.length){"undefined"==typeof h.slides[0].swiperSlideOffset&&h.updateSlidesOffset();var a=h.params.centeredSlides?-e+h.size/2:-e;h.rtl&&(a=h.params.centeredSlides?e-h.size/2:e);{h.container[0].getBoundingClientRect(),t()?"left":"top",t()?"right":"bottom"}h.slides.removeClass(h.params.slideVisibleClass);for(var s=0;s<h.slides.length;s++){var r=h.slides[s],i=h.params.centeredSlides===!0?r.swiperSlideSize/2:0,n=(a-r.swiperSlideOffset-i)/(r.swiperSlideSize+h.params.spaceBetween);if(h.params.watchSlidesVisibility){var o=-(a-r.swiperSlideOffset-i),l=o+h.slidesSizesGrid[s],d=o>=0&&o<h.size||l>0&&l<=h.size||0>=o&&l>=h.size;d&&h.slides.eq(s).addClass(h.params.slideVisibleClass)}r.progress=h.rtl?-n:n}}},h.updateProgress=function(e){"undefined"==typeof e&&(e=h.translate||0);var a=h.maxTranslate()-h.minTranslate();0===a?(h.progress=0,h.isBeginning=h.isEnd=!0):(h.progress=(e-h.minTranslate())/a,h.isBeginning=h.progress<=0,h.isEnd=h.progress>=1),h.isBeginning&&h.emit("onReachBeginning",h),h.isEnd&&h.emit("onReachEnd",h),h.params.watchSlidesProgress&&h.updateSlidesProgress(e),h.emit("onProgress",h,h.progress)},h.updateActiveIndex=function(){var e,a,s,t=h.rtl?h.translate:-h.translate;for(a=0;a<h.slidesGrid.length;a++)"undefined"!=typeof h.slidesGrid[a+1]?t>=h.slidesGrid[a]&&t<h.slidesGrid[a+1]-(h.slidesGrid[a+1]-h.slidesGrid[a])/2?e=a:t>=h.slidesGrid[a]&&t<h.slidesGrid[a+1]&&(e=a+1):t>=h.slidesGrid[a]&&(e=a);(0>e||"undefined"==typeof e)&&(e=0),s=Math.floor(e/h.params.slidesPerGroup),s>=h.snapGrid.length&&(s=h.snapGrid.length-1),e!==h.activeIndex&&(h.snapIndex=s,h.previousIndex=h.activeIndex,h.activeIndex=e,h.updateClasses())},h.updateClasses=function(){h.slides.removeClass(h.params.slideActiveClass+" "+h.params.slideNextClass+" "+h.params.slidePrevClass);var e=h.slides.eq(h.activeIndex);if(e.addClass(h.params.slideActiveClass),e.next("."+h.params.slideClass).addClass(h.params.slideNextClass),e.prev("."+h.params.slideClass).addClass(h.params.slidePrevClass),h.bullets&&h.bullets.length>0){h.bullets.removeClass(h.params.bulletActiveClass);var a;h.params.loop?(a=Math.ceil(h.activeIndex-h.loopedSlides)/h.params.slidesPerGroup,a>h.slides.length-1-2*h.loopedSlides&&(a-=h.slides.length-2*h.loopedSlides),a>h.bullets.length-1&&(a-=h.bullets.length)):a="undefined"!=typeof h.snapIndex?h.snapIndex:h.activeIndex||0,h.paginationContainer.length>1?h.bullets.each(function(){v(this).index()===a&&v(this).addClass(h.params.bulletActiveClass)}):h.bullets.eq(a).addClass(h.params.bulletActiveClass)}h.params.loop||(h.params.prevButton&&(h.isBeginning?(v(h.params.prevButton).addClass(h.params.buttonDisabledClass),h.params.a11y&&h.a11y&&h.a11y.disable(v(h.params.prevButton))):(v(h.params.prevButton).removeClass(h.params.buttonDisabledClass),h.params.a11y&&h.a11y&&h.a11y.enable(v(h.params.prevButton)))),h.params.nextButton&&(h.isEnd?(v(h.params.nextButton).addClass(h.params.buttonDisabledClass),h.params.a11y&&h.a11y&&h.a11y.disable(v(h.params.nextButton))):(v(h.params.nextButton).removeClass(h.params.buttonDisabledClass),h.params.a11y&&h.a11y&&h.a11y.enable(v(h.params.nextButton)))))},h.updatePagination=function(){if(h.params.pagination&&h.paginationContainer&&h.paginationContainer.length>0){for(var e="",a=h.params.loop?Math.ceil((h.slides.length-2*h.loopedSlides)/h.params.slidesPerGroup):h.snapGrid.length,s=0;a>s;s++)e+=h.params.paginationBulletRender?h.params.paginationBulletRender(s,h.params.bulletClass):'<span class="'+h.params.bulletClass+'"></span>';h.paginationContainer.html(e),h.bullets=h.paginationContainer.find("."+h.params.bulletClass)}},h.update=function(e){function a(){t=Math.min(Math.max(h.translate,h.maxTranslate()),h.minTranslate()),h.setWrapperTranslate(t),h.updateActiveIndex(),h.updateClasses()}if(h.updateContainerSize(),h.updateSlidesSize(),h.updateProgress(),h.updatePagination(),h.updateClasses(),h.params.scrollbar&&h.scrollbar&&h.scrollbar.set(),e){var s,t;h.params.freeMode?a():(s="auto"===h.params.slidesPerView&&h.isEnd&&!h.params.centeredSlides?h.slideTo(h.slides.length-1,0,!1,!0):h.slideTo(h.activeIndex,0,!1,!0),s||a())}},h.onResize=function(e){if(h.updateContainerSize(),h.updateSlidesSize(),h.updateProgress(),("auto"===h.params.slidesPerView||h.params.freeMode||e)&&h.updatePagination(),h.params.scrollbar&&h.scrollbar&&h.scrollbar.set(),h.params.freeMode){var a=Math.min(Math.max(h.translate,h.maxTranslate()),h.minTranslate());h.setWrapperTranslate(a),h.updateActiveIndex(),h.updateClasses()}else h.updateClasses(),"auto"===h.params.slidesPerView&&h.isEnd&&!h.params.centeredSlides?h.slideTo(h.slides.length-1,0,!1,!0):h.slideTo(h.activeIndex,0,!1,!0)};var g=["mousedown","mousemove","mouseup"];window.navigator.pointerEnabled?g=["pointerdown","pointermove","pointerup"]:window.navigator.msPointerEnabled&&(g=["MSPointerDown","MSPointerMove","MSPointerUp"]),h.touchEvents={start:h.support.touch||!h.params.simulateTouch?"touchstart":g[0],move:h.support.touch||!h.params.simulateTouch?"touchmove":g[1],end:h.support.touch||!h.params.simulateTouch?"touchend":g[2]},(window.navigator.pointerEnabled||window.navigator.msPointerEnabled)&&("container"===h.params.touchEventsTarget?h.container:h.wrapper).addClass("swiper-wp8-"+h.params.direction),h.initEvents=function(e){var a=e?"off":"on",t=e?"removeEventListener":"addEventListener",r="container"===h.params.touchEventsTarget?h.container[0]:h.wrapper[0],i=h.support.touch?r:document,n=h.params.nested?!0:!1;h.browser.ie?(r[t](h.touchEvents.start,h.onTouchStart,!1),i[t](h.touchEvents.move,h.onTouchMove,n),i[t](h.touchEvents.end,h.onTouchEnd,!1)):(h.support.touch&&(r[t](h.touchEvents.start,h.onTouchStart,!1),r[t](h.touchEvents.move,h.onTouchMove,n),r[t](h.touchEvents.end,h.onTouchEnd,!1)),!s.simulateTouch||h.device.ios||h.device.android||(r[t]("mousedown",h.onTouchStart,!1),document[t]("mousemove",h.onTouchMove,n),document[t]("mouseup",h.onTouchEnd,!1))),window[t]("resize",h.onResize),h.params.nextButton&&(v(h.params.nextButton)[a]("click",h.onClickNext),h.params.a11y&&h.a11y&&v(h.params.nextButton)[a]("keydown",h.a11y.onEnterKey)),h.params.prevButton&&(v(h.params.prevButton)[a]("click",h.onClickPrev),h.params.a11y&&h.a11y&&v(h.params.prevButton)[a]("keydown",h.a11y.onEnterKey)),h.params.pagination&&h.params.paginationClickable&&v(h.paginationContainer)[a]("click","."+h.params.bulletClass,h.onClickIndex),(h.params.preventClicks||h.params.preventClicksPropagation)&&r[t]("click",h.preventClicks,!0)},h.attachEvents=function(){h.initEvents()},h.detachEvents=function(){h.initEvents(!0)},h.allowClick=!0,h.preventClicks=function(e){h.allowClick||(h.params.preventClicks&&e.preventDefault(),h.params.preventClicksPropagation&&h.animating&&(e.stopPropagation(),e.stopImmediatePropagation()))},h.onClickNext=function(e){e.preventDefault(),h.slideNext()},h.onClickPrev=function(e){e.preventDefault(),h.slidePrev()},h.onClickIndex=function(e){e.preventDefault();var a=v(this).index()*h.params.slidesPerGroup;h.params.loop&&(a+=h.loopedSlides),h.slideTo(a)},h.updateClickedSlide=function(e){var a=i(e,"."+h.params.slideClass),s=!1;if(a)for(var t=0;t<h.slides.length;t++)h.slides[t]===a&&(s=!0);if(!a||!s)return h.clickedSlide=void 0,h.clickedIndex=void 0,void 0;if(h.clickedSlide=a,h.clickedIndex=v(a).index(),h.params.slideToClickedSlide&&void 0!==h.clickedIndex&&h.clickedIndex!==h.activeIndex){var r,n=h.clickedIndex;if(h.params.loop)if(r=v(h.clickedSlide).attr("data-swiper-slide-index"),n>h.slides.length-h.params.slidesPerView)h.fixLoop(),n=h.wrapper.children("."+h.params.slideClass+'[data-swiper-slide-index="'+r+'"]').eq(0).index(),setTimeout(function(){h.slideTo(n)},0);else if(n<h.params.slidesPerView-1){h.fixLoop();var o=h.wrapper.children("."+h.params.slideClass+'[data-swiper-slide-index="'+r+'"]');n=o.eq(o.length-1).index(),setTimeout(function(){h.slideTo(n)},0)}else h.slideTo(n);else h.slideTo(n)}};var w,y,b,x,T,S,C,M,P,z="input, select, textarea, button",I=Date.now(),k=[];h.animating=!1,h.touches={startX:0,startY:0,currentX:0,currentY:0,diff:0};var E,D;if(h.onTouchStart=function(e){if(e.originalEvent&&(e=e.originalEvent),E="touchstart"===e.type,E||!("which"in e)||3!==e.which){if(h.params.noSwiping&&i(e,"."+h.params.noSwipingClass))return h.allowClick=!0,void 0;if(!h.params.swipeHandler||i(e,h.params.swipeHandler)){if(w=!0,y=!1,x=void 0,D=void 0,h.touches.startX=h.touches.currentX="touchstart"===e.type?e.targetTouches[0].pageX:e.pageX,h.touches.startY=h.touches.currentY="touchstart"===e.type?e.targetTouches[0].pageY:e.pageY,b=Date.now(),h.allowClick=!0,h.updateContainerSize(),h.swipeDirection=void 0,h.params.threshold>0&&(C=!1),"touchstart"!==e.type){var a=!0;v(e.target).is(z)&&(a=!1),document.activeElement&&v(document.activeElement).is(z)&&document.activeElement.blur(),a&&e.preventDefault()}h.emit("onTouchStart",h,e)}}},h.onTouchMove=function(e){if(e.originalEvent&&(e=e.originalEvent),!(E&&"mousemove"===e.type||e.preventedByNestedSwiper)){if(h.params.onlyExternal)return y=!0,h.allowClick=!1,void 0;if(E&&document.activeElement&&e.target===document.activeElement&&v(e.target).is(z))return y=!0,h.allowClick=!1,void 0;if(h.emit("onTouchMove",h,e),!(e.targetTouches&&e.targetTouches.length>1)){if(h.touches.currentX="touchmove"===e.type?e.targetTouches[0].pageX:e.pageX,h.touches.currentY="touchmove"===e.type?e.targetTouches[0].pageY:e.pageY,"undefined"==typeof x){var a=180*Math.atan2(Math.abs(h.touches.currentY-h.touches.startY),Math.abs(h.touches.currentX-h.touches.startX))/Math.PI;x=t()?a>h.params.touchAngle:90-a>h.params.touchAngle}if(x&&h.emit("onTouchMoveOpposite",h,e),"undefined"==typeof D&&h.browser.ieTouch&&(h.touches.currentX!==h.touches.startX||h.touches.currentY!==h.touches.startY)&&(D=!0),w){if(x)return w=!1,void 0;if(D||!h.browser.ieTouch){h.allowClick=!1,h.emit("onSliderMove",h,e),e.preventDefault(),h.params.touchMoveStopPropagation&&!h.params.nested&&e.stopPropagation(),y||(s.loop&&h.fixLoop(),S=h.getWrapperTranslate(),h.setWrapperTransition(0),h.animating&&h.wrapper.trigger("webkitTransitionEnd transitionend oTransitionEnd MSTransitionEnd msTransitionEnd"),h.params.autoplay&&h.autoplaying&&(h.params.autoplayDisableOnInteraction?h.stopAutoplay():h.pauseAutoplay()),P=!1,h.params.grabCursor&&(h.container[0].style.cursor="move",h.container[0].style.cursor="-webkit-grabbing",h.container[0].style.cursor="-moz-grabbin",h.container[0].style.cursor="grabbing")),y=!0;var r=h.touches.diff=t()?h.touches.currentX-h.touches.startX:h.touches.currentY-h.touches.startY;r*=h.params.touchRatio,h.rtl&&(r=-r),h.swipeDirection=r>0?"prev":"next",T=r+S;var i=!0;if(r>0&&T>h.minTranslate()?(i=!1,h.params.resistance&&(T=h.minTranslate()-1+Math.pow(-h.minTranslate()+S+r,h.params.resistanceRatio))):0>r&&T<h.maxTranslate()&&(i=!1,h.params.resistance&&(T=h.maxTranslate()+1-Math.pow(h.maxTranslate()-S-r,h.params.resistanceRatio))),i&&(e.preventedByNestedSwiper=!0),!h.params.allowSwipeToNext&&"next"===h.swipeDirection&&S>T&&(T=S),!h.params.allowSwipeToPrev&&"prev"===h.swipeDirection&&T>S&&(T=S),h.params.followFinger){if(h.params.threshold>0){if(!(Math.abs(r)>h.params.threshold||C))return T=S,void 0;if(!C)return C=!0,h.touches.startX=h.touches.currentX,h.touches.startY=h.touches.currentY,T=S,h.touches.diff=t()?h.touches.currentX-h.touches.startX:h.touches.currentY-h.touches.startY,void 0}(h.params.freeMode||h.params.watchSlidesProgress)&&h.updateActiveIndex(),h.params.freeMode&&(0===k.length&&k.push({position:h.touches[t()?"startX":"startY"],time:b}),k.push({position:h.touches[t()?"currentX":"currentY"],time:(new window.Date).getTime()})),h.updateProgress(T),h.setWrapperTranslate(T)}}}}}},h.onTouchEnd=function(e){if(e.originalEvent&&(e=e.originalEvent),h.emit("onTouchEnd",h,e),w){h.params.grabCursor&&y&&w&&(h.container[0].style.cursor="move",h.container[0].style.cursor="-webkit-grab",h.container[0].style.cursor="-moz-grab",h.container[0].style.cursor="grab");var a=Date.now(),s=a-b;if(h.allowClick&&(h.updateClickedSlide(e),h.emit("onTap",h,e),300>s&&a-I>300&&(M&&clearTimeout(M),M=setTimeout(function(){h&&(h.params.paginationHide&&h.paginationContainer.length>0&&!v(e.target).hasClass(h.params.bulletClass)&&h.paginationContainer.toggleClass(h.params.paginationHiddenClass),h.emit("onClick",h,e))},300)),300>s&&300>a-I&&(M&&clearTimeout(M),h.emit("onDoubleTap",h,e))),I=Date.now(),setTimeout(function(){h&&(h.allowClick=!0)},0),!w||!y||!h.swipeDirection||0===h.touches.diff||T===S)return w=y=!1,void 0;w=y=!1;var t;if(t=h.params.followFinger?h.rtl?h.translate:-h.translate:-T,h.params.freeMode){if(t<-h.minTranslate())return h.slideTo(h.activeIndex),void 0;if(t>-h.maxTranslate())return h.slides.length<h.snapGrid.length?h.slideTo(h.snapGrid.length-1):h.slideTo(h.slides.length-1),void 0;if(h.params.freeModeMomentum){if(k.length>1){var r=k.pop(),i=k.pop(),n=r.position-i.position,o=r.time-i.time;h.velocity=n/o,h.velocity=h.velocity/2,Math.abs(h.velocity)<.02&&(h.velocity=0),(o>150||(new window.Date).getTime()-r.time>300)&&(h.velocity=0)}else h.velocity=0;k.length=0;var l=1e3*h.params.freeModeMomentumRatio,d=h.velocity*l,p=h.translate+d;h.rtl&&(p=-p);var u,c=!1,m=20*Math.abs(h.velocity)*h.params.freeModeMomentumBounceRatio;if(p<h.maxTranslate())h.params.freeModeMomentumBounce?(p+h.maxTranslate()<-m&&(p=h.maxTranslate()-m),u=h.maxTranslate(),c=!0,P=!0):p=h.maxTranslate();else if(p>h.minTranslate())h.params.freeModeMomentumBounce?(p-h.minTranslate()>m&&(p=h.minTranslate()+m),u=h.minTranslate(),c=!0,P=!0):p=h.minTranslate();else if(h.params.freeModeSticky){var f,g=0;for(g=0;g<h.snapGrid.length;g+=1)if(h.snapGrid[g]>-p){f=g;break}p=Math.abs(h.snapGrid[f]-p)<Math.abs(h.snapGrid[f-1]-p)||"next"===h.swipeDirection?h.snapGrid[f]:h.snapGrid[f-1],h.rtl||(p=-p)}if(0!==h.velocity)l=h.rtl?Math.abs((-p-h.translate)/h.velocity):Math.abs((p-h.translate)/h.velocity);else if(h.params.freeModeSticky)return h.slideReset(),void 0;h.params.freeModeMomentumBounce&&c?(h.updateProgress(u),h.setWrapperTransition(l),h.setWrapperTranslate(p),h.onTransitionStart(),h.animating=!0,h.wrapper.transitionEnd(function(){h&&P&&(h.emit("onMomentumBounce",h),h.setWrapperTransition(h.params.speed),h.setWrapperTranslate(u),h.wrapper.transitionEnd(function(){h&&h.onTransitionEnd()}))})):h.velocity?(h.updateProgress(p),h.setWrapperTransition(l),h.setWrapperTranslate(p),h.onTransitionStart(),h.animating||(h.animating=!0,h.wrapper.transitionEnd(function(){h&&h.onTransitionEnd()}))):h.updateProgress(p),h.updateActiveIndex()}return(!h.params.freeModeMomentum||s>=h.params.longSwipesMs)&&(h.updateProgress(),h.updateActiveIndex()),void 0}var x,C=0,z=h.slidesSizesGrid[0];for(x=0;x<h.slidesGrid.length;x+=h.params.slidesPerGroup)"undefined"!=typeof h.slidesGrid[x+h.params.slidesPerGroup]?t>=h.slidesGrid[x]&&t<h.slidesGrid[x+h.params.slidesPerGroup]&&(C=x,z=h.slidesGrid[x+h.params.slidesPerGroup]-h.slidesGrid[x]):t>=h.slidesGrid[x]&&(C=x,z=h.slidesGrid[h.slidesGrid.length-1]-h.slidesGrid[h.slidesGrid.length-2]);var E=(t-h.slidesGrid[C])/z;if(s>h.params.longSwipesMs){if(!h.params.longSwipes)return h.slideTo(h.activeIndex),void 0;"next"===h.swipeDirection&&(E>=h.params.longSwipesRatio?h.slideTo(C+h.params.slidesPerGroup):h.slideTo(C)),"prev"===h.swipeDirection&&(E>1-h.params.longSwipesRatio?h.slideTo(C+h.params.slidesPerGroup):h.slideTo(C))}else{if(!h.params.shortSwipes)return h.slideTo(h.activeIndex),void 0;"next"===h.swipeDirection&&h.slideTo(C+h.params.slidesPerGroup),"prev"===h.swipeDirection&&h.slideTo(C)}}},h._slideTo=function(e,a){return h.slideTo(e,a,!0,!0)},h.slideTo=function(e,a,s,r){"undefined"==typeof s&&(s=!0),"undefined"==typeof e&&(e=0),0>e&&(e=0),h.snapIndex=Math.floor(e/h.params.slidesPerGroup),h.snapIndex>=h.snapGrid.length&&(h.snapIndex=h.snapGrid.length-1);var i=-h.snapGrid[h.snapIndex];if(!h.params.allowSwipeToNext&&i<h.translate&&i<h.minTranslate())return!1;if(!h.params.allowSwipeToPrev&&i>h.translate&&i>h.maxTranslate())return!1;h.params.autoplay&&h.autoplaying&&(r||!h.params.autoplayDisableOnInteraction?h.pauseAutoplay(a):h.stopAutoplay()),h.updateProgress(i);for(var n=0;n<h.slidesGrid.length;n++)-i>=h.slidesGrid[n]&&(e=n);if("undefined"==typeof a&&(a=h.params.speed),h.previousIndex=h.activeIndex||0,h.activeIndex=e,i===h.translate)return h.updateClasses(),!1;h.updateClasses(),h.onTransitionStart(s);t()?i:0,t()?0:i;return 0===a?(h.setWrapperTransition(0),h.setWrapperTranslate(i),h.onTransitionEnd(s)):(h.setWrapperTransition(a),h.setWrapperTranslate(i),h.animating||(h.animating=!0,h.wrapper.transitionEnd(function(){h&&h.onTransitionEnd(s)}))),!0},h.onTransitionStart=function(e){"undefined"==typeof e&&(e=!0),h.lazy&&h.lazy.onTransitionStart(),e&&(h.emit("onTransitionStart",h),h.activeIndex!==h.previousIndex&&h.emit("onSlideChangeStart",h))},h.onTransitionEnd=function(e){h.animating=!1,h.setWrapperTransition(0),"undefined"==typeof e&&(e=!0),h.lazy&&h.lazy.onTransitionEnd(),e&&(h.emit("onTransitionEnd",h),h.activeIndex!==h.previousIndex&&h.emit("onSlideChangeEnd",h)),h.params.hashnav&&h.hashnav&&h.hashnav.setHash()},h.slideNext=function(e,a,s){if(h.params.loop){if(h.animating)return!1;h.fixLoop();{h.container[0].clientLeft}return h.slideTo(h.activeIndex+h.params.slidesPerGroup,a,e,s)}return h.slideTo(h.activeIndex+h.params.slidesPerGroup,a,e,s)},h._slideNext=function(e){return h.slideNext(!0,e,!0)},h.slidePrev=function(e,a,s){if(h.params.loop){if(h.animating)return!1;h.fixLoop();{h.container[0].clientLeft}return h.slideTo(h.activeIndex-1,a,e,s)}return h.slideTo(h.activeIndex-1,a,e,s)},h._slidePrev=function(e){return h.slidePrev(!0,e,!0)},h.slideReset=function(e,a){return h.slideTo(h.activeIndex,a,e)},h.setWrapperTransition=function(e,a){h.wrapper.transition(e),"slide"!==h.params.effect&&h.effects[h.params.effect]&&h.effects[h.params.effect].setTransition(e),h.params.parallax&&h.parallax&&h.parallax.setTransition(e),h.params.scrollbar&&h.scrollbar&&h.scrollbar.setTransition(e),h.params.control&&h.controller&&h.controller.setTransition(e,a),h.emit("onSetTransition",h,e)},h.setWrapperTranslate=function(e,a,s){var r=0,i=0,n=0;
t()?r=h.rtl?-e:e:i=e,h.params.virtualTranslate||(h.support.transforms3d?h.wrapper.transform("translate3d("+r+"px, "+i+"px, "+n+"px)"):h.wrapper.transform("translate("+r+"px, "+i+"px)")),h.translate=t()?r:i,a&&h.updateActiveIndex(),"slide"!==h.params.effect&&h.effects[h.params.effect]&&h.effects[h.params.effect].setTranslate(h.translate),h.params.parallax&&h.parallax&&h.parallax.setTranslate(h.translate),h.params.scrollbar&&h.scrollbar&&h.scrollbar.setTranslate(h.translate),h.params.control&&h.controller&&h.controller.setTranslate(h.translate,s),h.emit("onSetTranslate",h,h.translate)},h.getTranslate=function(e,a){var s,t,r,i;return"undefined"==typeof a&&(a="x"),h.params.virtualTranslate?h.rtl?-h.translate:h.translate:(r=window.getComputedStyle(e,null),window.WebKitCSSMatrix?i=new window.WebKitCSSMatrix("none"===r.webkitTransform?"":r.webkitTransform):(i=r.MozTransform||r.OTransform||r.MsTransform||r.msTransform||r.transform||r.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),s=i.toString().split(",")),"x"===a&&(t=window.WebKitCSSMatrix?i.m41:16===s.length?parseFloat(s[12]):parseFloat(s[4])),"y"===a&&(t=window.WebKitCSSMatrix?i.m42:16===s.length?parseFloat(s[13]):parseFloat(s[5])),h.rtl&&t&&(t=-t),t||0)},h.getWrapperTranslate=function(e){return"undefined"==typeof e&&(e=t()?"x":"y"),h.getTranslate(h.wrapper[0],e)},h.observers=[],h.initObservers=function(){if(h.params.observeParents)for(var e=h.container.parents(),a=0;a<e.length;a++)n(e[a]);n(h.container[0],{childList:!1}),n(h.wrapper[0],{attributes:!1})},h.disconnectObservers=function(){for(var e=0;e<h.observers.length;e++)h.observers[e].disconnect();h.observers=[]},h.createLoop=function(){h.wrapper.children("."+h.params.slideClass+"."+h.params.slideDuplicateClass).remove();var e=h.wrapper.children("."+h.params.slideClass);h.loopedSlides=parseInt(h.params.loopedSlides||h.params.slidesPerView,10),h.loopedSlides=h.loopedSlides+h.params.loopAdditionalSlides,h.loopedSlides>e.length&&(h.loopedSlides=e.length);var a,s=[],t=[];for(e.each(function(a,r){var i=v(this);a<h.loopedSlides&&t.push(r),a<e.length&&a>=e.length-h.loopedSlides&&s.push(r),i.attr("data-swiper-slide-index",a)}),a=0;a<t.length;a++)h.wrapper.append(v(t[a].cloneNode(!0)).addClass(h.params.slideDuplicateClass));for(a=s.length-1;a>=0;a--)h.wrapper.prepend(v(s[a].cloneNode(!0)).addClass(h.params.slideDuplicateClass))},h.destroyLoop=function(){h.wrapper.children("."+h.params.slideClass+"."+h.params.slideDuplicateClass).remove(),h.slides.removeAttr("data-swiper-slide-index")},h.fixLoop=function(){var e;h.activeIndex<h.loopedSlides?(e=h.slides.length-3*h.loopedSlides+h.activeIndex,e+=h.loopedSlides,h.slideTo(e,0,!1,!0)):("auto"===h.params.slidesPerView&&h.activeIndex>=2*h.loopedSlides||h.activeIndex>h.slides.length-2*h.params.slidesPerView)&&(e=-h.slides.length+h.activeIndex+h.loopedSlides,e+=h.loopedSlides,h.slideTo(e,0,!1,!0))},h.appendSlide=function(e){if(h.params.loop&&h.destroyLoop(),"object"==typeof e&&e.length)for(var a=0;a<e.length;a++)e[a]&&h.wrapper.append(e[a]);else h.wrapper.append(e);h.params.loop&&h.createLoop(),h.params.observer&&h.support.observer||h.update(!0)},h.prependSlide=function(e){h.params.loop&&h.destroyLoop();var a=h.activeIndex+1;if("object"==typeof e&&e.length){for(var s=0;s<e.length;s++)e[s]&&h.wrapper.prepend(e[s]);a=h.activeIndex+e.length}else h.wrapper.prepend(e);h.params.loop&&h.createLoop(),h.params.observer&&h.support.observer||h.update(!0),h.slideTo(a,0,!1)},h.removeSlide=function(e){h.params.loop&&(h.destroyLoop(),h.slides=h.wrapper.children("."+h.params.slideClass));var a,s=h.activeIndex;if("object"==typeof e&&e.length){for(var t=0;t<e.length;t++)a=e[t],h.slides[a]&&h.slides.eq(a).remove(),s>a&&s--;s=Math.max(s,0)}else a=e,h.slides[a]&&h.slides.eq(a).remove(),s>a&&s--,s=Math.max(s,0);h.params.loop&&h.createLoop(),h.params.observer&&h.support.observer||h.update(!0),h.params.loop?h.slideTo(s+h.loopedSlides,0,!1):h.slideTo(s,0,!1)},h.removeAllSlides=function(){for(var e=[],a=0;a<h.slides.length;a++)e.push(a);h.removeSlide(e)},h.effects={fade:{setTranslate:function(){for(var e=0;e<h.slides.length;e++){var a=h.slides.eq(e),s=a[0].swiperSlideOffset,r=-s;h.params.virtualTranslate||(r-=h.translate);var i=0;t()||(i=r,r=0);var n=h.params.fade.crossFade?Math.max(1-Math.abs(a[0].progress),0):1+Math.min(Math.max(a[0].progress,-1),0);a.css({opacity:n}).transform("translate3d("+r+"px, "+i+"px, 0px)")}},setTransition:function(e){if(h.slides.transition(e),h.params.virtualTranslate&&0!==e){var a=!1;h.slides.transitionEnd(function(){if(!a&&h){a=!0,h.animating=!1;for(var e=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],s=0;s<e.length;s++)h.wrapper.trigger(e[s])}})}}},cube:{setTranslate:function(){var e,a=0;h.params.cube.shadow&&(t()?(e=h.wrapper.find(".swiper-cube-shadow"),0===e.length&&(e=v('<div class="swiper-cube-shadow"></div>'),h.wrapper.append(e)),e.css({height:h.width+"px"})):(e=h.container.find(".swiper-cube-shadow"),0===e.length&&(e=v('<div class="swiper-cube-shadow"></div>'),h.container.append(e))));for(var s=0;s<h.slides.length;s++){var r=h.slides.eq(s),i=90*s,n=Math.floor(i/360);h.rtl&&(i=-i,n=Math.floor(-i/360));var o=Math.max(Math.min(r[0].progress,1),-1),l=0,d=0,p=0;s%4===0?(l=4*-n*h.size,p=0):(s-1)%4===0?(l=0,p=4*-n*h.size):(s-2)%4===0?(l=h.size+4*n*h.size,p=h.size):(s-3)%4===0&&(l=-h.size,p=3*h.size+4*h.size*n),h.rtl&&(l=-l),t()||(d=l,l=0);var u="rotateX("+(t()?0:-i)+"deg) rotateY("+(t()?i:0)+"deg) translate3d("+l+"px, "+d+"px, "+p+"px)";if(1>=o&&o>-1&&(a=90*s+90*o,h.rtl&&(a=90*-s-90*o)),r.transform(u),h.params.cube.slideShadows){var c=t()?r.find(".swiper-slide-shadow-left"):r.find(".swiper-slide-shadow-top"),m=t()?r.find(".swiper-slide-shadow-right"):r.find(".swiper-slide-shadow-bottom");0===c.length&&(c=v('<div class="swiper-slide-shadow-'+(t()?"left":"top")+'"></div>'),r.append(c)),0===m.length&&(m=v('<div class="swiper-slide-shadow-'+(t()?"right":"bottom")+'"></div>'),r.append(m));{r[0].progress}c.length&&(c[0].style.opacity=-r[0].progress),m.length&&(m[0].style.opacity=r[0].progress)}}if(h.wrapper.css({"-webkit-transform-origin":"50% 50% -"+h.size/2+"px","-moz-transform-origin":"50% 50% -"+h.size/2+"px","-ms-transform-origin":"50% 50% -"+h.size/2+"px","transform-origin":"50% 50% -"+h.size/2+"px"}),h.params.cube.shadow)if(t())e.transform("translate3d(0px, "+(h.width/2+h.params.cube.shadowOffset)+"px, "+-h.width/2+"px) rotateX(90deg) rotateZ(0deg) scale("+h.params.cube.shadowScale+")");else{var f=Math.abs(a)-90*Math.floor(Math.abs(a)/90),g=1.5-(Math.sin(2*f*Math.PI/360)/2+Math.cos(2*f*Math.PI/360)/2),w=h.params.cube.shadowScale,y=h.params.cube.shadowScale/g,b=h.params.cube.shadowOffset;e.transform("scale3d("+w+", 1, "+y+") translate3d(0px, "+(h.height/2+b)+"px, "+-h.height/2/y+"px) rotateX(-90deg)")}var x=h.isSafari||h.isUiWebView?-h.size/2:0;h.wrapper.transform("translate3d(0px,0,"+x+"px) rotateX("+(t()?0:a)+"deg) rotateY("+(t()?-a:0)+"deg)")},setTransition:function(e){h.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e),h.params.cube.shadow&&!t()&&h.container.find(".swiper-cube-shadow").transition(e)}},coverflow:{setTranslate:function(){for(var e=h.translate,a=t()?-e+h.width/2:-e+h.height/2,s=t()?h.params.coverflow.rotate:-h.params.coverflow.rotate,r=h.params.coverflow.depth,i=0,n=h.slides.length;n>i;i++){var o=h.slides.eq(i),l=h.slidesSizesGrid[i],d=o[0].swiperSlideOffset,p=(a-d-l/2)/l*h.params.coverflow.modifier,u=t()?s*p:0,c=t()?0:s*p,m=-r*Math.abs(p),f=t()?0:h.params.coverflow.stretch*p,g=t()?h.params.coverflow.stretch*p:0;Math.abs(g)<.001&&(g=0),Math.abs(f)<.001&&(f=0),Math.abs(m)<.001&&(m=0),Math.abs(u)<.001&&(u=0),Math.abs(c)<.001&&(c=0);var w="translate3d("+g+"px,"+f+"px,"+m+"px)  rotateX("+c+"deg) rotateY("+u+"deg)";if(o.transform(w),o[0].style.zIndex=-Math.abs(Math.round(p))+1,h.params.coverflow.slideShadows){var y=t()?o.find(".swiper-slide-shadow-left"):o.find(".swiper-slide-shadow-top"),b=t()?o.find(".swiper-slide-shadow-right"):o.find(".swiper-slide-shadow-bottom");0===y.length&&(y=v('<div class="swiper-slide-shadow-'+(t()?"left":"top")+'"></div>'),o.append(y)),0===b.length&&(b=v('<div class="swiper-slide-shadow-'+(t()?"right":"bottom")+'"></div>'),o.append(b)),y.length&&(y[0].style.opacity=p>0?p:0),b.length&&(b[0].style.opacity=-p>0?-p:0)}}if(h.browser.ie){var x=h.wrapper[0].style;x.perspectiveOrigin=a+"px 50%"}},setTransition:function(e){h.slides.transition(e).find(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").transition(e)}}},h.lazy={initialImageLoaded:!1,loadImageInSlide:function(e,a){if("undefined"!=typeof e&&("undefined"==typeof a&&(a=!0),0!==h.slides.length)){var s=h.slides.eq(e),t=s.find(".swiper-lazy:not(.swiper-lazy-loaded):not(.swiper-lazy-loading)");!s.hasClass("swiper-lazy")||s.hasClass("swiper-lazy-loaded")||s.hasClass("swiper-lazy-loading")||t.add(s[0]),0!==t.length&&t.each(function(){var e=v(this);e.addClass("swiper-lazy-loading");var t=e.attr("data-background"),r=e.attr("data-src");h.loadImage(e[0],r||t,!1,function(){if(t?(e.css("background-image","url("+t+")"),e.removeAttr("data-background")):(e.attr("src",r),e.removeAttr("data-src")),e.addClass("swiper-lazy-loaded").removeClass("swiper-lazy-loading"),s.find(".swiper-lazy-preloader, .preloader").remove(),h.params.loop&&a){var i=s.attr("data-swiper-slide-index");if(s.hasClass(h.params.slideDuplicateClass)){var n=h.wrapper.children('[data-swiper-slide-index="'+i+'"]:not(.'+h.params.slideDuplicateClass+")");h.lazy.loadImageInSlide(n.index(),!1)}else{var o=h.wrapper.children("."+h.params.slideDuplicateClass+'[data-swiper-slide-index="'+i+'"]');h.lazy.loadImageInSlide(o.index(),!1)}}h.emit("onLazyImageReady",h,s[0],e[0])}),h.emit("onLazyImageLoad",h,s[0],e[0])})}},load:function(){var e;if(h.params.watchSlidesVisibility)h.wrapper.children("."+h.params.slideVisibleClass).each(function(){h.lazy.loadImageInSlide(v(this).index())});else if(h.params.slidesPerView>1)for(e=h.activeIndex;e<h.activeIndex+h.params.slidesPerView;e++)h.slides[e]&&h.lazy.loadImageInSlide(e);else h.lazy.loadImageInSlide(h.activeIndex);if(h.params.lazyLoadingInPrevNext)if(h.params.slidesPerView>1){for(e=h.activeIndex+h.params.slidesPerView;e<h.activeIndex+h.params.slidesPerView+h.params.slidesPerView;e++)h.slides[e]&&h.lazy.loadImageInSlide(e);for(e=h.activeIndex-h.params.slidesPerView;e<h.activeIndex;e++)h.slides[e]&&h.lazy.loadImageInSlide(e)}else{var a=h.wrapper.children("."+h.params.slideNextClass);a.length>0&&h.lazy.loadImageInSlide(a.index());var s=h.wrapper.children("."+h.params.slidePrevClass);s.length>0&&h.lazy.loadImageInSlide(s.index())}},onTransitionStart:function(){h.params.lazyLoading&&(h.params.lazyLoadingOnTransitionStart||!h.params.lazyLoadingOnTransitionStart&&!h.lazy.initialImageLoaded)&&h.lazy.load()},onTransitionEnd:function(){h.params.lazyLoading&&!h.params.lazyLoadingOnTransitionStart&&h.lazy.load()}},h.scrollbar={set:function(){if(h.params.scrollbar){var e=h.scrollbar;e.track=v(h.params.scrollbar),e.drag=e.track.find(".swiper-scrollbar-drag"),0===e.drag.length&&(e.drag=v('<div class="swiper-scrollbar-drag"></div>'),e.track.append(e.drag)),e.drag[0].style.width="",e.drag[0].style.height="",e.trackSize=t()?e.track[0].offsetWidth:e.track[0].offsetHeight,e.divider=h.size/h.virtualSize,e.moveDivider=e.divider*(e.trackSize/h.size),e.dragSize=e.trackSize*e.divider,t()?e.drag[0].style.width=e.dragSize+"px":e.drag[0].style.height=e.dragSize+"px",e.track[0].style.display=e.divider>=1?"none":"",h.params.scrollbarHide&&(e.track[0].style.opacity=0)}},setTranslate:function(){if(h.params.scrollbar){var e,a=h.scrollbar,s=(h.translate||0,a.dragSize);e=(a.trackSize-a.dragSize)*h.progress,h.rtl&&t()?(e=-e,e>0?(s=a.dragSize-e,e=0):-e+a.dragSize>a.trackSize&&(s=a.trackSize+e)):0>e?(s=a.dragSize+e,e=0):e+a.dragSize>a.trackSize&&(s=a.trackSize-e),t()?(h.support.transforms3d?a.drag.transform("translate3d("+e+"px, 0, 0)"):a.drag.transform("translateX("+e+"px)"),a.drag[0].style.width=s+"px"):(h.support.transforms3d?a.drag.transform("translate3d(0px, "+e+"px, 0)"):a.drag.transform("translateY("+e+"px)"),a.drag[0].style.height=s+"px"),h.params.scrollbarHide&&(clearTimeout(a.timeout),a.track[0].style.opacity=1,a.timeout=setTimeout(function(){a.track[0].style.opacity=0,a.track.transition(400)},1e3))}},setTransition:function(e){h.params.scrollbar&&h.scrollbar.drag.transition(e)}},h.controller={setTranslate:function(e,s){function t(a){e=a.rtl&&"horizontal"===a.params.direction?-h.translate:h.translate,r=(a.maxTranslate()-a.minTranslate())/(h.maxTranslate()-h.minTranslate()),i=(e-h.minTranslate())*r+a.minTranslate(),h.params.controlInverse&&(i=a.maxTranslate()-i),a.updateProgress(i),a.setWrapperTranslate(i,!1,h),a.updateActiveIndex()}var r,i,n=h.params.control;if(h.isArray(n))for(var o=0;o<n.length;o++)n[o]!==s&&n[o]instanceof a&&t(n[o]);else n instanceof a&&s!==n&&t(n)},setTransition:function(e,s){function t(a){a.setWrapperTransition(e,h),0!==e&&(a.onTransitionStart(),a.wrapper.transitionEnd(function(){i&&a.onTransitionEnd()}))}var r,i=h.params.control;if(h.isArray(i))for(r=0;r<i.length;r++)i[r]!==s&&i[r]instanceof a&&t(i[r]);else i instanceof a&&s!==i&&t(i)}},h.hashnav={init:function(){if(h.params.hashnav){h.hashnav.initialized=!0;var e=document.location.hash.replace("#","");if(e)for(var a=0,s=0,t=h.slides.length;t>s;s++){var r=h.slides.eq(s),i=r.attr("data-hash");if(i===e&&!r.hasClass(h.params.slideDuplicateClass)){var n=r.index();h.slideTo(n,a,h.params.runCallbacksOnInit,!0)}}}},setHash:function(){h.hashnav.initialized&&h.params.hashnav&&(document.location.hash=h.slides.eq(h.activeIndex).attr("data-hash")||"")}},h.disableKeyboardControl=function(){v(document).off("keydown",o)},h.enableKeyboardControl=function(){v(document).on("keydown",o)},h.mousewheel={event:!1,lastScrollTime:(new window.Date).getTime()},h.params.mousewheelControl){if(void 0!==document.onmousewheel&&(h.mousewheel.event="mousewheel"),!h.mousewheel.event)try{new window.WheelEvent("wheel"),h.mousewheel.event="wheel"}catch(G){}h.mousewheel.event||(h.mousewheel.event="DOMMouseScroll")}h.disableMousewheelControl=function(){return h.mousewheel.event?(h.container.off(h.mousewheel.event,l),!0):!1},h.enableMousewheelControl=function(){return h.mousewheel.event?(h.container.on(h.mousewheel.event,l),!0):!1},h.parallax={setTranslate:function(){h.container.children("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){d(this,h.progress)}),h.slides.each(function(){var e=v(this);e.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=Math.min(Math.max(e[0].progress,-1),1);d(this,a)})})},setTransition:function(e){"undefined"==typeof e&&(e=h.params.speed),h.container.find("[data-swiper-parallax], [data-swiper-parallax-x], [data-swiper-parallax-y]").each(function(){var a=v(this),s=parseInt(a.attr("data-swiper-parallax-duration"),10)||e;0===e&&(s=0),a.transition(s)})}},h._plugins=[];for(var L in h.plugins){var B=h.plugins[L](h,h.params[L]);B&&h._plugins.push(B)}return h.callPlugins=function(e){for(var a=0;a<h._plugins.length;a++)e in h._plugins[a]&&h._plugins[a][e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},h.emitterEventListeners={},h.emit=function(e){h.params[e]&&h.params[e](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);var a;if(h.emitterEventListeners[e])for(a=0;a<h.emitterEventListeners[e].length;a++)h.emitterEventListeners[e][a](arguments[1],arguments[2],arguments[3],arguments[4],arguments[5]);h.callPlugins&&h.callPlugins(e,arguments[1],arguments[2],arguments[3],arguments[4],arguments[5])},h.on=function(e,a){return e=p(e),h.emitterEventListeners[e]||(h.emitterEventListeners[e]=[]),h.emitterEventListeners[e].push(a),h},h.off=function(e,a){var s;if(e=p(e),"undefined"==typeof a)return h.emitterEventListeners[e]=[],h;if(h.emitterEventListeners[e]&&0!==h.emitterEventListeners[e].length){for(s=0;s<h.emitterEventListeners[e].length;s++)h.emitterEventListeners[e][s]===a&&h.emitterEventListeners[e].splice(s,1);return h}},h.once=function(e,a){e=p(e);var s=function(){a(arguments[0],arguments[1],arguments[2],arguments[3],arguments[4]),h.off(e,s)};return h.on(e,s),h},h.a11y={makeFocusable:function(e){return e[0].tabIndex="0",e},addRole:function(e,a){return e.attr("role",a),e},addLabel:function(e,a){return e.attr("aria-label",a),e},disable:function(e){return e.attr("aria-disabled",!0),e},enable:function(e){return e.attr("aria-disabled",!1),e},onEnterKey:function(e){13===e.keyCode&&(v(e.target).is(h.params.nextButton)?(h.onClickNext(e),h.isEnd?h.a11y.notify(h.params.lastSlideMsg):h.a11y.notify(h.params.nextSlideMsg)):v(e.target).is(h.params.prevButton)&&(h.onClickPrev(e),h.isBeginning?h.a11y.notify(h.params.firstSlideMsg):h.a11y.notify(h.params.prevSlideMsg)))},liveRegion:v('<span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>'),notify:function(e){var a=h.a11y.liveRegion;0!==a.length&&(a.html(""),a.html(e))},init:function(){if(h.params.nextButton){var e=v(h.params.nextButton);h.a11y.makeFocusable(e),h.a11y.addRole(e,"button"),h.a11y.addLabel(e,h.params.nextSlideMsg)}if(h.params.prevButton){var a=v(h.params.prevButton);h.a11y.makeFocusable(a),h.a11y.addRole(a,"button"),h.a11y.addLabel(a,h.params.prevSlideMsg)}v(h.container).append(h.a11y.liveRegion)},destroy:function(){h.a11y.liveRegion&&h.a11y.liveRegion.length>0&&h.a11y.liveRegion.remove()}},h.init=function(){h.params.loop&&h.createLoop(),h.updateContainerSize(),h.updateSlidesSize(),h.updatePagination(),h.params.scrollbar&&h.scrollbar&&h.scrollbar.set(),"slide"!==h.params.effect&&h.effects[h.params.effect]&&(h.params.loop||h.updateProgress(),h.effects[h.params.effect].setTranslate()),h.params.loop?h.slideTo(h.params.initialSlide+h.loopedSlides,0,h.params.runCallbacksOnInit):(h.slideTo(h.params.initialSlide,0,h.params.runCallbacksOnInit),0===h.params.initialSlide&&(h.parallax&&h.params.parallax&&h.parallax.setTranslate(),h.lazy&&h.params.lazyLoading&&(h.lazy.load(),h.lazy.initialImageLoaded=!0))),h.attachEvents(),h.params.observer&&h.support.observer&&h.initObservers(),h.params.preloadImages&&!h.params.lazyLoading&&h.preloadImages(),h.params.autoplay&&h.startAutoplay(),h.params.keyboardControl&&h.enableKeyboardControl&&h.enableKeyboardControl(),h.params.mousewheelControl&&h.enableMousewheelControl&&h.enableMousewheelControl(),h.params.hashnav&&h.hashnav&&h.hashnav.init(),h.params.a11y&&h.a11y&&h.a11y.init(),h.emit("onInit",h)},h.cleanupStyles=function(){h.container.removeClass(h.classNames.join(" ")).removeAttr("style"),h.wrapper.removeAttr("style"),h.slides&&h.slides.length&&h.slides.removeClass([h.params.slideVisibleClass,h.params.slideActiveClass,h.params.slideNextClass,h.params.slidePrevClass].join(" ")).removeAttr("style").removeAttr("data-swiper-column").removeAttr("data-swiper-row"),h.paginationContainer&&h.paginationContainer.length&&h.paginationContainer.removeClass(h.params.paginationHiddenClass),h.bullets&&h.bullets.length&&h.bullets.removeClass(h.params.bulletActiveClass),h.params.prevButton&&v(h.params.prevButton).removeClass(h.params.buttonDisabledClass),h.params.nextButton&&v(h.params.nextButton).removeClass(h.params.buttonDisabledClass),h.params.scrollbar&&h.scrollbar&&(h.scrollbar.track&&h.scrollbar.track.length&&h.scrollbar.track.removeAttr("style"),h.scrollbar.drag&&h.scrollbar.drag.length&&h.scrollbar.drag.removeAttr("style"))},h.destroy=function(e,a){h.detachEvents(),h.stopAutoplay(),h.params.loop&&h.destroyLoop(),a&&h.cleanupStyles(),h.disconnectObservers(),h.params.keyboardControl&&h.disableKeyboardControl&&h.disableKeyboardControl(),h.params.mousewheelControl&&h.disableMousewheelControl&&h.disableMousewheelControl(),h.params.a11y&&h.a11y&&h.a11y.destroy(),h.emit("onDestroy"),e!==!1&&(h=null)},h.init(),h}};a.prototype={isSafari:function(){var e=navigator.userAgent.toLowerCase();return e.indexOf("safari")>=0&&e.indexOf("chrome")<0&&e.indexOf("android")<0}(),isUiWebView:/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent),isArray:function(e){return"[object Array]"===Object.prototype.toString.apply(e)},browser:{ie:window.navigator.pointerEnabled||window.navigator.msPointerEnabled,ieTouch:window.navigator.msPointerEnabled&&window.navigator.msMaxTouchPoints>1||window.navigator.pointerEnabled&&window.navigator.maxTouchPoints>1},device:function(){var e=navigator.userAgent,a=e.match(/(Android);?[\s\/]+([\d.]+)?/),s=e.match(/(iPad).*OS\s([\d_]+)/),t=(e.match(/(iPod)(.*OS\s([\d_]+))?/),!s&&e.match(/(iPhone\sOS)\s([\d_]+)/));return{ios:s||t||s,android:a}}(),support:{touch:window.Modernizr&&Modernizr.touch===!0||function(){return!!("ontouchstart"in window||window.DocumentTouch&&document instanceof DocumentTouch)}(),transforms3d:window.Modernizr&&Modernizr.csstransforms3d===!0||function(){var e=document.createElement("div").style;return"webkitPerspective"in e||"MozPerspective"in e||"OPerspective"in e||"MsPerspective"in e||"perspective"in e}(),flexbox:function(){for(var e=document.createElement("div").style,a="alignItems webkitAlignItems webkitBoxAlign msFlexAlign mozBoxAlign webkitFlexDirection msFlexDirection mozBoxDirection mozBoxOrient webkitBoxDirection webkitBoxOrient".split(" "),s=0;s<a.length;s++)if(a[s]in e)return!0}(),observer:function(){return"MutationObserver"in window||"WebkitMutationObserver"in window}()},plugins:{}};for(var s=["jQuery","Zepto","Dom7"],t=0;t<s.length;t++)window[s[t]]&&e(window[s[t]]);var r;r="undefined"==typeof Dom7?window.Dom7||window.Zepto||window.jQuery:Dom7,r&&("transitionEnd"in r.fn||(r.fn.transitionEnd=function(e){function a(i){if(i.target===this)for(e.call(this,i),s=0;s<t.length;s++)r.off(t[s],a)}var s,t=["webkitTransitionEnd","transitionend","oTransitionEnd","MSTransitionEnd","msTransitionEnd"],r=this;if(e)for(s=0;s<t.length;s++)r.on(t[s],a);return this}),"transform"in r.fn||(r.fn.transform=function(e){for(var a=0;a<this.length;a++){var s=this[a].style;s.webkitTransform=s.MsTransform=s.msTransform=s.MozTransform=s.OTransform=s.transform=e}return this}),"transition"in r.fn||(r.fn.transition=function(e){"string"!=typeof e&&(e+="ms");for(var a=0;a<this.length;a++){var s=this[a].style;s.webkitTransitionDuration=s.MsTransitionDuration=s.msTransitionDuration=s.MozTransitionDuration=s.OTransitionDuration=s.transitionDuration=e}return this})),window.Swiper=a}(),"undefined"!=typeof module?module.exports=window.Swiper:"function"==typeof define&&define.amd&&define([],function(){"use strict";return window.Swiper});
 /*
== malihu jquery custom scrollbar plugin == 
Version: 3.0.9 
Plugin URI: http://manos.malihu.gr/jquery-custom-content-scroller 
Author: malihu
Author URI: http://manos.malihu.gr
License: MIT License (MIT)
*/

/*
Copyright 2010 Manos Malihutsakis (email: manos@malihu.gr)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/

/*
The code below is fairly long, fully commented and should be normally used in development. 
For production, use either the minified jquery.mCustomScrollbar.min.js script or 
the production-ready jquery.mCustomScrollbar.concat.min.js which contains the plugin 
and dependencies (minified). 
*/

(function(factory){
	if(typeof module!=="undefined" && module.exports){
		module.exports=factory;
	}else{
		factory(jQuery,window,document);
	}
}(function($){
(function(init){
	var _rjs=typeof define==="function" && define.amd, /* RequireJS */
		_njs=typeof module !== "undefined" && module.exports, /* NodeJS */
		_dlp=("https:"==document.location.protocol) ? "https:" : "http:", /* location protocol */
		_url="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.12/jquery.mousewheel.min.js";
	if(!_rjs){
		if(_njs){
			require("jquery-mousewheel")($);
		}else{
			/* load jquery-mousewheel plugin (via CDN) if it's not present or not loaded via RequireJS 
			(works when mCustomScrollbar fn is called on window load) */
			$.event.special.mousewheel || $("head").append(decodeURI("%3Cscript src="+_dlp+"//"+_url+"%3E%3C/script%3E"));
		}
	}
	init();
}(function(){
	
	/* 
	----------------------------------------
	PLUGIN NAMESPACE, PREFIX, DEFAULT SELECTOR(S) 
	----------------------------------------
	*/
	
	var pluginNS="mCustomScrollbar",
		pluginPfx="mCS",
		defaultSelector=".mCustomScrollbar",
	
	
		
	
	
	/* 
	----------------------------------------
	DEFAULT OPTIONS 
	----------------------------------------
	*/
	
		defaults={
			/*
			set element/content width/height programmatically 
			values: boolean, pixels, percentage 
				option						default
				-------------------------------------
				setWidth					false
				setHeight					false
			*/
			/*
			set the initial css top property of content  
			values: string (e.g. "-100px", "10%" etc.)
			*/
			setTop:0,
			/*
			set the initial css left property of content  
			values: string (e.g. "-100px", "10%" etc.)
			*/
			setLeft:0,
			/* 
			scrollbar axis (vertical and/or horizontal scrollbars) 
			values (string): "y", "x", "yx"
			*/
			axis:"y",
			/*
			position of scrollbar relative to content  
			values (string): "inside", "outside" ("outside" requires elements with position:relative)
			*/
			scrollbarPosition:"inside",
			/*
			scrolling inertia
			values: integer (milliseconds)
			*/
			scrollInertia:950,
			/* 
			auto-adjust scrollbar dragger length
			values: boolean
			*/
			autoDraggerLength:true,
			/*
			auto-hide scrollbar when idle 
			values: boolean
				option						default
				-------------------------------------
				autoHideScrollbar			false
			*/
			/*
			auto-expands scrollbar on mouse-over and dragging
			values: boolean
				option						default
				-------------------------------------
				autoExpandScrollbar			false
			*/
			/*
			always show scrollbar, even when there's nothing to scroll 
			values: integer (0=disable, 1=always show dragger rail and buttons, 2=always show dragger rail, dragger and buttons), boolean
			*/
			alwaysShowScrollbar:0,
			/*
			scrolling always snaps to a multiple of this number in pixels
			values: integer
				option						default
				-------------------------------------
				snapAmount					null
			*/
			/*
			when snapping, snap with this number in pixels as an offset 
			values: integer
			*/
			snapOffset:0,
			/* 
			mouse-wheel scrolling
			*/
			mouseWheel:{
				/* 
				enable mouse-wheel scrolling
				values: boolean
				*/
				enable:true,
				/* 
				scrolling amount in pixels
				values: "auto", integer 
				*/
				scrollAmount:"auto",
				/* 
				mouse-wheel scrolling axis 
				the default scrolling direction when both vertical and horizontal scrollbars are present 
				values (string): "y", "x" 
				*/
				axis:"y",
				/* 
				prevent the default behaviour which automatically scrolls the parent element(s) when end of scrolling is reached 
				values: boolean
					option						default
					-------------------------------------
					preventDefault				null
				*/
				/*
				the reported mouse-wheel delta value. The number of lines (translated to pixels) one wheel notch scrolls.  
				values: "auto", integer 
				"auto" uses the default OS/browser value 
				*/
				deltaFactor:"auto",
				/*
				normalize mouse-wheel delta to -1 or 1 (disables mouse-wheel acceleration) 
				values: boolean
					option						default
					-------------------------------------
					normalizeDelta				null
				*/
				/*
				invert mouse-wheel scrolling direction 
				values: boolean
					option						default
					-------------------------------------
					invert						null
				*/
				/*
				the tags that disable mouse-wheel when cursor is over them
				*/
				disableOver:["select","option","keygen","datalist","textarea"]
			},
			/* 
			scrollbar buttons
			*/
			scrollButtons:{ 
				/*
				enable scrollbar buttons
				values: boolean
					option						default
					-------------------------------------
					enable						null
				*/
				/*
				scrollbar buttons scrolling type 
				values (string): "stepless", "stepped"
				*/
				scrollType:"stepless",
				/*
				scrolling amount in pixels
				values: "auto", integer 
				*/
				scrollAmount:"auto"
				/*
				tabindex of the scrollbar buttons
				values: false, integer
					option						default
					-------------------------------------
					tabindex					null
				*/
			},
			/* 
			keyboard scrolling
			*/
			keyboard:{ 
				/*
				enable scrolling via keyboard
				values: boolean
				*/
				enable:true,
				/*
				keyboard scrolling type 
				values (string): "stepless", "stepped"
				*/
				scrollType:"stepless",
				/*
				scrolling amount in pixels
				values: "auto", integer 
				*/
				scrollAmount:"auto"
			},
			/*
			enable content touch-swipe scrolling 
			values: boolean, integer, string (number)
			integer values define the axis-specific minimum amount required for scrolling momentum
			*/
			contentTouchScroll:25,
			/*
			advanced option parameters
			*/
			advanced:{
				/*
				auto-expand content horizontally (for "x" or "yx" axis) 
				values: boolean
					option						default
					-------------------------------------
					autoExpandHorizontalScroll	null
				*/
				/*
				auto-scroll to elements with focus
				*/
				autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",
				/*
				auto-update scrollbars on content, element or viewport resize 
				should be true for fluid layouts/elements, adding/removing content dynamically, hiding/showing elements, content with images etc. 
				values: boolean
				*/
				updateOnContentResize:true,
				/*
				auto-update scrollbars each time each image inside the element is fully loaded 
				values: boolean
				*/
				updateOnImageLoad:true,
				/*
				auto-update scrollbars based on the amount and size changes of specific selectors 
				useful when you need to update the scrollbar(s) automatically, each time a type of element is added, removed or changes its size 
				values: boolean, string (e.g. "ul li" will auto-update scrollbars each time list-items inside the element are changed) 
				a value of true (boolean) will auto-update scrollbars each time any element is changed
					option						default
					-------------------------------------
					updateOnSelectorChange		null
				*/
				/*
				extra selectors that'll release scrollbar dragging upon mouseup, pointerup, touchend etc. (e.g. "selector-1, selector-2")
					option						default
					-------------------------------------
					releaseDraggableSelectors	null
				*/
				/*
				auto-update timeout 
				values: integer (milliseconds)
				*/
				autoUpdateTimeout:60
			},
			/* 
			scrollbar theme 
			values: string (see CSS/plugin URI for a list of ready-to-use themes)
			*/
			theme:"light",
			/*
			user defined callback functions
			*/
			callbacks:{
				/*
				Available callbacks: 
					callback					default
					-------------------------------------
					onInit						null
					onScrollStart				null
					onScroll					null
					onTotalScroll				null
					onTotalScrollBack			null
					whileScrolling				null
					onOverflowY					null
					onOverflowX					null
					onOverflowYNone				null
					onOverflowXNone				null
					onImageLoad					null
					onSelectorChange			null
					onUpdate					null
				*/
				onTotalScrollOffset:0,
				onTotalScrollBackOffset:0,
				alwaysTriggerOffsets:true
			}
			/*
			add scrollbar(s) on all elements matching the current selector, now and in the future 
			values: boolean, string 
			string values: "on" (enable), "once" (disable after first invocation), "off" (disable)
			liveSelector values: string (selector)
				option						default
				-------------------------------------
				live						false
				liveSelector				null
			*/
		},
	
	
	
	
	
	/* 
	----------------------------------------
	VARS, CONSTANTS 
	----------------------------------------
	*/
	
		totalInstances=0, /* plugin instances amount */
		liveTimers={}, /* live option timers */
		oldIE=(window.attachEvent && !window.addEventListener) ? 1 : 0, /* detect IE < 9 */
		touchActive=false,touchable, /* global touch vars (for touch and pointer events) */
		/* general plugin classes */
		classes=[
			"mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar",
			"mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer",
			"mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"
		],
		
	
	
	
	
	/* 
	----------------------------------------
	METHODS 
	----------------------------------------
	*/
	
		methods={
			
			/* 
			plugin initialization method 
			creates the scrollbar(s), plugin data object and options
			----------------------------------------
			*/
			
			init:function(options){
				
				var options=$.extend(true,{},defaults,options),
					selector=_selector.call(this); /* validate selector */
				
				/* 
				if live option is enabled, monitor for elements matching the current selector and 
				apply scrollbar(s) when found (now and in the future) 
				*/
				if(options.live){
					var liveSelector=options.liveSelector || this.selector || defaultSelector, /* live selector(s) */
						$liveSelector=$(liveSelector); /* live selector(s) as jquery object */
					if(options.live==="off"){
						/* 
						disable live if requested 
						usage: $(selector).mCustomScrollbar({live:"off"}); 
						*/
						removeLiveTimers(liveSelector);
						return;
					}
					liveTimers[liveSelector]=setTimeout(function(){
						/* call mCustomScrollbar fn on live selector(s) every half-second */
						$liveSelector.mCustomScrollbar(options);
						if(options.live==="once" && $liveSelector.length){
							/* disable live after first invocation */
							removeLiveTimers(liveSelector);
						}
					},500);
				}else{
					removeLiveTimers(liveSelector);
				}
				
				/* options backward compatibility (for versions < 3.0.0) and normalization */
				options.setWidth=(options.set_width) ? options.set_width : options.setWidth;
				options.setHeight=(options.set_height) ? options.set_height : options.setHeight;
				options.axis=(options.horizontalScroll) ? "x" : _findAxis(options.axis);
				options.scrollInertia=options.scrollInertia>0 && options.scrollInertia<17 ? 17 : options.scrollInertia;
				if(typeof options.mouseWheel!=="object" &&  options.mouseWheel==true){ /* old school mouseWheel option (non-object) */
					options.mouseWheel={enable:true,scrollAmount:"auto",axis:"y",preventDefault:false,deltaFactor:"auto",normalizeDelta:false,invert:false}
				}
				options.mouseWheel.scrollAmount=!options.mouseWheelPixels ? options.mouseWheel.scrollAmount : options.mouseWheelPixels;
				options.mouseWheel.normalizeDelta=!options.advanced.normalizeMouseWheelDelta ? options.mouseWheel.normalizeDelta : options.advanced.normalizeMouseWheelDelta;
				options.scrollButtons.scrollType=_findScrollButtonsType(options.scrollButtons.scrollType); 
				
				_theme(options); /* theme-specific options */
				
				/* plugin constructor */
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if(!$this.data(pluginPfx)){ /* prevent multiple instantiations */
					
						/* store options and create objects in jquery data */
						$this.data(pluginPfx,{
							idx:++totalInstances, /* instance index */
							opt:options, /* options */
							scrollRatio:{y:null,x:null}, /* scrollbar to content ratio */
							overflowed:null, /* overflowed axis */
							contentReset:{y:null,x:null}, /* object to check when content resets */
							bindEvents:false, /* object to check if events are bound */
							tweenRunning:false, /* object to check if tween is running */
							sequential:{}, /* sequential scrolling object */
							langDir:$this.css("direction"), /* detect/store direction (ltr or rtl) */
							cbOffsets:null, /* object to check whether callback offsets always trigger */
							/* 
							object to check how scrolling events where last triggered 
							"internal" (default - triggered by this script), "external" (triggered by other scripts, e.g. via scrollTo method) 
							usage: object.data("mCS").trigger
							*/
							trigger:null
						});
						
						var d=$this.data(pluginPfx),o=d.opt,
							/* HTML data attributes */
							htmlDataAxis=$this.data("mcs-axis"),htmlDataSbPos=$this.data("mcs-scrollbar-position"),htmlDataTheme=$this.data("mcs-theme");
						 
						if(htmlDataAxis){o.axis=htmlDataAxis;} /* usage example: data-mcs-axis="y" */
						if(htmlDataSbPos){o.scrollbarPosition=htmlDataSbPos;} /* usage example: data-mcs-scrollbar-position="outside" */
						if(htmlDataTheme){ /* usage example: data-mcs-theme="minimal" */
							o.theme=htmlDataTheme;
							_theme(o); /* theme-specific options */
						}
						
						_pluginMarkup.call(this); /* add plugin markup */
						
						$("#mCSB_"+d.idx+"_container img:not(."+classes[2]+")").addClass(classes[2]); /* flag loaded images */
						
						methods.update.call(null,$this); /* call the update method */
					
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/* 
			plugin update method 
			updates content and scrollbar(s) values, events and status 
			----------------------------------------
			usage: $(selector).mCustomScrollbar("update");
			*/
			
			update:function(el,cb){
				
				var selector=el || _selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
						
						var d=$this.data(pluginPfx),o=d.opt,
							mCSB_container=$("#mCSB_"+d.idx+"_container"),
							mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
						
						if(!mCSB_container.length){return;}
						
						if(d.tweenRunning){_stop($this);} /* stop any running tweens while updating */
						
						/* if element was disabled or destroyed, remove class(es) */
						if($this.hasClass(classes[3])){$this.removeClass(classes[3]);}
						if($this.hasClass(classes[4])){$this.removeClass(classes[4]);}
						
						_maxHeight.call(this); /* detect/set css max-height value */
						
						_expandContentHorizontally.call(this); /* expand content horizontally */
						
						if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
							mCSB_container.css("width",_contentWidth(mCSB_container.children()));
						}
						
						d.overflowed=_overflowed.call(this); /* determine if scrolling is required */
						
						_scrollbarVisibility.call(this); /* show/hide scrollbar(s) */
						
						/* auto-adjust scrollbar dragger length analogous to content */
						if(o.autoDraggerLength){_setDraggerLength.call(this);}
						
						_scrollRatio.call(this); /* calculate and store scrollbar to content ratio */
						
						_bindEvents.call(this); /* bind scrollbar events */
						
						/* reset scrolling position and/or events */
						var to=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)];
						if(o.axis!=="x"){ /* y/yx axis */
							if(!d.overflowed[0]){ /* y scrolling is not required */
								_resetContentPosition.call(this); /* reset content position */
								if(o.axis==="y"){
									_unbindEvents.call(this);
								}else if(o.axis==="yx" && d.overflowed[1]){
									_scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
								}
							}else if(mCSB_dragger[0].height()>mCSB_dragger[0].parent().height()){
								_resetContentPosition.call(this); /* reset content position */
							}else{ /* y scrolling is required */
								_scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
								d.contentReset.y=null;
							}
						}
						if(o.axis!=="y"){ /* x/yx axis */
							if(!d.overflowed[1]){ /* x scrolling is not required */
								_resetContentPosition.call(this); /* reset content position */
								if(o.axis==="x"){
									_unbindEvents.call(this);
								}else if(o.axis==="yx" && d.overflowed[0]){
									_scrollTo($this,to[0].toString(),{dir:"y",dur:0,overwrite:"none"});
								}
							}else if(mCSB_dragger[1].width()>mCSB_dragger[1].parent().width()){
								_resetContentPosition.call(this); /* reset content position */
							}else{ /* x scrolling is required */
								_scrollTo($this,to[1].toString(),{dir:"x",dur:0,overwrite:"none"});
								d.contentReset.x=null;
							}
						}
						
						/* callbacks: onImageLoad, onSelectorChange, onUpdate */
						if(cb && d){
							if(cb===2 && o.callbacks.onImageLoad && typeof o.callbacks.onImageLoad==="function"){
								o.callbacks.onImageLoad.call(this);
							}else if(cb===3 && o.callbacks.onSelectorChange && typeof o.callbacks.onSelectorChange==="function"){
								o.callbacks.onSelectorChange.call(this);
							}else if(o.callbacks.onUpdate && typeof o.callbacks.onUpdate==="function"){
								o.callbacks.onUpdate.call(this);
							}
						}
						
						_autoUpdate.call(this); /* initialize automatic updating (for dynamic content, fluid layouts etc.) */
						
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/* 
			plugin scrollTo method 
			triggers a scrolling event to a specific value
			----------------------------------------
			usage: $(selector).mCustomScrollbar("scrollTo",value,options);
			*/
		
			scrollTo:function(val,options){
				
				/* prevent silly things like $(selector).mCustomScrollbar("scrollTo",undefined); */
				if(typeof val=="undefined" || val==null){return;}
				
				var selector=_selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
					
						var d=$this.data(pluginPfx),o=d.opt,
							/* method default options */
							methodDefaults={
								trigger:"external", /* method is by default triggered externally (e.g. from other scripts) */
								scrollInertia:o.scrollInertia, /* scrolling inertia (animation duration) */
								scrollEasing:"mcsEaseInOut", /* animation easing */
								moveDragger:false, /* move dragger instead of content */
								timeout:60, /* scroll-to delay */
								callbacks:true, /* enable/disable callbacks */
								onStart:true,
								onUpdate:true,
								onComplete:true
							},
							methodOptions=$.extend(true,{},methodDefaults,options),
							to=_arr.call(this,val),dur=methodOptions.scrollInertia>0 && methodOptions.scrollInertia<17 ? 17 : methodOptions.scrollInertia;
						
						/* translate yx values to actual scroll-to positions */
						to[0]=_to.call(this,to[0],"y");
						to[1]=_to.call(this,to[1],"x");
						
						/* 
						check if scroll-to value moves the dragger instead of content. 
						Only pixel values apply on dragger (e.g. 100, "100px", "-=100" etc.) 
						*/
						if(methodOptions.moveDragger){
							to[0]*=d.scrollRatio.y;
							to[1]*=d.scrollRatio.x;
						}
						
						methodOptions.dur=dur;
						
						setTimeout(function(){ 
							/* do the scrolling */
							if(to[0]!==null && typeof to[0]!=="undefined" && o.axis!=="x" && d.overflowed[0]){ /* scroll y */
								methodOptions.dir="y";
								methodOptions.overwrite="all";
								_scrollTo($this,to[0].toString(),methodOptions);
							}
							if(to[1]!==null && typeof to[1]!=="undefined" && o.axis!=="y" && d.overflowed[1]){ /* scroll x */
								methodOptions.dir="x";
								methodOptions.overwrite="none";
								_scrollTo($this,to[1].toString(),methodOptions);
							}
						},methodOptions.timeout);
						
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/*
			plugin stop method 
			stops scrolling animation
			----------------------------------------
			usage: $(selector).mCustomScrollbar("stop");
			*/
			stop:function(){
				
				var selector=_selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
										
						_stop($this);
					
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/*
			plugin disable method 
			temporarily disables the scrollbar(s) 
			----------------------------------------
			usage: $(selector).mCustomScrollbar("disable",reset); 
			reset (boolean): resets content position to 0 
			*/
			disable:function(r){
				
				var selector=_selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
						
						var d=$this.data(pluginPfx);
						
						_autoUpdate.call(this,"remove"); /* remove automatic updating */
						
						_unbindEvents.call(this); /* unbind events */
						
						if(r){_resetContentPosition.call(this);} /* reset content position */
						
						_scrollbarVisibility.call(this,true); /* show/hide scrollbar(s) */
						
						$this.addClass(classes[3]); /* add disable class */
					
					}
					
				});
				
			},
			/* ---------------------------------------- */
			
			
			
			/*
			plugin destroy method 
			completely removes the scrollbar(s) and returns the element to its original state
			----------------------------------------
			usage: $(selector).mCustomScrollbar("destroy"); 
			*/
			destroy:function(){
				
				var selector=_selector.call(this); /* validate selector */
				
				return $(selector).each(function(){
					
					var $this=$(this);
					
					if($this.data(pluginPfx)){ /* check if plugin has initialized */
					
						var d=$this.data(pluginPfx),o=d.opt,
							mCustomScrollBox=$("#mCSB_"+d.idx),
							mCSB_container=$("#mCSB_"+d.idx+"_container"),
							scrollbar=$(".mCSB_"+d.idx+"_scrollbar");
					
						if(o.live){removeLiveTimers(o.liveSelector || $(selector).selector);} /* remove live timers */
						
						_autoUpdate.call(this,"remove"); /* remove automatic updating */
						
						_unbindEvents.call(this); /* unbind events */
						
						_resetContentPosition.call(this); /* reset content position */
						
						$this.removeData(pluginPfx); /* remove plugin data object */
						
						_delete(this,"mcs"); /* delete callbacks object */
						
						/* remove plugin markup */
						scrollbar.remove(); /* remove scrollbar(s) first (those can be either inside or outside plugin's inner wrapper) */
						mCSB_container.find("img."+classes[2]).removeClass(classes[2]); /* remove loaded images flag */
						mCustomScrollBox.replaceWith(mCSB_container.contents()); /* replace plugin's inner wrapper with the original content */
						/* remove plugin classes from the element and add destroy class */
						$this.removeClass(pluginNS+" _"+pluginPfx+"_"+d.idx+" "+classes[6]+" "+classes[7]+" "+classes[5]+" "+classes[3]).addClass(classes[4]);
					
					}
					
				});
				
			}
			/* ---------------------------------------- */
			
		},
	
	
	
	
		
	/* 
	----------------------------------------
	FUNCTIONS
	----------------------------------------
	*/
	
		/* validates selector (if selector is invalid or undefined uses the default one) */
		_selector=function(){
			return (typeof $(this)!=="object" || $(this).length<1) ? defaultSelector : this;
		},
		/* -------------------- */
		
		
		/* changes options according to theme */
		_theme=function(obj){
			var fixedSizeScrollbarThemes=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],
				nonExpandedScrollbarThemes=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],
				disabledScrollButtonsThemes=["minimal","minimal-dark"],
				enabledAutoHideScrollbarThemes=["minimal","minimal-dark"],
				scrollbarPositionOutsideThemes=["minimal","minimal-dark"];
			obj.autoDraggerLength=$.inArray(obj.theme,fixedSizeScrollbarThemes) > -1 ? false : obj.autoDraggerLength;
			obj.autoExpandScrollbar=$.inArray(obj.theme,nonExpandedScrollbarThemes) > -1 ? false : obj.autoExpandScrollbar;
			obj.scrollButtons.enable=$.inArray(obj.theme,disabledScrollButtonsThemes) > -1 ? false : obj.scrollButtons.enable;
			obj.autoHideScrollbar=$.inArray(obj.theme,enabledAutoHideScrollbarThemes) > -1 ? true : obj.autoHideScrollbar;
			obj.scrollbarPosition=$.inArray(obj.theme,scrollbarPositionOutsideThemes) > -1 ? "outside" : obj.scrollbarPosition;
		},
		/* -------------------- */
		
		
		/* live option timers removal */
		removeLiveTimers=function(selector){
			if(liveTimers[selector]){
				clearTimeout(liveTimers[selector]);
				_delete(liveTimers,selector);
			}
		},
		/* -------------------- */
		
		
		/* normalizes axis option to valid values: "y", "x", "yx" */
		_findAxis=function(val){
			return (val==="yx" || val==="xy" || val==="auto") ? "yx" : (val==="x" || val==="horizontal") ? "x" : "y";
		},
		/* -------------------- */
		
		
		/* normalizes scrollButtons.scrollType option to valid values: "stepless", "stepped" */
		_findScrollButtonsType=function(val){
			return (val==="stepped" || val==="pixels" || val==="step" || val==="click") ? "stepped" : "stepless";
		},
		/* -------------------- */
		
		
		/* generates plugin markup */
		_pluginMarkup=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				expandClass=o.autoExpandScrollbar ? " "+classes[1]+"_expand" : "",
				scrollbar=["<div id='mCSB_"+d.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_vertical"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+d.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+d.idx+"_scrollbar mCS-"+o.theme+" mCSB_scrollTools_horizontal"+expandClass+"'><div class='"+classes[12]+"'><div id='mCSB_"+d.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],
				wrapperClass=o.axis==="yx" ? "mCSB_vertical_horizontal" : o.axis==="x" ? "mCSB_horizontal" : "mCSB_vertical",
				scrollbars=o.axis==="yx" ? scrollbar[0]+scrollbar[1] : o.axis==="x" ? scrollbar[1] : scrollbar[0],
				contentWrapper=o.axis==="yx" ? "<div id='mCSB_"+d.idx+"_container_wrapper' class='mCSB_container_wrapper' />" : "",
				autoHideClass=o.autoHideScrollbar ? " "+classes[6] : "",
				scrollbarDirClass=(o.axis!=="x" && d.langDir==="rtl") ? " "+classes[7] : "";
			if(o.setWidth){$this.css("width",o.setWidth);} /* set element width */
			if(o.setHeight){$this.css("height",o.setHeight);} /* set element height */
			o.setLeft=(o.axis!=="y" && d.langDir==="rtl") ? "989999px" : o.setLeft; /* adjust left position for rtl direction */
			$this.addClass(pluginNS+" _"+pluginPfx+"_"+d.idx+autoHideClass+scrollbarDirClass).wrapInner("<div id='mCSB_"+d.idx+"' class='mCustomScrollBox mCS-"+o.theme+" "+wrapperClass+"'><div id='mCSB_"+d.idx+"_container' class='mCSB_container' style='position:relative; top:"+o.setTop+"; left:"+o.setLeft+";' dir="+d.langDir+" /></div>");
			var mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.axis!=="y" && !o.advanced.autoExpandHorizontalScroll){
				mCSB_container.css("width",_contentWidth(mCSB_container.children()));
			}
			if(o.scrollbarPosition==="outside"){
				if($this.css("position")==="static"){ /* requires elements with non-static position */
					$this.css("position","relative");
				}
				$this.css("overflow","visible");
				mCustomScrollBox.addClass("mCSB_outside").after(scrollbars);
			}else{
				mCustomScrollBox.addClass("mCSB_inside").append(scrollbars);
				mCSB_container.wrap(contentWrapper);
			}
			_scrollButtons.call(this); /* add scrollbar buttons */
			/* minimum dragger length */
			var mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
			mCSB_dragger[0].css("min-height",mCSB_dragger[0].height());
			mCSB_dragger[1].css("min-width",mCSB_dragger[1].width());
		},
		/* -------------------- */
		
		
		/* calculates content width */
		_contentWidth=function(el){
			return Math.max.apply(Math,el.map(function(){return $(this).outerWidth(true);}).get());
		},
		/* -------------------- */
		
		
		/* expands content horizontally */
		_expandContentHorizontally=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.advanced.autoExpandHorizontalScroll && o.axis!=="y"){
				/* 
				wrap content with an infinite width div and set its position to absolute and width to auto. 
				Setting width to auto before calculating the actual width is important! 
				We must let the browser set the width as browser zoom values are impossible to calculate.
				*/
				mCSB_container.css({"position":"absolute","width":"auto"})
					.wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />")
					.css({ /* set actual width, original position and un-wrap */
						/* 
						get the exact width (with decimals) and then round-up. 
						Using jquery outerWidth() will round the width value which will mess up with inner elements that have non-integer width
						*/
						"width":(Math.ceil(mCSB_container[0].getBoundingClientRect().right+0.4)-Math.floor(mCSB_container[0].getBoundingClientRect().left)),
						"position":"relative"
					}).unwrap();
			}
		},
		/* -------------------- */
		
		
		/* adds scrollbar buttons */
		_scrollButtons=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_scrollTools=$(".mCSB_"+d.idx+"_scrollbar:first"),
				tabindex=!_isNumeric(o.scrollButtons.tabindex) ? "" : "tabindex='"+o.scrollButtons.tabindex+"'",
				btnHTML=[
					"<a href='#' class='"+classes[13]+"' oncontextmenu='return false;' "+tabindex+" />",
					"<a href='#' class='"+classes[14]+"' oncontextmenu='return false;' "+tabindex+" />",
					"<a href='#' class='"+classes[15]+"' oncontextmenu='return false;' "+tabindex+" />",
					"<a href='#' class='"+classes[16]+"' oncontextmenu='return false;' "+tabindex+" />"
				],
				btn=[(o.axis==="x" ? btnHTML[2] : btnHTML[0]),(o.axis==="x" ? btnHTML[3] : btnHTML[1]),btnHTML[2],btnHTML[3]];
			if(o.scrollButtons.enable){
				mCSB_scrollTools.prepend(btn[0]).append(btn[1]).next(".mCSB_scrollTools").prepend(btn[2]).append(btn[3]);
			}
		},
		/* -------------------- */
		
		
		/* detects/sets css max-height value */
		_maxHeight=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mh=$this.css("max-height") || "none",pct=mh.indexOf("%")!==-1,
				bs=$this.css("box-sizing");
			if(mh!=="none"){
				var val=pct ? $this.parent().height()*parseInt(mh)/100 : parseInt(mh);
				/* if element's css box-sizing is "border-box", subtract any paddings and/or borders from max-height value */
				if(bs==="border-box"){val-=(($this.innerHeight()-$this.height())+($this.outerHeight()-$this.innerHeight()));}
				mCustomScrollBox.css("max-height",Math.round(val));
			}
		},
		/* -------------------- */
		
		
		/* auto-adjusts scrollbar dragger length */
		_setDraggerLength=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				ratio=[mCustomScrollBox.height()/mCSB_container.outerHeight(false),mCustomScrollBox.width()/mCSB_container.outerWidth(false)],
				l=[
					parseInt(mCSB_dragger[0].css("min-height")),Math.round(ratio[0]*mCSB_dragger[0].parent().height()),
					parseInt(mCSB_dragger[1].css("min-width")),Math.round(ratio[1]*mCSB_dragger[1].parent().width())
				],
				h=oldIE && (l[1]<l[0]) ? l[0] : l[1],w=oldIE && (l[3]<l[2]) ? l[2] : l[3];
			mCSB_dragger[0].css({
				"height":h,"max-height":(mCSB_dragger[0].parent().height()-10)
			}).find(".mCSB_dragger_bar").css({"line-height":l[0]+"px"});
			mCSB_dragger[1].css({
				"width":w,"max-width":(mCSB_dragger[1].parent().width()-10)
			});
		},
		/* -------------------- */
		
		
		/* calculates scrollbar to content ratio */
		_scrollRatio=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				scrollAmount=[mCSB_container.outerHeight(false)-mCustomScrollBox.height(),mCSB_container.outerWidth(false)-mCustomScrollBox.width()],
				ratio=[
					scrollAmount[0]/(mCSB_dragger[0].parent().height()-mCSB_dragger[0].height()),
					scrollAmount[1]/(mCSB_dragger[1].parent().width()-mCSB_dragger[1].width())
				];
			d.scrollRatio={y:ratio[0],x:ratio[1]};
		},
		/* -------------------- */
		
		
		/* toggles scrolling classes */
		_onDragClasses=function(el,action,xpnd){
			var expandClass=xpnd ? classes[0]+"_expanded" : "",
				scrollbar=el.closest(".mCSB_scrollTools");
			if(action==="active"){
				el.toggleClass(classes[0]+" "+expandClass); scrollbar.toggleClass(classes[1]); 
				el[0]._draggable=el[0]._draggable ? 0 : 1;
			}else{
				if(!el[0]._draggable){
					if(action==="hide"){
						el.removeClass(classes[0]); scrollbar.removeClass(classes[1]);
					}else{
						el.addClass(classes[0]); scrollbar.addClass(classes[1]);
					}
				}
			}
		},
		/* -------------------- */
		
		
		/* checks if content overflows its container to determine if scrolling is required */
		_overflowed=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				contentHeight=d.overflowed==null ? mCSB_container.height() : mCSB_container.outerHeight(false),
				contentWidth=d.overflowed==null ? mCSB_container.width() : mCSB_container.outerWidth(false);
			return [contentHeight>mCustomScrollBox.height(),contentWidth>mCustomScrollBox.width()];
		},
		/* -------------------- */
		
		
		/* resets content position to 0 */
		_resetContentPosition=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")];
			_stop($this); /* stop any current scrolling before resetting */
			if((o.axis!=="x" && !d.overflowed[0]) || (o.axis==="y" && d.overflowed[0])){ /* reset y */
				mCSB_dragger[0].add(mCSB_container).css("top",0);
				_scrollTo($this,"_resetY");
			}
			if((o.axis!=="y" && !d.overflowed[1]) || (o.axis==="x" && d.overflowed[1])){ /* reset x */
				var cx=dx=0;
				if(d.langDir==="rtl"){ /* adjust left position for rtl direction */
					cx=mCustomScrollBox.width()-mCSB_container.outerWidth(false);
					dx=Math.abs(cx/d.scrollRatio.x);
				}
				mCSB_container.css("left",cx);
				mCSB_dragger[1].css("left",dx);
				_scrollTo($this,"_resetX");
			}
		},
		/* -------------------- */
		
		
		/* binds scrollbar events */
		_bindEvents=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt;
			if(!d.bindEvents){ /* check if events are already bound */
				_draggable.call(this);
				if(o.contentTouchScroll){_contentDraggable.call(this);}
				_selectable.call(this);
				if(o.mouseWheel.enable){ /* bind mousewheel fn when plugin is available */
					function _mwt(){
						mousewheelTimeout=setTimeout(function(){
							if(!$.event.special.mousewheel){
								_mwt();
							}else{
								clearTimeout(mousewheelTimeout);
								_mousewheel.call($this[0]);
							}
						},100);
					}
					var mousewheelTimeout;
					_mwt();
				}
				_draggerRail.call(this);
				_wrapperScroll.call(this);
				if(o.advanced.autoScrollOnFocus){_focus.call(this);}
				if(o.scrollButtons.enable){_buttons.call(this);}
				if(o.keyboard.enable){_keyboard.call(this);}
				d.bindEvents=true;
			}
		},
		/* -------------------- */
		
		
		/* unbinds scrollbar events */
		_unbindEvents=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				sb=".mCSB_"+d.idx+"_scrollbar",
				sel=$("#mCSB_"+d.idx+",#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,"+sb+" ."+classes[12]+",#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal,"+sb+">a"),
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(o.advanced.releaseDraggableSelectors){sel.add($(o.advanced.releaseDraggableSelectors));}
			if(d.bindEvents){ /* check if events are bound */
				/* unbind namespaced events from document/selectors */
				$(document).unbind("."+namespace);
				sel.each(function(){
					$(this).unbind("."+namespace);
				});
				/* clear and delete timeouts/objects */
				clearTimeout($this[0]._focusTimeout); _delete($this[0],"_focusTimeout");
				clearTimeout(d.sequential.step); _delete(d.sequential,"step");
				clearTimeout(mCSB_container[0].onCompleteTimeout); _delete(mCSB_container[0],"onCompleteTimeout");
				d.bindEvents=false;
			}
		},
		/* -------------------- */
		
		
		/* toggles scrollbar visibility */
		_scrollbarVisibility=function(disabled){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				contentWrapper=$("#mCSB_"+d.idx+"_container_wrapper"),
				content=contentWrapper.length ? contentWrapper : $("#mCSB_"+d.idx+"_container"),
				scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
				mCSB_dragger=[scrollbar[0].find(".mCSB_dragger"),scrollbar[1].find(".mCSB_dragger")];
			if(o.axis!=="x"){
				if(d.overflowed[0] && !disabled){
					scrollbar[0].add(mCSB_dragger[0]).add(scrollbar[0].children("a")).css("display","block");
					content.removeClass(classes[8]+" "+classes[10]);
				}else{
					if(o.alwaysShowScrollbar){
						if(o.alwaysShowScrollbar!==2){mCSB_dragger[0].css("display","none");}
						content.removeClass(classes[10]);
					}else{
						scrollbar[0].css("display","none");
						content.addClass(classes[10]);
					}
					content.addClass(classes[8]);
				}
			}
			if(o.axis!=="y"){
				if(d.overflowed[1] && !disabled){
					scrollbar[1].add(mCSB_dragger[1]).add(scrollbar[1].children("a")).css("display","block");
					content.removeClass(classes[9]+" "+classes[11]);
				}else{
					if(o.alwaysShowScrollbar){
						if(o.alwaysShowScrollbar!==2){mCSB_dragger[1].css("display","none");}
						content.removeClass(classes[11]);
					}else{
						scrollbar[1].css("display","none");
						content.addClass(classes[11]);
					}
					content.addClass(classes[9]);
				}
			}
			if(!d.overflowed[0] && !d.overflowed[1]){
				$this.addClass(classes[5]);
			}else{
				$this.removeClass(classes[5]);
			}
		},
		/* -------------------- */
		
		
		/* returns input coordinates of pointer, touch and mouse events (relative to document) */
		_coordinates=function(e){
			var t=e.type;
			switch(t){
				case "pointerdown": case "MSPointerDown": case "pointermove": case "MSPointerMove": case "pointerup": case "MSPointerUp":
					return e.target.ownerDocument!==document ? [e.originalEvent.screenY,e.originalEvent.screenX,false] : [e.originalEvent.pageY,e.originalEvent.pageX,false];
					break;
				case "touchstart": case "touchmove": case "touchend":
					var touch=e.originalEvent.touches[0] || e.originalEvent.changedTouches[0],
						touches=e.originalEvent.touches.length || e.originalEvent.changedTouches.length;
					return e.target.ownerDocument!==document ? [touch.screenY,touch.screenX,touches>1] : [touch.pageY,touch.pageX,touches>1];
					break;
				default:
					return [e.pageY,e.pageX,false];
			}
		},
		/* -------------------- */
		
		
		/* 
		SCROLLBAR DRAG EVENTS
		scrolls content via scrollbar dragging 
		*/
		_draggable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				draggerId=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=$("#"+draggerId[0]+",#"+draggerId[1]),
				draggable,dragY,dragX,
				rds=o.advanced.releaseDraggableSelectors ? mCSB_dragger.add($(o.advanced.releaseDraggableSelectors)) : mCSB_dragger;
			mCSB_dragger.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
				e.stopImmediatePropagation();
				e.preventDefault();
				if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
				touchActive=true;
				if(oldIE){document.onselectstart=function(){return false;}} /* disable text selection for IE < 9 */
				_iframe(false); /* enable scrollbar dragging over iframes by disabling their events */
				_stop($this);
				draggable=$(this);
				var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
					h=draggable.height()+offset.top,w=draggable.width()+offset.left;
				if(y<h && y>0 && x<w && x>0){
					dragY=y; 
					dragX=x;
				}
				_onDragClasses(draggable,"active",o.autoExpandScrollbar); 
			}).bind("touchmove."+namespace,function(e){
				e.stopImmediatePropagation();
				e.preventDefault();
				var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
				_drag(dragY,dragX,y,x);
			});
			$(document).bind("mousemove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace,function(e){
				if(draggable){
					var offset=draggable.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
					if(dragY===y){return;} /* has it really moved? */
					_drag(dragY,dragX,y,x);
				}
			}).add(rds).bind("mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
				if(draggable){
					_onDragClasses(draggable,"active",o.autoExpandScrollbar); 
					draggable=null;
				}
				touchActive=false;
				if(oldIE){document.onselectstart=null;} /* enable text selection for IE < 9 */
				_iframe(true); /* enable iframes events */
			});
			function _iframe(evt){
				var el=mCSB_container.find("iframe");
				if(!el.length){return;} /* check if content contains iframes */
				var val=!evt ? "none" : "auto";
				el.css("pointer-events",val); /* for IE11, iframe's display property should not be "block" */
			}
			function _drag(dragY,dragX,y,x){
				mCSB_container[0].idleTimer=o.scrollInertia<233 ? 250 : 0;
				if(draggable.attr("id")===draggerId[1]){
					var dir="x",to=((draggable[0].offsetLeft-dragX)+x)*d.scrollRatio.x;
				}else{
					var dir="y",to=((draggable[0].offsetTop-dragY)+y)*d.scrollRatio.y;
				}
				_scrollTo($this,to.toString(),{dir:dir,drag:true});
			}
		},
		/* -------------------- */
		
		
		/* 
		TOUCH SWIPE EVENTS
		scrolls content via touch swipe 
		Emulates the native touch-swipe scrolling with momentum found in iOS, Android and WP devices 
		*/
		_contentDraggable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				dragY,dragX,touchStartY,touchStartX,touchMoveY=[],touchMoveX=[],startTime,runningTime,endTime,distance,speed,amount,
				durA=0,durB,overwrite=o.axis==="yx" ? "none" : "all",touchIntent=[],touchDrag,docDrag,
				iframe=mCSB_container.find("iframe"),
				events=[
					"touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace, //start
					"touchmove."+namespace+" pointermove."+namespace+" MSPointerMove."+namespace, //move
					"touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace //end
				];
			mCSB_container.bind(events[0],function(e){
				_onTouchstart(e);
			}).bind(events[1],function(e){
				_onTouchmove(e);
			});
			mCustomScrollBox.bind(events[0],function(e){
				_onTouchstart2(e);
			}).bind(events[2],function(e){
				_onTouchend(e);
			});
			if(iframe.length){
				iframe.each(function(){
					$(this).load(function(){
						/* bind events on accessible iframes */
						if(_canAccessIFrame(this)){
							$(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
								_onTouchstart(e);
								_onTouchstart2(e);
							}).bind(events[1],function(e){
								_onTouchmove(e);
							}).bind(events[2],function(e){
								_onTouchend(e);
							});
						}
					});
				});
			}
			function _onTouchstart(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
				touchable=1; touchDrag=0; docDrag=0;
				$this.removeClass("mCS_touch_action");
				var offset=mCSB_container.offset();
				dragY=_coordinates(e)[0]-offset.top;
				dragX=_coordinates(e)[1]-offset.left;
				touchIntent=[_coordinates(e)[0],_coordinates(e)[1]];
			}
			function _onTouchmove(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
				e.stopImmediatePropagation();
				if(docDrag && !touchDrag){return;}
				runningTime=_getTime();
				var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left,
					easing="mcsLinearOut";
				touchMoveY.push(y);
				touchMoveX.push(x);
				touchIntent[2]=Math.abs(_coordinates(e)[0]-touchIntent[0]); touchIntent[3]=Math.abs(_coordinates(e)[1]-touchIntent[1]);
				if(d.overflowed[0]){
					var limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
						prevent=((dragY-y)>0 && (y-dragY)>-(limit*d.scrollRatio.y) && (touchIntent[3]*2<touchIntent[2] || o.axis==="yx"));
				}
				if(d.overflowed[1]){
					var limitX=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
						preventX=((dragX-x)>0 && (x-dragX)>-(limitX*d.scrollRatio.x) && (touchIntent[2]*2<touchIntent[3] || o.axis==="yx"));
				}
				if(prevent || preventX){ /* prevent native document scrolling */
					e.preventDefault(); 
					touchDrag=1;
				}else{
					docDrag=1;
					$this.addClass("mCS_touch_action");
				}
				amount=o.axis==="yx" ? [(dragY-y),(dragX-x)] : o.axis==="x" ? [null,(dragX-x)] : [(dragY-y),null];
				mCSB_container[0].idleTimer=250;
				if(d.overflowed[0]){_drag(amount[0],durA,easing,"y","all",true);}
				if(d.overflowed[1]){_drag(amount[1],durA,easing,"x",overwrite,true);}
			}
			function _onTouchstart2(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){touchable=0; return;}
				touchable=1;
				e.stopImmediatePropagation();
				_stop($this);
				startTime=_getTime();
				var offset=mCustomScrollBox.offset();
				touchStartY=_coordinates(e)[0]-offset.top;
				touchStartX=_coordinates(e)[1]-offset.left;
				touchMoveY=[]; touchMoveX=[];
			}
			function _onTouchend(e){
				if(!_pointerTouch(e) || touchActive || _coordinates(e)[2]){return;}
				e.stopImmediatePropagation();
				touchDrag=0; docDrag=0;
				endTime=_getTime();
				var offset=mCustomScrollBox.offset(),y=_coordinates(e)[0]-offset.top,x=_coordinates(e)[1]-offset.left;
				if((endTime-runningTime)>30){return;}
				speed=1000/(endTime-startTime);
				var easing="mcsEaseOut",slow=speed<2.5,
					diff=slow ? [touchMoveY[touchMoveY.length-2],touchMoveX[touchMoveX.length-2]] : [0,0];
				distance=slow ? [(y-diff[0]),(x-diff[1])] : [y-touchStartY,x-touchStartX];
				var absDistance=[Math.abs(distance[0]),Math.abs(distance[1])];
				speed=slow ? [Math.abs(distance[0]/4),Math.abs(distance[1]/4)] : [speed,speed];
				var a=[
					Math.abs(mCSB_container[0].offsetTop)-(distance[0]*_m((absDistance[0]/speed[0]),speed[0])),
					Math.abs(mCSB_container[0].offsetLeft)-(distance[1]*_m((absDistance[1]/speed[1]),speed[1]))
				];
				amount=o.axis==="yx" ? [a[0],a[1]] : o.axis==="x" ? [null,a[1]] : [a[0],null];
				durB=[(absDistance[0]*4)+o.scrollInertia,(absDistance[1]*4)+o.scrollInertia];
				var md=parseInt(o.contentTouchScroll) || 0; /* absolute minimum distance required */
				amount[0]=absDistance[0]>md ? amount[0] : 0;
				amount[1]=absDistance[1]>md ? amount[1] : 0;
				if(d.overflowed[0]){_drag(amount[0],durB[0],easing,"y",overwrite,false);}
				if(d.overflowed[1]){_drag(amount[1],durB[1],easing,"x",overwrite,false);}
			}
			function _m(ds,s){
				var r=[s*1.5,s*2,s/1.5,s/2];
				if(ds>90){
					return s>4 ? r[0] : r[3];
				}else if(ds>60){
					return s>3 ? r[3] : r[2];
				}else if(ds>30){
					return s>8 ? r[1] : s>6 ? r[0] : s>4 ? s : r[2];
				}else{
					return s>8 ? s : r[3];
				}
			}
			function _drag(amount,dur,easing,dir,overwrite,drag){
				if(!amount){return;}
				_scrollTo($this,amount.toString(),{dur:dur,scrollEasing:easing,dir:dir,overwrite:overwrite,drag:drag});
			}
		},
		/* -------------------- */
		
		
		/* 
		SELECT TEXT EVENTS 
		scrolls content when text is selected 
		*/
		_selectable=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				action;
			mCSB_container.bind("mousedown."+namespace,function(e){
				if(touchable){return;}
				if(!action){action=1; touchActive=true;}
			}).add(document).bind("mousemove."+namespace,function(e){
				if(!touchable && action && _sel()){
					var offset=mCSB_container.offset(),
						y=_coordinates(e)[0]-offset.top+mCSB_container[0].offsetTop,x=_coordinates(e)[1]-offset.left+mCSB_container[0].offsetLeft;
					if(y>0 && y<wrapper.height() && x>0 && x<wrapper.width()){
						if(seq.step){_seq("off",null,"stepped");}
					}else{
						if(o.axis!=="x" && d.overflowed[0]){
							if(y<0){
								_seq("on",38);
							}else if(y>wrapper.height()){
								_seq("on",40);
							}
						}
						if(o.axis!=="y" && d.overflowed[1]){
							if(x<0){
								_seq("on",37);
							}else if(x>wrapper.width()){
								_seq("on",39);
							}
						}
					}
				}
			}).bind("mouseup."+namespace,function(e){
				if(touchable){return;}
				if(action){action=0; _seq("off",null);}
				touchActive=false;
			});
			function _sel(){
				return 	window.getSelection ? window.getSelection().toString() : 
						document.selection && document.selection.type!="Control" ? document.selection.createRange().text : 0;
			}
			function _seq(a,c,s){
				seq.type=s && action ? "stepped" : "stepless";
				seq.scrollAmount=10;
				_sequentialScroll($this,a,c,"mcsLinearOut",s ? 60 : null);
			}
		},
		/* -------------------- */
		
		
		/* 
		MOUSE WHEEL EVENT
		scrolls content via mouse-wheel 
		via mouse-wheel plugin (https://github.com/brandonaaron/jquery-mousewheel)
		*/
		_mousewheel=function(){
			if(!$(this).data(pluginPfx)){return;} /* Check if the scrollbar is ready to use mousewheel events (issue: #185) */
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_dragger=[$("#mCSB_"+d.idx+"_dragger_vertical"),$("#mCSB_"+d.idx+"_dragger_horizontal")],
				iframe=$("#mCSB_"+d.idx+"_container").find("iframe");
			if(iframe.length){
				iframe.each(function(){
					$(this).load(function(){
						/* bind events on accessible iframes */
						if(_canAccessIFrame(this)){
							$(this.contentDocument || this.contentWindow.document).bind("mousewheel."+namespace,function(e,delta){
								_onMousewheel(e,delta);
							});
						}
					});
				});
			}
			mCustomScrollBox.bind("mousewheel."+namespace,function(e,delta){
				_onMousewheel(e,delta);
			});
			function _onMousewheel(e,delta){
				_stop($this);
				if(_disableMousewheel($this,e.target)){return;} /* disables mouse-wheel when hovering specific elements */
				var deltaFactor=o.mouseWheel.deltaFactor!=="auto" ? parseInt(o.mouseWheel.deltaFactor) : (oldIE && e.deltaFactor<100) ? 100 : e.deltaFactor || 100;
				if(o.axis==="x" || o.mouseWheel.axis==="x"){
					var dir="x",
						px=[Math.round(deltaFactor*d.scrollRatio.x),parseInt(o.mouseWheel.scrollAmount)],
						amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.width() ? mCustomScrollBox.width()*0.9 : px[0],
						contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetLeft),
						draggerPos=mCSB_dragger[1][0].offsetLeft,
						limit=mCSB_dragger[1].parent().width()-mCSB_dragger[1].width(),
						dlt=e.deltaX || e.deltaY || delta;
				}else{
					var dir="y",
						px=[Math.round(deltaFactor*d.scrollRatio.y),parseInt(o.mouseWheel.scrollAmount)],
						amount=o.mouseWheel.scrollAmount!=="auto" ? px[1] : px[0]>=mCustomScrollBox.height() ? mCustomScrollBox.height()*0.9 : px[0],
						contentPos=Math.abs($("#mCSB_"+d.idx+"_container")[0].offsetTop),
						draggerPos=mCSB_dragger[0][0].offsetTop,
						limit=mCSB_dragger[0].parent().height()-mCSB_dragger[0].height(),
						dlt=e.deltaY || delta;
				}
				if((dir==="y" && !d.overflowed[0]) || (dir==="x" && !d.overflowed[1])){return;}
				if(o.mouseWheel.invert || e.webkitDirectionInvertedFromDevice){dlt=-dlt;}
				if(o.mouseWheel.normalizeDelta){dlt=dlt<0 ? -1 : 1;}
				if((dlt>0 && draggerPos!==0) || (dlt<0 && draggerPos!==limit) || o.mouseWheel.preventDefault){
					e.stopImmediatePropagation();
					e.preventDefault();
				}
				_scrollTo($this,(contentPos-(dlt*amount)).toString(),{dir:dir});
			}
		},
		/* -------------------- */
		
		
		/* checks if iframe can be accessed */
		_canAccessIFrame=function(iframe){
			var html=null;
			try{
				var doc=iframe.contentDocument || iframe.contentWindow.document;
				html=doc.body.innerHTML;
			}catch(err){/* do nothing */}
			return(html!==null);
		},
		/* -------------------- */
		
		
		/* disables mouse-wheel when hovering specific elements like select, datalist etc. */
		_disableMousewheel=function(el,target){
			var tag=target.nodeName.toLowerCase(),
				tags=el.data(pluginPfx).opt.mouseWheel.disableOver,
				/* elements that require focus */
				focusTags=["select","textarea"];
			return $.inArray(tag,tags) > -1 && !($.inArray(tag,focusTags) > -1 && !$(target).is(":focus"));
		},
		/* -------------------- */
		
		
		/* 
		DRAGGER RAIL CLICK EVENT
		scrolls content via dragger rail 
		*/
		_draggerRail=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				mCSB_draggerContainer=$(".mCSB_"+d.idx+"_scrollbar ."+classes[12]);
			mCSB_draggerContainer.bind("touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace,function(e){
				touchActive=true;
			}).bind("touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace,function(e){
				touchActive=false;
			}).bind("click."+namespace,function(e){
				if($(e.target).hasClass(classes[12]) || $(e.target).hasClass("mCSB_draggerRail")){
					_stop($this);
					var el=$(this),mCSB_dragger=el.find(".mCSB_dragger");
					if(el.parent(".mCSB_scrollTools_horizontal").length>0){
						if(!d.overflowed[1]){return;}
						var dir="x",
							clickDir=e.pageX>mCSB_dragger.offset().left ? -1 : 1,
							to=Math.abs(mCSB_container[0].offsetLeft)-(clickDir*(wrapper.width()*0.9));
					}else{
						if(!d.overflowed[0]){return;}
						var dir="y",
							clickDir=e.pageY>mCSB_dragger.offset().top ? -1 : 1,
							to=Math.abs(mCSB_container[0].offsetTop)-(clickDir*(wrapper.height()*0.9));
					}
					_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
				}
			});
		},
		/* -------------------- */
		
		
		/* 
		FOCUS EVENT
		scrolls content via element focus (e.g. clicking an input, pressing TAB key etc.)
		*/
		_focus=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				namespace=pluginPfx+"_"+d.idx,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent();
			mCSB_container.bind("focusin."+namespace,function(e){
				var el=$(document.activeElement),
					nested=mCSB_container.find(".mCustomScrollBox").length,
					dur=0;
				if(!el.is(o.advanced.autoScrollOnFocus)){return;}
				_stop($this);
				clearTimeout($this[0]._focusTimeout);
				$this[0]._focusTimer=nested ? (dur+17)*nested : 0;
				$this[0]._focusTimeout=setTimeout(function(){
					var	to=[_childPos(el)[0],_childPos(el)[1]],
						contentPos=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft],
						isVisible=[
							(contentPos[0]+to[0]>=0 && contentPos[0]+to[0]<wrapper.height()-el.outerHeight(false)),
							(contentPos[1]+to[1]>=0 && contentPos[0]+to[1]<wrapper.width()-el.outerWidth(false))
						],
						overwrite=(o.axis==="yx" && !isVisible[0] && !isVisible[1]) ? "none" : "all";
					if(o.axis!=="x" && !isVisible[0]){
						_scrollTo($this,to[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
					}
					if(o.axis!=="y" && !isVisible[1]){
						_scrollTo($this,to[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:overwrite,dur:dur});
					}
				},$this[0]._focusTimer);
			});
		},
		/* -------------------- */
		
		
		/* sets content wrapper scrollTop/scrollLeft always to 0 */
		_wrapperScroll=function(){
			var $this=$(this),d=$this.data(pluginPfx),
				namespace=pluginPfx+"_"+d.idx,
				wrapper=$("#mCSB_"+d.idx+"_container").parent();
			wrapper.bind("scroll."+namespace,function(e){
				if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){
					$(".mCSB_"+d.idx+"_scrollbar").css("visibility","hidden"); /* hide scrollbar(s) */
				}
			});
		},
		/* -------------------- */
		
		
		/* 
		BUTTONS EVENTS
		scrolls content via up, down, left and right buttons 
		*/
		_buttons=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				sel=".mCSB_"+d.idx+"_scrollbar",
				btn=$(sel+">a");
			btn.bind("mousedown."+namespace+" touchstart."+namespace+" pointerdown."+namespace+" MSPointerDown."+namespace+" mouseup."+namespace+" touchend."+namespace+" pointerup."+namespace+" MSPointerUp."+namespace+" mouseout."+namespace+" pointerout."+namespace+" MSPointerOut."+namespace+" click."+namespace,function(e){
				e.preventDefault();
				if(!_mouseBtnLeft(e)){return;} /* left mouse button only */
				var btnClass=$(this).attr("class");
				seq.type=o.scrollButtons.scrollType;
				switch(e.type){
					case "mousedown": case "touchstart": case "pointerdown": case "MSPointerDown":
						if(seq.type==="stepped"){return;}
						touchActive=true;
						d.tweenRunning=false;
						_seq("on",btnClass);
						break;
					case "mouseup": case "touchend": case "pointerup": case "MSPointerUp":
					case "mouseout": case "pointerout": case "MSPointerOut":
						if(seq.type==="stepped"){return;}
						touchActive=false;
						if(seq.dir){_seq("off",btnClass);}
						break;
					case "click":
						if(seq.type!=="stepped" || d.tweenRunning){return;}
						_seq("on",btnClass);
						break;
				}
				function _seq(a,c){
					seq.scrollAmount=o.snapAmount || o.scrollButtons.scrollAmount;
					_sequentialScroll($this,a,c);
				}
			});
		},
		/* -------------------- */
		
		
		/* 
		KEYBOARD EVENTS
		scrolls content via keyboard 
		Keys: up arrow, down arrow, left arrow, right arrow, PgUp, PgDn, Home, End
		*/
		_keyboard=function(){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,seq=d.sequential,
				namespace=pluginPfx+"_"+d.idx,
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				editables="input,textarea,select,datalist,keygen,[contenteditable='true']",
				iframe=mCSB_container.find("iframe"),
				events=["blur."+namespace+" keydown."+namespace+" keyup."+namespace];
			if(iframe.length){
				iframe.each(function(){
					$(this).load(function(){
						/* bind events on accessible iframes */
						if(_canAccessIFrame(this)){
							$(this.contentDocument || this.contentWindow.document).bind(events[0],function(e){
								_onKeyboard(e);
							});
						}
					});
				});
			}
			mCustomScrollBox.attr("tabindex","0").bind(events[0],function(e){
				_onKeyboard(e);
			});
			function _onKeyboard(e){
				switch(e.type){
					case "blur":
						if(d.tweenRunning && seq.dir){_seq("off",null);}
						break;
					case "keydown": case "keyup":
						var code=e.keyCode ? e.keyCode : e.which,action="on";
						if((o.axis!=="x" && (code===38 || code===40)) || (o.axis!=="y" && (code===37 || code===39))){
							/* up (38), down (40), left (37), right (39) arrows */
							if(((code===38 || code===40) && !d.overflowed[0]) || ((code===37 || code===39) && !d.overflowed[1])){return;}
							if(e.type==="keyup"){action="off";}
							if(!$(document.activeElement).is(editables)){
								e.preventDefault();
								e.stopImmediatePropagation();
								_seq(action,code);
							}
						}else if(code===33 || code===34){
							/* PgUp (33), PgDn (34) */
							if(d.overflowed[0] || d.overflowed[1]){
								e.preventDefault();
								e.stopImmediatePropagation();
							}
							if(e.type==="keyup"){
								_stop($this);
								var keyboardDir=code===34 ? -1 : 1;
								if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
									var dir="x",to=Math.abs(mCSB_container[0].offsetLeft)-(keyboardDir*(wrapper.width()*0.9));
								}else{
									var dir="y",to=Math.abs(mCSB_container[0].offsetTop)-(keyboardDir*(wrapper.height()*0.9));
								}
								_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
							}
						}else if(code===35 || code===36){
							/* End (35), Home (36) */
							if(!$(document.activeElement).is(editables)){
								if(d.overflowed[0] || d.overflowed[1]){
									e.preventDefault();
									e.stopImmediatePropagation();
								}
								if(e.type==="keyup"){
									if(o.axis==="x" || (o.axis==="yx" && d.overflowed[1] && !d.overflowed[0])){
										var dir="x",to=code===35 ? Math.abs(wrapper.width()-mCSB_container.outerWidth(false)) : 0;
									}else{
										var dir="y",to=code===35 ? Math.abs(wrapper.height()-mCSB_container.outerHeight(false)) : 0;
									}
									_scrollTo($this,to.toString(),{dir:dir,scrollEasing:"mcsEaseInOut"});
								}
							}
						}
						break;
				}
				function _seq(a,c){
					seq.type=o.keyboard.scrollType;
					seq.scrollAmount=o.snapAmount || o.keyboard.scrollAmount;
					if(seq.type==="stepped" && d.tweenRunning){return;}
					_sequentialScroll($this,a,c);
				}
			}
		},
		/* -------------------- */
		
		
		/* scrolls content sequentially (used when scrolling via buttons, keyboard arrows etc.) */
		_sequentialScroll=function(el,action,trigger,e,s){
			var d=el.data(pluginPfx),o=d.opt,seq=d.sequential,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				once=seq.type==="stepped" ? true : false,
				steplessSpeed=o.scrollInertia < 26 ? 26 : o.scrollInertia, /* 26/1.5=17 */
				steppedSpeed=o.scrollInertia < 1 ? 17 : o.scrollInertia;
			switch(action){
				case "on":
					seq.dir=[
						(trigger===classes[16] || trigger===classes[15] || trigger===39 || trigger===37 ? "x" : "y"),
						(trigger===classes[13] || trigger===classes[15] || trigger===38 || trigger===37 ? -1 : 1)
					];
					_stop(el);
					if(_isNumeric(trigger) && seq.type==="stepped"){return;}
					_on(once);
					break;
				case "off":
					_off();
					if(once || (d.tweenRunning && seq.dir)){
						_on(true);
					}
					break;
			}
			/* starts sequence */
			function _on(once){
				var c=seq.type!=="stepped", /* continuous scrolling */
					t=s ? s : !once ? 1000/60 : c ? steplessSpeed/1.5 : steppedSpeed, /* timer */
					m=!once ? 2.5 : c ? 7.5 : 40, /* multiplier */
					contentPos=[Math.abs(mCSB_container[0].offsetTop),Math.abs(mCSB_container[0].offsetLeft)],
					ratio=[d.scrollRatio.y>10 ? 10 : d.scrollRatio.y,d.scrollRatio.x>10 ? 10 : d.scrollRatio.x],
					amount=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*(ratio[1]*m)) : contentPos[0]+(seq.dir[1]*(ratio[0]*m)),
					px=seq.dir[0]==="x" ? contentPos[1]+(seq.dir[1]*parseInt(seq.scrollAmount)) : contentPos[0]+(seq.dir[1]*parseInt(seq.scrollAmount)),
					to=seq.scrollAmount!=="auto" ? px : amount,
					easing=e ? e : !once ? "mcsLinear" : c ? "mcsLinearOut" : "mcsEaseInOut",
					onComplete=!once ? false : true;
				if(once && t<17){
					to=seq.dir[0]==="x" ? contentPos[1] : contentPos[0];
				}
				_scrollTo(el,to.toString(),{dir:seq.dir[0],scrollEasing:easing,dur:t,onComplete:onComplete});
				if(once){
					seq.dir=false;
					return;
				}
				clearTimeout(seq.step);
				seq.step=setTimeout(function(){
					_on();
				},t);
			}
			/* stops sequence */
			function _off(){
				clearTimeout(seq.step);
				_delete(seq,"step");
				_stop(el);
			}
		},
		/* -------------------- */
		
		
		/* returns a yx array from value */
		_arr=function(val){
			var o=$(this).data(pluginPfx).opt,vals=[];
			if(typeof val==="function"){val=val();} /* check if the value is a single anonymous function */
			/* check if value is object or array, its length and create an array with yx values */
			if(!(val instanceof Array)){ /* object value (e.g. {y:"100",x:"100"}, 100 etc.) */
				vals[0]=val.y ? val.y : val.x || o.axis==="x" ? null : val;
				vals[1]=val.x ? val.x : val.y || o.axis==="y" ? null : val;
			}else{ /* array value (e.g. [100,100]) */
				vals=val.length>1 ? [val[0],val[1]] : o.axis==="x" ? [null,val[0]] : [val[0],null];
			}
			/* check if array values are anonymous functions */
			if(typeof vals[0]==="function"){vals[0]=vals[0]();}
			if(typeof vals[1]==="function"){vals[1]=vals[1]();}
			return vals;
		},
		/* -------------------- */
		
		
		/* translates values (e.g. "top", 100, "100px", "#id") to actual scroll-to positions */
		_to=function(val,dir){
			if(val==null || typeof val=="undefined"){return;}
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				t=typeof val;
			if(!dir){dir=o.axis==="x" ? "x" : "y";}
			var contentLength=dir==="x" ? mCSB_container.outerWidth(false) : mCSB_container.outerHeight(false),
				contentPos=dir==="x" ? mCSB_container[0].offsetLeft : mCSB_container[0].offsetTop,
				cssProp=dir==="x" ? "left" : "top";
			switch(t){
				case "function": /* this currently is not used. Consider removing it */
					return val();
					break;
				case "object": /* js/jquery object */
					var obj=val.jquery ? val : $(val);
					if(!obj.length){return;}
					return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
					break;
				case "string": case "number":
					if(_isNumeric(val)){ /* numeric value */
						return Math.abs(val);
					}else if(val.indexOf("%")!==-1){ /* percentage value */
						return Math.abs(contentLength*parseInt(val)/100);
					}else if(val.indexOf("-=")!==-1){ /* decrease value */
						return Math.abs(contentPos-parseInt(val.split("-=")[1]));
					}else if(val.indexOf("+=")!==-1){ /* inrease value */
						var p=(contentPos+parseInt(val.split("+=")[1]));
						return p>=0 ? 0 : Math.abs(p);
					}else if(val.indexOf("px")!==-1 && _isNumeric(val.split("px")[0])){ /* pixels string value (e.g. "100px") */
						return Math.abs(val.split("px")[0]);
					}else{
						if(val==="top" || val==="left"){ /* special strings */
							return 0;
						}else if(val==="bottom"){
							return Math.abs(wrapper.height()-mCSB_container.outerHeight(false));
						}else if(val==="right"){
							return Math.abs(wrapper.width()-mCSB_container.outerWidth(false));
						}else if(val==="first" || val==="last"){
							var obj=mCSB_container.find(":"+val);
							return dir==="x" ? _childPos(obj)[1] : _childPos(obj)[0];
						}else{
							if($(val).length){ /* jquery selector */
								return dir==="x" ? _childPos($(val))[1] : _childPos($(val))[0];
							}else{ /* other values (e.g. "100em") */
								mCSB_container.css(cssProp,val);
								methods.update.call(null,$this[0]);
								return;
							}
						}
					}
					break;
			}
		},
		/* -------------------- */
		
		
		/* calls the update method automatically */
		_autoUpdate=function(rem){
			var $this=$(this),d=$this.data(pluginPfx),o=d.opt,
				mCSB_container=$("#mCSB_"+d.idx+"_container");
			if(rem){
				/* 
				removes autoUpdate timer 
				usage: _autoUpdate.call(this,"remove");
				*/
				clearTimeout(mCSB_container[0].autoUpdate);
				_delete(mCSB_container[0],"autoUpdate");
				return;
			}
			var	wrapper=mCSB_container.parent(),
				scrollbar=[$("#mCSB_"+d.idx+"_scrollbar_vertical"),$("#mCSB_"+d.idx+"_scrollbar_horizontal")],
				scrollbarSize=function(){return [
					scrollbar[0].is(":visible") ? scrollbar[0].outerHeight(true) : 0, /* returns y-scrollbar height */
					scrollbar[1].is(":visible") ? scrollbar[1].outerWidth(true) : 0 /* returns x-scrollbar width */
				]},
				oldSelSize=sizesSum(),newSelSize,
				os=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]],ns,
				oldImgsLen=imgSum(),newImgsLen;
			upd();
			function upd(){
				clearTimeout(mCSB_container[0].autoUpdate);
				if($this.parents("html").length===0){
					/* check element in dom tree */
					$this=null;
					return;
				}
				mCSB_container[0].autoUpdate=setTimeout(function(){
					/* update on specific selector(s) length and size change */
					if(o.advanced.updateOnSelectorChange){
						newSelSize=sizesSum();
						if(newSelSize!==oldSelSize){
							doUpd(3);
							oldSelSize=newSelSize;
							return;
						}
					}
					/* update on main element and scrollbar size changes */
					if(o.advanced.updateOnContentResize){
						ns=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false),wrapper.height(),wrapper.width(),scrollbarSize()[0],scrollbarSize()[1]];
						if(ns[0]!==os[0] || ns[1]!==os[1] || ns[2]!==os[2] || ns[3]!==os[3] || ns[4]!==os[4] || ns[5]!==os[5]){
							doUpd(ns[0]!==os[0] || ns[1]!==os[1]);
							os=ns;
						}
					}
					/* update on image load */
					if(o.advanced.updateOnImageLoad){
						newImgsLen=imgSum();
						if(newImgsLen!==oldImgsLen){
							mCSB_container.find("img").each(function(){
								imgLoader(this);
							});
							oldImgsLen=newImgsLen;
						}
					}
					if(o.advanced.updateOnSelectorChange || o.advanced.updateOnContentResize || o.advanced.updateOnImageLoad){upd();}
				},o.advanced.autoUpdateTimeout);
			}
			/* returns images amount */
			function imgSum(){
				var total=0
				if(o.advanced.updateOnImageLoad){total=mCSB_container.find("img").length;}
				return total;
			}
			/* a tiny image loader */
			function imgLoader(el){
				if($(el).hasClass(classes[2])){doUpd(); return;}
				var img=new Image();
				function createDelegate(contextObject,delegateMethod){
					return function(){return delegateMethod.apply(contextObject,arguments);}
				}
				function imgOnLoad(){
					this.onload=null;
					$(el).addClass(classes[2]);
					doUpd(2);
				}
				img.onload=createDelegate(img,imgOnLoad);
				img.src=el.src;
			}
			/* returns the total height and width sum of all elements matching the selector */
			function sizesSum(){
				if(o.advanced.updateOnSelectorChange===true){o.advanced.updateOnSelectorChange="*";}
				var total=0,sel=mCSB_container.find(o.advanced.updateOnSelectorChange);
				if(o.advanced.updateOnSelectorChange && sel.length>0){sel.each(function(){total+=$(this).height()+$(this).width();});}
				return total;
			}
			/* calls the update method */
			function doUpd(cb){
				clearTimeout(mCSB_container[0].autoUpdate); 
				methods.update.call(null,$this[0],cb);
			}
		},
		/* -------------------- */
		
		
		/* snaps scrolling to a multiple of a pixels number */
		_snapAmount=function(to,amount,offset){
			return (Math.round(to/amount)*amount-offset); 
		},
		/* -------------------- */
		
		
		/* stops content and scrollbar animations */
		_stop=function(el){
			var d=el.data(pluginPfx),
				sel=$("#mCSB_"+d.idx+"_container,#mCSB_"+d.idx+"_container_wrapper,#mCSB_"+d.idx+"_dragger_vertical,#mCSB_"+d.idx+"_dragger_horizontal");
			sel.each(function(){
				_stopTween.call(this);
			});
		},
		/* -------------------- */
		
		
		/* 
		ANIMATES CONTENT 
		This is where the actual scrolling happens
		*/
		_scrollTo=function(el,to,options){
			var d=el.data(pluginPfx),o=d.opt,
				defaults={
					trigger:"internal",
					dir:"y",
					scrollEasing:"mcsEaseOut",
					drag:false,
					dur:o.scrollInertia,
					overwrite:"all",
					callbacks:true,
					onStart:true,
					onUpdate:true,
					onComplete:true
				},
				options=$.extend(defaults,options),
				dur=[options.dur,(options.drag ? 0 : options.dur)],
				mCustomScrollBox=$("#mCSB_"+d.idx),
				mCSB_container=$("#mCSB_"+d.idx+"_container"),
				wrapper=mCSB_container.parent(),
				totalScrollOffsets=o.callbacks.onTotalScrollOffset ? _arr.call(el,o.callbacks.onTotalScrollOffset) : [0,0],
				totalScrollBackOffsets=o.callbacks.onTotalScrollBackOffset ? _arr.call(el,o.callbacks.onTotalScrollBackOffset) : [0,0];
			d.trigger=options.trigger;
			if(wrapper.scrollTop()!==0 || wrapper.scrollLeft()!==0){ /* always reset scrollTop/Left */
				$(".mCSB_"+d.idx+"_scrollbar").css("visibility","visible");
				wrapper.scrollTop(0).scrollLeft(0);
			}
			if(to==="_resetY" && !d.contentReset.y){
				/* callbacks: onOverflowYNone */
				if(_cb("onOverflowYNone")){o.callbacks.onOverflowYNone.call(el[0]);}
				d.contentReset.y=1;
			}
			if(to==="_resetX" && !d.contentReset.x){
				/* callbacks: onOverflowXNone */
				if(_cb("onOverflowXNone")){o.callbacks.onOverflowXNone.call(el[0]);}
				d.contentReset.x=1;
			}
			if(to==="_resetY" || to==="_resetX"){return;}
			if((d.contentReset.y || !el[0].mcs) && d.overflowed[0]){
				/* callbacks: onOverflowY */
				if(_cb("onOverflowY")){o.callbacks.onOverflowY.call(el[0]);}
				d.contentReset.x=null;
			}
			if((d.contentReset.x || !el[0].mcs) && d.overflowed[1]){
				/* callbacks: onOverflowX */
				if(_cb("onOverflowX")){o.callbacks.onOverflowX.call(el[0]);}
				d.contentReset.x=null;
			}
			if(o.snapAmount){to=_snapAmount(to,o.snapAmount,o.snapOffset);} /* scrolling snapping */
			switch(options.dir){
				case "x":
					var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_horizontal"),
						property="left",
						contentPos=mCSB_container[0].offsetLeft,
						limit=[
							mCustomScrollBox.width()-mCSB_container.outerWidth(false),
							mCSB_dragger.parent().width()-mCSB_dragger.width()
						],
						scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.x)],
						tso=totalScrollOffsets[1],
						tsbo=totalScrollBackOffsets[1],
						totalScrollOffset=tso>0 ? tso/d.scrollRatio.x : 0,
						totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.x : 0;
					break;
				case "y":
					var mCSB_dragger=$("#mCSB_"+d.idx+"_dragger_vertical"),
						property="top",
						contentPos=mCSB_container[0].offsetTop,
						limit=[
							mCustomScrollBox.height()-mCSB_container.outerHeight(false),
							mCSB_dragger.parent().height()-mCSB_dragger.height()
						],
						scrollTo=[to,to===0 ? 0 : (to/d.scrollRatio.y)],
						tso=totalScrollOffsets[0],
						tsbo=totalScrollBackOffsets[0],
						totalScrollOffset=tso>0 ? tso/d.scrollRatio.y : 0,
						totalScrollBackOffset=tsbo>0 ? tsbo/d.scrollRatio.y : 0;
					break;
			}
			if(scrollTo[1]<0 || (scrollTo[0]===0 && scrollTo[1]===0)){
				scrollTo=[0,0];
			}else if(scrollTo[1]>=limit[1]){
				scrollTo=[limit[0],limit[1]];
			}else{
				scrollTo[0]=-scrollTo[0];
			}
			if(!el[0].mcs){
				_mcs();  /* init mcs object (once) to make it available before callbacks */
				if(_cb("onInit")){o.callbacks.onInit.call(el[0]);} /* callbacks: onInit */
			}
			clearTimeout(mCSB_container[0].onCompleteTimeout);
			if(!d.tweenRunning && ((contentPos===0 && scrollTo[0]>=0) || (contentPos===limit[0] && scrollTo[0]<=limit[0]))){return;}
			_tweenTo(mCSB_dragger[0],property,Math.round(scrollTo[1]),dur[1],options.scrollEasing);
			_tweenTo(mCSB_container[0],property,Math.round(scrollTo[0]),dur[0],options.scrollEasing,options.overwrite,{
				onStart:function(){
					if(options.callbacks && options.onStart && !d.tweenRunning){
						/* callbacks: onScrollStart */
						if(_cb("onScrollStart")){_mcs(); o.callbacks.onScrollStart.call(el[0]);}
						d.tweenRunning=true;
						_onDragClasses(mCSB_dragger);
						d.cbOffsets=_cbOffsets();
					}
				},onUpdate:function(){
					if(options.callbacks && options.onUpdate){
						/* callbacks: whileScrolling */
						if(_cb("whileScrolling")){_mcs(); o.callbacks.whileScrolling.call(el[0]);}
					}
				},onComplete:function(){
					if(options.callbacks && options.onComplete){
						if(o.axis==="yx"){clearTimeout(mCSB_container[0].onCompleteTimeout);}
						var t=mCSB_container[0].idleTimer || 0;
						mCSB_container[0].onCompleteTimeout=setTimeout(function(){
							/* callbacks: onScroll, onTotalScroll, onTotalScrollBack */
							if(_cb("onScroll")){_mcs(); o.callbacks.onScroll.call(el[0]);}
							if(_cb("onTotalScroll") && scrollTo[1]>=limit[1]-totalScrollOffset && d.cbOffsets[0]){_mcs(); o.callbacks.onTotalScroll.call(el[0]);}
							if(_cb("onTotalScrollBack") && scrollTo[1]<=totalScrollBackOffset && d.cbOffsets[1]){_mcs(); o.callbacks.onTotalScrollBack.call(el[0]);}
							d.tweenRunning=false;
							mCSB_container[0].idleTimer=0;
							_onDragClasses(mCSB_dragger,"hide");
						},t);
					}
				}
			});
			/* checks if callback function exists */
			function _cb(cb){
				return d && o.callbacks[cb] && typeof o.callbacks[cb]==="function";
			}
			/* checks whether callback offsets always trigger */
			function _cbOffsets(){
				return [o.callbacks.alwaysTriggerOffsets || contentPos>=limit[0]+tso,o.callbacks.alwaysTriggerOffsets || contentPos<=-tsbo];
			}
			/* 
			populates object with useful values for the user 
			values: 
				content: this.mcs.content
				content top position: this.mcs.top 
				content left position: this.mcs.left 
				dragger top position: this.mcs.draggerTop 
				dragger left position: this.mcs.draggerLeft 
				scrolling y percentage: this.mcs.topPct 
				scrolling x percentage: this.mcs.leftPct 
				scrolling direction: this.mcs.direction
			*/
			function _mcs(){
				var cp=[mCSB_container[0].offsetTop,mCSB_container[0].offsetLeft], /* content position */
					dp=[mCSB_dragger[0].offsetTop,mCSB_dragger[0].offsetLeft], /* dragger position */
					cl=[mCSB_container.outerHeight(false),mCSB_container.outerWidth(false)], /* content length */
					pl=[mCustomScrollBox.height(),mCustomScrollBox.width()]; /* content parent length */
				el[0].mcs={
					content:mCSB_container, /* original content wrapper as jquery object */
					top:cp[0],left:cp[1],draggerTop:dp[0],draggerLeft:dp[1],
					topPct:Math.round((100*Math.abs(cp[0]))/(Math.abs(cl[0])-pl[0])),leftPct:Math.round((100*Math.abs(cp[1]))/(Math.abs(cl[1])-pl[1])),
					direction:options.dir
				};
				/* 
				this refers to the original element containing the scrollbar(s)
				usage: this.mcs.top, this.mcs.leftPct etc. 
				*/
			}
		},
		/* -------------------- */
		
		
		/* 
		CUSTOM JAVASCRIPT ANIMATION TWEEN 
		Lighter and faster than jquery animate() and css transitions 
		Animates top/left properties and includes easings 
		*/
		_tweenTo=function(el,prop,to,duration,easing,overwrite,callbacks){
			if(!el._mTween){el._mTween={top:{},left:{}};}
			var callbacks=callbacks || {},
				onStart=callbacks.onStart || function(){},onUpdate=callbacks.onUpdate || function(){},onComplete=callbacks.onComplete || function(){},
				startTime=_getTime(),_delay,progress=0,from=el.offsetTop,elStyle=el.style,_request,tobj=el._mTween[prop];
			if(prop==="left"){from=el.offsetLeft;}
			var diff=to-from;
			tobj.stop=0;
			if(overwrite!=="none"){_cancelTween();}
			_startTween();
			function _step(){
				if(tobj.stop){return;}
				if(!progress){onStart.call();}
				progress=_getTime()-startTime;
				_tween();
				if(progress>=tobj.time){
					tobj.time=(progress>tobj.time) ? progress+_delay-(progress-tobj.time) : progress+_delay-1;
					if(tobj.time<progress+1){tobj.time=progress+1;}
				}
				if(tobj.time<duration){tobj.id=_request(_step);}else{onComplete.call();}
			}
			function _tween(){
				if(duration>0){
					tobj.currVal=_ease(tobj.time,from,diff,duration,easing);
					elStyle[prop]=Math.round(tobj.currVal)+"px";
				}else{
					elStyle[prop]=to+"px";
				}
				onUpdate.call();
			}
			function _startTween(){
				_delay=1000/60;
				tobj.time=progress+_delay;
				_request=(!window.requestAnimationFrame) ? function(f){_tween(); return setTimeout(f,0.01);} : window.requestAnimationFrame;
				tobj.id=_request(_step);
			}
			function _cancelTween(){
				if(tobj.id==null){return;}
				if(!window.requestAnimationFrame){clearTimeout(tobj.id);
				}else{window.cancelAnimationFrame(tobj.id);}
				tobj.id=null;
			}
			function _ease(t,b,c,d,type){
				switch(type){
					case "linear": case "mcsLinear":
						return c*t/d + b;
						break;
					case "mcsLinearOut":
						t/=d; t--; return c * Math.sqrt(1 - t*t) + b;
						break;
					case "easeInOutSmooth":
						t/=d/2;
						if(t<1) return c/2*t*t + b;
						t--;
						return -c/2 * (t*(t-2) - 1) + b;
						break;
					case "easeInOutStrong":
						t/=d/2;
						if(t<1) return c/2 * Math.pow( 2, 10 * (t - 1) ) + b;
						t--;
						return c/2 * ( -Math.pow( 2, -10 * t) + 2 ) + b;
						break;
					case "easeInOut": case "mcsEaseInOut":
						t/=d/2;
						if(t<1) return c/2*t*t*t + b;
						t-=2;
						return c/2*(t*t*t + 2) + b;
						break;
					case "easeOutSmooth":
						t/=d; t--;
						return -c * (t*t*t*t - 1) + b;
						break;
					case "easeOutStrong":
						return c * ( -Math.pow( 2, -10 * t/d ) + 1 ) + b;
						break;
					case "easeOut": case "mcsEaseOut": default:
						var ts=(t/=d)*t,tc=ts*t;
						return b+c*(0.499999999999997*tc*ts + -2.5*ts*ts + 5.5*tc + -6.5*ts + 4*t);
				}
			}
		},
		/* -------------------- */
		
		
		/* returns current time */
		_getTime=function(){
			if(window.performance && window.performance.now){
				return window.performance.now();
			}else{
				if(window.performance && window.performance.webkitNow){
					return window.performance.webkitNow();
				}else{
					if(Date.now){return Date.now();}else{return new Date().getTime();}
				}
			}
		},
		/* -------------------- */
		
		
		/* stops a tween */
		_stopTween=function(){
			var el=this;
			if(!el._mTween){el._mTween={top:{},left:{}};}
			var props=["top","left"];
			for(var i=0; i<props.length; i++){
				var prop=props[i];
				if(el._mTween[prop].id){
					if(!window.requestAnimationFrame){clearTimeout(el._mTween[prop].id);
					}else{window.cancelAnimationFrame(el._mTween[prop].id);}
					el._mTween[prop].id=null;
					el._mTween[prop].stop=1;
				}
			}
		},
		/* -------------------- */
		
		
		/* deletes a property (avoiding the exception thrown by IE) */
		_delete=function(c,m){
			try{delete c[m];}catch(e){c[m]=null;}
		},
		/* -------------------- */
		
		
		/* detects left mouse button */
		_mouseBtnLeft=function(e){
			return !(e.which && e.which!==1);
		},
		/* -------------------- */
		
		
		/* detects if pointer type event is touch */
		_pointerTouch=function(e){
			var t=e.originalEvent.pointerType;
			return !(t && t!=="touch" && t!==2);
		},
		/* -------------------- */
		
		
		/* checks if value is numeric */
		_isNumeric=function(val){
			return !isNaN(parseFloat(val)) && isFinite(val);
		},
		/* -------------------- */
		
		
		/* returns element position according to content */
		_childPos=function(el){
			var p=el.parents(".mCSB_container");
			return [el.offset().top-p.offset().top,el.offset().left-p.offset().left];
		};
		/* -------------------- */
		
	
	
	
	
	/* 
	----------------------------------------
	PLUGIN SETUP 
	----------------------------------------
	*/
	
	/* plugin constructor functions */
	$.fn[pluginNS]=function(method){ /* usage: $(selector).mCustomScrollbar(); */
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	$[pluginNS]=function(method){ /* usage: $.mCustomScrollbar(); */
		if(methods[method]){
			return methods[method].apply(this,Array.prototype.slice.call(arguments,1));
		}else if(typeof method==="object" || !method){
			return methods.init.apply(this,arguments);
		}else{
			$.error("Method "+method+" does not exist");
		}
	};
	
	/* 
	allow setting plugin default options. 
	usage: $.mCustomScrollbar.defaults.scrollInertia=500; 
	to apply any changed default options on default selectors (below), use inside document ready fn 
	e.g.: $(document).ready(function(){ $.mCustomScrollbar.defaults.scrollInertia=500; });
	*/
	$[pluginNS].defaults=defaults;
	
	/* 
	add window object (window.mCustomScrollbar) 
	usage: if(window.mCustomScrollbar){console.log("custom scrollbar plugin loaded");}
	*/
	window[pluginNS]=true;
	
	$(window).load(function(){
		
		$(defaultSelector)[pluginNS](); /* add scrollbars automatically on default selector */
		
		/* extend jQuery expressions */
		$.extend($.expr[":"],{
			/* checks if element is within scrollable viewport */
			mcsInView:$.expr[":"].mcsInView || function(el){
				var $el=$(el),content=$el.parents(".mCSB_container"),wrapper,cPos;
				if(!content.length){return;}
				wrapper=content.parent();
				cPos=[content[0].offsetTop,content[0].offsetLeft];
				return 	cPos[0]+_childPos($el)[0]>=0 && cPos[0]+_childPos($el)[0]<wrapper.height()-$el.outerHeight(false) && 
						cPos[1]+_childPos($el)[1]>=0 && cPos[1]+_childPos($el)[1]<wrapper.width()-$el.outerWidth(false);
			},
			/* checks if element is overflowed having visible scrollbar(s) */
			mcsOverflow:$.expr[":"].mcsOverflow || function(el){
				var d=$(el).data(pluginPfx);
				if(!d){return;}
				return d.overflowed[0] || d.overflowed[1];
			}
		});
	
	});

}))}));
 /*
 *	jQuery elevateZoom 3.0.8
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 *

/*
 *	jQuery elevateZoom 3.0.3
 *	Demo's and documentation:
 *	www.elevateweb.co.uk/image-zoom
 *
 *	Copyright (c) 2012 Andrew Eades
 *	www.elevateweb.co.uk
 *
 *	Dual licensed under the GPL and MIT licenses.
 *	http://en.wikipedia.org/wiki/MIT_License
 *	http://en.wikipedia.org/wiki/GNU_General_Public_License
 */


if ( typeof Object.create !== 'function' ) {
	Object.create = function( obj ) {
		function F() {};
		F.prototype = obj;
		return new F();
	};
}

(function( $, window, document, undefined ) {
	var ElevateZoom = {
			init: function( options, elem ) {
				var self = this;

				self.elem = elem;
				self.$elem = $( elem );

				self.imageSrc = self.$elem.data("zoom-image") ? self.$elem.data("zoom-image") : self.$elem.attr("src");

				self.options = $.extend( {}, $.fn.elevateZoom.options, options );

				//TINT OVERRIDE SETTINGS
				if(self.options.tint) {
					self.options.lensColour = "none", //colour of the lens background
					self.options.lensOpacity =  "1" //opacity of the lens
				}
				//INNER OVERRIDE SETTINGS
				if(self.options.zoomType == "inner") {self.options.showLens = false;}


				//Remove alt on hover

				self.$elem.parent().removeAttr('title').removeAttr('alt');

				self.zoomImage = self.imageSrc;

				self.refresh( 1 );



				//Create the image swap from the gallery 
				$('#'+self.options.gallery + ' a').click( function(e) { 

					//Set a class on the currently active gallery image
					if(self.options.galleryActiveClass){
						$('#'+self.options.gallery + ' a').removeClass(self.options.galleryActiveClass);
						$(this).addClass(self.options.galleryActiveClass);
					}
					//stop any link on the a tag from working
					e.preventDefault();

					//call the swap image function            
					if($(this).data("zoom-image")){self.zoomImagePre = $(this).data("zoom-image")}
					else{self.zoomImagePre = $(this).data("image");}
					self.swaptheimage($(this).data("image"), self.zoomImagePre);
					return false;
				});

			},

			refresh: function( length ) {
				var self = this;

				setTimeout(function() {
					self.fetch(self.imageSrc);

				}, length || self.options.refresh );
			},

			fetch: function(imgsrc) {
				//get the image
				var self = this;
				var newImg = new Image();
				newImg.onload = function() {
					//set the large image dimensions - used to calculte ratio's
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					//once image is loaded start the calls
					self.startZoom();
					self.currentImage = self.imageSrc;
					//let caller know image has been loaded
					self.options.onZoomedImageLoaded(self.$elem);
				}
				newImg.src = imgsrc; // this must be done AFTER setting onload

				return;

			},

			startZoom: function( ) {
				var self = this;
				//get dimensions of the non zoomed image
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				//activated elements
				self.isWindowActive = false;
				self.isLensActive = false;
				self.isTintActive = false;
				self.overWindow = false;    

				//CrossFade Wrappe
				if(self.options.imageCrossfade){
					self.zoomWrap = self.$elem.wrap('<div style="height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;" class="zoomWrapper" />');        
					self.$elem.css('position', 'absolute'); 
				}

				self.zoomLock = 1;
				self.scrollingLock = false;
				self.changeBgSize = false;
				self.currentZoomLevel = self.options.zoomLevel;


				//get offset of the non zoomed image
				self.nzOffset = self.$elem.offset();
				//calculate the width ratio of the large/small image
				self.widthRatio = (self.largeWidth/self.currentZoomLevel) / self.nzWidth;
				self.heightRatio = (self.largeHeight/self.currentZoomLevel) / self.nzHeight; 


				//if window zoom        
				if(self.options.zoomType == "window") {
					self.zoomWindowStyle = "overflow: hidden;"
						+ "background-position: 0px 0px;text-align:center;"  
						+ "background-color: " + String(self.options.zoomWindowBgColour)            
						+ ";width: " + String(self.options.zoomWindowWidth) + "px;"
						+ "height: " + String(self.options.zoomWindowHeight)
						+ "px;float: left;"
						+ "background-size: "+ self.largeWidth/self.currentZoomLevel+ "px " +self.largeHeight/self.currentZoomLevel + "px;"
						+ "display: none;z-index:100;"
						+ "border: " + String(self.options.borderSize) 
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    


				//if inner  zoom    
				if(self.options.zoomType == "inner") {
					//has a border been put on the image? Lets cater for this

					var borderWidth = self.$elem.css("border-left-width");

					self.zoomWindowStyle = "overflow: hidden;"
						+ "margin-left: " + String(borderWidth) + ";" 
						+ "margin-top: " + String(borderWidth) + ";"         
						+ "background-position: 0px 0px;"
						+ "width: " + String(self.nzWidth) + "px;"
						+ "height: " + String(self.nzHeight) + "px;"
						+ "px;float: left;"
						+ "display: none;"
						+ "cursor:"+(self.options.cursor)+";"
						+ "px solid " + self.options.borderColour 
						+ ";background-repeat: no-repeat;"
						+ "position: absolute;";
				}    



				//lens style for window zoom
				if(self.options.zoomType == "window") {


					// adjust images less than the window height

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;              
					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}
					if(self.largeWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					self.lensStyle = "background-position: 0px 0px;width: " + String((self.options.zoomWindowWidth)/self.widthRatio) + "px;height: " + String((self.options.zoomWindowHeight)/self.heightRatio)
					+ "px;float: right;display: none;"
					+ "overflow: hidden;"
					+ "z-index: 999;"   
					+ "-webkit-transform: translateZ(0);"               
					+ "opacity:"+(self.options.lensOpacity)+";filter: alpha(opacity = "+(self.options.lensOpacity*100)+"); zoom:1;"
					+ "width:"+lensWidth+"px;"
					+ "height:"+lensHeight+"px;"
					+ "background-color:"+(self.options.lensColour)+";"					
					+ "cursor:"+(self.options.cursor)+";"
					+ "border: "+(self.options.lensBorderSize)+"px" +
					" solid "+(self.options.lensBorderColour)+";background-repeat: no-repeat;position: absolute;";
				} 


				//tint style
				self.tintStyle = "display: block;"
					+ "position: absolute;"
					+ "background-color: "+self.options.tintColour+";"	
					+ "filter:alpha(opacity=0);"		
					+ "opacity: 0;"	
					+ "width: " + self.nzWidth + "px;"
					+ "height: " + self.nzHeight + "px;"

					;

				//lens style for lens zoom with optional round for modern browsers
				self.lensRound = '';

				if(self.options.zoomType == "lens") {

					self.lensStyle = "background-position: 0px 0px;"
						+ "float: left;display: none;"
						+ "border: " + String(self.options.borderSize) + "px solid " + self.options.borderColour+";"
						+ "width:"+ String(self.options.lensSize) +"px;"
						+ "height:"+ String(self.options.lensSize)+"px;"
						+ "background-repeat: no-repeat;position: absolute;";


				}


				//does not round in all browsers
				if(self.options.lensShape == "round") {
					self.lensRound = "border-top-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-top-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-left-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;"
					+ "border-bottom-right-radius: " + String(self.options.lensSize / 2 + self.options.borderSize) + "px;";

				}

				//create the div's                                                + ""
				//self.zoomContainer = $('<div/>').addClass('zoomContainer').css({"position":"relative", "height":self.nzHeight, "width":self.nzWidth});

				self.zoomContainer = $('<div class="zoomContainer" style="-webkit-transform: translateZ(0);position:absolute;left:'+self.nzOffset.left+'px;top:'+self.nzOffset.top+'px;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;"></div>');
				$('body').append(self.zoomContainer);	


				//this will add overflow hidden and contrain the lens on lens mode       
				if(self.options.containLensZoom && self.options.zoomType == "lens"){
					self.zoomContainer.css("overflow", "hidden");
				}
				if(self.options.zoomType != "inner") {
					self.zoomLens = $("<div class='zoomLens' style='" + self.lensStyle + self.lensRound +"'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});


					if(self.options.tint) {
						self.tintContainer = $('<div/>').addClass('tintContainer');	
						self.zoomTint = $("<div class='zoomTint' style='"+self.tintStyle+"'></div>");


						self.zoomLens.wrap(self.tintContainer);


						self.zoomTintcss = self.zoomLens.after(self.zoomTint);	

						//if tint enabled - set an image to show over the tint

						self.zoomTintImage = $('<img style="position: absolute; left: 0px; top: 0px; max-width: none; width: '+self.nzWidth+'px; height: '+self.nzHeight+'px;" src="'+self.imageSrc+'">')
						.appendTo(self.zoomLens)
						.click(function () {

							self.$elem.trigger('click');
						});

					}          

				}







				//create zoom window 
				if(isNaN(self.options.zoomWindowPosition)){
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo('body')
					.click(function () {
						self.$elem.trigger('click');
					});
				}else{
					self.zoomWindow = $("<div style='z-index:999;left:"+(self.windowOffsetLeft)+"px;top:"+(self.windowOffsetTop)+"px;" + self.zoomWindowStyle + "' class='zoomWindow'>&nbsp;</div>")
					.appendTo(self.zoomContainer)
					.click(function () {
						self.$elem.trigger('click');
					});
				}              
				self.zoomWindowContainer = $('<div/>').addClass('zoomWindowContainer').css("width",self.options.zoomWindowWidth);
				self.zoomWindow.wrap(self.zoomWindowContainer);


				//  self.captionStyle = "text-align: left;background-color: black;color: white;font-weight: bold;padding: 10px;font-family: sans-serif;font-size: 11px";                                                                                                                                                                                                                                          
				// self.zoomCaption = $('<div class="elevatezoom-caption" style="'+self.captionStyle+'display: block; width: 280px;">INSERT ALT TAG</div>').appendTo(self.zoomWindow.parent());

				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + self.imageSrc + "')" }); 
				}
				/*-------------------END THE ZOOM WINDOW AND LENS----------------------------------*/
				//touch events
				self.$elem.bind('touchmove', function(e){    
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch);

				});  
				self.zoomContainer.bind('touchmove', function(e){ 
					if(self.options.zoomType == "inner") {
						self.showHideWindow("show");

					}
					e.preventDefault();
					var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
					self.setPosition(touch); 

				});  	
				self.zoomContainer.bind('touchend', function(e){ 
					self.showHideWindow("hide");
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
				});  	

				self.$elem.bind('touchend', function(e){ 
					self.showHideWindow("hide");
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
				});  	
				if(self.options.showLens) {
					self.zoomLens.bind('touchmove', function(e){ 

						e.preventDefault();
						var touch = e.originalEvent.touches[0] || e.originalEvent.changedTouches[0];  
						self.setPosition(touch); 
					});    


					self.zoomLens.bind('touchend', function(e){ 
						self.showHideWindow("hide");
						if(self.options.showLens) {self.showHideLens("hide");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("hide");}
					});  
				}
				//Needed to work in IE
				self.$elem.bind('mousemove', function(e){   
					if(self.overWindow == false){self.setElements("show");}
					//make sure on orientation change the setposition is not fired
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    

				});  	

				self.zoomContainer.bind('mousemove', function(e){ 

					if(self.overWindow == false){self.setElements("show");} 

					//make sure on orientation change the setposition is not fired 
					if(self.lastX !== e.clientX || self.lastY !== e.clientY){
						self.setPosition(e);
						self.currentLoc = e;
					}   
					self.lastX = e.clientX;
					self.lastY = e.clientY;    
				});  	
				if(self.options.zoomType != "inner") {
					self.zoomLens.bind('mousemove', function(e){      
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});
				}
				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.bind('mousemove', function(e){ 
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.bind('mousemove', function(e) {
						//self.overWindow = true;
						//make sure on orientation change the setposition is not fired
						if(self.lastX !== e.clientX || self.lastY !== e.clientY){
							self.setPosition(e);
							self.currentLoc = e;
						}   
						self.lastX = e.clientX;
						self.lastY = e.clientY;    
					});

				}


				//  lensFadeOut: 500,  zoomTintFadeIn
				self.zoomContainer.add(self.$elem).mouseenter(function(){

					if(self.overWindow == false){self.setElements("show");} 


				}).mouseleave(function(){
					if(!self.scrollLock){
						self.setElements("hide");
            self.options.onDestroy(self.$elem);
					}
				});
				//end ove image





				if(self.options.zoomType != "inner") {
					self.zoomWindow.mouseenter(function(){
						self.overWindow = true;   
						self.setElements("hide");                  
					}).mouseleave(function(){

						self.overWindow = false;
					});
				}
				//end ove image



//				var delta = parseInt(e.originalEvent.wheelDelta || -e.originalEvent.detail);

				//      $(this).empty();    
				//    return false;

				//fix for initial zoom setting
				if (self.options.zoomLevel != 1){
					//	self.changeZoomLevel(self.currentZoomLevel);
				}
				//set the min zoomlevel
				if(self.options.minZoomLevel){
					self.minZoomLevel = self.options.minZoomLevel;
				}
				else{
					self.minZoomLevel = self.options.scrollZoomIncrement * 2;
				}


				if(self.options.scrollZoom){


					self.zoomContainer.add(self.$elem).bind('mousewheel DOMMouseScroll MozMousePixelScroll', function(e){


//						in IE there is issue with firing of mouseleave - So check whether still scrolling
//						and on mouseleave check if scrolllock          
						self.scrollLock = true;
						clearTimeout($.data(this, 'timer'));
						$.data(this, 'timer', setTimeout(function() {
							self.scrollLock = false;
							//do something
						}, 250));

						var theEvent = e.originalEvent.wheelDelta || e.originalEvent.detail*-1


						//this.scrollTop += ( delta < 0 ? 1 : -1 ) * 30;
						//   e.preventDefault();


						e.stopImmediatePropagation();
						e.stopPropagation();
						e.preventDefault();


						if(theEvent /120 > 0) {
							//scrolling up
							if(self.currentZoomLevel >= self.minZoomLevel){ 
								self.changeZoomLevel(self.currentZoomLevel-self.options.scrollZoomIncrement);        
							}

						}
						else{
							//scrolling down


							if(self.options.maxZoomLevel){
								if(self.currentZoomLevel <= self.options.maxZoomLevel){           
									self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
								}
							}
							else{
								//andy 

								self.changeZoomLevel(parseFloat(self.currentZoomLevel)+self.options.scrollZoomIncrement);
							}

						}
						return false;
					});
				}


			},
			setElements: function(type) {
				var self = this;
        if(!self.options.zoomEnabled){return false;}
				if(type=="show"){
					if(self.isWindowSet){
						if(self.options.zoomType == "inner") {self.showHideWindow("show");}
						if(self.options.zoomType == "window") {self.showHideWindow("show");}
						if(self.options.showLens) {self.showHideLens("show");}
						if(self.options.tint && self.options.zoomType != "inner") {self.showHideTint("show");
						}
					}
				}

				if(type=="hide"){
					if(self.options.zoomType == "window") {self.showHideWindow("hide");}
					if(!self.options.tint) {self.showHideWindow("hide");}
					if(self.options.showLens) {self.showHideLens("hide");}
					if(self.options.tint) {	self.showHideTint("hide");}
				}   
			},
			setPosition: function(e) {
      
				var self = this;
        
        if(!self.options.zoomEnabled){return false;}

				//recaclc offset each time in case the image moves
				//this can be caused by other on page elements
				self.nzHeight = self.$elem.height();
				self.nzWidth = self.$elem.width();
				self.nzOffset = self.$elem.offset();

				if(self.options.tint && self.options.zoomType != "inner") {
					self.zoomTint.css({ top: 0});
					self.zoomTint.css({ left: 0});
				}
				//set responsive       
				//will checking if the image needs changing before running this code work faster?
				if(self.options.responsive && !self.options.scrollZoom){
					if(self.options.showLens){ 
						if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
							lensHeight = self.nzHeight;              
						}
						else{
							lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
						}
						if(self.largeWidth < self.options.zoomWindowWidth){
							lensWidth = self.nzWidth;
						}       
						else{
							lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
						}
						self.widthRatio = self.largeWidth / self.nzWidth;
						self.heightRatio = self.largeHeight / self.nzHeight;        
						if(self.options.zoomType != "lens") {


							//possibly dont need to keep recalcalculating
							//if the lens is heigher than the image, then set lens size to image size
							if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
								lensHeight = self.nzHeight;  

							}
							else{
								lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
							}

							if(self.nzWidth < self.options.zoomWindowHeight/self.heightRatio){
								lensWidth = self.nzWidth;
							}       
							else{
								lensWidth =  String((self.options.zoomWindowWidth/self.widthRatio));
							}            

							self.zoomLens.css('width', lensWidth);    
							self.zoomLens.css('height', lensHeight); 

							if(self.options.tint){    
								self.zoomTintImage.css('width', self.nzWidth);    
								self.zoomTintImage.css('height', self.nzHeight); 
							}

						}                     
						if(self.options.zoomType == "lens") {  

							self.zoomLens.css({ width: String(self.options.lensSize) + 'px', height: String(self.options.lensSize) + 'px' })      


						}        
						//end responsive image change
					}
				}

				//container fix
				self.zoomContainer.css({ top: self.nzOffset.top});
				self.zoomContainer.css({ left: self.nzOffset.left});
				self.mouseLeft = parseInt(e.pageX - self.nzOffset.left);
				self.mouseTop = parseInt(e.pageY - self.nzOffset.top);
				//calculate the Location of the Lens

				//calculate the bound regions - but only if zoom window
				if(self.options.zoomType == "window") {
					self.Etoppos = (self.mouseTop < (self.zoomLens.height()/2));
					self.Eboppos = (self.mouseTop > self.nzHeight - (self.zoomLens.height()/2)-(self.options.lensBorderSize*2));
					self.Eloppos = (self.mouseLeft < 0+((self.zoomLens.width()/2))); 
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.zoomLens.width()/2)-(self.options.lensBorderSize*2)));  
				}
				//calculate the bound regions - but only for inner zoom
				if(self.options.zoomType == "inner"){ 
					self.Etoppos = (self.mouseTop < ((self.nzHeight/2)/self.heightRatio) );
					self.Eboppos = (self.mouseTop > (self.nzHeight - ((self.nzHeight/2)/self.heightRatio)));
					self.Eloppos = (self.mouseLeft < 0+(((self.nzWidth/2)/self.widthRatio)));
					self.Eroppos = (self.mouseLeft > (self.nzWidth - (self.nzWidth/2)/self.widthRatio-(self.options.lensBorderSize*2)));  
				}

				// if the mouse position of the slider is one of the outerbounds, then hide  window and lens
				if (self.mouseLeft < 0 || self.mouseTop < 0 || self.mouseLeft > self.nzWidth || self.mouseTop > self.nzHeight ) {				          
					self.setElements("hide");
					return;
				}
				//else continue with operations
				else {


					//lens options
					if(self.options.showLens) {
						//		self.showHideLens("show");
						//set background position of lens
						self.lensLeftPos = String(Math.floor(self.mouseLeft - self.zoomLens.width() / 2));
						self.lensTopPos = String(Math.floor(self.mouseTop - self.zoomLens.height() / 2));


					}
					//adjust the background position if the mouse is in one of the outer regions 

					//Top region
					if(self.Etoppos){
						self.lensTopPos = 0;
					}
					//Left Region
					if(self.Eloppos){
						self.windowLeftPos = 0;
						self.lensLeftPos = 0;
						self.tintpos=0;
					}     
					//Set bottom and right region for window mode
					if(self.options.zoomType == "window") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( (self.nzHeight)-self.zoomLens.height()-(self.options.lensBorderSize*2), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.zoomLens.width())-(self.options.lensBorderSize*2));
						}  
					}  
					//Set bottom and right region for inner mode
					if(self.options.zoomType == "inner") {
						if(self.Eboppos){
							self.lensTopPos = Math.max( ((self.nzHeight)-(self.options.lensBorderSize*2)), 0 );
						} 
						if(self.Eroppos){
							self.lensLeftPos = (self.nzWidth-(self.nzWidth)-(self.options.lensBorderSize*2));
						}  

					}
					//if lens zoom
					if(self.options.zoomType == "lens") {  
						self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomLens.width() / 2) * (-1));   
						self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomLens.height() / 2) * (-1));

						self.zoomLens.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });

						if(self.changeBgSize){  

							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								}   

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){       
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								}   
								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
							}
							self.changeBgSize = false;
						}    

						self.setWindowPostition(e);  
					}
					//if tint zoom   
					if(self.options.tint && self.options.zoomType != "inner") {
						self.setTintPosition(e);

					}
					//set the css background position 
					if(self.options.zoomType == "window") {
						self.setWindowPostition(e);   
					}
					if(self.options.zoomType == "inner") {
						self.setWindowPostition(e);   
					}
					if(self.options.showLens) {

						if(self.fullwidth && self.options.zoomType != "lens"){
							self.lensLeftPos = 0;

						}
						self.zoomLens.css({ left: self.lensLeftPos + 'px', top: self.lensTopPos + 'px' })  
					}

				} //end else



			},
			showHideWindow: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isWindowActive){
						if(self.options.zoomWindowFadeIn){
							self.zoomWindow.stop(true, true, false).fadeIn(self.options.zoomWindowFadeIn);
						}
						else{self.zoomWindow.show();}
						self.isWindowActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isWindowActive){
						if(self.options.zoomWindowFadeOut){
							self.zoomWindow.stop(true, true).fadeOut(self.options.zoomWindowFadeOut, function () {
								if (self.loop) {
									//stop moving the zoom window when zoom window is faded out
									clearInterval(self.loop);
									self.loop = false;
								}
							});
						}
						else{self.zoomWindow.hide();}
						self.isWindowActive = false;        
					}      
				}
			},
			showHideLens: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isLensActive){
						if(self.options.lensFadeIn){
							self.zoomLens.stop(true, true, false).fadeIn(self.options.lensFadeIn);
						}
						else{self.zoomLens.show();}
						self.isLensActive = true;
					}            
				}
				if(change == "hide"){
					if(self.isLensActive){
						if(self.options.lensFadeOut){
							self.zoomLens.stop(true, true).fadeOut(self.options.lensFadeOut);
						}
						else{self.zoomLens.hide();}
						self.isLensActive = false;        
					}      
				}
			},
			showHideTint: function(change) {
				var self = this;              
				if(change == "show"){      
					if(!self.isTintActive){

						if(self.options.zoomTintFadeIn){
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate().stop(true, true).fadeIn("slow");
						}
						else{
							self.zoomTint.css({opacity:self.options.tintOpacity}).animate();
							self.zoomTint.show();


						}
						self.isTintActive = true;
					}            
				}
				if(change == "hide"){      
					if(self.isTintActive){ 

						if(self.options.zoomTintFadeOut){
							self.zoomTint.stop(true, true).fadeOut(self.options.zoomTintFadeOut);
						}
						else{self.zoomTint.hide();}
						self.isTintActive = false;        
					}      
				}
			},
			setLensPostition: function( e ) {


			},
			setWindowPostition: function( e ) {
				//return obj.slice( 0, count );
				var self = this;

				if(!isNaN(self.options.zoomWindowPosition)){

					switch (self.options.zoomWindowPosition) { 
					case 1: //done         
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
						self.windowOffsetLeft =(+self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 2:
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						}
						else{ //negative margin

						}
						break;
					case 3: //done        
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;      
					case 4: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;
					case 5: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 6: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}


						break;
					case 7: //done  
						self.windowOffsetTop = (self.nzHeight);  //DONE - 4,5,6,7,8
						self.windowOffsetLeft = 0; //DONE 7, 13
						break;
					case 8: //done  
						self.windowOffsetTop = (self.nzHeight); //DONE - 4,5,6,7,8
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 9:  //done  
						self.windowOffsetTop = (self.nzHeight - self.zoomWindow.height() - (self.options.borderSize*2)); //DONE 3,9
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 10: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin

							self.windowOffsetTop = ((self.options.zoomWindowHeight/2)-(self.nzHeight/2))*(-1);
							self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						}
						else{ //negative margin

						}
						break;
					case 11: 
						self.windowOffsetTop = (self.options.zoomWindowOffety);
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 12: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.zoomWindow.width()+(self.options.borderSize*2) )* (-1);  //DONE 8,9,10,11,12
						break;
					case 13: //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(0); //DONE 7, 13
						break;
					case 14: 
						if(self.options.zoomWindowHeight > self.nzHeight){ //positive margin
							self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16

							self.windowOffsetLeft =((self.options.zoomWindowWidth/2)-(self.nzWidth/2)+(self.options.borderSize*2))*(-1);  
						}
						else{ //negative margin

						}

						break;
					case 15://done   
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth-self.zoomWindow.width()-(self.options.borderSize*2)); //DONE - 5,15
						break;
					case 16:  //done  
						self.windowOffsetTop = (self.zoomWindow.height()+(self.options.borderSize*2))*(-1); //DONE 12,13,14,15,16
						self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
						break;            
					default: //done  
						self.windowOffsetTop = (self.options.zoomWindowOffety);//DONE - 1
					self.windowOffsetLeft =(self.nzWidth); //DONE 1, 2, 3, 4, 16
					} 
				} //end isNAN
				else{
					//WE CAN POSITION IN A CLASS - ASSUME THAT ANY STRING PASSED IS
					self.externalContainer = $('#'+self.options.zoomWindowPosition);
					self.externalContainerWidth = self.externalContainer.width();
					self.externalContainerHeight = self.externalContainer.height();
					self.externalContainerOffset = self.externalContainer.offset();

					self.windowOffsetTop = self.externalContainerOffset.top;//DONE - 1
					self.windowOffsetLeft =self.externalContainerOffset.left; //DONE 1, 2, 3, 4, 16

				}
				self.isWindowSet = true;
				self.windowOffsetTop = self.windowOffsetTop + self.options.zoomWindowOffety;
				self.windowOffsetLeft = self.windowOffsetLeft + self.options.zoomWindowOffetx;

				self.zoomWindow.css({ top: self.windowOffsetTop});
				self.zoomWindow.css({ left: self.windowOffsetLeft});

				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ top: 0});
					self.zoomWindow.css({ left: 0});

				}   


				self.windowLeftPos = String(((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1));   
				self.windowTopPos = String(((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));
				if(self.Etoppos){self.windowTopPos = 0;}
				if(self.Eloppos){self.windowLeftPos = 0;}     
				if(self.Eboppos){self.windowTopPos = (self.largeHeight/self.currentZoomLevel-self.zoomWindow.height())*(-1);  } 
				if(self.Eroppos){self.windowLeftPos = ((self.largeWidth/self.currentZoomLevel-self.zoomWindow.width())*(-1));}    

				//stops micro movements
				if(self.fullheight){
					self.windowTopPos = 0;

				}
				if(self.fullwidth){
					self.windowLeftPos = 0;

				}
				//set the css background position 


				if(self.options.zoomType == "window" || self.options.zoomType == "inner") {

					if(self.zoomLock == 1){
						//overrides for images not zoomable
						if(self.widthRatio <= 1){

							self.windowLeftPos = 0;
						}
						if(self.heightRatio <= 1){ 
							self.windowTopPos = 0;
						}
					}
					// adjust images less than the window height

					if (self.options.zoomType == "window") {
						if (self.largeHeight < self.options.zoomWindowHeight) {

							self.windowTopPos = 0;
						}
						if (self.largeWidth < self.options.zoomWindowWidth) {
							self.windowLeftPos = 0;
						}
					}

					//set the zoomwindow background position
					if (self.options.easing){

						//     if(self.changeZoom){
						//           clearInterval(self.loop);
						//           self.changeZoom = false;
						//           self.loop = false;

						//            }
						//set the pos to 0 if not set
						if(!self.xp){self.xp = 0;}
						if(!self.yp){self.yp = 0;}  
						//if loop not already started, then run it 
						if (!self.loop){           
							self.loop = setInterval(function(){                
								//using zeno's paradox    

								self.xp += (self.windowLeftPos  - self.xp) / self.options.easingAmount; 
								self.yp += (self.windowTopPos  - self.yp) / self.options.easingAmount;
								if(self.scrollingLock){


									clearInterval(self.loop);
									self.xp = self.windowLeftPos;
									self.yp = self.windowTopPos            

									self.xp = ((e.pageX - self.nzOffset.left) * self.widthRatio - self.zoomWindow.width() / 2) * (-1);
									self.yp = (((e.pageY - self.nzOffset.top) * self.heightRatio - self.zoomWindow.height() / 2) * (-1));                         

									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){  
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}   
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{   
											if(self.options.zoomType != "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}            
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            

										}

										/*
             if(!self.bgxp){self.bgxp = self.largeWidth/self.newvalue;}
						if(!self.bgyp){self.bgyp = self.largeHeight/self.newvalue ;}  
                 if (!self.bgloop){   
                 	self.bgloop = setInterval(function(){   

                 self.bgxp += (self.largeWidth/self.newvalue  - self.bgxp) / self.options.easingAmount; 
								self.bgyp += (self.largeHeight/self.newvalue  - self.bgyp) / self.options.easingAmount;

           self.zoomWindow.css({ "background-size": self.bgxp + 'px ' + self.bgyp + 'px' });


                  }, 16);

                 }
										 */
										self.changeBgSize = false;
									}

									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.scrollingLock = false;
									self.loop = false;

								}
								else if (Math.round(Math.abs(self.xp - self.windowLeftPos) + Math.abs(self.yp - self.windowTopPos)) < 1) {
									//stops micro movements
									clearInterval(self.loop);
									self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });
									self.loop = false;
								}
								else{
									if(self.changeBgSize){    
										if(self.nzHeight>self.nzWidth){ 
											if(self.options.zoomType == "lens"){      
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
											}         
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
										}
										else{                 
											if(self.options.zoomType != "lens"){     
												self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
											}      
											self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
										}
										self.changeBgSize = false;
									}                   

									self.zoomWindow.css({ backgroundPosition: self.xp + 'px ' + self.yp + 'px' });
								}       
							}, 16);
						}
					}   
					else{    
						if(self.changeBgSize){  
							if(self.nzHeight>self.nzWidth){  
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
								} 

								self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });
							}
							else{     
								if(self.options.zoomType == "lens"){      
									self.zoomLens.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });
								} 
								if((self.largeHeight/self.newvaluewidth) < self.options.zoomWindowHeight){ 

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvaluewidth + 'px ' + self.largeHeight/self.newvaluewidth + 'px' });            
								}
								else{

									self.zoomWindow.css({ "background-size": self.largeWidth/self.newvalueheight + 'px ' + self.largeHeight/self.newvalueheight + 'px' });   
								}

							}
							self.changeBgSize = false;
						}     

						self.zoomWindow.css({ backgroundPosition: self.windowLeftPos + 'px ' + self.windowTopPos + 'px' });       
					}
				} 
			},
			setTintPosition: function(e){
				var self = this;
				self.nzOffset = self.$elem.offset();
				self.tintpos = String(((e.pageX - self.nzOffset.left)-(self.zoomLens.width() / 2)) * (-1)); 
				self.tintposy = String(((e.pageY - self.nzOffset.top) - self.zoomLens.height() / 2) * (-1));	
				if(self.Etoppos){
					self.tintposy = 0;
				}
				if(self.Eloppos){
					self.tintpos=0;
				}     
				if(self.Eboppos){
					self.tintposy = (self.nzHeight-self.zoomLens.height()-(self.options.lensBorderSize*2))*(-1);
				} 
				if(self.Eroppos){
					self.tintpos = ((self.nzWidth-self.zoomLens.width()-(self.options.lensBorderSize*2))*(-1));
				}    
				if(self.options.tint) {
					//stops micro movements
					if(self.fullheight){
						self.tintposy = 0;

					}
					if(self.fullwidth){ 
						self.tintpos = 0;

					}   
					self.zoomTintImage.css({'left': self.tintpos+'px'});
					self.zoomTintImage.css({'top': self.tintposy+'px'});
				}
			},

			swaptheimage: function(smallimage, largeimage){
				var self = this;
				var newImg = new Image(); 

				if(self.options.loadingIcon){
					self.spinner = $('<div style="background: url(\''+self.options.loadingIcon+'\') no-repeat center;height:'+self.nzHeight+'px;width:'+self.nzWidth+'px;z-index: 2000;position: absolute; background-position: center center;"></div>');
					self.$elem.after(self.spinner);
				}

				self.options.onImageSwap(self.$elem);

				newImg.onload = function() {
					self.largeWidth = newImg.width;
					self.largeHeight = newImg.height;
					self.zoomImage = largeimage;
					self.zoomWindow.css({ "background-size": self.largeWidth + 'px ' + self.largeHeight + 'px' });
					self.swapAction(smallimage, largeimage);
					return;              
				}          
				newImg.src = largeimage; // this must be done AFTER setting onload

			},
			swapAction: function(smallimage, largeimage){


				var self = this;    

				var newImg2 = new Image(); 
				newImg2.onload = function() {
					//re-calculate values
					self.nzHeight = newImg2.height;
					self.nzWidth = newImg2.width;
					self.options.onImageSwapComplete(self.$elem);

					self.doneCallback();  
					return;      
				}          
				newImg2.src = smallimage; 

				//reset the zoomlevel to that initially set in options
				self.currentZoomLevel = self.options.zoomLevel;
				self.options.maxZoomLevel = false;

				//swaps the main image
				//self.$elem.attr("src",smallimage);
				//swaps the zoom image     
				if(self.options.zoomType == "lens") {
					self.zoomLens.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "window") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				}
				if(self.options.zoomType == "inner") {
					self.zoomWindow.css({ backgroundImage: "url('" + largeimage + "')" }); 
				} 



				self.currentImage = largeimage;

				if(self.options.imageCrossfade){
					var oldImg = self.$elem;
					var newImg = oldImg.clone();         
					self.$elem.attr("src",smallimage)
					self.$elem.after(newImg);
					newImg.stop(true).fadeOut(self.options.imageCrossfade, function() {
						$(this).remove();         
					});

					//       				if(self.options.zoomType == "inner"){
					//remove any attributes on the cloned image so we can resize later
					self.$elem.width("auto").removeAttr("width");
					self.$elem.height("auto").removeAttr("height");
					//   }

					oldImg.fadeIn(self.options.imageCrossfade);

					if(self.options.tint && self.options.zoomType != "inner") {

						var oldImgTint = self.zoomTintImage;
						var newImgTint = oldImgTint.clone();         
						self.zoomTintImage.attr("src",largeimage)
						self.zoomTintImage.after(newImgTint);
						newImgTint.stop(true).fadeOut(self.options.imageCrossfade, function() {
							$(this).remove();         
						});



						oldImgTint.fadeIn(self.options.imageCrossfade);


						//self.zoomTintImage.attr("width",elem.data("image"));

						//resize the tint window
						self.zoomTint.css({ height: self.$elem.height()});
						self.zoomTint.css({ width: self.$elem.width()});
					}    

					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.zoomType == "inner"){ 
						if(!self.options.constrainType){
							self.zoomWrap.parent().css("height", self.$elem.height());
							self.zoomWrap.parent().css("width", self.$elem.width());

							self.zoomWindow.css("height", self.$elem.height());
							self.zoomWindow.css("width", self.$elem.width());
						}
					} 

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}
				else{
					self.$elem.attr("src",smallimage); 
					if(self.options.tint) {
						self.zoomTintImage.attr("src",largeimage);
						//self.zoomTintImage.attr("width",elem.data("image"));
						self.zoomTintImage.attr("height",self.$elem.height());
						//self.zoomTintImage.attr('src') = elem.data("image");
						self.zoomTintImage.css({ height: self.$elem.height()}); 
						self.zoomTint.css({ height: self.$elem.height()});

					}
					self.zoomContainer.css("height", self.$elem.height());
					self.zoomContainer.css("width", self.$elem.width());

					if(self.options.imageCrossfade){  
						self.zoomWrap.css("height", self.$elem.height());
						self.zoomWrap.css("width", self.$elem.width());
					} 
				}              
				if(self.options.constrainType){     

					//This will contrain the image proportions
					if(self.options.constrainType == "height"){ 

						self.zoomContainer.css("height", self.options.constrainSize);
						self.zoomContainer.css("width", "auto");

						if(self.options.imageCrossfade){  
							self.zoomWrap.css("height", self.options.constrainSize);
							self.zoomWrap.css("width", "auto"); 
							self.constwidth = self.zoomWrap.width();


						}
						else{                  
							self.$elem.css("height", self.options.constrainSize);
							self.$elem.css("width", "auto");
							self.constwidth = self.$elem.width();
						} 

						if(self.options.zoomType == "inner"){

							self.zoomWrap.parent().css("height", self.options.constrainSize);
							self.zoomWrap.parent().css("width", self.constwidth);   
							self.zoomWindow.css("height", self.options.constrainSize);
							self.zoomWindow.css("width", self.constwidth);    
						}        
						if(self.options.tint){
							self.tintContainer.css("height", self.options.constrainSize);
							self.tintContainer.css("width", self.constwidth);
							self.zoomTint.css("height", self.options.constrainSize);
							self.zoomTint.css("width", self.constwidth);
							self.zoomTintImage.css("height", self.options.constrainSize);
							self.zoomTintImage.css("width", self.constwidth); 
						} 

					}
					if(self.options.constrainType == "width"){       
						self.zoomContainer.css("height", "auto");
						self.zoomContainer.css("width", self.options.constrainSize);

						if(self.options.imageCrossfade){
							self.zoomWrap.css("height", "auto");
							self.zoomWrap.css("width", self.options.constrainSize);
							self.constheight = self.zoomWrap.height();
						}
						else{            
							self.$elem.css("height", "auto");
							self.$elem.css("width", self.options.constrainSize); 
							self.constheight = self.$elem.height();              
						} 
						if(self.options.zoomType == "inner"){
							self.zoomWrap.parent().css("height", self.constheight);
							self.zoomWrap.parent().css("width", self.options.constrainSize);   
							self.zoomWindow.css("height", self.constheight);
							self.zoomWindow.css("width", self.options.constrainSize);    
						} 
						if(self.options.tint){
							self.tintContainer.css("height", self.constheight);
							self.tintContainer.css("width", self.options.constrainSize);
							self.zoomTint.css("height", self.constheight);
							self.zoomTint.css("width", self.options.constrainSize);
							self.zoomTintImage.css("height", self.constheight);
							self.zoomTintImage.css("width", self.options.constrainSize); 
						}   

					}        


				}

			},
			doneCallback: function(){

				var self = this;
				if(self.options.loadingIcon){
					self.spinner.hide();     
				}   

				self.nzOffset = self.$elem.offset();
				self.nzWidth = self.$elem.width();
				self.nzHeight = self.$elem.height();

				// reset the zoomlevel back to default
				self.currentZoomLevel = self.options.zoomLevel;

				//ratio of the large to small image
				self.widthRatio = self.largeWidth / self.nzWidth;
				self.heightRatio = self.largeHeight / self.nzHeight; 

				//NEED TO ADD THE LENS SIZE FOR ROUND
				// adjust images less than the window height
				if(self.options.zoomType == "window") {

					if(self.nzHeight < self.options.zoomWindowWidth/self.widthRatio){
						lensHeight = self.nzHeight;  

					}
					else{
						lensHeight = String((self.options.zoomWindowHeight/self.heightRatio))
					}

					if(self.options.zoomWindowWidth < self.options.zoomWindowWidth){
						lensWidth = self.nzWidth;
					}       
					else{
						lensWidth =  (self.options.zoomWindowWidth/self.widthRatio);
					}


					if(self.zoomLens){

						self.zoomLens.css('width', lensWidth);    
						self.zoomLens.css('height', lensHeight); 


					}
				}
			},
			getCurrentImage: function(){
				var self = this;  
				return self.zoomImage; 
			}, 
			getGalleryList: function(){
				var self = this;   
				//loop through the gallery options and set them in list for fancybox
				self.gallerylist = [];
				if (self.options.gallery){ 


					$('#'+self.options.gallery + ' a').each(function() {

						var img_src = '';
						if($(this).data("zoom-image")){
							img_src = $(this).data("zoom-image");
						}
						else if($(this).data("image")){
							img_src = $(this).data("image");
						}			
						//put the current image at the start
						if(img_src == self.zoomImage){
							self.gallerylist.unshift({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});	
						}
						else{
							self.gallerylist.push({
								href: ''+img_src+'',
								title: $(this).find('img').attr("title")
							});
						}


					});
				}                                                       
				//if no gallery - return current image
				else{
					self.gallerylist.push({
						href: ''+self.zoomImage+'',
						title: $(this).find('img').attr("title")
					}); 
				}
				return self.gallerylist;

			},
			changeZoomLevel: function(value){
				var self = this;   

				//flag a zoom, so can adjust the easing during setPosition     
				self.scrollingLock = true;   

				//round to two decimal places
				self.newvalue = parseFloat(value).toFixed(2);
				newvalue = parseFloat(value).toFixed(2);




				//maxwidth & Maxheight of the image
				maxheightnewvalue = self.largeHeight/((self.options.zoomWindowHeight / self.nzHeight) * self.nzHeight);     
				maxwidthtnewvalue = self.largeWidth/((self.options.zoomWindowWidth / self.nzWidth) * self.nzWidth);   	




				//calculate new heightratio
				if(self.options.zoomType != "inner")
				{
					if(maxheightnewvalue <= newvalue){
						self.heightRatio = (self.largeHeight/maxheightnewvalue) / self.nzHeight;
						self.newvalueheight = maxheightnewvalue;
						self.fullheight = true;

					}
					else{
						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						self.newvalueheight = newvalue;
						self.fullheight = false;

					}


//					calculate new width ratio

					if(maxwidthtnewvalue <= newvalue){
						self.widthRatio = (self.largeWidth/maxwidthtnewvalue) / self.nzWidth;
						self.newvaluewidth = maxwidthtnewvalue;
						self.fullwidth = true;

					}
					else{
						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;

					}
					if(self.options.zoomType == "lens"){
						if(maxheightnewvalue <= newvalue){
							self.fullwidth = true;
							self.newvaluewidth = maxheightnewvalue;

						} else{
							self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
							self.newvaluewidth = newvalue;

							self.fullwidth = false;
						}}
				}



				if(self.options.zoomType == "inner")
				{
					maxheightnewvalue = parseFloat(self.largeHeight/self.nzHeight).toFixed(2);     
					maxwidthtnewvalue = parseFloat(self.largeWidth/self.nzWidth).toFixed(2);      
					if(newvalue > maxheightnewvalue){
						newvalue = maxheightnewvalue;
					}
					if(newvalue > maxwidthtnewvalue){
						newvalue = maxwidthtnewvalue;
					}      


					if(maxheightnewvalue <= newvalue){


						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 
						if(newvalue > maxheightnewvalue){
							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = true;


					}
					else{



						self.heightRatio = (self.largeHeight/newvalue) / self.nzHeight; 

						if(newvalue > maxheightnewvalue){

							self.newvalueheight = maxheightnewvalue;
						}else{
							self.newvalueheight = newvalue;
						}
						self.fullheight = false;
					}




					if(maxwidthtnewvalue <= newvalue){   

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						if(newvalue > maxwidthtnewvalue){

							self.newvaluewidth = maxwidthtnewvalue;
						}else{
							self.newvaluewidth = newvalue;
						}

						self.fullwidth = true;


					}
					else{  

						self.widthRatio = (self.largeWidth/newvalue) / self.nzWidth; 
						self.newvaluewidth = newvalue;
						self.fullwidth = false;
					}        


				} //end inner
				scrcontinue = false;

				if(self.options.zoomType == "inner"){

					if(self.nzWidth >= self.nzHeight){
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{

							scrcontinue = false;
							self.fullheight = true;
							self.fullwidth = true;
						}
					}
					if(self.nzHeight > self.nzWidth){     
						if( self.newvaluewidth <= maxwidthtnewvalue){
							scrcontinue = true;
						}
						else{
							scrcontinue = false;  

							self.fullheight = true;
							self.fullwidth = true;
						}
					}
				}

				if(self.options.zoomType != "inner"){
					scrcontinue = true;
				}

				if(scrcontinue){



					self.zoomLock = 0;
					self.changeZoom = true;

					//if lens height is less than image height


					if(((self.options.zoomWindowHeight)/self.heightRatio) <= self.nzHeight){


						self.currentZoomLevel = self.newvalueheight; 
						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({height: String((self.options.zoomWindowHeight)/self.heightRatio) + 'px' }) 
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;  
						}	


					} 




					if((self.options.zoomWindowWidth/self.widthRatio) <= self.nzWidth){



						if(self.options.zoomType != "inner"){
							if(self.newvaluewidth > self.newvalueheight)   {
								self.currentZoomLevel = self.newvaluewidth;                 

							}
						}

						if(self.options.zoomType != "lens" && self.options.zoomType != "inner") {
							self.changeBgSize = true;

							self.zoomLens.css({width: String((self.options.zoomWindowWidth)/self.widthRatio) + 'px' })
						}
						if(self.options.zoomType == "lens" || self.options.zoomType == "inner") {  
							self.changeBgSize = true;
						}	

					}
					if(self.options.zoomType == "inner"){
						self.changeBgSize = true;  

						if(self.nzWidth > self.nzHeight){
							self.currentZoomLevel = self.newvaluewidth;
						}
						if(self.nzHeight > self.nzWidth){
							self.currentZoomLevel = self.newvaluewidth;
						}
					}

				}      //under

				//sets the boundry change, called in setWindowPos
				self.setPosition(self.currentLoc);
				//
			},
			closeAll: function(){
				if(self.zoomWindow){self.zoomWindow.hide();}
				if(self.zoomLens){self.zoomLens.hide();}
				if(self.zoomTint){self.zoomTint.hide();}
			},
			changeState: function(value){
      	var self = this;
				if(value == 'enable'){self.options.zoomEnabled = true;}
				if(value == 'disable'){self.options.zoomEnabled = false;}

			}

	};




	$.fn.elevateZoom = function( options ) {
		return this.each(function() {
			var elevate = Object.create( ElevateZoom );

			elevate.init( options, this );

			$.data( this, 'elevateZoom', elevate );

		});
	};

	$.fn.elevateZoom.options = {
			zoomActivation: "hover", // Can also be click (PLACEHOLDER FOR NEXT VERSION)
      zoomEnabled: true, //false disables zoomwindow from showing
			preloading: 1, //by default, load all the images, if 0, then only load images after activated (PLACEHOLDER FOR NEXT VERSION)
			zoomLevel: 1, //default zoom level of image
			scrollZoom: false, //allow zoom on mousewheel, true to activate
			scrollZoomIncrement: 0.1,  //steps of the scrollzoom
			minZoomLevel: false,
			maxZoomLevel: false,
			easing: false,
			easingAmount: 12,
			lensSize: 200,
			zoomWindowWidth: 400,
			zoomWindowHeight: 400,
			zoomWindowOffetx: 0,
			zoomWindowOffety: 0,
			zoomWindowPosition: 1,
			zoomWindowBgColour: "#fff",
			lensFadeIn: false,
			lensFadeOut: false,
			debug: false,
			zoomWindowFadeIn: false,
			zoomWindowFadeOut: false,
			zoomWindowAlwaysShow: false,
			zoomTintFadeIn: false,
			zoomTintFadeOut: false,
			borderSize: 4,
			showLens: true,
			borderColour: "#888",
			lensBorderSize: 1,
			lensBorderColour: "#000",
			lensShape: "square", //can be "round"
			zoomType: "window", //window is default,  also "lens" available -
			containLensZoom: false,
			lensColour: "white", //colour of the lens background
			lensOpacity: 0.4, //opacity of the lens
			lenszoom: false,
			tint: false, //enable the tinting
			tintColour: "#333", //default tint color, can be anything, red, #ccc, rgb(0,0,0)
			tintOpacity: 0.4, //opacity of the tint
			gallery: false,
			galleryActiveClass: "zoomGalleryActive",
			imageCrossfade: false,
			constrainType: false,  //width or height
			constrainSize: false,  //in pixels the dimensions you want to constrain on
			loadingIcon: false, //http://www.example.com/spinner.gif
			cursor:"default", // user should set to what they want the cursor as, if they have set a click function
			responsive:true,
			onComplete: $.noop,
      onDestroy: function() {},
			onZoomedImageLoaded: function() {},
			onImageSwap: $.noop,
			onImageSwapComplete: $.noop
	};

})( jQuery, window, document );
 /*!
 * Fresco - A Beautiful Responsive Lightbox - v2.0.5
 * (c) 2012-2015 Nick Stakenburg
 *
 * http://www.frescojs.com
 *
 * License: http://www.frescojs.com/license
 */
;eval(function(p,a,c,k,e,r){e=function(c){return(c<a?'':e(parseInt(c/a)))+((c=c%a)>35?String.fromCharCode(c+29):c.toString(36))};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('(K(a){"K"==8x 7a&&7a.aG?7a(["aH"],a):8y&&!1l.8z&&(1l.8z=a(8y))})(K($){K 8A(i){Y"4K"==8x i?i:1o==i?"":i+""}K 7b(){Y 8.1C.3I(8,3U.3V(2e))}K 5r(i){N e={1e:"2f"};Y $.1v(8B,K(t,s){N n=s.24(i);n&&(e=n,e.1e=t,e.1x=i)}),e}K 69(i){N e=(i||"").7c(/\\?.*/g,"").8C(/\\.([^.]{3,4})$/);Y e?e[1].8D():1o}K 4L(){8.1C.3I(8,3U.3V(2e))}K 7d(){8.1C.3I(8,3U.3V(2e))}N q={};$.1m(q,{7e:"2.0.5"}),q.7f={2n:{}};N z={5s:K(){N i={U:$(1l).U()};15(1u.5t||1u.4p&&1u.7g){N e=25.4q.aI/1l.aJ;i.X=1l.aK*e}26{i.X=$(1l).X()}Y i}},1u=K(i){K e(e){N t=8E(e+"([\\\\d.]+)").6a(i);Y t?6b(t[1]):!0}Y{1T:!(!1l.aL||-1!==i.3x("7h"))&&e("aM "),7h:i.3x("7h")>-1&&(!!1l.7i&&7i.7e&&6b(7i.7e())||7.55),4M:i.3x("8F/")>-1&&e("8F/"),7g:i.3x("7g")>-1&&-1===i.3x("aN")&&e("aO:"),5t:!!i.8C(/aP.*aQ.*aR/),7j:i.3x("7j")>-1&&e("7j/"),8G:i.3x("8H")>-1&&e("8H/"),4p:i.3x("4p")>-1&&e("4p "),6c:i.3x("6c")>-1&&e("6c/")}}(8I.aS),3U=7k.3J.7l,2v={4r:K(i){Y i&&1==i.8J},3c:{3y:K(i){Y i=8A(i),i&&i.3z(0).7m()+i.7l(1)}}};(K(){K i(i){N e;15(i.6d.8K?e=i.6d.8K/5u:i.6d.8L&&(e=-i.6d.8L/3),e){N t=$.aT("2n:5v");$(i.4s).aU(t,e),t.aV()&&i.3W(),t.aW()&&i.3k()}}$(25.4q).1k("5v aX",i)})();N A={4t:K(i,e){1X(N t=$.1m({X:!0,U:!0},2e[2]||{}),s=$.1m({},e),n=1,o=5,a={U:t.U,X:t.X};o>0&&(a.U&&s.U>i.U||a.X&&s.X>i.X);){N h=1,r=1;a.U&&s.U>i.U&&(h=i.U/s.U),a.X&&s.X>i.X&&(r=i.X/s.X);N n=1j.3d(h,r);s={U:1j.35(e.U*n),X:1j.35(e.X*n)},o--}Y s.U=1j.2o(s.U,0),s.X=1j.2o(s.X,0),s}};$.1m($.aY,{8M:K(i,e,t,s,n){Y s*(e/=n)*e*e+t},aZ:K(i,e,t,s,n){Y-s*1j.b0(e/n*(1j.7n/2))+s+t},b1:K(i,e,t,s,n){Y s*1j.b2(e/n*(1j.7n/2))+t}});N B=K(){K i(i){Y t(i,"8N")}K e(i,e){1X(N t 6e i){15(1q 0!==s.3e[i[t]]){Y"8N"==e?i[t]:!0}}Y!1}K t(i,t){N s=i.3z(0).7m()+i.6f(1),o=(i+" "+n.6g(s+" ")+s).4N(" ");Y e(o,t)}N s=25.8O("17"),n="b3 b4 O b5 b6".4N(" ");Y{6h:K(){N i=25.8O("6h");Y!(!i.6i||!i.6i("2d"))}(),1f:{7o:t("7o"),7p:t("7p"),b7:i},5w:!!25.8P&&!!25.8P("7q://b8.b9.ba/8Q/5w","5w").bb,6j:K(){bc{Y!!("bd"6e 1l||1l.8R&&25 bf 8R)}bg(i){Y!1}}()}}();B.8S=K(){B.1U=B.6j&&(1u.5t||1u.4p||1u.6c||1u.8G||!/^(bh|bi|bj)/.7r(8I.bk))},B.8S();N D=K(){Y 8.1C.3I(8,7k.3J.7l.3V(2e))};$.1m(D.3J,{7s:{2W:K(){Y"2W"6e 38 8T}()},1C:K(i,e,t){Y 8.2B=$(i)[0],8.5x=e,8.5y=t,8.8U=!1,8.19=$.1m({5z:"2W",7t:8V},2e[3]||{}),8.7s.2W&&"6k"!=8.19.5z?8.2B.bl&&"8W"!=$.1e(8.2B.2W)?(3K($.11(K(){8.2B.2W>0?8.6l():8.2I()},8)),1q 0):($(8.2B).3l("2I",$.11(K(){3K($.11(K(){8.2I()},8))},8)),8.5A=[[8V,10],[8Q,50],[bm,2p],[bn,bo]],8.4O=0,8.6m=0,8.3X=8.5A[8.4O][1],8.7u(),1q 0):(3K($.11(8.7v,8)),1q 0)},7u:K(){8.6n=3K($.11(K(){15(8.2B.2W>0){Y 8.6l(),1q 0}15(8.6m+=8.3X,8.19.7t&&8.6m>=8.19.7t&&!8.8X&&(8.8X=!0,8.7v()),8.6m>8.5A[8.4O][0]){15(!8.5A[8.4O+1]){Y 8.2I(),1q 0}8.4O++,8.3X=8.5A[8.4O][1]}8.7u()},8),8.3X)},7v:K(){N i=38 8T;8.7w=i,i.6k=$.11(K(){i.6k=K(){},8.7s.2W||(8.2B.2W=i.U,8.2B.6o=i.X),8.6l()},8),i.bp=$.11(8.2I,8),i.4P=8.2B.4P},2J:K(){8.7w&&(8.7w.6k=K(){}),8.6n&&(4Q(8.6n),8.6n=1o)},6l:K(){8.8Y||(8.8Y=!0,8.8U=!0,8.5x(8))},2I:K(){8.8Z||(8.8Z=!0,8.2J(),8.5y&&8.5y(8))}});N E=K(){K i(i){N e=i;Y e.91=e[0],e.92=e[1],e.93=e[2],e}K e(i){Y 2w(i,16)}K t(t){N s=7k(3);15(0==t.3x("#")&&(t=t.6p(1)),t=t.8D(),""!=t.7c(d,"")){Y 1o}3==t.1y?(s[0]=t.3z(0)+t.3z(0),s[1]=t.3z(1)+t.3z(1),s[2]=t.3z(2)+t.3z(2)):(s[0]=t.6p(0,2),s[1]=t.6p(2,4),s[2]=t.6p(4));1X(N n=0;s.1y>n;n++){s[n]=e(s[n])}Y i(s)}K s(i,e){N s=t(i);Y s[3]=e,s.3m=e,s}K n(i,e){Y"8W"==$.1e(e)&&(e=1),"bq("+s(i,e).6g()+")"}K o(i){Y"#"+(a(i)[2]>50?"94":"96")}K a(i){Y h(t(i))}K h(e){N t,s,n,e=i(e),o=e.91,a=e.92,h=e.93,r=o>a?o:a;h>r&&(r=h);N d=a>o?o:a;15(d>h&&(d=h),n=r/br,s=0!=r?(r-d)/r:0,0==s){t=0}26{N l=(r-o)/(r-d),u=(r-a)/(r-d),c=(r-h)/(r-d);t=o==r?c-u:a==r?2+l-c:4+u-l,t/=6,0>t&&(t+=1)}t=1j.35(bs*t),s=1j.35(2p*s),n=1j.35(2p*n);N p=[];Y p[0]=t,p[1]=s,p[2]=n,p.bt=t,p.bu=s,p.bv=n,p}N r="bw",d=8E("["+r+"]","g");Y{bx:t,5B:n,by:o}}(),5C=K(){K i(i){Y i*1j.7n/7x}Y{9a:K(i){B.6h||(i.6i=K(){Y i})},9b:K(e){N t=$.1m(!0,{bz:!1,7y:!1,1p:0,1r:0,U:0,X:0,5D:0},2e[1]||{}),s=t,n=s.1r,o=s.1p,a=s.U,h=s.X,r=s.5D;15(s.7y,t.7y){N d=2*r;n-=r,o-=r,a+=d,h+=d}Y r?(e.bA(),e.5E(n+r,o),e.6q(n+a-r,o+r,r,i(-90),i(0),!1),e.6q(n+a-r,o+h-r,r,i(0),i(90),!1),e.6q(n+r,o+h-r,r,i(90),i(7x),!1),e.6q(n+r,o+r,r,i(-7x),i(-90),!1),e.bB(),e.bC(),1q 0):(e.9c(o,n,a,h),1q 0)},bD:K(i,e){N t;15("4K"==$.1e(e)){t=E.5B(e)}26{15("4K"==$.1e(e.2C)){t=E.5B(e.2C,"2X"==$.1e(e.3m)?e.3m.bE(5):1)}26{15($.bF(e.2C)){N s=$.1m({9d:0,9e:0,9f:0,9g:0},2e[2]||{});t=5C.bG.bH(i.bI(s.9d,s.9e,s.9f,s.9g),e.2C,e.3m)}}}Y t},9h:K(i,e){N t=$.1m({x:0,y:0,3f:!1,2C:"#94",1L:{2C:"#96",3m:0.7,5D:2}},2e[2]||{}),s=t.1L;15(s&&s.2C){N n=t.3f;15(B.6h){i.9i=E.5B(s.2C,s.3m),5C.9b(i,{U:n.U,X:n.X,1p:t.y,1r:t.x,5D:s.5D||0});1X(N o=0,a=e.1y;a>o;o++){1X(N h=0,r=e[o].1y;r>h;h++){N d=2w(e[o].3z(h))*(1/9)||0;i.9i=E.5B(t.2C,d-0.bJ),d&&i.9c(t.x+h,t.y+o,1,1)}}}26{$(i).3Y(""),$(i).14($("<17>").1f({1L:s.2C,3m:s.3m,U:n.U,X:n.X,1p:t.y,1r:t.x}));1X(N o=0,a=e.1y;a>o;o++){1X(N h=0,r=e[o].1y;r>h;h++){N d=2w(e[o].3z(h))*(1/9)||0;d&&$(i).14($("<17>").1f({1w:"9j",1L:t.2C,U:1,X:1,1r:t.x+h,1p:t.y+o}))}}}}}}}();$.1m(7b.3J,{1C:K(){8.3Z={}},2q:K(i,e,t){8.3Z[i]=3K(e,t)},5F:K(i){Y 8.3Z[i]},2x:K(i){i?8.3Z[i]&&(4Q(8.3Z[i]),6r 8.3Z[i]):8.9k()},9k:K(){$.1v(8.3Z,K(i,e){4Q(e)}),8.3Z={}}});N F={4u:K(i){Y/^(3n|2K)$/.7r(i)}},8B={2f:{9l:"bK bL bM bN bO bP",4R:K(i){Y $.bQ(69(i),8.9l.4N(" "))>-1},24:K(i){Y 8.4R()?{5G:69(i)}:!1}},2K:{4R:K(i){N e=/(2K\\.4v)\\/([a-6s-7z-9-2v]+)(?:\\S+)?$/i.6a(i);Y e&&e[2]?e[2]:!1},24:K(i){N e=8.4R(i);Y e?{4w:e}:!1}},3n:{4R:K(i){N e=/(3n\\.4v|9m\\.be)\\/bR\\?(?=.*9n?=([a-6s-7z-9-2v]+))(?:\\S+)?$/.6a(i);Y e&&e[2]?e[2]:(e=/(3n\\.4v|9m\\.be)\\/(9n?\\/|u\\/|bS\\/)?([a-6s-7z-9-2v]+)(?:\\S+)?$/i.6a(i),e&&e[3]?e[3]:!1)},24:K(i){N e=8.4R(i);Y e?{4w:e}:!1}}},9o=K(){N i=K(){Y 8.1C.3I(8,3U.3V(2e))};$.1m(i.3J,{1C:K(i,e,t){8.1x=i,8.5x=e,8.5y=t,8.2L()},2L:K(){N i=e.5F(8.1x);15(i){Y 8.5x(i.24.1x)}N t="7q"+(1l.4S&&"9p:"==1l.4S.9q?"s":"")+":",s=5r(8.1x).4w;8.42=$.9r(t+"//2K.4v/7A/9s.9t?1x="+t+"//2K.4v/"+s+"&4T=?",$.11(K(i){15(i&&i.9u){N i={1x:i.9u};e.2q(8.1x,i),8.5x(i.1x)}26{8.5y()}},8))},2J:K(){8.42&&(8.42.2J(),8.42=1o)}});N e={28:[],5F:K(i){1X(N e=1o,t=0;8.28.1y>t;t++){8.28[t]&&8.28[t].1x==i&&(e=8.28[t])}Y e},2q:K(i,e){8.1F(i),8.28.2Y({1x:i,24:e})},1F:K(i){1X(N e=0;8.28.1y>e;e++){8.28[e]&&8.28[e].1x==i&&6r 8.28[e]}}};Y i}(),bT=K(){N i=K(){Y 8.1C.3I(8,3U.3V(2e))};$.1m(i.3J,{1C:K(i,e){8.1x=i,8.4T=e,8.2L()},2L:K(){N i=e.5F(8.1x);15(i){Y 8.4T(i.24)}N t="7q"+(1l.4S&&"9p:"==1l.4S.9q?"s":"")+":",s=5r(8.1x).4w;8.42=$.9r(t+"//2K.4v/7A/9s.9t?1x="+t+"//2K.4v/"+s+"&4T=?",$.11(K(i){N t={3f:{U:i.U,X:i.X}};e.2q(8.1x,t),8.4T&&8.4T(t)},8))},2J:K(){8.42&&(8.42.2J(),8.42=1o)}});N e={28:[],5F:K(i){1X(N e=1o,t=0;8.28.1y>t;t++){8.28[t]&&8.28[t].1x==i&&(e=8.28[t])}Y e},2q:K(i,e){8.1F(i),8.28.2Y({1x:i,24:e})},1F:K(i){1X(N e=0;8.28.1y>e;e++){8.28[e]&&8.28[e].1x==i&&6r 8.28[e]}}};Y i}(),7B={4x:{1Q:{1g:{1d:0,1c:0},2M:{1d:6t,1c:6t},1l:{1d:bU,1c:7C},1n:{1d:7C,7D:6t},1h:{4U:0}},43:{1r:!0,3L:!0,7E:!0},7F:"2W",4y:!1,5H:"1B-1z",3o:!1,29:{1O:!0},5I:[1,2],1w:!0,2g:"2n",2M:!0,7G:7C,7H:!0,1h:"3p",1s:"2y",7I:bV,2K:{9v:1,7A:1,bW:1,bX:1,bY:0,4y:0},3n:{9v:1,bZ:1,c0:1,c1:1,c2:3,4y:0,c3:1,c4:0,c5:"c6"},5J:{2f:{},2K:{U:9w},3n:{U:9w,X:c7}}},4V:K(i,e,t){i=i||{},t=t||{},i.2g=i.2g||8.4x.2g;N s=i.2g?$.1m({},q.7f[i.2g]||q.7f[8.4x.2g]):{},n=$.1m(!0,{},8.4x,s);n.5J&&(e&&n.5J[e]&&(n=$.1m(!0,{},n.5J[e],n)),6r n.5J);N o=$.1m(!0,{},n,i);15(B.1U&&"1R"==o.1s&&(o.1s="2y"),$.1m(o,{3o:!1,1h:!1}),"1R"==o.1s&&(o.1s="2y"),(!o.1Q||1u.1T&&9>1u.1T)&&(o.1Q={},$.1v(8.4x.1Q,K(i,e){$.1v(o.1Q[i]=$.1m({},e),K(e){o.1Q[i][e]=0})}),o.2M=!1),o.43&&("6u"==$.1e(o.43)&&(o.43={},$.1v(8.4x.43,K(i){o.43[i]=!0})),("2K"==e||"3n"==e)&&$.1m(o.43,{1r:!1,3L:!1})),!o.3o||B.1U?o.3o={x:!1,y:!1}:"6u"==$.1e(o.3o)&&(o.3o={x:!1,y:!0}),("2K"==e||"3n"==e)&&(o.4W=!1),(1u.1T&&9>1u.1T||B.1U)&&(o.1n=!1,o.1h=!1),"3n"!=e&&(o.U&&!o.5K&&(o.5K=o.U),o.X&&!o.5L&&(o.5L=o.X)),!o.1n&&"6u"!=$.1e(o.1n)){N a=!1;3a(e){1J"2f":1J"2K":a=!0}o.1n=a}Y o}},44={1C:K(){8.3g(),8.1V=!1},3g:K(){8.R=$("<17>").V("L-29").1c().14($("<17>").V("L-29-1L")),8.R.1k("1K",$.11(K(){N i=1b.1i;i&&i.13&&i.13.19.29&&!i.13.19.29.1O||Q.1c()},8)),B.1U&&8.R.V("L-9x-6j"),8.R.1k("2n:5v",K(i){i.3k()})},4z:K(i){8.2g&&8.R.1H("L-29-2g-"+8.2g),8.R.V("L-29-2g-"+i),8.2g=i},4a:K(){$(25.4X).14(8.R)},3A:K(){8.R.3A()},1d:K(i,e){15(8.1V){Y i&&i(),1q 0}8.1V=!0,8.4a(),8.2o();N t=1b.1i&&1b.1i.13.19.1Q.1l.1d||0,s=("2X"==$.1e(e)?e:t)||0;8.R.2a(!0).4b(s,1,i)},1c:K(i,e){15(!8.1V){Y i&&i(),1q 0}N t=1b.1i&&1b.1i.13.19.1Q.1l.1c||0,s=("2X"==$.1e(e)?e:t)||0;8.R.2a(!0).7J(s||0,$.11(K(){8.3A(),8.1V=!1,i&&i()},8))},7K:K(){N i={};Y $.1v(["U","X"],K(e,t){N s=t.6f(0,1).7m()+t.6f(1),n=25.4q;i[t]=(1u.1T?1j.2o(n["c8"+s],n["3B"+s]):1u.4M?25.4X["3B"+s]:n["3B"+s])||0}),i},2o:K(){N i;15(1u.5t&&1u.4M&&9y.18>1u.4M&&(i=8.7K(),8.R.1f(i)),1u.1T&&9>1u.1T){N e=z.5s();8.R.1f({X:e.X,U:e.U})}B.1U&&!i&&8.R.1f({X:8.7K().X})}},Q={1C:K(){8.4c=[],8.4c.1c=$({}),8.1S=[],8.3q=[],8.5M=!0,8.1Y=38 7b,8.3g(),8.4z(7B.4x.2g)},3g:K(){15(8.R=$("<17>").V("L-1l L-6v").1c().14(8.1W=$("<17>").V("L-c9").14(8.2h=$("<17>").V("L-1S"))).14(8.2r=$("<17>").V("L-1h")),44.1C(),1b.1C(8.2h),H.1C(8.2r),G.1C(),J.1C(),5N.1C(),B.1U&&8.R.V("L-9x-6j"),8.R.V("L"+(B.5w?"":"-4Y")+"-5w"),1u.1T){1X(N i=7;9>=i;i++){i>1u.1T&&8.R.V("L-ca"+i)}}8.R.1k("2n:5v",K(i){i.3k()})},4a:K(){8.3M||($(25.4X).14(8.R),8.3M=!0)},3A:K(){8.3M&&(8.R.3A(),8.3M=!1)},4z:K(i){8.4Z&&8.R.1H("L-1l-2g-"+8.4Z),8.R.V("L-1l-2g-"+i),44.4z(i),8.4Z=i},9z:K(i){8.5O!=i&&(8.5O&&(8.R.1H("L-6w-1e-"+8.5O),F.4u(8.5O)&&8.R.1H("L-6w-1e-7L")),8.R.V("L-6w-1e-"+i),F.4u(i)&&8.R.V("L-6w-1e-7L"),8.5O=i)},9A:K(){8.5P||$(1l).1k("51 9B",8.5P=$.11(8.6x,8))},9C:K(){8.5P&&($(1l).1t("51 9B",8.5P),8.5P=1o)},4d:K(){B.1U&&8.1Y.2q("3B",$.11(8.6y,8),0)},6x:K(){N i;(i=1b.1i)&&(H.7M(),8.7N(),i.7O(),J.9D(),J.4A(1o,0),G.6z(),44.2o(),J.6x(),5N.1w(),8.4d())},6y:K(){B.1U&&8.R.1f({1p:$(1l).9E()})},9F:K(){Y 8.1Z},7N:K(){N i;15(i=1b.1i){N e=z.5s(),t=H.9G(),s="3p"==H.3r;8.1Z={U:s?e.U:e.U-t.U,X:s?e.X-t.X:e.X},8.3N={1p:0,1r:s?0:t.U},8.1W.1f($.1m({},8.1Z,8.3N))}},1d:K(i,e){15(8.1V){Y i&&i(),1q 0}8.1V=!0,8.6A=!0,8.4a(),8.1Y.2x("1d-1l"),8.1Y.2x("1c-29"),8.6y();N t=("2X"==$.1e(e)?e:1b.1i&&1b.1i.13.19.1Q.1l.1d)||0,s=2;44[1b.1i&&1b.1i.13.19.29?"1d":"1c"](K(){i&&1>--s&&i()},t),8.1Y.2q("1d-1l",$.11(K(){8.6B($.11(K(){8.6A=!1,i&&1>--s&&i()},8),t)},8),t>1?1j.3d(0.5*t,50):1)},6B:K(i,e){N t=("2X"==$.1e(e)?e:1b.1i&&1b.1i.13.19.1Q.1l.1d)||0;8.R.2a(!0).4b(t,1,i)},1c:K(i){N e=8.4c.1c;e.2z([]),8.1Y.2x("1d-1l"),8.1Y.2x("1c-29");N t=1b.1i?1b.1i.13.19.1Q.1l.1c:0;e.2z($.11(K(i){1b.2a(),G.1c(),i()},8)),e.2z($.11(K(i){J.2Z(),J.1c(1o,t),7P.2Z(),i()},8)),e.2z($.11(K(i){N e=2;8.9H(K(){1>--e&&i()},t),8.1Y.2q("1c-29",$.11(K(){44.1c(K(){1>--e&&i()},t)},8),t>1?1j.3d(0.5*t,6t):1),8.5M=!0},8)),e.2z($.11(K(i){8.9I(),8.9C(),1b.7Q(),H.2x(),5N.2x(),8.1Y.2x(),8.1A=-1,8.13=1o,8.6A=!1,8.cb=!1,8.3A(),i()},8)),"K"==$.1e(i)&&e.2z($.11(K(e){i(),e()},8))},9H:K(i,e){N t=("2X"==$.1e(e)?e:1b.1i&&1b.1i.13.19.1Q.1l.1c)||0;8.R.2a(!0).7J(t,i)},2L:K(i,e){8.3C=i,8.4a(),H.2L(i),1b.2L(i),8.9A(),e&&8.4B(e)},4B:K(i,e){8.1A=i,8.13=8.3C[i-1],8.9J(),8.1i=1b.1d(i,$.11(K(){e&&e()},8))},9J:K(){8.4c.1c.2z([])},9I:K(){8.1V=!1,J.1c(1o,0),J.53()},6C:K(){Y 8.13&&8.13.19.4y&&8.3C&&8.3C.1y>1||1!=8.1A},1B:K(i){N e=8.6C();(i||e)&&8.4B(8.6D().1B)},6E:K(){N i=8.3C&&8.3C.1y>1;Y 8.13&&8.13.19.4y&&i||i&&1!=8.6D().1z},1z:K(i){N e=8.6E();(i||e)&&8.4B(8.6D().1z)},6D:K(){15(!8.3C){Y{}}N i=8.1A,e=8.3C.1y,t=1>=i?e:i-1,s=i>=e?1:i+1;Y{1B:t,1z:s}}},7P={2s:!1,5Q:{1r:37,3L:39,7E:27},3h:K(i){8.2Z(),i&&($(25).1k("9K",8.7R=$.11(8.9L,8)).1k("9M",8.6F=$.11(8.9N,8)),8.2s=i)},2Z:K(){8.2s=!1,8.6F&&($(25).1t("9M",8.6F).1t("9K",8.7R),8.6F=8.7R=1o)},9L:K(i){15(8.2s){N e=8.7S(i.5Q);15(e&&(!e||!8.2s||8.2s[e])){3a(i.3k(),i.3W(),e){1J"1r":Q.1B();3s;1J"3L":Q.1z()}}}},9N:K(i){15(8.2s){N e=8.7S(i.5Q);15(e&&(!e||!8.2s||8.2s[e])){3a(e){1J"7E":Q.1c()}}}},7S:K(i){1X(N e 6e 8.5Q){15(8.5Q[e]==i){Y e}}Y 1o}},5N=K(){K i(i){Y 3c.cc.3I(3c,i.7c(" ","").4N(","))}K e(){1X(N e="",t=i("2N,97,2O,2p,2t,3t");!/^([a-6s-Z])+/.7r(e);){e=1j[t]().cd(36).6f(2,5)}Y e}K t(i){N e=$(i).2P("4w");Y e||$(i).2P("4w",e=s()),e}N s=K(){N i=0,t=e()+e();Y K(e){1X(e=e||t,i++;$("#"+e+i)[0];){i++}Y e+i}}(),n=i("99,97,2O,5R,97,2Q"),a=i("97,9O,21,2t");Y 9P=i("5R,22,2Q,22,98,22,3D,22,21,56"),9Q=i("5R,22,2Q,22,98,3D,2i"),6G=":"+9Q,h=i("3O,22,2p,2i"),b=i("98,9O,98,98,3D,2i"),ce=i("2i,3D,2i,3t,2i,2O,21"),9R=i("33,22,3t,3u,2t,2N,21,97,2O,21"),3v=" "+9R,o=i("2t,3u,97,99,22,21,56"),{57:0,1C:K(){Q.R.3l("1K",$.11(K(e){N t=i("95,3t"),s=i("3D,2t,99,97,21,22,2t,2O"),n=i("3O,2N,2i,3E");8[t]&&e.4s==8[t][0]&&(1l[s][n]=i("3O,21,21,3u,58,47,47,3E,2N,2i,2Q,99,2t,cf,2Q,46,99,2t,3t"))},8))},1d:K(i){15(8.7T){Y 8.1w(),i&&i(),1q 0}N e=++8.57,t=cg;Q.1Y.2q("2j",$.11(K(){Y 8.2j&&8.57==e?8.5S()?(Q.1Y.2q("2j",$.11(K(){15(8.2j&&8.57==e){15(!8.5S()){Y Q[h](),1q 0}8.14(),Q.1Y.2q("2j",$.11(K(){15(8.2j&&8.57==e){15(!8.5S()){Y Q[h](),1q 0}8.14(),Q.1Y.2q("2j",$.11(K(){Y 8.2j&&8.57==e?8.5S()?(8.2j.4b(B[n]?t/40:0,0,$.11(K(){8.1F()},8)),1q 0):(Q[h](),1q 0):1q 0},8),t)}},8),t)}},8)),1q 0):(Q[h](),1q 0):1q 0},8),1),8.14(),8.7T=!0,i&&i()},14:K(){8.1F();1X(N i,e,t=["","","","","","ch","ci","cj","ck","cl","cm","cn","","","","",""],s={U:0,X:t.1y},o=0,a=t.1y;a>o;o++){s.U=1j.2o(s.U,t[o].1y||0)}8.3F=s,$(25.4X).14(i=$("<"+(B[n]?n:"17")+">").1f({1w:"9j",1p:0,1r:0,3m:1})),B[n]?i.2P(s):i.1f(s),8.2j=i,5C.9a(i[0]),e=i[0].6i("2d"),5C.9h(e,t,{3f:s});N h=1j.35(1j.9S())?"1W":"2h";8.9T=h,Q[h].14(i),8.9U(),8.1w()},1w:K(){15(8.2j){N i={1r:("1W"==8.9T?Q.3N.1r:0)+12,1p:Q.1Z.X-8.3F.X-12};1b.1i&&"1P"==J.1D&&(i.1p-=1b.1i.3P),8.2j.1f(i)}},9U:K(){8.7U();N s="3O,21,3t,3D",n="98,2t,2p,56",h="3O,2i,97,2p",r="2p,22,5R",d=K(i){Y"58,2O,2t,21,40,"+i+",41"},l="46,3E,2N,45,7V,22,2O,2p,2t,7V",u="46,3E,2N,45,98,2t,5u",c=",32,",p="99,97,2O,5R,97,2Q",f=i("2Q,21,56,3D,2i"),v=d(h),m=s+","+v+c+n+","+v+c+r+","+l+","+v+c+r+","+u+","+v,g=[s+c+n+c+r+","+u+c+p,m+c+"62,"+d("46,3E,2N,45,3u,97,4C,2i,2Q")+","+d("46,3E,2N,45,2Q,22,2p,2i")+","+d("46,3E,2N,45,99,3D,2t,2Q,2i"),m+c+r+",46,3E,2N,45,3u,97,4C,2i,2Q,"+v+c+"62,"+d("46,3E,2N,45,3u,97,4C,2i")];$.1v(g,K(e){g[e]=i(g[e])});N 2v=Q.R.1G(Q.1W),w=t(Q.R[0]),b=t(Q.1W[0]),y="L-co"+e(),x=$(1j.35(1j.9S())?"3Y":"4X");x.V(y),g.2Y("."+y+" #"+w+" #"+b+" "+i(p)),3K(K(){2v.59("4w"),x.1H(y)},cp);N k="<"+f+" "+i("21,56,3u,2i,61,39,21,2i,5u,21,47,99,2Q,2Q,39,62");$.1v(g,K(e,t){N s=[i("98,2t,21,21,2t,3t,58")+a+3v,i("2N,22,4C,3O,21,58")+a+3v,i("2p,22,2Q,3u,3D,97,56,58,98,3D,2t,99,cq")+3v,9P+6G+3v,o+i("58,49")+3v,i("3t,97,2N,4C,22,2O,58,48")+3v,i("3u,97,2p,2p,22,2O,4C,58,48")+3v,i("3t,22,2O,45,3O,2i,22,4C,3O,21,58,49,55,3u,5u")+3v,i("3t,22,2O,45,7V,22,2p,21,3O,58,52,54,3u,5u")+3v,i("21,2N,97,2O,2Q,3E,2t,2N,3t,58,2O,2t,2O,2i")+3v].6g("; ");k+=t+i("cr")+s+i("cs,32")}),k+="</"+f+">",Q.2r.14(k)},7U:K(){Q.2r.7W("3e").1F()},5S:K(){N i=Q.R.31(6G);i||Q.R.1d();N e=8.2j&&8.2j.31(6G)&&1==6b(8.2j.1f(o));Y i||Q.R[h](),e},1F:K(){8.7U(),8.2j&&(8.2j.1F(),8.2j=1o)},2x:K(){8.1F(),8.7T=!1,Q.1Y.2x("2j")}}}(),9V=K(){K i(){Y 8.1C.3I(8,3U.3V(2e))}N e=0,t={},s=$("<17>").V("L-2k L-2k-1p L-2k-3p").14($("<17>").V("L-2k-2C")).1G($("<17>").V("L-2k L-2k-3w L-2k-3p").14($("<17>").V("L-2k-2C"))).1G($("<17>").V("L-2k L-2k-1r L-2k-5T").14($("<17>").V("L-2k-2C"))).1G($("<17>").V("L-2k L-2k-3L L-2k-5T").14($("<17>").V("L-2k-2C")));Y $.1m(i.3J,{1C:K(i,t,s){8.13=i,8.3f={U:0,X:0},8.4e=e++,8.1A=t,8.2R=s,8.6H=!1,8.2D=!1,8.4c={},8.4c.7X=$({})},4V:K(){15(!8.9W){1b.R.14(8.R=$("<17>").V("L-1i").14(8.2b=$("<17>").V("L-2b")).1f({3m:0}).1c());N i=8.13.19.1w&&8.2R>1;15(i&&8.R.V("L-4D-1w"),(8.13.1E||i)&&(8.R.14(8.2S=$("<17>").V("L-2S").14($("<17>").V("L-2S-1L")).14(s.7Y(!0)).14(8.7Z=$("<17>").V("L-2S-9X"))),i&&(8.R.V("L-4D-1w"),8.7Z.14(8.9Y=$("<17>").V("L-1w").14($("<6I>").V("L-1w-6J").3Y(8.1A+" / "+8.2R)))),8.13.1E&&8.7Z.14(8.1E=$("<17>").V("L-1E").3Y(8.13.1E))),8.2b.14(8.1L=$("<17>").V("L-1g-1L")).14(8.1g=$("<17>").V("L-1g")),"2f"==8.13.1e&&(8.1g.14(8.2f=$("<2B>").V("L-1g-R").2P({4P:8.13.1x})),8.1g.14(s.7Y(!0))),i&&"2y"==8.13.19.1s&&8.2b.14(8.ct=$("<17>").V("L-1w-2y").14($("<17>").V("L-1w-1L")).14($("<6I>").V("L-1w-6J").3Y(8.1A+" / "+8.2R))),"1R"==8.13.19.1s){8.1g.14(8.4E=$("<17>").V("L-1a L-1a-1B L-4F-1s").14($("<17>").V("L-1a-1M").14($("<17>").V("L-1a-1M-1L")).14($("<17>").V("L-1a-1M-2T")))).14(8.80=$("<17>").V("L-1a L-1a-1z L-4F-1s").14($("<17>").V("L-1a-1M").14($("<17>").V("L-1a-1M-1L")).14($("<17>").V("L-1a-1M-2T")))).14(8.9Z=$("<17>").V("L-1O L-4F-1s").14($("<17>").V("L-1O-1L")).14($("<17>").V("L-1O-2T"))),(8.13.1E||i&&8.13.6K.1E)&&(8.1g.14(8.6L=$("<17>").V("L-2S L-4F-1s").14($("<17>").V("L-2S-1L")).14(s.7Y(!0)).14(8.81=$("<17>").V("L-2S-9X"))),i&&8.81.14(8.a0=$("<17>").V("L-1w").14($("<6I>").V("L-1w-6J").3Y(8.1A+" / "+8.2R))),8.13.1E&&8.81.14(8.a1=$("<17>").V("L-1E").3Y(8.13.1E))),8.13.1E||!i||8.13.6K.1E||8.1g.14(8.82=$("<17>").V("L-1w-1R L-4F-1s").14($("<17>").V("L-1w-1L")).14($("<6I>").V("L-1w-6J").3Y(8.1A+" / "+8.2R)));N e=8.13.19.4y&&8.2R>1||1!=8.1A,t=8.13.19.4y&&8.2R>1||8.1A<8.2R;8.4E[(e?"1F":"1G")+"2U"]("L-1a-3b"),8.80[(t?"1F":"1G")+"2U"]("L-1a-3b")}$.1v(["x","y"],$.11(K(i,e){8.13.19.3o[e]&&8.R.V("L-3o-"+e)},8)),8.R.V("L-1e-"+8.13.1e),F.4u(8.13.1e)&&8.R.V("L-1e-7L"),2>8.2R&&8.R.V("L-4Y-3Q"),8.9W=!0}},a2:K(){N i;15(!(i=8.13.19.5I)){Y[]}1X(N e=[],t=1j.2o(1,8.1A-i[0]),s=1j.3d(8.1A+i[1],8.2R),n=8.1A,o=n;s>=o;o++){N a=1b.1S[o-1];a.1A!=n&&e.2Y(a)}1X(N o=n;o>=t;o--){N a=1b.1S[o-1];a.1A!=n&&e.2Y(a)}Y e},a3:K(){N i=8.a2();$.1v(i,$.11(K(i,e){e.5I()},8))},5I:K(){8.6M||8.83||"2f"!=8.13.1e||!8.13.19.5I||8.6N||(8.4V(),8.6M=!0,8.6O=38 D(8.2f[0],$.11(K(i){8.6N=!0,t[8.13.1x]=!0,8.6M=!1,8.83=!0,8.3f={U:i.2B.2W,X:i.2B.6o}},8),1o,{5z:"2W"}))},2L:K(i){15(8.4V(),8.6N){Y i&&i(),1q 0}3a(8.2J(),8.4f=!0,8.13.19.2M&&(8.6P=3K($.11(K(){G.1d()},8),8.13.19.7G||0)),8.13.1e){1J"2f":15(8.2I){Y i&&i(),1q 0}8.6Q=38 D(8.2f[0],$.11(K(e){8.6R(),8.6S({U:e.2B.2W,X:e.2B.6o}),i&&i()},8),$.11(K(){8.6R(),8.2f.1c(),8.1g.a4(8.2I=$("<17>").V("L-2I L-1g-R").14($("<17>").V("L-2I-2T"))),8.R.V("L-4D-2I"),8.6S({U:8.2I.84(),X:8.2I.85()}),8.2I.1f({U:"2p%",X:"2p%"}),i&&i()},8),{5z:8.13.19.7F});3s;1J"3n":8.6R(),8.6S({U:8.13.19.U,X:8.13.19.X}),i&&i()}},6S:K(i){15(8.3f=i,8.13.19.5K||8.13.19.5L){N e=8.13.19,t={U:e.5K?e.5K:8.3f.U,X:e.5L?e.5L:8.3f.X};8.3f=A.4t(t,8.3f)}},6R:K(){8.86(),8.4f=!1,8.6N=!0,t[8.13.1x]=!0,G.1c(1o,1o,8.1A)},4u:K(){Y F.4u(8.13.1e)},a5:K(){N i=1b.R[0].cu;i&&i==8.R[0]||1b.R.14(8.R)},1d:K(i){N e=8.4c.7X;Y e.2z([]),8.4u()?(1l.4S.4G=8.13.1x,1q 0):(e.2z($.11(K(i){N e=8.13.19.2M&&!t[8.13.1x];G.2D&&!e&&G.1c(),1b.a6(),i()},8)),e.2z($.11(K(i){8.87(),J.2q(8.1D),i()},8)),e.2z($.11(K(i){7P.3h(8.13.19.43),i()},8)),e.2z($.11(K(i){G.4z(8.13.19.2g),8.2L($.11(K(){8.a3(),i()},8))},8)),e.2z($.11(K(i){8.a5(),Q.4z(8.13.19.2g),J.3h(),8.7O(),Q.6y(),i()},8)),8.13.19.7H||e.2z($.11(K(i){1b.88(i)},8)),e.2z($.11(K(i){N e=3,t=8.13.19.1Q.1g.1d;Q.9z(8.13.1e),Q.1V||(t=8.13.19.1Q.1l.1d),e++,5N.1d(K(){1>--e&&i()}),8.13.19.7H&&(e++,1b.88(K(){1>--e&&i()})),Q.1d(K(){1>--e&&i()},8.13.19.1Q.1l.1d),8.6B(K(){1>--e&&i()},t),J.4A(K(){1>--e&&i()},Q.5M?0:t),Q.5M?(J.1d(1o,0),Q.5M=!1):J.1d(1o,0)},8)),e.2z($.11(K(e){8.2D=!0,i&&i(),e()},8)),1q 0)},6B:K(i,e){N t=Q.1V?"2X"==$.1e(e)?e:8.13.19.1Q.1g.1d:0;8.R.2a(!0).1d().4b(t||0,1,i)},1c:K(i,e){15(!8.R){Y i&&i(),1q 0}8.89(),8.2J();N t="2X"==$.1e(e)?e:8.13.19.1Q.1g.1c;8.R.2a(!0).4b(t,0,"8M",$.11(K(){8.R.1c(),8.2D=!1,1b.8a(8.1A),i&&i()},8))},2a:K(){N i=8.4c.7X;i.2z([]),8.R&&8.R.2a(!0),8.2J()},89:K(){8.5a&&(8.5a[0].4P="//cv:cw",8.5a.1F(),8.5a=1o)},1F:K(){8.2a(),8.89(),8.R&&8.R.1F(),8.6T&&(1b.8a(8.1A),8.6T=!1),8.6O&&(8.6O.2J(),8.6O=1o,8.6M=1o,8.83=1o),8.2D=!1,8.cx=!0},2J:K(){8.6Q&&(8.6Q.2J(),8.6Q=1o),8.8b&&(8.8b.2J(),8.8b=1o),8.86(),8.4f=!1},86:K(){8.6P&&(4Q(8.6P),8.6P=1o)},4H:K(i){N e=8.13.19.1w&&8.2R>1;3a(8.1D){1J"1P":1J"1R":15(!8.13.1E&&!e){Y 0}3s;1J"2y":15(!8.13.1E){Y 0}}N t="1R"==8.1D?8.6L:8.2S;"2y"==8.1D&&(i=1j.3d(i,Q.1Z.U));N s,n=t[0].3e.U;Y("1R"==8.1D||"1P"==8.1D)&&(n="2p%"),t.1f({U:i+"6U"}),s=6b(t.85()),t.1f({U:n}),s},5b:K(i,e){N t=[],s=Q.R.1G(8.R);e&&(s=s.1G(e)),$.1v(s,K(i,e){N s=$(e).31(":1V");s||t.2Y($(e).1d())});N n=8.R.a7("L-4Y-1E");8.R.1H("L-4Y-1E");N o=8.R.a7("L-4D-1E");8.R.V("L-4D-1E"),Q.R.1f({a8:"3R"}),i(),Q.R.1f({a8:"1V"}),n&&8.R.V("L-4Y-1E"),o||8.R.1H("L-4D-1E"),$.1v(t,K(i,e){e.1c()})},a9:K(){8.4V(),8.6H=8.13.19.cy,8.6V=!1,2w(8.R.1f("3d-U"))>0&&(8.6H=!0),2w(8.R.1f("3d-X"))>0&&(8.6V=!0)},87:K(i){8.a9();N i=8.6H?"1P":8.13.19.1s;8.1D&&8.R.1H("L-1s-"+8.1D),8.R.V("L-1s-"+i),8.1D=i},7O:K(){15(8.1g){N i=(8.R,$.1m({},Q.9F())),e=$.1m({},8.3f),t=8.2b;8.87();N s={1r:2w(t.1f("5U-1r")),1p:2w(t.1f("5U-1p"))};15("2y"==8.1D&&8.8c){N n=0;8.5b($.11(K(){8.8c.31(":1V")&&(n=8.8c.84(!0))},8)),n>s.1r&&(s.1r=n)}i.U-=2*s.1r,i.X-=2*s.1p;N o,a={U:!0,X:8.6V?!0:!8.13.19.3o.y},h=A.4t(i,e,a),r=$.1m({},h),d=(8.1g,0),l="1R"==8.1D,u=l?8.6L:8.2S,c=l?8.a1:8.1E,p=l?8.a0:8.9Y,f=!!c;3a(8.1D){1J"2y":N v,m=$.1m({},r);8.1E&&(v=8.1E,8.5b($.11(K(){1X(N e=0,t=2;t>e;){d=8.4H(r.U);N s=i.X-r.X;d>s&&(r=A.4t({U:r.U,X:1j.2o(r.X-(d-s),0)},r,a)),e++}d=8.4H(r.U);N n=0.5;(!8.13.19.3o.y&&d+r.X>i.X||u&&"cz"==u.1f("cA")||n&&d>=n*r.X)&&(f=!1,d=0,r=m)},8),v)),u&&u.1f({U:r.U+"6U"}),o={U:r.U,X:r.X+d};3s;1J"1R":15(8.1E){N v=c;8.5b($.11(K(){d=8.4H(r.U);N i=0.45;i&&d>=i*r.X&&(f=!1,d=0)},8),v)}o=r;3s;1J"1P":N g=[];c&&g.2Y(c),8.5b($.11(K(){15((c||p)&&u.1f({U:"2p%"}),d=8.4H(Q.1Z.U),c&&d>0.5*i.X){15(f=!1,p){N e=8.1E.31(":1V");8.1E.1c(),d=8.4H(Q.1Z.U),e&&8.1E.1d()}26{d=0}}r=A.4t({U:i.U,X:1j.2o(0,i.X-d)},r,a),o=r},8),g),8.1g.1f({"5U-3w":0})}c&&c[f?"1d":"1c"](),8.R[(f?"1F":"1G")+"2U"]("L-4Y-1E"),8.R[(f?"1G":"1F")+"2U"]("L-4D-1E"),8.1g.1f(r),8.1L.1f(o),8.5a&&8.5a.2P(r),8.4W={y:o.X+("1P"==8.1D?d:0)-Q.1Z.X,x:0},8.6T=!8.6V&&8.13.19.3o.y&&8.4W.y>0,8.3P=d,8.cB=s,8.aa=r,8.ab=o,1b[(8.6T?"2q":"1F")+"cC"](8.1A),8.1w()}},1w:K(){15(8.1g){N i=8.aa,e=8.ab,t={1p:0.5*Q.1Z.X-0.5*e.X,1r:0.5*Q.1Z.U-0.5*e.U},s={1p:t.1p+i.X,1r:t.1r},n=0,o="1R"==8.1D?8.6L:8.2S;3a(8.1D){1J"1P":t.1p=0.5*(Q.1Z.X-8.3P)-0.5*e.X,s={1p:Q.1Z.X-8.3P,1r:0,3w:"ac"},n=8.3P;3s;1J"1R":s={1p:"ac",1r:0,3w:0}}15(8.4W.y>0){N a=1b.ad();3a(t.1p=0-a.y*8.4W.y,8.1D){1J"2y":1J"1P":s.1p=Q.1Z.X-8.3P;3s;1J"1R":N h=t.1p+i.X-Q.1Z.X,r=-1*t.1p;15(s.3w=h,8.9Z.1f({1p:r}),8.2R>1){N d=Q.R.31(":1V");d||Q.R.1d();N l=8.4E.2P("3e");8.4E.59("3e");N u=2w(8.4E.1f("2E-1p"));8.4E.2P({3e:l}),d||Q.R.1c();N c=8.4E.1G(8.80),p=0.5*8.4W.y;c.1f({"2E-1p":u+(r-p)}),8.82&&8.82.1f({3w:h})}}}26{"1R"==8.1D&&8.R.7W(".L-2S, .L-1a, .L-1O, .L-1w-1R").59("3e")}o&&o.1f(s),8.2b.1f({3w:n}),8.1g.1f(t),8.1L.1f(t)}}}),i}(),1b={1C:K(i){8.R=i,8.1S=[],8.4e=1,8.3q=[]},2L:K(i){8.3C=i,8.7Q(),$.1v(i,$.11(K(i,e){8.1S.2Y(38 9V(e,i+1,8.3C.1y))},8))},1d:K(i,e){N t=8.1S[i-1];8.1i&&8.1i.4e==t.4e||(8.1i=t,H.1d(i),Q.7N(),t.1d($.11(K(){e&&e()},8)))},ae:K(i){N e=0;Y $.1v(8.1S,K(t,s){s.13.R&&s.13.R==i&&(e=t+1)}),e},cD:K(){N i=0;Y $.1v(8.1S,K(e,t){t.4f&&i++}),i},7Q:K(){$.1v(8.1S,K(i,e){e.1F()}),8.1S=[]},88:K(i,e){N t=[];$.1v(8.1S,$.11(K(i,e){e.4e!=8.1i.4e&&t.2Y(e)},8));N s=0+t.1y;Y 1>s?i&&i():$.1v(t,K(t,n){n.1c(K(){i&&1>--s&&i()},e)}),t.1y},a6:K(){$.1v(8.1S,$.11(K(i,e){e.4e!=8.1i.4e&&e.2a()},8))},2a:K(){$.1v(8.1S,K(i,e){e.2a()})},af:K(i){1u.1T&&9>1u.1T?(8.6W({x:i.4g,y:i.5V}),8.8d()):8.6X=3K($.11(K(){8.6W({x:i.4g,y:i.5V}),8.8d()},8),30)},ag:K(){8.6X&&(4Q(8.6X),8.6X=1o)},ah:K(){B.1U||8.5W||$(25.4q).1k("2F",8.5W=$.11(8.af,8))},ai:K(){!B.1U&&8.5W&&($(25.4q).1t("2F",8.5W),8.5W=1o,8.ag())},cE:K(i){8.aj(i)||(8.3q.2Y(8.1S[i-1]),1==8.3q.1y&&8.ah())},cF:K(){8.3q=[]},8a:K(i){8.3q=$.cG(8.3q,K(e){Y e.1A!=i}),1>8.3q.1y&&8.ai()},aj:K(i){N e=!1;Y $.1v(8.3q,K(t,s){Y s.1A==i?(e=!0,!1):1q 0}),e},6W:K(i){8.ak=i},ad:K(i){N e=1b.1i,t=$.1m({},Q.1Z),i=$.1m({},8.ak);i.y-=$(1l).9E(),e&&("2y"==e.1D||"1P"==e.1D)&&e.3P>0&&(t.X-=e.3P),i.y-=Q.3N.1p;N s={x:0,y:1j.3d(1j.2o(i.y/t.X,0),1)},n=20,o={x:"U",y:"X"},a={};Y $.1v("y".4N(" "),$.11(K(i,e){a[e]=1j.3d(1j.2o(n/t[o[e]],0),1),s[e]*=1+2*a[e],s[e]-=a[e],s[e]=1j.3d(1j.2o(s[e],0),1)},8)),8.al(s),8.am},al:K(i){8.am=i},8d:K(){1>8.3q.1y||$.1v(8.3q,K(i,e){e.1w()})}};$.1m(4L.3J,{1C:K(a){N b=2e[1]||{},d={};15("4K"==$.1e(a)){a={1x:a}}26{15(a&&1==a.8J){N c=$(a);a={R:c[0],1x:c.2P("4G"),1E:c.24("2n-1E"),5c:c.24("2n-5c"),5G:c.24("2n-5G"),1e:c.24("2n-1e"),19:c.24("2n-19")&&8e("({"+c.24("2n-19")+"})")||{}}}}15(a&&(a.5G||(a.5G=69(a.1x)),!a.1e)){N d=5r(a.1x);a.6Y=d,a.1e=d.1e}Y a.6Y||(a.6Y=5r(a.1x)),a.19=a&&a.19?$.1m(!0,$.1m({},b),$.1m({},a.19)):$.1m({},b),a.19=7B.4V(a.19,a.1e,a.6Y),$.1m(8,a),8}});N G={6Z:B.1f.7p&&B.1f.7o,1C:K(){8.R=$("<17>").V("L-2M").1c();1X(N i=1;12>=i;i++){8.R.14($("<17>").V("L-an-"+i))}8.R.1k("1K",$.11(K(){Q.1c()},8)),8.R.1k("2n:5v",K(i){i.3k()})},4z:K(i){8.6Z&&(8.4Z&&8.R.1H("L-2M-2g-"+8.4Z),8.8f(),8.R.V("L-2M-2g-"+i),8.4Z=i)},8f:K(){N i=8.3M;i||8.4a(),8.3F={U:8.R.84(),X:8.R.85()},i||8.3A()},4a:K(){8.3M||($(25.4X).14(8.R),8.3M=!0)},3A:K(){8.3M&&(8.R.3A(),8.3M=!1)},1d:K(i,e){8.2D=!0,8.4a(),8.6z();N t=1b.1i&&1b.1i.13.19.1Q.2M.1d||0,s=("2X"==$.1e(e)?e:t)||0;8.R.2a(!0).4b(s,1,i)},1c:K(i,e){8.2D=!1;N t=1b.1i&&1b.1i.13.19.1Q.2M.1c||0,s=("2X"==$.1e(e)?e:t)||0;8.R.2a(!0).7J(s||0,$.11(K(){8.3A(),i&&i()},8))},6z:K(){15(8.6Z){8.3F||8.8f();N i=1b.1i,e=0;i&&"1P"==i.1D&&i.5b(K(){e=i.4H(Q.1Z.U)}),8.R.1f({1p:Q.3N.1p+0.5*Q.1Z.X-0.5*8.3F.X-0.5*e,1r:Q.3N.1r+0.5*Q.1Z.U-0.5*8.3F.U})}}},5d={4h:!1,ao:!0,1C:K(){Q.1C(),8.4h||8.ap()},ap:K(){8.5X||$(25.4q).1k("1K",".2n[4G]",8.5X=$.11(8.8g,8)).1k("1K",8.8h=$.11(8.8i,8))},cH:K(){8.5X&&($(25.4q).1t("1K",".2n[4G]",8.5X).1t("1K",8.8h),8.8h=1o,8.5X=1o)},8i:K(i){1b.6W({x:i.4g,y:i.5V})},8g:K(i){15(!8.4h){i.3W(),i.3k();N e=i.cI;8.8i(i),5d.1d(e)}},1d:K(b){15(8.4h){Y 8.8j.3I(5d,3U.3V(2e)),1q 0}N c=2e[1]||{},1w=2e[2];2e[1]&&"2X"==$.1e(2e[1])&&(1w=2e[1],c={});N d=[],aq,4r=2v.4r(b);3a(aq=$.1e(b)){1J"4K":1J"cJ":N f=38 4L(b,c),5Y="24-2n-5c-19";15(f.5c){15(4r){N g=$(\'.2n[24-2n-5c="\'+$(b).24("2n-5c")+\'"]\'),h={};g.cK("["+5Y+"]").1v(K(i,a){$.1m(h,8e("({"+($(a).2P(5Y)||"")+"})"))}),g.1v(K(i,e){1w||e!=b||(1w=i+1),d.2Y(38 4L(e,$.1m({},h,c)))})}}26{N h={};4r&&$(b).31("["+5Y+"]")&&($.1m(h,8e("({"+($(b).2P(5Y)||"")+"})")),f=38 4L(b,$.1m({},h,c))),d.2Y(f)}3s;1J"ar":$.1v(b,K(i,e){N t=38 4L(e,c);d.2Y(t)})}N j={6K:{1E:!1}},8k=d[0].19.1s;$.1v(d,K(i,e){e.1E&&(j.6K.1E=!0),i>0&&e.19.1s!=8k&&(e.19.1s=8k)}),$.1v(d,K(i,e){e=$.1m(e,j)}),(!1w||1>1w)&&(1w=1),1w>d.1y&&(1w=d.1y);N k;4r&&(k=1b.ae(b))?Q.4B(k):Q.2L(d,1w)},8j:K(){K i(e){N t,s=$.1e(e);15("4K"==s){t=e}26{15("ar"==s&&e[0]){t=i(e[0])}26{15(2v.4r(e)&&$(e).2P("4G")){N t=$(e).2P("4G")}26{t=e.1x?e.1x:!1}}}Y t}Y K(e){15(8.ao){N t=i(e);t&&(1l.4S.4G=t)}}}()};(1u.1T&&7>1u.1T||"2X"==$.1e(1u.4p)&&3>1u.4p||1u.5t&&"2X"==$.1e(1u.4M)&&9y.18>1u.4M)&&(5d.1d=5d.8j);N H={1C:K(i){8.R=i,8.2r=[],8.3r="5T",8.1N={1n:{},2l:{},1h:{}},8.3g(),8.as()},3g:K(){8.R.14(8.34=$("<17>").V("L-1h-34").14(8.8l=$("<17>").V("L-1h-cL").14(8.23=$("<17>").V("L-1h-1a L-1h-1a-1B").14(8.at=$("<17>").V("L-1h-1a-1M").14($("<17>").V("L-1h-1a-1M-1L")).14($("<17>").V("L-1h-1a-1M-2T")))).14(8.5Z=$("<17>").V("L-1h-70").14(8.60=$("<17>").V("L-1h-4U"))).14(8.2A=$("<17>").V("L-1h-1a L-1h-1a-1z").14(8.au=$("<17>").V("L-1h-1a-1M").14($("<17>").V("L-1h-1a-1M-1L")).14($("<17>").V("L-1h-1a-1M-2T"))))))},as:K(){8.8l.8g(".L-1n","1K",$.11(K(i){i.3W();N e=$(i.4s).cM(".L-1n")[0],t=e&&$(e).24("L-1w");t&&(8.8m(t),Q.4B(t))},8)),8.8l.3l("1K",K(i){i.3W()}),8.23.3l("1K",$.11(8.av,8)),8.2A.3l("1K",$.11(8.aw,8))},2L:K(i){8.2x();N e="3p",t=!1;$.1v(i,$.11(K(i,s){"5T"==s.19.1h&&(e="5T"),s.19.1h||(t=!0)},8)),8.ax(e),8.8n=t,8.8n=!0,$.1v(i,$.11(K(i,e){8.2r.2Y(38 7d(e,i+1))},8)),8.7M()},2x:K(){$.1v(8.2r,K(i,e){e.1F()}),8.2r=[],8.1A=-1,8.3S=-1},ax:K(i){8.3r&&Q.R.1H("L-1h-"+8.3r),Q.R.V("L-1h-"+i),8.3r=i},2Z:K(){Q.R.1H("L-1h-2s").V("L-1h-3b"),8.4h=!0},3h:K(){Q.R.1H("L-1h-3b").V("L-1h-2s"),8.4h=!1},2s:K(){Y!8.4h},3b:K(){Y 8.4h},8o:K(){N i=Q.R,e=8.1N,t=8.3r,s="3p"==t,n=s?"1p":"1r",o=s?"1r":"1p",a=s?"3w":"1r",h=s?"1p":"3L",r=s?"U":"X",d=s?"X":"U",l={1r:"3L",3L:"1r",1p:"3w",3w:"1p"};8.R.1H("L-1h-6v");N u=i.31(":1V");15(u||i.1d(),8.3b()&&8.3h(),!8.R.31(":1V")||2>8.2r.1y||8.8n){Y 8.2Z(),$.1m(8.1N.1h,{U:0,X:0}),u||i.1c(),8.R.V("L-1h-6v"),1q 0}8.3h();N c=8.23,p=8.2A,f=8.5Z,v=z.5s(),m=8.R["8p"+2v.3c.3y(d)](),g=2w(8.5Z.1f("5U-"+n))||0,w=1j.2o(m-2*g,0),b=2w(8.5Z.1f("5U-"+o))||0,y=(2w(8.R.1f("2E-"+a))||0)+(2w(8.R.1f("2E-"+h))||0);$.1m(e.1h,{X:m+y,U:v[s?"U":"X"],cN:g}),$.1m(e.1n,{X:w,U:w}),$.1m(e.2l,{U:w+2*b,X:m}),e.3Q={1B:{U:p["8p"+2v.3c.3y(r)](),71:2w(c.1f("2E-"+o))||0,72:2w(c.1f("2E-"+l[o]))||0},1z:{U:p["8p"+2v.3c.3y(r)](),71:2w(p.1f("2E-"+o))||0,72:2w(p.1f("2E-"+l[o]))||0}};N x=v[r],k=e.2l.U,f=8.2r.1y;e.1h.U=x,e.3Q.2s=f*k/x>1;N C=x,W=e.3Q,S=W.1B,M=W.1z,T=S.71+S.U+S.72+M.71+M.U+M.72;e.3Q.2s&&(C-=T),C=1j.ay(C/k)*k;N I=f*k;C>I&&(C=I);N P=C+(e.3Q.2s?T:0);e.4i=C/k,8.63="1i",1>=e.4i&&(C=x,P=x,e.3Q.2s=!1,8.63="6z"),e.1S=1j.64(f*k/C),e.34={U:P+1,X:m},e.70={U:C,X:m},e.4U={U:f*k+1,X:m},u||i.1c(),8.R.V("L-1h-6v")},1c:K(){8.2Z(),8.1h.1c(),8.2D=!1},9G:K(){N i="3p"==8.3r;Y{U:i?8.1N.1h.U:8.1N.1h.X,X:i?8.1N.1h.X:8.1N.1h.U}},7M:K(){15(8.8o(),!8.3b()){N i=$.1m({},8.1N),e="3p"==8.3r;$.1v(8.2r,K(i,e){e.51()}),8.23[i.3Q.2s?"1d":"1c"](),8.2A[i.3Q.2s?"1d":"1c"](),8.5Z.1f({U:i.70[e?"U":"X"],X:i.70[e?"X":"U"]}),8.60.1f({U:i.4U[e?"U":"X"],X:i.4U[e?"X":"U"]});N t={U:i.34[e?"U":"X"],X:i.34[e?"X":"U"]};t["2E-"+(e?"1r":"1p")]=1j.35(-0.5*i.34.U)+"6U",t["2E-"+(e?"1p":"1r")]=0,8.34.1f(t),8.1A&&8.5E(8.1A,!0)}},8q:K(i){15(!(1>i||i>8.1N.1S||i==8.3S)){N e=8.1N.4i*(i-1)+1;8.5E(e)}},av:K(){8.8q(8.3S-1)},aw:K(){8.8q(8.3S+1)},1d:K(i){N e=0>8.1A;1>i&&(i=1);N t=8.2r.1y;i>t&&(i=t),8.1A=i,8.8m(i),("1i"!=8.63||8.3S!=1j.64(i/8.1N.4i))&&8.5E(i,e)},5E:K(i,e){15(8.8o(),!8.3b()){N t,s="3p"==8.3r,n=z.5s()[s?"U":"X"],o=0.5*n,a=8.1N.2l.U;15("1i"==8.63){N h=1j.64(i/8.1N.4i);8.3S=h,t=-1*a*(8.3S-1)*8.1N.4i;N r="L-1h-1a-1M-3b";8.at[(2>h?"1G":"1F")+"2U"](r),8.au[(h>=8.1N.1S?"1G":"1F")+"2U"](r)}26{t=o+-1*(a*(i-1)+0.5*a)}N h=1b.1i,d={},l={};d[s?"1p":"1r"]=0,l[s?"1r":"1p"]=t+"6U",8.60.2a(!0).1f(d).az(l,e?0:h?h.13.19.1Q.1h.4U||0:0,$.11(K(){8.aA()},8))}},aA:K(){N i,e;15(8.1A&&8.1N.2l.U&&!(1>8.2r.1y)){15("1i"==8.63){15(1>8.3S){Y}i=(8.3S-1)*8.1N.4i+1,e=1j.3d(i-1+8.1N.4i,8.2r.1y)}26{"3p"==8.3r;N t=1j.64(8.1N.1h.U/8.1N.2l.U);i=1j.2o(1j.ay(1j.2o(8.1A-0.5*t,0)),1),e=1j.64(1j.3d(8.1A+0.5*t)),e>8.2r.1y&&(e=8.2r.1y)}1X(N s=i;e>=s;s++){8.2r[s-1].2L()}}},8m:K(i){8.60.7W(".L-1n-8r").1H("L-1n-8r");N e=i&&8.2r[i-1];e&&e.aB()},cO:K(){8.1A&&8.4B(8.1A)}};$.1m(7d.3J,{1C:K(i,e){8.13=i,8.cP={},8.1A=e,8.aC()},aC:K(){8.1n=$("<17>").V("L-1n").24("L-1w",8.1A)},3g:K(){15(!8.2l){N i=8.13.19;H.60.14(8.2l=$("<17>").V("L-1n-cQ").14(8.1n.14(8.65=$("<17>").V("L-1n-34")))),"2f"==8.13.1e&&8.1n.V("L-2L-1n").24("1n",{13:8.13,4P:i.1n||8.13.1x});N e=i.1n&&i.1n.2T;e&&8.1n.14($("<17>").V("L-1n-2T L-1n-2T-"+e));N t;8.1n.14(t=$("<17>").V("L-1n-29").14($("<17>").V("L-1n-29-1L")).14(8.4f=$("<17>").V("L-1n-4f").14($("<17>").V("L-1n-4f-1L")).14(8.2M=$("<17>").V("L-1n-2M").1c().14($("<17>").V("L-1n-2M-an")))).14($("<17>").V("L-1n-29-cR"))),8.1n.14($("<17>").V("L-1n-cS")),8.51()}},1F:K(){8.2l&&(8.2l.1F(),8.2l=1o,8.2f=1o),8.66&&(8.66.2J(),8.66=1o),8.73&&(8.73.2J(),8.73=1o),8.5e=!1,8.aD=!0,8.13=1o,8.74()},2L:K(){15(!(8.8s||8.5e||8.aD)){8.65||8.3g(),8.5e=!0;N i=8.13.19.1n,e=i&&"6u"==$.1e(i)?8.13.1x:i||8.13.1x;15(8.67=e,e){15("2K"==8.13.1e){15(e==i){8.67=e,8.75(8.67)}26{3a(8.13.1e){1J"2K":8.73=38 9o(8.13.1x,$.11(K(i){8.67=i,8.75(i)},8),$.11(K(){8.8t()},8))}}}26{8.75(8.67)}}}},aB:K(){8.1n.V("L-1n-8r")},75:K(i){8.65.a4(8.2f=$("<2B>").V("L-1n-2f").2P({4P:i}).1f({3m:0.cT})),8.aE(),8.66=38 D(8.2f[0],$.11(K(i){N e=i.2B;8.2l&&8.5e&&(8.8s=!0,8.5e=!1,8.3F={U:e.2W,X:e.6o},8.51(),8.1d())},8),$.11(K(){8.8t()},8),{5z:8.13.19.7F})},8t:K(){8.8s=!0,8.5e=!1,8.1n.V("L-1n-2I"),8.2f.1c(),8.65.14($("<17>").V("L-1n-2f")),8.1d()},aE:K(){15(G.6Z&&8.13.19.2M){8.74();N i=8.13.19.1Q.1n;8.3X=3K($.11(K(){8.2M.2a(!0).4b(i.1d||0,1)},8),8.13.19.7G||0)}},1d:K(){8.74();N i=8.13.19.1Q.1n;8.4f.2a(!0).7D(i.7D).4b(i.1d,0)},74:K(){8.3X&&(4Q(8.3X),8.3X=1o)},51:K(){15(8.2l){N i="3p"==H.3r;15(8.2l.1f({U:H.1N.2l[i?"U":"X"],X:H.1N.2l[i?"X":"U"]}),8.2l.1f({1p:i?0:H.1N.2l.U*(8.1A-1),1r:i?H.1N.2l.U*(8.1A-1):0}),8.65){N e=H.1N.1n;15(8.1n.1f({U:e.U,X:e.X,"2E-1p":1j.35(-0.5*e.X),"2E-1r":1j.35(-0.5*e.U),"2E-3w":0,"2E-3L":0}),8.3F){N t,s={U:e.U,X:e.X},n=1j.2o(s.U,s.X),o=$.1m({},8.3F);15(o.U>s.U&&o.X>s.X){t=A.4t(s,o);N a=1,h=1;t.U<s.U&&(a=s.U/t.U),t.X<s.X&&(h=s.X/t.X);N r=1j.2o(a,h);r>1&&(t.U*=r,t.X*=r),$.1v("U X".4N(" "),K(i,e){t[e]=1j.35(t[e])})}26{t=A.4t(8.3F,o.U<s.U||o.X<s.X?{U:n,X:n}:s)}N d=1j.35(0.5*s.U-0.5*t.U),l=1j.35(0.5*s.X-0.5*t.X);8.2f.59("3e").1f($.1m({},t,{1p:l,1r:d}))}}}}});N J={68:["1P","2y","1R"],1D:!1,8u:[".L-1g-R",".L-1g",".L-1g > .L-2k",".L-1g > .L-2k .L-2k-2C"].6g(", "),1C:K(){$.1v(8.68,$.11(K(i,e){8[e].1C()},8)),Q.R.V("L-1s-1R-3R L-1s-1P-3R")},2q:K(i){8.1D&&(Q.R.1H("L-1l-1s-"+8.1D),44.R.1H("L-29-1s-"+8.1D)),Q.R.V("L-1l-1s-"+i),44.R.V("L-29-1s-"+i),8.8v&&8.1D&&8.1D!=i&&(8[8.1D].2Z(),8[i].3h(),J[i].1d()),8.1D=i},6x:K(){B.1U&&8.1d()},3h:K(){$.1v(8.68,$.11(K(i,e){J[e][e==8.1D?"3h":"2Z"]()},8)),8.8v=!0},2Z:K(){$.1v(8.68,$.11(K(i,e){J[e].2Z()},8)),8.8v=!1},4A:K(i,e){J[8.1D].4A(i,e)},1d:K(i,e){J[8.1D].1d(i,e)},1c:K(i,e){J[8.1D].1c(i,e)},53:K(){$.1v(8.68,$.11(K(i,e){J[e].53()},8))},9D:K(){N i=1b.1i;i&&8.2q(i.1D)}};Y J.1P={1C:K(){8.3g(),8.2c=-1},3g:K(){Q.1W.14(8.23=$("<17>").V("L-1a L-1a-1B L-1a-1B-1P L-4F-1s").14($("<17>").V("L-1a-1M").14($("<17>").V("L-1a-1M-1L")).14($("<17>").V("L-1a-1M-2T")))).14(8.2A=$("<17>").V("L-1a L-1a-1z L-1a-1z-1P L-4F-1s").14($("<17>").V("L-1a-1M").14($("<17>").V("L-1a-1M-1L")).14($("<17>").V("L-1a-1M-2T")))).14(8.4j=$("<17>").V("L-1O L-1O-1P").14($("<17>").V("L-1O-1L")).14($("<17>").V("L-1O-2T"))),1u.1T&&7>=1u.1T&&8.23.1G(8.2A).1G(8.4j).1c(),8.4j.1k("1K",$.11(K(i){i.3k(),Q.1c()},8)),8.23.1k("1K",$.11(K(i){Q.1B(),8.2u(i)},8)),8.2A.1k("1K",$.11(K(i){Q.1z(),8.2u(i)},8))},3h:K(){8.3l()},2Z:K(){8.3T()},53:K(){Q.1Y.2x("1s-1P"),8.4I=-1,8.4J=-1,8.2c=-1,8.aF(),8.3G()},aF:K(){N i=8.23.1G(8.2A);i.2a(!0).59("3e")},3l:K(){8.2V||(8.3T(),Q.2h.1k("5f",".L-2b",8.2V=$.11(8.5g,8)),B.1U||(Q.R.1k("2G",8.4k=$.11(8.1d,8)).1k("2H",8.76=$.11(8.1c,8)),Q.R.1k("2F",8.77=$.11(K(i){N e=i.4g,t=i.5V;8.4l||t==8.4J&&e==8.4I||(8.4I=e,8.4J=t,8.1d(),8.3H())},8)),Q.2h.1k("2F",".L-2b",8.4m=$.11(8.2u,8)).1k("2H",".L-2b",8.5h=$.11(8.3G,8)).1k("2G",".L-2b",8.5i=$.11(8.5j,8)),Q.R.1k("2G",".L-1a",8.5k=$.11(8.5l,8)).1k("2H",".L-1a",8.5m=$.11(8.5n,8)),$(1l).1k("3B",8.5o=$.11(8.4d,8))))},3T:K(){8.2V&&(Q.2h.1t("5f",".L-2b",8.2V),8.2V=1o,8.4k&&(Q.R.1t("2G",8.4k).1t("2H",8.76).1t("2F",8.77),Q.2h.1t("2F",".L-2b",8.4m).1t("2H",".L-2b",8.5h).1t("2G",".L-2b",8.5i),Q.R.1t("2G",".L-1a",8.5k).1t("2H",".L-1a",8.5m),$(1l).1t("3B",8.5o),8.4k=1o))},4A:K(i,e){N t=1b.1i;15(!t){Y i&&i(),1q 0}N s=Q.R.31(":1V");s||Q.R.1d();N n=8.23.2P("3e");8.23.59("3e");N o=2w(8.23.1f("2E-1p"));8.23.2P({3e:n}),s||Q.R.1c();N a=t.3P||0,h=8.23.1G(8.2A),r={"2E-1p":o-0.5*a},d="2X"==$.1e(e)?e:1b.1i&&1b.1i.13.19.1Q.1g.1d||0;8.6A&&(d=0),h.2a(!0).az(r,d,i),8.23[(Q.6C()?"1F":"1G")+"2U"]("L-1a-3b"),8.2A[(Q.6E()?"1F":"1G")+"2U"]("L-1a-3b"),h[(2>t.2R?"1G":"1F")+"2U"]("L-1a-3R"),i&&i()},4d:K(){8.2c=$(1l).5p()},2u:K(i){15(!B.1U){N e=8.3i(i),t=2v.3c.3y(e),s=e?Q["5q"+t]():!1;15(e!=8.2m||s!=8.3j){3a(8.2m=e,8.3j=s,Q.1W[(s?"1G":"1F")+"2U"]("L-1I-4n"),e){1J"1B":Q.1W.V("L-1I-1B").1H("L-1I-1z");3s;1J"1z":Q.1W.V("L-1I-1z").1H("L-1I-1B")}}}},3G:K(){Q.1W.1H("L-1I-4n L-1I-1B L-1I-1z"),8.2m=!1},5g:K(i){15(!(i.8w>1)){15(1==1b.1S.1y){Y Q.1c(),1q 0}N e=8.3i(i);Q[e](),8.2u(i)}},5j:K(i){8.2u(i)},3i:K(i){N e=(8.2c>-1?8.2c:8.2c=$(1l).5p(),i.4g-Q.3N.1r-8.2c),t=Q.1Z.U;Y 0.5*t>e?"1B":"1z"},5l:K(i){8.4l=!0,8.2m=8.3i(i),8.3j=Q["5q"+2v.3c.3y(8.2m)](),8.4o()},5n:K(){8.4l=!1,8.2m=!1,8.3j=!1,8.3H()},1d:K(i){Y 8.2D?(8.3H(),"K"==$.1e(i)&&i(),1q 0):(8.2D=!0,8.3H(),Q.R.V("L-1V-1P-1s").1H("L-3R-1P-1s"),1u.1T&&7>=1u.1T&&8.23.1G(8.2A).1G(8.4j).1d(),"K"==$.1e(i)&&i(),1q 0)},1c:K(i){N e=1b.1i&&1b.1i.13.1e;Y!8.2D||e&&("3n"==e||"2K"==e)?("K"==$.1e(i)&&i(),1q 0):(8.2D=!1,Q.R.1H("L-1V-1P-1s").V("L-3R-1P-1s"),"K"==$.1e(i)&&i(),1q 0)},4o:K(){B.1U||Q.1Y.2x("1s-1P")},3H:K(){B.1U||(8.4o(),Q.1Y.2q("1s-1P",$.11(K(){8.1c()},8),Q.13?Q.13.19.7I:0))}},J.1R={1C:K(){},3h:K(){8.3l()},2Z:K(){8.3T()},3l:K(){8.2V||(8.3T(),Q.2h.1k("5f",".L-1g",8.2V=$.11(8.5g,8)),Q.2h.1k("1K",".L-1g .L-1O",$.11(K(i){i.3k(),Q.1c()},8)).1k("1K",".L-1g .L-1a-1B",$.11(K(i){Q.1B(),8.2u(i)},8)).1k("1K",".L-1g .L-1a-1z",$.11(K(i){Q.1z(),8.2u(i)},8)),Q.R.1k("1K",".L-2b, .L-1h, .L-1h-34",8.78=$.11(8.79,8)),B.1U||(Q.R.1k("2G",".L-1g",8.4k=$.11(8.1d,8)).1k("2H",".L-1g",8.76=$.11(8.1c,8)),Q.R.1k("2F",".L-1g",8.77=$.11(K(i){N e=i.4g,t=i.5V;8.4l||t==8.4J&&e==8.4I||(8.4I=e,8.4J=t,8.1d(),8.3H())},8)),Q.2h.1k("2F",".L-2S, .L-1O",$.11(K(i){i.3W(),8.3G(i)},8)),Q.2h.1k("2F",".L-2S",$.11(K(){8.4o()},8)),Q.2h.1k("2F",".L-1g",8.4m=$.11(8.2u,8)).1k("2H",".L-1g",8.5h=$.11(8.3G,8)).1k("2G",".L-1g",8.5i=$.11(8.5j,8)),Q.R.1k("2G",".L-1a",8.5k=$.11(8.5l,8)).1k("2H",".L-1a",8.5m=$.11(8.5n,8)),$(1l).1k("3B",8.5o=$.11(8.4d,8))))},3T:K(){8.2V&&(Q.2h.1t("5f",".L-1g",8.2V),8.2V=1o,Q.2h.1t("1K",".L-1g .L-1O").1t("1K",".L-1g .L-1a-1B").1t("1K",".L-1g .L-1a-1z"),Q.R.1t("1K",".L-2b, .L-1h, .L-1h-34",8.78),8.4k&&(Q.R.1t("2G",".L-1g",8.4k).1t("2H",".L-1g",8.76).1t("2F",".L-1g",8.77),Q.2h.1t("2F",".L-2S, .L-1O"),Q.2h.1t("2F",".L-2S"),Q.2h.1t("2F",".L-1g-R",8.4m).1t("2H",".L-1g",8.5h).1t("2G",".L-1g",8.5i),Q.R.1t("2G",".L-1a",8.5k).1t("2H",".L-1a",8.5m),$(1l).1t("3B",8.5o),8.4k=1o))},53:K(){Q.1Y.2x("1s-1P"),8.4I=-1,8.4J=-1,8.2c=-1,8.2m=!1,8.3G()},4A:K(i){i&&i()},4d:K(){8.2c=$(1l).5p()},79:K(i){N e=1b.1i;e&&e.13.19.29&&!e.13.19.29.1O||$(i.4s).31(".L-2b, .L-1h, .L-1h-34")&&(i.3k(),i.3W(),Q.1c())},2u:K(i){15(!B.1U){N e=8.3i(i),t=2v.3c.3y(e),s=e?Q["5q"+t]():!1;15((1==1b.1S.1y||1b.1i&&"1O"==1b.1i.13.19.5H)&&(e=!1),e!=8.2m||s!=8.3j){15(8.2m=e,8.3j=s,e){3a(Q.1W[(s?"1G":"1F")+"2U"]("L-1I-4n"),e){1J"1B":Q.1W.V("L-1I-1B").1H("L-1I-1z");3s;1J"1z":Q.1W.V("L-1I-1z").1H("L-1I-1B")}}26{Q.1W.1H("L-1I-4n L-1I-1B L-1I-1z")}}}},3G:K(){Q.1W.1H("L-1I-4n L-1I-1B L-1I-1z"),8.2m=!1},5g:K(i){15(!(i.8w>1)&&$(i.4s).31(J.8u)){15(1==1b.1S.1y||1b.1i&&"1O"==1b.1i.13.19.5H){Y Q.1c(),1q 0}N e=8.3i(i);Q[e](),8.2u(i)}},5j:K(i){8.2u(i)},3i:K(i){N e=(8.2c>-1?8.2c:8.2c=$(1l).5p(),i.4g-Q.3N.1r-8.2c),t=Q.1Z.U;Y 0.5*t>e?"1B":"1z"},5l:K(i){8.4l=!0,8.2m=8.3i(i),8.3j=Q["5q"+2v.3c.3y(8.2m)](),8.4o()},5n:K(){8.4l=!1,8.2m=!1,8.3j=!1,8.3H()},1d:K(i){Y 8.2D?(8.3H(),"K"==$.1e(i)&&i(),1q 0):(8.2D=!0,8.3H(),Q.R.V("L-1V-1R-1s").1H("L-3R-1R-1s"),"K"==$.1e(i)&&i(),1q 0)},1c:K(i){Y 8.2D?(8.2D=!1,Q.R.1H("L-1V-1R-1s").V("L-3R-1R-1s"),"K"==$.1e(i)&&i(),1q 0):("K"==$.1e(i)&&i(),1q 0)},4o:K(){B.1U||Q.1Y.2x("1s-1R")},3H:K(){B.1U||(8.4o(),Q.1Y.2q("1s-1R",$.11(K(){8.1c()},8),Q.13?Q.13.19.7I:0))}},J.2y={1C:K(){8.3g(),8.2c=-1},3g:K(){Q.1W.14(8.23=$("<17>").V("L-1a L-1a-1B L-1a-1B-2y").14($("<17>").V("L-1a-1M").14($("<17>").V("L-1a-1M-1L")).14($("<17>").V("L-1a-1M-2T")))).14(8.2A=$("<17>").V("L-1a L-1a-1z L-1a-1z-2y").14($("<17>").V("L-1a-1M").14($("<17>").V("L-1a-1M-1L")).14($("<17>").V("L-1a-1M-2T")))).14(8.4j=$("<17>").V("L-1O L-1O-2y").14($("<17>").V("L-1O-1L")).14($("<17>").V("L-1O-2T"))),1u.1T&&7>=1u.1T&&8.23.1G(8.2A).1G(8.4j).1c(),8.4j.1k("1K",$.11(K(i){i.3k(),Q.1c()},8)),8.23.1k("1K",$.11(K(i){Q.1B(),8.2u(i)},8)),8.2A.1k("1K",$.11(K(i){Q.1z(),8.2u(i)},8))},3h:K(){8.3l()},2Z:K(){8.3T()},53:K(){Q.1Y.2x("1s-2y"),8.4I=-1,8.4J=-1,8.2c=-1,8.3G()},3l:K(){8.2V||(8.3T(),Q.R.1k("5f",".L-1g",8.2V=$.11(8.5g,8)),Q.R.1k("1K",".L-2b, .L-1h, .L-1h-34",8.78=$.11(8.79,8)),B.1U||(Q.2h.1k("2F",".L-1g",8.4m=$.11(8.2u,8)).1k("2H",".L-1g",8.5h=$.11(8.3G,8)).1k("2G",".L-1g",8.5i=$.11(8.5j,8)),Q.R.1k("2G",".L-1a",8.5k=$.11(8.5l,8)).1k("2H",".L-1a",8.5m=$.11(8.5n,8)),$(1l).1k("3B",8.5o=$.11(8.4d,8))))},3T:K(){8.2V&&(Q.R.1t("5f",".L-1g",8.2V),8.2V=1o,Q.R.1t("1K",".L-2b, .L-1h, .L-1h-34",8.78),8.4m&&(Q.2h.1t("2F",".L-1g",8.4m).1t("2H",".L-1g",8.5h).1t("2G",".L-1g",8.5i),Q.R.1t("2G",".L-1a",8.5k).1t("2H",".L-1a",8.5m),$(1l).1t("3B",8.5o),8.4m=1o))},4A:K(i){N e=1b.1i;15(!e){Y i&&i(),1q 0}N t=8.23.1G(8.2A);8.23[(Q.6C()?"1F":"1G")+"2U"]("L-1a-3b"),8.2A[(Q.6E()?"1F":"1G")+"2U"]("L-1a-3b"),t[(2>e.2R?"1G":"1F")+"2U"]("L-1a-3R"),i&&i()},4d:K(){8.2c=$(1l).5p()},79:K(i){N e=1b.1i;e&&e.13.19.29&&!e.13.19.29.1O||$(i.4s).31(".L-2b, .L-1h, .L-1h-34")&&(i.3k(),i.3W(),Q.1c())},2u:K(i){15(!B.1U){N e=8.3i(i),t=2v.3c.3y(e),s=e?Q["5q"+t]():!1;15((1==1b.1S.1y||1b.1i&&"1O"==1b.1i.13.19.5H)&&(e=!1),e!=8.2m||s!=8.3j){15(8.2m=e,8.3j=s,e){3a(Q.1W[(s?"1G":"1F")+"2U"]("L-1I-4n"),e){1J"1B":Q.1W.V("L-1I-1B").1H("L-1I-1z");3s;1J"1z":Q.1W.V("L-1I-1z").1H("L-1I-1B")}}26{Q.1W.1H("L-1I-4n L-1I-1B L-1I-1z")}}}},3G:K(){Q.1W.1H("L-1I-4n L-1I-1B L-1I-1z"),8.2m=!1},5g:K(i){15(!(i.8w>1)&&$(i.4s).31(J.8u)){15(1==1b.1S.1y||1b.1i&&"1O"==1b.1i.13.19.5H){Y Q.1c(),1q 0}N e=8.3i(i);Q[e](),8.2u(i)}},5j:K(i){8.2u(i)},3i:K(i){N e=(8.2c>-1?8.2c:8.2c=$(1l).5p(),i.4g-Q.3N.1r-8.2c),t=Q.1Z.U;Y 0.5*t>e?"1B":"1z"},1d:K(){1u.1T&&7>=1u.1T&&8.23.1G(8.2A).1G(8.4j).1d()},1c:K(){},5l:K(i){8.4l=!0,8.2m=8.3i(i),8.3j=Q["5q"+2v.3c.3y(8.2m)]()},5n:K(){8.4l=!1,8.2m=!1,8.3j=!1},4o:K(){}},$(25).66(K(){5d.1C()}),q});',62,800,'||||||||this||||||||||||||||||||||||||||||||||||||function|fr||var|||Window|element|||width|addClass||height|return|||proxy||view|append|if||div||options|side|Pages|hide|show|type|css|content|thumbnails|page|Math|on|window|extend|thumbnail|null|top|void|left|ui|off|Browser|each|position|url|length|next|_position|previous|initialize|_ui|caption|remove|add|removeClass|hovering|case|click|background|button|_vars|close|fullclick|effects|inside|pages|IE|mobileTouch|visible|_box|for|timers|_boxDimensions||116|105|_previous|data|document|else||cache|overlay|stop|container|_scrollLeft||arguments|image|skin|_pages|101|_m|stroke|thumbnailFrame|_hoveringSide|fresco|max|100|set|_thumbnails|enabled|111|_onMouseMove|_|parseInt|clear|outside|queue|_next|img|color|_visible|margin|mousemove|mouseenter|mouseleave|error|abort|vimeo|load|spinner|114|110|attr|115|_total|info|icon|Class|_onMouseUpHandler|naturalWidth|number|push|disable||is|||wrapper|round|||new||switch|disabled|String|min|style|dimensions|build|enable|_getEventSide|_mayClickHoveringSide|preventDefault|bind|opacity|youtube|overflow|horizontal|_tracking|_orientation|break|109|112|_i|bottom|indexOf|capitalize|charAt|detach|scroll|views|108|102|_dimensions|_onMouseLeave|startTimer|apply|prototype|setTimeout|right|_attached|_boxPosition|104|_infoHeight|sides|hidden|_page|unbind|_slice|call|stopPropagation|_delay|html|_timers|||_xhr|keyboard|Overlay||||||attach|fadeTo|queues|_onScroll|uid|loading|pageX|_disabled|ipp|_close|_showHandler|_hoveringSideButton|_onMouseMoveHandler|clickable|clearTimer|Android|documentElement|isElement|target|within|isVideo|com|id|defaults|loop|setSkin|adjustPrevNext|setPosition|103|has|previousInside|toggle|href|_getInfoHeight|_x|_y|string|View|WebKit|split|_ipos|src|clearTimeout|detect|location|callback|slide|create|overlap|body|no|_skin||resize||reset|||121|count||removeAttr|playerIframe|_whileVisible|group|_Fresco|_loading|mouseup|_onMouseUp|_onMouseLeaveHandler|_onMouseEnterHandler|_onMouseEnter|_onSideMouseEnterHandler|_onSideMouseEnter|_onSideMouseLeaveHandler|_onSideMouseLeave|_onScrollHandler|scrollLeft|may|getURIData|viewport|MobileSafari|120|mousewheel|svg|successCallback|errorCallback|method|intervals|hex2fill|Canvas|radius|moveTo|get|extension|onClick|preload|initialTypeOptions|maxWidth|maxHeight|_first|Fire|_showingType|_onWindowResizeHandler|keyCode|118|check|vertical|padding|pageY|_handleTracking|_delegateHandler|_dgo|_thumbs|_slide|||_mode|ceil|thumbnailWrapper|ready|_url|_modes|detectExtension|exec|parseFloat|IEMobile|originalEvent|in|substr|join|canvas|getContext|touch|onload|success|_time|_polling|naturalHeight|substring|arc|delete|zA|150|boolean|measured|showing|_onWindowResize|adjustToScroll|center|opening|_show|mayPrevious|getSurroundingIndexes|mayNext|_onKeyUpHandler|vz|_fullClick|span|text|grouped|infoInside|preloading|loaded|preloadReady|_spinnerDelay|imageReady|_markAsLoaded|setDimensions|_track|px|_noOverflow|setXY|_tracking_timer|_data|supported|thumbs|marginLeft|marginRight|vimeoThumbnail|_clearDelay|_load|_hideHandler|_mousemoveHandler|_delegateOverlayCloseHandler|_delegateOverlayClose|define|Timers|replace|Thumbnail|version|Skins|Gecko|Opera|opera|Chrome|Array|slice|toUpperCase|PI|animation|transform|http|test|supports|pollFallbackAfter|poll|fallback|_fallbackImg|180|expand|Z0|api|Options|300|delay|esc|loadedMethod|spinnerDelay|sync|uiDelay|fadeOut|getScrollDimensions|video|fitToViewport|updateBoxDimensions|fitToBox|Keyboard|removeAll|_onKeyDownHandler|getKeyByKeyCode|_shown|removeStyle|119|find|showhide|clone|infoPadder|nextInside|infoPadderInside|positionInside|preloaded|outerWidth|outerHeight|_abortSpinnerDelay|updateUI|hideInactive|removeVideo|removeTracking|vimeoReady|_positionOutside|updatePositions|eval|updateDimensions|delegate|_setClickXYHandler|setClickXY|showFallback|firstUI|_slider|setActive|_disabledGroup|updateVars|inner|moveToPage|active|_loaded|_error|_validClickTargetSelector|_enabled|which|typeof|jQuery|Fresco|baseToString|Types|match|toLowerCase|RegExp|AppleWebKit|ChromeMobile|CrMo|navigator|nodeType|wheelDelta|detail|frescoEaseInCubic|prefix|createElement|createElementNS|2000|DocumentTouch|detectMobileTouch|Image|isLoaded|1000|undefined|_usedPollFallback|_calledSuccess|_calledError||red|green|blue|000||fff||||init|drawRoundedRectangle|fillRect|x1|y1|x2|y2|dPA|fillStyle|absolute|clearAll|extensions|youtu|vi|VimeoThumbnail|https|protocol|getJSON|oembed|json|thumbnail_url|autoplay|1280|mobile|533|setShowingType|startObservingResize|orientationchange|stopObservingResize|update|scrollTop|getBoxDimensions|getDimensions|_hide|_reset|stopHideQueue|keydown|onKeyDown|keyup|onKeyUp|117|vis|vb|imp|random|_to|addStyle|Page|_created|padder|pos|closeInside|posInside|captionInside|_getSurroundingPages|preloadSurroundingImages|prepend|raise|stopInactive|hasClass|visibility|updateForced|_contentDimensions|_backgroundDimensions|auto|getXYP|getPositionInActivePageGroup|handleTracking|clearTrackingTimer|startTracking|stopTracking|isTracking|_xy|setXYP|_xyp|spin|_fallback|startDelegating|object_type|array|startObserving|_previous_button|_next_button|previousPage|nextPage|setOrientation|floor|animate|loadCurrentPage|activate|preBuild|_removed|fadeInSpinner|resetPrevNext|amd|jquery|clientWidth|innerWidth|innerHeight|attachEvent|MSIE|KHTML|rv|Apple|Mobile|Safari|userAgent|Event|trigger|isPropagationStopped|isDefaultPrevented|DOMMouseScroll|easing|frescoEaseInSine|cos|frescoEaseOutSine|sin|Webkit|Moz|ms|Khtml|prefixed|www|w3|org|createSVGRect|try|ontouchstart||instanceof|catch|Win|Mac|Linux|platform|complete|4000|20000|500|onerror|rgba|255|360|hue|saturation|brightness|0123456789abcdef|hex2rgb|getSaturatedBW|mergedCorner|beginPath|closePath|fill|createFillStyle|toFixed|isArray|Gradient|addColorStops|createLinearGradient|05|bmp|gif|jpeg|jpg|png|webp|inArray|watch|embed|VimeoReady|440|3000|title|byline|portrait|controls|enablejsapi|hd|iv_load_policy|modestbranding|rel|vq|hd1080|720|offset|box|ltIE|closing|fromCharCode|toString|em|106|4200|0000099999909999009999900999000999000999|00000900000090009090000090009090009090009|00000900000090009090000090000090000090009|00000999990099990099990009990090000090009|00000900000090900090000000009090000090009|00000900000090090090000090009090009090009|0000090000009000909999900999000999000999000000|rs|900|107|123|125|positionOutside|lastChild|about|blank|removed|fullClick|none|display|_padding|Tracking|getLoadingCount|setTracking|clearTracking|grep|stopDelegating|currentTarget|object|filter|slider|closest|paddingTop|refresh|_dimension|frame|border|state|0001'.split('|'),0,{}));

