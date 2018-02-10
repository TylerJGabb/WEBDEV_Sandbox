if (!document) {
    d3 = require('d3');
    THREE = require('three')
}

var scene = new THREE.Scene();
var scene = new THREE.Scene();
var container = document.getElementById('container');
var camera = new THREE.PerspectiveCamera(70, container.clientWidth / container.clientHeight, 0.1, 10000);
var renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor(0xBBBBBB);
renderer.setSize(container.clientWidth, container.clientHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);


var svg = d3.create("svg")
    .attr("width", 50)
    .attr("height", 50)
    .append("circle")
    .attr("cx", 25)
    .attr("cy", 25)
    .attr("r", 25)
    .style("fill", "purple");


var texture = new THREE.Texture(svg);
texture.needsUpdate = true;
texture.minFilter = THREE.LinearFilter;

var spriteMaterial = new THREE.SpriteMaterial({ map: texture });
var sprite = new THREE.Sprite(spriteMaterial);

//scene.add(sprite);

var axh = new THREE.AxisHelper(50);
scene.add(axh);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate()
