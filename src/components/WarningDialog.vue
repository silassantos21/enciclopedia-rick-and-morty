<template>
  <div class="dialog-overlay" v-if="visible">
    <div class="dialog">
      <div class="dialog-header">
        <h2>{{ title }}</h2>
        <div>
          <i class="material-icons" @click="closeDialog">close</i>
        </div>
      </div>
      <div class="dialog-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean,
    title: String,
  },
  methods: {
    closeDialog() {
      this.$emit('closeDialog', false);
    },
  },
};
</script>

<style scoped>
  @import "@/assets/styles.scss";
</style>