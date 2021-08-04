import request from './request'

export function getPeopleList ({ limit = 20, skip = 0 }) {
  return request({
    url: '/people-list',
    method: 'get',
    params: {
      limit,
      skip
    }
  })
}
