<template>
  <v-row>
    <v-col class="pl-10 pr-10">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="auto">
              <v-select
                v-model="filters.city"
                item-value="id"
                item-text="name"
                dense
                outlined
                :disabled="loading"
                :items="cities"
                :label="'Город'"
              />
            </v-col>
            <v-col cols="auto">
              <v-select
                v-model="filters.status"
                item-value="id"
                item-text="name"
                dense
                outlined
                :disabled="loading"
                :items="statuses"
                :label="'Статус'"
              />
            </v-col>
            <v-col cols="auto">
              <v-select
                v-model="filters.category"
                item-value="id"
                item-text="name"
                dense
                outlined
                :disabled="loading"
                :items="categories"
                :label="'Категория'"
              />
            </v-col>
            <v-col cols="auto">
              <v-select
                v-model="filters.rateType"
                item-value="id"
                item-text="name"
                dense
                outlined
                :disabled="loading"
                :items="rateTypes"
                :label="'Тариф'"
              />
            </v-col>
            <v-spacer />
            <v-col cols="auto">
              <v-btn
                :disabled="loading"
                @click="resetFilters()"
              >
                Сброс
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-data-table
                :headers="orderHeaders"
                :items="orders"
                :loading="loading"
                :items-per-page="itemsPerPage"
                item-key="key"
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
                @page-count="pageCount = $event"
              >
                <template #[`item.info`]="{ item }">
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
                <template #[`item.car`]="{ item }">
                  <v-row>
                    <v-col cols="12"  class="ma-0 pa-0">
                      Статус <b>{{ item.orderStatusId ? item.orderStatusId.name : '-' }}</b>
                    </v-col>
                    <v-col cols="12"  class="ma-0 pa-0">
                      Тариф <b>{{ item.rateId ? (item.rateId.rateTypeId ? item.rateId.rateTypeId.name : '-') : '-' }}</b>
                    </v-col>
                    <v-col cols="12" class="ma-0 pa-0">
                      Модель <b>{{ item.carId ? item.carId.name : '-' }}</b>
                    </v-col>
                    <v-col cols="12"  class="ma-0 pa-0">
                      Категория <b>{{ item.carId ? (item.carId.categoryId ? item.carId.categoryId.name : '-') : '-' }}</b>
                    </v-col>
                    <v-col cols="12" class="ma-0 pa-0">
                      Номер <b class="primary--text">{{ item.carId ? item.carId.number : '-' }}</b>
                    </v-col>
                  </v-row>
                </template>
                <template #[`item.additionals`]="{ item }">
                  <v-checkbox
                    class="pa-0 ma-0 pt-6"
                    v-model="item.isFullTank"
                    :label="'Полный бак'"
                    disabled
                  />
                  <v-checkbox
                    class="pa-0 ma-0"
                    v-model="item.isNeedChildChair"
                    :label="'Детское кресло'"
                    disabled
                  />
                  <v-checkbox
                    class="pa-0 ma-0"
                    v-model="item.isRightWheel"
                    :label="'Правый руль'"
                    disabled
                  />
                </template>
                <template #[`item.price`]="{ item }">
                  <div>
                    <v-card-title>{{ item.price ? item.price + ' ₽' : '-' }}</v-card-title>
                  </div>
                </template>
                <template #[`item.photo`]="{ item }">
                  <img
                    class="model__car_image"
                    :src="getImgPath(item.carId)"
                    alt=""
                  />
                </template>
                <template #[`item.actions`]="{ item }">
                  <v-row>
                    <v-col cols="12">
                      <v-btn-toggle
                        dense
                      >
                        <v-btn
                          width="120px"
                          outlined
                          color="black"
                          @click="toChangeStatusToDone(item.id, orders.map(function(x) {return x.id; }).indexOf(item.id))"
                        >
                          <v-icon color="green darken-2">mdi-check-bold</v-icon>
                          Готово
                        </v-btn>
                        <v-btn
                          width="120px"
                          outlined
                          color="black"
                          @click="toChangeStatusToCancel(item.id, orders.map(function(x) {return x.id; }).indexOf(item.id))"
                        >
                          <v-icon color="red">mdi-close</v-icon>
                          Отменить
                        </v-btn>
                        <v-btn
                          width="120px"
                          outlined
                          color="black"
                          @click="toDelete(item.id)"
                        >
                          <v-icon color="red">mdi-delete</v-icon>
                          Удалить
                        </v-btn>
                        <v-btn
                          width="120px"
                          outlined
                          color="black"
                          @click="toEdit(item, orders.map(function(x) {return x.id; }).indexOf(item.id))"
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
            <v-col cols="6" class="order__table_circles pl-10 pr-10 pb-16">
              <v-pagination
                v-model="page"
                :length="pageCount"
                circle
              />
            </v-col>
          </v-row>
        </v-card-text>
        <v-dialog v-model="editOrderForm" max-width="700">
          <edit-order-form
            :key="formKey"
            :order-item="orderItem"
            :statuses="statuses"
            @cancel="closeForm()"
            @success="formSuccess($event)"
          />
        </v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import moment from "moment";
import cloneDeep from "lodash/cloneDeep";
import EditOrderForm from './EditOrderForm'

export default {
  name: "Orders",
  components: {
    EditOrderForm
  },
  data() {
    return {
      imgDefPath: require("@/assets/default_car.jpg"),
      loading: true,
      page: 1,
      itemsPerPage: 5,
      pageCount: 0,
      orders: [],
      cities: [],
      statuses: [],
      rateTypes: [],
      categories: [],
      orderItem: null,
      orderKey: null,
      formKey: 1,
      editOrderForm: false,
      filters: {
        city: null,
        status: null,
        category: null,
        rateType: null
      },
      defaultFilters: {
        city: null,
        status: null,
        category: null,
        rateType: null
      }
    }
  },
  computed: {
    orderHeaders () {
      return [
        {
          value: "photo",
          text: "Фото",
          searchable: false,
          sortable: false,
          width: "10%"
        },
        {
          value: "info",
          text: "Информация",
          sortable: false,
          width: "18%"
        },
        {
          value: "car",
          text: "Автомобиль",
          searchable: false,
          sortable: false,
          width: "18%"
        },
        {
          value: "additionals",
          text: "Особенности",
          searchable: false,
          sortable: false,
          width: "18%"
        },
        {
          value: "price",
          text: "Сортировка цены",
          width: "18%"
        },
        {
          value: "actions",
          text: "",
          searchable: false,
          sortable: false,
          width: "18%"
        }
      ]
    },
    ...mapGetters("entities",
      [
        "getCities",
        "getOrders",
        "getOrderStatuses",
        "getCategories",
        "getRateTypes"
      ])
  },
  watch: {
    filters: {
      handler (newVal) {
        if (!this.reset) {
          this.setFilters(newVal);
        }
        this.reset = false;
      },
      deep: true
    }
  },
  mounted() {
    if (this.getCities.length === 0) {
      this.fetchCities().then(() => {
        this.cities = this.getCities;
      });
    } else {
      this.cities = this.getCities;
    }
    if (this.getOrderStatuses.length === 0) {
      this.fetchOrderStatuses().then(() => {
        this.statuses = this.getOrderStatuses;
      });
    } else {
      this.statuses = this.getOrderStatuses;
    }
    if (this.getCategories.length === 0) {
      this.fetchCategories().then(() => {
        this.categories = this.getCategories;
      });
    } else {
      this.categories = this.getCategories;
    }
    if (this.getRateTypes.length === 0) {
      this.fetchRateTypes().then(() => {
        this.rateTypes = this.getRateTypes;
      });
    } else {
      this.rateTypes = this.getRateTypes;
    }
    if (this.getOrders.length === 0) {
      this.fetchOrders().then(() => {
        this.loading = false;
        this.orders = this.getOrders;
      });
    } else {
      this.orders = this.getOrders;
      this.loading = false;
    }
  },
  methods: {
    ...mapActions("entities",
      [
        "fetchCities",
        "fetchOrders",
        "fetchOrderStatuses",
        "fetchCategories",
        "fetchRateTypes",
        "deleteOrder",
        "editOrder",
        "changeStatusOfOrderToDone",
        "changeStatusOfOrderToCancel"
      ]),
    getImgPath(car) {
      if (typeof(car) != "undefined" && car !== null && car.thumbnail.path.length < 1000) {
        return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
      } else return this.imgDefPath;
    },
    formatDate (date) {
      return date ? moment(date).format("DD.MM.YYYY h:mm") : "";
    },
    resetFilters () {
      this.filters = cloneDeep(this.defaultFilters);
      this.reset = true;
      this.orders = this.getOrders;
    },
    setFilters (newVal) {
      this.loading = true;
      this.orders = this.getOrders;
      const filters = Object.values(newVal)
      filters.forEach((value, key) => {
        if (value !== null) {
          if (key === 0) {
            const filteredOrders = this.orders.filter(item => item.cityId);
            this.orders = filteredOrders.filter(item => item.cityId.id === newVal.city);
          }
          if (key === 1) {
            const filteredOrders = this.orders.filter(item => item.orderStatusId);
            this.orders = filteredOrders.filter(item => item.orderStatusId.id === newVal.status);
          }
          if (key === 2) {
            const filteredOrders = this.orders.filter(item => item.carId);
            const filteredTwice = filteredOrders.filter(item => item.carId.categoryId);
            this.orders = filteredTwice.filter(item => item.carId.categoryId.id === newVal.category)
          }
          if (key === 3) {
            const filteredOrders = this.orders.filter(item => item.rateId);
            this.orders = filteredOrders.filter(item => item.rateId.rateTypeId.id === newVal.rateType);
          }
        }
      })
      this.loading = false;
    },
    toDelete (id) {
      this.deleteOrder(id).then(() => {
        this.orders = this.orders.filter(item => item.id !== id);
        this.$toast.info('Удалено');
      });
    },
    toEdit (item, key) {
      this.orderItem = item;
      this.orderKey = key;
      this.formKey++;
      this.editOrderForm = true;
    },
    formSuccess (item) {
      this.closeForm();
      this.editOrder(item).then(() => {
        this.orders[this.orderKey] = item;
        this.$toast.success('Успешно редактировано');
      });
    },
    closeForm () {
      this.editOrderForm = false;
    },
    toChangeStatusToDone (id, key) {
      this.changeStatusOfOrderToDone(id).then(() => {
        this.orders[key].orderStatusId.id = "5e26a1f0099b810b946c5d8b";
        this.orders[key].orderStatusId.name = "Подтвержденные";
        this.$toast.success('Статус изменен');
      });
    },
    toChangeStatusToCancel (id, key) {
      this.changeStatusOfOrderToCancel(id).then(() => {
        this.orders[key].orderStatusId.id = "5e26a1f5099b810b946c5d8c";
        this.orders[key].orderStatusId.name = "Отмененые";
        this.$toast.success('Статус изменен');
      });
    }
  }
};
</script>