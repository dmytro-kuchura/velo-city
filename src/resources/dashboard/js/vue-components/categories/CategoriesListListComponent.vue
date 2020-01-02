<template>
    <div class="col-xl-12">
        <div class="widget has-shadow">
            <div class="widget-body">
                <div class="table-responsive">

                    <vue-drag-tree :data='data' :allowDrag='allowDrag' :allowDrop='allowDrop' :defaultText='"New Node"' @current-node-clicked='curNodeClicked' @drag="dragHandler" @drag-enter="dragEnterHandler" @drag-leave="dragLeaveHandler" @drag-over="dragOverHandler" @drag-end="dragEndHandler" @drop="dropHandler" v-slot="slotProps">
                        <span :class="[slotProps.isClicked ? 'i-am-clicked' : 'i-am-not-clicked']"></span>
                        <span class='i-am-node-name'>{{slotProps.nodeName}}</span>
                    </vue-drag-tree>

                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                data: [
                    {
                        title: "Node 0-0",
                        id: 0,
                        icon: 'ios-car-outline',
                        children: [
                            {
                                title: "Node 1-1",
                                id: 3,
                                icon: 'ios-car-outline',
                                children: [
                                    {
                                        title: "Node 2-1",
                                        icon: 'ios-car-outline',
                                        id: 4
                                    },
                                    {
                                        title: "Node 2-2",
                                        icon: 'ios-car-outline',
                                        id: 10
                                    }
                                ]
                            },
                            {
                                title: "sdfgsdfgsdfg",
                                icon: 'ios-car-outline',
                                id: 13,
                                children: []
                            }
                        ]
                    },
                    {
                        title: "Node 0-1",
                        icon: 'ios-car-outline',
                        id: 14
                    }
                ]
            }
        },
        mounted() {
            axios.get('/api/v1/categories')
                .then(({data}) => this.getCategoriesListSuccessResponse(data))
                .catch((response) => this.getCategoriesListErrorResponse(response));
        },
        methods: {
            onDelete(id) {
                axios.delete('/api/v1/categories/' + id)
                    .then(function () {
                        axios.get('/api/v1/categories')
                            .then(({data}) => this.getCategoriesListSuccessResponse(data))
                            .catch((response) => this.getCategoriesListErrorResponse(response));
                    })
            },
            getCategoriesListSuccessResponse(data) {
                this.data = data.result.data;
            },
            getCategoriesListErrorResponse(response) {
                console.log(response);
            },
            getClass(status) {
                switch (status) {
                    case 0:
                        return 'danger';
                    case 1:
                        return 'success';
                }
            },
            getLabel(status) {
                switch (status) {
                    case 0:
                        return 'Не акитивен';
                    case 1:
                        return 'Активен';
                }
            },
            allowDrag(model, component) {
                if (model.name === 'Node 0-1') {
                    // can't be dragged
                    return false;
                }
                // can be dragged
                return true;
            },
            allowDrop(model, component) {
                if (model.name === 'Node 2-2') {
                    // can't be placed
                    return false;
                }
                // can be placed
                return true;
            },
            curNodeClicked(model, component) {
                // console.log('curNodeClicked', model, component);
            },
            dragHandler(model, component, e) {
                // console.log('dragHandler: ', model, component, e);
            },
            dragEnterHandler(model, component, e) {
                // console.log('dragEnterHandler: ', model, component, e);
            },
            dragLeaveHandler(model, component, e) {
                // console.log('dragLeaveHandler: ', model, component, e);
            },
            dragOverHandler(model, component, e) {
                // console.log('dragOverHandler: ', model, component, e);
            },
            dragEndHandler(model, component, e) {
                // console.log('dragEndHandler: ', model, component, e);
            },
            dropHandler(model, component, e) {
                // console.log('dropHandler: ', model, component, e);
            }
        }
    }
</script>
