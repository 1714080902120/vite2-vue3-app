import { ActionTree } from 'vuex'
import { State } from 'types/store'
import { setPeopleList, handleChangePeopleJob } from '@/common/constant'


type Payload = {
  index: number;
  name: string;
}

const mutations: ActionTree<State, any> = {
  [handleChangePeopleJob] ({ state, commit }, payload: Payload) {
    commit(handleChangePeopleJob, payload)
  },
  [setPeopleList] ({ commit }, payload) {
    commit(setPeopleList, payload)
  }
}

export default mutations
