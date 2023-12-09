<template>
  <!-- <v-footer
    fixed
    padless
  >
    <v-card
      class="footer__main flex"
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
  </v-footer> -->
  <v-footer
    absolute
    style="z-index: 9;"
    color="#111623"
  >
    <v-row
      align="center"
      class="ma-8"
      justify="end"
    >
      <v-col cols="2">
        <div class="title-text">
          WINZARD
        </div>
      </v-col>
      <v-col cols="2">
        <div class="title-text">
          WINZARD
        </div>
      </v-col>
      <v-col cols="2">
        <div class="title-text">
          WINZARD
        </div>
      </v-col>
      <v-col cols="2">
        <div class="title-text">
          WINZARD
        </div>
        <div>
          
          Our goal at Winzard is to provide a
                    fun and exciting gambling experience
                    for players. This is made possible by
                    our wide selection of casino games
                    and sporting events. Security and
                    transparency are our number one
                    priorities as these are vital to
                    building trust between us and players.
                
        </div>
      </v-col>
      <v-col cols="2">
        <div class="title-text">
          WINZARD
        </div>
      </v-col>
    </v-row>
    <!-- <div class="bg-teal d-flex w-100 align-center px-4">
      <strong>Get connected with us on social networks!</strong>

      <v-spacer></v-spacer>

    </div>

    <div class="px-4 py-2 bg-black text-center w-100">
      {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
    </div> -->
  </v-footer>
</template>

<script>

export default {
  name: 'FooterMenu'
}
</script>
