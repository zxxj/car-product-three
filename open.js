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

  // 控制车门的开关状态
  if (intersects.length > 0) {
    // 选中的车门
    const chooseDoor = intersects[0].object.door;

    // 选中车门的名字
    const chooseDoorName = intersects[0].object.door.name;

    if (chooseDoorName == '右车门' || chooseDoorName == '右后门') {
      chooseDoor.openTween = openAndClose('y', 0, Math.PI / 3, chooseDoor);
      chooseDoor.closeTween = openAndClose('y', Math.PI / 3, 0, chooseDoor);
    } else if (chooseDoorName == '左前门' || chooseDoorName == '左后门') {
      chooseDoor.openTween = openAndClose('y', 0, -Math.PI / 3, chooseDoor);
      chooseDoor.closeTween = openAndClose('y', -Math.PI / 3, 0, chooseDoor);
    } else if (chooseDoorName == '后备箱') {
      chooseDoor.openTween = openAndClose('z', 0, Math.PI / 3, chooseDoor);
      chooseDoor.closeTween = openAndClose('z', Math.PI / 3, 0, chooseDoor);
    }

    if (chooseDoor.status === 'close') {
      chooseDoor.status = 'open';
      chooseDoor.openTween.start();
    } else {
      chooseDoor.status = 'close';
      chooseDoor.closeTween.start();
    }
  }
};

addEventListener('click', choose);

const openAndClose = (axis, angle1, angle2, door) => {
  const state = {
    angle: angle1, // 车门动画初始的角度
  };

  const tween = new TWEEN.Tween(state);
  tween.to(
    {
      angle: angle2, // 车门动画结束的角度
    },
    2000
  );

  tween.onUpdate(() => {
    if (axis === 'y') {
      door.rotation.y = state.angle;
    } else {
      door.rotation.z = state.angle;
    }
  });

  return tween;
};

export { open };
