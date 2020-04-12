<template>
  <v-content>
    <v-layout align-center justify-center>
      <div>
        <v-subheader>{{ message }}</v-subheader>
      </div>
    </v-layout>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <div>
          <img src="@/assets/empty-state.png" width="250" height="250" />
        </div>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    message: { type: String, required: true }
  }
};
</script>
