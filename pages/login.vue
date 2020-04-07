<template >
  <v-container fluid class="body" style="height:100%">
    <v-row>
      <v-col>
        <v-card class="mx-auto mt-12" min-height="500" max-width="600" light>
          <v-container fluid>
            <v-row no-gutters>
              <v-col class="d-flex justify-center text-center" md="8" offset-md="2">
                <v-form @submit.prevent="login" id="login-form" method="post">
                  <h1 class="display-1 mt-4">WebSync</h1>
                  <h4 class="subtitle-1 mt-2">Sign in</h4>
                  <v-text-field
                    prepend-icon="mdi-email"
                    label="Email ID"
                    placeholder=" "
                    name="email"
                    type="email"
                    v-model="email"
                    autocomplete="off"
                    required
                  ></v-text-field>
                  <v-text-field
                    id="password"
                    prepend-icon="mdi-lock"
                    v-model="password"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    label="Password"
                    name="password"
                    placeholder=" "
                    hint="At least 8 characters"
                    autocomplete="off"
                    @click:append="show = !show"
                  ></v-text-field>
                  {{ message }}
                  <div class="d-flex justify-center">
                    <v-btn type="submit" class="mt-4 nubutton">LogIn</v-btn>
                  </div>

                  <br />
                  <hr />
                  <br />
                  <p class="text-center grey--text subtitle-2">LOG IN VIA</p>

                  <div>
                    <v-btn
                      color="blue"
                      class="white--text mr-1"
                      @click.prevent="socialLogin('facebook')"
                    >
                      facebook
                      <v-icon right>mdi-facebook</v-icon>
                    </v-btn>

                    <v-btn
                      color="red"
                      class="white--text ml-1"
                      @click.prevent="socialLogin('google')"
                    >
                      google
                      <v-icon right>mdi-google</v-icon>
                    </v-btn>
                  </div>
                </v-form>
              </v-col>
            </v-row>

            <br />
            <hr />
            <br />
            <v-row justify="space-around">
              <nuxt-link to="#" class="font-weight-light text-xs-center">Create an account</nuxt-link>

              <nuxt-link to="#" class="font-weight-light text-xs-center">Forgot Password?</nuxt-link>
            </v-row>
            <br />
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  layout: 'fullscreen',
  data() {
    return {
      email: '',
      password: '',
      show: false,
      rules: {
        required: v => !!v || 'Required.',
        min: v => v.length >= 8 || 'Min 8 characters',
        emailValid: v => /.+@.+/.test(v) || 'E-mail must be valid'
      },
      checkbox: false,

      message: ''
    }
  },
  methods: {
    async login() {
      await this.$auth.loginWith('local', {
        data: {
          email: this.email,
          password: this.password
        }
      })
      this.checkLogin()
    },
    socialLogin(service) {
      window.location.href = 'https://api.mekkaniko.com/api/login/' + service
    },
    checkLogin() {
      console.log(this.$auth.user)
      if (this.$auth.loggedIn) {
        this.dialog = false
      } else {
        this.message = 'Invalid email or password'
      }
    }
  }
}
</script>

<style lang="css" scoped>
.body {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

@-webkit-keyframes active {
  from {
    box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
      0 -6px 4px #fefefe, inset 0 0 10px 0px rgba(0, 0, 250, 0.6);
  }
  to {
    box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
      0 -6px 4px #fefefe, inset 0 0 3px 3px #cecfd1;
  }
}
@keyframes active {
  from {
    box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
      0 -6px 4px #fefefe, inset 0 0 10px 0px rgba(0, 0, 250, 0.6);
  }
  to {
    box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
      0 -6px 4px #fefefe, inset 0 0 3px 3px #cecfd1;
  }
}
*,
*:before,
*:after {
  box-sizing: border-box;
}

.nubutton,
[role='button'] {
  -webkit-appearance: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: -webkit-box;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  outline: none;
  cursor: pointer;
  width: 150px;
  height: 50px;
  background-image: -webkit-gradient(
    linear,
    left bottom,
    left top,
    from(#d8d9db),
    color-stop(80%, #fff),
    to(#fdfdfd)
  );
  background-image: linear-gradient(to top, #d8d9db 0%, #fff 80%, #fdfdfd 100%);
  border-radius: 30px;
  border: 1px solid #8f9092;
  box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
    0 -6px 4px #fefefe, inset 0 0 3px 0 #cecfd1;
  -webkit-transition: all 0.2s ease;
  transition: all 0.2s ease;
  font-family: 'Source Sans Pro', sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: #606060;
  text-shadow: 0 1px #fff;
}
.nubutton::-moz-focus-inner,
[role='button']::-moz-focus-inner {
  border: 0;
}
.nubutton > *,
[role='button'] > * {
  -webkit-transition: -webkit-transform 0.2s ease;
  transition: -webkit-transform 0.2s ease;
  transition: transform 0.2s ease;
  transition: transform 0.2s ease, -webkit-transform 0.2s ease;
}
.nubutton:hover:not([disabled]),
[role='button']:hover:not([disabled]) {
  box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
    0 -6px 4px #fefefe, inset 0 0 3px 3px #cecfd1;
}
.nubutton:hover:not([disabled]) > *,
[role='button']:hover:not([disabled]) > * {
  -webkit-transform: scale(0.975);
  transform: scale(0.975);
}
.nubutton:focus:not(:active),
[role='button']:focus:not(:active) {
  -webkit-animation: active 0.9s alternate infinite;
  animation: active 0.9s alternate infinite;
  outline: none;
}
.nubutton:active:not([disabled]),
[role='button']:active:not([disabled]) {
  box-shadow: 0 4px 3px 1px #fcfcfc, 0 6px 8px #d6d7d9, 0 -4px 4px #cecfd1,
    0 -6px 4px #fefefe, inset 0 0 5px 3px #999, inset 0 0 30px #aaa;
}
.nubutton:active:not([disabled]) > *,
[role='button']:active:not([disabled]) > * {
  -webkit-transform: scale(0.95);
  transform: scale(0.95);
}
.nubutton:disabled,
[role='button']:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.nubutton.icon,
[role='button'].icon {
  width: 50px;
}
.nubutton.icon svg,
[role='button'].icon svg {
  margin-top: 3px;
  width: 30px;
  height: 30px;
}
</style>