<!-- app.vue -->

<script setup>
import MainPage from './components/MainPage.vue'
import Header from "./components/MainHeader.vue";
import Footer from "./components/MainFooter.vue";
</script>

<template>
  <v-app>
    <!-- Header -->
    <Header />

    <!-- Main content -->
    <v-main>
      <MainPage />
    </v-main>

    <!-- Footer -->
    <Footer />
  </v-app>
</template>
