<template>
  <div class="grid-width">
    <warning-dialog :visible="dialogVisible" :title="'Personagem não encontrado'" @closeDialog="closeDialog">
      <img src="../assets/img/character-not-found.png" class="img-dialog"/>
      <p style="font-weight: bold;">Tente novamente</p>
      <button @click="closeDialog">OK</button>
    </warning-dialog>
    <img src="../assets/img/portal-rick-and-morty.gif" />
    <h1 class="home-search-title">WubbaLubbaDubDubPedia</h1>
    <div class="search-container">
      <h4>Encontre seu personagem dos universos de Rick & Morty(em inglês)</h4>
      <input class="search-input" v-model="search" placeholder="Pesquisar(Ex: Rick, Morty...)" />
    </div>
    <div class="search-radio-status">
      <radio-inputs :options="radioOptions" @value="setStatusValue" />
    </div>
    <div class="search-result">
      <loading-spinner v-if="showLoadingSpinner" />
      <CharactersList v-if="caracters.length > 0 && !showLoadingSpinner" />
      <div v-if="caracters.length === 0 && !showLoadingSpinner" class="search-empty">
        <i class="material-icons">search</i>
        <h2 class="home-search-warning">Faça uma pesquisa... </h2>
      </div>
    </div>
  </div>
</template>

<script>
import CharactersList from "@/components/characters-card/CharactersList.vue";
import { defineComponent, onMounted, ref, computed, watch } from 'vue'
import { useStore } from 'vuex'
export default defineComponent({
  name: 'HomeSearch',
  components: {
		CharactersList
	},
  setup() {
    const store = useStore()

    const isFirstRequest = ref(false)
    const checkedNames = ref([])
    const search = ref('')
    const caractersTest = ref([])
    const selectedStatus = ref(null)
    const radioOptions = ref([
      { label: 'All', value: 'all' },
      { label: 'Alive', value: 'alive' },
      { label: 'Dead', value: 'dead' },
      { label: 'Unknown', value: 'unknown' }
    ])

    const closeDialog = () => {
      store.dispatch('RickAndMorty/setDialogVisible', false)
    }   
    const setStatusValue = (valueStatus) => {
      selectedStatus.value = valueStatus
    }

    onMounted (() => {
      isFirstRequest.value = true
      search.value = nameSearch.value
      selectedStatus.value = statusSearch.value
      store.dispatch('RickAndMorty/setDialogVisible', false)
      store.dispatch('RickAndMorty/setShowLoadingSpinner', false)
      store.dispatch('RickAndMorty/clearEpisodes')
    })

    const caracters = computed(() =>{
      return store.getters['RickAndMorty/caracters'];
    })
    const nameSearch = computed(() =>{
      return store.getters['RickAndMorty/nameSearch'];
    })
    const statusSearch = computed(() =>{
      return store.getters['RickAndMorty/statusSearch'];
    })
    const showLoadingSpinner = computed(() =>{
      return store.getters['RickAndMorty/showLoadingSpinner'];
    })
    const dialogVisible = computed(() =>{
      return store.getters['RickAndMorty/dialogVisible'];
    })
    const backPage = computed(() =>{
      return store.getters['RickAndMorty/backPage'];
    })

    watch(search, (newValue) => {
      const nv = newValue
      if (isFirstRequest.value || (newValue.length < 3 && newValue.length !== 0) || backPage.value) {
        store.dispatch('RickAndMorty/setBackPage', false)
        isFirstRequest.value = false
        return
      }
      setTimeout(async () => {
        try {
          await store.dispatch('RickAndMorty/getCaractersByName', nv)
        } catch (error){
          console.log(error)
        } finally {
          store.dispatch('RickAndMorty/setShowLoadingSpinner', false)
        }
      }, 2000)
    });
    watch(selectedStatus, (newValue) => {
      const nv = newValue
      if (isFirstRequest.value) {
        isFirstRequest.value = false
        return
      }
      setTimeout(async () => {
        await store.dispatch('RickAndMorty/getCaractersByStatus', nv)
        store.dispatch('RickAndMorty/setShowLoadingSpinner', false)
      }, 1500)
    })

    return {
      caracters,
      nameSearch,
      statusSearch,
      showLoadingSpinner,
      dialogVisible,
      backPage,
      isFirstRequest,
      checkedNames,
      search,
      caractersTest,
      selectedStatus,
      radioOptions,
      closeDialog,
      setStatusValue
    }
  }
})
</script>

<style lang="scss">
@import "@/assets/styles.scss";
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .grid-width {
    width: 87vw;
    padding-block: 3px;
    img {
      height: 20vw;
    }
  }
</style>