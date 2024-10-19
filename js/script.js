const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('aside nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('aside nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 10);
};

function light() {
    const element = document.body;
    element.classList.add('dark-mode');
    document.querySelector('.sun').classList.remove('active');
    document.querySelector('.moon').classList.add('active');
}

function moon() {
    const element = document.body;
    element.classList.remove('dark-mode');
    document.querySelector('.sun').classList.add('active');
    document.querySelector('.moon').classList.remove('active');
}

const opnBtn = document.getElementById('open');
const sideBar = document.querySelector('.side_bar');

opnBtn.addEventListener('click', () => {
    sideBar.classList.toggle('active');

    if (sideBar.classList.contains('active')) {
        document.getElementById('icon').classList.add('fa-xmark');
        document.getElementById('icon').classList.remove('fa-bars');
    } else {
        document.getElementById('icon').classList.remove('fa-xmark');
        document.getElementById('icon').classList.add('fa-bars');
    }
})

// (function() {
//     emailjs.init("5w1SdSv34eRVg7gFO"); // Ganti YOUR_USER_ID dengan User ID dari EmailJS
// })();

// document.getElementById('contactForm').addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Mengambil data dari form
//     const name = document.getElementById('name').value;
//     const message = document.getElementById('message').value;

//     // Kirim email melalui EmailJS
//     emailjs.send('service_lg3kiwd', 'template_0qst99c', {
//         name: name,
//         message: message
//     })
//     .then(function(response) {
//         document.querySelector('.success').classList.add('active');
//         // document.getElementById('send').style.display = 'none';
//         // document.getElementById('succes').style.display = 'block';
//     }, function(error) {
//         document.querySelector('.error').classList.add('active');
//     });
// });

const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray;

// Handle resize
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

// Create particle
class Particle {
    constructor(x, y, directionX, directionY, size, color) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
        this.color = color;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = this.color;
        ctx.fill();
    }

    update() {
        if (this.x + this.size > canvas.width || this.x - this.size < 0) {
        this.directionX = -this.directionX;
        }
        if (this.y + this.size > canvas.height || this.y - this.size < 0) {
        this.directionY = -this.directionY;
        }
        
        this.x += this.directionX;
        this.y += this.directionY;
        
        this.draw();
    }
}

function init() {
    particlesArray = [];
    let numberOfParticles = (canvas.height * canvas.width) / 9000;
    for (let i = 0; i < numberOfParticles; i++) {
        let size = Math.random() * 5 + 1;
        let x = Math.random() * (innerWidth - size * 2) + size;
        let y = Math.random() * (innerHeight - size * 2) + size;
        let directionX = (Math.random() * 2) - 1;
        let directionY = (Math.random() * 2) - 1;
        let color = '#ffffff';
        
        particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
}

function animate() {
    requestAnimationFrame(animate);
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
    }
}

init();
animate();
