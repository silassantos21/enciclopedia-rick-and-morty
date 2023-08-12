<template>
  <div class="grid-width">
    <div class="container-character-details">
      <div class="btn-container">
        <button @click="toHome"><i class="material-icons">arrow_back</i>Home</button>
        <h1 class="home-search-title">Detalhes do Personagem </h1>
      </div>
      <CharacterCardDetails :details="caracter" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CharacterCardDetails from "@/components/characters-card/CharacterCardDetails.vue";
import { mapState, mapActions } from 'vuex'
//import axios from 'axios'
export default {
	//props: ["page"],
	name: "CharactersList",
	components: {
		CharacterCardDetails
	},
	data() {
		return {
			details: null,
			page: 1
		};
	},
	created() {
    debugger
		if (!this.caracter.id) {
      this.$router.push('/')
    }
	},
  computed: {
    ...mapState('RickAndMorty', ['caracter'])
  },
	methods: {
    toHome () {
      this.$router.push('/')
    }
	}
};
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
