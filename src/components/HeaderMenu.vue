<template>
  <v-app-bar
    color="#111623"
    app
  >
    <v-row
      align="center"
      justify="start"
    >
      <v-col cols="auto">
        <v-app-bar-nav-icon
          color="white"
          @click="$emit('drawer')"
        />
      </v-col>
      <v-col cols="auto">
        <div class="title-text">
          WINZARD
        </div>
      </v-col>

      <v-col cols="auto">
        <div class="pt-7">
          <v-autocomplete
            :items="[]"
            class="search-input"
            base-color="info"
            bg-color="success"
            color="#fff"
            append-inner-icon="mdi-magnify"
            auto-select-first
            outlined
            variant="solo-filled"
            dense
            item-props
            placeholder="Search games"
            prepend-inner-icon="mdi-magnify"
          ></v-autocomplete>
        </div>
      </v-col>

      <v-spacer />

      <v-col cols="auto">
        <v-btn
          class="classic-button-white-text"
          height="44"
          append-icon="mdi-close"
          block
          color="rgb(17, 22, 35)"
        >
          Log in
        </v-btn>
      </v-col>
      <v-col cols="auto">
        <v-btn
          class="classic-button-register"
          height="44"
          append-icon="mdi-close"
          block
        >
          Register
        </v-btn>
      </v-col>

    </v-row>
  </v-app-bar>
</template>

<script>
// import NotificationDropdown from './NotificationDropdown'
// import UserMenu from './UserMenu'

export default {
  name: 'HeaderMenu',

  // components: {
  //   NotificationDropdown,
  //   UserMenu
  // }
}
</script>
