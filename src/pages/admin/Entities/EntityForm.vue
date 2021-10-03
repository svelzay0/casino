<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <hr/>
      <v-row class="pt-12">
        <v-col cols="12" v-if="tableName !== 'rates'">
          <v-text-field
            v-model="name"
            :label="'Наименование'"
            outlined
            required
            :rules="nameRules"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'points'">
          <v-text-field
            v-model="address"
            :label="'Адрес'"
            outlined
            required
            :rules="nameRules"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'points'">
          <v-select
            v-model="city"
            item-value="id"
            item-text="name"
            outlined
            :items="cities"
            :label="'Город'"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'rates'">
          <v-text-field
            v-model="price"
            :label="'Стоимость'"
            v-mask="'##########'"
            outlined
            required
            :rules="priceRules"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'rates'">
          <v-select
            v-model="rateType"
            item-value="id"
            item-text="name"
            outlined
            :items="rateTypes"
            :label="'Тариф'"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'categories'">
          <v-text-field
            v-model="description"
            :label="'Описание'"
            outlined
            required
            :rules="nameRules"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'rateTypes'">
          <v-text-field
            v-model="unit"
            :label="'Единица измерения'"
            outlined
            required
            :rules="nameRules"
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
        v-if="tableName !== 'rates'"
        color="primary"
        :disabled="name.length < 3"
        @click="submit"
      >
        Сохранить
      </v-btn>
      <v-btn 
        v-if="tableName === 'rates'"
        color="primary"
        :disabled="price < 1"
        @click="submit"
      >
        Сохранить
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'EntityForm',
  props: {
    entity: {
      type: Object,
      default: () => {}
    },
    method: {
      type: String,
      required: true
    },
    tableName: {
      type: String,
      required: true
    },
    cities: {
      type: Array,
      required: true
    },
    rateTypes: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      nameRules: [
        v => v.length >= 3 || 'Необходимо минимум 3 символа'
      ],
      priceRules: [
        v => v > 0 || 'Стоимость должна быть больше нуля'
      ],
      name: '',
      address: '',
      price: 0,
      unit: '',
      city: null,
      rateType: null,
      description: '',
      creatingEntity: {}
    }
  },
  created () {
    if (this.method === 'edit') {
      if (this.tableName !== 'rates') {
        this.name = this.entity.name
      } else if (this.tableName === 'rates') {
        this.price = this.entity.price
        this.rateType = this.entity.rateTypeId
      }
      if (this.tableName === 'points') {
        this.address = this.entity.address
        this.city = this.entity.cityId
      }
      if (this.tableName === 'categories') {
        this.description = this.entity.description
      }
      if (this.tableName === 'rateTypes') {
        this.unit = this.entity.unit
      }
    }
  },
  computed: {
    title () {
      if (this.method === 'edit') {
        return 'Редактировать сущность из таблицы ' + this.tableName;
      } else {
        return 'Создать сущность в таблице ' + this.tableName;
      }
    }
  },
  methods: {
    submit () {
      if (this.tableName !== 'rates') {
        this.entity.name = this.name
      } else if (this.tableName === 'rates') {
        this.entity.price = this.price
        this.rateTypes.forEach((el) => {
          if (el.id === this.rateType) {
            this.entity.rateTypeId = el
          }
        })
      }  
      if (this.tableName === 'points') {
        this.entity.address = this.address
        this.cities.forEach((el) => {
          if (el.id === this.city) {
            this.entity.cityId = el
          }
        })
      }
      if (this.tableName === 'categories') {
        this.entity.description = this.description
      }
      if (this.tableName === 'rateTypes') {
        this.entity.unit = this.unit
      }
      if (this.method === 'edit') {
        this.$emit('successEdit', this.entity, this.tableName);
      } else {
        this.$emit('successCreate', this.entity, this.tableName);
      }
    }
  }
}
</script>
