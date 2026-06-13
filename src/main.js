import './style.css';
import dayjs from 'dayjs';

const dateForm = document.getElementById('dateForm');
const birthDateInput = document.getElementById('birthDate');
const resultDialog = document.getElementById('resultDialog');
const closeDialog = document.getElementById('closeDialog');
const dialogMessage = document.getElementById('dialogMessage');

dateForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const birthDateValue = birthDateInput.value;

  if (!birthDateValue) {
    return; 
  }

  const today = dayjs().startOf('day');
  const birthDate = dayjs(birthDateValue).startOf('day');

  const daysPassed = today.diff(birthDate, 'day');

  if (daysPassed < 0) {
    dialogMessage.innerHTML = "Wygląda na to, że podano datę z przyszłości! 👶";
    resultDialog.showModal();
    return;
  }

  let message = `Od Twoich narodzin minęło już <strong>${daysPassed}</strong> dni.`;

  const currentYear = today.year();
  let nextBirthday = birthDate.year(currentYear);

  if (nextBirthday.isBefore(today, 'day')) {
    nextBirthday = nextBirthday.add(1, 'year');
  }

  const isBirthdayToday = today.format('MM-DD') === birthDate.format('MM-DD');

  if (isBirthdayToday) {
    message += "<br><span class='text-xl block mt-2 font-bold text-green-600'>🎉 Wszystkiego najlepszego! 🎉</span>";
  } else {
    const daysToBirthday = nextBirthday.diff(today, 'day');
    const weeksToBirthday = Math.ceil(daysToBirthday / 7);

    if (daysToBirthday <= 7) {
      message += "<br><span class='font-semibold block mt-2'>Masz urodziny w tym tygodniu! 🎂</span>";
    } else {
      message += `<br>Do Twoich kolejnych urodzin pozostało ok. <strong>${weeksToBirthday}</strong> tygodni.`;
    }
  }

  dialogMessage.innerHTML = message;
  
  resultDialog.showModal(); 
});

closeDialog.addEventListener('click', () => {
  resultDialog.close();
});