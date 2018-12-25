const {
  performance
} = require('perf_hooks');


// 插入算法

const arr = []
const sum = 100000
const total = 300000000

console.log('随机数组生成中....')
for (let i = 0; i < sum; i++) {
  arr.push(~~(Math.random() * total))
}
console.log(`随机数组生成功! 一共${arr.length}位`)

const insertSort = (list) => {
  // console.log(list)
  const arr = list
  for (let j = 1; j < list.length; j++) {
    let key = arr[j]
    let i = j - 1
    while (i >= 0 && arr[i] > key) {
      arr[i + 1] = arr[i]
      i--
    }
    arr[i + 1] = key
  }
  // console.log(arr)
}

start = performance.now();
insertSort(arr)
end = performance.now();
console.log(`插入排序成功, 花费时间${end - start}ms`)