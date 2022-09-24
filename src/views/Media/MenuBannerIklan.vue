<template>
  <v-main class="main">
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Menu Banner Iklan</h2>
    </v-app-bar>

    <v-card class="rounded-xl pa-10 ma-10">
      <v-row>
        <v-col cols="6">
          <h2 class="mx-5">Preview</h2>
          <v-card height="auto" width="300" class="mx-auto">
            <v-system-bar dark color="indigo darken-3">
              <v-spacer></v-spacer>
              <v-icon>mdi-wifi-strength-4</v-icon>
              <v-icon>mdi-signal-cellular-outline</v-icon>
              <v-icon>mdi-battery</v-icon>
              <span>12:30</span>
            </v-system-bar>
            <v-toolbar color="blue lighten-1" class="rounded-0">
              Hy User
            </v-toolbar>

            <v-img
              max-width="100%"
              :src="post_image.image"
              height="100"
              contain
              class="rounded-0 grey"
            ></v-img>
            <v-container class="blue lighten-3">
              <v-toolbar color="blue lighten-1 my-3">
                <div>
                  <h4>Daftar Vaksin</h4>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </h6>
                </div>
              </v-toolbar>
              <v-toolbar color="blue lighten-1">
                <div>
                  <h4>Cek Status Pendaftaran</h4>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </h6>
                </div>
              </v-toolbar>
              <v-toolbar color="blue lighten-1 my-3">
                <div>
                  <h4>Cek Sertifikat</h4>
                  <h6>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </h6>
                </div>
              </v-toolbar>
            </v-container>
            <v-container>
              <h4>Seputar Vaksin</h4>
            </v-container>
          </v-card>
        </v-col>
        <v-col cols="6">
          <h2>Upload Banner</h2>
          <v-file-input
            v-model="post_image.image"
            d
            accept=".png, .jpeg, .jpg"
            hint="File extentions (.png, .jpg, .jpeg) File Size limits (max: 10mb)"
            placeholder="Drag Foto Disini"
            prepend-icon=""
            outlined
            filled
            @change="Preview_image"
            height="300"
          >
          </v-file-input>
          <div>
            <hr />
            <h3 class="my-3 text-center">Atau</h3>
            <hr />
          </div>
          <br />
          <v-file-input
            color="primary"
            @change="Preview_image"
            v-model="post_image.image"
            accept=".png, .jpeg, .jpg"
            hint="File extentions (.png, .jpg, .jpeg) File Size limits (max: 10mb)"
            prepend-icon=""
            outlined
            filled
            label="Upload profile image ( format jpg ukuran 1280 x 252 )"
            dense
          ></v-file-input>
        </v-col>
      </v-row>
      <v-layout justify-center class="mt-10">
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
    </v-card>
  </v-main>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      post_image: {
        image: null,
      },
    };
  },

  methods: {
    goTo() {
      return this.$router.push("/media-dan-artikel");
    },

    Preview_image() {
      this.post_image.image = URL.createObjectURL(this.post_image.image);
    },

    async submit() {
      const response = await axios.post("/advertise", this.post_image);
      console.log("tes = ", response.status);
      if (response.status == 201) {
        alert("Succes add banner");
        return this.$router.push("/media-dan-artikel");
      }
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
