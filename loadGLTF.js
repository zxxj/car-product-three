import * as THREE from 'three';
import { GLTFLoader } from './examples/jsm/loaders/GLTFLoader.js';

const loader = new GLTFLoader();

const handleLoad = (path) => {
  const result = new Promise((resolve, reject) => {
    loader.load(path, (gltf) => {
      resolve(gltf);
    });
  });

  return result;
};

export { handleLoad };
