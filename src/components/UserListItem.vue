<template>
<v-list-item
  @click='$emit("userlistitem:clicked", user)'
  :key="user.id">
  <v-list-tile avatar v-if='user.profile' >
    <v-list-tile-avatar>
      <img v-bind:src="user.profile.profile_picture" />
    </v-list-tile-avatar>
    <v-list-tile-content>
      <v-list-tile-title v-if='' v-html="userTitle(user)" ></v-list-tile-title>
      <v-list-tile-sub-title v-html="userSubTitle(user)" ></v-list-tile-sub-title>
    </v-list-tile-content>
    <v-list-tile-action >
      <v-btn icon ripple>
        <v-icon class='grey--text text--darken-2' >{{ icon }}</v-icon>
      </v-btn>
    </v-list-tile-action>
  </v-list-tile>
</v-list-item>
</template>
<script type="text/javascript">
export default {
  name: 'UserListItem',
  props: {
    user: { type: Object, default: () => { return {} } },
    icon: { type: String, default: 'keyboard_arrow_right' }
  },
  methods: {
    userTitle (user) {
      let title = user.profile.practice_name
      if (!title) {
        title = `${user.first_name} ${user.last_name}`
      }
      return title
    },
    userSubTitle (user) {
      let fullName = `${user.first_name} ${user.last_name}`
      let address = ''
      let profession = ''
      if (user.profile) {
        // fullname is title if no practice name, so don't repeat:
        if (!user.profile.practice_name) {
          fullName = ''
        }

        if (user.profile.profession) {
          profession = user.profile.profession.name
        }
        if (user.profile.services && user.profile.services.length > 0) {
          address = user.profile.services[0].address.address
        }
      }

      return `${fullName}. ${profession}.<br/> ${address}`
    }
  }
}
</script>
