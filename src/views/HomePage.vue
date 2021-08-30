<template>
  <div class="homepage__container">
    <div class="form__container">
      <header class="homepage__header">
        <img 
          class="header__img" 
          :src="require('@/assets/logo.svg')" 
          alt="" 
        />
        <h1 class="header_title">Need for drive</h1>
      </header>
      <el-card class="homepage__card">
        <el-form label-position="top">
          <p class="form__title">Вход</p>
          <el-form-item label="Почта">
            <el-input 
              v-model="form.email" 
              size="medium" 
            />
          </el-form-item>
          <el-form-item label="Пароль">
            <el-input 
              v-model="form.password"
              size="medium"
            />
          </el-form-item>
          <div class="form__footer">
            <el-link 
              class="form__footer_anchor" 
              type="primary"
            >
              Запросить доступ
            </el-link>
            <el-button 
              size="small"
              @click="validation"
            >
              Войти
            </el-button>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script>

export default {
  name: 'HomePage',
  data () {
    return {
      wrongEmail: false,
      wrongPass: false,
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    validation () {
      if (this.form.email != 'admin@m.ru') {
        this.wrongEmail = true
      }
      if (this.form.password != 'password') {
        this.wrongPass = true
      }
    }
  }
}
</script>
