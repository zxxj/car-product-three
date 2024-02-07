// 用于修改模型中的材质
import * as THREE from 'three';

// 加载环境贴图
const textureloader = new THREE.CubeTextureLoader()
  .setPath('./assets/envMap/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

const updateModelMaterial = (object) => {
  console.log(object);

  // 遍历所有Mesh批量设置环境贴图
  object.scene.traverse((obj) => {
    // 为模型中所有的Mesh批量设置环境贴图
    if (obj.type === 'Mesh') obj.material.envMap = textureloader;

    // 为车辆中的几个需要高量金属设置粗糙度和金属度(轮毂,前脸,车顶两侧)
    if (obj.name.slice(0, 4) == '高光金属') {
      obj.material = new THREE.MeshStandardMaterial({
        roughness: 0.1, // 粗糙度
        metalness: 1, // 金属度
        envMapIntensity: 1.0, // 控制环境贴图的强度
      });
    }

    // 为后视镜设置粗糙度与金属度
    if (obj.name.slice(0, 3) === '后视镜') {
      obj.material = new THREE.MeshStandardMaterial({
        roughness: 0.0, // 粗糙度为0.0就相当于完全镜面反射效果
        metalness: 1.0, // 金属度
        envMapIntensity: 1.0, // 控制环境贴图的强度
      });
    }
  });
};

export { updateModelMaterial };
