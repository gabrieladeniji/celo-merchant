import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);


// store
import store from './core/store/store';


function isCartEmpty(to, from, next) {
   if(store.getters.cartItems.length <= 0) {
      next({ name: 'Index' })
   } else {
      next()
   }
}

const routes = [
   {
      path: '/',
      component: () => import('./view/layout/Layout'),
      children: [
         {
            path: '/',
            name: 'Index',
            component: () => import('./view/pages/Index')
         },
         {
            path: '/cart',
            name: 'Cart',
            component: () => import('./view/pages/Cart'),
            beforeEnter: isCartEmpty
         }
      ]
   }
];

export default new Router({
   routes,
   mode: 'history',
   base: process.env.BASE_URL,
});
