//var THREE = require('three');

//Bare Bones Setup With Orbital Camera
var scene = new THREE.Scene();
var container = document.getElementById('container');
var camera = new THREE.PerspectiveCamera(70,container.clientWidth/container.clientHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth,container.clientHeight);
container.appendChild(renderer.domElement);

//Lights
var ambientLight = new THREE.AmbientLight(0x404040);//SOFT WHITE LIGHT
var pointLight = new THREE.PointLight(0xffffff,1,100);
pointLight.position.set(50,50,50);
scene.add(ambientLight);
scene.add(pointLight);

//Orbit Controlls (mouse click and drag change camera angle)
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//================================= CODE GOES HERE==============
//Example material, geometry, and mesh
var geom = new THREE.SphereGeometry(5,15,15);
var mat = new THREE.MeshStandardMaterial({
  color : 0x56D3F0
});

var mesh = new THREE.Mesh(geom,mat);
scene.add(mesh);

//=================================================================


camera.position.set(0,0,100);
controls.update();
function animate(){
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene,camera);
};

animate()
