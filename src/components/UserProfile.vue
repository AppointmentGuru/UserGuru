<template>
<div class='card-container'>
<v-card v-if='user' class='grey lighten-4 '>
   <!-- img="https://vuetifyjs.com/public/doc-images/lists/alison.jpeg" height="300px" -->
  <v-card-row height="0px" >

    <div style="text-align:center;">
    <v-avatar style='padding-left:40px;'>
      <img
        v-if='user.profile.profile_picture'
        style='width:150px;height:150px;'
        :src="user.profile.profile_picture" />
      <img v-else
        style='width:150px;height:150px;border:solid 1px;'
        src='http://rebuildingshatteredlives.org/inc/img/defaultavatar.jpg' />
    </v-avatar >
    </div>

  </v-card-row>
  <v-list two-line >
    <v-list-item>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            <h5 style='padding-left: 200px;'>{{ user.first_name }} {{ user.last_name}}</h5></v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list-item>
    <v-divider></v-divider>
    <v-list-item>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon class="indigo--text">phone</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <span v-if='!editmode' >
            {{ user.phone_number }}
            </span>
            <v-text-field
              v-else
              name="user-phone"
              label="phone number"
              hint='Make sure to keep the country code. e.g.: +27831234567'
              v-model='user.phone_number' >
            </v-text-field>

          </v-list-tile-title>
          <v-list-tile-sub-title>Mobile</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>chat</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-item>
    <v-divider inset></v-divider>
    <v-list-item>
      <v-list-tile>
        <v-list-tile-action>
          <v-icon class="indigo--text">mail</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>
            <span v-if='!editmode' >
            {{ user.email }}
            </span>
            <v-text-field
              v-if='editmode'
              name="user-email"
              label="email address"
              v-model='user.email' >
            </v-text-field>
          </v-list-tile-title>
          <v-list-tile-sub-title>E-mail</v-list-tile-sub-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-icon>send</v-icon>
        </v-list-tile-action>
      </v-list-tile>
    </v-list-item>
  </v-list>

  <v-card-row actions>
    <v-btn
      v-if='!editmode'
      @click.native.stop='editmode=true' flat >
      <v-icon small >edit</v-icon>
      Edit details</v-btn>

    <v-btn v-if='editmode' @click.native.stop='editmode=false' flat >
      Cancel</v-btn>
    <v-btn v-if='editmode' @click.native.stop='editmode=false' primary >
      Save</v-btn>
  </v-card-row>
</v-card>
</div>
</template>
<script type="text/javascript">
export default {
  name: 'UserProfile',
  props: {
    user: { type: Object, default: () => { return {} } }
  },
  data () {
    return {
      editmode: false,
      // todo: prop:
      phoneNumberActions: ['Call', 'Message']
    }
  }
}
</script>
<style scoped >
.card-container { margin-top: 60px; }
</style>
