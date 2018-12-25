// 重写merge 不使用哨兵变量， 直接复制到A
package main

import (
	"fmt"
	"math/rand"
	"time"
)

func main() {
	var arr []int
	// 生成随机数
	fmt.Print("正在生成随机数组...\n")
	sum := 100000
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for index := 0; index < sum; index++ {
		// 因为slice 是一个引用类似，支持自动扩容，切片扩容以后地址也发生了改变，所以我们要重新赋值给这个变量
		arr = append(arr, r.Intn(3000000))
	}
	start := time.Now().UTC().UnixNano() / 1e6
	fmt.Print(fmt.Sprintf("生成随机数组成功! 一共%d位\n", len(arr)))
	// fmt.Print(arr)
	// 归并排序
	mergeSort(arr, 0, len(arr)-1)

	end := time.Now().UTC().UnixNano() / 1e6
	fmt.Print(fmt.Sprintf("归并排序成功, 花费时间%dms!\n", end-start))
	// fmt.Print(arr)
}

func merge(list []int, p int, q int, r int) {
	// 分别生成两个已经排好序的切片
	arr1 := make([]int, q-p+1)
	arr2 := make([]int, r-q)

	arr := list[p : q+1]
	copy(arr1, arr)
	arr = list[q+1 : r+1]
	copy(arr2, arr)
	i := 0
	j := 0
	for k := p; k <= r; k++ {
		if i > len(arr1) - 1 && j > len(arr2) - 1 {
			break
		}
		var both bool = false
		if i > len(arr1) - 1 && j <= len(arr2) - 1 {
			list[k] = arr2[j]
			j++
			both = true
		}
		if j > len(arr2) - 1 && i <= len(arr1) - 1 {
			list[k] = arr1[i]
			i++
			both = true
		}
		if !both {
			if arr1[i] <= arr2[j] {
				list[k] = arr1[i]
				i++
			} else {
				list[k] = arr2[j]
				j++
			}
		}
	}
}

// 归并排序 Tn = nlog2(n);
func mergeSort(list []int, p int, r int) {
	if p < r {
		q := int(p+r) / 2
		mergeSort(list, p, q)
		mergeSort(list, q+1, r)
		merge(list, p, q, r)
	}
}
