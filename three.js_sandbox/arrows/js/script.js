//var THREE = require('three');

//Bare Bones Setup With Orbital Camera
var scene = new THREE.Scene();
var container = document.getElementById('container');
var camera = new THREE.PerspectiveCamera(70,container.clientWidth/container.clientHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth,container.clientHeight);
container.appendChild(renderer.domElement);

//Lights and helpers
var ambientLight = new THREE.AmbientLight(0x404040);//SOFT WHITE LIGHT
var pointLight = new THREE.PointLight(0xffffff,1,100);
pointLight.position.set(50,50,50);
scene.add(ambientLight);
scene.add(pointLight);

//adding helpers to visualize coordinate system and lights ##############################
var helpers = new THREE.Object3D();//you can add objects to this and it counts as one 3D object
//that can be added to the scene.

var pointLightHelper = new THREE.PointLightHelper(pointLight, 1)
helpers.add(pointLightHelper)

var axisHelper = new THREE.AxisHelper(100);
helpers.add(axisHelper)

var xyGrid = new THREE.GridHelper(100, 10)
xyGrid.rotateX(Math.PI / 2)

var xzGrid = new THREE.GridHelper(100, 10)

var yzGrid = new THREE.GridHelper(100, 10)
yzGrid.rotateZ(Math.PI/2)

//helpers.add(xyGrid)
//helpers.add(xzGrid)
//helpers.add(yzGrid)
scene.add(helpers);

//###########################################################################

//Orbit Controlls (mouse click and drag change camera angle)
var controls = new THREE.OrbitControls(camera, renderer.domElement);


//===================================================================
//var dir = new THREE.Vector3(1, 0, 0);
//dir.setFromSpherical(new THREE.Spherical(1,Math.PI/10,0))
//dir.normalize();

//var origin = new THREE.Vector3(0, 0, 0);
//var length = 20;
//var hex = 0xff0000;

//var arrow = new THREE.ArrowHelper(dir, origin, length, hex);
//scene.add(arrow);

var center = new Sphere(5, 0x56D3F0);
center.addToScene(scene);

var orbiter = new Sphere(3, 0xffffff, {
    orbitalDistance: 20,
    thetaDot : Math.PI / 2,
    theta0: Math.PI/4,
    tilt: Math.PI / 10
})
orbiter.addToScene(scene)
orbiter.center = center

dyn = new DynamicAngleHelper(center, orbiter, new THREE.Vector3(1, 0, 0));
dyn.addToScene(scene)





//=================================================================


camera.position.set(100,100, 100);
camera.lookAt(origin)
controls.update();//<---- very important
var delta = 0;//ms
var lastFrameTimeMs = 0;//ms
var timeStep = 1000 / 60;//60 fps

function mainLoop(timeStamp) {
    delta += timeStamp - lastFrameTimeMs;
    lastFrameTimeMs = timeStamp;
    var numUpdates = 0;
    //update in here
    while (delta >= timeStep) {
        orbiter.update(timeStep);
        dyn.update();
        delta -= timeStep;
        if (numUpdates++ >= 240) {
            delta = 0;
            break;
        }
    }
    requestAnimationFrame(mainLoop);
    controls.update()
    renderer.render(scene, camera);
};

requestAnimationFrame(mainLoop)
