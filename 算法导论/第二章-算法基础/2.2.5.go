/*
证明二分查找的最坏情况的时间复杂度为 Θnlgn

[1, 2, 3, 4, 5, 6, 7, 8, 9 ,10]

输入：一列数A=<a1,a2,…,an >和一个值v
输出：下标i，使得v=A[i]，或者当v不在A中出现时为NIL。
写出针对这个问题的现行查找的伪代码，它顺序地扫描整个序列以查找v。
利用循环不变式证明算法的正确性。确保所给出的循环不变式满足三个必要的性质。

二分查找法 也叫折半查找法， 即直接从总位数中间查找

find(A, v)
  l = 1
  r = n

  while l < r
    q = floor((l + r) / 2)

    if a[q] = v
      return q
    else if A[q] > v
      r = q - 1
    else
      l = q + 1
  return NIL

*/
package main

import (
  "fmt"
  "math"
)

func main () {
  arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 55, 101, 202}
  fmt.Print("查找到的索引是:", find(arr, 101), "\n")
}

func find(list []int, v int) int {
  total := 0
  findIndex := -1
  fmt.Print(fmt.Sprintf("查找数组为:%d, 长度为%d, 查找的值为%d", list, len(list), v),  "\n")
  l := 0
  r := len(list) - 1
  for {
    total += 1
    if l <= r {
      // 取中位数
      q := int(math.Floor(float64(l + r) / 2))
      // fmt.Print(l, r, q, "\n")
      if list[q] == v {
        findIndex = q
        break
      } else if list[q] > v {
        r = q - 1
      } else {
        l = q + 1
      }
    } else {
      break
    }    
  }
  fmt.Print(fmt.Sprintf("查找结束, 一共查找%d次", total), "\n")
  return findIndex
}

/*

二分查找最坏的情况是直到最后次二分也未找到相应的值，
假设总量n等于2的k次方，
即n=2^k，
每二分一次k减1，
当k=0时，之前一次为最后一次二分，
即共执行了k次。而k=lg(n)，
所以，最坏情况的运行时间为Θ(lgn)。
*/