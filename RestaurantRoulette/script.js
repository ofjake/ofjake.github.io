const canvas = document.getElementById('wheel');
const ctx = canvas.getContext('2d');
const spinBtn = document.getElementById('spinBtn');
const addBtn = document.getElementById('addBtn');
const restaurantInput = document.getElementById('restaurantInput');
const restaurantList = document.getElementById('restaurantList');
const resultModal = document.getElementById('resultModal');
const winnerText = document.getElementById('winnerText');
const spinAgainBtn = document.getElementById('spinAgainBtn');

let restaurants = ['Tijuana Flats', 'Olive Garden', 'Chili\'s', 'Sonny\'s', 'Fish Tacos'];
let currentRotation = 0;
let isSpinning = false;

const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E2', '#F8B739', '#52B788'];

function drawWheel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = 180;
    const sliceAngle = (Math.PI * 2) / restaurants.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(currentRotation);

    restaurants.forEach((restaurant, i) => {
        const startAngle = i * sliceAngle;
        const endAngle = startAngle + sliceAngle;

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.arc(0, 0, radius, startAngle, endAngle);
        ctx.closePath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.fill();
        ctx.strokeStyle = 'white';
        ctx.lineWidth = 5;
        ctx.stroke();
        ctx.save();
        ctx.rotate(startAngle + sliceAngle / 2);
        ctx.textAlign = 'center';
        ctx.fillStyle = 'white';
        ctx.font = 'bold 18px Arial';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 3;
        ctx.fillText(restaurant, radius * 0.6, 5);
        ctx.restore();
    });

    ctx.beginPath();
    ctx.arc(0, 0, 10, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.restore();
}

function renderList() {
    restaurantList.innerHTML = '';
    restaurants.forEach((restaurant, index) => {
        const li = document.createElement('li');
        li.className = 'restaurant-item';
        li.innerHTML = `<span class="restaurant-name">${restaurant}</span><button class="remove-btn" onclick="removeRestaurant(${index})">Remove</button>`;
        restaurantList.appendChild(li);
    });
    drawWheel();
}

function addRestaurant() {
    const value = restaurantInput.value.trim();
    if (value && restaurants.length < 20) {
        restaurants.push(value);
        restaurantInput.value = '';
        renderList();
    }
}

function removeRestaurant(index) {
    if (restaurants.length > 2) {
        restaurants.splice(index, 1);
        renderList();
    } else {
        alert('You need at least 2 restaurants');
    }
}

function getSecureRandom() {
    const randomValue = new Uint32Array(1);
    crypto.getRandomValues(randomValue);
    return randomValue[0] / (0xffffffff + 1);
}

function spin() {
    if (isSpinning || restaurants.length < 2) return;

    isSpinning = true;
    spinBtn.disabled = true;

    const randomValue1 = getSecureRandom();
    const randomValue2 = getSecureRandom();
    const randomValue3 = getSecureRandom();

    const spinDuration = 2500 + randomValue1 * 4500;
    const rotations = 8 + randomValue2 * 12;
    const finalOffset = randomValue3 * 0.5;
    const targetRotation = currentRotation + (rotations * Math.PI * 2) + finalOffset;

    const startTime = Date.now();
    const startRotation = currentRotation;

    function animate() {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / spinDuration, 1);

        const easeOut = 1 - Math.pow(1 - progress, 4);
        currentRotation = startRotation + (targetRotation - startRotation) * easeOut;

        drawWheel();

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            isSpinning = false;
            spinBtn.disabled = false;
            showWinner();
        }
    }

    animate();
}

function showWinner() {
    const sliceAngle = (Math.PI * 2) / restaurants.length;
    const normalizedRotation = (currentRotation % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
    const pointerAngle = Math.PI * 1.5;
    const adjustedAngle = (pointerAngle - normalizedRotation + Math.PI * 2) % (Math.PI * 2);
    const winningIndex = Math.floor(adjustedAngle / sliceAngle);
    const winner = restaurants[winningIndex];

    winnerText.textContent = winner;
    resultModal.classList.add('show');
}

addBtn.addEventListener('click', addRestaurant);
restaurantInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addRestaurant();
});
spinBtn.addEventListener('click', spin);
spinAgainBtn.addEventListener('click', () => {
    resultModal.classList.remove('show');
    spinSaying();
});

renderList();



 const sayings = [
    "Would you like to get",
    "How about we have",
    "I'm hungry for some",
    "You know what sounds nice,..",
    "Let's get"
  ];

const sayingEl = document.getElementById("saying");

function spinSaying() {
  const random = Math.floor(Math.random() * sayings.length);
  sayingEl.textContent = sayings[random];
}

spinSaying();