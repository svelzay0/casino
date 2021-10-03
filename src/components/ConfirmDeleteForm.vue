<template>
  <v-card>
    <v-card-text>
      <v-card-title>
        <span class="headline">{{ title }}</span>
      </v-card-title>
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
        Да
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'ConfirmDeleteForm',
  props: {
    entity: {
      type: Object,
      required: true
    }
  },
  computed: {
    title () {
      return 'Удалить сущность из таблицы ' + this.entity.entity + "?";
    }
  },
  methods: {
    submit () {
      this.$emit('successDelete', this.entity);
    }
  }
}
</script>
