<template>
  <div class="grid-width">
    <div class="container-character-details">
      <div class="btn-container">
        <button @click="toHome"><i class="material-icons">arrow_back</i>Home</button>
        <h1 class="home-search-title">Detalhes do Personagem </h1>
      </div>
      <CharacterCardDetails />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CharacterCardDetails from "@/components/characters-card/CharacterCardDetails.vue";
import { defineComponent, ref, onBeforeMount } from "vue";
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
  name: "CharactersList",
	components: {
		CharacterCardDetails
	},
  setup () {
    const store = useStore()
    const router = useRouter()

    const caracter = store.state.RickAndMorty.caracter

    const details = ref(null)
    const page = ref(1)

    const toHome = () => {
      router.push('/')
    }

    onBeforeMount(() => {
      if (!caracter.id) {
        router.push('/')
      }
    })

    return {
      details,
      caracter,
      page,
      toHome
    }
  }
})
</script>

<style lang="scss">
@import "../assets/styles.scss";
  .container-character-details {
    display: grid !important;
    flex-wrap: wrap;
    justify-content: center;
  }
  .grid-width {
    width: 87vw;
    padding-block: 3px;
  }
</style>
