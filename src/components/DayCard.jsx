
import { Link } from 'react-router-dom' 
export default function DayCard({ dayIndex, day }) {
  const medicineNames = day.medicines.map(m => m.name).join(', ')
  return (
    <Link to={`/day/${dayIndex}`} className="day-card">
      <h3>{day.name}</h3>
      <p className="medicine-list">
        {medicineNames || 'אין תרופות'}
      </p>
      
    </Link>
  )
}