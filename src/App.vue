<template>
	<div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	// color: #2c3e50;
  color: white;
  padding: 0px;
}

body {
  margin: 0; /* Remove margens padrão do corpo */
  padding: 0; /* Remove preenchimento padrão do corpo */
  // background-image: url("../assets/img/fundo-rick-and-morty.png");
  background-color: black;
  background-size: cover; /* Ajusta a imagem para cobrir todo o elemento */
  background-position: center; /* Centraliza a imagem horizontal e verticalmente */
  background-repeat: no-repeat; /* Evita a repetição da imagem de fundo */
}
</style>