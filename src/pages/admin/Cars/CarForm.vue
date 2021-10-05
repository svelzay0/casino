<template>
  <v-row>
    <v-col
      class="pl-10 pr-8"
      cols="12"
      lg="4"
      md="6"
      sm="8"
      xs="8"
    >
      <v-card height="400">
        <v-row justify="center" align="center">
          <img
            class="cars__car_image"
            :src="getImgPath(car)"
            alt=""
            @error="defaultImage"
          />
          <div class="d-flex align-center py-3">
          <div class="display-1 pl-6 pb-2">
            <span class="main__title">
              {{ car.name ? car.name : '-' }}
            </span>
          </div>
        </div>
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
        <v-col cols="6">
          <v-text-field
            v-model="car.name"
            label='Модель автомобиля'
            clearable
            required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="car.description"
            label='Описание'
            clearable
            required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="car.priceMin"
            label='Минимальная стоимость'
            v-mask="'##########'"
            clearable
            required
          />
        </v-col>
        <v-col cols="6">
          <v-text-field
            v-model="car.priceMax"
            label='Максимальная стоимость'
            v-mask="'##########'"
            clearable
            required
          />
        </v-col>
        <v-col cols="4">
          <v-select
            v-model="car.categoryId"
            item-value="id"
            item-text="name"
            outlined
            :items="categories"
            label='Категория'
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="car.number"
            label='Номер'
            clearable
            required
          />
        </v-col>
        <v-col cols="4">
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
        @click="$emit('cancel')"
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
      car: {
        name: null,
        description: null,
        number: null,
        colors: [],
        categoryId: {
          description: null,
          id: null,
          name: null
        },
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
      colors: [
        'красный',
        'синий',
        'черный',
        'желтый',
        'зеленый',
        'белый',
        'бирозовый',
        'пурпурный',
        'коричневый',
        'оранжевый',
        'розовый',
        'любой'
      ],
      imgDefPath: require("@/assets/default_car.jpg")
    }
  },
  created () {
    // this.order = { ...this.orderItem };
  },
  computed: {
    title () {
      return this.modelId ? `Настройки автомобиля ${this.modelId}` : 'Настройки автомобиля';
    }
  },
  methods: {
    submit () {
      this.statuses.forEach((element) => {
        if (element.id === this.order.orderStatusId) {
          this.orderItem.orderStatusId = element;
        }
      })
      this.orderItem.price = this.order.price
      this.orderItem.color = this.order.color
      this.orderItem.isRightWheel = this.order.isRightWheel
      this.orderItem.isFullTank = this.order.isFullTank
      this.orderItem.isNeedChildChair = this.order.isNeedChildChair
      this.$emit('success', this.orderItem);
    },
    getImgPath(car) {
      if (typeof(car) != "undefined" && car !== null && car.thumbnail.path.length < 1000) {
        return `${process.env.VUE_APP_API_IMG}${car.thumbnail.path}`;
      } else return this.imgDefPath;
    },
    defaultImage(e) {
      e.target.src = this.imgDefPath;
    }
  }
}
</script>
