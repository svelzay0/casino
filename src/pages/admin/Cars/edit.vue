<template>
  <car-form :model-id="id" />
</template>

<script>
import CarForm from './CarForm'

export default {
  components: {
    CarForm
  },
  props: {
    id: {
      type: String,
      required: true
    }
  }
}
</script>
