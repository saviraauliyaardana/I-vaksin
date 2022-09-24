<template>
  <v-app>
    <v-navigation-drawer
      permanent
      left
      color="#1789BC"
      style="color: white"
      fixed
      v-model="drawer"
      :clipped="clipped"
    >
      <template v-slot:prepend>
        <v-cols cols="12" class="text-center">
          <v-list-item
            style="
              background-color: white;
              border-radius: 5px;
              width: 200px;
              height: 65px;
              text-align: ;
            "
            class="mx-5 my-8"
          >
            <v-list-item-icon>
              <img
                src="../../assets/Loading PC.png"
                style="width: 40px; background-position: center"
              />
            </v-list-item-icon>
            <v-list-item-title
              ><h1 style="color: #1789bc">I-Vaksin</h1></v-list-item-title
            >
          </v-list-item>
          <br />
          <v-list-item two-line @click="() => proil()">
            <v-list-item-avatar size="50" class="mx-auto">
              <img :src="user.image" />
            </v-list-item-avatar>
          </v-list-item>
          <v-list-item-content>
            <v-list-item-title> {{ user.Username }} </v-list-item-title>
            <v-list-item-subtitle>Super Admin</v-list-item-subtitle>
          </v-list-item-content>
        </v-cols>
      </template>

      <br />

      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
          :to="item.path"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color: white">{{
              item.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <br />
      <br />

      <v-list dense>
        <v-list-item
          v-for="gmbr in gmbrs"
          :key="gmbr.title"
          link
          :to="gmbr.path"
          @click="dialog = true"
        >
          <v-list-item-icon>
            <v-icon>{{ gmbr.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title style="color: white">{{
              gmbr.title
            }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
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
          Apakah anda yakin untuk logout?
        </h2>
        <v-divider class="bold"></v-divider>
        <v-toolbar elevation="0">
          <v-col cols="6">
            <v-btn x-large text block @click="logout">
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
  </v-app>
</template>

<script>
import axios from "axios";
import VueJwtDecode from "vue-jwt-decode";

export default {
  name: "sideBar",
  data() {
    return {
      clipped: true,
      mini: true,
      dialog: false,
      user: [],
      drawer: false,
      fixed: false,
      items: [
        {
          title: "Pendaftaran Vaksin",
          icon: "mdi-clipboard-outline",
          path: "/",
        },
        { title: "Sesi Vaksinasi", icon: "mdi-pencil-box", path: "/sessions" },
        { title: "Stok Vaksin", icon: "mdi-archive", path: "/stok-vaksin" },
        {
          title: "Media & Artikel",
          icon: "mdi-newspaper",
          path: "/media-dan-artikel",
        },
      ],
      gmbrs: [{ title: "Log-out", icon: "mdi-logout" }],
    };
  },
  async mounted() {
    const token = localStorage.getItem("token");
    const decodetoken = VueJwtDecode.decode(token);
    console.log(decodetoken);
    const response = await axios
      .get("/users/" + decodetoken.id)
      .catch((error) => {
        if (error.response.data.debug_message == "Token is expired") {
          alert("Sesi kamu telah selesai, silahkan login ulang");
          localStorage.removeItem("token");
          location.reload();
        }
      });

    this.user = response.data.users;
    console.log("response token = ", this.user);
  },

  methods: {
    logout() {
      localStorage.removeItem("token", true);
      return this.$router.push("/login");
    },
    profil() {
      return this.$router.push("/profile-menu");
    },
  },
};
</script>
