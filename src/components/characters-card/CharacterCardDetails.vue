<template>
  <div class="details-card-character">
    <h2>{{ details.name }}</h2>
    <img :src="details.image" />
    <div class="details-layout">
      <div class="details-left">
        <div class="status">
          <span style="margin-right: 5px;">Status:</span>
          <span v-if="statusColorR" class="status-icon-r"></span>
          <span v-else-if="statusColorG" class="status-icon-g"></span>
          <span v-else-if="statusColorC" class="status-icon-c"></span>
          <span>{{ details.status }}</span>
        </div>
        <span>Espécie: {{ details ? details.species : "" }}</span>
        <span>Origem: {{ details ? details.origin.name : "" }}</span>
        <span>Localização: {{ details ? details.location.name : "" }}</span>
        <span>Gênero: {{ details ? details.gender : "" }}</span>
      </div>
      <div class="details-right">
        <span>{{ details.episode.length === 1 ? 'Episódio' : 'Episódios' }} de aparição</span>
        <div class="episodes-scroll">
          <ul>
            <li v-for="(episode, index) in details.episode" :key="index">
              {{ episode }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
.details-card-character {
	width: 50vw;
	height: auto;
	min-height: 450px;
	background: rgb(60, 62, 68);
	border-radius: 20px;
	overflow: hidden;
	padding: 10px 0px 0px 0px;
	margin-bottom: 24px;
	margin-right: 10px;
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
.details-left {
	display: grid;
	justify-content: center;
  justify-items: left;
}
.details-right {
	display: grid;
	justify-content: center;
}
.episodes-scroll {
  padding-block: 5px;
  overflow-y: auto;
  max-height: 100px;
  width: 370px;
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
.details-layout {
  display: flex;
  justify-content: space-evenly;
  padding-block: 20px;
}
</style>
