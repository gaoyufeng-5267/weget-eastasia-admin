<template>
  <div class="login-layout">
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="6" class="login-col">
        <a-divider> {{$t('labelMesseges.titleMsg')}} </a-divider>
        <a-alert  type="error" show-icon :message='$t("errorMessages.loginError")' v-if='errorVisable' closable :after-close="onErrorVisable"/>
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="login"
          :span="6"
        >
          <a-form-item>
            <a-input
              v-decorator="[
                'userName',
                {
                  rules: [
                    {
                      type: 'email',
                      message: $t('errorMessages.emailError'),
                    },
                    {
                      required: true,
                      message: $t('errorMessages.emailRequired'),
                    },
                  ],
                },
              ]"
              :placeholder='$t("labelMesseges.email")'
            >
              <a-icon
                slot="prefix"
                type="user"
                class="login-icon-color"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
                'password',
                {
                  rules: [
                    {
                      required: true,
                      message: $t('errorMessages.pwdRequired'),
                    },
                  ],
                },
              ]"
              type="password"
              :placeholder='$t("labelMesseges.password")'
            >
              <a-icon
                slot="prefix"
                type="lock"
                class="login-icon-color"
              />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a class="login-form-forgot" href=""> {{ $t("labelMesseges.passwordForget") }} </a>
            <a-button
              type="primary"
              html-type="submit"
              class="login-form-button"
            >
              {{ $t("labelMesseges.login") }}
            </a-button>
          </a-form-item>
        </a-form>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorVisable: false,
      userName: "",
      password: "",
      form: this.$form.createForm(this, { name: "normal_login" }),
    };
  },
  methods: {
    // ログイン
    login(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          this.$axios
            .post("/login", {
              userInfo: {
                userName: values.userName,
                userPwd: values.password,
              },
            })
            .then((response) => {
              if (response.data !== null) {
                this.$store.commit("setUserInfo", {
                  userInfo: {
                    userName: values.userName,
                    userPwd: values.password,
                  },
                });
                this.$router.push({
                  name: "homePage",
                });
              } else {
                this.errorVisable = true
                // alert("请检查密码和账户");
              }
            });
        }
      });
    },

    onErrorVisable(){
      this.errorVisable = false
    },
    // パスワードをリセット
    passwordReset() {},
  },
};
</script>
