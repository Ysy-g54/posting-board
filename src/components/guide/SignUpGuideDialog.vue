<template>
  <v-dialog v-model="showDialog" max-width="460">
    <v-card>
      <AppGuide :showDescription="false" />
      <v-card-text>
        {{
        actionMessage + "サインアップする必要があります！"
        }}
        <v-layout align-center justify-center>
          <v-btn color="primary" class="ma-2" dark :to="'/signup'">{{ 'サインアップする！' }}</v-btn>
        </v-layout>
        <v-layout>
          <div>既にサインアップしているなら</div>
        </v-layout>
        <v-layout align-center justify-center>
          <v-btn color="primary" class="ma-2" dark :to="'/login'">{{ 'ログインする！' }}</v-btn>
        </v-layout>
      </v-card-text>
      <v-card-actions>
        <v-btn color="secondary" text @click="closeDialog">{{ 'キャンセル' }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import AppGuide from "@/components/guide/AppGuide";
export default {
  data: () => ({
    showDialog: false
  }),
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    }
  },
  props: {
    actionMessage: { type: String, required: true }
  },
  watch: {},
  components: {
    AppGuide
  }
};
</script>
