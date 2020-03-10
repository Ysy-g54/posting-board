<template>
  <CenterTemplate>
    <div>
      <v-form onsubmit="return false;">
        <v-text-field label="ログインID" hide-details="auto"></v-text-field>
        <v-text-field label="パスワード"></v-text-field>
        <v-col class="text-center" cols="12" sm="4">
          <div class="my-2">
            <v-btn large color="primary" @click="onLoginClick">ログイン</v-btn>
          </div>
        </v-col>
      </v-form>
    </div>
  </CenterTemplate>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    sheet: false
  }),
  methods: {
    onLoginClick() {
      this.$router.push({
        name: "hello-world"
      });
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
