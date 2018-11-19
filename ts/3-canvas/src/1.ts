/*
  ps图片算法之黑白
  ps通过对红、黄、绿、青、蓝和洋红等6种颜色的比例来黑白化图片：
  gray= (max - mid) * ratio_max + (mid - min) * ratio_max_mid + min
  gray ：像素的灰度值，不是真的灰色哈。
  max : 像素点R、G、B三色中的最大者
  mid：像素点R、G、B三色中的中间者
  min：像素点R、G、B三色中的最小者
  ratio_max：最大的颜色所占比率
  ratio_max_mid：最大的颜色和中间颜色 合成颜色所占的比率

  这六种颜色在ps中默认比例为：
  y = r + g
  q = g + b
  z = r + b
  redRadio = 40%;
  yellowRadio = 60%;
  greenRadio = 40%;
  cyanRadio = 60%;
  blueRadio = 20%;
  magentaRadio = 80%;

  微软算法  r + g + b / 3

  matlab算法 Gray = 0.2989 * R + 0.5870 * G + 0.1140 * B
  */

// 首先通过canvas读取到图片信息
interface Imginfo {
  img: string
  dom: HTMLImageElement
  width: number
  height: number
  type: string
}

const addImg = (img: string):Promise<Imginfo> => {
  const imgDom = new Image
  const info:Imginfo = {
    img: img,
    dom: imgDom,
    width: 0,
    height: 0,
    type: ''
  }
   return new Promise((reslove: Function, reject: Function):void => {
     imgDom.onload = () => {
       info.width = imgDom.width
       info.height = imgDom.height
       info.type = 'success'
       reslove(info)
     }

     imgDom.onerror = () => {
       info.type = 'error'
       reject(info)
     }
     imgDom.crossOrigin = 'anonymous'
     imgDom.src = img
     info.dom = imgDom
   })
}


const show = (src:string):void => {
  addImg(src).then((info: Imginfo) => {
    console.log(info)
    let start: number = 0
    let end: number = 0
    start = window.performance.now();
    grayscaleImgWei(info)
    end = window.performance.now();
    console.log(`简单的取平均值的黑白算法耗时${end - start}ms`)

    start = window.performance.now();
    grayscaleImgMatLab(info)
    end = window.performance.now();
    console.log(`matlab的黑白算法耗时${end - start}ms`)

    start = window.performance.now();
    grayscaleImgPS(info)
    end = window.performance.now();
    console.log(`ps黑白算法 ${end - start}ms`)
  }).catch((error: Imginfo) => {
    console.log(error)
  })
}

const uploadImg = (e:any) => {
  //上传图片
  var file = e.target.files[0];
  if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/i.test(e.target.value)) {
    alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
    return false;
  }
  var reader = new FileReader();
  reader.onload = (e:any) => {
    let data;
    data = window.URL.createObjectURL(new Blob([e.target.result]));
    let img1:HTMLImageElement = document.querySelector('#img1')
    img1.src = data
    let img2: HTMLImageElement = document.querySelector('#img2')
    img2.src = data
    show(data)
  };
  // 转化为base64
  // reader.readAsDataURL(file)
  // 转化为blob
  reader.readAsArrayBuffer(file);
}

document.querySelector('#file').addEventListener('change', uploadImg);
show('http://cdn.xyxiao.cn/bg10.jpg')

const grayscaleImgWei = (obj: Imginfo):void => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = obj.width
  canvas.height =  obj.height
  ctx.drawImage(obj.dom, 0, 0)
  // 获取图片的像素点 rgba

  let weiData = ctx.getImageData(0, 0, obj.width, obj.height)
  let gray:number = 0;
  // 微软算法  简单的灰度除以3
  for (let i = 0; i < obj.width * obj.height * 4; i += 4) {
    const r:number = weiData.data[i]
    const g:number = weiData.data[i + 1]
    const b:number = weiData.data[i + 2]
    gray = ~~(r + g + b) / 3
    weiData.data[i] = gray
    weiData.data[i + 1] = gray
    weiData.data[i + 2 ] = gray
  }
  ctx.putImageData(weiData, 0, 0);
  document.querySelector('.wei .img').innerHTML = ''
  document.querySelector('.wei .img').appendChild(canvas);
}


const grayscaleImgMatLab = (obj: Imginfo):void => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = obj.width
  canvas.height =  obj.height
  ctx.drawImage(obj.dom, 0, 0)
  // 获取图片的像素点 rgba
  let weiData = ctx.getImageData(0, 0, obj.width, obj.height)
  let gray:number = 0;
  for (let i = 0; i < obj.width * obj.height * 4; i += 4) {
    const r:number = weiData.data[i]
    const g:number = weiData.data[i + 1]
    const b:number = weiData.data[i + 2]
    gray = ~~(0.2989 * r + 0.5870 * g + 0.1140 * b )
    weiData.data[i] = gray
    weiData.data[i + 1] = gray
    weiData.data[i + 2 ] = gray
  }
  ctx.putImageData(weiData, 0, 0);
  document.querySelector('.matlab .img').innerHTML = ''
  document.querySelector('.matlab .img').appendChild(canvas);
}

const grayscaleImgPS = (obj: Imginfo): void => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = obj.width
  canvas.height = obj.height
  ctx.drawImage(obj.dom, 0, 0)
  // 获取图片的像素点 rgba
  let psData = ctx.getImageData(0, 0, obj.width, obj.height)
  let gray: number = 0;
  // ps算法
  // gray = (max - mid) * ratioMax + (mid - min) * ratioMaxMid + min
  let r: number = 0
  let g: number = 0
  let b: number = 0
  let max: number = 0
  let min: number = 0
  let mid: number = 0
  let ratioMax:number = 0
  let ratioMaxMid:number = 0
  // 红、黄、 绿、 青、 蓝、紫六个通道
  // y = r + g
  // q = g + b
  // z = r + b
  let ratio:number[] = [0.4, 0.6, 0.4, 0.6, 0.2, 0.8]
  for (let i = 0; i < obj.width * obj.height * 4; i += 4) {
    r = psData.data[i]
    g = psData.data[i + 1]
    b = psData.data[i + 2]
    // 得到最大的值
    max = Math.max(r, Math.max(g, b))
    // 得到最小值
    min = Math.min(r, Math.min(g, b))
    // 得到中位值
    mid = r + g + b - max -min

    if (max === r) {
      ratioMax = ratio[0]
    }

    if (max === g) {
      ratioMax = ratio[2]
    }

    if (max === b) {
      ratioMax = ratio[4]
    }


    if (r === min) {
      ratioMaxMid = ratio[3]
    }

    if (g === min) {
      ratioMaxMid = ratio[1]
    }

    if (b === min) {
      ratioMaxMid = ratio[5]
    }

    gray = (max - mid) * ratioMax + (mid - min) * ratioMaxMid + min
    psData.data[i] = gray
    psData.data[i + 1] = gray
    psData.data[i + 2] = gray
  }
  ctx.putImageData(psData, 0, 0);
  document.querySelector('.ps .img').innerHTML = ''
  document.querySelector('.ps .img').appendChild(canvas);
}