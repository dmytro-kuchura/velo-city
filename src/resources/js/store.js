let store = {
    state: {
        list: [],
        totalCount: 0,
        totalPrice: 0.00,
    },

    mutations: {
        loadCart(state, items) {
            state.list = items.list;
            state.totalCount = items.totalCount;
            state.totalPrice = items.totalPrice;
        },
    }
};

export default store;
