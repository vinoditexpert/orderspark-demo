/**
 * @module : Carts
 * @use : Prepare the Cart related vuex store functionality 
 * @author : Vinod
 * @email : vinod.webappexpert@gmail.com 
 */
// Cart State
export const state = {
  cartProducts: [],
  cartAmount: 0,
  notify: {
    flag: false,
    type:'',
    message: ''
  },
};

// mutations
export const mutations = {
  ADD_CART_PRODUCT(state, payload) {
    state.cartProducts.push(payload)
  },
  REMOVE_CART_PRODUCT(state, payload) {
    const IndexIdFound = state.cartProducts.findIndex(x => x.id === payload.id);
    if (IndexIdFound !== -1){
      state.cartProducts.splice(IndexIdFound, 1);
    }
  },
  SET_CART_AMOUNT(state, amt) {
    state.cartAmount = amt
  },
  SET_NOTIFY(state, payload) {
    state.notify = payload
  }
};

// getters
export const getters = {
  getAllCartProducts(state) {
    return state.cartProducts
  },
  getCartAmount (state) {
    return state.cartAmount
  },
  getNotify (state) {
    return state.notify
  }
};

// actions
export const actions = {
  add({commit, dispatch, state}, payload) {
    const IndexIdFound = state.cartProducts.findIndex(x => x.id === payload.id)
    if (IndexIdFound === -1) {
      payload.qty = 1
      payload.total = payload.price
      commit('ADD_CART_PRODUCT', payload)
      dispatch('cartAmountCalculation')
      dispatch('notify', { flag: true, type:'success' ,message: 'Product added in cart successfully.' })
    } else {
      dispatch('notify', { flag: true, type: 'warning', message: 'Already in cart!' })
    }
  },
  remove({commit, dispatch}, payload) {
    commit('REMOVE_CART_PRODUCT', payload)
    dispatch('notify', { flag: true, type:'success', message: 'Product removed from cart successfully.' })
  },
  cartAmountCalculation({commit, state}) {
    let amt = 0
    state.cartProducts.forEach(product => {
      product.total = (product.qty * product.price)
      amt += product.total
    })
    commit('SET_CART_AMOUNT', amt)
  },
  notify({commit, state}, payload) {
    commit('SET_NOTIFY', payload)
  }
};
