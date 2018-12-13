const addImg = (img) => {
    const imgDom = new Image;
    const info = {
        img: img,
        dom: imgDom,
        width: 0,
        height: 0,
        type: ''
    };
    return new Promise((reslove, reject) => {
        imgDom.onload = () => {
            info.width = imgDom.width;
            info.height = imgDom.height;
            info.type = 'success';
            reslove(info);
        };
        imgDom.onerror = () => {
            info.type = 'error';
            reject(info);
        };
        imgDom.crossOrigin = 'anonymous';
        imgDom.src = img;
        info.dom = imgDom;
    });
};
let show = (src) => { };
const uploadImg = (e) => {
    //上传图片
    var file = e.target.files[0];
    if (!/\.(gif|jpg|jpeg|png|bmp|GIF|JPG|PNG)$/i.test(e.target.value)) {
        alert("图片类型必须是.gif,jpeg,jpg,png,bmp中的一种");
        return false;
    }
    var reader = new FileReader();
    reader.onload = (e) => {
        let data;
        data = window.URL.createObjectURL(new Blob([e.target.result]));
        let img1 = document.querySelector('#img1');
        if (img1) {
            img1.src = data;
        }
        let img2 = document.querySelector('#img2');
        if (img2) {
            img2.src = data;
        }
        show(data);
    };
    // 转化为base64
    // reader.readAsDataURL(file)
    // 转化为blob
    reader.readAsArrayBuffer(file);
};
const initWorker = (func) => {
    const blob = new Blob([`(function () {${func}}())`]);
    const url = window.URL.createObjectURL(blob);
    return new Worker(url);
};
document.querySelector('#file').addEventListener('change', uploadImg);
