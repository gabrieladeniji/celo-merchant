<template>
   <div>

      <section class="section-intro padding-y-sm">
         <div class="container">
            <div class="intro-banner-wrap">
               <img alt="img" class="img-fluid rounded" src="/images/banner.png"/>
            </div>
         </div>
      </section>

      <!-- Products -->
      <app-products />

   </div>
</template>

<script>

   import Products from '../components/Products';

   export default {
      data: () => ({}),
      components: {
         appProducts: Products,
      },
   };
</script>

<style>
   .application {
      font-family: inherit !important;
      line-height: 1.5;
      text-rendering: geometricPrecision;
      text-shadow: 1px 1px 1px rgba(0, 0, 0, 0.004);
      -webkit-font-smoothing: antialiased;
      color: #32465a !important;
   }

   .page-content {
      background: #ffff;
      padding-top: 100px;
   }

   @media (min-width: 300px)and (max-width: 767px) {
   }
</style>