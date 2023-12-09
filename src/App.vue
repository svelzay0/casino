<template>
  <v-app>
    <v-main class="pa-0">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
  import { mapGetters, mapMutations } from "vuex";

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
      ...mapMutations("user", ["createBase64Token"])
    },
    mounted() {
      if (!localStorage.getItem("tokenCreated")) {
        this.createBase64Token();
      }
    }
  };
</script>
