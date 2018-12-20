# 算法导论  => 第二章  => 插入排序
import random
import time
print("正在生成随机数组...")
arr = random.sample(range(1, 300000), 10000)
# arr = [5, 3]
print("随机数组生成成功！一共%d个"%(len(arr)))

# 插入排序
def insertSort(list):
  # print(list)
  # print("-------\n\n\n")
  arr = list
  j = 1
  while j < len(arr):
    key = arr[j]
    i = j - 1
    while i >= 0 and arr[i] > key:
      arr[i + 1] = arr[i]
      i = i - 1
    j = j + 1
    arr[i + 1] = key
  # print(arr)

start = time.perf_counter()

insertSort(arr)

end = time.perf_counter()

print("插入排序数组%d个, 耗时%ss"%(len(arr), (end - start)))