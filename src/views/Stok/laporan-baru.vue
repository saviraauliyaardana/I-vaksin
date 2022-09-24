<template>
  <v-main>
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Stok Vaksin</h2>
    </v-app-bar>
    <v-container fluid class="px-10">
      <v-app-bar
        id="app-bars"
        height="100"
        width="1250"
        class="mx-auto rounded-lg"
        elevation="3"
        @click="() => redirect()"
      >
        <v-row>
          <v-col cols="11"
            ><h2 class="black--text font-weight-medium">
              Registrasi Vaksin Masuk
            </h2></v-col
          >
          <v-col cols="1" class="text-end my-2">
            <v-icon color="primary">mdi-circle</v-icon></v-col
          >
        </v-row>
      </v-app-bar>
      <br />
      <v-app-bar
        @click="() => pushPage()"
        id="app-bar"
        height="100"
        width="1250"
        class="mx-auto rounded-lg"
        elevation="3"
      >
        <v-row>
          <v-col cols="11"
            ><h2 class="black--text font-weight-medium">
              Registrasi Vaksin Keluar
            </h2></v-col
          >
          <v-col cols="1" class="text-end my-2">
            <v-icon color="primary">mdi-circle</v-icon></v-col
          >
        </v-row>
      </v-app-bar>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "LaporanBaru",
  methods: {
    pushPage() {
      return this.$router.push(
        "/registrasi-vaksin-keluar"
      );
    },
    redirect() {
      return this.$router.push(
        "/registrasi-vaksin-masuk"
      );
    },
  },
};
</script>

<style>
#app-bars {
  background-color: rgba(180, 241, 255, 1);
}
#app-bar {
  background-color: rgba(180, 241, 255, 1);
}
</style>
