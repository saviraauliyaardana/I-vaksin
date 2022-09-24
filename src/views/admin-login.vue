<template>
  <v-main class="containers">
    <v-container fluid height="500">
      <!-- login -->
      <div class="test">
        <h1 class="my-5 text-center white--text tulisan">Masuk</h1>
        <v-col cols="12" class="my-5">
          <v-card width="500" class="mx-auto my-10 rounded-xl" elevation="10">
            <v-row>
              <v-col cols="10" md="10" class="mx-auto">
                <v-form req v-model="valid" ref="form">
                  <v-text-field
                    v-model="login.email"
                    class="my-5"
                    label="Email"
                    prepend-icon="mdi-gmail"
                    :rules="login.emailRules"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="login.password"
                    :rules="login.passRules"
                    required
                    label="Password"
                    prepend-icon="mdi-lock"
                    :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show1 ? 'text' : 'password'"
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </v-form>

                <v-alert :value="alert" dense outlined type="error">
                  Email atau Password Salah
                </v-alert>
                <v-btn
                  class="rounded-lg tombol my-3"
                  elevation="1"
                  :disabled="!valid"
                  large
                  outlined
                  color="primary"
                  block
                  :loading="loading"
                  @click="() => Go()"
                >
                  Login
                </v-btn>
                <div v-if="error">
                  <v-alert type="error"> I'm an error alert. </v-alert>
                </div>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </div>
    </v-container>
  </v-main>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminLogin",

  data() {
    return {
      alert: false,
      loading: false,
      error: null,
      show1: false,
      tokens: "",
      valid: false,
      login: {
        email: "",
        emailRules: [
          (v) => !!v || "Email is required",
          (v) => /.+@.+\..+/.test(v) || "Invalid Email",
        ],
        password: "",
        passRules: [(v) => !!v || "Password is required"],
      },
    };
  },

  methods: {
    Go() {
      this.loading = true;
      axios
        .post("/login", this.login)
        .then((response) => {
          localStorage.setItem("token", response.data.token);

          this.loading = true;
          if (response.status == 200) {
            return this.$router.push("/");
          }
        })
        .catch((err) => {
          console.log(err.response.status);
          if (err.response.status == 401) {
            this.loading = false;

            return (this.alert = true);
          }
        });
    },
  },
};
</script>

<style>
.containers {
  background-image: url(../assets/LOGIN\ ADMIN\ BARU.png);
  background-size: 100%;
}
.tombol {
  margin-bottom: 10px;
}
.tulisan {
  margin-top: 25px;
}
.test {
  margin-top: 55px;
  margin-bottom: 140px;
}

#suntik {
  margin-top: 250px;
}
</style>
