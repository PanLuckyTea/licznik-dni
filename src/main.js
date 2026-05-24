import '../src/style.css';
import dayjs from 'dayjs';

const dateForm = document.getElementById('dateForm');
const birthDateInput = document.getElementById('birthDate');
const resultDialog = document.getElementById('resultDialog');
const dialogMessage = document.getElementById('dialogMessage');
const closeDialogBtn = document.getElementById('closeDialog');

dateForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const birthDateValue = birthDateInput.value;
  if (!birthDateValue) return;

  const today = dayjs();
  const birthDate = dayjs(birthDateValue);

  const daysDiff = today.diff(birthDate, 'days');

  const isBirthdayToday = today.format('MM-DD') === birthDate.format('MM-DD');

  if (isBirthdayToday) {
    alert("Wszystkiego najlepszego! 🎂🎉");
  }

  let nextBirthday = dayjs(`${today.year()}-${birthDate.format('MM-DD')}`);

  if (nextBirthday.isBefore(today, 'day') && !isBirthdayToday) {
    nextBirthday = nextBirthday.add(1, 'year');
  }

  const daysUntil = nextBirthday.diff(today, 'days');
  // Przeliczamy na tygodnie (zaokrąglamy w dół)
  const weeksUntil = Math.floor(daysUntil / 7);

  let resultText = `Od Twoich narodzin minęło ${daysDiff} dni.`;

  if (!isBirthdayToday) {
    if (weeksUntil === 0) {
      resultText += `<br><strong>Masz urodziny w tym tygodniu!</strong>`;
    } else {
      resultText += `<br>Do Twoich urodzin pozostało tygodni: ${weeksUntil}.`;
    }
  }
  dialogMessage.innerHTML = resultText;
  resultDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
  resultDialog.close();
});