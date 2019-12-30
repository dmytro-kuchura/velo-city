<template>
    <div class="widget has-shadow">
        <div class="widget-header bordered no-actions d-flex align-items-center">
            <h4>Форма создания</h4>
        </div>
        <div class="widget-body">
            <form class="needs-validation" novalidate>
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Название</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите навзвание"
                                       v-model="category.name">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Алиас</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите навзвание"
                                       v-model="category.alias">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>



                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Информация</label>
                            <div class="col-lg-8">
                                <vue-editor v-model="category.information"></vue-editor>
                            </div>
                        </div>

                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Title</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите Title ..."
                                       v-model="category.title">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Keywords</label>
                            <div class="col-lg-8">
                        <textarea class="form-control" placeholder="Введите Keywords ..."
                                  v-model="category.keywords"></textarea>
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Информация</label>
                            <div class="col-lg-8">
                                <vue-editor v-model="category.description"></vue-editor>
                            </div>
                        </div>


                    </div>
                    <div class="col-md-4">
                        <div class="form-group row d-flex align-items-center mb-5" v-if="category.image !== null">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Изображение</label>
                            <div class="col-md-8">
                                <div class="widget has-shadow">
                                    <figure class="img-hover-01">
                                        <img :src="category.image" class="img-fluid" alt="...">
                                        <div>
                                            <a href="#" v-on:click="deleteImage">
                                                <i class="la la-trash-o"></i>
                                            </a>
                                            <a v-bind:href="category.image" data-lity data-lity-desc="...">
                                                <i class="la la-expand"></i>
                                            </a>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5" v-if="category.image === null">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Загрузка
                                изображения</label>
                            <div class="col-md-8">
                                <div class="area">
                                    <div id="dropZone" @click="$refs.file.click()">Нажмите сюда для загрузки</div>
                                    <input type="file" ref="file" class="hidden-input" v-on:change="uploadImage">
                                </div>
                            </div>
                        </div>

                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Статус *</label>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="1" id="opt-01"
                                           v-model="category.status" required>
                                    <label class="custom-control-descfeedback" for="opt-01">Опубликовано</label>
                                    <div class="invalid-feedback">
                                        Toggle this custom radio
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="0" id="opt-02"
                                           v-model="category.status" required>
                                    <label class="custom-control-descfeedback" for="opt-02">Не опубликовано</label>
                                    <div class="invalid-feedback">
                                        Or toggle this other custom radio
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Категория</label>
                            <div class="col-lg-8">
                                <select class="form-control" v-model="category.category_id">
                                    <option value="0">Выберите категорию</option>
                                    <option v-bind:value="category.id" v-for="category in categories">{{ category.name }}</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="text-right">
                    <button class="btn btn-gradient-01" type="submit" v-on:click.prevent="createCategory">Создать</button>
                    <a href="/admin/categories" class="btn btn-shadow">Отмена</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                category: {
                    name: null,
                    alias: null,
                    parent_id: null,
                    status: null,
                    image: null,
                    title: null,
                    description: null,
                    keywords: null,
                },
                categories: [],
            };
        },
        mounted() {
            this.getCategories();
        },
        methods: {
            getCategories() {
                axios.get('/api/v1/categories/all')
                    .then(({data}) => (this.categories = data.result))
            },
            uploadImage(event) {
                let formData = new FormData();
                formData.append('image', event.target.files[0]);
                formData.append('type', 'categories');

                axios.post('/api/v1/upload/image/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(({data}) => this.uploadCategoryImageSuccessResponse(data))
                    .catch((response) => this.uploadCategoryImageErrorResponse(response));
            },
            uploadCategoryImageSuccessResponse(data) {
                if (data.success) {
                    this.category.image = data.url;
                }
            },
            uploadCategoryImageErrorResponse(response) {
                console.log(response);
            },
            createCategory() {
                axios.post('/api/v1/categories/', this.category);

                swal({
                    title: 'Создано!',
                    text: 'Категория была создана',
                    icon: 'success',
                });
            },
            deleteImage() {
                this.category.image = null
            }
        }
    }
</script>

<style>
    .area {
        padding: 15px;
        border: 5px dashed white;
        background: #EB6A5A;
    }

    #dropZone {
        border: 2px dashed white;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        padding: 50px;
        text-align: center;
        font: 21pt bold arial;
        color: white;
        cursor: pointer;
    }

    #multipleDropZone {
        border: 2px dashed white;
        -webkit-border-radius: 5px;
        border-radius: 5px;
        padding: 50px;
        text-align: center;
        font: 21pt bold arial;
        color: white;
        cursor: pointer;
    }

    .hidden-input {
        display: none;
    }
</style>
