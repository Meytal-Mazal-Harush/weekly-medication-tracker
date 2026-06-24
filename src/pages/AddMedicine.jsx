
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { addMedicineToDay, updateMedicineAmount } from '../redux/slices/weekSlice'
//import './AddMedicine.css'

// מערך עזר להצגת שמות הימים בלופ על המסך
const daysOfWeek = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

export default function AddMedicine() {
  const dispatch = useDispatch() // פונקציה להפעלת רדוסרים מה-Redux
  const navigate = useNavigate() // פונקציה שמאפשרת לנו לנווט לדפים אחרים (כמו דף הבית)
  const { dayIndex, medicineId } = useParams() // שליפת פרמטרים משורת הכתובת במידה והגענו לדף עריכה
  
  // משתנה בוליאני שבודק אם יש לנו פרמטרים בכתובת - אם כן, אנחנו במצב עריכה
  const isEdit = !!dayIndex && !!medicineId
  
  // הגדרת ה-State של הטופס: ימים נבחרים (מערך), שם התרופה, כמות, ואובייקט שגיאות
  const [selectedDays, setSelectedDays] = useState(isEdit ? [parseInt(dayIndex)] : [])
  const [medicineName, setMedicineName] = useState('')
  const [amount, setAmount] = useState('')
  const [errors, setErrors] = useState({})

  // פונקציה לבדיקת תקינות השדות לפני השליחה - מוודאת שכלום לא ריק ושנבחר יום
  const validateForm = () => {
    const newErrors = {}
    if (selectedDays.length === 0) { newErrors.days = 'בחר לפחות יום אחד' }
    if (!medicineName.trim()) { newErrors.name = 'שם התרופה חובה' }
    if (!amount.trim()) { newErrors.amount = 'הכמות חובה' }
    setErrors(newErrors) // מעדכן את מצב השגיאות כדי להציג אותן ב-UI
    return Object.keys(newErrors).length === 0 // מחזיר true אם אין שגיאות
  }

  // פונקציה שמוסיפה או מסירה אינדקס של יום מהמערך selectedDays בלחיצה על הצ'קבוקס
  const handleDayToggle = (index) => {
    if (isEdit) return // אם אנחנו בעריכה, לא ניתן לשנות את היום של התרופה
    setSelectedDays(prev =>
      prev.includes(index) ? prev.filter(d => d !== index) : [...prev, index]
    )
  }

  // פונקציה שמופעלת בלחיצה על כפתור ה-submit של הטופס
  const handleSubmit = (e) => {
    e.preventDefault() // מונע מהדפדפן לבצע רענון לדף
    if (!validateForm()) return // אם הוולידציה נכשלה, עוצרים כאן ולא שומרים

    if (isEdit) {
      // במידה ואנחנו בעריכה: שולחים ל-Redux רק את עדכון הכמות לפי האינדקס וה-ID
      dispatch(updateMedicineAmount({
        dayIndex: parseInt(dayIndex),
        medicineId: medicineId,
        newAmount: amount
      }))
    } else {
      // במידה וזו תרופה חדשה: שולחים את רשימת הימים ואת פרטי התרופה ליצירה
      dispatch(addMedicineToDay({
        days: selectedDays,
        medicine: { name: medicineName, amount }
      }))
    }
    navigate('/weekly-table') // ניווט חזרה לטבלה השבועית לאחר סיום הפעולה
  }

  return (
    <div className="add-medicine-container">
      {/* כותרת משתנה לפי המצב - עריכה או הוספה */}
      <h1>{isEdit ? '✏️ עדכון כמות' : '➕ הוספת תרופה'}</h1>
      
      <form onSubmit={handleSubmit} className="medicine-form">
        {/* בחירת ימים: מוצגת רק אם אנחנו לא במצב עריכה */}
        {!isEdit && (
          <div className="form-group">
            <label>בחר ימים:</label>
            <div className="days-selector">
              {daysOfWeek.map((day, index) => (
                <label key={index} className="day-checkbox">
                  <input
                    type="checkbox"
                    checked={selectedDays.includes(index)}
                    onChange={() => handleDayToggle(index)}
                  />
                  <span>{day}</span>
                </label>
              ))}
            </div>
            {/* הצגת הודעת שגיאה אם לא נבחר יום */}
            {errors.days && <p className="error">{errors.days}</p>}
          </div>
        )}

        {/* שדה הזנת שם התרופה: חסום לשינוי במצב עריכה */}
        <div className="form-group">
          <label htmlFor="medicine-name">שם התרופה:</label>
          <input
            id="medicine-name"
            type="text"
            value={medicineName}
            onChange={(e) => setMedicineName(e.target.value)}
            disabled={isEdit}
            placeholder="הזן שם תרופה"
            className={errors.name ? 'input-error' : ''}
          />
          {errors.name && <p className="error">{errors.name}</p>}
        </div>

        {/* שדה הזנת כמות התרופה */}
        <div className="form-group">
          <label htmlFor="amount">כמות:</label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="דוגמה: 2 כדורים"
            className={errors.amount ? 'input-error' : ''}
          />
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>

        {/* כפתור השליחה שמשנה את הטקסט שלו בהתאם לפעולה */}
        <button type="submit" className="btn btn-primary">
          {isEdit ? '✅ עדכן' : '✅ הוסף'}
        </button>
      </form>
    </div>
  )
}