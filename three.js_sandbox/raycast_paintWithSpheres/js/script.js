//var THREE = require('three');

//Bare Bones Setup With Orbital Camera
var scene = new THREE.Scene();
var container = document.getElementById('container');
var camera = new THREE.PerspectiveCamera(45,container.clientWidth/container.clientHeight,1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.clientWidth,container.clientHeight);
container.appendChild(renderer.domElement);

//Lights
var ambientLight = new THREE.AmbientLight(0x404040);//SOFT WHITE LIGHT
var pointLight = new THREE.PointLight(0xffffff, 2, 150);
var pl2 = new THREE.PointLight(0xffffff, 2, 150);
scene.add(pl2);
scene.add(pointLight);

var lh2 = new THREE.PointLightHelper(pl2,1)
var lightHelper1 = new THREE.PointLightHelper(pointLight, 1);
scene.add(lightHelper1);
scene.add(lh2);


pointLight.position.set(50, 50, 75);
pl2.position.set(-50, -50, 10);
scene.add(ambientLight);


//Orbit Controlls (mouse click and drag change camera angle)
var controls = new THREE.OrbitControls(camera, renderer.domElement);

//================================= CODE GOES HERE==============
//Example material, geometry, and mesh
var sgeom = new THREE.SphereGeometry(1, 10, 10);
var smat = new THREE.MeshStandardMaterial({
    color: 0xffffff
});
var selector = new THREE.Mesh(sgeom, smat);
scene.add(selector);



var geom = new THREE.PlaneGeometry(100,100);
var mat = new THREE.MeshStandardMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide
});
var plane = new THREE.Mesh(geom, mat);
plane.transparent = true;
scene.add(plane)



var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersection;
var point;

function onMouseMove(e) {
    //IT IS VERY IMPORTANT TO USE offsetX and offsetY here or your
    //world position will be off by the x and y offset of your animation window in the page. 
    mouse.x = (e.offsetX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (e.offsetY / renderer.domElement.clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
    if (intersection = raycaster.intersectObject(plane)[0]) {
        var p = intersection.point;
        selector.position.set(p.x, p.y, p.z);
        point = p;
    }
}

var sp; //enviroment variable so that the latest added object can be inspected in console
function onMouseClick(e) {
    var randoSize = 5 * Math.random() + 1;
    var randoColor = 0xffffff * Math.random();
    var s = new Sphere(randoSize, randoColor);
    s.position.set(point.x,point.y,point.z);
    s.addToScene(scene);
    sp = s;//set env variable 
}

container.addEventListener('mousemove', onMouseMove, false);
container.addEventListener('click', onMouseClick, false);
//=================================================================


camera.position.set(0,0,100);
controls.update();
function animate(){
  requestAnimationFrame(animate);
  controls.update()
  renderer.render(scene,camera);
};

animate()
