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
            v-model="order.orderStatusId"
            item-value="id"
            item-text="name"
            outlined
            :items="statuses"
            :label="'Статус заказа'"
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="order.price"
            :label="'Цена заказа'"
            v-mask="'##########'"
            outlined
            clearable
            required
          />
        </v-col>
        <v-col cols="4">
          <v-text-field
            v-model="order.color"
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
            v-model="order.isRightWheel"
            :label="'Правый руль'"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            class="pa-0 ma-0"
            v-model="order.isFullTank"
            :label="'Полный бак'"
          />
        </v-col>
        <v-col cols="4">
          <v-checkbox
            class="pa-0 ma-0"
            v-model="order.isNeedChildChair"
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
      order: {
        orderStatusId: null,
        price: null,
        color: null,
        isRightWheel: null,
        isFullTank: null,
        isNeedChildChair: null
      }
    }
  },
  created () {
    this.order = { ...this.orderItem };
  },
  computed: {
    title () {
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
      this.orderItem.price = this.order.price
      this.orderItem.color = this.order.color
      this.orderItem.isRightWheel = this.order.isRightWheel
      this.orderItem.isFullTank = this.order.isFullTank
      this.orderItem.isNeedChildChair = this.order.isNeedChildChair
      this.$emit('success', this.orderItem);
    }
  }
}
</script>
