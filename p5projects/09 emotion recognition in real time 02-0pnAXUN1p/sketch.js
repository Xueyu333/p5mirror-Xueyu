// 定义全局变量
let capture;                    // 用于存储视频捕获对象
let captureWidth = 640;        // 设置视频宽度
let captureHeight = 480;       // 设置视频高度
let emotions = ["neutral", "happy", "sad", "angry", "fearful", "disgusted", "surprised"];  // 定义可识别的表情数组
let faceapi;                   // 存储面部识别API对象
let detections = [];           // 存储检测到的面部数据
let numBlinds = 10;           // 设置百叶窗的数量
let scales = Array(numBlinds).fill(1);  // 创建一个数组，初始值都是1，用于存储每个百叶窗的缩放比例
let smileThreshold = 0.5;      // 设置笑容识别的阈值，超过这个值认为在笑
let animationSpeed = 0.1;      // 设置动画速度，值越大动画越快

// 初始化设置
function setup() {
    // 创建画布，使用WEBGL模式支持3D变换
    createCanvas(captureWidth, captureHeight, WEBGL);
    
    // 创建视频捕获对象
    capture = createCapture(VIDEO);
    capture.size(captureWidth, captureHeight);  // 设置视频大小
    capture.hide();  // 隐藏默认的视频元素
    
    // 配置人脸识别选项
    const faceOptions = { 
        withLandmarks: true,     // 检测面部特征点
        withExpressions: true,   // 检测表情
        withDescriptors: false   // 不需要面部描述符
    };
    
    // 初始化人脸识别API
    faceapi = ml5.faceApi(capture, faceOptions, faceReady);
}

// 人脸识别准备就绪的回调函数
function faceReady() {
    faceapi.detect(gotFaces);  // 开始检测人脸
}

// 获取到人脸数据的回调函数
function gotFaces(error, result) {
    if (error) {
        console.log(error);
        return;
    }
    detections = result;  // 保存检测结果
    faceapi.detect(gotFaces);  // 继续检测下一帧
}

// 每帧绘制
function draw() {
    background(0);  // 设置黑色背景
    
    // 绘制摄像头画面
    push();  // 保存当前变换状态
    translate(-captureWidth/2, -captureHeight/2);  // 移动坐标系到左上角
    image(capture, 0, 0, captureWidth, captureHeight);  // 绘制视频画面
    pop();  // 恢复之前的变换状态
    
    // 获取笑容值（如果检测到人脸）
    let smileValue = detections.length > 0 ? detections[0].expressions.happy : 0;
    
    // 根据笑容值决定百叶窗是否打开
    let targetScale = smileValue > smileThreshold ? 0 : 1;  // 笑容值大于阈值时缩放到0（打开）
    
    // 更新每个百叶窗的缩放值
    for (let i = 0; i < numBlinds; i++) {
        // 使用lerp函数实现平滑过渡
        scales[i] = lerp(scales[i], targetScale, animationSpeed);
    }
    
    // 绘制百叶窗
    drawBlinds();
}

// 绘制百叶窗的函数
function drawBlinds() {
    let blindWidth = captureWidth / numBlinds;  // 计算每个百叶窗的宽度
    
    // 绘制每一个百叶窗
    for (let i = 0; i < numBlinds; i++) {
        let x = i * blindWidth - captureWidth/2 + blindWidth/2;  // 计算每个百叶窗的x坐标
        let scaleFactor = scales[i];  // 获取当前百叶窗的缩放值
        
        // 如果百叶窗几乎完全缩放到0，就跳过绘制
        if (scaleFactor < 0.01) continue;
        
        push();  // 保存当前变换状态
        translate(x, 0, 0);  // 移动到正确的位置
        scale(scaleFactor, 1, 1);  // 应用缩放变换
        fill(50);  // 设置灰色填充
        // noStroke();  // 无边框
        rect(-blindWidth/2, -captureHeight/2, blindWidth, captureHeight);  // 绘制矩形
        pop();  // 恢复变换状态
    }
}