/*
这里的黑白图片，跟灰度不一样。灰度有256种颜色，而黑白则是只保留黑和白这两种颜色，看了后面的对比处理图片就能明白了。
黑白图片的处理算法更简单：
求RGB平均值Avg ＝ (R + G + B) / 3，如果Avg >= 100，则新的颜色值为R＝G＝B＝255；如果Avg < 100，则新的颜色值为R＝G＝B＝0；255就是白色，0就是黑色；至于为什么用100作比较，这是一个经验值吧，设置为128也可以，可以根据效果来 调整。
  */
show = (src) => {
    addImg(src).then((info) => {
        console.log(info);
        let start = 0;
        let end = 0;
        start = window.performance.now();
        blackAndWhiteWei(info);
        end = window.performance.now();
        console.log(`黑白算法微软耗时${end - start}ms`);
        start = window.performance.now();
        blackAndWhiteMatLab(info);
        end = window.performance.now();
        console.log(`黑白算法MATLAB耗时${end - start}ms`);
        start = window.performance.now();
        blackAndWhitePs(info);
        end = window.performance.now();
        console.log(`黑白算法ps耗时${end - start}ms`);
    }).catch((error) => {
        console.log(error);
    });
};
const blackAndWhiteWei = (obj) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = obj.width;
    canvas.height = obj.height;
    ctx.drawImage(obj.dom, 0, 0);
    // 获取图片的像素点 rgba
    let weiData = ctx.getImageData(0, 0, obj.width, obj.height);
    let gray = 0;
    // 微软算法  简单的灰度除以3
    let i = 0;
    while (i < obj.width * obj.height * 4) {
        const r = weiData.data[i];
        const g = weiData.data[i + 1];
        const b = weiData.data[i + 2];
        gray = ~~((r + g + b) / 3) > 128 ? 255 : 0;
        weiData.data[i] = gray;
        weiData.data[i + 1] = gray;
        weiData.data[i + 2] = gray;
        i += 4;
    }
    ctx.putImageData(weiData, 0, 0);
    document.querySelector('.wei .img').innerHTML = '';
    document.querySelector('.wei .img').appendChild(canvas);
};
const blackAndWhiteMatLab = (obj) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = obj.width;
    canvas.height = obj.height;
    ctx.drawImage(obj.dom, 0, 0);
    // 获取图片的像素点 rgba
    let weiData = ctx.getImageData(0, 0, obj.width, obj.height);
    let gray = 0;
    let i = 0;
    while (i < obj.width * obj.height * 4) {
        const r = weiData.data[i];
        const g = weiData.data[i + 1];
        const b = weiData.data[i + 2];
        gray = ~~(0.2989 * r + 0.5870 * g + 0.1140 * b) > 128 ? 255 : 0;
        weiData.data[i] = gray;
        weiData.data[i + 1] = gray;
        weiData.data[i + 2] = gray;
        i += 4;
    }
    ctx.putImageData(weiData, 0, 0);
    document.querySelector('.matlab .img').innerHTML = '';
    document.querySelector('.matlab .img').appendChild(canvas);
};
const blackAndWhitePs = (obj) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = obj.width;
    canvas.height = obj.height;
    ctx.drawImage(obj.dom, 0, 0);
    // 获取图片的像素点 rgba
    let psData = ctx.getImageData(0, 0, obj.width, obj.height);
    let gray = 0;
    // ps算法
    // gray = (max - mid) * ratioMax + (mid - min) * ratioMaxMid + min
    let r = 0;
    let g = 0;
    let b = 0;
    let max = 0;
    let min = 0;
    let mid = 0;
    let ratioMax = 0;
    let ratioMaxMid = 0;
    // 红、黄、 绿、 青、 蓝、紫六个通道
    // y = r + g
    // q = g + b
    // z = r + b
    let ratio = [0.4, 0.6, 0.4, 0.6, 0.2, 0.8];
    let i = 0;
    while (i < obj.width * obj.height * 4) {
        r = psData.data[i];
        g = psData.data[i + 1];
        b = psData.data[i + 2];
        // 得到最大的值
        max = Math.max(r, g, b);
        // 得到最小值
        min = Math.min(r, g, b);
        // 得到中位值
        mid = r + g + b - max - min;
        if (max === r) {
            ratioMax = ratio[0];
        }
        if (max === g) {
            ratioMax = ratio[2];
        }
        if (max === b) {
            ratioMax = ratio[4];
        }
        if (min === r) {
            ratioMaxMid = ratio[3];
        }
        if (min === g) {
            ratioMaxMid = ratio[1];
        }
        if (min === b) {
            ratioMaxMid = ratio[5];
        }
        gray = (max - mid) * ratioMax + (mid - min) * ratioMaxMid + min;
        gray = gray > 128 ? 255 : 0;
        psData.data[i] = gray;
        psData.data[i + 1] = gray;
        psData.data[i + 2] = gray;
        i += 4;
    }
    ctx.putImageData(psData, 0, 0);
    document.querySelector('.ps .img').innerHTML = '';
    document.querySelector('.ps .img').appendChild(canvas);
};
show('http://cdn.xyxiao.cn/bg10.jpg');
