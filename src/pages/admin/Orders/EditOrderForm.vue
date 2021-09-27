<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <hr/>
      <v-row class="pt-12">
        <v-col cols="4">
          <v-select
            v-model="orderStatusId"
            item-value="id"
            item-text="name"
            outlined
            :items="statuses"
            :label="'Статус заказа'"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="orderItem.price"
            :label="'Цена заказа'"
            v-mask="'##########'"
            outlined
            clearable
            required
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="orderItem.color"
            :label="'Цвет автомобиля'"
            outlined
            clearable
            required
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            class="pa-0 ma-0"
            x-large
            v-model="orderItem.isRightWheel"
            :label="'Правый руль'"
          />
        </v-col> 
        <v-col cols="4">
          <v-checkbox
            class="pa-0 ma-0"
            v-model="orderItem.isFullTank"
            :label="'Полный бак'"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            class="pa-0 ma-0"
            v-model="orderItem.isNeedChildChair"
            :label="'Детское кресло'"
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
</template>

<script>

export default {
  name: 'EditOrderForm',
  props: {
    orderItem: {
      type: Object,
      required: true
    },
    statuses: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      orderStatusId: null
    }
  },
  created () {
    this.orderStatusId = this.orderItem.orderStatusId;
  },
  computed: {
    title: function () {
      return 'Редактировать заказ ' + this.orderItem.id;
    }
  },
  methods: {
    submit () {
      this.statuses.forEach((element) => {
        if (element.id === this.orderStatusId) {
          this.orderItem.orderStatusId = element;
        }
      })
      this.$emit('success', this.orderItem);
    }
  }
}
</script>
