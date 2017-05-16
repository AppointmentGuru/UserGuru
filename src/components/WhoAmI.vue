<template>
<v-card class="grey lighten-4" >
  <v-card-text>
    <v-container fluid>
      <v-row row>
        <v-col xs11>
          <v-text-field
            name="id-phonenumber"
            label="Phone number"
            hint="Make sure to add the country code. e.g.: +27831234567"
            v-model="user.phoneNumber"
            @input='checkPhoneLength' >
          </v-text-field>
        </v-col>
        <v-col xs1 >
          <v-progress-circular
            v-show='identifyRequest.loading'
            style='margin-top:30px;'
            indeterminate class="primary--text" :width="3" :size='15' >
            </v-progress-circular>
        </v-col>
      </v-row>
    </v-container>

    <!-- pls login -->
    <transition-group name='fade' >
    <v-container
      v-if='nextStep === "token-auth"'
      fluid key='token-auth'>
      <v-progress-circular
        v-show='requestIsLoading(loginRequest)'
        indeterminate class="primary--text pull-right" />
      </v-progress-circular >
      <h5>{{loginHeader}}</h5>
      <v-row row >
        <v-col xs12>
          <v-text-field
            type="password"
            name="token-password"
            label="Password"
            v-model="user.password" >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    </transition-group>

    <!-- pls register -->
    <transition-group name='fade' >
    <v-container
      v-if='nextStep === "auth-register"'
      fluid key='auth-register'>

      <v-progress-circular
        v-show='requestIsLoading(registerRequest)'
        indeterminate class="primary--text pull-right" />
      </v-progress-circular >
      <h5>{{createAccountHeader}}</h5>

      <v-row row >
        <v-col xs12 >
          <v-text-field
            name="reg-fullName"
            label="full name"
            hint='Your first and last names please'
            v-model="user.fullName" >
          </v-text-field>
        </v-col>
      </v-row><v-row row >
        <v-col xs12 >
          <v-text-field
            name="reg-email"
            label="e-mail address"
            v-model="user.email" >
          </v-text-field>
        </v-col>
      </v-row><v-row row >
        <v-col xs12 >
          <v-text-field
            name="reg-phone"
            label="pick a password"
            min='8'
            hint='You can make your password stronger by including numbers(1234) and special characters(!@#$)'
            type='password'
            :rules="rules.password"
            v-model="user.password" >
          </v-text-field>
        </v-col>
      </v-row>
    </v-container>
    </transition-group>

    <transition-group name='fade' >
      <v-container
        v-show='nextStep === "auth-otp" || showOTP === true'
        fluid key='auth-otp' >
        <h5>{{otpHeader}}</h5>
        <v-row row >
          <v-col xs12 >
            <v-text-field
              name="otp"
              label="OTP"
              hint='We sent a one-time pin to the number you entered above. Please check SMSes on your phone and enter that code above'
              @input='checkOTPLength' v-model='user.otp' >
            </v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </transition-group>

  </v-card-text>

  <v-card-row actions>
    <v-btn @click.native.stop="login" primary >Next</v-btn>
  </v-card-row>
</v-card>
</template>

<script>
const ID_REQUEST = 'auth-identify-request'
const LOGIN_REQUEST = 'auth-login-request'
const OTP_AUTH_REQUEST = 'auth-validate-otp'
const SET_PASSWORD_REQUEST = 'auth-set-password'
const REGISTER_REQUEST = 'auth-register'

import Mixins from 'vuex-requests/src/store/mixins'

export default {
  name: 'hello',
  mixins: [Mixins],
  props: {
    initialData: { type: Object, default: () => { return {} } },
    otpHeader: { type: String, default: 'Please enter your OTP' },
    createPasswordHeader: { type: String, default: 'Please choose a password' },
    createAccountHeader: { type: String, default: 'Tell us a little about yourself' },
    loginHeader: { type: String, default: 'Please login' }
  },
  data () {
    let vm = this
    return {
      showOTP: false,
      showSetPassword: false,
      user: {
        phoneNumber: '+27',
        password: ''
      },
      rules: {
        password: [
          () => {
            if (vm.user.password.length < 8) {
              return 'Password should be at least 8 characters'
            } else {
              return true
            }
          }
        ]
      }
    }
  },
  watch: {
    identifyRequest () {
      console.log('id request changed')
    },
    loginRequestStatus () {
      if (this.loginRequestStatus === 200) {
        let token = this.loginRequest.result.data.token
        console.log(token)
        this.setToken(token)
        this.$emit('whoami:loggedin', token)
      }
    },
    validateOtpRequestStatus () {
      if (this.validateOtpRequestStatus === 200) {
        let token = this.validateOtpRequest.result.data.token
        this.setToken(token)
        this.showSetPassword = true
      }
    },
    setPasswordRequestStatus () {
      if (this.setPasswordRequestStatus === 200) {
        this.$emit('whoami:loggedin')
      }
    },
    registerRequestStatus () {
      if (this.registerRequestStatus === 200) {
        let token = this.registerRequest.result.data.token
        this.setToken(token)
        this.$emit('whoami:registered', token)
      }
    }
  },
  computed: {
    requests () {
      this.$requeststore.requests.requests
    },
    identifyRequest () {
      return this.$requeststore.getters.getRequestById('auth-identify-request')
    },
    loginRequest () {
      return this.$requeststore.getters.getRequestById(LOGIN_REQUEST)
    },
    loginRequestStatus () {
      let r = this.loginRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    validateOtpRequest () {
      return this.$requeststore.getters.getRequestById(OTP_AUTH_REQUEST)
    },
    validateOtpRequestStatus () {
      let r = this.validateOtpRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    setPasswordRequest () {
      return this.$requeststore.getters.getRequestById(SET_PASSWORD_REQUEST)
    },
    setPasswordRequestStatus () {
      let r = this.setPasswordRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    registerRequest () {
      return this.$requeststore.getters.getRequestById(REGISTER_REQUEST)
    },
    registerRequestStatus () {
      let r = this.registerRequest
      if (r === -1) { return 0 } else { return r.status }
    },
    nextStep () {
      if (this.identifyRequest !== -1) {
        if (this.identifyRequest.result && this.identifyRequest.result.data) {
          return this.identifyRequest.result.data.type
        }
      }
      return null
    }
  },
  methods: {
    getId () {
      let options = {
        id: ID_REQUEST,
        params: {phone_number: this.user.phoneNumber}
      }
      this.$appointmentguru
        .endpoint('auth-identify', options)
          // .then((result) => { this.getIdId = result })
    },
    checkPhoneLength () {
      if (this.user.phoneNumber.length === 12) {
        this.getId()
      }
    },
    checkOTPLength () {
      if (this.user.otp.length === 4) {
        this.validateOTP()
      }
    },
    login () {
      let options = {
        id: LOGIN_REQUEST,
        data: {
          phone_number: this.user.phoneNumber,
          password: this.user.password
        }
      }
      this.$appointmentguru
        .endpoint('auth-login-phone', options)
    },
    validateOTP () {
      let options = {
        id: OTP_AUTH_REQUEST,
        data: {
          phone_number: this.user.phoneNumber,
          otp: this.user.otp
        }
      }
      this.$appointmentguru.endpoint('auth-validate-otp', options)
    },
    setToken (token) {
      let data = [
        this.$appointmentguru.name,
        'Authorization',
        `token ${token}`
      ]
      this.$requeststore.commit('BACKEND_CONFIG_SET_HEADER', data)
    },
    performRegistration () {
      let options = {
        id: REGISTER_REQUEST,
        data: {
          phone_number: this.user.phoneNumber,
          password1: this.user.password,
          password2: this.user.password,
          full_name: this.user.fullName,
          email: this.user.email,
          is_practitioner: true
        }
      }
      this.$appointmentguru
        .endpoint('auth-register', options)
    },
    setPassword () {
      let options = {
        id: SET_PASSWORD_REQUEST,
        data: {
          password: this.user.password
        }
      }
      this.$appointmentguru
        .endpoint('auth-set-password', options)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.flat{margin:0px;}
.fade-enter-active, .fade-leave-active {
  transition: opacity .7s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
</style>
