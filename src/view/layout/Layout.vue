<template>

   <div class="page-content">

      <div class="container">

         <!-- Nav -->
         <app-navbar/>

         <!-- Pages -->
         <router-view/>

      </div>

      <!-- Footer -->
      <app-footer/>

   </div>

</template>


<script>

   import Navbar from './Navbar/Navbar';
   import Footer from './Footer/Footer';

   export default {
      name: "Layout",
      components: {
         appNavbar: Navbar,
         appFooter: Footer
      }
   }
</script>


<style type="less">

   /* style.less */
   @import "../../assets/css/style.less";

   /* Fontawesome Free */
   @import "~@fortawesome/fontawesome-free/css/all.min.css";

   .disabled-element {
      cursor: wait;
      opacity: 0.5;
      pointer-events: none !important;
   }

</style>