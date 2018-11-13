const sum = (a:number, b:number):number => a + b
sum(5, 5)

// 我们定义一个图片裁剪插件

// 默认接口数据
interface CropInterface {
  dom: HTMLElement;
  img: string;
  imgDom: HTMLElement;
  width: number;
  height: number;
  loadImg(): void;
  getCropData():void;
}

// 坐标接口
interface Axis {
  imgX: number;
  imgY: number;
  cropX: number
  cropY: number;
}

class Crop implements CropInterface, Axis {
  dom: HTMLElement;
  img: string;
  imgDom: HTMLImageElement;
  width: number;
  height: number;
  imgX: number;
  imgY: number;
  cropX: number;
  cropY: number;

  constructor(dom: HTMLElement, img: string) {
    this.dom = dom;
    this.img = img;
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


const cropDom = document.createElement('section');

const imgCrop = new Crop(cropDom, 'https://avatars2.githubusercontent.com/u/15681693?s=460&v=4');

console.log(imgCrop);


// 比如现在写一个从列表里面获取满足条件的用户信息

interface Userinfo {
  id: string;
  name: string;
}

const getUserInfo = (list:Array<Userinfo>, id:string):Array<Userinfo> => {
  return list.filter((item) => item.id === id);
}

const list = [
  {
    id: '1',
    name: '1',
  },
  {
    id: '2',
    name: '2',
  }
];

const list2 = [
  {
    id: '1',
  },
  {
    id: '2',
  }
];

console.log(getUserInfo(list, '1'))
// console.log(getUserInfo(list2, '1'))



// let user = {
//   name: '小明',
//   age: 15,
// }

let user = 1;

// console.log(user.name);