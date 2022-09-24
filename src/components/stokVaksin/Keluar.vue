<template>
  <v-main>
    <div class="d-flex justify-space-between">
      <v-col cols="6"> </v-col>
      <v-col cols="4">
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          dense
          class="rounded-xl"
          placeholder=" Masukkan hal yang ingin dicari"
          outlined
          color="primary"
          x-small
        >
        </v-text-field>
      </v-col>
    </div>
    <v-alert :value="alert_sukses" shaped outlined type="success">
      Penerimaan Stok Vaksin Berhasil
    </v-alert>
    <v-alert :value="alert_gagal" shaped outlined type="error">
      Penerimaan Stok Vaksin Gagal
    </v-alert>
    <v-card width="auto" outlined color="primary" elevation="1">
      <v-data-table
        :headers="headers"
        :items="desserts"
        :search="search"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        @page-count="pageCount = $event"
      >
        <template v-slot:[`item.status`]="{ item }">
          <v-chip
            v-model="put.status"
            x-small
            :color="getColor(item.status)"
            dark
            @click="() => save(item.status)"
          >
            {{ item.status }}
          </v-chip>
        </template>
        <template v-slot:[`item.id`]="{ item }">
          <v-btn
            x-small
            color="primary"
            @click="() => goTo(item.id, index)"
            dark
          >
            {{ item.id }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <!-- dialog -->
    <v-dialog v-model="dialog" persistent max-width="450" max-height="auto">
      <v-card class="cards">
        <v-container fluid>
          <v-toolbar class="text-h5 mx-auto" color="indigo">
            Details Transaksi
          </v-toolbar>
        </v-container>

        <v-card-subtitle
          >Nama Rumah Sakit:
          <strong>{{ hospital.name }}</strong></v-card-subtitle
        >
        <v-card-subtitle
          >Nomor Transaksi: <strong>{{ transaksi.no_transaction }}</strong>
        </v-card-subtitle>

        <v-card-subtitle
          >Tanggal Pengiriman:
          <strong>{{ transaksi.tanggal }}</strong></v-card-subtitle
        >

        <v-card-subtitle
          >Distributor: <strong>{{ transaksi.distributor }} </strong>
        </v-card-subtitle>
        <v-card-subtitle
          >Email Distributor: <strong>{{ transaksi.emaildist }}</strong>
        </v-card-subtitle>
        <v-card-subtitle
          >Jenis Vaksin: <strong> {{ vaccine.name }} </strong>
        </v-card-subtitle>
        <v-card-subtitle
          >Jumlah: <strong>{{ stok.stok }}</strong></v-card-subtitle
        >
        <v-card-subtitle
          >Status: <strong>{{ transaksi.status }}</strong></v-card-subtitle
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Kembali
          </v-btn>
          <template>
            <v-btn
              color="blue darken-1"
              text
              @click="() => change(transaksi.id)"
            >
              Terima
            </v-btn>
          </template>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <br />
    <template>
      <v-row class="justify-space-between">
        <v-col cols="6">
          <div>
            <v-chip color="green" small>True</v-chip>
            => Diterima
          </div>
          <div>
            <v-chip color="red" small class="my-3">False</v-chip>
            {{ "=> Belum/Tidak Diterima" }}
          </div>
        </v-col>
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

  data() {
    return {
      alert_sukses: false,
      alert_gagal: false,
      put: {
        status: null,
      },
      stok: "",
      vaccine: "",
      hospital: "",
      transaksi: "",
      dialog: false,
      pageCount: 0,
      itemsPerPage: 3,
      isActive: false,
      page: 1,
      search: "",
      headers: [
        { text: "Distributor", value: "distributor", width: 200 },
        { text: "E-mail", value: "emaildist", width: 200 },

        { text: "Nomor Transaksi", value: "no_transaction", width: 200 },
        { text: "Tanggal Pengiriman", value: "tanggal", width: 250 },
        { text: "Status Penerimaan", value: "status", width: 200 },
        { text: "Id Transaksi", value: "id", width: 150 },
      ],

      desserts: [],
    };
  },
  mounted() {
    axios
      .get("/transactionout")
      .then(
        (data) => (this.desserts = data.data.transactions),
        console.log("isi dessert", this.desserts)
      )
      .catch((err) => console.log("erorgrr = ", err.message));
  },
  methods: {
    getColor(status) {
      if (status == false) return "red";
      else return "green";
    },
    save(status) {
      status == true;
    },

    async goTo(id) {
      this.dialog = true;
      const resp_transaksi = await axios.get("/transactionout/" + id);
      this.transaksi = await resp_transaksi.data.transactions[0];
      console.log("isi tasns= ", this.transaksi);

      //get hospital by id transaksi
      const resp_hospital = await axios.get(
        "/hospitals/" + this.transaksi.hospital_id
      );
      this.hospital = resp_hospital.data.hospitals;

      //get vaksin by id transaksi
      const resp_vaccine = await axios.get(
        "/vaccine/" + this.transaksi.vaccinehospital_id
      );
      this.vaccine = resp_vaccine.data.vaccines;
      //get stok by id transaksi
      const resp_stok = await axios.get("/stok/" + this.transaksi.hospital_id);
      this.stok = resp_stok.data.stoks[0];
      const response = await axios.put("/transactionout/" + id, this.put);
      console.log(response);
    },
    change() {
      axios
        .put("/transactionout/" + this.id_hospital, {
          status: true,
          hospital_id: this.transaksi.hospital_id,
          emaildist: this.transaksi.emaildist,
          no_transaction: this.transaksi.no_transaction,
          id: this.transaksi.id,
          tanggal: this.transaksi.tanggal,
          vaccinehospital_id: this.transaksi.vaccinehospital_id,
          distributor: this.transaksi.distributor,
        })
        .then((response_status) => {
          if (response_status.status == 200) {
            setTimeout(function () {
              location.reload();
            }, 1000);
            (this.dialog = false), (this.alert_sukses = true);
          }
        })
        .catch((err) => {
          if (err) {
            setTimeout(function () {
              location.reload();
            }, 1000);
            this.dialog = false;
            this.alert_gagal = true;
          }
        });
    },

    //put methods
  },
};
</script>

<style>
button span {
  pointer-events: none;
}
.cards {
  background: linear-gradient(to bottom right, #c5cdff, #ffffff);
}
</style>
