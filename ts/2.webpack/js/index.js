const getUserInfo = (list, id) => {
  return list.filter((item) => item.id === id);
}

const list = [
  {
    id: '1',
    name: '1',
  },
  {
    id: '2',
    name: '2',
  }
];

const list2 = [
  {
    id: '1',
  },
  {
    id: '2',
  }
];

console.log(getUserInfo(list, '1'))
console.log(getUserInfo(list2, '1'))

import Down from './2'

console.log(new Down('111', false))

import Arrs from '../lib/test'
Arrs.push({
  id: '1',
  name: '1'
})
Arrs.push(1)
console.log(Arrs)

import { a, b } from './3'
console.log(a, b)