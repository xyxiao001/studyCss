// 图片信息接口
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

let show = (src:string) => {}

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
    if (img1) {
      img1.src = data
    }
    let img2: HTMLImageElement = document.querySelector('#img2')
    if (img2) {
      img2.src = data
    }
    show(data)
  };
  // 转化为base64
  // reader.readAsDataURL(file)
  // 转化为blob
  reader.readAsArrayBuffer(file);
}

document.querySelector('#file').addEventListener('change', uploadImg);