<template>
  <v-content>
    <v-layout align-center justify-center>
      <div>
        <v-subheader>{{ "表示するレスがありません。レスを送ってみましょう！" }}</v-subheader>
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
  name: "empty-state",
  data: () => ({})
};
</script>
