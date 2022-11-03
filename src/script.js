import "./style.css";
import * as THREE from "three";
import {
    OrbitControls
} from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import {
    AmbientLight,
    BoxGeometry,
    DirectionalLight,
    Mesh,
    MeshPhongMaterial,
    Vector3
} from "three";

// const gui = new dat.GUI({ width: 340 })
const cameraSetting = [75, window.innerWidth / window.innerHeight, 0.1, 100]

// 필수 요소 (캔버스, Scene, Camera, Renderer)
const canvas = document.querySelector(".myCanvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(...cameraSetting);
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// 보조 (마우스 컨트롤러)
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;




// Scene 구성 + 카메라 위치 잡기
const box = new Mesh(new BoxGeometry(1, 1, 1), new MeshPhongMaterial({
    color: 0x005500
}));
scene.add(box);

const directionLight = new DirectionalLight("#ffffff", 1);
directionLight.position.copy(new Vector3(1,2,3))
scene.add(directionLight);

const ambientLight = new AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

camera.position.set(1, 1, 2);

// 매프레임마다 렌더
const tick = () => {
    controls.update();
    renderer.render(scene, camera);
    renderer.setAnimationLoop(tick); // 재귀함수로 tick 재호출함
};

tick();