import { MutationTree } from 'vuex'
import { State } from 'types/store'
import { setPeopleList, handleChangePeopleJob } from '@/common/constant'

const mutations: MutationTree<State> = {
  [handleChangePeopleJob] (state, { index, job }) {
    state.people[index].job = job
  },
  [setPeopleList] (state, { list }) {
    state.people.push(...list)
  }
}

export default mutations
