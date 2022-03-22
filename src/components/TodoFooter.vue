<template>
  <v-container>
    <v-row class="text-center">
    <div class="clearAllContainer">
      <span class="clearAllBtn" @click="clearTodo">Clear All</span>
    </div>
    </v-row>
  </v-container>
</template>

<script>
export default {
  methods: {
    clearTodo() {
      this.$emit("removeAll");
    },
  },
};
</script>

<style scoped>
.clearAllContainer {
  width: 8.5rem;
  height: 50px;
  line-height: 50px;
  background-color: white;
  border-radius: 5px;
  margin: 0 auto;
}
.clearAllBtn {
  color: #e20303;
  display: block;
}
</style>
