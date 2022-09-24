<template>
  <v-app style="background: linear-gradient(#ffffff, #cdf0ff)">
    <v-app-bar id="bar" absolute class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Pembuatan Sesi Vaksin</h2>
    </v-app-bar>
    <v-container class="pa-10" style="margin-top: 35px">
      <!-- Tambah Sesi Baru -->
      <div id="putus">
        <v-toolbar color="transparent" elevation="0" @click="() => gas()">
          <v-btn color="transparent" text icon width="100%" height="100%">
            <v-icon large color="black"> mdi-plus-circle-outline </v-icon>
            <h2 class="fontss font-weight-medium mx-3">Buat Sesi Baru</h2>
          </v-btn>
        </v-toolbar>
      </div>

      <br />

      <!-- Button -->
      <h2>Sesi Vaksinasi Yang Tersedia</h2>

      <br />

      <v-row class="justify-space-between" style="height: 120px">
        <v-col cols="6"> </v-col>
        <v-col cols="5">
          <v-autocomplete
            @click="get_id"
            @change="onchange"
            :items="hospital"
            item-text="name"
            item-value="id"
            v-model="id_hospital"
            dense
            placeholder=" Cari nama rumah sakit"
            outlined
            color="primary"
            x-small
          >
          </v-autocomplete>
        </v-col>
      </v-row>
      <!-- List Sesi Vaksinasi -->

      <v-card
        id="card"
        :loading="loading"
        :disabled="disabled"
        v-for="s in Sessions"
        :key="s.id"
        style="
          border: solid #1789bc;
          margin-top: 20px;
          border-radius: 10px;
          padding: 10px;
        "
      >
        <v-card-title style="background-color: #1789bc; border-radius: 15px">{{
          data_hospital.name
        }}</v-card-title
        ><br />
        <v-card-actions>{{ data_hospital.address }}</v-card-actions>
        <v-card-actions>{{ s.sesi }}</v-card-actions>
        <v-card-actions>Jenis Vaksin Sinovac</v-card-actions>
        <v-card-actions>Stok Vaksin 1000 buah</v-card-actions>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  name: "vaksinasiSessionPage",
  data() {
    return {
      data_hospital: [],
      disabled: null,
      aktif: false,
      hospital: [],
      id_hospital: "",
      Sessions: [],
    };
  },
  async mounted() {
    const response = await axios.get("/hospitals/" + this.id_hospital);
    console.log(response);
  },

  methods: {
    async get_id() {
      const response = await axios.get("/hospitals");
      this.hospital = await response.data.Hospitalss;
      console.log("apanih", this.hospital);
    },
    async onchange() {
      await axios
        .get("/session/" + this.id_hospital)
        .then((response_sesi) => {
          this.Sessions = response_sesi.data.Sessions;
          console.log("iisii", this.Sessions);
          if (this.Sessions.status == 200) {
            this.disabled = false;
            this.loading = false;
            document.getElementById("card").style.display = "block";
          }
        })
        .catch((error) => {
          console.log("ini error nya", error.message);
          if (error) {
            this.id_hospital = "";
            document.getElementById("card").style.display = "none";
          }
        });
      const res_hospital = await axios.get("/hospitals/" + this.id_hospital);

      this.data_hospital = res_hospital.data.hospitals;
      console.log(this.data_hospital);

      const res = await axios.get("/vaccine/" + this.Sessions.vaccine_id);
      console.log("apaa", res);
    },

    gas() {
      return this.$router.push("/addsessions");
    },
  },
};
</script>

<style>
#putus {
  border-style: dashed;
  border-width: 3px;
  border-color: rgba(63, 63, 63, 0.801);
  border-radius: 15px;
}
.fontss {
  color: rgb(27, 27, 27);
}
</style>
