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
import { mapState, mapActions } from 'vuex'
//import axios from 'axios'
export default {
	//props: ["page"],
	name: "CharactersList",
	components: {
		CharacterCardList
	},
  computed: {
    ...mapState('RickAndMorty', ['caracters', 'totalPagesRequest', 'actualPageSearch']),
    details: {
      get () {
        return this.$store.getters['RickAndMorty/caracters']
      },
      set (value) {
        this.$store.dispatch('RickAndMorty/setCaracters', value)
      }
    },
    page: {
      get () {
        return this.$store.getters['RickAndMorty/actualPageSearch']
      },
      set (value) {
        this.$store.dispatch('RickAndMorty/setActualPageSearch', value)
      }
    }
  },
	methods: {
    ...mapActions('RickAndMorty', ['getCaracters', 'getActualPage', 'setShowLoadingSpinner', 'setActualPageSearch']),
		nextPage () {
			this.page++;
			this.getPage('next');
		},
		prevPage () {
			this.page < 2 ? this.page : this.page--;
			this.getPage('prev');
		},
		getPage (pageType) {
      this.setShowLoadingSpinner(true)
			this.getActualPage(pageType)
				.then((response) => {
					//console.log("details:", response);
					this.details = response;
				})
				.catch((error) => {
					console.log(error);
				}).finally(() => {
          this.setShowLoadingSpinner(false)
        })
		}
	}
};
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
