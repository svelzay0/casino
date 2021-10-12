<template>
  <v-row>
    <v-col
      class="pl-10 pr-8 pt-6"
      cols="12"
      lg="4"
      md="6"
      sm="8"
      xs="8"
    >
      <v-card>
        <v-skeleton-loader v-if="firstLoad" class="mb-n16" :loading="firstLoad" type="image"/>
        <v-row justify="center" align="center" class="pa-10">
          <img
            v-show="!firstLoad"
            class="cars__car_image"
            :src="getImgPath(car)"
            alt=""
          />
        </v-row>
        <v-row justify="center" align="center">
          <div class="d-flex align-center">
            <div class="display-1 pl-6 pr-3">
              <span class="main__title">
                {{ car.name ? car.name : '-' }}
              </span>
            </div>
          </div>
        </v-row>
        <v-row justify="center" align="center">
          <span>
            {{ car.categoryId ? car.categoryId.name : '-' }}
          </span>
        </v-row>
        <v-row justify="center" align="center" class="pt-6 pb-3">
          <v-col cols="8">
            <v-file-input
              v-model="fileInput"
              label="Выберите файл..."
              outlined
              prepend-icon="mdi-camera"
              @change="setImage"
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pt-6">
          <v-subheader>Заполнено {{ fullness }} %</v-subheader>
          <v-col cols="10" class="pt-0 mt-0">
            <v-slider
              v-model="fullness"
              readonly
              value="0"
            />
          </v-col>
        </v-row>
        <v-divider></v-divider>
        <v-row justify="center" align="center" class="pt-9 pb-6 pl-6 pr-3">
          <span>
            {{ car.description ? car.description : '-' }}
          </span>
        </v-row>
      </v-card>
    </v-col>
    <v-col
      class="pr-8 pl-md-2 pl-sm-10 pl-xs-10 pl-10"
      lg="8"
      md="6"
      sm="12"
      xs="12"
    >
      <v-card class="pb-8 mb-8">
        <v-card-text>
          <v-card-title>
            <span class="headline">{{ title }}</span>
          </v-card-title>
          <v-row class="pt-12 pl-5">
            <v-col
              cols="12"
              xl="6"
              lg="6"
              md="6"
              sm="12"
              xs="12"
            >
              <v-text-field
                v-model="car.name"
                label='Модель автомобиля'
                required
                :rules="nameRules"
              />
            </v-col>
            <v-col
              cols="12"
              xl="6"
              lg="6"
              md="6"
              sm="12"
              xs="12"
            >
              <v-text-field
                v-model="car.description"
                label='Описание'
                required
                :rules="nameRules"
              />
            </v-col>
            <v-col
              cols="12"
              xl="6"
              lg="6"
              md="6"
              sm="12"
              xs="12"
            >
              <v-text-field
                v-model="car.priceMin"
                label='Минимальная стоимость'
                v-mask="'##########'"
                required
                :rules="priceRules"
              />
            </v-col>
            <v-col
              cols="12"
              xl="6"
              lg="6"
              md="6"
              sm="12"
              xs="12"
            >
              <v-text-field
                v-model="car.priceMax"
                label='Максимальная стоимость'
                v-mask="'##########'"
                required
                :rules="priceRules"
              />
            </v-col>
            <v-col
              cols="12"
              xl="4"
              lg="4"
              md="4"
              sm="12"
              xs="12"
            >
              <v-select
                v-model="car.categoryId"
                item-value="id"
                item-text="name"
                outlined
                return-object
                :items="categories"
                label='Категория'
              />
            </v-col>
            <v-col
              cols="12"
              xl="4"
              lg="4"
              md="4"
              sm="12"
              xs="12"
            >
              <v-text-field
                v-model="car.number"
                label='Номер'
                required
                :rules="nameRules"
              />
            </v-col>
            <v-col
              cols="12"
              xl="4"
              lg="4"
              md="4"
              sm="12"
              xs="12"
            >
              <v-text-field
                v-model="car.tank"
                label='Вместимость бака в литрах'
                v-mask="'##########'"
                required
                :rules="priceRules"
              />
            </v-col>
            <v-col cols="12">
              <v-select
                v-model="car.colors"
                item-value="id"
                item-text="name"
                outlined
                chips
                :items="colors"
                multiple
                label='Цвета'
              />
            </v-col>
          </v-row>
          <v-spacer/>
          <v-card-actions>
            <v-row class="pt-3 pl-3">
              <v-col cols="auto">
                <v-btn
                  color="primary"
                  :disabled="car.name.length < 3
                            || car.description.length < 3
                            || car.description.length < 3
                            || car.number.length < 3
                            || car.priceMin < 1
                            || car.priceMax < 1"
                  @click="submit"
                >
                  Сохранить
                </v-btn>
              </v-col>
              <v-spacer/>
              <v-col cols="auto">
                <v-btn
                  :to="{ name: 'Cars' }"
                >
                  Отмена
                </v-btn>
              </v-col>
              <v-col cols="auto">
                <v-btn
                  v-if="modelId"
                  color="red text-white"
                  @click="toDelete"
                >
                  Удалить
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card-text>
        <v-dialog v-model="confirmDeleteForm" max-width="700">
          <confirm-delete-form
            :key="formKey"
            :entity="deleteItem"
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
import ConfirmDeleteForm from '../../../components/ConfirmDeleteForm'

export default {
  name: 'CarForm',
   components: {
    ConfirmDeleteForm
  },
  props: {
    modelId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      fileInput: null,
      nameRules: [
        v => v.length >= 3 || 'Необходимо минимум 3 символа'
      ],
      priceRules: [
        v => v > 0 || 'Стоимость должна быть больше нуля'
      ],
      car: {
        name: '',
        description: '',
        number: '',
        colors: [],
        categoryId: null,
        priceMin: 0,
        priceMax: 0,
        tank: 0,
        thumbnail: {
          mimetype: '',
          originalname: '',
          path: '',
          size: 0
        }
      },
      categories: [],
      fullness: 0,
      colors: [
        'красный',
        'Красный',
        'черный',
        'голубой',
        'Синий',
        'белый',
        'Серый',
        'Белый',
        'Black',
        'Оранжевый',
        'Желтый',
        'любой',
        'Алый'
      ],
      imgDefPath: require("@/assets/default_car.jpg"),
      editedId: '',
      editedCar: null,
      nameBool: false,
      descriptionBool: false,
      numberBool: false,
      colorsBool: false,
      categoryIdBool: false,
      priceMinBool: false,
      priceMaxBool: false,
      tankBool: false,
      thumbnailBool: false,
      confirmDeleteForm: false,
      deleteItem: null,
      formKey: 1,
      method: null,
      path: '',
      firstLoad: true
    }
  },
  mounted () {
    if (this.modelId) {
      this.method = 'edit';
      this.editedCar = { ...this.car };
      if (this.editedId !== this.modelId) {
        this.fetchCar(this.modelId).then(() => {
          this.car = { ...this.getCar };
          this.fileInput = {
            size: this.car.thumbnail.size,
            type: this.car.thumbnail.mimetype,
            name: this.car.thumbnail.originalname,
            path: this.car.thumbnail.path
          }
          this.firstLoad = false;
        });
      }
      this.editedId = this.modelId;
    } else {
      this.firstLoad = false;
      this.method = 'create';
    }
    if (this.getCategories.length === 0) {
      this.fetchCategories().then(() => {
        this.categories = this.getCategories;
      });
    } else {
      this.categories = this.getCategories;
    }
  },
  computed: {
    title () {
      return this.modelId ? `Настройки автомобиля ${this.modelId}` : 'Настройки автомобиля';
    },
    ...mapGetters("entities",
      [
        "getCar",
        "getCategories"
      ])
  },
  watch: {
    modelId: function (newVal) {
      if (newVal) {
        this.fetchCar(newVal).then(() => {
          this.car = { ...this.getCar };
          this.fileInput = {
            size: this.car.thumbnail.size,
            type: this.car.thumbnail.mimetype,
            name: this.car.thumbnail.originalname,
            path: this.car.thumbnail.path
          }
        });
      } else {
        this.car = { ...this.editedCar };
      }
    },
    'car.name': function (newVal) {
      // Это для отображения ползунка заполненности карточки.
      // Пытался этот ужас отрефакторить, вынести в функцию, но не получилось, так как все this.булевы разные,
      // и их там не переопределишь принимая this.булев в качестве аргумента
      if (newVal.length > 0) {
        if (this.nameBool === false) {
          this.fullness += 11;
        }
        this.nameBool = true;
      } else {
        this.fullness -= 11;
        this.nameBool = false;
      }
    },
    'car.description': function (newVal) {
      if (newVal.length > 0) {
        if (this.descriptionBool === false) {
          this.fullness += 11;
        }
        this.descriptionBool = true;
      } else {
        this.fullness -= 11;
        this.descriptionBool = false;
      }
    },
    'car.number': function (newVal) {
      if (newVal.length > 0) {
        if (this.numberBool === false) {
          this.fullness += 11;
        }
        this.numberBool = true;
      } else {
        this.fullness -= 11;
        this.numberBool = false;
      }
    },
    'car.colors': function (newVal) {
      if (newVal.length > 0) {
        if (this.colorsBool === false) {
          this.fullness += 11;
        }
        this.colorsBool = true;
      } else {
        this.fullness -= 11;
        this.colorsBool = false;
      }
    },
    'car.categoryId': function (newVal) {
      if (newVal) {
        if (this.categoryIdBool === false) {
          this.fullness += 11;
        }
        this.categoryIdBool = true;
      } else {
        this.fullness -= 11;
        this.categoryIdBool = false;
      }
    },
    'car.priceMin': function (newVal) {
      if (newVal) {
        if (this.priceMinBool === false) {
          this.fullness += 11;
        }
        this.priceMinBool = true;
      } else {
        this.fullness -= 11;
        this.priceMinBool = false;
      }
    },
    'car.priceMax': function (newVal) {
      if (newVal) {
        if (this.priceMaxBool === false) {
          this.fullness += 11;
        }
        this.priceMaxBool = true;
      } else {
        this.fullness -= 11;
        this.priceMaxBool = false;
      }
    },
    'car.tank': function (newVal) {
      if (newVal) {
        if (this.tankBool === false) {
          this.fullness += 11;
        }
        this.tankBool = true;
      } else {
        this.fullness -= 11;
        this.tankBool = false;
      }
    },
    'car.thumbnail': function (newVal) {
      if (newVal.size > 0) {
        if (this.thumbnailBool === false) {
          this.fullness += 12;
        }
        this.thumbnailBool = true;
      } else {
        this.fullness -= 12;
        this.thumbnailBool = false;
      }
    }
  },
  methods: {
    ...mapActions("entities",
      [
        "fetchCar",
        "fetchCategories",
        "editEntity",
        "createEntity",
        "deleteEntity"
      ]),
    submit () {
      const entity = {
        entityName: 'car',
        item: this.car
      }
      if (this.modelId) {
        this.editEntity(entity).then(() => {
          this.$router.push("/admin/cars");
          this.$toast.success('Успешно отредактировано');
        });
      } else {
        this.createEntity(entity).then(() => {
          this.$router.push("/admin/cars");
          this.$toast.success('Успешно создано');
        });
      }
    },
    toDelete () {
      this.deleteItem = {
        entity: 'car',
        id: this.modelId
      }
      this.confirmDeleteForm = true;
      this.formKey++;
    },
    formSuccessDelete (item) {
      this.closeForm();
      this.deleteEntity(item).then(() => {
        this.$router.push("/admin/cars");
        this.$toast.info('Удалено');
      });
    },
    closeForm () {
      this.confirmDeleteForm = false;
    },
    getImgPath(car) {
      if (this.modelId) {
        if (typeof(car) != "undefined" && car !== null) {
          if (car.thumbnail.path === '' && this.fileInput) {
            return this.imgDefPath;
          } else if (car.thumbnail.path === undefined) {
            return URL.createObjectURL(this.fileInput);
          } else if (car.thumbnail.path.length > 0 && car.thumbnail.path.length < 1000) {
            return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
          } else if (car.thumbnail.path.length > 1000) {
            return car.thumbnail.path;
          } 
          else if (!this.fileInput) {
            return this.imgDefPath;
          }
        } 
        else return this.imgDefPath;
      } 
      else {
         if (this.fileInput && this.method === 'create') {
           return URL.createObjectURL(this.fileInput);
         } else return this.imgDefPath;
      }
    },
    defaultImage(e) {
      e.target.src = this.imgDefPath;
    },
    getBase64Image(url, callback) {
      const xhr = new XMLHttpRequest();
      xhr.onload = function() {
        const reader = new FileReader();
        reader.onloadend = function() {
          callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
      };
      xhr.open('GET', url);
      xhr.responseType = 'blob';
      xhr.send();
    },
    setImage() {
      if (this.fileInput) {
        const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.onloadend = () => resolve(reader.result)
          reader.onerror = reject
          reader.readAsDataURL(blob)
        }))
        toDataURL(require(`@/files/${this.fileInput.name}`))
        .then(dataUrl => {
          this.car.thumbnail = {
            mimetype: this.fileInput.type,
            originalname: this.fileInput.name,
            size: this.fileInput.size,
            path: dataUrl
          }
        })
      } else {
        this.car.thumbnail = {
          mimetype: '',
          originalname: '',
          path: '',
          size: 0,
        }
      }
    }
  }
}
</script>