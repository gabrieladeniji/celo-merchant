<template>
   <div>
      <section class="section-pagetop bg">
         <div class="container">
            <h2 class="title-page">Shopping cart</h2>
         </div>
      </section>

      <section class="section-content padding-y">
         <div class="container">
            <div class="row">
               <main class="col-md-8">
                  <div class="card">
                     <table class="table table-borderless table-shopping-cart">
                        <thead class="text-muted">
                        <tr class="small text-uppercase">
                           <th scope="col">Product</th>
                           <th scope="col" width="120">Quantity</th>
                           <th scope="col" width="120">Price</th>
                           <th class="text-right" scope="col" width="200"></th>
                        </tr>
                        </thead>
                        <tbody>

                        <template v-for="(item, i) in cartItems">
                           <tr :key="i">
                              <td>
                                 <figure class="itemside">
                                    <div class="aside">
                                       <img :src="`images/items/${item.imagePathName}`" alt="item" class="img-sm"/>
                                    </div>
                                    <figcaption class="info">
                                       <span class="title text-dark">
                                          {{ item.name }}
                                       </span>
                                    </figcaption>
                                 </figure>
                              </td>

                              <td class="position-relative">
                                 <select @change="selectQty(i)" class="form-control" v-model="utils.quantity[i]">
                                    <template v-for="(stock, i2) in item.totalStocks">
                                       <option :key="i2" :value="stock">{{ stock }}</option>
                                    </template>
                                 </select>
                                 <i class="fa fa-chevron-down"
                                    style="position: absolute;right: 29px;top: 21px;font-size: 10px;"></i>
                              </td>

                              <td>
                                 <div class="price-wrap">
                                    <var class="price">{{ item.symbol }}{{ utils.itemPrice[i] | amountFormatter}}</var>
                                    <small class="text-muted">
                                       {{ item.symbol }}{{ item.price | amountFormatter }} each
                                    </small>
                                 </div>
                              </td>

                              <td :class="{'disabled-element': i === 0}" class="text-right">
                                 <button @click="removeItem(item)" class="btn btn-light">Remove</button>
                              </td>

                           </tr>
                        </template>

                        </tbody>
                     </table>

                     <router-link class="card-body border-top" to="/">
                        <button class="btn btn-light">
                           <i class="fa fa-chevron-left"></i> Continue shopping
                        </button>
                     </router-link>
                  </div>

                  <div class="alert alert-success mt-3">
                     <p class="icontext">
                        <i class="icon text-success fa fa-truck"></i> Free Delivery within 1-2 weeks
                     </p>
                  </div>

               </main>

               <!-- Right Section -->
               <app-right-section/>

            </div>
         </div>
      </section>
   </div>
</template>

<script>

   import {mapGetters} from 'vuex';
   import generalMixin from '../../core/mixins/generalMixin';
   import RightSection from '../components/CartRightSection';
   import {DEL_ITEM_FROM_CART, ADD_CART_PRICE_TOTAL} from '../../core/store/modules/product';

   export default {
      data: () => ({
         utils: {
            quantity: [],
            itemPrice: []
         },
         swap: {
            total: '',
         }
      }),
      mixins: [generalMixin],
      components: {
         appRightSection: RightSection
      },
      computed: {
         ...mapGetters([
            'cartItems'
         ])
      },
      watch: {
         'cartItems'() {
            this.init();
            this.calculateTotalItem();
         }
      },
      methods: {
         init() {
            this.resetArr();
            this.cartItems.forEach((item, i) => {
               this.utils.quantity[i] = 1;
               this.utils.itemPrice[i] = this.cartItems[i].price;
            });
            this.calculateTotalItem();
         },
         selectQty(i) {
            this.utils.itemPrice[i] = (this.cartItems[i].price * this.utils.quantity[i]);
            this.calculateTotalItem();
         },
         async calculateTotalItem() {
            let total = this.utils.itemPrice.reduce((c, l) => c + l);
            let fee = Math.abs(total / 2);
            await this.$store.dispatch(ADD_CART_PRICE_TOTAL, {
               fee,
               amount: total,
               symbol: this.cartItems[0].symbol,
               totalPlusFee: this.amountFormatter(total + fee)
            });
         },
         async removeItem(item) {
            await this.$store.dispatch(DEL_ITEM_FROM_CART, item);
         },
         resetArr() {
            this.utils.quantity = [];
            this.utils.itemPrice = [];
         }
      },
      created() {
         this.init();
      }
   };
</script>

<style>
</style>