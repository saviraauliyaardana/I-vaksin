<template>
  <v-main class="main">
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Stok Vaksin</h2>
    </v-app-bar>
    <v-container fluid class="px-10">
      <div id="putus">
        <v-toolbar color="transparent" elevation="0" @click="() => goTo()">
          <v-btn color="transparent" text icon width="100%" height="100%">
            <v-icon large color="black">mdi-plus-circle-outline</v-icon>
            <h2 class="fontss font-weight-medium mx-3">Buat Laporan Baru</h2>
          </v-btn>
        </v-toolbar>
      </div>
      <br />
      <Masuk />
      <br />
      <h3 class="font-weight-Reguler">Riwayat Vaksin Keluar</h3>

      <Keluar />
    </v-container>
  </v-main>
</template>

<script>
import Masuk from "../../components/stokVaksin/Masuk";
import Keluar from "../../components/stokVaksin/Keluar";
export default {
  name: "VaccineStok",
  methods: {
    goTo() {
      return this.$router.push("/laporan-baru");
    },
  },
  data() {
    return {
      page: 1,
      desserts: [
        {
          nama: "Rumah Sakit",
          no: 1,
          keterangan: "Rumah Sakit Bakti Timah",
        },

        {
          nama: "Sesi",
          no: 2,
          keterangan: "1",
        },
        {
          nama: "Tanggal",
          no: 3,
          keterangan: "21 Juni 2001",
        },
        {
          nama: "Jenis Vaksin",
          no: 4,
          keterangan: "Rumah Sinovac",
        },
        {
          nama: "Jumlah Vaksin",
          no: 5,
          keterangan: "1000",
        },
      ],
    };
  },

  components: {
    Masuk,
    Keluar,
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
.main {
  background: linear-gradient(180deg, #ffffff 14.37%, #e3f5fd 100%);
}
.fontss {
  color: rgb(27, 27, 27);
}
#bar {
  background-color: rgba(34, 155, 216, 1);
}
</style>
