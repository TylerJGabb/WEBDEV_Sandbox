if (!document) {
    var THREE = require('three');
}

/**
 * This is a yet another proof of concept class. This does not single out the angle for any
 * particular normal. That is the next step
 */

var angles = []
/**
 * given an object and its orbiting body, draws a dynamic angle between them with two arrow helpers and a circle.
 */
class DynamicAngleHelper {
    constructor(objectOfOrigin, objectToFollow, hex=0xffffff) {
        this.objectOfOrigin = objectOfOrigin;
        this.objectToFollow = objectToFollow;
        this.startingDirection = new THREE.Vector3();
        this.startingDirection.normalize()
        this.object3D = new THREE.Object3D();
        this.l0 = this.objectOfOrigin.position.distanceTo(this.objectToFollow.position);
        this.dir = new THREE.Vector3();
        this.dir.subVectors(this.objectToFollow.position, this.objectOfOrigin.position);
        this.dir.normalize();

        this.startingDirection = this.dir;

        this.upArrow = new THREE.ArrowHelper(this.startingDirection, objectOfOrigin.position, this.l0, hex);
        this.pointer = new THREE.ArrowHelper(this.dir, objectOfOrigin.position, this.l0, hex);

        this.object3D = new THREE.Object3D();
        this.object3D.add(this.upArrow);
        this.object3D.add(this.pointer);

        var geom = new THREE.CircleGeometry()
    }

    update() {
        var length = this.objectOfOrigin.position.distanceTo(this.objectToFollow.position);
        var dir = new THREE.Vector3();
        dir.subVectors(this.objectToFollow.position, this.objectOfOrigin.position);
        dir.normalize();
        var origin = this.objectOfOrigin.position;
        this.upArrow.position.set(origin.x,origin.y,origin.z);
        this.pointer.position.set(origin.x, origin.y, origin.z);
        this.pointer.setDirection(dir);

        this.upArrow.setLength(length);
        this.pointer.setLength(length);
        angles.push(this.upArrow.getWorldDirection().angleTo(this.pointer.getWorldDirection()))
        //console.log(Math.max.apply(null,angles))

    }

    addToScene(scene) {
        scene.add(this.object3D);
    }

    set visible(value) {
        this.object3D.visible = value;
    }

    get visible() {
        return this.object3D.visible;
    }


}
