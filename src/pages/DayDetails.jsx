//פרי
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { removeMedicineFromDay, removeMedicineFromAllDays } from '../redux/slices/weekSlice'
import MedicineItem from '../components/MedicineItem'
import ConfirmDialog from '../components/ConfirmDialog'
//import './DayDetails.css'

export default function DayDetails() {
  const { dayIndex } = useParams() 
  const dispatch = useDispatch() // כלי לשליחת פעולות ל-Redux
  const navigate = useNavigate() // כלי לניווט בין דפים
  const week = useSelector(state => state.week)
  const day = week[parseInt(dayIndex)]

  const [deleteDialog, setDeleteDialog] = useState(null)
  if (!day) {
    return <div className="not-found">היום לא נמצא</div>
  }
// פונקציה שפעולת כאשר MEDICINITEM אומרת לה שרוצים למחוק משהוא והיא שומרת שתי משתנים בסטייס המקומי
  const handleDeleteClick = (dayIdx, medicine) => {
    setDeleteDialog({ dayIndex: dayIdx, medicine })
  }

  
  const handleConfirmDelete = (type) => {
    if (type === 'day') {
      // מחיקה מהיום הנוכחי בלבד לפי ID
      dispatch(removeMedicineFromDay({
        dayIndex: deleteDialog.dayIndex,
        medicineId: deleteDialog.medicine.id
      }))
    } else if (type === 'all') {
      // מחיקה מכל ימי השבוע לפי שם התרופה
      dispatch(removeMedicineFromAllDays({
        medicineName: deleteDialog.medicine.name
      }))
    }
    setDeleteDialog(null) // סגירת המודל לאחר סיום הפעולה
  }

  return (
    <div className="day-details-container">
      {/* כפתור חזרה לדף הטבלה השבועית */}
      <button onClick={() => navigate('/weekly-table')} className="btn btn-back">
        ← חזור
      </button>

      {/* שם היום שנשלף מה-State (למשל: יום ראשון) */}
      <h1>{day.name}</h1>

      <div className="medicines-list">
        {/* בדיקה: אם יש תרופות נשתמש ב-map להציג אותן, אחרת נציג הודעה שאין תרופות */}
        {day.medicines.length > 0 ? (
          day.medicines.map(medicine => (
            <MedicineItem
              key={medicine.id}
              dayIndex={parseInt(dayIndex)}
              medicine={medicine}
              onDelete={handleDeleteClick} // העברת הפונקציה שפותחת את המודל כ-Callback
            />
          ))
        ) : (
          <p className="no-medicines">אין תרופות ליום זה</p>
        )}
      </div>

      {/* הצגה מותנית של המודל: רק אם deleteDialog אינו null */}
      {deleteDialog && (
        <ConfirmDialog
          medicineName={deleteDialog.medicine.name}
          onConfirm={handleConfirmDelete}
          onCancel={() => setDeleteDialog(null)} // ביטול וסגירת המודל
        />
      )}
    </div>
  )
}