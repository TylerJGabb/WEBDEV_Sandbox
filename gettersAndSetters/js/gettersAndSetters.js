var scene = new THREE.Scene();
var XYgrid = new THREE.GridHelper(200,20,0xff000,0xffffff)
var previewXYGrid = new THREE.GridHelper(200,20,0xff000,0xffffff)
var preview = document.getElementById('preview-window');
XYgrid.rotation.x = Math.PI/2;
previewXYGrid.rotation.x = Math.PI/2;



var previewScene = new THREE.Scene();
var previewWindow = document.getElementById('preview-window');
var previewCamera = new THREE.PerspectiveCamera(70,1,0.1,1000);
var previewRender = new THREE.WebGLRenderer();
previewRender.setSize(200,200);
previewWindow.appendChild(previewRender.domElement);
previewScene.add(previewXYGrid);
previewCamera.position.set(0,0,100);

var sceneUtilities = {
    gridOn : false,
    ToggleGrid(){
        if(this.gridOn){
            scene.remove(XYgrid);
        } else {
            scene.add(XYgrid);
        }
        this.gridOn = !this.gridOn;
    },

    TogglePreviewWindow(){
        if(preview.style.display == 'none'){
            preview.style.display = 'block';
        } else {
            preview.style.display = 'none';
        }
    }
}


class Ball {
    constructor(radius, color) {
        this.r_0 = radius;
        var geom = new THREE.SphereGeometry(radius,2*radius,2*radius);
        var mat = new THREE.MeshBasicMaterial({
            color : color
            //wireframe : true
        });

        this.mesh = new THREE.Mesh(geom,mat);
        scene.add(this.mesh);
    }

    set color(hexValue){
        this.mesh.material.color.setHex(hexValue);
    }

    get color(){
        return this.mesh.material.color.getHex();
    }

    set radius(value) {
        var scale = value/this.r_0;
        this.mesh.scale.x = 
        this.mesh.scale.y =
        this.mesh.scale.z = scale;
    }

    get radius(){
        return this.mesh.scale.x * this.r_0
    }
}


var container = document.getElementById('animation-window');
var gui = new dat.GUI({autoPlace : false, width : 300});
container.appendChild(gui.domElement);


var camera = new THREE.PerspectiveCamera(70,container.offsetWidth/container.offsetHeight,0.1,1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(container.offsetWidth,container.offsetHeight);
container.appendChild(renderer.domElement);

var controls = new THREE.OrbitControls( camera, renderer.domElement );
controls.update();

var previewControls = new THREE.OrbitControls( previewCamera, previewRender.domElement );
previewControls.update();

function animate(){
    requestAnimationFrame( animate );
    controls.update();
    previewControls.update();
    renderer.render( scene, camera );  
    previewRender.render( previewScene, previewCamera ) 
}

var b = new Ball(10,0xffffff);
camera.position.set(0,0,100);

gui.add(b,'radius',1,100);
gui.addColor(b,'color');
gui.add(sceneUtilities,'ToggleGrid');
gui.add(sceneUtilities,'TogglePreviewWindow');

animate();