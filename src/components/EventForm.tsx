import { useState, useEffect } from 'react';
import { EventItem } from '../App';

interface EventFormProps {
  onAdd: (title: string, date: string) => void;
  onUpdate: (id: string, title: string, date: string) => void;
  editingEvent: EventItem | null;
  onCancel: () => void;
}

export default function EventForm({ onAdd, onUpdate, editingEvent, onCancel }: EventFormProps) {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (editingEvent) {
      setTitle(editingEvent.title);
      setDate(editingEvent.date);
    } else {
      setTitle('');
      setDate('');
    }
    setError('');
  }, [editingEvent]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !date.trim()) {
      setError('Название и дата не могут быть пустыми');
      return;
    }

    if (editingEvent) {
      onUpdate(editingEvent.id, title, date);
    } else {
      onAdd(title, date);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="event-form">
      {error && <p className="error-message">{error}</p>}

      <div className="form-group">
        <label htmlFor="title">Название:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Введите название мероприятия"
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Дата:</label>
        <input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div className="form-buttons">
        {editingEvent ? (
          <>
            <button type="submit" className="btn-edit">Редактировать</button>
            <button type="button" className="btn-cancel" onClick={onCancel}>Отмена</button>
          </>
        ) : (
          <button type="submit" className="btn-add">Добавить</button>
        )}
      </div>
    </form>
  );
}