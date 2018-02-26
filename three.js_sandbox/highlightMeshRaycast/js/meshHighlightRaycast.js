if (!document) {
    var THREE = require('three');
}

//NOTHING ABOVE THIS LINE IS ESSENTIAL ------------------------------------

var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth/window.innerHeight, 0.01, 1000);
camera.position.set(10, 5, 10);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls(camera);//You don't need to know anything about this;
controls.enablePan = false; //stops you from being able to change position of camera

var axh = new THREE.AxisHelper(10);
scene.add(axh);

var gridXZ = new THREE.GridHelper(10, 10, 0xff0000, 0xffffff)
scene.add(gridXZ);

intersectables = []//a list of intersectable objects to be specifically tested with the rayCaster

var ball = new THREE.Mesh(
    new THREE.SphereGeometry(1, 16, 16),
    new THREE.MeshPhongMaterial({
        color: 0x54FF9F
    })
);
ball.intersected = false;
ball.destination = 'https://www.google.com'
ball.update = function (delta) {
    ball.position.x = 5 * Math.cos(delta)
    ball.position.z = 5 * Math.sin(delta)
    if (ball.intersected) {
        ball.material.color.setHex(0xFF0000)
    } else {
        ball.material.color.setHex(0x54FF9F)
    }
}
intersectables.push(ball)
scene.add(ball)

var spLight = new THREE.SpotLight(0xffffff, 1.5, 50);
spLight.target = ball
spLight.position.set(30, 20, 0)
spLight.angle = Math.PI / 30
scene.add(spLight)

var spHelper = new THREE.SpotLightHelper(spLight)
scene.add(spHelper)

var ambient = new THREE.AmbientLight(0x404040, 1, 100);//soft white light
scene.add(ambient);

camera.lookAt(new THREE.Vector3(0, 0, 0));
delta = 0

var raycaster = new THREE.Raycaster()
var mouse = new THREE.Vector2();
var intersected;

//setup standard animation loop. Performing raycast within loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);//render first or things go broken real quick
    intersectables.forEach(function (obj) {
        obj.intersected = false;
    })
    raycaster.setFromCamera(mouse, camera);
    intersected = null
    if (intersection = raycaster.intersectObjects(intersectables)[0]) {//get first selectable
        intersected = intersection.object
        intersected.intersected = true
    }
    ball.update(delta)
    spHelper.update();
    delta += 0.01
}
animate();


//this just needs to set position of mouse doesnt really need to do any advanced things
function onMouseMove(e) {
    //IT IS VERY IMPORTANT TO USE offsetX and offsetY here or your
    //world position will be off by the x and y offset of your animation window in the page. 
    mouse.x = (e.offsetX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = - (e.offsetY / renderer.domElement.clientHeight) * 2 + 1;
}

//checking for most recent intersection
function onMouseClick() {
    if (intersected) {
        console.log(intersected)
        window.location.href = intersected.destination
        
    }
}

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('click',onMouseClick)

