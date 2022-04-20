<template>
<v-container>
  <v-row justify="center">  
    <h1> {{ msg }} TODO it!</h1>   
  </v-row>
</v-container>
</template>

<script>
export default {
  props:['msg']
}
</script>

<style scoped>
  h1 {
    color: #2F3B52;
    font-weight: 900;
    margin: 2.5rem 0 1.5rem;
  }
</style>
