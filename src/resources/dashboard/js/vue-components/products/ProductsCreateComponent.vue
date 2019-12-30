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
                                       v-model="product.name">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Алиас</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите навзвание"
                                       v-model="product.alias">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Артикул</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите навзвание"
                                       v-model="product.artikul">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Цена, (грн)</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите навзвание"
                                       v-model="product.cost">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Старая цена,
                                (грн)</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите навзвание"
                                       v-model="product.cost_old">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>

                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Информация</label>
                            <div class="col-lg-8">
                                <ckeditor :editor="editor" v-model="product.information"></ckeditor>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Спецификации</label>
                            <div class="col-lg-8">
                                <ckeditor :editor="editor" v-model="product.specifications"></ckeditor>
                            </div>
                        </div>

                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Title</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите Title ..."
                                       v-model="product.title">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Keywords</label>
                            <div class="col-lg-8">
                        <textarea class="form-control" placeholder="Введите Keywords ..."
                                  v-model="product.keywords"></textarea>
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Description</label>
                            <div class="col-lg-8">
                        <textarea class="form-control" placeholder="Введите Description ..."
                                  v-model="product.description"></textarea>
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>

                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Статус *</label>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="1" id="opt-01"
                                           v-model="product.status" required>
                                    <label class="custom-control-descfeedback" for="opt-01">Опубликовано</label>
                                    <div class="invalid-feedback">
                                        Toggle this custom radio
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="0" id="opt-02"
                                           v-model="product.status" required>
                                    <label class="custom-control-descfeedback" for="opt-02">Не опубликовано</label>
                                    <div class="invalid-feedback">
                                        Or toggle this other custom radio
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="form-group row d-flex align-items-center mb-5" v-if="product.image !== null">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Изображение</label>
                            <div class="col-md-8">
                                <div class="widget has-shadow">
                                    <figure class="img-hover-01">
                                        <img :src="product.image" class="img-fluid" alt="...">
                                        <div>
                                            <a href="#" v-on:click="deleteImage">
                                                <i class="la la-trash-o"></i>
                                            </a>
                                            <a v-bind:href="product.image" data-lity data-lity-desc="...">
                                                <i class="la la-expand"></i>
                                            </a>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5" v-if="product.image === null">
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
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Доступен</label>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="1" id="available-01"
                                           v-model="product.available" required>
                                    <label class="custom-control-descfeedback" for="available-01">Да</label>
                                    <div class="invalid-feedback">
                                        Toggle this custom radio
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="0" id="available-02"
                                           v-model="product.available" required>
                                    <label class="custom-control-descfeedback" for="available-02">Нет</label>
                                    <div class="invalid-feedback">
                                        Or toggle this other custom radio
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Скидка</label>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="1" id="sale-01"
                                           v-model="product.sale" required>
                                    <label class="custom-control-descfeedback" for="sale-01">Да</label>
                                    <div class="invalid-feedback">
                                        Toggle this custom radio
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="0" id="sale-02"
                                           v-model="product.sale" required>
                                    <label class="custom-control-descfeedback" for="sale-02">Нет</label>
                                    <div class="invalid-feedback">
                                        Or toggle this other custom radio
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Новинка</label>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="1" id="new-01"
                                           v-model="product.new" required>
                                    <label class="custom-control-descfeedback" for="new-01">Да</label>
                                    <div class="invalid-feedback">
                                        Toggle this custom radio
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="0" id="new-02"
                                           v-model="product.new" required>
                                    <label class="custom-control-descfeedback" for="new-02">Нет</label>
                                    <div class="invalid-feedback">
                                        Or toggle this other custom radio
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-group row mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Топ</label>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="1" id="top-01"
                                           v-model="product.top" required>
                                    <label class="custom-control-descfeedback" for="top-01">Да</label>
                                    <div class="invalid-feedback">
                                        Toggle this custom radio
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="0" id="top-02"
                                           v-model="product.top" required>
                                    <label class="custom-control-descfeedback" for="top-02">Нет</label>
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
                                <select class="form-control" v-model="product.category_id">
                                    <option>Выберите категорию</option>
                                    <option v-bind:value="category.id" v-for="category in categories">{{ category.name
                                        }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Бренд</label>
                            <div class="col-lg-8">
                                <select class="form-control" v-model="product.brand">
                                    <option>Выберите бренд</option>
                                    <option v-bind:value="brand.id" v-for="brand in brands">{{ brand.name }}</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <button class="btn btn-gradient-01" type="submit" v-on:click.prevent="createProduct">Создать</button>
                    <a href="/admin/products" class="btn btn-shadow">Отмена</a>
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
                product: {
                    name: null,
                    alias: null,
                    category_id: null,
                    status: null,
                    new: null,
                    sale: null,
                    top: null,
                    available: null,
                    cost: null,
                    cost_old: null,
                    brand: null,
                    artikul: null,
                    image: null,
                    specifications: null,
                    information: null,
                    title: null,
                    description: null,
                    keywords: null,
                },
                categories: [],
                brands: [],
            };
        },
        mounted() {
            this.getCategories();
            this.getBrands();
        },
        methods: {
            getCategories() {
                axios.get('/api/v1/categories/all')
                    .then(({data}) => (this.categories = data.result))
            },
            getBrands() {
                axios.get('/api/v1/brands/all')
                    .then(({data}) => (this.brands = data.result))
            },
            uploadImage(event) {
                let formData = new FormData();
                formData.append('image', event.target.files[0]);
                formData.append('type', 'products');

                axios.post('/api/v1/upload/image/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then(({data}) => this.uploadProductSuccessResponse(data))
                    .catch((response) => this.uploadProductEditErrorResponse(response));
            },
            uploadProductSuccessResponse(data) {
                if (data.success) {
                    this.product.image = data.url;
                }
            },
            uploadProductEditErrorResponse(response) {
                console.log(response);
            },
            createProduct() {
                axios.post('/api/v1/products/', this.product);

                swal({
                    title: 'Создано!',
                    text: 'Товар был создан',
                    icon: 'success',
                });
            },
            deleteImage() {
                this.product.image = null
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
