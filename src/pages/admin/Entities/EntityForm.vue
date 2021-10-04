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
            v-model="entityItem.name"
            label='Наименование'
            outlined
            required
            :rules="nameRules"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'points'">
          <v-text-field
            v-model="entityItem.address"
            label='Адрес'
            outlined
            required
            :rules="nameRules"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'points'">
          <v-select
            v-model="entityItem.cityId"
            item-value="id"
            item-text="name"
            outlined
            :items="cities"
            label='Город'
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'rates'">
          <v-text-field
            v-model="entityItem.price"
            label='Стоимость'
            v-mask="'##########'"
            outlined
            required
            :rules="priceRules"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'rates'">
          <v-select
            v-model="entityItem.rateTypeId"
            item-value="id"
            item-text="name"
            outlined
            :items="rateTypes"
            label='Тариф'
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'categories'">
          <v-text-field
            v-model="entityItem.description"
            label='Описание'
            outlined
            required
            :rules="nameRules"
          />
        </v-col>
        <v-col cols="12" v-if="tableName === 'rateTypes'">
          <v-text-field
            v-model="entityItem.unit"
            label='Единица измерения'
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
        :disabled="entityItem.name.length < 3"
        @click="submit"
      >
        Сохранить
      </v-btn>
      <v-btn
        v-if="tableName === 'rates'"
        color="primary"
        :disabled="entityItem.price < 1"
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
      entityItem: {
        name: '',
        address: '',
        price: 0,
        unit: '',
        city: null,
        rateType: null,
        description: ''
      }
    }
  },
  created () {
    if (this.method === 'edit') {
      this.entityItem = { ...this.entity };
    }
  },
  computed: {
    title () {
      if (this.method === 'edit') {
        return `Редактировать сущность из таблицы ${this.tableName}`;
      } else {
        return `Создать сущность в таблице ${this.tableName}`;
      }
    }
  },
  methods: {
    submit () {
      if (this.tableName !== 'rates') {
        this.entity.name = this.entityItem.name
      } else if (this.tableName === 'rates') {
        this.entity.price = this.entityItem.price
        this.rateTypes.forEach((el) => {
          if (el.id === this.entityItem.rateTypeId) {
            this.entity.rateTypeId = el
          }
        })
      }
      if (this.tableName === 'points') {
        this.entity.address = this.entityItem.address
        this.cities.forEach((el) => {
          if (el.id === this.entityItem.cityId) {
            this.entity.cityId = el
          }
        })
      }
      if (this.tableName === 'categories') {
        this.entity.description = this.entityItem.description
      }
      if (this.tableName === 'rateTypes') {
        this.entity.unit = this.entityItem.unit
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
