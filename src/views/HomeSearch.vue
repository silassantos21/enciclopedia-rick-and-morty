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
    
    <div>Checked names: {{ selectedStatus }}</div>
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
import CharactersList from "@/components/characters-card/CharactersList_comp.vue";
import { defineComponent, ref } from 'vue'
import { mapState, mapActions } from 'vuex'
export default defineComponent({
  name: 'HomeUser',
  components: {
		CharactersList
	},
  setup () {
    return {
      isFirstRequest: ref(false),
      checkedNames: ref([]),
      search: ref(''),
      caractersTest: ref([]),
      selectedStatus: ref(null),
      radioOptions: ref([
        { label: 'All', value: 'all' },
        { label: 'Alive', value: 'alive' },
        { label: 'Dead', value: 'dead' },
        { label: 'Unknown', value: 'unknown' },
      ]),
    }
  },
  mounted () {
    this.isFirstRequest = true
    this.search = this.nameSearch
    this.selectedStatus = this.statusSearch
    this.setDialogVisible(false)
    this.setShowLoadingSpinner(false)
  },
  methods: {
    ...mapActions('RickAndMorty', ['getCaractersByName', 'getCaractersByStatus', 'setShowLoadingSpinner', 'setDialogVisible', 'setCaractersStatusSearch']),
    closeDialog() {
      this.setDialogVisible(false)
    },
    setStatusValue(valueStatus) {
      this.selectedStatus = valueStatus
    }
  },
  computed: {
    ...mapState('RickAndMorty', ['caracters', 'nameSearch', 'statusSearch', 'showLoadingSpinner', 'dialogVisible'])
  },
  watch: {
    search (newValue, oldValue) {
      const nv = newValue
      if (this.isFirstRequest || (newValue.length < 3 && newValue.length !== 0)) {
        this.isFirstRequest = false
        return
      }
      setTimeout(async () => {
        const response = await this.getCaractersByName(nv)
        if (response.length === 0) {
          this.dialogVisible = true
        }
        this.setShowLoadingSpinner(false)
      }, 2000)
    },
    selectedStatus (newValue, oldValue) {
      const nv = newValue
      if (this.isFirstRequest) {
        this.isFirstRequest = false
        return
      }
      setTimeout(async () => {
        await this.getCaractersByStatus(nv)
        this.setShowLoadingSpinner(false)
      }, 1500)
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