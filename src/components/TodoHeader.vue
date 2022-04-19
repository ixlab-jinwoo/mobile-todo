<template>
<v-container>
  <v-row justify="center">  
    <h1> {{ msg }} </h1>
  </v-row>
</v-container>
</template>

<script>
export default {
  props: ["msg"],
};
</script>

<style scoped>
h1 {
  color: #2f3b52;
  font-weight: 900;
  margin: 2.5rem 0 1.5rem;
}
</style>
