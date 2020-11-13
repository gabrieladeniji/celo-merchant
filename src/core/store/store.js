import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import escrow from './modules/escrow';
import product from './modules/product';


export default new Vuex.Store({
   modules: {
      escrow,
      product
   }
});