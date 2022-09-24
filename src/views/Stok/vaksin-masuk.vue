<template>
  <v-main>
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Stok Vaksin</h2>
    </v-app-bar>
    <v-container fluid class="">
      <div class="mx-10">
        <h1 class="font-weight-regular text-center">Registrasi Vaksin Masuk</h1>
        <p class="text-center">
          Silahkan mengisi data-data yang tercantum dibawah ini :
        </p>

        <v-card width="1000" height="auto" class="mx-auto" elevation="10">
          <v-container fluid>
            <body class="body font-weight-bold">
              Mitra
            </body>
            <hr class="garis" />

            <body class="body">
              Nama Mitra
            </body>
            <v-text-field
              v-model="post.distributor"
              label="Pilih Mitra"
              outlined
              solo
              dense
              style="border-radius: 10px"
            ></v-text-field>
            <body class="body">
              Nomor Transaksi
            </body>
            <v-text-field
              v-model.number="post.no_transaction"
              outlined
              dense
              solo
              label="Masukkan Nomor Transaksi"
              class="fields"
            ></v-text-field>
            <body class="body">
              Tanggal Pengiriman
            </body>

            <v-text-field
              class="fields"
              outlined
              dense
              solo
              v-model="post.tanggal"
              label="Masukkan Tanggal Pengiriman"
            ></v-text-field>

            <body class="body">
              Asal Vaksin
            </body>
            <v-text-field
              v-model="post.asalvaccine"
              outlined
              dense
              solo
              label="Masukkan Asal Vaksin"
              class="fields"
            ></v-text-field>
            <body class="body">
              Tujuan
            </body>
            <v-select
              :items="hospital"
              item-text="name"
              item-value="id"
              v-model="post.hospital_id"
              outlined
              dense
              solo
              label="Masukkan Tujuan Rumah Sakit"
              class="fields"
            ></v-select>

            <body class="body">
              Email
            </body>
            <v-select
              :items="email"
              item-text="email"
              item-value="id"
              v-model="post_stok.hospital_id"
              @click="onchange"
              outlined
              dense
              solo
              label="Masukkan Email Rumah Sakit"
              class="fields"
            ></v-select>
            <body class="body">
              Jenis
            </body>
            <v-select
              :items="vaksin"
              item-text="name"
              item-value="id"
              v-model="post.vaccinehospital_id"
              outlined
              dense
              solo
              label="Masukkan Jenis Vaksin"
              class="fields"
            ></v-select>
            <body class="body">
              Jumlah
            </body>
            <v-text-field
              v-model.number="post_stok.stok"
              @click="getId"
              outlined
              dense
              solo
              label="Masukkan Jumlah Vaksin yang Masuk"
              class="fields"
            ></v-text-field>
            <v-row>
              <v-col></v-col>
              <v-col>
                <v-btn
                  x-large
                  block
                  outlined
                  color="primary"
                  class="fields"
                  @click="dialog = true"
                  >Lanjut</v-btn
                >
              </v-col>
              <!-- dialog -->
              <v-dialog
                persistent
                v-model="dialog"
                width="650"
                :value="dialog"
                class="rounded-xl"
              >
                <v-card
                  elevation="0"
                  height="auto"
                  class="text-center flex-column rounded-xl"
                  style="border: solid #1789bc"
                >
                  <h2 class="apakah texts font-weight-light">
                    Apakah data yang anda masukkan sudah benar?
                  </h2>
                  <v-divider class="bold"></v-divider>
                  <v-toolbar elevation="0">
                    <v-col cols="6">
                      <v-btn x-large text block @click="post_data">
                        <h4 class="texts font-weight-light">Ya</h4>
                      </v-btn>
                    </v-col>
                    <v-divider vertical class="bold"></v-divider>
                    <v-col cols="6">
                      <v-btn x-large text block @click="dialog = false">
                        <h4 class="texts font-weight-light">Tidak</h4>
                      </v-btn>
                    </v-col>
                  </v-toolbar>
                </v-card>
              </v-dialog>

              <v-col></v-col>
            </v-row>
          </v-container>
        </v-card>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: [],
      dialog: false,
      id_vaksin: null,
      hospital: [],
      vaksin: [],
      post: {
        hospital_id: "",
        vaccinehospital_id: "",
        asalvaccine: "",
        status: false,
        tanggal: "",
        no_transaction: null,
        distributor: "",
      },
      post_stok: {
        stok: null,
        hospital_id: "",
        vaccine_id: "",
      },
    };
  },
  async mounted() {
    const res_hospital = await axios.get("/hospitals");
    this.hospital = res_hospital.data.Hospitalss;
    ////////////////////////
    const res_vaksin = await axios.get("/vaccine");
    this.vaksin = res_vaksin.data.vaccines;
  },
  methods: {
    async onchange() {
      this.id_vaksin = await this.post.hospital_id;

      //////////////////////////////////////////////////////
      const res_emailByid = await axios.get("/hospitals/" + this.id_vaksin);
      this.email = res_emailByid.data.hospitals;
    },
    getId() {
      this.post_stok.vaccine_id = this.post.vaccinehospital_id;
    },

    async post_data() {
      const response = await axios
        .post("/transactionin", this.post)
        .catch((err) => {
          console.log(err);
        });

      ///
      const resp = await axios.post("/stok", this.post_stok).catch((err) => {
        console.log(err);
      });
      this.dialog = false;

      return response, resp, this.$router.push("/stok-vaksin");
    },
  },
};
</script>

<style>
.apakah {
  padding-bottom: 50px;
  padding-top: 75px;
}
p {
  color: rgba(0, 0, 0, 0.493);
}
.body {
  margin-left: 10px;
}
.fields {
  border-radius: 10px;
}
.garis {
  border-color: rgba(0, 0, 0, 0.356);
  border-width: 1px;
  margin-bottom: 12px;
}
.bold {
  border-width: 1px;
}
.texts {
  color: #1789bc;
}
</style>
