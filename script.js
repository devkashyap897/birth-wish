// ====== Countdown since 3 May 2008 =======
const countdownEl = document.getElementById('countdown');
const startDate = new Date(2008, 4, 3, 0, 0, 0); // May is month 4 (0-based)

// Helper function to calculate elapsed time parts
function elapsedTimeParts(fromDate, toDate) {
  let years = toDate.getFullYear() - fromDate.getFullYear();
  let months = toDate.getMonth() - fromDate.getMonth();
  let days = toDate.getDate() - fromDate.getDate();
  let hours = toDate.getHours() - fromDate.getHours();
  let minutes = toDate.getMinutes() - fromDate.getMinutes();
  let seconds = toDate.getSeconds() - fromDate.getSeconds();

  // Adjust for negatives
  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    // get days in previous month
    const prevMonth = new Date(toDate.getFullYear(), toDate.getMonth(), 0).getDate();
    days += prevMonth;
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  // Calculate weeks from days
  let weeks = Math.floor(days / 7);
  days = days % 7;

  return {years, months, weeks, days, hours, minutes, seconds};
}

function updateElapsed() {
  const now = new Date();
  const elapsed = elapsedTimeParts(startDate, now);
  countdownEl.textContent = 
    `Time since 03 May 2008: ${elapsed.years} years, ${elapsed.months} months, ` +
    `${elapsed.weeks} weeks, ${elapsed.days} days, ${elapsed.hours} hours, ` +
    `${elapsed.minutes} minutes, ${elapsed.seconds} seconds`;
}

setInterval(updateElapsed, 1000);
updateElapsed();

// ===== Balloon animation =====
const canvas = document.getElementById('balloons');
const ctx = canvas.getContext('2d');
let width, height;

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Balloon {
  constructor() {
    this.x = Math.random() * width;
    this.y = height + 50 + Math.random() * 100;
    this.size = 20 + Math.random() * 30;
    this.speed = 0.5 + Math.random() * 1;
    this.color = `hsl(${Math.random() * 360}, 70%, 75%)`;
    this.drift = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.y -= this.speed;
    this.x += this.drift;
    if (this.y + this.size < 0) {
      this.x = Math.random() * width;
      this.y = height + 50;
      this.size = 20 + Math.random() * 30;
      this.speed = 0.5 + Math.random();
      this.color = `hsl(${Math.random() * 360}, 70%, 75%)`;
      this.drift = (Math.random() - 0.5) * 0.5;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.size * 0.7, this.size, 0, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    // String
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.size);
    ctx.lineTo(this.x, this.y + this.size + 40);
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
  }
}

const balloons = [];
for(let i = 0; i < 30; i++) {
  balloons.push(new Balloon());
}

function animate() {
  ctx.clearRect(0, 0, width, height);
  for(let b of balloons) {
    b.update();
    b.draw();
  }
  requestAnimationFrame(animate);
}
animate();

const popup = document.getElementById('imgPopup');
const popupMessage = document.getElementById('popupMessage');

function showPopup(name) {
  popupMessage.textContent = `Happy Birthday, ${name}! 💖`;
  popup.style.display = 'flex';
  popup.focus();
}

function closePopup() {
  popup.style.display = 'none';
}

const wheel = document.getElementById('wheel');
const spinBtn = document.getElementById('spinBtn');
const giftMessage = document.getElementById('giftMessage');
let isSpinning = false;

const gifts = [
  "Arre, iski muskaan toh jaise chaandni raat mein roshni bikherti ho.",
  "Chehra aisa, jaise subah ka pehla suraj — narm, halka, lekin manmohak.",
  "Uski aankhon mein aisi baat hai, jaise kahaani keh rahi ho bina kuch bole.",
  "Jaise hi vo aaye, poori jagah mein ek alag si roshni chha jaati hai.",
  "Khubsurti sirf chehre mein nahi, uske har andaaz mein basi hai.",
  "Chalti hai toh lagta hai jaise phoolon ki mahak saath chal rahi ho.",
  "Uski simplicity hi uska sabse bada gehna hai.",
  "Main pairan di mitti,tere pairan di mitti tu he mera kohinoor vees",
  "only noor",
  "Vo sundarta ka matlab hi badal deti hai — dil se, soch se, aur roop se bhi.",
  "thay one mahila mitra when the topic is beauty",
  "noor-e-jahan",
];

function spinWheel() {
  if (isSpinning) return;
  isSpinning = true;
  giftMessage.textContent = "Spinning...";
  spinBtn.setAttribute('aria-disabled', 'true');
  wheel.setAttribute('aria-pressed', 'true');

  const spins = Math.floor(Math.random() * 5) + 5; // 5 to 9 spins
  const degreesPerSlice = 360 / gifts.length;
  const randomSlice = Math.floor(Math.random() * gifts.length);
  const finalDegree = (spins * 360) + (randomSlice * degreesPerSlice) + degreesPerSlice / 2;

  wheel.style.transition = "transform 5s cubic-bezier(0.33, 1, 0.68, 1)";
  wheel.style.transform = `rotate(${finalDegree}deg)`;

  setTimeout(() => {
    isSpinning = false;
    giftMessage.textContent = `You got: ${gifts[randomSlice]}! 🎉`;
    spinBtn.setAttribute('aria-disabled', 'false');
    wheel.setAttribute('aria-pressed', 'false');
  }, 5200);
}

spinBtn.addEventListener('click', spinWheel);
