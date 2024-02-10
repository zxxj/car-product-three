import * as THREE from 'three';
import { OrbitControls } from './examples/jsm/controls/OrbitControls.js';
import { camera, renderer } from './cameraRenderer.js';
import { model } from './model.js';

// 场景
const scene = new THREE.Scene();

const textureloader = new THREE.CubeTextureLoader()
  .setPath('./assets/envMap/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

// 添加环境贴图
scene.environment = textureloader;
// 将纹理贴图编码方式设置为与WebGL渲染器的编码方式一致
textureloader.colorSpace = THREE.SRGBColorSpace;

scene.add(model);

// 环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 2);
scene.add(ambientLight);

// 平行光
const directionLight1 = new THREE.DirectionalLight(0xffffff, 2);
directionLight1.position.set(400, 200, 300);
scene.add(directionLight1);

const directionLight2 = new THREE.DirectionalLight(0xffffff, 1);
directionLight2.position.set(-400, -200, -300);
scene.add(directionLight2);

// 坐标轴辅助器
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

// 轨道控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 设置模型最大状态
controls.maxDistance = 1200;
// 设置模型最小状态
controls.minDistance = 500;
// 轨道控制器上下旋转最的最大值
controls.maxPolarAngle = (Math.PI / 2) * 0.9;

export { scene };
