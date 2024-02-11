import * as THREE from 'three';
import { camera } from './cameraRenderer.js';

// 模型中的热点tag
const pointsName = [
  '右前光标',
  '右后光标',
  '左前光标',
  '左后光标',
  '后备箱光标',
];

// 模型中所有车门的名称
const doorName = ['右车门', '右后门', '左前门', '左后门', '后备箱'];

// 需要被操作的所有精灵模型
const chooseArr = [];

const open = (model) => {
  console.log(model);
  pointsName.forEach((tagName, index) => {
    // 获取模型中所有的热点模型
    let tag = model.scene.getObjectByName(tagName).children[0];

    // 通过索引拿到车门模型
    tag.door = model.scene.getObjectByName(doorName[index]);

    // 为每个车门模型添加一个自定义属性, 用来记录车门的开关状态
    tag.door.status = 'close';

    // 添加到数组中
    chooseArr.push(tag);
  });
};

const choose = (event) => {
  // 鼠标单击位置的横坐标
  const Sx = event.clientX;
  // 鼠标单击位置的纵坐标
  const Sy = event.clientY;

  // 屏幕坐标转WebGL标准设备坐标
  const x = (Sx / window.innerWidth) * 2 - 1; // WebGL标准设备的横坐标
  const y = -(Sy / window.innerHeight) * 2 + 1; // WebGL标准设备的纵坐标

  // 创建一个射线投射器
  const raycaster = new THREE.Raycaster();

  // 通过鼠标点击的位置, 标准设备坐标和相机来计算射线投射器的.ray属性
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

  const intersects = raycaster.intersectObjects(chooseArr);
  console.log(intersects);

  // 控制车门的开关状态
  if (intersects.length > 0) {
    // 选中的车门
    const chooseDoor = intersects[0].object.door;

    // 选中车门的名字
    const chooseDoorName = intersects[0].object.door.name;

    if (chooseDoorName == '右车门' || chooseDoorName == '右后门') {
      if (chooseDoor.state == 'close') {
        chooseDoor.state = 'open';
        chooseDoor.rotateY(-Math.PI / 3);
      } else {
        chooseDoor.state = 'close';
        chooseDoor.rotateY(Math.PI / 3);
      }
    } else if (chooseDoorName == '左前门' || chooseDoorName == '左后门') {
      if (chooseDoor.state == 'close') {
        chooseDoor.state = 'open';
        chooseDoor.rotateY(Math.PI / 3);
      } else {
        chooseDoor.state = 'close';
        chooseDoor.rotateY(-Math.PI / 3);
      }
    } else if (chooseDoorName == '后备箱') {
      if (chooseDoor.state == 'close') {
        chooseDoor.state = 'open';
        chooseDoor.rotateZ(-Math.PI / 3);
      } else {
        chooseDoor.state = 'close';
        chooseDoor.rotateZ(Math.PI / 3);
      }
    }
  }
};

addEventListener('click', choose);

export { open };
