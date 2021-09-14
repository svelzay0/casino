<template>
  <div>
    <v-app-bar
      color="white"
      app
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col cols="auto">
          <v-app-bar-nav-icon
            @click="drawer = !drawer"
          />
        </v-col>
        <v-col cols="auto">
          <v-text-field
            class="search pt-2"
            :label="'Поиск...'"
            dense
            append-icon="mdi-magnify"
            clearable
          />
        </v-col>
        <v-spacer />
        <v-col
          cols="auto"
          class="col__borders ma-4 pb-2"
        >
          <notification-dropdown />
        </v-col>
        <v-col cols="auto" class="avatar">
          <v-avatar >
            <img
              :src="require('@/assets/user-avatar.jpg')"
              alt="User"
            >
          </v-avatar>
          <span class="pr-10 pl-3">Admin</span>
          <user-menu />
        </v-col>
      </v-row>
    </v-app-bar>
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
    <v-footer
      class="elevation-5"
      fixed
      padless
    >
      <v-card
        class="flex"
        flat
        tile
      >
        <div class="admin__footer_links">
          <v-row
            align="center"
            justify="center"
          >
            <v-col cols="auto">
              <span class="footer_left_text">Главная страница</span>
            </v-col>
            <v-col cols="auto">
              <span class="footer_left_text_v2">Ссылка</span>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <span class="footer_right pr-3">Copyright © 2020 Simbirsoft</span>
            </v-col>
          </v-row>
        </div>
      </v-card>
    </v-footer>
  </div>
</template>

<script>
import NotificationDropdown from './NotificationDropdown'
import UserMenu from './UserMenu'

export default {
  components: {
    NotificationDropdown,
    UserMenu
  },
  data: () => ({
    drawer: true,
    padless: false,
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
