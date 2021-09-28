import Vue from 'vue'
import moment from 'moment'

Vue.use(require('vue-moment'))
// Убрать сообщение в консоли если дата null
Vue.filter('moment', function (value, format) {
  if (value === null || value === undefined || format === undefined) {
    return ''
  }
  if (format === 'from') {
    return moment(value).fromNow()
  }
  return moment(value).format(format)
})
