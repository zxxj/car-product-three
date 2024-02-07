import * as THREE from 'three';
import { handleLoad } from './loadGLTF.js';
import { updateModelMaterial } from './updateModelMaterial.js';

const model = new THREE.Group();

// 加载完毕获取模型
const gltf = await handleLoad('/public/gltf/轿车.glb');

// 修改模型中所需要手动修改的材质
updateModelMaterial(gltf);

// 将gltf.scene中的所有模型添加到model组对象中
model.add(gltf.scene);

export { model };
