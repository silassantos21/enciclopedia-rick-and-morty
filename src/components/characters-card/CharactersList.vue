<template>
  <div class="grid-width">
    <div class="container-character-list">
      <CharacterCardList v-for="detail in details" :key="detail.id" :details="detail" />
    </div>
    <div class="btn-container">
      <button :disabled="page === 1" @click="prevPage">Anterior</button>
      <button :disabled="page === totalPagesRequest" @click="nextPage">Próximo</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CharacterCardList from "@/components/characters-card/CharacterCardList.vue";
import { ref, defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  name: "CharactersList",
  components: {
    CharacterCardList
  },
  setup () {
    const store = useStore()

    const caracters = store.state.RickAndMorty.caracters
    const totalPagesRequest = store.state.RickAndMorty.totalPagesRequest
    const actualPageSearch = store.state.RickAndMorty.actualPageSearch

    const getPage = async (pageType) => {
      try {
        const response = await store.dispatch('RickAndMorty/getActualPage', pageType);
        details = response;
      } catch (error) {
        console.log(error);
      }
    }

    const nextPage = () => {
      store.dispatch('RickAndMorty/setActualPageSearch', (page.value + 1));
 			getPage('next');
    }
    const prevPage = () => {
      page < 2 ? page : store.dispatch('RickAndMorty/setActualPageSearch', (page.value - 1));
 			getPage('prev');
    }

    let details = computed({
      get: () => {
        return store.getters['RickAndMorty/caracters'];
      },
      set: (newValue) => {
        store.dispatch('RickAndMorty/setCaracters', newValue);
      }
    });
    let page = computed({
      get: () => {
        return store.getters['RickAndMorty/actualPageSearch'];
      },
      set: (newValue) => {
        store.dispatch('RickAndMorty/setActualPageSearch', newValue);
      }
    });

    return {
      caracters,
      totalPagesRequest,
      actualPageSearch,
      details,
      page,
      getPage,
      nextPage,
      prevPage
    }
  }
})
</script>

<style lang="scss">
@import "@/assets/styles.scss";
  .container-character-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .grid-width {
    width: 87vw;
    padding-block: 3px;
  }
</style>
