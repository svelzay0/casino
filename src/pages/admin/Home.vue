<template>
  <v-row>
    <v-col
      cols="8"
      class="pl-10"
    >
      <v-card height="350">
        <v-card-title>Welcome, admin</v-card-title>
        <v-divider />
        <v-img
          contain
          class="mx-auto pt-16 mt-16"
          max-height="120"
          max-width="300"
          :src="require('@/assets/logo.svg')"
          :alt="'Need-for-drive'"
        />
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
