import { GetterTree } from 'vuex'
import { State } from 'types/store'

const getters: GetterTree<State, any> = {
  getAllNames (state) {
    return state?.people.map(e => e.name)
  }
}

export default getters
