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
import { ref } from 'vue';
import { mapState } from 'vuex'

export default {
  props: {
    options: Array,
  },
  setup(props) {

    return {
      selectedOption: ref(null),
    };
  },
  mounted () {
    this.selectedOption = this.statusSearch
  },
  computed: {
    ...mapState('RickAndMorty', ['statusSearch'])
  },
  watch: {
    selectedOption (newValue) {
      this.$emit('value', newValue)
    }
  }
};
</script>