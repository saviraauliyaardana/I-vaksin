<template>
  <v-main class="main">
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Media & Artikel</h2>
    </v-app-bar>

    <div class="ma-10">
      <!-- Table Banner Iklan -->
      <h2>Banner Iklan</h2>

      <v-card outlined color="primary" elevation="1" class="mt-5">
        <v-data-table
          height="350px"
          fixed-header
          calculate-widths
          :headers="headersIklan"
          :items="dessertsIklan"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.image`]="{ item }">
            <v-img
              :src="item.image"
              max-height="100px"
              width="500"
              class="my-5"
            ></v-img>
          </template>

          <template v-slot:[`item.id`]="{ item }">
            <v-btn class="mr-2" @click="editItems(item.id)" color="error"
              >Hapus</v-btn
            >
          </template>
        </v-data-table>
      </v-card>

      <div id="putus" class="mt-5">
        <v-toolbar
          color="transparent"
          elevation="0"
          @click="() => goToBanner()"
        >
          <v-btn color="transparent" text icon width="100%" height="100%">
            <v-icon large color="black">mdi-plus-circle-outline</v-icon>
            <h2 class="fontss font-weight-medium mx-3">Banner Iklan Baru</h2>
          </v-btn>
        </v-toolbar>
      </div>

      <!-- Table Artikel Berita -->
      <h2 class="mt-10">Artikel Berita</h2>
      <v-card outlined color="primary" elevation="1" class="mt-5">
        <v-data-table
          height="350px"
          fixed-header
          calculate-widths
          :headers="headersBerita"
          :items="dessertsBerita"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.context`]="{ item }">
            <span class="truncate"> {{ item.context }} </span>
          </template>

          <template v-slot:[`item.id`]="{ item }">
            <v-btn class="mr-2" @click="editItem(item.id)" color="error"
              >Hapus</v-btn
            >
          </template>
        </v-data-table>
      </v-card>

      <div id="putus" class="mt-5">
        <v-toolbar
          color="transparent"
          elevation="0"
          @click="() => goToArtikel()"
        >
          <v-btn color="transparent" text icon width="100%" height="100%">
            <v-icon large color="black">mdi-plus-circle-outline</v-icon>
            <h2 class="fontss font-weight-medium mx-3">Artikel Baru</h2>
          </v-btn>
        </v-toolbar>
      </div>
    </div>
  </v-main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      pageCount: 0,
      page: 1,
      search: "",
      headersIklan: [
        { text: "Banner", value: "image", sortable: false },
        { text: "Action", value: "id", sortable: false },
      ],

      headersBerita: [
        { text: "Judul", value: "title" },
        { text: "Keterangan", value: "context" },
        { text: "Action", value: "id", sortable: false },
      ],

      dessertsIklan: [],

      dessertsBerita: [],
      editedindex: -1,
    };
  },
  async mounted() {
    const result = await axios.get("/advertise");
    this.dessertsIklan = result.data.Advertise;

    // get artikel
    const response = await axios.get("/news");
    this.dessertsBerita = response.data.News;
    console.log(response);
  },
  methods: {
    goToBanner() {
      return this.$router.push("/menu-banner-iklan");
    },
    goToArtikel() {
      return this.$router.push("/MenuBannerArtikel");
    },
    editItems(id) {
      const response = axios.delete("/advertise/" + id);
      this.dessertsIklan.splice(this.editedindex, 1);

      location.reload();
      console.log(response);
    },
    editItem(id) {
      const response = axios.delete("/news/" + id);
      this.dessertsBerita.splice(this.editedindex, 1);

      location.reload();
      console.log(response);
    },
  },
};
</script>

<style>
.truncate {
  width: 10px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
#putus {
  border-style: dashed;
  border-width: 3px;
  border-color: rgba(63, 63, 63, 0.801);
  border-radius: 15px;
}
</style>
