import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate';

import RickAndMorty from './modules/rick-and-morty'

export default createStore({
  plugins: [createPersistedState()],
  modules: {
    RickAndMorty
  }
});
