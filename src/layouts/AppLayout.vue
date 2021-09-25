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
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Navbar from '../components/Navbar'

export default {
  name: 'AppLayout',
  components: {
    Navbar
  },
  data() {
    return {
      menuItems: {
        Orders: "Заказы",
        Home: "Домашнаяя страница",
        CarCard: "Карточка автомобиля",
        CarList: "Сущности",
        menu5: "Меню 5",
        menu6: "Меню 6",
        menu7: "Меню 7"
      },
    }
  },
  metaInfo () {
    return { title: this.title }
  },
  computed: {
    title () {
      return this.menuItems[this.$route.name]
    }
  },
}
</script>