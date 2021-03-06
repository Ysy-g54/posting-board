<template>
  <div>
    <v-container>
      <v-flex>
        <v-btn large color="primary" @click="registerThread" :loading="isBtnLoading">スレッドを作成する</v-btn>
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
            :items="getCategories"
            chips
            multiple
            outlined
            label="カテゴリ"
          ></v-select>
          <v-textarea v-model="description" placeholder="説明(※更新はできません...。)" outlined></v-textarea>
        </v-flex>
      </v-layout>
    </v-container>
    <SignUpGuideDialog ref="SignUpGuideDialog" :actionMessage="'スレッドを登録するなら'"></SignUpGuideDialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import threadService from "@/service/thread/thread-service.ts";
import { categories } from "@/constants.ts";
import { required } from "vuelidate/lib/validators";
import SignUpGuideDialog from "@/components/guide/SignUpGuideDialog";
export default {
  data: () => ({
    isBtnLoading: false,
    title: "",
    selectedCategories: [],
    description: ""
  }),
  validations: {
    title: {
      required
    }
  },
  methods: {
    async registerThread() {
      if (!this.getLoginUser.isAuthState) {
        this.$refs.SignUpGuideDialog.openDialog();
        return;
      }
      this.$v.$touch();
      if (this.$v.$invalid) {
        return;
      }

      this.isBtnLoading = true;
      let thread = {
        title: this.title,
        categories: this.selectedCategories,
        description: this.description,
        insertUserId: this.getLoginUser.uid,
        insertDateTime: new Date(Date.now())
      };
      await threadService.register(thread).catch(() => {
        this.isBtnLoading = false;
        if (!this.isXsDisplay) {
          this.$emit(
            "on-register-response-click",
            "スレッドの作成に失敗しました。接続確認をし、再度お試しください。"
          );
        }
      });
      this.title = "";
      this.selectedCategories = [];
      this.description = "";
      this.$v.$reset();
      this.isBtnLoading = false;
      if (this.isXsDisplay) {
        this.$router.push({
          name: "thread",
          params: { snackbarMessage: "スレッドを作成しました。" }
        });
      } else {
        await this.$emit(
          "on-register-thread-click",
          "スレッドを作成しました。"
        );
      }
      this.gaEvent(`uid ${this.getLoginUser.uid} registered thread`);
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
    getCategories() {
      return categories;
    },
    isXsDisplay() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    ...mapGetters(["getLoginUser"])
  },
  created() {},
  components: {
    SignUpGuideDialog
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  text-align: -webkit-right;
}
</style>
