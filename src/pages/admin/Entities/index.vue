<template>
  <v-row>
    <v-col class="pl-10 pr-10">
      <v-card>
        <v-card-text>
          <v-row>
            <v-col cols="auto">
              <v-btn-toggle
                v-model="filters.tableName"
                dense
              >
                <v-btn
                  value="cities"
                  outlined
                >
                  <span>Города</span>
                </v-btn>
                <v-btn
                  value="points"
                  outlined
                >
                  <span>Пункты</span>
                </v-btn>
                <v-btn
                  value="rates"
                  outlined
                >
                  <span>Ставки</span>
                </v-btn>
                <v-btn
                  value="statuses"
                  outlined
                >
                  <span>Статусы</span>
                </v-btn>
                <v-btn
                  value="categories"
                  outlined
                >
                  <span>Категории</span>
                </v-btn>
                <v-btn
                  value="rateTypes"
                  outlined
                  color="black"
                >
                  <span>Тарифы</span>
                </v-btn>
              </v-btn-toggle>
            </v-col>
            <v-col cols="auto">
              <v-btn
                v-if="filters.tableName"
                class="entity__create_btn"
                color="info"
                @click="toCreate"
              >
                <span>{{ createTitle }}</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="12">
              <v-data-table
                :headers="itemHeaders"
                :items="items"
                :loading="loading"
                :items-per-page="itemsPerPage"
                :footer-props="{
                showFirstLastPage: true,
                firstIcon: 'mdi-arrow-collapse-left',
                lastIcon: 'mdi-arrow-collapse-right',
                prevIcon: 'mdi-minus',
                nextIcon: 'mdi-plus',
                  'items-per-page-text':'сущностей на странице:',
                  'pageText': '{0}-{1} из {2}'
                }"
                loading-text="Загрузка сущностей, пожалуйста подождите..."
              >
                <template #[`item.id`]="{ item }">
                  {{ item.id ? (truncate(item.id, 5)) : '-' }}
                </template>
                <template #[`item.createdAt`]="{ item }">
                  {{ item.createdAt ? formatDate(item.createdAt) : '-' }}
                </template>
                <template #[`item.updatedAt`]="{ item }">
                  {{ item.updatedAt ? formatDate(item.updatedAt) : '-' }}
                </template>
                <template #[`item.city`]="{ item }">
                  {{ item.cityId ? item.cityId.name : '-' }}
                </template>
                <template #[`item.tariff`]="{ item }">
                  {{ item.rateTypeId ? item.rateTypeId.name : '-' }}
                </template>
                <template #[`item.rateUnit`]="{ item }">
                  {{ item.rateTypeId ? item.rateTypeId.unit : '-' }}
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
                              @click="toEdit(item, items.map(function(x) {return x.id; }).indexOf(item.id))"
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
          </v-row>
        </v-card-text>
        <v-dialog v-model="entityForm" max-width="700">
          <entity-form
            :key="formKey"
            :entity="entity"
            :method="method"
            :cities="cities"
            :rate-types="rateTypes"
            :table-name="filters.tableName"
            @cancel="closeForm()"
            @successEdit="formSuccessEdit($event)"
            @successCreate="formSuccessCreate($event)"
          />
        </v-dialog>
        <v-dialog v-model="confirmDeleteForm" max-width="700">
          <confirm-delete-form
            :key="formKey"
            :entity="deleteItem"
            :table-name="filters.tableName"
            @cancel="closeForm()"
            @successDelete="formSuccessDelete($event)"
          />
        </v-dialog>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import EntityForm from './EntityForm'
import ConfirmDeleteForm from '../../../components/ConfirmDeleteForm'

export default {
  name: "Entities",
  components: {
    EntityForm,
    ConfirmDeleteForm
  },
  data() {
    return {
      loading: true,
      itemsPerPage: 10,
      points: [],
      rates: [],
      cities: [],
      statuses: [],
      rateTypes: [],
      categories: [],
      items: [],
      itemHeaders: [],
      entity: null,
      entityKey: null,
      deleteItem: null,
      formKey: 1,
      entityForm: false,
      confirmDeleteForm: false,
      entityName: 'city',
      method: '',
      filters: {
        tableName: 'cities'
      },
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
    createTitle () {
      if (this.filters.tableName === 'cities') {
        return "Cоздать город";
      } else if (this.filters.tableName === 'points') {
        return "Cоздать пункт";
      } else if (this.filters.tableName === 'statuses') {
        return "Cоздать статус";
      } else if (this.filters.tableName === 'rates') {
        return "Cоздать ставку";
      } else if (this.filters.tableName === 'categories') {
        return "Cоздать категорию";
      } else if (this.filters.tableName === 'rateTypes') {
        return "Cоздать тариф";
      } else {
        return '-'
      }
    },
    cityHeaders () {
      return [
        {
          value: "id",
          text: "ID",
          searchable: false,
          sortable: false
        },
        {
          value: "name",
          text: "Наименование"
        },
        {
          value: "createdAt",
          text: "Дата создания",
          searchable: false,
          sortable: false
        },
        {
          value: "updatedAt",
          text: "Дата изменения",
          searchable: false,
          sortable: false
        },
        {
          value: "actions",
          text: "Действия",
          searchable: false,
          sortable: false
        }
      ]
    },
    pointHeaders () {
      return [
        {
          value: "id",
          text: "ID",
          searchable: false,
          sortable: false,
        },
        {
          value: "name",
          text: "Наименование"
        },
        {
          value: "city",
          text: "Город"
        },
        {
          value: "address",
          text: "Адрес"
        },
        {
          value: "actions",
          text: "Действия",
          searchable: false,
          sortable: false
        }
      ]
    },
    rateHeaders () {
      return [
        {
          value: "id",
          text: "ID",
          searchable: false,
          sortable: false
        },
        {
          value: "price",
          text: "Стоимость"
        },
        {
          value: "tariff",
          text: "Наименование тарифа",
          searchable: false,
          sortable: false
        },
        {
          value: "rateUnit",
          text: "Единица измерения",
          searchable: false,
          sortable: false
        },
        {
          value: "createdAt",
          text: "Дата создания",
          searchable: false,
          sortable: false
        },
        {
          value: "updatedAt",
          text: "Дата изменения",
          searchable: false,
          sortable: false
        },
        {
          value: "actions",
          text: "Действия",
          searchable: false,
          sortable: false
        }
      ]
    },
    statusHeaders () {
      return [
        {
          value: "id",
          text: "ID",
          searchable: false,
          sortable: false,
        },
        {
          value: "name",
          text: "Наименование"
        },
        {
          value: "actions",
          text: "Действия",
          searchable: false,
          sortable: false
        }
      ]
    },
    categoryHeaders () {
      return [
        {
          value: "id",
          text: "ID",
          searchable: false,
          sortable: false,
        },
        {
          value: "name",
          text: "Наименование"
        },
        {
          value: "description",
          text: "Описание"
        },
        {
          value: "createdAt",
          text: "Дата создания",
          searchable: false,
          sortable: false
        },
        {
          value: "updatedAt",
          text: "Дата изменения",
          searchable: false,
          sortable: false
        },
        {
          value: "actions",
          text: "Действия",
          searchable: false,
          sortable: false
        }
      ]
    },
    rateTypeHeaders () {
      return [
        {
          value: "id",
          text: "ID",
          searchable: false,
          sortable: false,
        },
        {
          value: "name",
          text: "Наименование"
        },
        {
          value: "unit",
          text: "Единица измерения"
        },
        {
          value: "actions",
          text: "Действия",
          searchable: false,
          sortable: false
        }
      ]
    },
    ...mapGetters("entities",
      [
        "getCities",
        "getPoints",
        "getRates",
        "getOrderStatuses",
        "getCategories",
        "getRateTypes"
      ])
  },
  watch: {
    filters: {
      handler (newVal) {
        if (newVal.tableName === 'cities') {
          this.items = cloneDeep(this.cities);
          this.itemHeaders = cloneDeep(this.cityHeaders);
          this.entityName = 'city';
        } else if (newVal.tableName === 'points') {
          this.items = cloneDeep(this.points);
          this.itemHeaders = cloneDeep(this.pointHeaders);
          this.entityName = 'point';
        } else if (newVal.tableName === 'rates') {
          this.items = cloneDeep(this.rates);
          this.itemHeaders = cloneDeep(this.rateHeaders);
          this.entityName = 'rate';
        } else if (newVal.tableName === 'statuses') {
          this.items = cloneDeep(this.statuses);
          this.itemHeaders = cloneDeep(this.statusHeaders);
          this.entityName = 'orderStatus';
        } else if (newVal.tableName === 'categories') {
          this.items = cloneDeep(this.categories);
          this.itemHeaders = cloneDeep(this.categoryHeaders);
          this.entityName = 'category';
        } else if (newVal.tableName === 'rateTypes') {
          this.items = cloneDeep(this.rateTypes);
          this.itemHeaders = cloneDeep(this.rateTypeHeaders);
          this.entityName = 'rateType';
        }
      },
      deep: true
    }
  },
  mounted() {
    if (this.getCities.length === 0) {
      this.loading = true;
      this.fetchCities().then(() => {
        this.cities = this.getCities;
        this.items = cloneDeep(this.cities);
        this.itemHeaders = cloneDeep(this.cityHeaders);
        this.loading = false;
      });
    } else {
      this.cities = this.getCities;
      this.items = cloneDeep(this.getCities);
      this.itemHeaders = cloneDeep(this.cityHeaders);
    }
    if (this.getPoints.length === 0) {
      this.loading = true;
      this.fetchPoints().then(() => {
        this.points = this.getPoints;
        this.loading = false;
      });
    } else {
      this.points = this.getPoints;
    }
    if (this.getRates.length === 0) {
      this.loading = true;
      this.fetchRates().then(() => {
        this.rates = this.getRates;
        this.loading = false;
      });
    } else {
      this.rates = this.getRates;
    }
    if (this.getOrderStatuses.length === 0) {
      this.loading = true;
      this.fetchOrderStatuses().then(() => {
        this.statuses = this.getOrderStatuses;
        this.loading = false;
      });
    } else {
      this.cities = this.getCities;
    }
    if (this.getCategories.length === 0) {
      this.fetchCategories().then(() => {
        this.loading = true;
        this.categories = this.getCategories;
        this.loading = false;
      });
    } else {
      this.categories = this.getCategories;
    }
    if (this.getRateTypes.length === 0) {
      this.loading = true;
      this.fetchRateTypes().then(() => {
        this.rateTypes = this.getRateTypes;
        this.loading = false;
      });
    } else {
      this.rateTypes = this.getRateTypes;
    }
  },
  methods: {
    ...mapActions("entities",
      [
        "fetchCities",
        "fetchPoints",
        "fetchRates",
        "fetchOrderStatuses",
        "fetchCategories",
        "fetchRateTypes",
        "editEntity",
        "createEntity",
        "deleteEntity"
      ]),
    truncate (string, limit) {
      if(string.length > limit){
        return string.substring(0,limit)+"...";
      }
      else {
        return string;
      }
    },
    toDelete (id) {
      this.deleteItem = {
        id: id,
        entity: this.entityName
      }
      this.confirmDeleteForm = true;
      this.formKey++;
    },
    formSuccessDelete (item) {
      this.closeForm();
      this.deleteEntity(item).then(() => {
        this.fetchNewRows();
        this.$toast.info('Удалено');
      });
    },
    formatDate (date) {
      return new Date(date).toLocaleString([], this.dateSettings);
    },
    toCreate () {
      this.entity = this.items[0]
      if (this.entity.createdAt) {
        delete this.entity.createdAt;
      }
      if (this.entity.id) {
        delete this.entity.id;
      }
      if (this.entity.updatedAt) {
        delete this.entity.updatedAt;
      }
      var clearObjectValues = (objToClear) => {
        Object.keys(objToClear).forEach((param) => {
            if ( (objToClear[param]).toString() === "[object Object]" ) {
                clearObjectValues(objToClear[param]);
            } else {
                objToClear[param] = null;
            }
        })
        return objToClear;
      };
      this.entity = clearObjectValues(this.entity);
      this.method = 'create';
      this.formKey++;
      this.entityForm = true;
    },
    toEdit (item, key) {
      this.method = 'edit';
      this.entity = item;
      this.entityKey = key;
      this.formKey++;
      this.entityForm = true;
    },
    formSuccessEdit (item) {
      this.closeForm();
      const entity = {
        item: item,
        entityName: this.entityName
      }
      this.editEntity(entity).then(() => {
        this.fetchNewRows();
        this.$toast.success('Успешно отредактировано - ' + this.entityName);
      });
    },
    formSuccessCreate (item) {
      this.closeForm();
      const entity = {
        item: item,
        entityName: this.entityName
      }
      this.createEntity(entity).then(() => {
        this.loading = true;
        this.fetchNewRows();
        this.$toast.success('Успешно создано - ' + this.entityName);
      });
    },
    closeForm () {
      this.entityForm = false;
      this.confirmDeleteForm = false;
    },
    fetchNewRows() {
      if (this.entityName === 'city') {
        this.fetchCities().then(() => {
          this.cities = this.getCities;
          this.items = cloneDeep(this.cities);
          this.itemHeaders = cloneDeep(this.cityHeaders);
          this.loading = false;
        });
      }
      if (this.entityName === 'point') {
        this.loading = true;
        this.fetchPoints().then(() => {
          this.points = this.getPoints;
          this.items = cloneDeep(this.points);
          this.loading = false;
        });
      }
      if (this.entityName === 'rate') {
        this.loading = true;
        this.fetchRates().then(() => {
          this.rates = this.getRates;
          this.items = cloneDeep(this.rates);
          this.loading = false;
        });
      }
      if (this.entityName === 'orderStatus') {
        this.loading = true;
        this.fetchOrderStatuses().then(() => {
          this.statuses = this.getOrderStatuses;
          this.items = cloneDeep(this.statuses);
          this.loading = false;
        });
      }
      if (this.entityName === 'category') {
        this.fetchCategories().then(() => {
          this.loading = true;
          this.categories = this.getCategories;
          this.items = cloneDeep(this.categories);
          this.loading = false;
        });
      }
      if (this.entityName === 'rateType') {
        this.loading = true;
        this.fetchRateTypes().then(() => {
          this.rateTypes = this.getRateTypes;
          this.items = cloneDeep(this.rateTypes);
          this.loading = false;
        });
      }
    }
  }
};
</script>