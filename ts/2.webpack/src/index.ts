const sum = (a:number, b:number):number => a + b
sum(5, 5)

// 我们定义一个图片裁剪插件
interface CropInterface {
  dom: HTMLElement;
  img: string;
  imgDom: HTMLElement;
  width: number;
  height: number;
}

class Crop implements CropInterface {
  dom: HTMLElement;
  img: string;
  imgDom: HTMLImageElement;
  width: number;
  height: number;

  constructor(dom: HTMLElement,) {
    this.dom = dom;
    this.init();
  }

  init () {
    this.loadImg();
  }

  loadImg () {
    this.imgDom = new Image;
    this.imgDom.onload = ():void => {
      this.width = this.imgDom.width;
      this.height = this.imgDom.height;
    };

    this.imgDom.onerror = ():void => {
      throw new Error('img load fail')
    };
    this.imgDom.src = this.img;
  }

  getCropData () {
    const canvas = document.createElement('canvas');
    return new Promise((reslove: Function, reject: Function) => {
      try {
        canvas.toBlob(
          blob => reslove(blob),
          'image/png',
          1
        );
      } catch {
        reject('获取截图数据失败');
      }
    })
  }
}


const imgDom = document.createElement('section');

const imgCrop = new Crop(imgDom);

console.log(imgCrop);