import * as THREE from 'three';

// 创建一个监听者
const listener = new THREE.AudioListener();

// 创建一个非位置音频对象, 用来控制播放状态
const openSound = new THREE.Audio(listener); // 开门音频对象
const closeSound = new THREE.Audio(listener); // 关门音频对象
const backgroundSound = new THREE.Audio(listener); // 关门音频对象

// 创建一个音频加载器对象
const audioLoader = new THREE.AudioLoader();

// 加载开门音频
audioLoader.load('./assets/open.wav', (buffer) => {
  openSound.setBuffer(buffer);
  openSound.setVolume(0.4); // 设置播放音量
});

// 加载关门音频
audioLoader.load('./assets/close.wav', (buffer) => {
  closeSound.setBuffer(buffer);
  closeSound.setVolume(0.4); // 设置播放音量
});

// 加载背景音乐
audioLoader.load('./assets/背景.wav', (buffer) => {
  backgroundSound.setBuffer(buffer);
  backgroundSound.setVolume(0.4); // 设置播放音量
  backgroundSound.setLoop(true); //设置循环播放
});

export { openSound, closeSound, backgroundSound };
