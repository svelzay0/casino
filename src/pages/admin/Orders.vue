<template>
  <v-data-table
    v-model="orderSelected"
    :headers="orderHeaders"
    :items="orderItems"
    item-key="name"
    show-select
    class="elevation-1"
  >
    <template #item.id="{ item }">
      <div style="color: green">
        {{ item.cityId.id }}
      </div>
    </template>
    <template #item.city="{ item }">
      <div>
        {{ item.cityId.name }}
      </div>
    </template>
    <template #item.car="{ item }">
      <div>
        {{ item.carId.name }}
      </div>
    </template>
    <template #item.category="{ item }">
      <div>
        {{ item.carId.categoryId.description + ' - ' +  item.carId.categoryId.name }}
      </div>
    </template>
    <template #item.number="{ item }">
      <div>
        {{ item.carId.number }}
      </div>
    </template>
    <template #item.color="{ item }">
      <div>
        {{ item.color }}
      </div>
    </template>
  </v-data-table>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: 'Orders',

  data: () => ({
    orderSelected: [],
    orderItems: []
  }),
  computed: {
    orderHeaders () {
      return [
        {
          value: 'id',
          text: 'ID',
          class: 'text-no-wrap',
          width: '1%'
        },
        {
          value: 'city',
          text: 'Город',
          searchable: false
        },
        {
          value: 'car',
          text: 'Автомобиль',
          searchable: false,
          sortable: false
        },
        {
          value: 'category',
          text: 'Категория'
        },
        {
          value: 'number',
          text: 'Номер'
        },
        {
          value: 'color',
          text: 'Цвет авто',
          searchable: false,
          sortable: false
        },
        {
          value: 'scan_received',
          text: 'Скан получен',
          searchable: false,
          sortable: false
        },
        {
          value: 'scan_url',
          text: '',
          searchable: false,
          sortable: false
        },
        {
          value: 'original_sent',
          text: 'Оригал отправлен',
          searchable: false,
          sortable: false
        },
        {
          value: 'original_received',
          text: 'Оригал получен',
          searchable: false,
          sortable: false
        },
        {
          value: 'actions',
          text: '',
          searchable: false,
          sortable: false
        }
      ]
    },
  },
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
