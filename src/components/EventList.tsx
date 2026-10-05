import { EventItem } from '../App';

interface EventListProps {
  events: EventItem[];
  onDelete: (id: string) => void;
  onEdit: (event: EventItem) => void;
}

export default function EventList({ events, onDelete, onEdit }: EventListProps) {
  if (events.length === 0) {
    return <p className="empty-list">Список мероприятий пуст</p>;
  }

  return (
    <ul className="event-list">
      {events.map((event) => (
        <li key={event.id} className="event-item">
          <div className="event-info">
            <span className="event-title">{event.title}</span>
            <span className="event-date">{event.date}</span>
          </div>
          <div className="event-actions">
            <button onClick={() => onEdit(event)} className="btn-edit">Редактировать</button>
            <button onClick={() => onDelete(event.id)} className="btn-delete">Удалить</button>
          </div>
        </li>
      ))}
    </ul>
  );
}