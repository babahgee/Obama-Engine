function radians(degrees) {
    return Math.PI / 2 * degrees;
}

class Particle {
    constructor() {
        this.pos = createVector(window.innerWidth / 2, window.innerHeight / 2);
        this.rays = [];

        for (let a = 0; a < 360; a += 10) {
            this.rays.push(new Ray(this.pos, radians(a)));
        }
    }
    draw() {
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc(this.pos.x, this.pos.y, 16, 0, 2 * Math.PI);
        ctx.fill();

        for (let i = 0; i < this.rays.length; i++) {
            this.rays[i].draw();
        }
    }
}