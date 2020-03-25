<template>
  <div>
    <v-container>
      <v-flex>
        <v-btn large color="primary" @click="registerThread">スレッドを作成する</v-btn>
      </v-flex>
    </v-container>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex md8 refs="thread">
          <v-text-field
            v-model="title"
            placeholder="タイトル(※更新・削除はできません。)"
            outlined
            clearable
            required
            :error-messages="getTitleError"
          ></v-text-field>
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
          <v-textarea v-model="description" placeholder="説明(※更新・削除はできません。)" outlined></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import threadService from "@/service/thread/thread-service";
import { categories } from "@/constants";
import { required } from "vuelidate/lib/validators";
export default {
  name: "thread-registration",
  data: () => ({
    title: "",
    selectedCategories: [],
    description: "",
    categories: categories
  }),
  validations: {
    title: {
      required
    }
  },
  methods: {
    ...mapGetters(["getLoginUser"]),
    async registerThread() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let thread = {
        title: this.title,
        categories: this.selectedCategories,
        description: this.description,
        insertUserId: this.getLoginUser().uid,
        insertDateTime: new Date(Date.now())
      };
      await threadService.register(thread);
      this.title = "";
      this.selectedCategories = [];
      this.description = "";
      this.$v.$reset();
      await this.$emit("on-register-thread-click", "スレッドを作成しました。");
    }
  },
  computed: {
    getTitleError() {
      if (this.$v.title.$dirty && !this.$v.title.required) {
        return "タイトルは必須入力です。";
      } else {
        return [];
      }
    }
  },
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
