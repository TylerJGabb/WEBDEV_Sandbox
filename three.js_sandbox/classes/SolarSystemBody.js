var THREE = require('three')

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