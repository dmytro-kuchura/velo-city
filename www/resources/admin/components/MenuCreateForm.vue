<template>
    <form class="form-horizontal" @submit.prevent="onSubmit">

        <div class="form-group">
            <label class="col-md-2 control-label">Название</label>
            <div class="col-md-10">
                <input type="text" class="form-control" placeholder="Название страницы" v-model="page.name"
                       v-on:blur="createAlias">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">Алиас</label>
            <div class="col-md-10">
                <input type="text" class="form-control" placeholder="Адрес страницы" v-model="page.alias">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">Контент</label>
            <div class="col-md-10">
                <wysiwyg v-model="page.content"/>
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">Title</label>
            <div class="col-md-10">
                <input type="text" class="form-control" placeholder="Title" v-model="page.title">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">H1</label>
            <div class="col-md-10">
                <input type="text" class="form-control" placeholder="H1" v-model="page.h1">
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">Keywords</label>
            <div class="col-md-10">
                <textarea class="form-control" rows="5" placeholder="Keywords" v-model="page.keywords"></textarea>
            </div>
        </div>

        <div class="form-group">
            <label class="col-md-2 control-label">Description</label>
            <div class="col-md-10">
                <textarea class="form-control" rows="5" placeholder="Description" v-model="page.description"></textarea>
            </div>
        </div>

        <div class="form-group">
            <label class="col-sm-2 control-label">Статус</label>
            <div class="col-sm-10">
                <div class="radio radio-info radio-inline">
                    <input type="radio" id="status-on" value="1" v-model="page.status"
                           name="radioInline" checked="checked">
                    <label for="status-on"> Опубликовано </label>
                </div>
                <div class="radio radio-inline">
                    <input type="radio" id="status-off" value="0" v-model="page.status"
                           name="radioInline">
                    <label for="status-off"> Не опубликовано </label>
                </div>
            </div>
        </div>

        <button type="submit" class="btn btn-info waves-effect waves-light m-l-10">Создать</button>

    </form>
</template>

<script>
    export default {
        data() {
            return {
                errors: [],
                page: {
                    name: "",
                    alias: "",
                    content: "",
                    title: "",
                    h1: "",
                    keywords: "",
                    description: "",
                    status: 0,
                }
            };
        },
        methods: {
            onSubmit() {
                axios.post('/api/v1/admin/pages/store', this.page)
                    .then(({}) => this.setSuccessMessage())
                    .catch(({response}) => this.setErrors(response));
            },

            createAlias() {
                const _preset = "uk";

                const _firstLetterAssociations = {
                    "а": "a",
                    "б": "b",
                    "в": "v",
                    "ґ": "g",
                    "г": "g",
                    "д": "d",
                    "е": "e",
                    "ё": "e",
                    "є": "ye",
                    "ж": "zh",
                    "з": "z",
                    "и": "i",
                    "і": "i",
                    "ї": "yi",
                    "й": "i",
                    "к": "k",
                    "л": "l",
                    "м": "m",
                    "н": "n",
                    "о": "o",
                    "п": "p",
                    "р": "r",
                    "с": "s",
                    "т": "t",
                    "у": "u",
                    "ф": "f",
                    "х": "h",
                    "ц": "c",
                    "ч": "ch",
                    "ш": "sh",
                    "щ": "sh'",
                    "ъ": "",
                    "ы": "i",
                    "ь": "",
                    "э": "e",
                    "ю": "yu",
                    "я": "ya",
                };

                if (_preset === "uk") {
                    Object.assign(_firstLetterAssociations, {
                        "г": "h",
                        "и": "y",
                        "й": "y",
                        "х": "kh",
                        "ц": "ts",
                        "щ": "shch",
                        "'": "",
                        "’": "",
                        "ʼ": "",
                    });
                }

                const _associations = Object.assign({}, _firstLetterAssociations);

                if (_preset === "uk") {
                    Object.assign(_associations, {
                        "є": "ie",
                        "ї": "i",
                        "й": "i",
                        "ю": "iu",
                        "я": "ia",
                    });
                }

                function translate(input, spaceReplacement) {
                    if (!input) {
                        return "";
                    }

                    let newStr = "";
                    for (let i = 0; i < input.length; i++) {
                        const isUpperCaseOrWhatever = input[i] === input[i].toUpperCase();
                        let strLowerCase = input[i].toLowerCase();
                        if (strLowerCase === " " && spaceReplacement) {
                            newStr += spaceReplacement;
                            continue;
                        }
                        let newLetter = _preset === "uk" && strLowerCase === "г" && i > 0 && input[i - 1].toLowerCase() === "з"
                            ? "gh"
                            : (i === 0 ? _firstLetterAssociations : _associations)[strLowerCase];
                        if ("undefined" === typeof newLetter) {
                            newStr += isUpperCaseOrWhatever ? strLowerCase.toUpperCase() : strLowerCase;
                        }
                        else {
                            newStr += isUpperCaseOrWhatever ? newLetter.toUpperCase() : newLetter;
                        }
                    }
                    return newStr.toLowerCase();
                }

                this.page = {
                    name: this.page.name,
                    alias: translate(this.page.name, "-"),
                };
            },

            setErrors(response) {
                this.errors = response.data.errors;
            },
            setSuccessMessage() {
                this.reset();

                window.location.href = '/admin/pages';
            },
            reset() {
                this.errors = [];
                this.page = {
                    name: "",
                    alias: "",
                    content: "",
                    title: "",
                    h1: "",
                    keywords: "",
                    description: "",
                    status: 0,
                };
            }
        }
    }
</script>