if (!document) {
    var THREE = require('three');

}

//Bare Bones Setup With Orbital Camera
var scene = new THREE.Scene();
var container = document.getElementById('container');
var camera = new THREE.PerspectiveCamera(70,container.clientWidth/container.clientHeight,0.1,10000);
var renderer = new THREE.WebGLRenderer();
renderer.setClearColor(0x404040);
renderer.setSize(container.clientWidth, container.clientHeight);
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
plane.position.y -= 1;

//Lights
var ambientLight = new THREE.AmbientLight(0x404040);//SOFT WHITE LIGHT
var pointLight = new THREE.PointLight(0xffffff, 3, 300);
var plh = new THREE.PointLightHelper(pointLight);
pointLight.position.set(50, 120, 50);
scene.add(ambientLight);
scene.add(pointLight);
scene.add(plh);


var axh = new THREE.AxisHelper(50);
scene.add(axh);

//Orbit Controlls (mouse click and drag change camera angle)
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//================================= CODE GOES HERE==============


var sp1 = makeTextSprite("Larger Fontsize", {
    fontSize: 40,
    backgroundColor: { r: 131, g: 3, b: 3, a: 1.0 },
    textColor: { r: 238, g: 238, b: 238, a: 1.0 },
    borderColor: { r: 183, g: 28, b: 28, a: 1.0 },
});


var ball = new THREE.Mesh(new THREE.SphereGeometry(1), new THREE.MeshBasicMaterial({ color: 0x000000, opacity : 0.7 }));
scene.add(ball);
ball.castShadow = true;
ball.visible = false;
plane.visible = false;





scene.add(sp1);




//=================================================================


camera.position.set(100,100,100);
controls.update();
function animate() {
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene,camera);
};

animate()
