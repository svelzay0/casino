<template>
  <v-row>
    <v-col class="pl-10 pr-10">
      <v-card>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-btn
                class="entity__create_btn"
                color="info"
                :to="{ name: 'Cars.create' }"
              >
                <v-icon>mdi-plus</v-icon>
                {{ 'Создать автомобиль' }}
              </v-btn>
            </v-col>
            <v-col cols="12">
              <v-data-table
                :headers="orderHeaders"
                :items="cars"
                :loading="loading"
                :items-per-page="5"
                :footer-props="{
                  'items-per-page-options': [5, 10],
                  'items-per-page-text':'Машин на странице:'
                }"
                loading-text="Загрузка машин, пожалуйста подождите..."
                @update:items-per-page="getItemPerPage"
              >
                <template #[`item.info`]="{ item }">
                  <v-row>
                    <v-col cols="12" class="order__addition_info pb-0 mb-0">
                      Модель <br><b>{{ item.name ? item.name : '-' }}</b>
                    </v-col>
                    <v-col cols="12" class="ma-0 pa-0 pl-3">
                      Описание <br>{{ item.description ? item.description : '-' }}
                    </v-col>
                    <v-col cols="12" class="order__addition_info pt-0 mt-0">
                      Бак {{ item.tank ? item.tank + ' литров' : '-' }}
                    </v-col>
                  </v-row>
                </template>
                <template #[`item.car`]="{ item }">
                  <v-row class="pa-0 pt-6 pb-6">
                    <v-col cols="12" class="ma-0 pa-0">
                      Категория <br><b>{{ item.categoryId ? (truncate(item.categoryId.name,5)) : '-' }}</b>
                    </v-col>
                    <v-col cols="12" class="ma-0 pa-0">
                      Описание <br><b>{{ item.categoryId ? (truncate(item.categoryId.description,20)) : '-' }}</b>
                    </v-col>
                    <v-col cols="12" class="ma-0 pa-0">
                      Номер <b class="primary--text">{{ item.number ? item.number : '-' }}</b>
                    </v-col>
                  </v-row>
                </template>
                <template #[`item.colors`]="{ item }">
                  <v-row class="pt-6 pb-6">
                    <div v-if="item.colors.length > 0">
                      <v-col cols="12" class="ma-0 pa-0">
                        От <b>{{ item.priceMin ? item.priceMin : '-' }}</b>
                      </v-col>
                      <v-col cols="12" class="ma-0 pa-0">
                        До <b>{{ item.priceMax ? item.priceMax : '-' }}</b>
                      </v-col>
                      <v-col v-for="(color, index) in item.colors" :key="index" cols="12" class="order__addition_info ma-0 pa-0">
                        - <b>{{ color }}</b>
                      </v-col>
                    </div>
                    <div v-else>
                      -
                    </div>
                  </v-row>
                </template>
                <template #[`item.createdAt`]="{ item }">
                  <v-row class="pt-6 pb-6">
                    <v-col cols="12" class="ma-0 pa-0 pl-3">
                      Создано {{ item.createdAt ? formatDate(item.createdAt) : '-' }}
                    </v-col>
                    <v-col cols="12" class="ma-0 pa-0 pl-3">
                      Изменено {{ item.updatedAt ? formatDate(item.updatedAt) : '-' }}
                    </v-col>
                  </v-row>
                </template>
                <template #[`item.photo`]="{ item }">
                  <img
                    class="model__car_image"
                    :src="getImgPath(item)"
                    alt=""
                    @error="defaultImage"
                  />
                </template>
                <template #[`item.carCard`]="{ item }">
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
                              :to="{ name: 'Cars.edit', params: { id: item.id } }"
                            >
                              <v-icon color="success">mdi-pencil</v-icon>
                            </v-btn>
                          </template>
                          <span>{{ 'Карточка автомобиля - ' + item.name }}</span>
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
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "Cars",
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
          value: "colors",
          text: "Цены и цвета",
          searchable: false,
          sortable: false,
          width: "18%"
        },
        {
          value: "createdAt",
          text: "Дата создания",
          width: "18%"
        },
        {
          value: "carCard",
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
      this.pageCount = 70 / newVal;
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
        "deleteEntity"
      ]),
    getImgPath(car) {
      if (typeof(car) != "undefined" && car !== null && car.thumbnail.path.length < 1000) {
        return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
      } else return this.imgDefPath;
    },
    formatDate (date) {
      return new Date(date).toLocaleString([], this.dateSettings);
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
    },
    defaultImage(e) {
      e.target.src = this.imgDefPath;
    }
  }
};
</script>