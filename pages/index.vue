<template>
  <v-container fluid>
    <v-row no-gutters>
      <v-col>
        <v-card height="600">
          <v-card-title class="alt-title">Welcome Home, {{ user.name || 'Guest'}}</v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => ({}),
  components: {},
  middleware: 'auth',
  computed: {
    ...mapState({
      user: state => state.auth.user
    })
  }
}
</script>
<style lang="scss" scoped>
.alt-title {
  font-family: 'Poppins', sans-serif;
}
</style>