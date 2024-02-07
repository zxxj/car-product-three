import * as THREE from 'three';
import { resize } from './resize.js';

// 相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  2000
);
// 相机位置
camera.position.set(-379, 165, 500);
// 相机指向Three.js坐标系原点
camera.lookAt(0, 0, 0);

// 渲染器
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace; //解决加载gltf格式模型纹理贴图和原图不一样问题
document.body.appendChild(renderer.domElement);
resize();

export { camera, renderer };
