import { GetPeopleListOptions } from "types/mock";
import { createMock } from "./mock";

const getPeopleList = createMock('people-list', (Mock: any) => {
  const Random = Mock.Random
  Random.extend({
    sex: function (e: any) {
      return this.pick([
        'male', 'female', 'middle'
      ])
    },
    job: function (e: any) {
      return this.pick(['医生', '护士', '开发', '测试', '运营', '设计', '产品', '律师', '演员'])
    }
  })
  return (options: GetPeopleListOptions) => {
    const { limit = 20, skip = 0 } = options
    const start = limit * skip
    const end = start + limit
    return Mock.mock({
      [`list|500`]: {
        'name|string':'@name',
        'sex|string': '@sex',
        'age|20-35': 20,
        'job|string': '@job'
      }
    }).slice(start, end)
  }
})

export default {
  getPeopleList
}
