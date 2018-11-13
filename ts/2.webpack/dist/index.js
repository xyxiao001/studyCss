const sum = (a, b) => a + b;
sum(5, 5);
class Crop {
    constructor(dom) {
        this.dom = dom;
        this.init();
    }
    init() {
        this.loadImg();
    }
    loadImg() {
        this.imgDom = new Image;
        this.imgDom.onload = () => {
            this.width = this.imgDom.width;
            this.height = this.imgDom.height;
        };
        this.imgDom.onerror = () => {
            throw new Error('img load fail');
        };
        this.imgDom.src = this.img;
    }
    getCropData() {
        const canvas = document.createElement('canvas');
        return new Promise((reslove, reject) => {
            try {
                canvas.toBlob(blob => reslove(blob), 'image/png', 1);
            }
            catch (_a) {
                reject('获取截图数据失败');
            }
        });
    }
}
const getUserInfo = (list, id) => {
    return list.filter((item) => item.id === id);
};
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
console.log(getUserInfo(list, '1'));
//# sourceMappingURL=index.js.map