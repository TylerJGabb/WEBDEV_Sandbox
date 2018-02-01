//Bare Bones Setup
var scene = new THREE.Scene();
var container = document.getElementById('container');
var camera = new THREE.PerspectiveCamera(70,container.clientWidth/container.clientHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0xDCD9CD,1);//MILK
renderer.setSize(container.clientWidth,container.clientHeight);
container.appendChild(renderer.domElement);

//Lights
//var ambientLight = new THREE.AmbientLight(0x404040);//SOFT WHITE LIGHT
//scene.add(ambientLight);

//Example material, geometry, and mesh
var geom = new THREE.SphereGeometry(10,10,10);
var mat = new THREE.MeshBasicMaterial({
  color : 0xffffff
});

var mesh = new THREE.Mesh(geom,mat);
scene.add(mesh);


camera.position.set(0,0,100);
function animate(){
  requestAnimationFrame(animate);
  renderer.render(scene,camera);
};
