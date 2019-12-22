<template>
    <div class="widget has-shadow">
        <div class="widget-header bordered no-actions d-flex align-items-center">
            <h4>Default Form</h4>
        </div>
        <div class="widget-body">
            <form class="needs-validation" novalidate>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Название</label>
                    <div class="col-lg-5">
                        <input type="text" class="form-control" placeholder="Введите навзвание" v-model="banner.title">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Ссылка *</label>
                    <div class="col-lg-5">
                        <input type="url" class="form-control" v-model="banner.link">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Слоган *</label>
                    <div class="col-lg-5">
                        <input type="text" class="form-control" v-model="banner.slogan">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Описание *</label>
                    <div class="col-lg-5">
                        <textarea class="form-control" placeholder="Type your message here ..." required v-model="banner.description"></textarea>
                        <div class="invalid-feedback">
                            Please enter a custom message
                        </div>
                    </div>
                </div>
                <div class="em-separator separator-dashed"></div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Создано</label>
                    <div class="col-lg-5">
                        <input type="password" class="form-control" placeholder="MM/DD/YYYY">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Изменено</label>
                    <div class="col-lg-5">
                        <input type="password" class="form-control" placeholder="MM/DD/YYYY">
                    </div>
                </div>
                <div class="form-group row mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Статус *</label>
                    <div class="col-lg-2">
                        <div class="custom-control custom-radio styled-radio mb-3">
                            <input class="custom-control-input" type="radio" value="1" id="opt-01" v-model="banner.status" required>
                            <label class="custom-control-descfeedback" for="opt-01">Опубликовано</label>
                            <div class="invalid-feedback">
                                Toggle this custom radio
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="custom-control custom-radio styled-radio mb-3">
                            <input class="custom-control-input" type="radio" value="0" id="opt-02" v-model="banner.status" required>
                            <label class="custom-control-descfeedback" for="opt-02">Не опубликовано</label>
                            <div class="invalid-feedback">
                                Or toggle this other custom radio
                            </div>
                        </div>
                    </div>
                </div>

                <!--                <vue-dropzone :options="dropzoneOptions" :useCustomSlot=true>-->
                <!--                    <div class="dropzone-custom-content">-->
                <!--                        <h3 class="dropzone-custom-title">Drag and drop to upload content!</h3>-->
                <!--                        <div class="subtitle">...or click to select a file from your computer</div>-->
                <!--                    </div>-->
                <!--                </vue-dropzone>-->

                <div class="text-right">
                    <button class="btn btn-gradient-01" type="submit">Обновить</button>
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
                    created_at: null,
                    description: null,
                    id: null,
                    image: null,
                    link: null,
                    slogan: null,
                    status: null,
                    title: null,
                    updated_at: null,
                },
                endpoint: '/api/v1/banners?page=',
                dropzoneOptions: {
                    url: 'https://httpbin.org/post',
                    thumbnailWidth: 200,
                    addRemoveLinks: true
                },
            };
        },
        mounted() {
            let str = window.location.pathname;
            let n = str.lastIndexOf('/');
            let id = str.substring(n + 1);

            axios.get("/api/v1/banners/" + id)
                .then(({data}) => this.getBannersEditSuccessResponse(data))
                .catch((response) => this.getBannersEditErrorResponse(response));
        },
        methods: {
            getBannersEditSuccessResponse(data) {
                this.banner = data.result;
            },
            getBannersEditErrorResponse(response) {
                console.log(response);
            },
        }
    }
</script>

<style>
    .dropzone-custom-content {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
    }

    .dropzone-custom-title {
        margin-top: 0;
        color: #00b782;
    }

    .subtitle {
        color: #314b5f;
    }
</style>
