<template>
  <div>
    <header-menu
      @drawer="drawer = !drawer"
    />

    <v-navigation-drawer
      location="bottom"
      color="#0E121D"
      app
      :mini-variant="!drawer"
      :width="280"
    >
      <div
        v-if="drawer"
        class="pt-4 pb-2 d-flex justify-center"
        style="min-width: 280px;"
      >
        <v-tabs
          v-model="tabs.gameType"
          align-tabs="center"
          class="mx-5"
          hide-slider
          height="40"
          background-color="transparent"
          grow
        >
          <v-tab style="margin-right: -16px;">
            <v-icon 
              :class="{
                'icon_card': tabs.gameType === 0,
                'icon_card-active': tabs.gameType === 1,
              }" 
              style="
              width: 16px;
              height: 20px;
              margin-top: 9px;"
            />
            Casino
          </v-tab>
          <v-tab>
            <v-icon 
              :class="{
                'icon_ball': tabs.gameType === 0,
                'icon_ball-active': tabs.gameType === 1,
              }"
              style="
              width: 19px;
              height: 20px;
              margin-top: 5px;"
            />
            Sportbooks
          </v-tab>
        </v-tabs>
      </div>

      <div 
        v-else 
        class="pt-4 pb-2 d-flex justify-center" 
        style="height: 40px;
        cursor: pointer;"
        @click="tabs.gameType === 0 ? tabs.gameType = 1 : tabs.gameType = 0"
      >
        <v-icon
          v-if="tabs.gameType === 0"
          class="icon_card" 
          style="
          width: 9px;
          height: 20px;
          margin-top: 9px;"
        />
        <v-icon
          v-else
          class="icon_ball-active"  
          style="
          width: 15px;
          height: 20px;
          margin-top: 9px;"
        />
      </div>

      <div class="d-flex justify-center py-4">
        <div class="menu-img-button-first" />
        <div class="menu-img-button-second" />
      </div>
      
      <v-list density="compact">
        <v-list-item-group
          color="#9186FF"
        >
          <v-list-item
            v-for="item in itemsTop"
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
          color="#9186FF"
        >
          <v-list-item
            v-for="item in itemsBottom"
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

      <div
        v-if="drawer"
        class="d-flex justify-center ma-5 mb-2"
      >
        <v-btn
          class="classic-button"
          height="44"
          append-icon="mdi-close"
          block
          color="#171E2F"
        >
          <v-icon 
            class="icon_support" 
            style="
            width: 32px;
            height: 32px;
            margin-top: 9px;"
          />
          Live Support
        </v-btn>
      </div>

      <div
        v-if="drawer"
        class="d-flex justify-center ma-0"
      >
        <v-btn
          class="classic-button"
          height="40"
          append-icon="mdi-close"
          width="116"
          color="#171E2F"
        >
          <v-icon 
            class="icon_telegram" 
            style="
            width: 32px;
            height: 32px;
            margin-top: 16px;"
          />
          Telegram
        </v-btn>

        <v-btn
          class="classic-button ml-2"
          height="40"
          width="116"
          append-icon="mdi-close"
          color="#171E2F"
        >
          <v-icon 
            class="icon_email" 
            style="
            width: 32px;
            height: 32px;
            margin-top: 16px;"
          />
          Email
        </v-btn>
      </div>
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
    drawer: true,
    itemsTop: [
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
    ],
    itemsBottom: [
        {
          title: 'Favorites',
          to: { name: 'Favorites' },
          icon: 'favorites'
        },
        {
          title: 'Recent Played',
          to: { name: 'RecentPlayed' },
          icon: 'recentplayed'
        },
        {
          title: 'Promotions',
          to: { name: 'Promotions' },
          icon: 'promotions'
        },
        {
          title: 'VIP Club',
          to: { name: 'VIPClub' },
          icon: 'vipclub'
        },
    ],
    tabs: {
      gameType: 0
    }
  })
}
</script>
