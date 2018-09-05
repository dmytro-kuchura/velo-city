/*
	wBasket v2.9 / core js file
	WEZOM Studio / Oleg Dutchenko
*/

if (window.wBasket) {
	console.error('\nповторное подключение wBasket.js\n ');
} else {

window.wBasket = (function($) {

	/* Declare */
		var wb,
			DBG,
			_proto,
			_config,
			_events,
			_instance,
			_callbacks,
			_structure,
			Proto = function(){},
			Methods = function(){},
			arrayAttrs = ['for', 'onchange', 'onclick', 'selected', 'checked'];
			arrayKeys = [35,36,37,39];
			arrayCurrAttr = ['checked', 'selected'];

	/* Private */
		var _inArray = function(key, array, bool) {
				var flag = bool;
				for (var i = 0; i < array.length; i++) {
					if (key === array[i]) {
						flag = !flag;
						break;
					}
				}
				return flag;
			},

			_isJQ = function(curEl) {
				var el = (curEl.jquery) ? curEl : $(curEl);
				return el;
			},

			_applyCallback = function(name, data) {
				_callbacks[name].apply(wb, $.isArray(data) ? data : [data]);
			},

			_notNull = function(object) {
				var flag = object+'' != 'null';
				return flag;
			},

			_isObject = function(object) {
				var flag = (typeof object == 'object' && _notNull(object));
				return flag;
			},

			_isString = function(string){
				var flag = typeof string == 'string';
				if (flag) {
					flag = !!string.length;
				}
				return flag;
			},

			_nodeName = function(element) {
				var el = (element.jquery) ? element[0] : element;
				var name = el.nodeName.toLowerCase();
				return name;
			}

			_makeUpper = function(key) {
				var string = key.charAt(0).toUpperCase() + key.slice(1);
				return string;
			};

	/* Proto */
		Proto.prototype = {
			debugg:function(){},

			jqEl: function(tagName, tagClasses, tagId, propsData) {
				var tag = tagName || 'div';
				var element = document.createElement(tag);
				if (tagClasses) {
					var classes = tagClasses.split(' ');
					for (var i = 0; i < classes.length; i++) {
						element.classList.add(classes[i]);
					}
				}
				if (tagId) {
					element.id = tagId;
				}
				if (propsData) {
					if (tagName == 'input') {
						element.name = propsData.name;
					}
					delete propsData.name;
					for (var key in propsData) {
						if (key != _config.groupParseProps) {
							var val = propsData[key];
							if (_inArray(key, arrayAttrs, false) || (key.slice(0,5) === 'data-')) {
								element.setAttribute(key, val);
							} else {
								element[key] = val;
							}
						}
					}
				}
				return $(element);
			},

			allowKeyCode: function(code) {
				var flag = _inArray(code, arrayKeys, true);
				return flag;
			},

			isReDraw: function() {
				var flag = (_instance.doing === _config.doingRedraw);
				return flag;
			},

			isInput: function(element) {
				var nodeEl = element;
				if (element.jquery) {
					nodeEl = element[0];
				}
				var flag = (nodeEl.nodeName.toLowerCase() === 'input');
				return flag;
			},

			selectorEl: function(key) {
				var obj = _structure[key];
				var str = '.'+obj.classSelector;
				return str;
			},

			findResponse: function(key, index) {
				var brunch = _instance.response[key];
				if (typeof index == 'number') {
					brunch = brunch[index];
				}
				return brunch;
			},

			findStrc: function(key, innerKey) {
				var strct = _structure[key];
				if (innerKey) {
					strct = strct[innerKey];
				}
				return strct;
			},

			findBrunch: function(key, innerKey) {
				var brunch = _instance.structure[key];
				if (innerKey) {
					brunch = brunch[innerKey];
				}
				return brunch;
			},

			findEl: function(key, innerKey) {
				var element = _proto.findBrunch(key, innerKey).element;
				if (element.length) {
					return element;
				} else {
					return false;
				}
			},

			getThisItem: function(currentElement) {
				var element = _isJQ(currentElement);
				var itemSelector = '.'+_proto.findStrc('item', 'classSelector');
				var item = element.closest(itemSelector);
				return item;
			},

			getThisBasket: function(currentElement) {
				var element = _isJQ(currentElement);
				var itemSelector = '.'+_proto.findStrc('basket', 'classSelector');
				var item = element.closest(itemSelector);
				return item;
			},

			canEdit: function(item, set) {
				var flag;
				if (_instance.edit) {
					flag = (_instance.edit === item.prop('id'));
				} else {
					flag = true;
				}
				if (flag && !set) {
					_proto.setEdit(item);
				}
				return flag;
			},

			toggleEdit: function(item, toggle) {
				var basket = _proto.getThisBasket(item);
				item[toggle+'Class'](_config.prefixName+_config.suffixItemEdit);
				basket[toggle+'Class'](_config.prefixName+_config.suffixBasketEdit);
			},

			setEdit: function(item) {
				_proto.toggleEdit(item, 'add');
				_instance.edit = item.prop('id');
			},

			unsetEdit: function(item) {
				_proto.toggleEdit(item, 'remove');
				_instance.edit = false;
			},

			setEditedData: function(item, data) {
				var object = item.data(_config.dataEditName) || {};
				$.extend(true, object, data);
				item.data(_config.dataEditName, object);
			},

			prepareEditCallback: function(item) {
				var iD = item.prop('id');
				var data = _proto.getItemData(iD);
				_proto.runCallback('onEdit', [iD, item, data, item.data(_config.dataEditName)]);
			},

			readInitialize: function(object) {
				for (var key in object) {
					if (typeof object[key] === 'function') {
						object[key]();
					}
				}
			},

			structureElement: function(key, iD) {
				if (_structure.hasOwnProperty(key)) {
					var obj = _structure[key];
					var classes = obj.classSelector;
					classes += ' ' + _config.prefixName + key;
					if (_isString(obj.classCss)) {
						classes += ' ' + obj.classCss;
					}
					if (key != 'item' && _instance.doing === _config.doingRedraw) {
						var element = _instance.structure[key].element;
						if (key != 'preloader') {
							element.removeAttr('class');
							element.addClass(classes);
							if (iD) {
								element.removeAttr('id');
								element.prop('id', iD);
							}
						}
						if (obj.reDrawThis) {
							element.html('');
						}
						return element;
					} else {
						var tag = obj.element || 'div';
						var element = _proto.jqEl(tag, classes, iD);
						if (!_instance.structure) {
							_instance.structure = {};
						}
						if (!_instance.structure.hasOwnProperty(key)) {
							_instance.structure[key] = {};
						}
						if (key != 'item') {
							_instance.structure[key].element = element;
						}
						return element;
					}
				}
			},

			parseElements: function(value, string) {
                var array = [value, value.slice(2,-2), string.indexOf(value), value.length];
                array.push(array[2] + array[3]);
                return array;
            },

            readElements: function(markup, data) {
                var code = /\[\[(.*?)\]\]/g;
                var matchCode = markup.match(code);
                if (!!matchCode) {
                    for (var i = 0; i < matchCode.length; i++) {
                        if (!(i % 2)) {
                            var start = _proto.parseElements(matchCode[i], markup);
                            var end = _proto.parseElements(matchCode[i+1], markup);
                            var part = markup.split(markup.slice(start[2], end[4]));
                            if (data.hasOwnProperty(start[1])) {
                                var inner = markup.slice(start[4], end[2]);
                                markup = part[0] + inner + part[1];
                            } else {
                                markup = part.join('');
                            }
                        }
                    }
                }
                return markup;
            },

            readGroups: function(markup, data, key, index) {
            	var string = markup;
				var groups = _proto.findStrc(key, 'groups');
				if (groups) {
					var i = 0;
					for (var group in groups) {
						var pattern = _config.groupRegex+group+'#';
						if (!!markup.match(pattern)) {
							var groupData = groups[group];
							var replacePattern = _proto.buildGroup(groupData, group, index, data);
							string = string.replace(pattern, replacePattern);	
						}
					}
				}
				return string;
            },

			readMarkup: function(key, data, index, setString) {
				var brackets = ['%%','%%'];
				var markup;
				if (setString) {
					markup = setString;
				} else {
					markup = _proto.findStrc(key).markup;
				}
				if (markup) {
					markup = _proto.readElements(markup, data);
					if (!setString) {
						markup = _proto.readGroups(markup, data, key, index);
					}
					function matchIt(k) {
						if (!!markup.match(brackets[0] + k + brackets[1])) {
							markup = markup.replace(brackets[0] + k + brackets[1], data[k]);
						}
						if (!!markup.match(brackets[0] + k + brackets[1])) {
							matchIt(k);
						}
					}
					for (var k in data) {
						matchIt(k);
					}
				} else {
					markup = '';
				}
				return markup;
			},

			setMarkup: function(key, dataRead, innerKey, index) {
				var element = _proto.findEl(key, innerKey);
				var data = _proto.findStrc(key);
				var replace = dataRead || {};
				if (data.hasOwnProperty('markup')) {
					var markup = _proto.readMarkup(key, replace, index);
					element.html(markup);
				}
			},

			getItemData: function(iD) {
				var list = _proto.findResponse(_config.listName);
				var data = null;
				for (var index in list) {
					if (list[index][_config.unicName] == iD) {
						data = list[index];
					}
				}
				return data;
			},

			buildBaseElement: function(key, selector, baseElement) {
				if (_structure.hasOwnProperty(key)) {
					var element = baseElement;
					var data = _structure[key];
					var buildName = 'build' + _makeUpper(key);
					if (_proto.hasOwnProperty(buildName)) {
						DBG(this, buildName);
						var block = _proto[buildName](key, selector);
						if (key != 'item') {
							DBG(201, key, _proto.findEl(key));
						}
						if (key == 'item') {
							element = _proto.findEl('basket');
							data.appendto = _proto.selectorEl('list');
						} else if (!_isString(data.appendto)) {
							data.appendto = selector;
						}
						if (data.appendto === '.'+_structure.basket.classSelector) {
							element.append(block);
						} else {
							element.find(data.appendto).append(block);
						}
					}
				}
			},

			buildBasket: function() {
				var basketWraper = _proto.structureElement('basket');
				var baseSelector = '.'+_structure.basket.classSelector;
				//var baseElement = _proto.findEl('basket');
				_proto.setMarkup('basket');
				_proto.buildBaseElement('header', baseSelector, basketWraper);
				_proto.buildBaseElement('list', baseSelector, basketWraper);
				_proto.buildItems();
				_proto.buildBaseElement('footer', baseSelector, basketWraper);
				_proto.buildBaseElement('preloader', baseSelector, basketWraper);
				return basketWraper;
			},

			buildHeader: function(key) {
				var block = _proto.structureElement(key);
				var action = _instance.action;
				_proto.setMarkup(key, {headtitle: _config.headtitle[action]});
				return block;
			},

			buildFooter: function(key, selector) {
				var block = _proto.structureElement(key);
				var data = _proto.findResponse(_config.totalsName);
				_proto.setMarkup(key, data);
				return block;
			},

			buildPreloader: function(key) {
				var block = _proto.structureElement(key);
				_proto.setMarkup(key);
				return block;
			},

			buildList: function(key) {
				var block = _proto.structureElement(key);
				_proto.setMarkup(key);
				return block;
			},

			buildItems: function() {
				var data = _proto.findResponse(_config.listName);
				for (var i = 0; i < data.length; i++) {
					_proto.buildBaseElement('item', i);
				}
			},

			buildItem: function(key, index) {
				var data = _proto.findResponse(_config.listName, index);
				var iD = data[_config.unicName];
				var block = _proto.structureElement(key, iD);
				var brunch = _proto.findBrunch(key);
				brunch[iD] = null;
				brunch[iD] = $.extend(true, data, {element: block});
				_proto.setMarkup(key, data, iD, index);
				DBG(201, key, _proto.findEl(key, iD));
				return block;
			},

			buildGroup: function(dataEl, group, index, itemData) {
				var result;
				var array = [];
				var data = _proto.findResponse(_config.listName, index)[group];
				for (var i = 0; i < data.length; i++) {
					var props = $.extend(true, data[i], dataEl);
					props.name = group;
					propsClasses = _config.prefixName+'group';
					propsClasses += ' '+propsClasses+'_'+group;
					props['data-group'] = group;
					props.name += '['+index+']';
					var classes = props.classCss;
					if (classes) {
						classes += ' '+propsClasses;
						delete props.classCss;
					} else {
						classes = propsClasses;
					}
					if (dataEl.element == 'option') {
						itemData['select_'+group] = 'class="'+classes+'" name="'+props.name+'" data-group="'+group+'"';
						classes = false;
						delete props.name;
						delete props['data-group'];
					}
					delete props.markup;
					delete props.element;
					var iD = props.id;
					if (iD) {
						delete props.id;
					}
					if (dataEl.element == 'option') {
						iD = undefined;
					}
					var element = _proto.jqEl(dataEl.element, classes, iD, props);
					for (var j = 0; j < arrayCurrAttr.length; j++) {
						var curr = arrayCurrAttr[j];
						if (props.hasOwnProperty(curr)) {
							itemData[group+_config.groupOldValue] = props.value;
							delete props[curr];
						}
					}
					var val = dataEl.markup.replace(_config.groupPattern, element[0].outerHTML);
					var parseProps = data[i][_config.groupParseProps] || {};
					val = _proto.readMarkup(false, parseProps, index, val);
					array.push(val);
				};
				return array.join('\n');
			},

			runCallback: function(name, data) {
				if (_callbacks.hasOwnProperty(name)) {
					var arrData;
					var arrInstance = [_instance];
					if (data) {
						arrData = arrInstance.concat(data);
					} else {
						arrData = arrInstance;
					}
					DBG(203, name);
					_applyCallback(name, arrData);
				} else {
					DBG(103, name);
				}
			},

			clearInstance: function(addToRead) {
				var obj = addToRead || {};
				function ifHas_Set(name) {
					if (obj.hasOwnProperty(name)) {
						_instance[name] = obj[name];
					}
				}
				_instance.edit = false;
				_instance.timer = null;
				_instance.response = {};
				_instance.doing = _config.doingDraw;
				ifHas_Set('doing');
				ifHas_Set('action');
			}
		}

	/* Methods */
		Methods.prototype = {
			Config: function(options) {
				if (typeof options == 'object') {
					$.extend(true, _config, options)
				}
			},

			Callbacks: function(options) {
				if (typeof options == 'object') {
					$.extend(true, _callbacks, options)
				}
			},

			Structure: function(options) {
				if (typeof options == 'object') {
					$.extend(true, _structure, options)
				}
			},

			Draw: function() {
				DBG(this,'Draw');
				var basketElement = _proto.buildBasket();
				DBG(202, ' ', basketElement);
				_proto.runCallback('afterDraw');
				wb.Send();
				return basketElement;
			},

			Send: function() {
				_proto.runCallback('beforeSend');
				var totals = _proto.findResponse(_config.totalsName);
				if (_config.sendTo) {
					for (var val in totals) {
						if (_config.sendTo.hasOwnProperty(val)) {
							var array = _config.sendTo[val];
							for (var i = 0; i < array.length; i++) {
								$(array[i]).html(totals[val]);
							}
						}
					}
				}
				_proto.runCallback('afterSend');
			},

			Write: function(drawn, element) {
				DBG(this,'Write');
				var insert = $(element);
				if (insert.length) {
					insert.html(drawn);
				} else {
					DBG(102, element);
				}
				_proto.runCallback('afterWrite');
				wb.Events();
				DBG('endDBG');
			},

			Read: function(responseData, intializeData, startPoint, addToRead) {
				if (startPoint) {
					DBG('startDBG');
				}
				if (_isObject(intializeData)) {
					_proto.readInitialize(intializeData);
				}
				DBG(this, 'Read');
				if (responseData.hasOwnProperty(_config.listName)) {
					_proto.clearInstance(addToRead);
					for (var keyData in responseData) {
						_instance.response[keyData] = responseData[keyData];
					}
					var drawnCart = wb.Draw();
					if (_config.writePage) {
						wb.Write(drawnCart, _config.writeElement);
					} else {
						return drawnCart;
					}
				} else {
					DBG(101, _config.listName);
				}
			},

			ReDraw: function(elementName, newData, iD) {
				_instance.doing = _config.doingRedraw;
				if (elementName === 'all') {
					wb.Read(newData, false, false, {
						action: 'default',
						doing: _config.doingRedraw
					});
				} else {
					$.extend(true, _instance.response, newData);
					_proto['build'+_makeUpper(elementName)](elementName, false);
					if (iD) {
						delete _proto.findBrunch('item')[iD];
						var list = _proto.findResponse(_config.listName);
						var l = 0;
						var a = [];
						for (var i = 0; i < list.length; i++) {
							if (list[i].id == iD) {
								delete list[i];
							} else {
								a.push(list[i]);
							}
						};
						_instance.response.list = a;
						if (a.length === 0) {
							_proto.runCallback('onEmpty');
						}
					}
				}
				setTimeout(function() {
					_proto.runCallback('afterReDraw', [elementName]);
					wb.Send();
				}, _config.delayReDraw);
				
			},

			Init: function(responseData, intializeData) {
				DBG(200);
				DBG('startDBG');
				if (_isObject(intializeData)) {
					_proto.readInitialize(intializeData);
				}
				var block = wb.Read(responseData, undefined, false);
			},

			Events: function(wraperElement, bool) {
				var wraper = wraperElement || _proto.findEl('basket');
				if (bool) {
					_instance.do_flag = true;
				}
				if (_events) {
					for (var key in _events) {
						_events[key](wraper, bool);
					}
				}
			}
		}

	/* wBasket */
		wBasket = $.extend(true, Methods.prototype, {
			debugg: false,
			config: {
				listName: 'list',
				unicName: 'id',
				totalsName: 'totals',
				prefixName: 'wbasket_element_',
				suffixCountChange: 'item_count_change',
				suffixItemEdit: 'item_edit',
				suffixBasketEdit: 'basket_edit',
				groupRegex: '#groups:',
				groupParseProps: 'parseprops',
				groupPattern: '{{element}}',
				groupOldValue: '_valueOld',
				dataEditName: 'edited',
				dataRememberName: 'remember',
				delayReDraw: 200,
				delayCountChange: 1000,
				delayCountKey: 1000,
				doingDraw: 'drawing',
				doingRedraw: 'redrawing',
				eventClick: 'click',
				eventChange: 'change',
				eventKey: 'keyup',
				eventFocus: 'focus',
				writePage: false,
				writeElement: '#insertBasket',
				headtitle: {
					'default': 'Корзина товаров',
					'new': 'Вы добавили товар'
				}
			},
			proto: Proto.prototype,
			callbacks: {},
			structure: {
				basket: {
					classSelector: 'wBasket',
					reDrawThis: false
				},
				header: {reDrawThis: true},
				header: {reDrawThis: true},
				footer: {reDrawThis: true},
				list: {reDrawThis: true},
				item: {reDrawThis: true},
				preloader: {reDrawThis: false}
			},
			dbg: function(){
				_proto.debugg(wb.dbg.arguments);
			},
			instance: {
				edit: false,
				timer: null,
				response: {}
			},
			events: {}
		});

	/* Definition shortcut */
		wb = wBasket;
		DBG = wb.dbg;
		_proto = wb.proto;
		_config = wb.config;
		_events = wb.events;
		_instance = wb.instance;
		_callbacks = wb.callbacks;
		_structure = wb.structure;

	/* Definition events */
		_events.del = function(wraper, bool) {
			var element = _proto.findStrc('item', 'elementDel');
			var itemSelector = '.'+_proto.findStrc('item', 'classSelector');
			wraper.on(_config.eventClick, element, function(event) {
				event.preventDefault();
				var item = _proto.getThisItem(this);
				if (_proto.canEdit(item, true)) {
					var iD = item.prop('id');
					var confirm = _proto.findStrc('item', 'elementConfirm');
					var data = _proto.getItemData(iD);
					_proto.runCallback('beforeDelete', [iD, item, data, item.find(confirm)]);
				} else {
					return false;
				}
			})
		};

		_events.count = function(wraper, bool) {
			var increment = _proto.findStrc('item', 'elementIncrement');
			var decrement = _proto.findStrc('item', 'elementDecrement');
			var amount = _proto.findStrc('item', 'elementAmount');

			function _checkLimits(val, iD, range) {
				var data = _proto.getItemData(iD);
				var max = parseFloat(data.maxcount);
				var min = parseFloat(data.mincount);
				var value = parseFloat(val);
				if (range === 'min') {
					value--;
				} else if (range === 'max') {
					value++;
				}
				if (value >= max) {
					value = max;
				} else if (value <= min) {
					value = min;
				}
				return value;
			}

			function _object(itm, range) {
				var object = [];
				object.item = itm;
				object.input = object.item.find(amount);
				object.value = parseFloat(object.input.val());
				if (isNaN(object.value)) {
					object.value = object.input.data(_config.dataRememberName);
				}
				object.value = _checkLimits(object.value, object.item.prop('id'), range);
				return object;
			}

			function _setValue(object) {
				object.input.val(object.value);
				if (_config.delayCountChange) {
					var className = _config.prefixName+_config.suffixCountChange;
					object.item.addClass(className);
					if (_proto.isInput(object.input)) {
						object.input.prop('disabled', true);
					}
					clearTimeout(_instance.timer);
					_instance.timer = setTimeout(function() {
						object.item.removeClass(className);
						if (_proto.isInput(object.input)) {
							object.input.prop('disabled', false);
						}
						object.input.trigger(_config.eventChange);
					}, _config.delayCountChange);
				} else {
					object.input.trigger(_config.eventChange);
				}
			}

			wraper.on(_config.eventClick, increment, function(event) {
				event.preventDefault();
				var item = _proto.getThisItem(this);
				if (_proto.canEdit(item)) {
					var obj = _object(item, 'max');
					_setValue(obj);
				} else {
					return false;
				}
			});

			wraper.on(_config.eventClick, decrement, function(event) {
				event.preventDefault();
				var item = _proto.getThisItem(this);
				if (_proto.canEdit(item)) {
					var obj = _object(item, 'min');
					_setValue(obj);
				} else {
					return false;
				}
			});

			wraper.on(_config.eventFocus, amount, function(event) {
				var item = _proto.getThisItem(this);
				if (_proto.canEdit(item, true)) {
					$(this).data(_config.dataRememberName, $(this).val());
				} else {
					$(this).trigger('blur');
				}
			});

			wraper.on(_config.eventKey, amount, function(event) {
				var item = _proto.getThisItem(this);
				if (_proto.allowKeyCode(event.keyCode)) {
					if (_proto.canEdit(item)) {
						var ths = $(this);
						clearTimeout(_instance.timer);
						_instance.timer = setTimeout(function() {
							ths.trigger(_config.eventChange);
						}, _config.delayCountKey);
					}
				}
			});

			wraper.on(_config.eventChange, amount, function(event) {
				var item = _proto.getThisItem(this);
				if (_proto.canEdit(item)) {
					var ths = $(this);
					var value = parseFloat(ths.val());
					if (isNaN(value)) {
						value = ths.data(_config.dataRememberName);
					}
					value = _checkLimits(value, item.prop('id'));
					ths.val(value);
					if (value != ths.data(_config.dataRememberName)) {
						_proto.setEditedData(item, {'count': value});
						clearTimeout(_instance.timer);
						_instance.timer = setTimeout(function() {
							ths.data(_config.dataRememberName, value);
							_proto.prepareEditCallback(item);
						}, 150);
					}
				} else {
					$(this).val($(this).data(_config.dataRememberName));
				}
			});
		};

		_events.changeGroup = function(wraper, bool) {
			var groupEl = '.'+_config.prefixName+'group';
			wraper.on(_config.eventChange, groupEl, function(event) {
				var ths = $(this);
				var item = _proto.getThisItem(ths);
				var group = ths.data('group');
				if (_proto.canEdit(item)) {
					var value = $(this).val();
					var data = {};
					data[group] = value;
					_proto.setEditedData(item, data);
					clearTimeout(_instance.timer);
					_proto.prepareEditCallback(item);
				} else {
					var groupElS = item.find(groupEl);
					var node = _nodeName(groupElS);
					console.log(node);
					if (node === 'select') {
						console.log('select');
					} else if (node === 'input') {
						var def = 'defaultValue';
						var type = groupElS[0].type;
						if (type == 'radio' || type == 'checkbox') {
							def = 'defaultChecked';
						}
						groupElS.each(function(i, el) {
							$(el).prop('checked', el[def]);
						});
					}
				}
			});
		};

	return wb;
	
})(jQuery);}