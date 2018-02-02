

var THREE = require('three')

class Ball{
    constructor(radius,color){
        var segments = radius <= 5 ? 15 : 2*radius
        var geom = new THREE.SphereGeometry(radius,segments,segments)
        var mat = new THREE.MeshLambertMaterial()
    }
}