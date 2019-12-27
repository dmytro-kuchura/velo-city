<template>
    <div class="widget has-shadow">
        <div class="widget-header bordered no-actions d-flex align-items-center">
            <h4>Форма редактирования</h4>
        </div>
        <div class="widget-body">
            <form class="needs-validation" novalidate>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Название</label>
                    <div class="col-lg-5">
                        <input type="text" class="form-control" placeholder="Введите навзвание" v-model="brand.name">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Ссылка *</label>
                    <div class="col-lg-5">
                        <input type="text" class="form-control" v-model="brand.alias">
                    </div>
                </div>

                <div class="em-separator separator-dashed"></div>

                <div class="form-group row d-flex align-items-center mb-5" v-if="brand.image !== null">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Изображение</label>
                    <div class="col-md-5">
                        <div class="widget has-shadow">
                            <figure class="img-hover-01">
                                <img :src="brand.image" class="img-fluid" alt="...">
                                <div>
                                    <a href="#" v-on:click="deleteImage">
                                        <i class="la la-trash-o"></i>
                                    </a>
                                    <a v-bind:href="brand.image" data-lity data-lity-desc="...">
                                        <i class="la la-expand"></i>
                                    </a>
                                </div>
                            </figure>
                        </div>
                    </div>
                </div>

                <div class="form-group row d-flex align-items-center mb-5" v-if="brand.image === null">
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

                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Создано</label>
                    <div class="col-lg-5">
                        <input type="string" class="form-control" disabled placeholder="MM/DD/YYYY"
                               v-model="brand.created">
                    </div>
                </div>
                <div class="form-group row d-flex align-items-center mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Изменено</label>
                    <div class="col-lg-5">
                        <input type="string" class="form-control" disabled placeholder="MM/DD/YYYY"
                               v-model="brand.updated">
                    </div>
                </div>
                <div class="form-group row mb-5">
                    <label class="col-lg-4 form-control-label d-flex justify-content-lg-end">Статус *</label>
                    <div class="col-lg-2">
                        <div class="custom-control custom-radio styled-radio mb-3">
                            <input class="custom-control-input" type="radio" value="1" id="opt-01"
                                   v-model="brand.status" required>
                            <label class="custom-control-descfeedback" for="opt-01">Опубликовано</label>
                        </div>
                    </div>
                    <div class="col-lg-3">
                        <div class="custom-control custom-radio styled-radio mb-3">
                            <input class="custom-control-input" type="radio" value="0" id="opt-02"
                                   v-model="brand.status" required>
                            <label class="custom-control-descfeedback" for="opt-02">Не опубликовано</label>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <button class="btn btn-gradient-01" type="submit" v-on:click.prevent="updateBrand">Обновить</button>
                    <button class="btn btn-shadow" type="reset">Отмена</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                brand: {
                    id: null,
                    name: null,
                    image: null,
                    alias: null,
                    status: null,
                    created: null,
                    updated: null,
                },
            };
        },
        mounted() {
            let str = window.location.pathname;
            let n = str.lastIndexOf('/');
            let id = str.substring(n + 1);

            this.getBrand(id);
        },
        methods: {
            getBrand(id) {
                axios.get("/api/v1/brands/" + id)
                    .then(({data}) => this.getBrandEditSuccessResponse(data))
                    .catch((response) => this.getBrandEditErrorResponse(response));
            },
            getBrandEditSuccessResponse(data) {
                this.brand = data.result;
            },
            getBrandEditErrorResponse(response) {
                console.log(response);
            },
            uploadFile(event) {
                let formData = new FormData();
                formData.append("image", event.target.files[0]);
                formData.append("type", 'brands');

                axios.post('/api/v1/upload/image/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(({data}) => this.uploadBrandSuccessResponse(data))
                    .catch((response) => this.uploadBrandEditErrorResponse(response));
            },
            uploadBrandSuccessResponse(data) {
                if (data.success) {
                    axios.put('/api/v1/brands/image-update/', {'id': this.brand.id, 'link': data.url})
                        .then(({data}) => this.successImageUpdate(data))
                }
            },
            uploadBrandEditErrorResponse(response) {
                console.log(response);
            },
            successImageUpdate(data) {
                if (data.success) {
                    this.getBrand(this.brand.id)
                }
            },
            updateBrand() {
                axios.put('/api/v1/brands/' + this.brand.id, this.brand)
            },
            deleteImage() {
                this.brand.image = null
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
