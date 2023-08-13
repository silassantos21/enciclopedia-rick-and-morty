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
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    visible: Boolean,
    title: String,
  },
  setup(props, { emit }) {
    const closeDialog = () => {
      emit('closeDialog', false);
    }

    return {
      closeDialog
    }
  }
});
</script>

<style scoped>
  @import "@/assets/styles.scss";
</style>