<template>
  <v-main class="main">
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Menu Berita Artikel</h2>
    </v-app-bar>

    <v-card class="rounded-xl pa-10 ma-10">
      <div>
        <v-col xs="12">
          <h2>Judul Artikel</h2>

          <v-text-field
            v-model="berita.title"
            outlined
            label="Masukkan Judul Artikel"
            :rules="JudulRules"
            counter
            maxlength="50"
            hint="Judul tidak melebihi 50 huruf"
          ></v-text-field>
        </v-col>

        <v-col>
          <h2>Isi Artikel</h2>
          <v-text-field
            v-model="berita.context"
            outlined
            name="input-7-4"
            label="Ketik Berita Disini"
            :rules="ArtikelRules"
            height="500"
            counter
            maxlength="3000"
          ></v-text-field>
        </v-col>

        <v-layout justify-center>
          <v-btn
            depressed
            color="primary"
            x-large
            class="mr-3"
            @click="() => goTo()"
            >Kembali</v-btn
          >

          <v-btn outlined depressed color="primary" x-large @click="submit"
            >Save</v-btn
          >
        </v-layout>
      </div>
    </v-card>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      berita: {
        title: "",
        context: "",
      },

      JudulRules: [(v) => v.length <= 49 || "Maksimal 50 Karakter"],
      ArtikelRules: [(v) => v.length <= 2999 || "Maksimal 3000 Karakter"],
    };
  },
  mounted() {
    console.log("tes", this.berita.title);
  },
  methods: {
    submit() {
      const response = axios.post("/news", this.berita);
      console.log(response);
      alert("Succes");
      return this.$router.push("/media-dan-artikel");
    },
    goTo() {
      return this.$router.push("/media-dan-artikel");
    },
  },
};
</script>

<style>
#putus {
  border-style: dashed;
  border-width: 2px;
  border-color: rgba(99, 99, 99, 0.801);
  border-radius: 15px;
}

/* .main {
  background: linear-gradient(180deg, #ffffff 14.37%, #e3f5fd 100%);
} */
.fontss {
  color: rgb(27, 27, 27);
}
#bar {
  background-color: rgba(34, 155, 216, 1);
}
</style>
