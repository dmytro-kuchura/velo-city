<template>
    <div class="widget has-shadow">
        <div class="widget-header bordered no-actions d-flex align-items-center">
            <h4>Форма редактирования</h4>
        </div>
        <div class="widget-body">
            <form class="needs-validation" novalidate>
                <div class="row">
                    <div class="col-md-8">
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Название</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" placeholder="Введите навзвание"
                                       v-model="specification.name">
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Алиас</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control" placeholder="Введите ссылку"
                                       v-model="specification.alias" disabled>
                            </div>
                        </div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Тип</label>
                            <div class="col-lg-9">
                                <select class="form-control" v-model="specification.type">
                                    <option>Выберите тип</option>
                                    <option value="2">Обычный</option>
                                    <option value="3">Мультивыбор</option>
                                </select>
                            </div>
                        </div>

                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Значение</label>
                            <div class="col-lg-9">
                                <input type="text" class="form-control"
                                       v-model="value"
                                       v-on:keyup.enter="addSpecificationValue">
                            </div>
                        </div>

                        <div class="em-separator separator-dashed"></div>

                        <div class="form-group row mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Статус *</label>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="1" id="opt-01"
                                           v-model="specification.status" required>
                                    <label class="custom-control-descfeedback" for="opt-01">Опубликовано</label>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="0" id="opt-02"
                                           v-model="specification.status" required>
                                    <label class="custom-control-descfeedback" for="opt-02">Не опубликовано</label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="col-lg-9">
                            <div class="form-group" v-if="specification.values.length" v-for="value in specification.values">
                                <div class="input-group">
                                    <input type="text" class="form-control" v-model="value.name" disabled>
                                    <span class="input-group-btn">
                                        <button type="button" class="btn btn-warning"
                                                v-on:click.prevent="deleteSpecificationValue(value.id)">
                                            <i class="la la-trash"></i>
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <button class="btn btn-gradient-01" type="submit" v-on:click.prevent="updateSpecification">Создать
                    </button>
                    <a href="/admin/specifications" class="btn btn-shadow">Отмена</a>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                specification: {
                    id: null,
                    alias: null,
                    name: null,
                    type: null,
                    status: null,
                    sort: null,
                    created_at: null,
                    updated_at: null,
                    values: []
                },
                value: null,
                color: null,
                errors: [],
            };
        },
        mounted() {
            let str = window.location.pathname;
            let n = str.lastIndexOf('/');
            let id = str.substring(n + 1);

            this.getSpecification(id);
        },
        methods: {
            getSpecification(id) {
                axios.get('/api/v1/specifications/' + id)
                    .then(({data}) => this.getProductsEditSuccessResponse(data))
                    .catch((response) => this.getProductsEditErrorResponse(response));
            },
            getProductsEditSuccessResponse(data) {
                this.specification = data.result;
            },
            getProductsEditErrorResponse(response) {
                console.log(response);
            },
            addSpecificationValue() {
                axios.post('/api/v1/specifications-values/create', {
                    name: this.value,
                    color: this.color,
                    specification_id: this.specification.id,
                }).then(() => {
                        this.getSpecification(this.specification.id);
                        this.value = null;
                        this.color = null;
                    }
                )
            },
            updateSpecification() {
                axios.put('/api/v1/specifications/' + this.specification.id, this.specification);
            },
            deleteSpecificationValue(id) {
                axios.delete('/api/v1/specifications-values/' + id)
                    .then(() => this.getSpecification(this.specification.id));
            }
        }
    }
</script>
