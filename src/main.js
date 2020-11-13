import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './core/store/store';
import celoService from './core/service/celo.service';
import walletService from './core/service/wallet.service';


Vue.config.productionTip = false;

// Service
celoService.init('https://alfajores-forno.celo-testnet.org');
walletService.init();

// Plugins
import 'jquery';
import './core/plugins/vuetify';
import './core/plugins/vue-clipboard';


new Vue({
   store,
   router,
   render: h => h(App)
}).$mount('#app');
