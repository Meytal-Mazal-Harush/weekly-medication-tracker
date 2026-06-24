import { createSlice } from '@reduxjs/toolkit'
const initialState = [
  {
    name: 'ראשון',
    medicines: [
      { id: 1, name: 'נורמלול', amount: '2 כדורים' },
      { id: 2, name: 'טיפות עיניים', amount: '10 טיפות' },
      { id: 3, name: 'ויטמין D', amount: '1 כדור' }
    ]
  },
  {
    name: 'שני',
    medicines: [
      { id: 4, name: 'מגנזיום', amount: '1 כדור' },
      { id: 5, name: 'סירופ לשיעול', amount: '5 מ"ל' }
    ]
  },
  {
    name: 'שלישי',
    medicines: [
      { id: 6, name: 'אומגה 3', amount: '2 כמוסות' },
      { id: 7, name: 'ברזל', amount: '1 כדור' }
    ]
  },
  {
    name: 'רביעי',
    medicines: [
      { id: 8, name: 'ויטמין C', amount: '1 כדור מסיס' },
      { id: 9, name: 'נורופן', amount: '1 כדור' }
    ]
  },
  {
    name: 'חמישי',
    medicines: [
      { id: 10, name: 'B12', amount: '1 טבליה למציצה' },
      { id: 11, name: 'משאף', amount: '2 לחיצות' }
    ]
  },
  {
    name: 'שישי',
    medicines: [
      { id: 12, name: 'מולטי ויטמין', amount: '1 כדור' }
    ]
  },
  {
    name: 'שבת',
    medicines: [
      { id: 13, name: 'פרוביוטיקה', amount: '1 כמוסה' },
      { id: 14, name: 'אופטלגין', amount: '20 טיפות' }
    ]
  }
]
const weekSlice = createSlice({
  name: 'week', // השם הפנימי של ה-Slice לזיהוי ב-Redux Store
  initialState, // המצב ההתחלתי (המערך של 7 הימים שדיברנו עליו קודם)
  reducers: {
    
    // --- הוספת תרופה ליום או למספר ימים ---
    addMedicineToDay: (state, action) => {
      // חילוץ הנתונים מהחבילה (payload) שנשלחה מהקומפוננטה
      const { days, medicine } = action.payload 
      
      // ריצה בלולאה על כל אינדקס של יום שנבחר (למשל: [0, 2, 4])
      days.forEach(dayIndex => {
        // יצירת אובייקט תרופה חדש עם "תעודת זהות" ייחודית
        const newMedicine = {
          id: Date.now() + Math.random(), // יצירת מזהה רנדומלי מבוסס זמן
          name: medicine.name,           // שם התרופה (למשל: 'נורופן')
          amount: medicine.amount        // הכמות (למשל: '1 כדור')
        }
        // הוספת התרופה למערך התרופות של היום הספציפי
        state[dayIndex].medicines.push(newMedicine)
      })
    },

    // --- עדכון כמות של תרופה קיימת ---
    updateMedicineAmount: (state, action) => {
      // חילוץ המידע: איזה יום, איזו תרופה ומה הכמות החדשה
      const { dayIndex, medicineId, newAmount } = action.payload
      
      // חיפוש התרופה הספציפית בתוך היום המבוקש לפי ה-ID שלה
      const medicine = state[dayIndex].medicines.find(m => m.id === medicineId)
      
      // אם התרופה אכן נמצאה במערך
      if (medicine) {
        medicine.amount = newAmount // עדכון הכמות לערך החדש
      }
    },

    // --- הסרת תרופה מיום ספציפי בלבד ---
    removeMedicineFromDay: (state, action) => {
      const { dayIndex, medicineId } = action.payload
      
      // יצירת מערך חדש ללא התרופה שאנחנו רוצים למחוק
      // הפונקציה filter משאירה רק את מי שה-ID שלו שונה מזה ששלחנו
      state[dayIndex].medicines = state[dayIndex].medicines.filter(
        m => m.id !== medicineId
      )
    },

    // --- הסרת תרופה מכל ימי השבוע בבת אחת ---
    removeMedicineFromAllDays: (state, action) => {
      const { medicineName } = action.payload
      
      // מעבר על כל אחד מ-7 הימים ב-State
      state.forEach(day => {
        // בכל יום, סינון והסרה של כל תרופה בעלת אותו שם
        day.medicines = day.medicines.filter(m => m.name !== medicineName)
      })
    }
  }
})

// ייצוא הפעולות (Actions) כדי שנוכל להשתמש בהן במסכים (עם dispatch)
export const {
  addMedicineToDay,
  updateMedicineAmount,
  removeMedicineFromDay,
  removeMedicineFromAllDays
} = weekSlice.actions

// ייצוא הרדוסר עבור ה-Store הראשי
export default weekSlice.reducer