const canvas = document.querySelector("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

let wall = new Boundary(300, 100, 300, 300);
let ray = new Ray(100, 200);
let particle = new Particle();


const mouse = {
    x: 0,
    y: 0
}

window.addEventListener("mousemove", event => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

function update() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    wall.draw();
    particle.draw();

    //ray.draw();
    // ray.lookAt(mouse.x, mouse.y);

    //let pt = ray.cast(wall);

    //if (pt) {
    //    ctx.beginPath();
    //    ctx.fillStyle = "#fff";
    //    ctx.fillRect(pt.x - 5, pt.y - 5, 10, 10);
    //    ctx.closePath();
    //}

    window.requestAnimationFrame(update);
}
update();