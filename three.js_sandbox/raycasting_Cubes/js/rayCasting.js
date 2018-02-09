//Set up the animation window
if (!document) {
    var THREE = require('three')
}

var container = document.getElementById('container');
var containerWidth = container.clientWidth;
var containerHeight = container.clientHeight;
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false});
renderer.setClearColor(0x505050)
renderer.setSize(containerWidth,containerHeight);
container.appendChild(renderer.domElement);
var light = new THREE.PointLight(0xffffff,5,200);
light.position.set(0,0,100);
scene.add(light);
camera.position.set(0,0,100);
camera.lookAt( new THREE.Vector3(0,0,0));

//Make a bunch of random cubes
var range = 75;
var cubes = [];

var geom = new THREE.SphereGeometry(1, 10, 10);
var mat = new THREE.MeshStandardMaterial({
    color: 0xffffff
})
var indicator = new THREE.Mesh(geom, mat);
scene.add(indicator)


for(var i = 0; i < 100; i++){
    var grayness = Math.random() * 0.5 + 0.25;
    var geom = new THREE.CubeGeometry(2*Math.random() + 3,2*Math.random() + 3,2*Math.random() + 3);
    var mat = new THREE.MeshStandardMaterial({
        roughness : 0.5,
        metalness : 0.8
    });//MEsh lambert is a reflective material and will respond to lights
    var cube = new THREE.Mesh(geom,mat);
    mat.color.setRGB(grayness,grayness,grayness);
    cube.position.set (
        range * (0.5 - Math.random()),
        range * (0.5 - Math.random()),
        range * (0.5 - Math.random())
    )
    var oneRot = 2*Math.PI;
    cube.rotation.set(
        oneRot*Math.random(),
        oneRot*Math.random(),
        oneRot*Math.random()
    )
    cube.clicked = false;
    cube.grayness = grayness;
    cubes.push(cube);
    scene.add(cube);
}

//Prepare two objects for object selection, the projector and the mouse vector;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var intersections;

//add the mouse event handler
function onMouseMove(e){
    cubes.forEach(function(c){
        if(!c.clicked){
            c.material.color.setRGB(c.grayness,c.grayness,c.grayness);
        }
    })
    //@note: transforming the x and y positions of the mouse to [ [-1 1] [-1 1] ] space
    mouse.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse,camera);
    intersections = raycaster.intersectObjects(cubes)//This
    if (intersections.length > 0) {
        indicator.visible = true;
    } else {
        indicator.visible = false;
    }
    for (var i = 0; i < intersections.length; i++){
        if (i == 0) {
            var p = intersections[i].point;
            indicator.position.set(p.x, p.y, p.z);
        }
        console.log(intersections);
        if(!intersections[ i ].object.clicked){
            intersections[ i ].object.material.color.setRGB( 1.0 - i / intersections.length, 0, 0);
        }

    }
}

//add click event handler to change color of top-most intersected object
function onMouseClick(e){
    if(intersections.length > 0){
        intersections[0].object.material.color.setRGB(1,1,0);
        intersections[0].object.clicked = true;
        console.log(intersections[0]);
    }
}

container.addEventListener('mousemove',onMouseMove, false);
container.addEventListener('click',onMouseClick,false);







function animate(){
    requestAnimationFrame(animate);
    renderer.render( scene, camera );
}

animate();


