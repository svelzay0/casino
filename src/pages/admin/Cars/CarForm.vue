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
        <v-row justify="center" align="center" class="pa-10">
          <img
            class="cars__car_image"
            :src="getImgPath(car)"
            alt=""
            @error="defaultImage"
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
        <v-row justify="center" align="center" class="pt-6 pb-3 pl-6 pr-3">
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
      <v-card>
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
                clearable
                required
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
                clearable
                required
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
                clearable
                required
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
                clearable
                required
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
                clearable
                required
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
                clearable
                required
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
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            :to="{ name: 'cars' }"
          >
            Отмена
          </v-btn>
          <v-btn
            color="primary"
            @click="submit"
          >
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: 'CarForm',
  props: {
    modelId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      fileInput: null,
      car: {
        name: '',
        description: '',
        number: '',
        colors: [],
        categoryId: null,
        priceMin: null,
        priceMax: null,
        tank: null,
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
      editedCar: null
    }
  },
  mounted () {
    this.editedCar = { ...this.car };
    if (this.editedId !== this.modelId) {
      this.fetchCar(this.modelId).then(() => {
        this.car = { ...this.getCar };
        this.fileInput = {
          size: this.car.thumbnail.size,
          type: this.car.thumbnail.mimetype,
          name: this.car.thumbnail.originalname,
        }
        if (this.car.name.length > 0) {
          this.fullness += 11;
        }
        if (this.car.number.length > 0) {
          this.fullness += 11;
        }
        if (this.car.categoryId) {
          this.fullness += 11;
        }
        if (this.car.colors.length > 0) {
          this.fullness += 11;
        }
        if (this.car.description.length > 0) {
          this.fullness += 11;
        }
        if (this.car.priceMin) {
          this.fullness += 11;
        }
        if (this.car.priceMax) {
          this.fullness += 11;
        }
        if (this.car.tank) {
          this.fullness += 11;
        }
        if (this.car.thumbnail.size > 0) {
          this.fullness += 12;
        }
      });
    }
    if (this.getCategories.length === 0) {
      this.fetchCategories().then(() => {
        this.categories = this.getCategories;
      });
    } else {
      this.categories = this.getCategories;
    }
    this.editedId = this.modelId;
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
    'modelId': function (newVal) {
      if (newVal) {
        this.fetchCar(newVal).then(() => {
          this.car = { ...this.getCar };
          this.fileInput = {
            size: this.car.thumbnail.size,
            type: this.car.thumbnail.mimetype,
            name: this.car.thumbnail.originalname,
          }
        });
      } else {
        this.car = { ...this.editedCar };
      }
    },
    car: {
      handler (newVal) {
        console.log(newVal)
        // if (this.car.name.length > 0) {
        //   this.fullness += 10;
        // } else {
        //   this.fullness -= 10;
        // }
        // this.reset = false;
      },
      deep: true
    }
  },
  methods: {
    ...mapActions("entities",
      [
        "fetchCar",
        "fetchCategories",
        "editEntity"
      ]),
    submit () {
      const entity = {
        entityName: 'car',
        item: this.car
      }
      this.editEntity(entity).then(() => {
        this.$router.push("/admin/cars");
        this.$toast.success('Успешно отредактировано');
      });
      
    },
    getImgPath(car) {
      if (typeof(car) != "undefined" && car !== null) {
        if (!car.thumbnail.path && this.fileInput && this.modelId) {
          return URL.createObjectURL(this.fileInput);
        } else if (this.fileInput) {
          return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
        } else return this.imgDefPath;
      } else return this.imgDefPath;
    },
    defaultImage(e) {
      e.target.src = this.imgDefPath;
    },
    setImage() {
      if (this.fileInput) {
        this.car.thumbnail = {
          mimetype: this.fileInput.type,
          originalname: this.fileInput.name,
          size: this.fileInput.size,
        }
      }
    }
  }
}
</script>
