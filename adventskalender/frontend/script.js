const API_URL = "https://dein-backend.onrender.com";

const calendar = document.getElementById('calendar');
const registrationForm = document.getElementById('registrationForm');
const selectedDaySpan = document.getElementById('selectedDay');
const message = document.getElementById('message');
let selectedDay = null;

async function fetchBookings() {
const res = await fetch(`${API_URL}/api/bookings`);
return res.json();
}

async function renderCalendar() {
const bookings = await fetchBookings();
for (let i = 1; i <= 24; i++) {
const dayDiv = document.createElement('div');
dayDiv.classList.add('day');

if (bookings[i]) {
dayDiv.classList.add('booked');
dayDiv.textContent = `${i}. Dezember
${bookings[i]}`;
} else {
dayDiv.textContent = `${i}. Dezember`;
dayDiv.addEventListener('click', () => openForm(i));
}

calendar.appendChild(dayDiv);
}
}

function openForm(day) {
selectedDay = day;
selectedDaySpan.textContent = day;
registrationForm.style.display = 'block';
message.textContent = '';
}

async function register() {
const name = document.getElementById('nameInput').value;
if (!name) {
message.textContent = 'Bitte einen Namen eingeben!';
return;
}

const response = await fetch(`${API_URL}/api/bookings`, {
method: 'POST',
headers: { 'Content-Type': 'application/json' },
body: JSON.stringify({ day: selectedDay, name }),
});

const result = await response.json();

if (result.success) {
alert(`Du hast dich erfolgreich für den ${selectedDay}. Dezember registriert!`);
window.location.reload();
} else {
message.textContent = result.error;
}
}

renderCalendar();