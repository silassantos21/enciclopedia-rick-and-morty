<template>
  <div>
    <label v-for="option in options" :key="option.value">
      <input
        type="radio"
        :value="option.value"
        v-model="selectedOption"
      />
      {{ option.label }}
    </label>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  props: {
    options: Array,
  },
  setup(props, { emit }) {
    const store = useStore();
    const statusSearch = store.state.RickAndMorty.statusSearch
    const selectedOption = ref(null);

    onMounted(() => {
      selectedOption.value = statusSearch
    });

    watch(selectedOption, (newValue) => {
      emit('value', newValue);
    });

    return {
      selectedOption,
    };
  },
});
</script>