<template>
  <v-row
    class="ma-3"
    dense
  >
    <v-col
      class="mb-5"
      cols="12"
    >
      <v-row>
      <v-col
        md="6"
        class="pa-5"
      >
        <h2>Our Bestsellers</h2>
        <p class="caption mt-3">
          The tried and true, old and new favorites.
          Skincare and makeup essentials that fit seamlessly into your routine (and life!), leaving you glowy, dewy, fresh and ready for the day ahead.
          Treat yourself to one, two, or ten, and see the Glossier difference.
        </p>
      </v-col>
      <v-col md="6">
        <v-img
          :src="'https://images.ctfassets.net/p3w8f4svwgcg/0iRXbnPEj0yNK5ShknU9u/0e4b2a25efac9b110e30d8da24eb6869/OR-LP-image-3.png'"
          class="white--text align-end"
          height="200px"
        />
      </v-col>
      </v-row>
    </v-col>
    <v-col
      v-for="(product, index) in products"
      :key="'product-' + index"
      xs="6"
      sm="3"
      md="2"
    >
      <v-card
        outlined
        class="pa-3 mb-3"
      >
        <v-img
          :src="product.photoURL"
          class="white--text align-end"
        />
        <div class="product-body">
          <h5 class="product-name">
            {{ product.name }}
          </h5>
          <p class="text-ellipsis caption product-description">
            {{ product.description }}
          </p>
          <p class="text-center">
            ${{ product.price.toFixed(2) }} USD
          </p>
          <div class="text-center">
            <v-btn
              outlined
              color="dark"
              @click="addInCart(product)"
            >
              ADD TO CART
            </v-btn>
          </div>
        </div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'BestSellers',
  computed: {
    ...mapGetters({
      products: 'products/getAllProducts', // Get all products from store
    })
  },
  mounted() {
    this.fetchProducts()
  },
  methods: {
    ...mapActions({
       fetchProducts: 'products/fetchProducts', // Used for fetch all products
       addInCart: 'carts/add', // Add Product to Cart
    })
  },
}
</script>

<style scoped>
.product-name {
  text-align: center;
  font-size: 15px;
  margin: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.text-ellipsis {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
.product-description {
  height: 60px;
}
</style>
