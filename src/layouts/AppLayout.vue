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
        Orders: {name: 'Заказы', url: '/orders'},
        Home: {name: 'Домашнаяя страница', url: '/home'},
        CarCard: {name: 'Карточка автомобиля', url: '/car'},
        List: {name: 'Сущности', url: '/list'},
        Menu5: {name: 'Меню 5', url: '/menu5'},
        Menu6: {name: 'Меню 6', url: '/menu6'},
        Menu7: {name: 'Меню 7', url: '/menu7'}
      },
    }
  },
  metaInfo () {
    return { title: this.title }
  },
  computed: {
    title () {
      return this.menuItems[this.$route.name].name
    }
  },
}
</script>