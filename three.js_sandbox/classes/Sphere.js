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
        if (orbitalParameters) {
            this.orbitalDistance = orbitalParameters.orbitalDistance ? orbitalParameters.orbitalDistance : 0;
            this.thetaDot = orbitalParameters.thetaDot ? orbitalParameters.thetaDot : 0;
            this.theta0 = orbitalParameters.theta0 ? orbitalParameters.theta0 : 0;
            this.tilt = orbitalParameters.tilt ? orbitalParameters.tilt : 0;
        } else {
            this.orbitalDistance = 0;
            this.thetaDot = 0;
            this.theta0 = 0;
            this.tilt = 0;
        }

        /*
        SEE THESE LINKS
        https://threejs.org/docs/#api/math/Vector3 //.setFromSpherical
        https://threejs.org/docs/#api/math/Spherical
        //set position, it is conditional upon provided orbital parameters
        */

        this.theta = this.theta0;
        this.position.setFromSpherical(new THREE.Spherical(
            this.orbitalDistance,
            Math.PI/2 - this.tilt,
            this.theta))
    }

    
    update(deltaT) {
        this.theta += this.thetaDot * deltaT/1000;
        this.position.setFromSpherical(new THREE.Spherical(
            this.orbitalDistance,
            Math.PI / 2 - this.tilt * Math.cos(this.theta - this.theta0),// ... - this.theta0 is important
            this.theta
        )).add(this.center.position);
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