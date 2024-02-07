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

    // 为车玻璃设置透明度
    if (obj.name.slice(0, 2) === '玻璃' || obj.name === '天窗黑玻璃') {
      obj.material = new THREE.MeshPhysicalMaterial({
        transparent: true,
        transmission: 1,
        roughness: 0.0,
        envMapIntensity: 3.0, // 控制环境贴图的强度
      });
    }

    // 为车外壳设置清漆层效果
    if (obj.name.slice(0, 2) === '外壳') {
      obj.material = new THREE.MeshPhysicalMaterial({
        color: 0x00000, // 车外壳的颜色
        clearcoat: 1, // 车外壳表面的清漆层的厚度
        clearcoatRoughness: 0.01, // 清漆层表面的粗糙度
      });
    }

    // 为模型中的橡胶部分设置粗糙度与金属度和颜色
    if (obj.name.slice(0, 3) === '橡胶圈') {
      obj.material = new THREE.MeshPhysicalMaterial({
        color: obj.material.color,
        roughness: 0.8,
        metalness: 1,
        clearcoat: 1, // 清漆层的厚度
        clearcoatRoughness: 0.01, // 清漆层表面的粗糙度
        envMapIntensity: 1.0, // 控制环境贴图的强度
      });
    }

    // 为车模型中塑料部分设置金属度与粗糙度和颜色
    if (obj.name.slice(1, 3) === '塑料') {
      obj.material = new THREE.MeshPhysicalMaterial({
        color: 0x000000,
        roughness: 0.8,
        metalness: 1,
        envMapIntensity: 1.0, // 控制环境贴图的强度
      });
    }

    // 为车前灯设置透明度与其他效果
    if (obj.name.slice(0, 3) === '前灯罩') {
      obj.material = new THREE.MeshPhysicalMaterial({
        color: 0xffffff,
        roughness: 0,
        metalness: 0,
        transparent: true,
        transmission: 1,
        envMapIntensity: 1.0, // 控制环境贴图的强度
      });
    }

    // 为车后灯设置透明度与其他效果
    if (obj.name.slice(0, 4) == '尾灯灯罩') {
      obj.material = new THREE.MeshPhysicalMaterial({
        color: 0xff0000,
        metalness: 0,
        roughness: 0,
        transmission: 0.5,
        transparent: true,
        envMapIntensity: 2.5,
      });
    } else if (obj.name.slice(0, 5) == '尾灯第二层') {
      obj.material = new THREE.MeshPhysicalMaterial({
        color: 0x440000,
        metalness: 0,
        roughness: 0,
        transmission: 0.5,
        transparent: true,
      });
    } else if (obj.name.slice(0, 4) == '尾灯发光') {
      obj.material = new THREE.MeshLambertMaterial({
        color: 0x660000,
      });
    } else if (obj.name.slice(0, 5) == '尾灯第三层') {
      obj.material = new THREE.MeshLambertMaterial({
        color: 0x19190000,
      });
    }
  });
};

export { updateModelMaterial };
