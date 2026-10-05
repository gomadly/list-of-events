import { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';

export interface EventItem {
  id: string;
  title: string;
  date: string;
}

function App() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [editingEvent, setEditingEvent] = useState<EventItem | null>(null);

  const handleAdd = (title: string, date: string) => {
    const newEvent: EventItem = {
      id: crypto.randomUUID(),
      title: title.trim(),
      date: date.trim(),
    };
    setEvents([...events, newEvent]);
  };

  const handleUpdate = (id: string, title: string, date: string) => {
    setEvents(
      events.map((event) =>
        event.id === id ? { ...event, title: title.trim(), date: date.trim() } : event
      )
    );
    setEditingEvent(null);
  };

  const handleDelete = (id: string) => {
    setEvents(events.filter((event) => event.id !== id));
    if (editingEvent?.id === id) {
      setEditingEvent(null);
    }
  };

  const startEdit = (event: EventItem) => {
    setEditingEvent(event);
  };

  const cancelEdit = () => {
    setEditingEvent(null);
  };

  return (
    <div className="app-container">
      <h1>Список мероприятий</h1>
      <EventForm
        onAdd={handleAdd}
        onUpdate={handleUpdate}
        editingEvent={editingEvent}
        onCancel={cancelEdit}
      />
      <EventList
        events={events}
        onDelete={handleDelete}
        onEdit={startEdit}
      />
    </div>
  );
}

export default App;