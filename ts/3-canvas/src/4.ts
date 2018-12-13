/*
  图片对比度算法
*/
show = (src:string):void => {
  addImg(src).then((info: Imginfo) => {
    console.log(info)
    let start: number = 0
    let end: number = 0
    start = window.performance.now();
    contrastRadio(info)
    end = window.performance.now();
    console.log(`对比度算法耗时${end - start}ms`)
  }).catch((error: Imginfo) => {
    console.log(error)
  })
}

 const contrastRadio = (obj: Imginfo):void => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = obj.width
  canvas.height =  obj.height
  ctx.drawImage(obj.dom, 0, 0)
  // 获取图片的像素点 rgba
  let weiData = ctx.getImageData(0, 0, obj.width, obj.height)
  let i = 0;
  while (i < obj.width * obj.height * 4) {
    const r:number = weiData.data[i]
    const g:number = weiData.data[i + 1]
    const b:number = weiData.data[i + 2]
    // 处理数据
    i += 4
  }
  ctx.putImageData(weiData, 0, 0);
  document.querySelector('.contrast-photo .img').innerHTML = ''
  document.querySelector('.contrast-photo .img').appendChild(canvas);
}

show('http://cdn.xyxiao.cn/bg10.jpg')
