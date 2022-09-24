<template>
  <v-main class="main">
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Data Registrasi Vaksinasi</h2>
    </v-app-bar>
    <v-container class="px-10">
      <DataVaksin />
    </v-container>
  </v-main>
</template>
<script>
import DataVaksin from "../../components/data.vue";

export default {
  name: "DataRegistrasi",
  components: {
    DataVaksin,
  },
};
</script>

<style>
.main {
  background: linear-gradient(180deg, #ffffff 14.37%, #e3f5fd 100%);
}
</style>
