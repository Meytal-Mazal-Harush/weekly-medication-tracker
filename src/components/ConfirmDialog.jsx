//פריט דיאלוג אישור למחיקת תרופה. הוא מופיע כשמשתמש לוחץ על כפתור המחיקה בפריט התרופה, ומאפשר לו לבחור אם למחוק את התרופה רק מהיום הנוכחי או מכל השבוע.
//import './ConfirmDialog.css' // ייבוא העיצוב (חשוב במיוחד כאן כדי ליצור את אפקט השכבה מעל המסך)

// הקומפוננטה מקבלת:
// medicineName - שם התרופה (כדי להציג למשתמש מה הוא עומד למחוק)
// onConfirm - פונקציה שמקבלת 'day' או 'all' ומבצעת את המחיקה ב-Redux
// onCancel - פונקציה שפשוט סוגרת את המודל ללא שינוי
export default function ConfirmDialog({ medicineName, onConfirm, onCancel }) {
  return (
    /* השכבה השחורה השקופה שחוסמת את שאר המסך */
    <div className="modal-overlay"> 
      
      {/* התיבה הלבנה שבמרכז המסך */}
      <div className="modal-content">
        <h3>מחיקת תרופה</h3>
        {/* שימוש בשם התרופה הופך את הדיאלוג לאישי וברור יותר */}
        <p>בחר את אפשרות המחיקה עבור <strong>{medicineName}</strong>:</p>
        
        {/* אזור כפתורי הבחירה */}
        <div className="dialog-options">
          
          {/* כפתור למחיקה מקומית - שולח את המחרוזת 'day' */}
          <button 
            onClick={() => onConfirm('day')} 
            className="btn btn-secondary"
          >
            הסר מיום זה בלבד
          </button>

          {/* כפתור למחיקה גלובלית - שולח את המחרוזת 'all' */}
          <button 
            onClick={() => onConfirm('all')} 
            className="btn btn-danger"
          >
            הסר מכל השבוע
          </button>
          
        </div>
        
        {/* כפתור יציאה ללא פעולה */}
        <button onClick={onCancel} className="btn btn-outline">
          ביטול
        </button>
        
      </div>
    </div>
  )
}