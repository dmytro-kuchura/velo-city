let store = {
    debug: true,
    state: {
        list: [],
        totalCount: 0,
        totalPrice: 0.00,
    },

    mutations: {
        loadCart(state) {
            axios.get("/api/v1/cart/list")
                .then(function ({data}) {
                    state.list = data.result.list;
                    state.totalCount = data.result.totalCount;
                    state.totalPrice = data.result.totalPrice;
                })
                .catch(function (response) {
                    if (this.debug) {
                        console.log(response);
                    }
                })
        },
    },
};

export default store;
