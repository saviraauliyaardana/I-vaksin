<template>
  <v-main>
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Stok Vaksin</h2>
    </v-app-bar>
    <v-container fluid>
      <div class="mx-10">
        <h1 class="font-weight-regular text-center">
          Registrasi Vaksin Keluar
        </h1>
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
              Nama Rumah Sakit
            </body>
            <v-select
              @change="onchange"
              :items="name_hospital"
              item-value="id"
              item-text="name"
              v-model="post_masuk.hospital_id"
              label="Pilih Rumah Sakit"
              outlined
              solo
              dense
              style="border-radius: 10px"
            ></v-select>
            <body class="body">
              Nomor Transaksi
            </body>
            <v-text-field
              v-model.number="post_masuk.no_transaction"
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
              v-model="post_masuk.tanggal"
              outlined
              dense
              solo
              label="Masukkan Tanggal Pengiriman"
              class="fields"
            ></v-text-field>
            <body class="body">
              Distributor
            </body>
            <v-text-field
              v-model="post_masuk.distributor"
              outlined
              dense
              solo
              label="Masukkan Distributor"
              class="fields"
            ></v-text-field>
            <body class="body">
              Email
            </body>
            <v-text-field
              v-model="post_masuk.emaildist"
              outlined
              dense
              solo
              label="Masukkan Email Distributor"
              class="fields"
            ></v-text-field>

            <body class="body">
              Jenis Vaksin
            </body>
            <v-select
              :items="name_vaccine"
              item-value="id"
              item-text="name"
              v-model="post_masuk.vaccinehospital_id"
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
              @click="newMethod"
              outlined
              dense
              solo
              label="Masukkan Jumlah Vaksin"
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
      vaccine_id: "",
      dialog: false,
      name_hospital: [],
      name_vaccine: [],
      email_hospital: [],
      post_masuk: {
        tanggal: "",
        no_transaction: null,
        distributor: "",
        status: false,
        hospital_id: "",
        vaccinehospital_id: "",
        emaildist: "",
      },
      post_stok: {
        stok: null,
        hospital_id: "",
        vaccine_id: "",
      },

      // post_email: {
      //   email: "",
      // },
    };
  },

  async mounted() {
    const response = await axios.get("/hospitals");
    this.name_hospital = response.data.Hospitalss;
    console.log(this.name_hospital);

    const vaccine = await axios.get("/vaccine");
    this.name_vaccine = vaccine.data.vaccines;
    console.log("name vaksin", this.name_vaccine);
  },
  methods: {
    async onchange() {
      const hospitals = await axios.get(
        "/hospitals/" + this.post_masuk.hospital_id
      );
      this.email_hospital = hospitals.data.hospitals;
      console.log("id spesifik = ", this.email_hospital);
      this.post_stok.hospital_id = this.email_hospital.id;
      console.log("cok", this.post_stok.vaccine_id);
    },
    async newMethod() {
      const vaccines = await axios.get(
        "/vaccine/" + this.post_masuk.vaccinehospital_id
      );
      this.post_stok.vaccine_id = vaccines.data.vaccines.id;
      console.log("vaksin id ", this.post_stok.vaccine_id);
    },
    async post_data() {
      const response = await axios.post("/transactionout", this.post_masuk);

      const res = await axios.post("/stok", this.post_stok);
      this.dialog = false;

      return response, res, this.$router.push("/stok-vaksin");
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
