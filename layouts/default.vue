<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <img
        class="vuetify-logo"
        alt="order spark Logo"
        src="https://orderspark.com/_nuxt/d43b1e1ef8c9f6ad865d42eb3a077f95.svg"
      />
      <v-spacer />
      <v-btn
        class="mr-5"
        icon
        @click.stop="rightDrawer = !rightDrawer"
      >
        <v-icon v-if="cartProducts.length === 0">mdi-cart</v-icon>
        <v-badge
          v-else
          color="green"
          :content="cartProducts.length"
        >
          <v-icon>mdi-cart</v-icon>
        </v-badge>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <Nuxt />
      </v-container>
      <v-snackbar
          v-model="notify.flag"
          :top="true"
          :color="notify.type === 'success' ? 'green accent-4' : 'yellow darken-4'"
          elevation="24"
        >
          {{notify.message}}
          <template #action="{ attrs }">
            <v-btn
              text
              small
              rounded
              v-bind="attrs"
              @click="updateNotify({flag: false, message: ''})"
            >
              <v-icon color="red">mdi-close</v-icon>
            </v-btn>
          </template>
        </v-snackbar>
    </v-main>
    <!-- Note: Will be create cart separate component if having multiple Modal need to open in drawer -->
    <v-navigation-drawer
      v-model="rightDrawer"
      :width="'600px'"
      :right="true"
      temporary
      fixed
    >
      <v-container class="pt-0">
        <div class="d-flex">
            <v-btn
              color="lightgrey"
              class="my-3"
              icon
              @click="rightDrawer = !rightDrawer"
            >
              <v-icon color="black">mdi-close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          <h3 class="mt-4">CART DETAIL</h3>
           <v-spacer></v-spacer>
        </div>
          <v-data-table
            v-if="cartProducts.length > 0"
            :headers="headers"
            :items="cartProducts"
            hide-default-footer
          >
          
           <template #[`item.price`]="{ item }">
            <!-- Note: will optimize using create vue filter -->
              ${{item.price.toFixed(2)}} USD
            </template>
            <template #[`item.qty`]="{ item }">
              <v-text-field
                v-model="item.qty"
                outlined
                required
                dense
                hide-details
                min="1"
                type="number"
                onkeydown="return false"
                @input="cartAmountInit()"
              ></v-text-field>
            </template>
            <template #[`item.total`]="{ item }">
              <!-- Note: will optimize using create vue filter -->
              ${{item.total.toFixed(2)}} USD
            </template>
            <template #[`item.action`]="{ item }">
              <v-btn
                color="lightgrey"
                class="my-3"
                icon
                @click="remove(item); cartAmountInit()"
              >
                <v-icon color="red">mdi-close</v-icon>
              </v-btn>
            </template>
          </v-data-table>
          <v-card
            v-if="cartProducts.length > 0"
            outlined
            class="ma-2 pa-4 text-center"
          >
            <!-- Note: will optimize using create vue filter -->
            Total Amount: <b>${{cartAmount.toFixed(2)}} USD</b>
            <v-btn
              class="ml-4"
              dark
              color="green"
            >
                CHECKOUT
            </v-btn>
          </v-card>
          <v-card
            v-if="cartProducts.length === 0"
            outlined
            class="ma-2 pa-4 text-center"
          >
            Your cart is empty!
          </v-card>
      </v-container>
    </v-navigation-drawer>
    <v-footer :absolute="true" app>
      <span>&copy; {{ new Date().getFullYear() }} Order Spark Demo</span>
    </v-footer>
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'DefaultLayout',
  data() {
    return {
      clipped: false,
      rightDrawer: false,
      snackbar: true,
      headers: [
          {
            text: 'Product Name',
            align: 'start',
            value: 'name',
            sortable: false,
          },
          {
            text: 'Price',
            value: 'price',
            sortable: false,
          },
          {
            text: 'Qty',
            value: 'qty',
            align: 'center',
            width: '120px',
            sortable: false,
          },
          {
            text: 'Total',
            value: 'total',
            sortable: false,
          },
          {
            text: '',
            value: 'action',
            sortable: false,
          },
        ],
    }
  },
  computed: {
    ...mapGetters({
      cartProducts: 'carts/getAllCartProducts', // Get all product i.e. added in cart
      cartAmount: 'carts/getCartAmount', // Get Cart Amount
      notify: 'carts/getNotify', // Snackbar for notification
    }),
  },
  mounted() {
    this.cartAmountInit()
  },
  methods: {
    ...mapActions({
      /**
       * @use To remove product from cart
       */
      remove: 'carts/remove',
      /**
       * @use Re-calculating the cart total amount when cart item added / Qty updated
       */
      cartAmountInit: 'carts/cartAmountCalculation',
      /**
       * @use Update the snackbar status
       */
      updateNotify: 'carts/notify',
    }),
  },
}
</script>
