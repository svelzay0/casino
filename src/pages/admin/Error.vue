<template>
  <v-container
    class="error__main fill-height"
    fluid
  >
    <v-row
      align="center"
      justify="center"
    >
      <v-col
        cols="auto"
        class="ma-0 pa-0"
      >
        <h1 class="error__text">404</h1>
      </v-col>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <div class="d-flex align-center">
        <div class="display-1 pl-6 pb-2">
          <span class="main__title">
            <span class="main__title">Что-то пошло не так</span>
          </span>
        </div>
      </div>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <span class="main__title pb-6">Попробуйте перезагрузить страницу</span>
    </v-row>
    <v-row
      align="center"
      justify="center"
    >
      <v-btn
        color="primary"
        :to="{ name: 'Home' }"
      >
        На главную
      </v-btn>
    </v-row>
  </v-container>
</template>
