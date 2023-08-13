import axios from 'axios'
const RickAndMorty = {
  namespaced: true,
  state: {
    prefixUrlRickAndMortyCharacter: 'https://rickandmortyapi.com/api/character',
    prefixUrlRickAndMortyEpisode: 'https://rickandmortyapi.com/api/episode',
    caracters: [],
    caracter: {},
    episodes: {},
    prevApiRequest: null,
    nextApiRequest: null,
    totalPagesRequest: 1,
    actualPageSearch: 1,
    nameSearch: null,
    statusSearch: 'all',
    showLoadingSpinner: false,
    dialogVisible: false,
    backPage: false
  },
  getters: {
    caracters: (state) => {
      return state.caracters
    },
    nameSearch: (state) => {
      return state.nameSearch
    },
    statusSearch: (state) => {
      return state.statusSearch
    },
    showLoadingSpinner: (state) => {
      return state.showLoadingSpinner
    },
    dialogVisible: (state) => {
      return state.dialogVisible
    },
    backPage: (state) => {
      return state.backPage
    },
    statusSearch: (state) => {
      return state.statusSearch
    },
    actualPageSearch: (state) => {
      return state.actualPageSearch
    }
  },
  mutations: {
    SET_CARACTERS (state, caracters) {
      state.caracters = caracters
    },
    SET_CARACTER (state, caracter) {
      state.caracter = caracter
    },
    SET_EPISODES (state, episode) {
      state.episodes[episode.url] = episode.stringEp
    },
    SET_CARACTERS_NAME_SEARCH (state, nameSearch) {
      state.nameSearch = nameSearch
    },
    SET_CARACTERS_STATUS_SEARCH (state, statusSearch) {
      state.statusSearch = statusSearch
    },
    SET_TOTAL_PAGES_REQUEST (state, totalPagesRequest) {
      state.totalPagesRequest = totalPagesRequest
    },
    SET_ACTUAL_PAGE_SEARCH (state, actualPageSearch) {
      state.actualPageSearch = actualPageSearch
    },
    SET_PREV_API_REQUEST (state, prevApiRequest) {
      state.prevApiRequest = prevApiRequest
    },
    SET_NEXT_API_REQUEST (state, nextApiRequest) {
      state.nextApiRequest = nextApiRequest
    },
    SET_SHOW_LOADING_SPINNER (state, showLoadingSpinner) {
      state.showLoadingSpinner = showLoadingSpinner
    },
    SET_DIALOG_VISIBLE (state, dialogVisible) {
      state.dialogVisible = dialogVisible
    },
    SET_BACK_PAGE (state, backPage) {
      state.backPage = backPage
    },
    CLEAR_EPISODES (state) {
      state.episodes = {}
    }
  },
  actions: {
    getCaractersByName (context, name) {
      const ApiStatusSearch = (context.state.statusSearch && context.state.statusSearch !== 'all') ? `/?status=${context.state.statusSearch}` : '/?'
      const ApiCaracters = name ? `${context.state.prefixUrlRickAndMortyCharacter}${ApiStatusSearch}&name=${name}` : `${context.state.prefixUrlRickAndMortyCharacter}${ApiStatusSearch}`
      this.dispatch('RickAndMorty/setShowLoadingSpinner', true)
      this.dispatch('RickAndMorty/setCaractersNameSearch', name)
      this.dispatch('RickAndMorty/setActualPageSearch', 1)
      return new Promise((resolve, reject) => {
        axios.get(ApiCaracters)
        .then(c => {
          this.dispatch('RickAndMorty/setCharactersLayoutDetails', c.data)
          resolve(c.data.results)
        }).catch(error => {
          console.log(error)
          this.dispatch('RickAndMorty/clearCharacters')
          reject(error)
          return []
        }).finally(() => {
          this.dispatch('RickAndMorty/setShowLoadingSpinner', false)
        })
      })
    },
    getCaractersByStatus (context, status) {
      const ApiNameSearch = context.state.nameSearch ? `/?name=${context.state.nameSearch}` : '/?'
      const ApiCaracters = status === 'all' ? `${context.state.prefixUrlRickAndMortyCharacter}${ApiNameSearch}` : `${context.state.prefixUrlRickAndMortyCharacter}${ApiNameSearch}&status=${status}`
      this.dispatch('RickAndMorty/setShowLoadingSpinner', true)
      this.dispatch('RickAndMorty/setCaractersStatusSearch', status)
      this.dispatch('RickAndMorty/setActualPageSearch', 1)
      return new Promise((resolve, reject) => {
        axios.get(ApiCaracters)
        .then(c => {
          this.dispatch('RickAndMorty/setCharactersLayoutDetails', c.data)
          resolve(c.data.results)
        }).catch(error => {
          console.log(error)
          this.dispatch('RickAndMorty/clearCharacters')
          reject(error)
          return []
        }).finally(() => {
          this.dispatch('RickAndMorty/setShowLoadingSpinner', false)
        })
      })
    },
    getCaracter (context, idCaracter) {
      const ApiCaracter = `${context.state.prefixUrlRickAndMortyCharacter}/${idCaracter}`
      return new Promise((resolve, reject) => {
        axios.get(ApiCaracter)
          .then(c => {
            const results = c.data
            this.dispatch('RickAndMorty/setCaracter', results)
            resolve(results)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    getSeasonEpFromApi (context, numberEpisode) {
      const ApiCaracter = `${context.state.prefixUrlRickAndMortyEpisode}/${numberEpisode}`
      if (context.state.episodes[ApiCaracter]) { return }
      return new Promise((resolve, reject) => {
        axios.get(ApiCaracter)
        .then(c => {
            const stringEp = c.data.episode.replace("S", "Temporada ").replace("E", " - Episódio ")
            const results = { url: c.data.url, stringEp }
            this.dispatch('RickAndMorty/setEpisodes', results)
            resolve(results)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    getActualPage (context, pageType) {
      const ApiCaractersNewPage = pageType === 'prev' ? context.state.prevApiRequest : context.state.nextApiRequest
      this.dispatch('RickAndMorty/setShowLoadingSpinner', true)
      return new Promise((resolve, reject) => {
        axios.get(ApiCaractersNewPage)
        .then(c => {
          this.dispatch('RickAndMorty/setCharactersLayoutDetails', c.data)
          resolve(c.data.results)
        }).catch(error => {
          console.log(error)
          reject(error)
          return []
        }).finally(() => {
          this.dispatch('RickAndMorty/setShowLoadingSpinner', false)
        })
      })
    },
    setCaracters (context, caracters) {
      context.commit('SET_CARACTERS', caracters)
    },
    setCaractersNameSearch (context, nameSearch) {
      context.commit('SET_CARACTERS_NAME_SEARCH', nameSearch)
    },
    setCaractersStatusSearch (context, statusSearch) {
      context.commit('SET_CARACTERS_STATUS_SEARCH', statusSearch)
    },
    setCharactersLayoutDetails (context, layoutDetails) {
      this.dispatch('RickAndMorty/setCaracters', layoutDetails.results)
      this.dispatch('RickAndMorty/setTotalPagesRequest', layoutDetails.info.pages)
      this.dispatch('RickAndMorty/setPrevApiRequest', layoutDetails.info.prev)
      this.dispatch('RickAndMorty/setNextApiRequest', layoutDetails.info.next)
    },
    setCaracter (context, caracter) {
      context.commit('SET_CARACTER', caracter)
    },
    setEpisodes (context, caracter) {
      context.commit('SET_EPISODES', caracter)
    },
    setTotalPagesRequest (context, totalPagesRequest) {
      context.commit('SET_TOTAL_PAGES_REQUEST', totalPagesRequest)
    },
    setActualPageSearch (context, actualPageSearch) {
      context.commit('SET_ACTUAL_PAGE_SEARCH', actualPageSearch)
    },
    setPrevApiRequest (context, prevApiRequest) {
      context.commit('SET_PREV_API_REQUEST', prevApiRequest)
    },
    setNextApiRequest (context, nextApiRequest) {
      context.commit('SET_NEXT_API_REQUEST', nextApiRequest)
    },
    setShowLoadingSpinner (context, showLoadingSpinner) {
      context.commit('SET_SHOW_LOADING_SPINNER', showLoadingSpinner)
    },
    setDialogVisible (context, dataialogVisible) {
      context.commit('SET_DIALOG_VISIBLE', dataialogVisible)
    },
    setBackPage (context, backPage) {
      context.commit('SET_BACK_PAGE', backPage)
    },
    clearEpisodes (context, caracter) {
      context.commit('CLEAR_EPISODES', caracter)
    },
    clearCharacters () {
      this.dispatch('RickAndMorty/setCaracters', [])
      this.dispatch('RickAndMorty/setTotalPagesRequest', 1)
      this.dispatch('RickAndMorty/setPrevApiRequest', null)
      this.dispatch('RickAndMorty/setNextApiRequest', null)
      this.dispatch('RickAndMorty/setDialogVisible', true)
    }
  }
}

export default RickAndMorty
