<template>
  <div class="login-layout">
    <a-row type="flex" justify="center" align="middle">
      <a-col :span="6" class="login-col">
        <a-divider> {{$t('labelMesseges.titleMsg')}} </a-divider>
        <a-alert  type="error" show-icon :message='$t("errorMessages.loginError")' v-if='errorVisable' closable :after-close="onErrorVisable"/>
        <a-alert :message='mailDiffer? $t("errorMessages.emailRequired") : $t("infoMessages.emailSend")' closable type="info" show-icon v-if='mailRequired' :after-close="onMailRequired"/>
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
                'mail',
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
                    {
                      pattern: new RegExp(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/),
                      message: $t('errorMessages.pwdConfirm')
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
            <a class="login-form-forgot"  @click="mailForget"> {{ $t("labelMesseges.passwordForget") }} </a>
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
      mailDiffer: '',
      mailRequired: '',
      errorVisable: '',
      mail: "",
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
                mail: values.mail,
                userPwd: values.password,
              },
            })
            .then((response) => {
              if (response.data !== null) {
                this.$store.commit("setUserInfo", {
                  userInfo: {
                    mail: values.mail,
                    userPwd: values.password,
                  },
                });
                this.$router.push({
                  name: "homePage",
                });
              } else {
                this.errorVisable = true
              }
            });
        }
      });
    },
    // メールまたはパスワード違いチェック
    onErrorVisable(){
      this.errorVisable = false
    },
    // メール必須チェック
    onMailRequired(){
      this.mailRequired = false
    },
    // メール忘れた場合
    mailForget(){
      this.mailRequired = true;
      let errorInfo = this.form.getFieldError('mail');
      let mail = this.form.getFieldValue('mail');
      if(!errorInfo) {
          if (!mail){
          this.mailDiffer = true;
        } else {
          this.mailDiffer = false;
          this.$axios.post('/mailForget').then((response) => {
            if (response.data === '200'){
              console.log('メール忘れた')
            }
          })
        }
      } else {
        this.mailRequired = false;
      }
    },
  },
};
</script>
