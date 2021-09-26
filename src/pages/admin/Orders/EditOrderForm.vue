<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
      <v-row>
        <v-col cols="12">
          <!-- <v-textarea
            v-model="form.comment"
            :label="label"
            outlined
            :error-messages="form.errors.get('comment')"
            clearable
            counter
            required
          /> -->
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
import { mapGetters } from "vuex";

export default {
  name: 'EditOrderForm',
  props: {
    orderId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      order: null,
      ...mapGetters("entities",
      [
        "getOrders"
      ])
    }
  },
  computed: {
    title: function () {
      return 'Редактировать заказ ' + this.orderId
    }
  },
  created() {
    const orders = this.getOrders;
      this.order = orders.filter(item => item.id === this.orderId);
    // this.getOrder();
  },
  methods: {
    submit () {
      this.$toast.success(this.$t('saved'))
      this.$emit('success')
    },
    getOrder () {
      console.log(this.getOrders, this.orderId, this.order);
      const orders = this.getOrders;
      this.order = orders.filter(item => item.id === this.orderId);
      // const filteredOrders = this.orders.filter(item => item.rateId);
      // this.order = this.getOrders.filter(item => item.id === this.orderId);
      console.log(this.orderId, this.order);
    }
  }
}
</script>
