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
		arr = append(arr, r.Intn(30000000))
	}
	start := time.Now().UTC().UnixNano() / 1e6
	fmt.Print(fmt.Sprintf("生成随机数组成功! 一共%d位\n", len(arr)))
	// 插入排序
	insertSort(arr)

	// 归并排序
	// mergeSort(arr, 0, len(arr)-1)

	end := time.Now().UTC().UnixNano() / 1e6
	fmt.Print(fmt.Sprintf("插入排序成功, 花费时间%dms!\n", end-start))
	// fmt.Print(fmt.Sprintf("归并排序成功, 花费时间%dms!\n", end-start))

	// list2 := []int{2, 4, 6, 8, 10, 1, 3, 5, 7, 9}
	// fmt.Print("测试合并两个位置已经排好序的数组！\n")
	// fmt.Print(merge(list2, 0, 4, 9), "\n")

	// fmt.Print(fmt.Sprintf("\n归并排序成功, 花费时间%dms!\n", 1))
	// fmt.Print(arr, "\n")
	// mergeSort(arr, 0, len(arr)-1)
	// fmt.Print(arr, "\n")
}

// 插入排序  时间复杂度 Tn = n²
func insertSort(list []int) {
	// fmt.Print("\n")
	// fmt.Print(list)
	arr := list
	for j := 2; j < len(arr); j++ {
		key := arr[j]
		i := j - 1
		for {
			if i < 0 || arr[i] < key {
				break
			}
			arr[i+1] = arr[i]
			i--
		}
		arr[i+1] = key
	}
	// fmt.Print("\n")
	// fmt.Print(arr)
}

// 分治模式
// 分解原问题为若干子问题
// 分别求解
// 然后合并
func merge(list []int, p int, q int, r int) {
	// fmt.Print(list, "\n")
	// 分别生成两个已经排好序的切片
	arr1 := make([]int, q-p+1)
	arr2 := make([]int, r-q)

	arr := list[p : q+1]
	copy(arr1, arr)
	arr = list[q+1 : r+1]
	copy(arr2, arr)
	// 添加哨兵变量 无穷大的值
	arr1 = append(arr1, 1000000000)
	arr2 = append(arr2, 1000000000)
	i := 0
	j := 0
	for k := p; k <= r; k++ {
		if arr1[i] <= arr2[j] {
			list[k] = arr1[i]
			i++
		} else {
			list[k] = arr2[j]
			j++
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
