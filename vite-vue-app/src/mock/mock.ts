import { CreateMock } from "types/mock"
const Mock = require('mockjs')

// 这里的callback需要返回一个函数，函数参数为options，由mock传入自动执行函数
export const createMock: CreateMock = (url: string | RegExp, callback: Function) => {
  Mock.mock(url, callback(Mock))
}
