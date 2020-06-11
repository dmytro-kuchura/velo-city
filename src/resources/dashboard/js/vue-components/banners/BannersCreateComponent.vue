<template>
    <div class="widget has-shadow">
        <div class="widget-header bordered no-actions d-flex align-items-center">
            <h4>Форма создания</h4>
        </div>
        <div class="widget-body">
            <form class="needs-validation">
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Название</label>
                    <div class="col-lg-5">
                        <input type="text" class="form-control" placeholder="Введите навзвание" v-model="banner.title">
                        <div class="invalid-feedback">
                            Please enter a custom message
                        </div>
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Ссылка *</label>
                    <div class="col-lg-5">
                        <input type="text" class="form-control" v-model="banner.link">
                        <div class="invalid-feedback">
                            Please enter a custom message
                        </div>
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Слоган *</label>
                    <div class="col-lg-5">
                        <input type="text" class="form-control" v-model="banner.slogan">
                        <div class="invalid-feedback">
                            Please enter a custom message
                        </div>
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Описание *</label>
                    <div class="col-lg-5">
                        <textarea class="form-control" placeholder="Type your message here ..."
                                  v-model="banner.description"></textarea>
                        <div class="invalid-feedback">
                            Please enter a custom message
                        </div>
                    </div>
                </div>

                <div class="em-separator separator-dashed"></div>

                <div class="form-group row d-flex align-items-center mb-5" v-if="banner.image !== null">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Изображение</label>
                    <div class="col-md-5">
                        <div class="widget has-shadow">
                            <figure class="img-hover-01">
                                <img :src="banner.image" class="img-fluid" alt="...">
                                <div>
                                    <a href="#" v-on:click="deleteImage">
                                        <i class="la la-trash-o"></i>
                                    </a>
                                    <a v-bind:href="banner.image" data-lity data-lity-desc="...">
                                        <i class="la la-expand"></i>
                                    </a>
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>

                <div class="form-group row d-flex align-items-center mb-5" v-if="banner.image === null">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Загрузка
                        изображения</label>
                    <div class="col-md-5">
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
                                   v-model="banner.status" required>
                            <label class="custom-control-descfeedback" for="opt-01">Опубликовано</label>
                            <div class="invalid-feedback">
                                Toggle this custom radio
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="custom-control custom-radio styled-radio mb-3">
                            <input class="custom-control-input" type="radio" value="0" id="opt-02"
                                   v-model="banner.status" required>
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
    export default {
        data() {
            return {
                banner: {
                    description: null,
                    image: null,
                    link: null,
                    slogan: null,
                    status: null,
                    title: null,
                },
            };
        },
        methods: {
            uploadFile(event) {
                let formData = new FormData();
                formData.append('image', event.target.files[0]);
                formData.append('type', 'banners');

                axios.post('/api/v1/upload/image/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(({data}) => this.uploadBannerSuccessResponse(data))
                    .catch((response) => this.uploadBannerEditErrorResponse(response));
            },
            uploadBannerSuccessResponse(data) {
                if (data.success) {
                    this.banner.image = data.url;
                }
            },
            uploadBannerEditErrorResponse(response) {
                console.log(response);
            },
            onSubmit() {
                axios.post('/api/v1/banners/', this.banner);

                swal({
                    title: 'Создано!',
                    text: 'Баннер был добавлен',
                    icon: 'success',
                });
            },
            deleteImage() {
                this.banner.image = null
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
