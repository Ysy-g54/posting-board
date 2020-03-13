<template>
  <div>
    <v-container>
      <v-flex md2>
        <v-btn large color="primary" @click="registerThread">スレッドを作成する</v-btn>
      </v-flex>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex md8>
          <v-text-field v-model="title" placeholder="タイトル" outlined clearable></v-text-field>
          <v-select
            v-model="selectedCategories"
            item-text="categoryNm"
            item-value="categoryId"
            :items="categories"
            chips
            multiple
            outlined
            label="カテゴリ"
          ></v-select>
          <v-textarea v-model="description" placeholder="説明" outlined></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import threadService from "@/service/thread-service";
import { categories } from "@/constants";
export default {
  name: "thread-registration",
  data: () => ({
    title: "",
    selectedCategories: [],
    description: "",
    categories: categories
  }),
  methods: {
    async registerThread() {
      let thread = {
        title: this.title,
        categories: this.selectedCategories,
        description: this.description,
        insertDateTime: firebase.firestore.FieldValue.serverTimestamp()
      };
      await threadService.register(thread);
      this.title = "";
      this.selectedCategories = [];
      this.description = "";
      await this.$emit("on-register-thread-click", "スレッドを作成しました。");
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
