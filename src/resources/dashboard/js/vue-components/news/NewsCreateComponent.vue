<template>
    <div class="widget has-shadow">
        <div class="widget-header bordered no-actions d-flex align-items-center">
            <h4>Форма создания</h4>
        </div>
        <div class="widget-body">
            <form class="needs-validation">
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Название</label>
                    <div class="col-lg-8">
                        <input type="text" class="form-control" v-model="news.name">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Ссылка *</label>
                    <div class="col-lg-8">
                        <input type="text" class="form-control" v-model="news.alias">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Информация</label>
                    <div class="col-lg-8">
                        <ckeditor :editor="editor" v-model="news.content"></ckeditor>
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Короткое описание</label>
                    <div class="col-lg-8">
                        <textarea class="form-control" v-model="news.short"></textarea>
                    </div>
                </div>

                <div class="em-separator separator-dashed"></div>

                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Title</label>
                    <div class="col-lg-8">
                        <input type="text" class="form-control" v-model="news.title">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Description</label>
                    <div class="col-lg-8">
                        <input type="text" class="form-control" v-model="news.description">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Keywords</label>
                    <div class="col-lg-8">
                        <input type="text" class="form-control" v-model="news.keywords">
                    </div>
                </div>

                <div class="em-separator separator-dashed"></div>

                <div class="form-group row d-flex align-items-center mb-5" v-if="news.image !== null">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Изображение</label>
                    <div class="col-md-8">
                        <div class="widget has-shadow">
                            <figure class="img-hover-01">
                                <img :src="news.image" class="img-fluid" alt="...">
                                <div>
                                    <a href="#" v-on:click="deleteImage">
                                        <i class="la la-trash-o"></i>
                                    </a>
                                    <a v-bind:href="news.image" data-lity data-lity-desc="...">
                                        <i class="la la-expand"></i>
                                    </a>
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5" v-if="news.image === null">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Загрузка
                        изображения</label>
                    <div class="col-md-8">
                        <div class="area">
                            <div id="dropZone" @click="$refs.file.click()">Нажмите сюда для загрузки</div>
                            <input type="file" ref="file" class="hidden-input" v-on:change="uploadFile">
                        </div>
                    </div>
                </div>

                <div class="em-separator separator-dashed"></div>

                <div class="form-group row mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Статус *</label>
                    <div class="col-lg-2">
                        <div class="custom-control custom-radio styled-radio mb-3">
                            <input class="custom-control-input" type="radio" value="1" id="opt-01"
                                   v-model="news.status" required>
                            <label class="custom-control-descfeedback" for="opt-01">Опубликовано</label>
                            <div class="invalid-feedback">
                                Toggle this custom radio
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="custom-control custom-radio styled-radio mb-3">
                            <input class="custom-control-input" type="radio" value="0" id="opt-02"
                                   v-model="news.status" required>
                            <label class="custom-control-descfeedback" for="opt-02">Не опубликовано</label>
                            <div class="invalid-feedback">
                                Or toggle this other custom radio
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <button class="btn btn-gradient-01" type="submit" v-on:click.prevent="onSubmit">Создать</button>
                    <button class="btn btn-shadow" type="reset">Сбросить</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

    export default {
        data() {
            return {
                editor: ClassicEditor,
                news: {
                    name: null,
                    image: null,
                    alias: null,
                    content: null,
                    short: null,
                    title: null,
                    keywords: null,
                    description: null,
                    status: null,
                },
            };
        },
        methods: {
            uploadFile(event) {
                let formData = new FormData();
                formData.append('image', event.target.files[0]);
                formData.append('type', 'news');

                axios.post('/api/v1/upload/image/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(({data}) => this.uploadNewsImageSuccessResponse(data))
                    .catch((response) => this.uploadNewsImageErrorResponse(response));
            },
            uploadNewsImageSuccessResponse(data) {
                if (data.success) {
                    this.news.image = data.url;
                }
            },
            uploadNewsImageErrorResponse(response) {
                console.log(response);
            },
            deleteImage() {
                this.news.image = null
            },
            onSubmit() {
                axios.post('/api/v1/news/', this.news)
                    .then(({response}) => {
                        this.createNewsSuccessResponse(response);
                    })
                    .catch(({response}) => {
                        this.createNewsErrorResponse(response);
                    })
            },
            createNewsSuccessResponse(data) {
                swal({
                    title: 'Создано!',
                    text: 'Новость была добавлена',
                    icon: 'success',
                });

                setTimeout(this.redirectAfterCreate, 1000);
            },
            createNewsErrorResponse(response) {
                if (response.data.errors) {
                    this.errors = response.data.errors;
                }
            },
            redirectAfterCreate() {
                window.location.href = '/admin/news';
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

    .hidden-input {
        display: none;
    }
</style>
