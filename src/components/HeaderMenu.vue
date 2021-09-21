<template>
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
          @click="$emit('drawer')"
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
</template>

<script>
import NotificationDropdown from './NotificationDropdown'
import UserMenu from './UserMenu'

export default {
  name: 'HeaderMenu',

  components: {
    NotificationDropdown,
    UserMenu
  }
}
</script>
