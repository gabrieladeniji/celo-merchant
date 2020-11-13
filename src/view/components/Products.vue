<template>
   <section class="section-content">
      <div class="container">

         <header class="section-heading">
            <h3 class="section-">Popular products</h3>
         </header>

         <div class="row">

            <!-- Iterate products -->
            <template v-for="(product, i) in products">
               <div class="col-md-3" :key="i">
                  <div class="card card-product-grid">
                     <a class="img-wrap" href="#">
                        <img alt="item" :src="`images/items/${product.imagePathName}`"/>
                     </a>
                     <figcaption class="info-wrap">
                        <span>{{ product.name }}</span>
                        <div class="rating-wrap">
                           <ul class="rating-stars">
                              <li class="stars-active" :style="`width:${product.reviews / 100}%`">
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                              </li>
                              <li>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                                 <i class="fa fa-star"></i>
                              </li>
                           </ul>
                           <span class="label-rating text-muted">{{ product.reviews | amountFormatter }} reviews</span>
                        </div>
                        <div class="price mt-1">{{ product.symbol }}{{ product.price }}</div>

                        <button class="btn mt-3" @click="addToCart(product)" :class="isItemAddedToCart(product)">
                           Add to cart
                        </button>

                     </figcaption>
                  </div>
               </div>
            </template>

         </div>
      </div>
   </section>
</template>


<script>

   import {mapGetters} from 'vuex';
   import generalMixin from '../../core/mixins/generalMixin';
   import {ADD_ITEM_TO_CART, DEL_ITEM_FROM_CART} from '../../core/store/modules/product';

   export default {
      name: "Products",
      data() {
         return {}
      },
      mixins: [generalMixin],
      computed: {
         ...mapGetters([
             'products',
             'cartItems'
         ]),
      },
      methods: {
         async addToCart(product) {
            if(!this.cartItems.find((item) => item.id === product.id)) {
               await this.$store.dispatch(ADD_ITEM_TO_CART, product);
            } else {
               await this.$store.dispatch(DEL_ITEM_FROM_CART, product);
            }
         },
         isItemAddedToCart(product) {
            if(this.cartItems.find((item) => item.id === product.id)) {
               return 'btn-success';
            } else {
               return 'btn btn-outline-success';
            }
         }
      },
   }
</script>


<style scoped>

</style>