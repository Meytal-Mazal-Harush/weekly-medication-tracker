//פריט תורופה בודד ברשימת התר של היום. הוא מציג את שם התרופה, הכמות שלה, וכפתורים לעדכון ומחיקה.
import { Link } from 'react-router-dom' // ייבוא רכיב הקישור למעבר דף העריכה
//import './MedicineItem.css' // ייבוא קובץ העיצוב (מרווחים, צבעי כפתורים וכו')

// הקומפוננטה מקבלת 3 Props:
// dayIndex - אינדקס היום (לצורך ניתוב)
// medicine - אובייקט התרופה המלא (שם, כמות, ID)
// onDelete - פונקציה שקיבלנו מהאבא (callback) כדי לבצע את המחיקה
export default function MedicineItem({ dayIndex, medicine, onDelete }) {
  return (
    <div className="medicine-item">
      
      {/* הצגת המידע על התרופה */}
      <div className="medicine-info">
        <h4>{medicine.name}</h4> {/* שם התרופה בולט יותר */}
        <p>{medicine.amount}</p>   {/* הכמות (למשל: "2 כדורים") */}
      </div>

      {/* אזור הכפתורים (פעולות) */}
      <div className="medicine-actions">
        
        {/* כפתור עדכון: הוא בעצם Link שמעביר את המשתמש לנתיב העריכה */}
        {/* שים לב לדינמיות: ה-URL כולל גם את היום וגם את ה-ID של התרופה */}
        <Link 
          to={`/edit-medicine/${dayIndex}/${medicine.id}`}
          className="btn btn-edit"
        >
          ✏️ עדכון
        </Link>

        {/* כפתור מחיקה: כפתור רגיל (button) שמפעיל אירוע לחיצה */}
        <button 
          onClick={() => onDelete(dayIndex, medicine)} // הפעלת פונקציית המחיקה עם הנתונים הרלוונטיים
          className="btn btn-delete"
        >
          🗑️ מחיקה
        </button>
        
      </div>
    </div>
  )
}