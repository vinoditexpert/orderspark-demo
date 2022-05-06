/**
 * @module : Products
 * @use : Prepare the Product related vuex store functionality 
 *  In use UI - Bestsellers Home Page
 * @author : Vinod
 * @email : vinod.webappexpert@gmail.com 
 */
export const state = {
  products: []
};

// mutations
export const mutations = {
  SET_PRODUCTS(state, products) {
    state.products = products;
  },
};

// getters
export const getters = {
  getAllProducts(state) {
    return state.products;
  }
};

// actions
export const actions = {
  fetchProducts({ commit, state }, config) {
    const products =  [
      {
        id: 2,
        photoURL: 'https://images.ctfassets.net/p3w8f4svwgcg/3cDwW57McUOqWW8kgeeMcE/2c262ac315fd209bbb0aa4eb1de21248/boybrow-silo.png',
        name: 'Boy Brow',
        price: 123,
        description: 'Our award-winning instant brow groomer fluffs and shapes brows while thickening and grooming them into place.',
      },
      {
        id: 3,
        photoURL: 'https://images.ctfassets.net/p3w8f4svwgcg/64gYS3gxX2WMmoww2k6kCY/18c77bf091443901aa46847bbdbe55c6/cloudpaint-dawn.png',
        name: 'Cloud Paint',
        price: 12.3,
        description: 'A seamless, bailable gel-cream blush that’s fun and easy to wear.',
      },
      {
        id: 4,
        photoURL: 'https://images.ctfassets.net/p3w8f4svwgcg/2uE4965Ah2cucyEoCeouAY/b6301ecdad5d5a6ddcd7588d48f103ac/makeup_set.png',
        name: 'The Makeup Set',
        price: 128.54,
        description: 'Three easy-to-apply makeup essentials for your brows, cheeks, and lashes.',
      },
    ]
    commit('SET_PRODUCTS', products);
    return products;
  },
};
