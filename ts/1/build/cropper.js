class Crop {
    constructor(dom, img) {
        this.dom = dom;
        this.img = img;
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
export default Crop;
