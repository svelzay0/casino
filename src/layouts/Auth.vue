<template>
  <v-app>
    <v-container
      id="auth-body"
      class="fill-height"
      fluid
    >
      <v-row
        align="center"
        justify="center"
      >
        <v-col
          cols="auto"
          class="ma-0 pa-0"
        >
          <v-img
            contain
            class="mx-auto"
            max-height="120"
            max-width="300"
            :src="require('@/assets/logo.svg')"
            :alt="'Need-for-drive'"
          />
        </v-col>
        <v-col
          cols="auto"
          class="ma-0 pa-0"
        >
          <v-card-title class="headline">
            <span class="auth__logo_text">Need for drive</span>
          </v-card-title>
        </v-col>
        <v-col
          cols="12"
          class="mb-1 pb-1"
        >
          <v-spacer />
        </v-col>
        <v-card
          min-width="400"
          class="elevation-12"
        >
          <v-form
            v-model="valid"
            ref="form"
            lazy-validation
            @submit.prevent="submitForm"
          >
            <v-card-title class="justify-center pb-11">
              <span class="auth__form_login">Вход</span>
            </v-card-title>
            <v-card-text class="pb-0 mb-0">
              <span class="auth__form_tip">Почта</span>
              <v-text-field
                v-model="form.email"
                class="pt-2"
                name="email"
                :rules="emailRules"
                :type="'text'"
                required
                outlined
                dense
              />
              <span class="auth__form_tip">Пароль</span>
              <v-text-field
                v-model="form.password"
                class="pt-2"
                id="password"
                :rules="passwordRules"
                name="password"
                type="password"
                required
                outlined
                dense
              />
            </v-card-text>
            <v-card-actions class="pa-4 pt-0 mt-0">
              <span
                class="auth__form_link_text"
                @click="clearToken"
              >
                Запросить доступ
              </span>
              <v-spacer />
              <v-btn
                type="submit"
                color="primary"
                depressed class="text-transform-none"
              >
                <span class="auth__form_btn_text pa-1">Войти</span>
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
data: () => ({
    form: {
      email: "",
      password: "",
    },
    valid: true,
    passwordRules: [
      v => !!v || 'Пожалуйста, введите пароль',
      v => v.length >= 8 || 'Необходимо минимум 8 символов'
    ],
    emailRules: [
      v => !!v || 'Пожалуйста, введите email'
    ],
  }),
  methods: {
    ...mapActions("user", ["loginUser"]),
    submitForm() {
      const valid = this.$refs.form.validate();
      this.login(valid);
    },
    async login (valid) {
      if (!valid) {
        return;
      }
      const res = await this.loginUser(this.form);
      if (res) {
        this.$router.push("/admin");
      }
    },
    clearToken() {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
    },
  }
}
</script>