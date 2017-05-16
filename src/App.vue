<template>
  <div id="app" class="elevation-2">
    <!-- <div v-show='isLoggedIn' >
      <h5>Congrats. You're logged in!</h5>
    </div> -->
    <!-- <router-view class='page'
      @whoami:loggedin='loggedin' ></router-view> -->

    <who-am-i v-show='meRequest === -1' class='page'
      @whoami:loggedin='loggedin' ></who-am-i>

    <div v-show='meRequest !== -1' class='page' >
      <center><v-progress-circular
      v-show='meRequest.loading'
      style='margin-top:30px;'
      indeterminate class="primary--text" :width="3" :size='15' >
      </v-progress-circular></center>

      <v-list two-line>
        <v-subheader >User profile</v-subheader>
      </v-list>
      <user-profile :user='user' >
      </user-profile>

      <v-list two-line>
        <v-subheader >User list item</v-subheader>
        <user-list-item :user='user' >
        </user-list-item>
        <v-divider inset ></v-divider>
      </v-list>
    </div>
    <br/>
  </div>
</template>

<script>
const ME_REQUEST = 'me-request'

import Mixins from 'vuex-requests/src/store/mixins'
import UserProfile from '@/components/UserProfile'
import UserListItem from '@/components/UserListItem'
import WhoAmI from '@/components/WhoAmI'

export default {
  name: 'app',
  mixins: [Mixins],
  components: { UserProfile, WhoAmI, UserListItem },
  data () {
    return {
      isLoggedIn: false,
      token: ''
    }
  },
  computed: {
    meRequest () {
      return this.$requeststore.getters.getRequestById(ME_REQUEST)
    },
    user () {
      if (this.meRequest !== -1 && this.meRequest.status === 200) {
        return this.meRequest.result.data.results[0]
      }
      return null
    }
  },
  methods: {
    loggedin (data) {
      this.isLoggedIn = true
      this.getMe()
    },
    getMe () {
      this.loggedin = true
      this.$appointmentguru
        .resource('practitioner.me')
        .id(ME_REQUEST).list()
    }
  }
}
</script>
<style>
#app .page{
  margin-top:60px;
  max-width:600px;
  margin-left: auto;
  margin-right: auto;
}
.pull-right {
  float:right;
}
h5.title { margin: 20px 0px; }
</style>
