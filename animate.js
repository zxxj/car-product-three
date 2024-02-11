import { camera, renderer } from './cameraRenderer.js';
import { scene } from './scene.js';

// 渲染动画帧
const animate = () => {
  TWEEN.update(); //tween更新(渲染时间相关,便于动画计算)
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

// 导出渲染器
export { renderer };
