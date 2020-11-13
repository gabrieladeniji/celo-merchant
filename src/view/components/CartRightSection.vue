<template>
   <aside class="col-md-4">

      <div class="card" v-if="utils.is_card_total_active">
         <div class="card-body">
            <form>
               <div class="form-group">
                  <label>Have coupon?</label>
                  <div class="input-group">
                     <input class="form-control" placeholder="Coupon code" type="text"/>
                     <span class="input-group-append">
                        <button class="btn btn-success">Apply</button>
                     </span>
                  </div>
               </div>
            </form>
         </div>
         <div class="card-body">
            <dl class="dlist-align">
               <dt>Total price:</dt>
               <dd class="text-right">
                  {{ cartTotal.symbol }}{{ cartTotal.amount | amountFormatter }}
               </dd>
            </dl>
            <dl class="dlist-align">
               <dt>Fee:</dt>
               <dd class="text-right">
                  {{ cartTotal.symbol }}{{ cartTotal.fee | amountFormatter }}
               </dd>
            </dl>
            <dl class="dlist-align">
               <dt>Total:</dt>
               <dd class="text-right h5">
                  <strong>{{ cartTotal.symbol }}{{ cartTotal.totalPlusFee }}</strong>
               </dd>
            </dl>
            <hr>
            <div class="text-center mt-4 mb-3">
               <button @click="makePurchase" class="btn btn-success">
                  Make Purchase
               </button>
            </div>
         </div>
      </div>

      <div class="card" v-if="utils.is_card_awaiting_payment_active">
         <div class="card-body text-center">
            <h6 class="mb-4">Pay with Celo Dollar</h6>
            <div style="width: 115px; padding: 7px 0; border: 1px solid rgb(53 208 128); margin: 0 auto;text-align: center;">
               <app-qrcode-vue :value="wallet.address" level="H" size="100"/>
            </div>
            <span class="pt-1 small text-muted">
               Awaiting payment <br>
               <span class="font-weight-black" style="font-size: 13px">{{ timer.human_readable_timeleft }}</span>
            </span>
            <div class="or-line body-2">
               <div class="or-line-wrapper">
                  <div class="or">OR</div>
               </div>
            </div>
            <div class="font-weight-normal text-left pb-2" style="font-size: 12px;">
               Copy Amount
            </div>
            <div class="celo-address-input--container mt-0">
               <input :value="cartTotal.totalPlusFee" class="celo-address-input"
                      disabled="disabled"
                      style="font-family: inherit !important; font-size: 14px !important;">
               <button @click="copy(cartTotal.totalPlusFee)" class="celo-copy-address">
                  <img alt="copy" src="/images/copy.png" width="20"/>
               </button>
            </div>
            <div class="font-weight-normal text-left pb-2" style="font-size: 12px;">
               Copy address
            </div>
            <div class="celo-address-input--container mt-0">
               <input :value="wallet.address" class="celo-address-input"
                      disabled="disabled"
                      style="font-family: inherit !important; font-size: 14px !important;">
               <button @click="copy(wallet.address)" class="celo-copy-address">
                  <img alt="copy" src="/images/copy.png" width="20"/>
               </button>
            </div>
         </div>
      </div>

      <div class="card" v-if="utils.is_card_payment_successful_active">
         <div class="card-body text-center">
            <h6 class="mb-4">Pay with Celo Dollar</h6>
            <div class="text-center">
               <img alt="img" src="/images/payment-success.png" width="100px"/>
            </div>
            <h6 class="pt-4 font-weight-bold">Payment successful!</h6>
            <div class="text-muted pl-3 pt-3 pb-2" style=" font-size: 13px;">
               Your order number is: 22013249
            </div>
            <div class="text-muted pl-3" style=" font-size: 13px;">
               We will email you an order confirmation with details and tracking information.
            </div>
         </div>
      </div>

   </aside>
</template>

<script>

   let interval;
   import {mapGetters} from 'vuex';
   import QrcodeVue from 'qrcode.vue';
   import generalMixin from '../../core/mixins/generalMixin';
   import {GET_CELO_BALANCE, CREATE_ESCROW_WALLET} from '../../core/store/modules/escrow';

   export default {
      name: "CartRightSection",
      data() {
         return {
            utils: {
               is_card_total_active: true,
               is_card_awaiting_payment_active: false,
               is_card_payment_successful_active: false
            },
            timer: {
               minutes: 15,
               human_readable_timeleft: '15:0'
            }
         }
      },
      mixins: [generalMixin],
      computed: {
         ...mapGetters([
            'wallet',
            'cartTotal'
         ])
      },
      components: {
         appQrcodeVue: QrcodeVue
      },
      methods: {
         copy(val) {
            this.$copyText(val).then(() => {
               alert('Copied!');
            }).catch(() => {
               alert('Copy failed');
            });
         },
         makePurchase() {
            this.$store.dispatch(CREATE_ESCROW_WALLET).then(() => {
               this.gotoCardAwaiting();
               this.startAwaitingPayment();
            }).catch(() => {
               alert('Something happend');
            })
         },
         startAwaitingPayment() {
            let c = 0;
            let secs = this.timer.minutes * 60;

            interval = setInterval(() => {
               this.timer.human_readable_timeleft = this.convertToHumanReadable(secs - c);

               this.hasCeloArrived();

               if (this.timer.human_readable_timeleft === '0:0') {
                  clearInterval(interval);
               }

               c++;
            }, 1000);
         },
         async hasCeloArrived() {
            return await this.$store.dispatch(GET_CELO_BALANCE, this.wallet.address).then((bal) => {
               if (bal >= 1) {
                  clearInterval(interval);
                  this.gotoCardPaymentSuccessful();
               }
            })
         },
         gotoCardAwaiting() {
            this.utils.is_card_total_active = false;
            this.utils.is_card_awaiting_payment_active = true;
         },
         gotoCardPaymentSuccessful() {
            this.utils.is_card_total_active = false;
            this.utils.is_card_awaiting_payment_active = false;
            this.utils.is_card_payment_successful_active = true;
         },
      }
   }
</script>

<style scoped>

</style>