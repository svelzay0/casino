<template>
  <div>
    <header-menu
      @drawer="drawer = !drawer"
    />
    <v-navigation-drawer
      v-model="drawer"
      class="elevation-5"
      app
    >
      <v-row
        align="center"
        justify="center"
        class="pads__zero"
      >
        <v-col
          cols="auto"
          class="ma-0 pa-0"
        >
          <v-img
            contain
            class="mx-auto"
            max-height="25"
            max-width="25"
            :src="require('@/assets/logo.svg')"
            :alt="'Need-for-drive'"
          />
        </v-col>
        <v-col
          cols="auto"
          class="ma-0 pa-0"
        >
          <v-card-title>
            <span class="auth__logo_text">Need for car</span>
          </v-card-title>
        </v-col>
      </v-row>
      <v-list>
        <v-list-item-group
          class="pt-2"
          color="#3395ff"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            class="pr-0 mr-0"
          >
            <v-list-item-icon>
              <v-icon
                v-text="item.ico"
                left
                class="pa-0 ma-0"
              />
            </v-list-item-icon>
            <v-list-item-content>
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <footer-menu />
  </div>
</template>

<script>
import HeaderMenu from './HeaderMenu'
import FooterMenu from './FooterMenu'

export default {
  components: {
    HeaderMenu,
    FooterMenu,
  },
  data: () => ({
    padless: false,
    drawer: true,
    items: [
        {
          title: 'Карточка автомобиля',
          to: { name: 'CarCard' },
          ico: 'mdi-pencil'
        },
        {
          title: 'Список авто',
          to: { name: 'CarList' },
          ico: 'mdi-clipboard-list'
        },
        {
          title: 'Заказы',
          to: { name: 'Orders' },
          ico: 'mdi-calendar-plus'
        },
        {
          title: 'Home',
          to: { name: 'Home' },
          ico: 'mdi-home-variant'
        },
        {
          title: 'Menu 5',
          to: { name: 'Menu5' },
          ico: 'mdi-view-list'
        },
        {
          title: 'Menu 6',
          to: { name: 'Menu6' },
          ico: 'mdi-account'
        },
        {
          title: 'Menu 7',
          to: { name: 'Menu7' },
          ico: 'mdi-notebook-edit'
        }
      ],
  })
}
</script>
