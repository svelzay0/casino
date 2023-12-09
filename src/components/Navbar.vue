<template>
  <div>
    <header-menu
      @drawer="drawer = !drawer"
    />
    <v-navigation-drawer
      v-model="drawer"
      color="#0E121D"
      app
      :width="280"
    >
      <!-- <v-row
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
      </v-row> -->
      <v-list density="compact">
        <v-list-item-group
          color="rgb(14, 18, 29)"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            dense
          >
            <v-list-item-icon class="mr-2">
              <v-icon :class="`icon_size_drawer icon_${item.icon}`" />
            </v-list-item-icon>
            <v-list-item-content class="main-text-default">
              {{ item.title }}
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>

        <v-divider color="#202635" class="ma-4" />

        <v-list-item-group
          color="rgb(14, 18, 29)"
        >
          <v-list-item
            v-for="item in items"
            :key="item.title"
            :to="item.to"
            dense
          >
            <v-list-item-icon class="mr-2">
              <v-icon :class="`icon_size_drawer icon_${item.icon}`" />
            </v-list-item-icon>
            <v-list-item-content class="main-text-default">
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
          title: 'All Games',
          to: { name: 'AllGames' },
          icon: 'allgames'
        },
        {
          title: 'New games',
          to: { name: 'NewGames' },
          icon: 'slotsgames'
        },
        {
          title: 'Top games',
          to: { name: 'TopGames' },
          icon: 'topgames'
        },
        {
          title: 'Hot games',
          to: { name: 'HotGames' },
          icon: 'hotgames'
        },
        {
          title: 'Megaways',
          to: { name: 'Megaways' },
          icon: 'megaways'
        },
        {
          title: 'Books',
          to: { name: 'Books' },
          icon: 'books'
        },
        {
          title: 'Fruits',
          to: { name: 'Fruits' },
          icon: 'fruits'
        },
        {
          title: 'Roulettes',
          to: { name: 'Roulettes' },
          icon: 'roulettes'
        },
        // {
        //   title: 'Карточка автомобиля',
        //   to: { name: 'Cars' },
        //   ico: 'mdi-pencil'
        // },
        // {
        //   title: 'Сущности',
        //   to: { name: 'Entities' },
        //   ico: 'mdi-clipboard-list'
        // },
        // {
        //   title: 'Заказы',
        //   to: { name: 'Orders' },
        //   ico: 'mdi-calendar-plus'
        // },
        // {
        //   title: 'Error 404',
        //   to: { name: 'Error' },
        //   ico: 'mdi-alert-circle'
        // }
      ]
  })
}
</script>
