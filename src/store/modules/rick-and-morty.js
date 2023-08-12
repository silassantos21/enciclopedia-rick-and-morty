import axios from 'axios'
const RickAndMorty = {
  namespaced: true,
  state: {
    prefixUrlRickAndMorty: 'https://rickandmortyapi.com/api/character',
    caracters: [],
    caracter: {},
    prevApiRequest: null,
    nextApiRequest: null,
    totalPagesRequest: 1,
    actualPageSearch: 1,
    nameSearch: null,
    statusSearch: 'all',
    showLoadingSpinner: false,
    dialogVisible: false
  },
  getters: {
    caracters: (state) => {
      return state.caracters
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
    }
  },
  actions: {
    getCaracters (context, payload) {
      const ApiCaracters = context.state.prefixUrlRickAndMorty
      return new Promise((resolve, reject) => {
        axios.get(ApiCaracters)
        .then(c => {
          const results = c.data.results
          this.dispatch('RickAndMorty/setCaracters', c.data.results)
          this.dispatch('RickAndMorty/setTotalPagesRequest', c.data.info.pages)
          this.dispatch('RickAndMorty/setPrevApiRequest', c.data.info.prev)
          this.dispatch('RickAndMorty/setNextApiRequest', c.data.info.next)
          resolve(results)
        }).catch(error => {
          console.log(error)
          reject(error)
          return []
        })
      })
    },
    getCaractersByName (context, name) {
      const ApiStatusSearch = (context.state.statusSearch && context.state.statusSearch !== 'all') ? `/?status=${context.state.statusSearch}` : '/?'
      const ApiCaracters = name ? `${context.state.prefixUrlRickAndMorty}${ApiStatusSearch}&name=${name}` : context.state.prefixUrlRickAndMorty
      this.dispatch('RickAndMorty/setShowLoadingSpinner', true)
      this.dispatch('RickAndMorty/setCaractersNameSearch', name)
      this.dispatch('RickAndMorty/setActualPageSearch', 1)
      return new Promise((resolve, reject) => {
        axios.get(ApiCaracters)
        .then(c => {
          const results = c.data.results
          this.dispatch('RickAndMorty/setCaracters', c.data.results)
          this.dispatch('RickAndMorty/setTotalPagesRequest', c.data.info.pages)
          this.dispatch('RickAndMorty/setPrevApiRequest', c.data.info.prev)
          this.dispatch('RickAndMorty/setNextApiRequest', c.data.info.next)
          resolve(results)
        }).catch(error => {
          console.log(error)
          this.dispatch('RickAndMorty/setCaracters', [])
          this.dispatch('RickAndMorty/setTotalPagesRequest', 1)
          this.dispatch('RickAndMorty/setPrevApiRequest', null)
          this.dispatch('RickAndMorty/setNextApiRequest', null)
          this.dispatch('RickAndMorty/setDialogVisible', true)
          reject(error)
          return []
        }).finally(() => {
          this.dispatch('RickAndMorty/setShowLoadingSpinner', false)
        })
      })
    },
    getCaractersByStatus (context, status) {
      const ApiNameSearch = context.state.nameSearch ? `/?name=${context.state.nameSearch}` : '/?'
      const ApiCaracters = status === 'all' ? `${context.state.prefixUrlRickAndMorty}${ApiNameSearch}` : `${context.state.prefixUrlRickAndMorty}${ApiNameSearch}&status=${status}`
      this.dispatch('RickAndMorty/setCaractersStatusSearch', status)
      this.dispatch('RickAndMorty/setShowLoadingSpinner', true)
      this.dispatch('RickAndMorty/setActualPageSearch', 1)
      return new Promise((resolve, reject) => {
        axios.get(ApiCaracters)
        .then(c => {
          const results = c.data.results
          this.dispatch('RickAndMorty/setCaracters', c.data.results)
          this.dispatch('RickAndMorty/setTotalPagesRequest', c.data.info.pages)
          this.dispatch('RickAndMorty/setPrevApiRequest', c.data.info.prev)
          this.dispatch('RickAndMorty/setNextApiRequest', c.data.info.next)
          resolve(results)
        }).catch(error => {
          console.log(error)
          this.dispatch('RickAndMorty/setCaracters', [])
          this.dispatch('RickAndMorty/setTotalPagesRequest', 1)
          this.dispatch('RickAndMorty/setPrevApiRequest', null)
          this.dispatch('RickAndMorty/setNextApiRequest', null)
          this.dispatch('RickAndMorty/setDialogVisible', true)
          reject(error)
          return []
        }).finally(() => {
          this.dispatch('RickAndMorty/setShowLoadingSpinner', false)
        })
      })
    },
    getCaracter (context, idCaracter) {
      const ApiCaracter = `${context.state.prefixUrlRickAndMorty}/${idCaracter}`
      return new Promise((resolve, reject) => {
        axios.get(ApiCaracter)
          .then(c => {
            debugger
            const results = c.data
            this.dispatch('RickAndMorty/setCaracter', results)
            resolve(results)
        }).catch(error => {
          console.log(error)
          reject(error)
        })
      })
    },
    getActualPage (context, pageType) {
      const ApiCaractersNewPage = pageType === 'prev' ? context.state.prevApiRequest : context.state.nextApiRequest 
      return new Promise((resolve, reject) => {
        axios.get(ApiCaractersNewPage)
        .then(c => {
          const results = c.data.results
          this.dispatch('RickAndMorty/setCaracters', c.data.results)
          this.dispatch('RickAndMorty/setTotalPagesRequest', c.data.info.pages)
          this.dispatch('RickAndMorty/setPrevApiRequest', c.data.info.prev)
          this.dispatch('RickAndMorty/setNextApiRequest', c.data.info.next)
          resolve(results)
        }).catch(error => {
          console.log(error)
          reject(error)
          return []
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
    setCaracter (context, caracter) {
      context.commit('SET_CARACTER', caracter)
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
    }
  }
}

export default RickAndMorty
