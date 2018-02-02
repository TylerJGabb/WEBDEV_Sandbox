//var THREE = require('three')
//https://threejs.org/docs/#api/materials/MeshStandardMaterial
//Theoretical class for proof of concept
class Ball{
    constructor(radius,color){
        var segments = radius <= 5 ? 15 : 2*radius
        var geom = new THREE.SphereGeometry(radius,segments,segments)
        var mat = new THREE.MeshStandardMaterial({
            color : color,
            roughness : 0.4,
        })
        this.mesh = new THREE.Mesh(geom,mat)
    }
    
    addToScene(scene){
        scene.add(this.mesh)
    }
}