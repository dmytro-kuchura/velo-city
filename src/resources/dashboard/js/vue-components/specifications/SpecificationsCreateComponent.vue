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
                                       v-model="specification.name">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>
                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Алиас</label>
                            <div class="col-lg-8">
                                <input type="text" class="form-control" placeholder="Введите ссылку"
                                       v-model="specification.alias">
                                <div class="invalid-feedback">
                                    Please enter a custom message
                                </div>
                            </div>
                        </div>

                        <div class="form-group row d-flex align-items-center mb-5">
                            <label class="col-lg-3 form-control-label d-flex justify-content-lg-end">Тип</label>
                            <div class="col-lg-8">
                                <select class="form-control" v-model="specification.type">
                                    <option>Выберите тип</option>
                                    <option value="2">Обычный</option>
                                    <option value="3">Мультивыбор</option>
                                </select>
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
                                    <div class="invalid-feedback">
                                        Toggle this custom radio
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="custom-control custom-radio styled-radio mb-3">
                                    <input class="custom-control-input" type="radio" value="0" id="opt-02"
                                           v-model="specification.status" required>
                                    <label class="custom-control-descfeedback" for="opt-02">Не опубликовано</label>
                                    <div class="invalid-feedback">
                                        Or toggle this other custom radio
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="text-right">
                    <button class="btn btn-gradient-01" type="submit" v-on:click.prevent="createSpecification">Создать
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
                    name: null,
                    alias: null,
                    status: null,
                    type: null,
                    description: null,
                    keywords: null,
                },
                errors: [],
            };
        },
        methods: {
            createSpecification() {
                axios.post('/api/v1/specifications/create', this.specification)
                    .then(({response}) => {
                        this.createSpecificationSuccessResponse(response);
                    })
                    .catch(({response}) => {
                        this.createSpecificationErrorResponse(response);
                    })
            },
            createSpecificationSuccessResponse(data) {
                swal({
                    title: 'Создано!',
                    text: 'Спецификация была добавлена',
                    icon: 'success',
                });

                setTimeout(this.redirectAfterCreate, 1000);
            },
            createSpecificationErrorResponse(response) {
                if (response.data.errors) {
                    this.errors = response.data.errors;
                }
            },
            redirectAfterCreate() {
                window.location.href = '/admin/specifications';
            }
        }
    }
</script>
