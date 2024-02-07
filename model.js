import * as THREE from 'three';
import { handleLoad } from './loadGLTF.js';

const model = new THREE.Group();

// 加载环境贴图
const textureloader = new THREE.CubeTextureLoader()
  .setPath('./assets/envMap/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

// 加载完毕获取模型
const gltf = await handleLoad('/public/gltf/轿车.gltf');

// 遍历所有Mesh批量设置环境贴图
gltf.scene.traverse((obj) => {
  if (obj.type === 'Mesh') obj.material.envMap = textureloader;
});

// 将gltf.scene中的所有模型添加到model组对象中
model.add(gltf.scene);

export { model };
