<template>
  <v-main>
    <v-container>
      <v-alert :value="alert_sukses" shaped outlined type="success">
        Penerimaan Stok Vaksin Berhasil
      </v-alert>
      <v-alert :value="alert_gagal" shaped outlined type="error">
        Penerimaan Stok Vaksin Gagal
      </v-alert>
      <h3 class="font-weight-Reguler">Riwayat Vaksin Masuk</h3>
      <v-row class="justify-space-between">
        <v-col cols="6"> </v-col>
        <v-col cols="4">
          <v-text-field
            @click="() => goTo"
            v-model="search"
            append-icon="mdi-magnify"
            dense
            class="rounded-xl"
            placeholder=" Masukkan hal yang ingin dicari"
            outlined
            x-small
          >
          </v-text-field>
        </v-col>
      </v-row>

      <v-card width="auto" outlined color="primary" elevation="1">
        <v-data-table
          item-key="hospital_id"
          :headers="headers"
          :items="desserts"
          value="hospital_id"
          v-model="hospital_id"
          :search="search"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
        >
          <template v-slot:[`item.status`]="{ item }">
            <v-chip x-small :color="getColor(item.status)" dark>
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
            >Nama Mitra:
            <strong>{{ transaksi.distributor }}</strong></v-card-subtitle
          >
          <v-card-subtitle
            >Nomor Transaksi: <strong>{{ transaksi.no_transaction }}</strong>
          </v-card-subtitle>
          <v-card-subtitle
            >Asal Vaksin: <strong>{{ transaksi.asalvaccine }}</strong>
          </v-card-subtitle>
          <v-card-subtitle
            >Tanggal Pengiriman:
            <strong>{{ transaksi.tanggal }}</strong></v-card-subtitle
          >
          <v-card-subtitle
            >Tujuan: <strong> {{ hospital.name }} </strong>
          </v-card-subtitle>
          <v-card-subtitle
            >Alamat: <strong>{{ hospital.address }} </strong>
          </v-card-subtitle>
          <v-card-subtitle
            >Email: <strong>{{ hospital.email }}</strong>
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
              Tidak
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              @click="() => change(transaksi.id)"
              v-model="put.status"
            >
              Terima
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

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
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "KeluarComponents",

  data() {
    return {
      id_hospital: "",
      alert_sukses: false,
      alert_gagal: false,
      statusTransaksi: null,
      put: {
        status: null,
      },
      stok: "",
      vaccine: "",
      hospital: "",
      transaksi: "",
      dialog: false,
      hospital_id: "",
      pageCount: 0,
      itemsPerPage: 3,
      isActive: false,
      page: 1,
      search: "",
      payload: {},
      headers: [
        { text: "Nama Mitra", value: "distributor", width: 200 },
        { text: "Nomor Transaksi", value: "no_transaction", width: 200 },
        { text: "Asal Vaksin", value: "asalvaccine", width: 200 },
        { text: "Tanggal Pengiriman", value: "tanggal", width: 250 },
        { text: "Status Penerimaan", value: "status", width: 200 },
        { text: "Id Transaksi", value: "id", width: 150 },
      ],

      desserts: [],
    };
  },
  mounted() {
    axios
      .get("/transactionin")
      .then(
        (data) => (this.desserts = data.data.transactions),
        console.log("isi dessert", this.desserts)
      )
      .catch((err) => console.log("erorgrr = ", err.message));

    axios
      .get("/hospital/" + this.desserts.hospital_id)
      .then((response) => console.log("id hospital asasladh", response));
  },
  methods: {
    getColor(status) {
      if (status == false) return "red";
      else return "green";
    },

    async goTo(id) {
      this.dialog = true;
      const resp_transaksi = await axios.get("/transactionin/" + id);
      console.log("asdasdsa", resp_transaksi);
      this.transaksi = await resp_transaksi.data.transactions[0];

      console.log("isi tasns= ", this.transaksi);
      //get hospital by id transaksi
      const resp_hospital = await axios.get(
        "/hospitals/" + this.transaksi.hospital_id
      );

      this.hospital = resp_hospital.data.hospitals;
      this.id_hospital = resp_hospital.data.hospitals.id;
      //get vaksin by id transaksi
      const resp_vaccine = await axios.get(
        "/vaccine/" + this.transaksi.vaccinehospital_id
      );
      this.vaccine = resp_vaccine.data.vaccines;
      //get stok by id transaksi
      const resp_stok = await axios.get("/stok/" + this.transaksi.hospital_id);
      this.stok = resp_stok.data.stoks[0];
    },

    change() {
      axios
        .put("/transactionin/" + this.id_hospital, {
          status: true,
          hospital_id: this.transaksi.hospital_id,
          asalvaccine: this.transaksi.asalvaccine,
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
    //  change(){
    //    axios.get("/transactionin/" + this.id_hospital)
    //    .then((response)=>{
    //     this.payload = response.data.transactions[0]
    //    }).catch((err)=>{
    //     console.log("ini erornya",err)
    //    })

    // },
    // async mounted(id){
    //   const resp = await axios.get("/transactionin/" + id)
    //   console.log("adasdads", resp)
    // }
  },
};
</script>

<style></style>
