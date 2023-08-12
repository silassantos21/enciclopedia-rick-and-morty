<template>
  <div class="grid-width">
    <div class="container">
      <CharacterCardList v-for="detail in details" :key="detail.id" :details="detail" />
    </div>
    <div class="btn-container">
      <button :disabled="page === 1" @click="prevPage">Anterior</button>
      <button @click="nextPage">Próximo</button>
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
	data() {
		return {
			details: null,
			page: 1
		};
	},
	created() {
		this.getCaracters()
			.then((response) => {
				console.log("details:", response);
				this.details = response;
			})
			.catch((error) => {
				console.log(error);
			});
	},
  computed: {
    ...mapState('RickAndMorty', ['caracters'])
  },
	methods: {
    ...mapActions('RickAndMorty', ['getCaracters', 'getActualPage']),
		nextPage () {
			this.page++;
			this.getPage();
		},
		prevPage () {
			this.page < 2 ? this.page : this.page--;
			this.getPage();
		},
		getPage () {
			this.getActualPage(this.page)
				.then((response) => {
					//console.log("details:", response);
					this.details = response;
				})
				.catch((error) => {
					console.log(error);
				});
		}
	}
};
</script>

<style lang="scss">
@import "../assets/styles.scss";
  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .grid-width {
    width: 87vw;
    padding-block: 3px;
  }
</style>
