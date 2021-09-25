<template>
  <v-row>
    <v-col class="pl-10 pr-10">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="auto">
              <v-select
                v-model="filters.city"
                dense
                outlined
                :items="cities"
                :label="'Города'"
              />
            </v-col>
            <v-col cols="auto">
              <v-select
                v-model="filters.city"
                dense
                outlined
                :items="cities"
                :label="'Города'"
              />
            </v-col>
            <v-col cols="auto">
              <v-select
                v-model="filters.city"
                dense
                outlined
                :items="cities"
                :label="'Города'"
              />
            </v-col>
            <v-col cols="auto">
              <v-select
                v-model="filters.city"
                dense
                outlined
                :items="cities"
                :label="'Города'"
              />
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-btn color="primary">
                Применить
              </v-btn>
            </v-col>
            <v-col cols="auto">
              <v-btn @click="resetFilters()">
                {{ $t('reset_filters') }}
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-data-table
                :headers="orderHeaders"
                :items="orderItems"
                :loading="loadBool"
                :items-per-page="itemsPerPage"
                :page.sync="page"
                :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-minus',
                nextIcon: 'mdi-plus',
                  'items-per-page-text':'Заказов на странице:',
                  'pageText': '{0}-{1} из {2}'
                }"
                loading-text="Загрузка заказов, пожалуйста подождите..."
                item-key="id"
                @page-count="pageCount = $event"
              >
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
                  <v-checkbox
                    class="pa-0 ma-0 pt-6"
                    v-model="item.isFullTank"
                    :label="'Полный бак'" 
                  />
                  <v-checkbox 
                    class="pa-0 ma-0" 
                    v-model="item.isNeedChildChair"
                    :label="'Детское кресло'" 
                  />
                  <v-checkbox 
                    class="pa-0 ma-0" 
                    v-model="item.isRightWheel" 
                    :label="'Правый руль'" 
                  />
                </template>
                <template #item.price="{ item }">
                  <div>
                    <v-card-title>{{ item.price ? item.price + ' ₽' : '-' }}</v-card-title>
                  </div>
                </template>
                <template #item.photo="{ item }">
                  <img
                    class="model__car_image"
                    :src="getImgPath(item.carId)"
                    alt=""
                  />
                </template>
                <template #item.actions>
                  <v-row>
                    <!-- <v-spacer /> -->
                    <v-col cols="12">
                      <v-btn-toggle
                        dense
                      >
                        <v-btn
                          width="120px"
                          outlined
                          color="black"
                        >
                          <v-icon color="green darken-2">mdi-check-bold</v-icon>
                          Готово
                        </v-btn>
                        <v-btn
                          width="120px"
                          outlined
                          color="black"
                        >
                          <v-icon color="red">mdi-close</v-icon>
                          Отмена
                        </v-btn>
                        <v-btn
                          width="120px"
                          outlined
                          color="black"
                        >
                          <v-icon color="primary">mdi-pencil</v-icon>
                          Изменить
                        </v-btn>
                      </v-btn-toggle>   
                    </v-col>
                  </v-row>
                </template>
              </v-data-table>
            </v-col>
            <v-col cols="6" class="pl-10 pr-10">
              <v-pagination
                v-model="page"
                :length="pageCount"
                circle
              />
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
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
      loadBool: true,
      page: 1,
      itemsPerPage: 5,
      pageCount: 0,
      cities: [],
      filters: {
        city: null
      }
    }
  },
  computed: {
    orderHeaders () {
      return [
        {
          value: 'photo',
          text: 'Фото',
          searchable: false,
          sortable: false,
          width: '10%'
        },
        {
          value: 'info',
          text: 'Информация',
          sortable: false,
          width: '18%'
        },
        {
          value: 'car',
          text: 'Автомобиль',
          searchable: false,
          sortable: false,
          width: '18%'
        },
        {
          value: 'additionals',
          text: 'Особенности',
          searchable: false,
          sortable: false,
          width: '18%'
        },
        {
          value: 'price',
          text: 'Сортировка цены',
          width: '18%'
        },
        {
          value: 'actions',
          text: '',
          searchable: false,
          sortable: false,
          width: '18%'
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
    // resetFilters () {
    //   this.filters = cloneDeep(this.defaultFilters)
    // }
  } 
};
</script>
