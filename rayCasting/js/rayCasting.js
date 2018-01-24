//Set up the animation window

var container = document.getElementById('container');
var containerWidth = container.clientWidth;
var containerHeight = container.clientHeight;
var scene = new THREE.Scene();
scene.background = new THREE.Color(0xdcd9cd);
var camera = new THREE.PerspectiveCamera(45, containerWidth / containerHeight, 1, 1000);
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false});
renderer.setSize(containerWidth,containerHeight);
container.appendChild(renderer.domElement);
camera.position.set(0,0,100);
camera.lookAt( new THREE.Vector3(0,0,0));

//add a light
var light = new THREE.PointLight(0xffffff,5,200);
light.position.set(0,0,100);
scene.add(light);


//Make a bunch of random cubes
var range = 50;
var geom = new THREE.CubeGeometry(5,5,5);
var cubes = [];
for(var i = 0; i < 100; i++){
    var grayness = Math.random() * 0.5 + 0.25;
    var mat = new THREE.MeshLambertMaterial();
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
    mouse.x = ( e.clientX / renderer.domElement.clientWidth ) * 2 - 1;
    mouse.y = - ( e.clientY / renderer.domElement.clientHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse,camera);
    intersections = raycaster.intersectObjects(cubes)
    for( var i = 0; i < intersections.length; i++){
        if(!intersections[ i ].object.clicked){
            intersections[ i ].object.material.color.setRGB( 1.0 - i / intersections.length, 0, 0);
        }
        
    }

}

function onMouseClick(e){
    if(intersections.length > 0){
        intersections[0].object.material.color.setRGB(1,1,0);
        intersections[0].object.clicked = true;
        console.log(intersections[0]);
    }
}

container.addEventListener('mousemove',onMouseMove, false);
container.addEventListener('click',onMouseClick,false);






var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();
function animate(){
    requestAnimationFrame( animate );
    controls.update();
    renderer.render( scene, camera );  
}

animate();


