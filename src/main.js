import '../src/style.css';
import dayjs from 'dayjs';

const dateForm = document.getElementById('dateForm');
const birthDateInput = document.getElementById('birthDate');
const resultDialog = document.getElementById('resultDialog');
const dialogMessage = document.getElementById('dialogMessage');
const closeDialogBtn = document.getElementById('closeDialog');

dateForm.addEventListener('submit', (event) => {
  event.preventDefault(); // Zapobiega przeładowaniu strony

  const birthDateValue = birthDateInput.value;
  if (!birthDateValue) return;

  const today = dayjs();
  const birthDate = dayjs(birthDateValue);

  const daysDiff = today.diff(birthDate, 'days');

  const isBirthdayToday = today.format('MM-D') === birthDate.format('MM-D');

  if (isBirthdayToday) {
    alert("Wszystkiego najlepszego!");
  }

  dialogMessage.textContent = `Od Twoich narodzin minęło już ${daysDiff} dni!`;
  resultDialog.showModal(); // Standardowa metoda HTML5 dla elementu <dialog>
});

closeDialogBtn.addEventListener('click', () => {
  resultDialog.close();
});