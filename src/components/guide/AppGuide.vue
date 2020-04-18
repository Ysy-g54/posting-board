<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" sm="6">
        <v-img :src="require('../../assets/message-sent.png')" />
      </v-col>
      <v-col cols="12" sm="6">
        <div class="display-1 pb-5">誰かと色々なことについて話そう。</div>
        <div v-if="showDescription">
          <div class="headline pb-12">
            普段話している人や、話したことのない誰かと気軽にお話するためのアプリです。
            <br />様々な話をすることで、新しい知見を得られたり、発散して、少しでもポジティブに生活できるようになれれば幸いです。
            <v-btn color="primary" :to="'/thread'">{{ '実際の画面を見たい場合はこちら' }}</v-btn>
          </div>
          <div class="headline">
            このアプリは、転職活動の中の「5chみたいなアプリを作成する」課題から生まれました。
            <br />課題自体は終わりましたが、引き続きこのアプリを成長させています。
          </div>
        </div>
        <v-btn color="accent" :href="getContactForm">{{ 'コンタクト' }}</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { contactForm } from "../../constants";
export default {
  data: () => ({}),
  methods: {},
  props: {
    showDescription: { type: Boolean, default: true }
  },
  computed: {
    getContactForm() {
      return contactForm;
    }
  },
  components: {}
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
