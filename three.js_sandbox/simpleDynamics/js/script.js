if (!document) {
    var THREE = require('three');
}


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
var pointLightHelper = new THREE.PointLightHelper(pointLight, 2);
scene.add(pointLightHelper);
var axisHelper = new THREE.AxisHelper(100);
scene.add(axisHelper)
//Orbit Controlls (mouse click and drag change camera angle)
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//================================= CODE GOES HERE==============
//Example material, geometry, and mesh

var center = new Sphere(5, 0x56D3F0);
center.addToScene(scene);

var orbiter = new Sphere(3, 0xffffff,{
    orbitalDistance: 20,
    thetaDot : Math.PI / 2,
    theta0: 0,
    tilt: Math.PI/10
})
orbiter.addToScene(scene)
orbiter.center = center

//=================================================================


camera.position.set(0,0,100);
controls.update();
var delta = 0;//ms
var lastFrameTimeMs = 0;//ms
var timeStep = 1000/60;//60 fps

function mainLoop(timeStamp) {
    delta += timeStamp - lastFrameTimeMs;
    lastFrameTimeMs = timeStamp;
    var numUpdates = 0;
    while (delta >= timeStep) {
        orbiter.update(timeStep);
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
