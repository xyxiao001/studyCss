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
	sum := 5000
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	for index := 0; index < sum; index++ {
		// 因为slice 是一个引用类似，支持自动扩容，切片扩容以后地址也发生了改变，所以我们要重新赋值给这个变量  
		arr = append(arr, r.Intn(300000))
	}
	start := time.Now().UTC().UnixNano() / 1e6
	fmt.Print(fmt.Sprintf("生成随机数组成功! 一共%d位\n", len(arr)))
	// 执行排序
	insertSort(arr)

	end := time.Now().UTC().UnixNano() / 1e6
	fmt.Print(fmt.Sprintf("插入排序成功, 花费时间%dms!\n", end - start))
}

func insertSort(list []int) {
	// fmt.Print(list)
	arr := list
	i := 0
	key := 0
	for j := 1; j < len(list); {
		key = arr[j]
		i = j - 1
		for {
			if i < 0 || arr[i] < key {
				break
			}
			arr[i + 1] = arr[i]
			i--
		}
		j++
    arr[i + 1] = key
	}
	// fmt.Print(arr)
}
