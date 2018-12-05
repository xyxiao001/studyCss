/*
算法原理： 
  这就是通过调色使照片显得发黄。
  R_new= 0.393 * R + 0.769 * G + 0.189 * B;

  G_new= 0.349 * R + 0.686 * G + 0.168 * B;

  B_new= 0.272 * R + 0.534 * G + 0.131 * B;
*/
 show = (src:string):void => {
  addImg(src).then((info: Imginfo) => {
    console.log(info)
    let start: number = 0
    let end: number = 0
    start = window.performance.now();
    oldPhoto(info)
    end = window.performance.now();
    console.log(`老照片算法耗时${end - start}ms`)
  }).catch((error: Imginfo) => {
    console.log(error)
  })
}

 const oldPhoto = (obj: Imginfo):void => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = obj.width
  canvas.height =  obj.height
  ctx.drawImage(obj.dom, 0, 0)
  // 获取图片的像素点 rgba

  let weiData = ctx.getImageData(0, 0, obj.width, obj.height)
  let gray:number = 0;
  // 微软算法  简单的灰度除以3
  let i = 0;
  console.log(weiData);
  while (i < obj.width * obj.height * 4) {
    const r:number = weiData.data[i]
    const g:number = weiData.data[i + 1]
    const b:number = weiData.data[i + 2]
    weiData.data[i] = 0.393 * r + 0.769 * g + 0.189 * b
    weiData.data[i + 1] = 0.349 * r + 0.686 * g + 0.168 * b
    weiData.data[i + 2 ] = 0.272 * r + 0.543 * g + 0.131 * b
    i += 4
  }
  ctx.putImageData(weiData, 0, 0);
  document.querySelector('.oldphoto .img').innerHTML = ''
  document.querySelector('.oldphoto .img').appendChild(canvas);
}

show('http://cdn.xyxiao.cn/bg10.jpg')
