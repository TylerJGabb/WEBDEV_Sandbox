if(!document)
    var THREE = require('three')
//https://threejs.org/docs/#api/materials/MeshStandardMaterial

/**
 * Theoretical class for proof of concept. Currently a work in progress. 
 */
class Sphere{
    constructor(radius, color, orbitalParameters) {
        this.r0 = radius; //store original radius for future calculations
        var segments = radius <= 5 ? 15 : 2*radius
        var geom = new THREE.SphereGeometry(radius,segments,segments)
        var mat = new THREE.MeshStandardMaterial({
            color : color
        });
        this.mesh = new THREE.Mesh(geom, mat)
        this.center = { position: new THREE.Vector3(0, 0, 0) }
        this.orbitalDistance = orbitalParameters ? orbitalParameters.orbitalDistance : 0;
        this.thetaDot = orbitalParameters ? orbitalParameters.thetaDot : 0;


        /*
        SEE THESE LINKS
        https://threejs.org/docs/#api/math/Vector3 //.setFromSpherical
        https://threejs.org/docs/#api/math/Spherical
        //start at (1, 0, 0) relative to this objects center
        //set position, it is conditional upon provided orbital parameters
        */
        this.position = new THREE.Vector3()
        this.position.setFromSpherical({
            radius: 1,
            phi: 1,
            theta : 1
        })

    }

    
    update(deltaT){

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

    set position(value) {
        this.mesh.position.set(value.x,value.y,value.z);
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