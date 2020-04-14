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
            placeholder="タイトル(※更新はできません...。)"
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
          <v-textarea v-model="description" placeholder="説明(※更新はできません...。)" outlined></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
    <v-dialog v-model="showDialog" max-width="290">
      <v-card>
        <v-card-text>
          {{
          "スレッドを登録するならサインアップする必要があります！"
          }}
          <v-layout align-center justify-center>
            <v-btn color="primary" class="ma-2" dark :to="{ name: 'signup' }">{{ 'サインアップする！' }}</v-btn>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" text @click="closeDialog">{{ 'キャンセル' }}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import threadService from "@/service/thread/thread-service";
import { categories } from "@/constants";
import { required } from "vuelidate/lib/validators";
export default {
  data: () => ({
    showDialog: false,
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
    async registerThread() {
      if (!this.getLoginUser.isAuthState) {
        this.showDialog = true;
        return;
      }
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      let thread = {
        title: this.title,
        categories: this.selectedCategories,
        description: this.description,
        insertUserId: this.getLoginUser.uid,
        insertDateTime: new Date(Date.now())
      };
      await threadService.register(thread);
      this.title = "";
      this.selectedCategories = [];
      this.description = "";
      this.$v.$reset();
      await this.$emit("on-register-thread-click", "スレッドを作成しました。");
    },
    closeDialog() {
      this.showDialog = false;
    }
  },
  computed: {
    getTitleError() {
      if (this.$v.title.$dirty && !this.$v.title.required) {
        return "タイトルは必須入力です。";
      } else {
        return [];
      }
    },
    ...mapGetters(["getLoginUser"])
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
