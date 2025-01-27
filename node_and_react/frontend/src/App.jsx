import { useState } from 'react';
import './styles.css';

function App() {
  const [subjects, setSubjects] = useState([
    { id: 1, name: 'Analiza Matematyczna', duration: 2 },
    { id: 2, name: 'Język Angielski C1', duration: 1.5 },
    { id: 3, name: 'Programowanie', duration: 3 },
    { id: 4, name: 'Fizyka', duration: 2 },
    { id: 5, name: 'Historia', duration: 1 },
  ]);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');

  const renderSubjects = () => {
    return subjects.map(subject => (
      <tr key={subject.id} className="subject-item">
        <td className="subject-name">{subject.name}</td>
        <td className="subject-duration">{subject.duration} godzin</td>
        <td>
          <button className="delete-button" onClick={() => removeSubject(subject.id)}>Usuń</button>
        </td>
      </tr>
    ));
  };

  const addSubject = () => {
    if (name.trim() === '' || duration.trim() === '') {
      alert('Proszę wypełnić oba pola.');
      return;
    }

    const durationValue = parseFloat(duration);

    if (isNaN(durationValue) || durationValue <= 0) {
      alert('Czas trwania musi być dodatnią liczbą rzeczywistą.');
      return;
    }

    const newId = subjects.length > 0 ? subjects[subjects.length - 1].id + 1 : 1;
    setSubjects([...subjects, { id: newId, name, duration: durationValue }]);

    setName('');
    setDuration('');
  };

  const removeSubject = id => {
    setSubjects(subjects.filter(subject => subject.id !== id));
  };

  const saveToJson = () => {
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
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      addSubject();
    }
  };

  return (
    <div className="container">
      <h1>Plan Dnia na Studiach</h1>
      <div className="add-subject" onKeyUp={handleKeyPress}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Nazwa przedmiotu"
        />
        <input
          type="number"
          value={duration}
          onChange={e => setDuration(e.target.value)}
          placeholder="Czas trwania w godzinach"
          min="0.5"
          step="0.5"
          required
        />
        <button onClick={addSubject}>Dodaj</button>
      </div>
      <table className="subject-list">{renderSubjects()}</table>
      <button className="save-button" onClick={saveToJson}>
        Zapisz Plan do JSON
      </button>
    </div>
  );
};

export default App;