<template>
    <div class="sidebar-content">
        <div class="price-range mb-30">
            <div class="inner-title">Цена:</div>
            <input class="price-txt" type="text" :value="this.valuesToText(filterParams.value)">
            <vue-slider v-model="filterParams.value" :max="filterParams.max" :min="filterParams.min"/>
        </div>
<!--        <div class="select-color mb-20">-->
<!--            <div class="inner-title">Цвет:</div>-->
<!--            <ul>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <div class="color-tooltip">-->
<!--                            <span class="color-arrow"></span>red-->
<!--                        </div>-->
<!--                        <input type="checkbox" class="checkbox" id="red" name="red">-->
<!--                        <label for="red" class="red"></label>-->
<!--                    </div>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <div class="color-tooltip">-->
<!--                            <span class="color-arrow"></span>black-->
<!--                        </div>-->
<!--                        <input type="checkbox" class="checkbox" id="black" name="black">-->
<!--                        <label for="black" class="black"></label>-->
<!--                    </div>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <div class="color-tooltip">-->
<!--                            <span class="color-arrow"></span>navyblue-->
<!--                        </div>-->
<!--                        <input type="checkbox" class="checkbox" id="navyblue" name="navyblue">-->
<!--                        <label for="navyblue" class="navyblue"></label>-->
<!--                    </div>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <div class="color-tooltip">-->
<!--                            <span class="color-arrow"></span>green-->
<!--                        </div>-->
<!--                        <input type="checkbox" class="checkbox" id="green" name="green">-->
<!--                        <label for="green" class="green"></label>-->
<!--                    </div>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <div class="color-tooltip">-->
<!--                            <span class="color-arrow"></span>blue-->
<!--                        </div>-->
<!--                        <input type="checkbox" class="checkbox" id="blue" name="blue">-->
<!--                        <label for="blue" class="blue"></label>-->
<!--                    </div>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <div class="color-tooltip">-->
<!--                            <span class="color-arrow"></span>rose-->
<!--                        </div>-->
<!--                        <input type="checkbox" class="checkbox" id="rose" name="rose">-->
<!--                        <label for="rose" class="rose"></label>-->
<!--                    </div>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <div class="color-tooltip">-->
<!--                            <span class="color-arrow"></span>magenta-->
<!--                        </div>-->
<!--                        <input type="checkbox" class="checkbox" id="magenta" name="magenta">-->
<!--                        <label for="magenta" class="magenta"></label>-->
<!--                    </div>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
<!--        <div class="mb-20">-->
<!--            <div class="inner-title">Производитель:</div>-->
<!--            <ul>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <span>-->
<!--                            <input type="checkbox" class="checkbox" id="ghost" name="ghost"-->
<!--                                   :checked="this.includesVendor('ghost')"-->
<!--                                   v-on:click="addVendor($event)">-->
<!--                            <label for="ghost">Ghost</label>-->
<!--                        </span>-->
<!--                    </div>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <span>-->
<!--                            <input type="checkbox" class="checkbox" id="haibike" name="haibike"-->
<!--                                   :checked="this.includesVendor('haibike')"-->
<!--                                   v-on:click="addVendor($event)">-->
<!--                            <label for="haibike">Haibike</label>-->
<!--                        </span>-->
<!--                    </div>-->
<!--                </li>-->
<!--                <li>-->
<!--                    <div class="check-box">-->
<!--                        <span>-->
<!--                            <input type="checkbox" class="checkbox" id="shimano" name="shimano"-->
<!--                                   :checked="this.includesVendor('shimano')"-->
<!--                                   v-on:click="addVendor($event)">-->
<!--                            <label for="shimano">Shimano</label>-->
<!--                        </span>-->
<!--                    </div>-->
<!--                </li>-->
<!--            </ul>-->
<!--        </div>-->
        <a v-on:click="onFilter" class="btn btn-color">Фильтр</a>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                uri: '',
                sort: '',
                type: '',
                limit: '',
                filterParams: {
                    min: 25,
                    max: 100,
                    value: [25, 100],
                    color: [],
                    manufacturer: []
                },
            }
        },
        methods: {
            addVendor($event) {
                if (this.filterParams.manufacturer.includes($event.target.name)) {
                    this.filterParams.manufacturer = this.filterParams.manufacturer.filter(e => e !== $event.target.name)
                } else {
                    this.filterParams.manufacturer.push($event.target.name)
                }
            },
            includesVendor(value) {
                return this.filterParams.manufacturer.includes(value)
            },
            onFilter() {
                let arr = this.uri.split('?');
                this.uri = arr[0];

                let get = [];
                if (this.filterParams.value[0]) {
                    get.push('min-cost=' + this.filterParams.value[0]);
                }
                if (this.filterParams.value[1]) {
                    get.push('max-cost=' + this.filterParams.value[1]);
                }
                if (this.filterParams.manufacturer.length) {
                    get.push('vendor=' + this.filterParams.manufacturer.join());
                }

                if (get.length) {
                    get = get.join('&');
                    this.uri += '?' + get;
                }

                window.location.href = this.uri;
            },
            valuesToText(value) {
                return '₴' + value[0] + ' - ₴' + value[1];
            }
        },
        mounted() {
            this.filterParams.max = parseInt(this.$attrs.params[0].max);
            this.filterParams.min = parseInt(this.$attrs.params[0].min);
            this.filterParams.value = [parseInt(this.$attrs.params[0].min), parseInt(this.$attrs.params[0].max)];

            this.uri = window.location.pathname;
            const query = window.location.search;
            const urlParams = new URLSearchParams(query);

            if (urlParams.get('min-cost') !== null && urlParams.get('max-cost') !== null) {
                this.filterParams.value = [urlParams.get('min-cost'), urlParams.get('max-cost')];
            }
            if (urlParams.get('sort') !== null) {
                this.sort = urlParams.get('sort');
            }
            if (urlParams.get('type') !== null) {
                this.type = urlParams.get('type');
            }
            if (urlParams.get('limit') !== null) {
                this.limit = parseInt(urlParams.get('limit'));
            }
            if (urlParams.get('vendor') !== null) {
                this.filterParams.manufacturer = urlParams.get('vendor').split(',');
            }
        }
    }
</script>
