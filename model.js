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
  // 为Mesh批量设置环境贴图
  if (obj.type === 'Mesh') obj.material.envMap = textureloader;

  // 为车辆中的几个需要高量金属设置粗糙度和金属度(轮毂,前脸,车顶两侧)
  if (obj.name.slice(0, 4) == '高光金属') {
    obj.material = new THREE.MeshStandardMaterial({
      roughness: 0.1, // 粗糙度
      metalness: 1, // 金属度
    });
  }
});

// 将gltf.scene中的所有模型添加到model组对象中
model.add(gltf.scene);

export { model };
