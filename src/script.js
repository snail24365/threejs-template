import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";

// const gui = new dat.GUI({ width: 340 })

const canvas = document.querySelector("canvas.webgl");
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const clock = new THREE.Clock();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
const controls = new OrbitControls(camera, canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

(function () {
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  camera.position.set(0, 0, 1);
  scene.add(camera);
  controls.enableDamping = true;

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
})();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  controls.update();
  renderer.render(scene, camera);
  renderer.setAnimationLoop(tick);
};

tick();
