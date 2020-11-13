import productsModel from '../../models/products';

// actions
export const ADD_ITEM_TO_CART = 'addItemToCart';
export const DEL_ITEM_FROM_CART = 'deleteItemFromCart';
export const ADD_CART_PRICE_TOTAL = 'addCartPriceTotal';

// mutations
const MUTATE_ADD_CART_ITEM = 'addCartItem';
const MUTATE_DEL_CART_ITEM = 'deleteCartItem';
const MUTATE_ADD_CART_PRICE_TOTAL = 'addCartPriceTotal';


const state = {
   products: productsModel,
   cartItems: [],
   cartTotal: {
      fee: 0,
      amount: 0,
      symbol: null,
      totalPlusFee: 0
   }
};

const getters = {
   products: (state) => {
      return state.products
   },
   cartItems: (state) => {
      return state.cartItems
   },
   cartTotal: (state) => {
      return state.cartTotal
   }
};

const mutations = {
   [MUTATE_ADD_CART_ITEM]: (state, item) => {
      state.cartItems.push(item);
   },
   [MUTATE_DEL_CART_ITEM]: (state, item) => {
      let f = state.cartItems.filter((i) => i.id !== item.id);
      state.cartItems.splice(0, state.cartItems.length);
      if (f && f.length) {
         f.forEach((f) => {
            state.cartItems.push(f);
         });
      }
   },
   [MUTATE_ADD_CART_PRICE_TOTAL]: (state, total) => {
      state.cartTotal = total;
   }
};

const actions = {
   [ADD_ITEM_TO_CART]: (context, item) => {
      context.commit(MUTATE_ADD_CART_ITEM, item);
   },
   [DEL_ITEM_FROM_CART]: (context, item) => {
      context.commit(MUTATE_DEL_CART_ITEM, item);
   },
   [ADD_CART_PRICE_TOTAL]: (context, total) => {
      context.commit(MUTATE_ADD_CART_PRICE_TOTAL, total);
   }
};


export default {
   state,
   getters,
   mutations,
   actions
}
