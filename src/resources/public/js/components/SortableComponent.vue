<template>
    <div class="shorting mb-30">
        <div class="row">
            <div class="col-xl-6">
                <div class="view">
                    <div class="list-types grid active ">
                        <a>
                            <div class="grid-icon list-types-icon"></div>
                        </a>
                    </div>
                    <div class="list-types list">
                        <a>
                            <div class="list-icon list-types-icon"></div>
                        </a>
                    </div>
                </div>
                <div class="short-by float-right-sm">
                    <span>Сортировка :</span>
                    <div class="select-item select-dropdown">
                        <fieldset>
                            <select name="sort" id="sort-price" class="option-drop" @change="onChange($event)">
                                <option value="name" data-type="asc"
                                        :selected="this.sort === 'name' && this.type === 'asc'">Название (от А до Я)
                                </option>
                                <option value="name" data-type="desc"
                                        :selected="this.sort === 'name' && this.type === 'desc'">Название (от Я до А)
                                </option>
                                <option value="price" data-type="asc"
                                        :selected="this.sort === 'price' && this.type === 'asc'">Цена (низкая &gt;
                                    высокая)
                                </option>
                                <option value="price" data-type="desc"
                                        :selected="this.sort === 'price' && this.type === 'desc'">Цена (высокая &gt;
                                    низкая)
                                </option>
                            </select>
                        </fieldset>
                    </div>
                </div>
            </div>
            <div class="col-xl-6">
                <div class="show-item float-left-sm">
                    <span>Отображается :</span>
                    <div class="select-item select-dropdown">
                        <fieldset>
                            <select name="speed" id="show-item" class="option-drop" @change="onChangeLimit($event)">
                                <option value="12" :selected="this.limit === 12">12</option>
                                <option value="24" :selected="this.limit === 24">24</option>
                                <option value="48" :selected="this.limit === 48">48</option>
                            </select>
                        </fieldset>
                    </div>
                    <span>на страницу</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                uri: '',
                sort: '',
                type: '',
                limit: 12,
            }
        },
        mounted() {
            this.uri = window.location.pathname;
            const query = window.location.search;
            const urlParams = new URLSearchParams(query);

            this.sort = urlParams.get('sort');
            this.type = urlParams.get('type');
            if (urlParams.get('limit') !== null) {
                this.limit = parseInt(urlParams.get('limit'));
            }
        },
        methods: {
            onChange($event) {
                this.sort = $event.target.value;
                this.type = $event.target[event.target.selectedIndex].getAttribute('data-type');

                let arr = this.uri.split('?');
                this.uri = arr[0];

                let get = [];
                get.push('sort=' + this.sort);
                get.push('type=' + this.type);

                if (this.limit.length && this.limit !== 12) {
                    get.push('limit=' + this.limit);
                }

                if (get.length) {
                    get = get.join('&');
                    this.uri += '?' + get;
                }

                window.location.href = this.uri;
            },
            onChangeLimit($event) {
                this.limit = parseInt($event.target.value);

                let arr = this.uri.split('?');
                this.uri = arr[0];

                let get = [];
                if (this.sort !== null) {
                    get.push('sort=' + this.sort);
                }
                if (this.type !== null) {
                    get.push('type=' + this.type);
                }
                if (this.limit !== 12) {
                    get.push('limit=' + this.limit);
                }

                if (get.length) {
                    get = get.join('&');
                    this.uri += '?' + get;

                }
                window.location.href = this.uri;
            }
        }
    }
</script>
