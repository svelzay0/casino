<template>
  <v-row>
    <v-col class="pl-10 pr-10">
      <v-data-table
        :headers="orderHeaders"
        :items="orderItems"
        item-key="id"
        class="elevation-2"
      >
        <!-- <template #item.id="{ item }">
          <div style="color: green">
            {{ item.cityId.id }}
          </div>
        </template> -->
        <template #item.info="{ item }">
          <v-row>
            <v-col>
              {{ item.cityId ? item.cityId.name : '-' }}
            </v-col>
            <v-col>
              {{ item.dateFrom ? item.dateFrom : '-' }} - {{ item.dateTo ? item.dateTo : '-' }}
            </v-col>
          </v-row>
        </template>
        <!-- <template #item.car="{ item }">
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
        </template> -->
        <template #item.photo="{ item }">
          <img
            class="model__car_image"
            :src="getImgPath(item.carId)"
            alt=""
          />
        </template>
        
        <template #item.color="{ item }">
          <div>
            {{ item.color ? item.color : '-' }}
          </div>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'Orders',

  data() {
    return {
      orderItems: [],
      imgDefPath: require('@/assets/default_car.jpg')
    }
  },
  computed: {
    orderHeaders () {
      return [
        // {
        //   value: 'id',
        //   text: 'ID',
        //   class: 'text-no-wrap',
        //   width: '1%'
        // },
        {
          value: 'photo',
          text: 'Фото',
          searchable: false,
          sortable: false
        },
        {
          value: 'info',
          text: 'Информация',
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
    ...mapGetters("orders", ["getOrders"])
  },
  watch: {
    'getOrders': function (newVal) {
      this.orderItems = newVal
      console.log(6, this.orderItems)
    },
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    ...mapActions("orders",
      [
        "fetchOrders"
      ]),
    getImgPath(car) {
      if (typeof(car) != "undefined" && car !== null) {
        return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
      }
      else return this.imgDefPath
    }
  }
  
  
};
</script>
