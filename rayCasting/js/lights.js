var width = window.innerWidth;
var height = window.innerHeight;
var renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false});
renderer.setSize(width, height );
renderer.autoClear = true;
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(60, width/height, 1, 1000);

var scene = new THREE.Scene();
var light = new THREE.PointLight(0xffffff, 5, 100);
scene.add(light);

var geometry = new THREE.CubeGeometry(5, 5, 5);
var material = new THREE.MeshLambertMaterial({color:0xff0000});

for (var i = 0; i < 10; i ++) {
var mesh = new THREE.Mesh(geometry, material);

mesh.position.x = 28-(7*i);
mesh.position.y = Math.random()*20-(1*i);
mesh.position.z = -59;//Math.random()*20 - 100;
mesh.rotation.x = Math.random();
mesh.rotation.y = Math.random();
scene.add(mesh);

var edges = new THREE.EdgesHelper( mesh, 0x0000ff);
edges.material.linewidth = 2;

scene.add(edges);}

function animate() {
requestAnimationFrame(animate);

renderer.render(scene, camera);

}
animate();