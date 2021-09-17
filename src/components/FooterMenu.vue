<template>
  <v-footer
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
</template>

<script>

export default {
  name: 'FooterMenu'
}
</script>
