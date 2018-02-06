if(!document)
    var THREE = require('three');

//Bare Bones Setup With Orbital Camera
var scene = new THREE.Scene();
var container = document.getElementById('container');
var camera = new THREE.PerspectiveCamera(70,container.clientWidth/container.clientHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth,container.clientHeight);
container.appendChild(renderer.domElement);

//Orbit Controlls (mouse click and drag change camera angle)
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//Lights
var ambientLight = new THREE.AmbientLight(0x404040);//SOFT WHITE LIGHT
scene.add(ambientLight);



//================================= CODE GOES HERE==============
var axisHelper = new THREE.AxisHelper(10);
scene.add(axisHelper);

var center = new Sphere(3,0x123456)
var light = new Sphere(1,0xffffff)
light.emissive = 0xffffff;
var pointLight = new THREE.PointLight(0xffffff, 1, 100);
var g = new THREE.Object3D()
g.add(pointLight)
g.add(light.mesh)
center.addToScene(scene)

scene.add(g)


var interval = 2*Math.PI/360
var t = 0
function update(){
  g.position.x = 5*Math.cos(t)
  g.position.y = 5*Math.sin(t)
  t += interval;
  if(t >= 2*Math.PI)
    t = 0
}

//=================================================================


camera.position.set(0,0,100);
controls.update();
function animate(){
  requestAnimationFrame(animate);
  controls.update()
  update()
  renderer.render(scene,camera);
};

animate()
