<template>
  <car-form :model-id="$route.params.id" />
</template>

<script>
import CarForm from './CarForm'

export default {
  components: {
    CarForm
  }
}
</script>
