import { camera, renderer } from './cameraRenderer.js';
import { scene } from './scene.js';

// 渲染动画帧
const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

animate();

// 导出渲染器
export { renderer };
