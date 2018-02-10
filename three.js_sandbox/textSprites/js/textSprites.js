if (!document) {
    var THREE = require('three');

}

//Bare Bones Setup With Orbital Camera
var scene = new THREE.Scene();
var container = document.getElementById('container');
var camera = new THREE.PerspectiveCamera(70,container.clientWidth/container.clientHeight,0.1,10000);
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor(0x404040);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

var planeGeom = new THREE.PlaneGeometry(10000, 10000);
var greyMat = new THREE.MeshPhongMaterial({
    color: 0x6c6c6c,
    side: THREE.DoubleSide,
    shininess: 0.1
});

var plane = new THREE.Mesh(planeGeom, greyMat);
plane.receiveShadow = true;//<<----------------- @IMPORTANT for the plane to be able to receive the casted shadow
scene.add(plane);
plane.rotation.x = Math.PI / 2;

//Lights
var ambientLight = new THREE.AmbientLight(0x404040);//SOFT WHITE LIGHT
var pointLight = new THREE.PointLight(0xffffff, 3, 300);
var plh = new THREE.PointLightHelper(pointLight);
pointLight.position.set(50, 120, 50);
pointLight.castShadow = true;
//pointLight.shadow = new THREE.LightShadow(new THREE.PerspectiveCamera(100, 15, 500, 1000));
pointLight.shadow.bias = 0.0001;
pointLight.shadow.mapSize.width = 512 * 2;
pointLight.shadow.mapSize.height = 512 * 2;//yeah, 2048 is way to high
scene.add(ambientLight);
scene.add(pointLight);
scene.add(plh);


var axh = new THREE.AxisHelper(50);
scene.add(axh);


var cube = new THREE.Mesh(
    new THREE.CubeGeometry(10, 10, 10, ),
    new THREE.MeshStandardMaterial({ color: 0x293902 })
);
cube.castShadow = true;
cube.update = function () {
    cube.rotateX(Math.PI / 500);
    cube.rotateX(Math.PI / 1000);
    cube.rotateZ(Math.PI / 500);
}
cube.position.set(30, 30, 30);

scene.add(cube);
//Orbit Controlls (mouse click and drag change camera angle)
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//================================= CODE GOES HERE==============


var sp1 = makeTextSprite("Larger Fontsize", {
    fontSize: 40,
    backgroundColor: { r: 131, g: 3, b: 3, a: 1.0 },
    textColor: { r: 238, g: 238, b: 238, a: 1.0 },
    borderColor: { r: 183, g: 28, b: 28, a: 1.0 },
});

var sp2 = makeTextSprite("Smaller Fontsize", {
    fontSize: 20,
    backgroundColor: { r: 131, g: 3, b: 3, a: 1.0 },
    textColor: { r: 238, g: 238, b: 238, a: 1.0 },
    borderColor: { r: 183, g: 28, b: 28, a: 1.0 },
});

var sp3 = makeTextSprite("Giganto Fontsize", {
    fontSize: 400,
    backgroundColor: { r: 131, g: 3, b: 3, a: 1.0 },
    textColor: { r: 238, g: 238, b: 238, a: 1.0 },
    borderColor: { r: 183, g: 28, b: 28, a: 1.0 },
});

var sp4 = makeTextSprite("Weeeeee!", {
    fontSize: 32,
    backgroundColor: { r: 131, g: 3, b: 3, a: 1.0 },
    textColor: { r: 238, g: 238, b: 238, a: 1.0 },
    borderColor: { r: 183, g: 28, b: 28, a: 1.0 },
});

var ball = new THREE.Mesh(new THREE.SphereGeometry(5), new THREE.MeshBasicMaterial({ color: 0xffffff }));
scene.add(ball);
ball.castShadow = true;

sp4.update = function (delta) {
    sp4.position.x = 50 * Math.sin(delta);
    sp4.position.z = 50 * Math.cos(delta);
    var p = sp4.position;
    ball.position.set(p.x, p.y, p.z);
}





sp1.scale.set(100, 50, 1);
sp2.scale.set(100, 50, 1);
sp3.scale.set(100, 50, 1);
sp4.scale.set(100, 50, 1);

sp1.position.set(0, 30, 0);
sp2.position.set(0, 40, 0);
sp3.position.set(0, 50, 0);
sp4.position.y += 10;

scene.add(sp1);
scene.add(sp2);
scene.add(sp3);
scene.add(sp4);



//=================================================================


camera.position.set(100,100,100);
controls.update();
var delta = 0;
function animate() {
    delta += 0.01;
  requestAnimationFrame(animate);
  controls.update()
  cube.update();
  sp4.update(delta);
  renderer.render(scene,camera);
};

animate()
