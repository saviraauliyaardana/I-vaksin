<template>
  <v-main>
    <div class="d-flex justify-space-between">
      <v-row>
        <v-col cols="4">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            dense
            placeholder=" Masukkan hal yang ingin dicari"
            outlined
            color="primary"
            style="margin-top: 10px"
          >
          </v-text-field>
        </v-col>
      </v-row>
    </div>

    <v-card outlined color="primary" elevation="1">
      <v-data-table
        calculate-widths
        :headers="headers"
        headers-length="1000"
        :items="desserts || detail"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <!-- <template v-slot:[`item.vaccinestatus`]="{ item }">
          <v-chip small :color="getColor(item.vaccinestatus)" dark>
            {{ item.vaccinestatus }}
          </v-chip>
        </template> -->
      </v-data-table>
    </v-card>
    <br />
    <template>
      <v-row class="justify-end">
        <v-col cols="6"> </v-col>
        <v-col cols="auto">
          <div class="pagination rounded-lg">
            <v-pagination v-model="page" :length="6"></v-pagination>
          </div>
        </v-col>
      </v-row>
    </template>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "KeluarComponents",
  // methods: {
  //   getColor(vaccinestatus) {
  //     if (vaccinestatus == 0) return "red";
  //     else return "green";
  //   },
  // },
  data() {
    return {
      pageCount: 0,
      itemsPerPage: 5,
      page: 1,
      search: "",
      headers: [
        { text: "Nama Lengkap", value: "name", width: 200 },
        { text: "NIK", value: "nik" },
        { text: "Tempat Lahir", value: "placeofbirth", width: 200 },
        { text: "Tanggal Lahir", value: "dateofbirth", width: 200 },
        { text: "Alamat Domisili", value: "address", width: 200 },
        { text: "No Hp", value: "phonenumber" },
        { text: "Email", value: "email" },
        { text: "Vaksin ke", value: "vaccinestatus", width: 150 },
        { text: "Jenis Vaksin", value: "vaccinenumber", width: 150 },
        { text: "Tanggal Vaksin", value: "session_id", width: 150 },
        { text: "Lokasi Vaksin", value: "hospital_id", width: 200 },
        { text: "No Antrian", value: "bookedcode", width: 150 },
        { text: "Status Vaksinasi", value: "statusnumber", width: 200 },
      ],

      desserts: [],
      detail: [],
    };
  },

  async mounted() {
    // get bookings
    const response = await axios.get("/others");
    this.desserts = response.data.OtherPersons;
    console.log("others = ", this.desserts);

    //get jenis vaksin
    const res = await axios.get("/booking");
    this.detail = res.data.Bookings;
    console.log("detail", this.detail);
  },
};
</script>
<style></style>
