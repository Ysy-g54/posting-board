<template>
  <div>
    <GlobalHeader class="sticky"></GlobalHeader>
    <v-content>
      <router-view></router-view>
    </v-content>
  </div>
</template>

<script>
import GlobalHeader from "@/components/layout/GlobalHeader";
export default {
  data: () => ({}),
  methods: {},
  watch: {},
  created() {},
  components: {
    GlobalHeader
  }
};
</script>
<style scoped>
.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}
</style>
