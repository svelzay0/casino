<template>
  <v-app>
    <navbar />
    <v-main class="app">
      <v-container fluid>
        <div class="d-flex align-center py-3">
          <div class="display-1 pl-6 pb-2">
            <span class="main__title">
              {{ title }}
            </span>
          </div>
        </div>
        <keep-alive>
          <router-view />
        </keep-alive>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '../components/Navbar'
import { mapGetters } from "vuex";

export default {
  name: 'AppLayout',
  components: {
    Navbar
  },
  computed: {
    title () {
      const routeName = this.$route.name[0].toLowerCase() + this.$route.name.slice(1);
      return this.menuItems[routeName]?.name || 'Добро пожаловать!';
    },
    ...mapGetters("shared",
      [
        "menuItems"
      ])
  }
}
</script>