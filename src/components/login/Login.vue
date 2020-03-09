<template>
  <div class="text-center">
    <v-bottom-sheet v-model="sheet" persistent>
      <template v-slot:activator="{ on }">
        <v-btn color="green" dark v-on="on">Open Persistent</v-btn>
      </template>
      <v-sheet class="text-center" height="200px">
        <v-btn class="mt-6" flat color="error" @click="sheet = !sheet">close</v-btn>
        <div class="py-3">This is a bottom sheet using the persistent prop</div>
      </v-sheet>
    </v-bottom-sheet>
  </div>
</template>

<script>
export default {
  name: "login",
  data: () => ({
    sheet: false
  })
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
