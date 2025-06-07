<template>
        <!-- Footer -->
    <v-footer app class="d-flex flex-column pa-0" elevation="0">
      <div class="bg-primary d-flex w-100 align-center px-4">
       Get connected with us on social networks!
        <v-spacer></v-spacer>
        <v-btn
          v-for="icon in icons"
          :key="icon"
          class="mx-2"
          :icon="icon"
          variant="plain"
          size="small"
        ></v-btn>
      </div>

      <div class="px-4 py-1 bg-black text-center w-100 ">
        {{ new Date().getFullYear() }} — >Team Management Co.
      </div>
    </v-footer>
</template>