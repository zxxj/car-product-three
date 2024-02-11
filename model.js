import * as THREE from 'three';
import { handleLoad } from './loadGLTF.js';
import { updateModelMaterial } from './updateModelMaterial.js';
import { createPointsTag } from './createPointsTag.js';
import { open } from './open.js';

const model = new THREE.Group();

// 加载完毕获取模型
const gltf = await handleLoad('/public/gltf/轿车.glb');

// 修改模型中所需要手动修改的材质
updateModelMaterial(gltf);

// 标注热点
createPointsTag(gltf);

// 打开/关闭车门
open(gltf);

// 通过矩形平面创建一个地面
const planGemotery = new THREE.PlaneGeometry(6000, 6000);

// 加载纹理贴图
const texture = new THREE.TextureLoader().load('./assets/瓷砖.jpg');

// 设置阵列
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;

// 设置uv两个方向的纹理贴图重复数量(阵列数量	)
texture.repeat.set(12, 12);
// 地面材质
const materila = new THREE.MeshLambertMaterial({
  map: texture,
});

// 创建地面网格模型
const ground = new THREE.Mesh(planGemotery, materila);
ground.rotateX(-Math.PI / 2);
model.add(ground);

// 将gltf.scene中的所有模型添加到model组对象中
model.add(gltf.scene);

export { model };
