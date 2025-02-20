let subjects = [
  { id: 1, name: 'Analiza Matematyczna', duration: 2 },
  { id: 2, name: 'Język Angielski C1', duration: 1.5 },
  { id: 3, name: 'Programowanie', duration: 3 },
  { id: 4, name: 'Fizyka', duration: 2 },
  { id: 5, name: 'Historia', duration: 1 },
];

function renderSubjects() {
const subjectList = document.getElementById('subject-list');
subjectList.innerHTML = '';

subjects.forEach(subject => {
  const li = document.createElement('li');
  li.className = 'subject-item';
  
  const nameSpan = document.createElement('span');
  nameSpan.className = 'subject-name';
  nameSpan.textContent = subject.name;
  
  const durationSpan = document.createElement('span');
  durationSpan.className = 'subject-duration';
  durationSpan.textContent = `${subject.duration} godzin`;
  
  const deleteButton = document.createElement('button');
  deleteButton.className = 'delete-button';
  deleteButton.textContent = 'Usuń';
  deleteButton.onclick = () => removeSubject(subject.id);
  
  li.appendChild(nameSpan);
  li.appendChild(durationSpan);
  li.appendChild(deleteButton);
  
  subjectList.appendChild(li);
});
}

function addSubject() {
const nameInput = document.getElementById('subject-name');
const durationInput = document.getElementById('subject-duration');

const name = nameInput.value.trim();
const durationValue = durationInput.value.trim();

if (name === '' || durationValue === '') {
  alert('Proszę wypełnić oba pola.');
  return;
}

const duration = parseFloat(durationValue);

if (isNaN(duration) || duration <= 0) {
  alert('Czas trwania musi być dodatnią liczbą rzeczywistą.');
  return;
}

const newId = subjects.length > 0 ? subjects[subjects.length - 1].id + 1 : 1;
subjects.push({ id: newId, name, duration });

nameInput.value = '';
durationInput.value = '';

renderSubjects();
}

function removeSubject(id) {
subjects = subjects.filter(subject => subject.id !== id);
renderSubjects();
}

function saveToJson() {
const dataStr = JSON.stringify(subjects, null, 2);
const blob = new Blob([dataStr], { type: 'application/json' });
const url = URL.createObjectURL(blob);

const link = document.createElement('a');
link.href = url;
link.download = 'plan_dnia.json';
document.body.appendChild(link);
link.click();

document.body.removeChild(link);
URL.revokeObjectURL(url);
}

document.getElementById('add-button').addEventListener('click', addSubject);
document.getElementById('save-button').addEventListener('click', saveToJson);

document.querySelector('.add-subject').addEventListener('keypress', function(e) {
if (e.key === 'Enter') {
  addSubject();
}
});

renderSubjects();
