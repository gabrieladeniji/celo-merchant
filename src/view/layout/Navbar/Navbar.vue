<template>
   <header class="section-header fixed-top" style="background: #fff;">
      <section class="header-main border-bottom">
         <div class="container" style="padding: 0 24px !important;">
            <div class="row align-items-center">
               <div class="col-lg-2 col-6">
                  <router-link class="brand-wrap" to="/">
                     <img alt="img" class="logo" src="/images/logo.png"/>
                  </router-link>
               </div>
               <div class="col-lg-6 col-12 col-sm-12">
                  <form class="search">
                     <div class="input-group w-100">
                        <input class="form-control" placeholder="Search" type="text"/>
                        <div class="input-group-append">
                           <button class="btn btn-success" type="submit">
                              <i class="fa fa-search"></i> Search
                           </button>
                        </div>
                     </div>
                  </form>
               </div>
               <div class="col-lg-4 col-sm-6 col-12">
                  <div class="widgets-wrap float-lg-right">
                     <div class="widget-header mr-3" :class="{'disabled-element': !cartItems.length}" style="cursor: pointer">
                        <router-link class="icon icon-sm rounded-circle border" to="/cart">
                           <i class="fa fa-shopping-cart"></i>
                        </router-link>
                        <span class="badge badge-pill badge-danger notify" v-if="cartItems.length">
                           {{ cartItems.length }}
                        </span>
                     </div>
                     <div class="widget-header icontext">
                        <a class="icon icon-sm rounded-circle border" href="#">
                           <i class="fa fa-user"></i>
                        </a>
                        <div class="text">
                           <span class="text-muted">Welcome!</span>
                           <div> User </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      <nav class="navbar navbar-main navbar-expand-lg navbar-light border-bottom">
         <div class="container" style="padding: 0 24px !important;">
            <button aria-controls="main_nav" aria-expanded="false" aria-label="Toggle navigation" class="navbar-toggler"
                    data-target="#main_nav" data-toggle="collapse" type="button">
               <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="main_nav">
               <ul class="navbar-nav">
                  <li class="nav-item dropdown">
                     <a class="nav-link pl-0" data-toggle="dropdown" href="#">
                        <strong> <i class="fa fa-bars"></i> & All category</strong>
                     </a>
                     <div class="dropdown-menu">
                        <a class="dropdown-item" href="#">Foods and Drink</a>
                        <a class="dropdown-item" href="#">Home interior</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Category 1</a>
                        <a class="dropdown-item" href="#">Category 2</a>
                        <a class="dropdown-item" href="#">Category 3</a>
                     </div>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="#">Fashion</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="#">Supermarket</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="#">Electronics</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="#">Baby & Toys</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="#">Fitness sport</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="#">Clothing</a>
                  </li>
                  <li class="nav-item">
                     <a class="nav-link" href="#">Furniture</a>
                  </li>
               </ul>
            </div>
         </div>
      </nav>

   </header>
</template>


<script>

   import {mapGetters} from 'vuex';

   export default {
      name: "Navbar",
      data() {
         return {};
      },
      computed: {
         ...mapGetters([
            'cartItems'
         ])
      }
   };
</script>


<style>
</style>