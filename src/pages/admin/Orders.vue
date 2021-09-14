<template>
  <v-row>
    <v-col
      cols="8"
      class="pl-10"
    >
      <v-card height="400">
        <v-card-title>Orders</v-card-title>
        <v-btn primary @click="loadMore()">fetch</v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'Orders',

  data: () => ({}),
  mounted() {
    this.fetchOrders();
  },
  methods: {
    ...mapActions("orders",
      [
        "fetchOrders"
      ])
  }
  
};
</script>
