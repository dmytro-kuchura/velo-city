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
                        <span class="icon" slot="delNodeIcon">🗑️</span>
                        <span class="icon" slot="treeNodeIcon">🚲</span>
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
                data: new Tree([
                    {
                        name: 'Node 1',
                        id: 1,
                        addTreeNodeDisabled: true,
                        addLeafNodeDisabled: true,
                        editNodeDisabled: true,
                        children: [
                            {
                                name: 'Node 1-2',
                                id: 2,
                                addTreeNodeDisabled: true,
                                addLeafNodeDisabled: true,
                                editNodeDisabled: true,
                            }
                        ]
                    },
                    {
                        name: 'Node 2',
                        id: 3,
                        addTreeNodeDisabled: true,
                        addLeafNodeDisabled: true,
                        editNodeDisabled: true,
                    },
                    {
                        name: 'Node 3',
                        id: 4,
                        addTreeNodeDisabled: true,
                        addLeafNodeDisabled: true,
                        editNodeDisabled: true,
                    }
                ])
            }
        },
        methods: {
            onDel(node) {
                console.log(node);
                node.remove()
            },
            onClick(params) {
                console.log(params)
            },
        }
    }
</script>
