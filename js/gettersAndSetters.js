class Planet {
    constructor(name, radius, color) {
        this.name = name;
        this.radius = radius;
        this.color = color;
    }

    set radius(value) {
        this.mesh = "NEW GEOMETRY WITH RADIUS " + value;
    }
}