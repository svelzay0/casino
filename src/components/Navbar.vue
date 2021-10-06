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
          title: 'Домашнаяя страница',
          to: { name: 'Home' },
          ico: 'mdi-home-variant'
        },
        {
          title: 'Карточка автомобиля',
          to: { name: 'Cars' },
          ico: 'mdi-pencil'
        },
        {
          title: 'Сущности',
          to: { name: 'Entities' },
          ico: 'mdi-clipboard-list'
        },
        {
          title: 'Заказы',
          to: { name: 'Orders' },
          ico: 'mdi-calendar-plus'
        },
        {
          title: 'Error 404',
          to: { name: 'Error' },
          ico: 'mdi-alert-circle'
        }
      ]
  })
}
</script>
