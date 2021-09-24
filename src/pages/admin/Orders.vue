<template>
  <v-row>
    <v-col class="pl-10 pr-10">
      <v-data-table
        :headers="orderHeaders"
        :items="orderItems"
        :loading="loadBool"
        loading-text="Загрузка заказов, пожалуйста подождите..."
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
            <v-col cols="12" class="pb-0 mb-0">
              г. {{ item.cityId ? item.cityId.name : '-' }}
            </v-col>
            <v-col cols="12"  class="ma-0 pa-0 pl-3">
              {{ item.dateFrom ? formatDate(item.dateFrom) : '-' }} - {{ item.dateTo ? formatDate(item.dateTo) : '-' }}
            </v-col>
            <v-col cols="12" class="pt-0 mt-0">
              Цвет <b>{{ item.color ? item.color : '-' }}</b>
            </v-col>
          </v-row>
        </template>
        <template #item.car="{ item }">
          <v-row>
            <v-col cols="12" class="pb-0 mb-0">
              Модель {{ item.carId ? item.carId.name : '-' }}
            </v-col>
            <v-col cols="12"  class="ma-0 pa-0 pl-3">
              Категория {{ item.carId ? (item.carId.categoryId ? item.carId.categoryId.description : '-') : '-' }}
            </v-col>
            <v-col cols="12" class="pt-0 mt-0">
              Номер <b class="primary--text">{{ item.carId ? item.carId.number : '-' }}</b>
            </v-col>
          </v-row>
        </template>
        <template #item.additionals="{ item }">
          <v-row>
            <v-col cols="12" class="pa-0 ma-0">
              <v-checkbox
              v-model="item.isFullTank" 
              :label="'Полный бак'"></v-checkbox>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">
              <v-checkbox v-model="item.isNeedChildChair" :label="'Детское кресло'"></v-checkbox>
            </v-col>
            <v-col cols="12" class="pa-0 ma-0">
              <v-checkbox v-model="item.isRightWheel" :label="'Правый руль'"></v-checkbox>
            </v-col>
          </v-row>
        </template>
        <!-- <template #item.category="{ item }">
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
import moment from "moment";

export default {
  name: 'Orders',

  data() {
    return {
      orderItems: [],
      imgDefPath: require('@/assets/default_car.jpg'),
      loadBool: true
    }
  },
  computed: {
    orderHeaders () {
      return [
        {
          value: 'photo',
          text: 'Фото',
          searchable: false,
          sortable: false
        },
        {
          value: 'info',
          text: 'Информация',
          searchable: false,
          sortable: false,
          width: '20%'
        },
        {
          value: 'car',
          text: 'Автомобиль',
          searchable: false,
          sortable: false
        },
        {
          value: 'additionals',
          text: 'Особенности',
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
    }
  },
  mounted() {
    if (this.getOrders.length === 0) {
      this.fetchOrders().then(() => {
        this.loadBool = false;
        this.orderItems = this.getOrders;
      });
    } else {
      this.orderItems = this.getOrders;
      this.loadBool = false;
    }
  },
  methods: {
    ...mapActions("orders",
      [
        "fetchOrders"
      ]),
    getImgPath(car) {
      if (typeof(car) != "undefined" && car !== null && car.thumbnail.path.length < 1000) {
        return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
      } else return this.imgDefPath
    },
    formatDate (date) {
      return date ? moment(date).format('DD.MM.YYYY h:mm') : ''
    },
  } 
};
</script>
