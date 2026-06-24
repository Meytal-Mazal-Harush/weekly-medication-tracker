
import { useSelector } from 'react-redux' 
import DayCard from '../components/DayCard' 
export default function WeeklyTable() {
  const week = useSelector(state => state.week)
  return (
    <div className="weekly-table-container">
      <h1>📋 הטבלה השבועית שלי</h1>
      <div className="days-grid">
        {week.map((day, index) => (
          <DayCard key={index} dayIndex={index} day={day} />
        ))}
        
      </div>
    </div>
 
)
}