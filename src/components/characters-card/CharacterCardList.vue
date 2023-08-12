<template>
  <div class="details-card" @click="toCharacter">
    <h2>{{ details.name }}</h2>
    <img :src="details.image" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
	props: {
		details: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			status: this.details.status
		};
	},
  methods: {
    ...mapActions('RickAndMorty', ['getCaracter', 'setBackPage']),
    async toCharacter () {
      await this.getCaracter(this.details.id)
	  this.setBackPage(true)
      this.$router.push('/character-details')
    }
  },
	computed: {
		statusColorR() {
			if (this.status === "Dead") {
				return 1;
			} else return 0;
		},
		statusColorG() {
			if (this.status === "Alive") {
				return 1;
			} else return 0;
		},
    statusColorC() {
			if (this.status === "unknown") {
				return 1;
			} else return 0;
		}
	}
};
</script>

<style lang="scss">
.details-card {
	width: 320px;
	height: auto;
	min-height: 350px;
	background: rgb(60, 62, 68);
	border-radius: 20px;
	overflow: hidden;
	padding: 10px 0px 0px 0px;
	margin-bottom: 24px;
	margin-right: 10px;
	transition: all 0.2s linear;
	cursor: pointer;
	color: white;
	img {
		margin-top: 5%;
		width: 320px;
		height: 72%;
	}
}
.status {
	display: flex;
	justify-content: center;
}
.details {
	display: grid;
	justify-content: center;
}
.status-icon-r,
.status-icon-c,
.status-icon-g {
	margin: auto 0;
	height: 0.5rem;
	width: 0.5rem;
	margin-right: 0.375rem;
	border-radius: 50%;
}
.status-icon-r {
  background: rgb(214, 61, 46);
}
.status-icon-g {
	background: rgb(92 199 12);
}
.status-icon-c {
	background: rgb(173, 173, 173);
}
.details-card:hover {
	transform: scale(1.01);
	box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2),
		0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
.details-card > .title {
	margin: 0;
}
.details-link {
	color: black;
	text-decoration: none;
	font-weight: 100;
}
</style>
