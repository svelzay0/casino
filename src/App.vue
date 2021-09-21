<template>
  <v-app>
    <v-main class="pa-0 ma-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from "vuex";

  export default {
    name: "App",
    computed: {
      ...mapGetters("shared", ["error"]),
    },
    watch: {
      error() {
        if (this.error) {
          this.$toast.error(`${this.error}`);
        }
      },
    },
    methods: {
      ...mapMutations("user", ["createBase64Token"]),
      ...mapActions("user",
        [
          "refreshToken",
          "logoutUser"
        ]),
    },
    mounted() {
      if (!localStorage.getItem("tokenCreated")) {
        this.createBase64Token();
      }
      // if (localStorage.getItem("tokenCreated")) {
      //   const tokenAge = Date.now() - localStorage.getItem("tokenCreated");
      //   if (tokenAge < 86100000) {
      //     this.refreshToken();
      //   } else {
      //     this.logoutUser();
      //   }
      // } else {
      //   this.createBase64Token();
      // }
    },
  };
</script>
