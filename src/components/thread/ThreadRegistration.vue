<template>
  <div>
    <v-container>
      <v-flex md2>
        <v-btn large color="primary" @click="registerThread">スレッドを登録</v-btn>
      </v-flex>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex md8>
          <v-text-field placeholder="タイトル" outlined clearable></v-text-field>
          <v-textarea placeholder="説明" outlined></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "thread-registration",
  data: () => ({}),
  methods: {
    registerThread() {
      this.$emit("on-register-thread-click", "スレッドを登録しました。");
    }
  },
  computed: {},
  created() {},
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: -webkit-right;
}
</style>
