# -*- coding: utf-8 -*-
# 公共组件依赖分析
import os
import re
import time


componentName = 'we-dialog.vue'

start = time.perf_counter()
filePath = "./src/pages"
filePath2 = "./src/components"
writeFileName = './readFile.txt'
componentName = componentName.replace('.vue', '')
relyOn = 0
totalFile = 0
fileLine = 0

# 默认执行时先清空txt文件
txt = open(writeFileName, 'w')
txt.write('开始查找公共组件 %s 的依赖分析\r\n\r\n'%(componentName))
txt.close()

# 循环读取文件下层目录
def eachFile(filepath, index, name, queen):
  # 读取所有目录
  pathDir = os.listdir(filepath)
  # 对文件目录进行排序
  pathDir.sort() 
  txt = open(writeFileName, 'a')
  # print pathDir
  for allDir in pathDir:
    # 读取文件，文件路径拼接
    child = os.path.join('%s/%s' % (filepath, allDir))
    # 获取到所有目录, 然后然后查找目录下面的所有文件 如果有目录继续查找目录
    if os.path.isdir(child):
      eachFile(child, index + 1, name, queen)
    elif os.path.isfile(child):
      # 如果是文件
      # 读取当前文件 查看是否引入了公告组件
      global totalFile
      global fileLine
      totalFile += 1
      son = open(child, 'r')
      for line in son:
        fileLine += 1
        # 循环文本, 判断是否符合导入公告组件  条件 这一行存在import 同时拥有组件
        shortPath = name.replace("./src", "")
        if re.search('import', line) and re.search(shortPath, line):
          global relyOn
          relyOn += 1
          txt.write("这是第%d层目录的文件\r\n" % (index))
          txt.write("%s  ===>  %s  "%(queen, child)  + '\r\n\r\n')
          print(child)
          # 然后拿到上层文件依赖 继续递归分析
          eachFile(filePath, index + 1, child, "%s  ===>  %s  "%(queen, child))
          eachFile(filePath2, index + 1, child, "%s  ===>  %s  "%(queen, child))
          break
      son.close()
    else:
      print("出错了，不是文件，也不是目录")
  txt.close()

print("公共组件%s依赖分析中..."%(componentName))
eachFile(filePath, 1, componentName, componentName)
eachFile(filePath2, 1, componentName, componentName)
end = time.perf_counter()
print ("公共组件%s依赖分析成功! 读取文件个数%d，遍历文件%d行，耗时%ss， 共有%d个文件的使了该公共组件"%(componentName, totalFile, fileLine, (end-start), relyOn))