/*
p： 插入排序可以如下改写成一个递归过程：为排序A[1..n]，先递归地排序A[1..n-1]，
    然后再将A[n]插入到已排序的数组A[1..n-1]中去。对于插入排序的这一递归版本，为它的运行时间写一个递归式。

*/

package main

import (
  "fmt"
)

func main() {
  arr := []int{1, 3, 5, 7, 9, 2, 4, 6, 8 ,10, 55, 99, 33, 22, 44}
  fmt.Print(arr, "\n")
  sort(arr, len(arr)- 1)
  fmt.Print(arr, "\n")
}

func insert(list []int, n int) {
  i := n - 1
  key := list[n]
  for {
    if i < 0 || list[i] < key {
      break
    }
    list[i + 1] = list[i]
    i = i - 1
  }
  list[i + 1] = key
}

func sort(list []int, n int) {
  if n > 0 {
    sort(list, n - 1)
    insert(list, n)
  }
}