<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    bottom
    offset-y
    transition="scale-transition"
    origin="top left"
  >
    <template #activator="{ on }">
      <v-btn icon large v-on="on">
        <v-badge
          color="#C4183C"
          :value="count"
          overlap
          bottom
          :content="count"
        >
          <v-icon dark>
            mdi-bell
          </v-icon>
        </v-badge>
      </v-btn>
    </template>

    <v-card>
      <v-card-title>
        Уведомления
      </v-card-title>
    </v-card>
  </v-menu>
</template>

<script>

export default {
  data: () => ({
    menu: false
  }),
  computed: {
    // ToDo: После интеграции апи завязаться на длину массива X
    count () {
      return 2
    }
  }
}
</script>
