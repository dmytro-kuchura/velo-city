<template>
    <div class="col-xl-12">
        <div class="widget has-shadow">
            <div class="widget-body">
                <div class="table-responsive">

                    <button class="btn btn-gradient-01" type="submit">Создать</button>

                    <vue-tree-list
                        @click="onClick"
                        @delete-node="onDel"
                        :model="data"
                        v-bind:default-expanded="true">
                        <span class="icon" slot="editNodeIcon">📃</span>
                        <span class="icon" slot="delNodeIcon">🗑️</span>
                    </vue-tree-list>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    import {VueTreeList, Tree} from 'vue-tree-list'
    // https://github.com/ParadeTo/vue-tree-list

    export default {
        components: {
            VueTreeList
        },
        data() {
            return {
                data: null
            }
        },
        mounted() {
            axios.get('/api/v1/categories/all')
                .then(({data}) => this.getCategoriesListSuccessResponse(data))
                .catch((response) => this.getCategoriesListErrorResponse(response));
        },
        methods: {
            getCategoriesListSuccessResponse(data) {
                this.data = new Tree(data.result);
            },
            getCategoriesListErrorResponse(response) {
                console.log(response);
            },
            onDel(node) {
                console.log(node);
                // node.remove()
            },
            onClick(params) {
                console.log(params)
            },
        }
    }
</script>
