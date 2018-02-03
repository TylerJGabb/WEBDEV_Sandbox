//var THREE = require('three')
//https://threejs.org/docs/#api/materials/MeshStandardMaterial

/**
 * Theoretical class for proof of concept.
 */
class Sphere{
    constructor(radius,properties){
        var segments = radius <= 5 ? 15 : 2*radius
        var geom = new THREE.SphereGeometry(radius,segments,segments)
        var mat = new THREE.MeshStandardMaterial(properties)
        this.mesh = new THREE.Mesh(geom,mat)
    }
    
    get color(){
        return this.mesh.material.color.getHexString()
    }

    set color(val){
        this.mesh.material.color.set(val)
    }

    get emissive(){
        return this.mesh.material.emissive.getHexString()
    }
    
    set emissive(val){
        this.mesh.material.emissive.set(val)
    }

    get position(){
        return this.mesh.position
    }

    get metalness(){
        return this.mesh.material.metalness
    }

    set metalness(value){
        this.mesh.material.metalness = value
    }

    get roughness(){
        return this.mesh.material.roughness
    }

    set roughness(value){
        this.mesh.material.roughness = value
    }

    addToScene(scene){
        scene.add(this.mesh)
    }
}