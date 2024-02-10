import * as THREE from 'three';

// 模型中需要被标记的名称
const pointsName = [
  '右前光标',
  '右后光标',
  '左前光标',
  '左后光标',
  '后备箱光标',
];

const S = 6; // 模型的XY缩放倍数
const tagArr = []; // 用于存放精灵模型

// model: gltf模型对象
const createPointsTag = (model) => {
  // 遍历第一层
  model.scene.children.forEach((obj) => {
    // 遍历第二层
    obj.children.forEach((children) => {
      // 判断是否与数组中的名字相同
      if (pointsName.includes(children.name)) {
        // 创建精灵模型
        const spriteMaterial = new THREE.SpriteMaterial({
          map: new THREE.TextureLoader().load('./assets/光点.png'),
          transparent: true,
        });

        const sprite = new THREE.Sprite(spriteMaterial);

        // 设置精灵模型的大小
        sprite.scale.set(S, S, 1);

        // 调整精灵模型的位置
        if (children.name === '左前光标' || children.name === '左后光标') {
          sprite.position.z = sprite.scale.x / 2;
        }

        if (children.name === '右前光标' || children.name === '右后光标') {
          sprite.position.z -= sprite.scale.x / 2;
        }

        if (children.name === '后备箱光标') {
          sprite.position.x = sprite.scale.x / 2;
        }
        children.add(sprite);

        // 添加到数组中,用于设置热点动画
        tagArr.push(children);
      }
    });
  });

  // 精灵模型动画
  let s = 0.0; // 记录递增大小
  let scaleNum = S; // 精灵图的缩放大小

  const waveAnimation = () => {
    s += 0.01;
    tagArr.forEach((sprite) => {
      if (s < 0.5) {
        sprite.scale.x = scaleNum * (1 + s);
        sprite.scale.y = scaleNum * (1 + s);
      } else if (s > 0.5 && s < 1.0) {
        sprite.scale.x = scaleNum * (2 - s);
        sprite.scale.y = scaleNum * (2 - s);
      } else {
        s = 0.0;
      }
    });

    requestAnimationFrame(waveAnimation);
  };
  waveAnimation();
};

export { createPointsTag };
