<template>
  <v-app class="main">
    <v-app-bar id="bar" class="rounded-b-xl" elevation="3">
      <h2 class="white--text font-weight-medium">Pembuatan Sesi Vaksin</h2>
    </v-app-bar>
    <!-- Form Sessions Page -->
    <v-container style="height: 800px">
      <v-col class="text-center" cols="12">
        <h2>Sesi Vaksinasi Baru</h2>
        <p>Silahkan mengisi data-data yang tercantum dibawah ini.</p>
      </v-col>
      <v-col>
        <v-row>
          <v-col cols="1"> </v-col>

          <v-col cols="10" style="height: 0px">
            <v-card elevation="10" class="mx-auto" width="1000" height="auto">
              <v-container fluid>
                <body class="body font-weight-bold">
                  Rumah Sakit
                </body>
                <hr class="garis" />
                <body class="body">
                  Rumah Sakit
                </body>
                <v-select
                  :items="items"
                  v-model="postdata.hospital_id"
                  item-value="id"
                  item-text="name"
                  @change="onChange"
                  label="Pilih Rumah Sakit"
                  outlined
                  solo
                  dense
                  style="border-radius: 10px"
                >
                </v-select>

                <body class="body">
                  Sesi
                </body>
                <v-text-field
                  v-model="postdata.sesi"
                  outlined
                  dense
                  solo
                  label="Masukkan Sesi Vaksinasi"
                  class="fields"
                ></v-text-field>
                <body class="body">
                  Tanggal
                </body>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      class="fields"
                      outlined
                      dense
                      solo
                      v-model="postdata.tanggal"
                      label="Masukkan Tanggal Sesi Vaksinasi"
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker v-model="date" scrollable>
                    <v-spacer></v-spacer>
                    <v-btn text color="primary" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
                <body class="body">
                  Jenis Vaksin
                </body>
                <v-select
                  v-model="postdata.vaccine_id"
                  :items="vaccine_name"
                  item-text="name"
                  item-value="id"
                  @change="onChanges"
                  outlined
                  dense
                  solo
                  label="Masukkan Jenis vaksin"
                  class="fields"
                ></v-select>
                <body class="body">
                  Jumlah Vaksin
                </body>
                <v-text-field
                  v-model.number="postdata.max_session"
                  outlined
                  dense
                  solo
                  label="Masukkan Jumlah vaksin"
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
                          <v-btn @click="post" x-large text block>
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
          </v-col>
          <v-col cols="1"> </v-col>
        </v-row>
      </v-col>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  name: "createVaksinasiSessionPage",
  data: () => ({
    dialog: false,
    items: [],
    postdata: {
      hospital_id: null,
      vaccine_id: null,
      sesi: "",
      tanggal: "",
      max_session: null,
      number_boking: 0,
    },
  }),

  async mounted() {
    const response = await axios.get("/hospitals");
    this.items = response.data.Hospitalss;
    const vaccine = await axios.get("/vaccine");
    this.vaccine_name = vaccine.data.vaccines;
  },

  methods: {
    async post() {
      const response = await axios.post("/session", this.postdata);

      console.log(response);
    },
    onChange() {
      console.log("id hospital", this.postdata.hospital.id);
    },
    onChanges() {
      console.log("id_vaksin", this.postdata.vaksin.id);
    },

    GoTo() {
      return this.$router.push("/sessions");
    },
    GoToBack() {
      this.$router.push("/sessions");
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
