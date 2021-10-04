<template>
  <v-row>
    <v-col class="pl-10 pr-10">
      <v-card>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-data-table
                :headers="orderHeaders"
                :items="cars"
                :loading="loading"
                :items-per-page="5"
                :footer-props="{
                  'items-per-page-options': [5, 10, 20, 50, 100],
                  'items-per-page-text':'Машин на странице:'
                }"
                loading-text="Загрузка машин, пожалуйста подождите..."
                @update:items-per-page="getItemPerPage"
              >
                <template #[`item.info`]="{ item }">
                  <v-row>
                    <v-col cols="12" class="order__addition_info pb-0 mb-0">
                      г. {{ item.cityId ? item.cityId.name : '-' }}
                    </v-col>
                    <v-col cols="12" class="ma-0 pa-0 pl-3">
                      {{ item.dateFrom ? formatDate(item.dateFrom) : '-' }} - {{ item.dateTo ? formatDate(item.dateTo) : '-' }}
                    </v-col>
                    <v-col cols="12" class="order__addition_info pt-0 mt-0">
                      Цвет <b>{{ item.color ? item.color : '-' }}</b>
                    </v-col>
                  </v-row>
                </template>
                <template #[`item.car`]="{ item }">
                  <v-row>
                    <v-col cols="12" class="ma-0 pa-0">
                      Статус <b>{{ item.orderStatusId ? (truncate(item.orderStatusId.name,5)) : '-' }}</b>
                    </v-col>
                    <v-col cols="12" class="order__addition_info ma-0 pa-0">
                      Тариф <b>{{ item.rateId ? (item.rateId.rateTypeId ? item.rateId.rateTypeId.name : '-') : '-' }}</b>
                    </v-col>
                    <v-col cols="12" class="order__addition_info ma-0 pa-0">
                      Категория <b>{{ item.carId ? (item.carId.categoryId ? item.carId.categoryId.name : '-') : '-' }}</b>
                    </v-col>
                    <v-col cols="12" class="order__addition_info ma-0 pa-0">
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
                        <v-tooltip
                          bottom
                        >
                          <template #activator="{ on, attrs }">
                            <v-btn
                              class="order__actions"
                              v-bind="attrs"
                              outlined
                              color="black"
                              v-on="on"
                              @click="toDelete(item.id)"
                            >
                              <v-icon color="red">mdi-delete</v-icon>
                              <span class="order__actions_text">Удалить</span>
                        </v-btn>
                          </template>
                          <span>{{ 'Удалить' }}</span>
                        </v-tooltip>
                        <v-tooltip
                          bottom
                        >
                          <template #activator="{ on, attrs }">
                            <v-btn
                              class="order__actions"
                              v-bind="attrs"
                              outlined
                              color="black"
                              v-on="on"
                              @click="toEdit(item)"
                            >
                              <v-icon color="primary">mdi-pencil</v-icon>
                              <span class="order__actions_text">Изменить</span>
                            </v-btn>
                          </template>
                          <span>{{ 'Изменить' }}</span>
                        </v-tooltip>
                      </v-btn-toggle>
                    </v-col>
                  </v-row>
                  <div class="order__hrs" />
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
        <!-- <v-dialog v-model="editOrderForm" max-width="700">
          <edit-order-form
            :key="formKey"
            :order-item="orderItem"
            :statuses="statuses"
            @cancel="closeForm()"
            @success="formSuccess($event)"
          />
        </v-dialog>
        <v-dialog v-model="confirmDeleteForm" max-width="700">
          <confirm-delete-form
            :key="formKey"
            :entity="deleteItem"
            :table-name="'order'"
            @cancel="closeForm()"
            @successDelete="formSuccessDelete($event)"
          />
        </v-dialog> -->
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import EditOrderForm from './EditOrderForm'
// import ConfirmDeleteForm from '../../../components/ConfirmDeleteForm'

export default {
  name: "Cars",
  components: {
    // EditOrderForm,
    // ConfirmDeleteForm
  },
  data() {
    return {
      imgDefPath: require("@/assets/default_car.jpg"),
      loading: true,
      page: 1,
      pageCount: 14,
      request: {
        limit: 5,
        offset: 0
      },
      cars: [],
      categories: [],
      formKey: 1,
      itemsPerPage: 5,
      editOrderForm: false,
      confirmDeleteForm: false,
      deleteItem: null,
      dateSettings: {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
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
          text: "Инфо",
          sortable: false,
          width: "18%"
        },
        {
          value: "car",
          text: "Дополнительно",
          searchable: false,
          sortable: false,
          width: "18%"
        },
        {
          value: "price",
          text: "Цены",
          searchable: false,
          sortable: false,
          width: "18%"
        },
        {
          value: "timestamp",
          text: "Сорт. цены",
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
        "getCars",
        "getCategories"
      ])
  },
  watch: {
    'itemsPerPage': function (newVal) {
      this.request.limit = newVal;
      this.pageCount = 4100 / newVal;
      this.page = 1;
    },
    'page': function (newVal) {
      this.request.offset = newVal * this.request.limit;
      this.loading = true;
      this.fetchCars(this.request).then(() => {
        this.loading = false;
        this.cars = this.getCars;
      });
    }
  },
  mounted() {
    if (this.getCategories.length === 0) {
      this.fetchCategories().then(() => {
        this.categories = this.getCategories;
      });
    } else {
      this.categories = this.getCategories;
    }
    if (this.getCars.length === 0) {
      this.fetchCars(this.request).then(() => {
        this.loading = false;
        this.cars = this.getCars;
        console.log(this.cars)
      });
    } else {
      this.cars = this.getCars;
    }
  },
  methods: {
    ...mapActions("entities",
      [
        "fetchCars",
        "fetchCategories",
        "deleteEntity",
        "editEntity"
      ]),
    getImgPath(car) {
      if (typeof(car) != "undefined" && car !== null && car.thumbnail.path.length < 1000) {
        return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
      } else return this.imgDefPath;
    },
    formatDate (date) {
      return new Date(date).toLocaleString([], this.dateSettings);
    },
    toDelete (id) {
      this.deleteItem = {
        id: id,
        entity: 'order'
      }
      this.confirmDeleteForm = true;
      this.formKey++;
    },
    formSuccessDelete (item) {
      this.closeForm();
      const id = item.id;
      this.deleteEntity(item).then(() => {
        this.cars = this.cars.filter(item => item.id !== id);
        this.$toast.info('Удалено');
      });
    },
    toEdit (item, key) {
      // this.orderItem = item;
      this.orderKey = key;
      this.formKey++;
      this.editOrderForm = true;
    },
    formSuccess (item) {
      this.closeForm();
      const entity = {
        item: item,
        entityName: 'order'
      }
      this.editEntity(entity).then(() => {
        this.loading = true;
        // this.fetchOrders(this.request).then(() => {
        //   this.loading = false;
        //   this.orders = this.getOrders;
        // });
        this.$toast.success('Успешно отредактировано');
      });
    },
    closeForm () {
      this.editOrderForm = false;
      this.confirmDeleteForm = false;
    },
    truncate (string, limit) {
      if(string.length > limit){
        return string.substring(0,limit)+"...";
      }
      else {
        return string;
      }
    },
    getItemPerPage(val) {
      this.itemsPerPage = val;
    }
  }
};
</script>