
export default function Home() {
  return (
    <div className="home-container">
      <div className="hero">
        <h1>💊 ניהול תרופות שבועי</h1>
        <p>מערכת קלה וידידותית לניהול לוח התרופות שלך בשבוע</p>
      </div>

      <div className="benefits">
        <h2>יתרונות המערכת:</h2>
        <ul>
          <li>✅ ניהול תרופות בהירור ומסודר</li>
          <li>📅 לוח זמנים שבועי מלא</li>
          <li>➕ הוספה וערוך תרופות בקלות</li>
          <li>🗑️ מחיקה גמישה (יום בודד או כל השבוע)</li>
          <li>📱 ממשק ידידותי וקל בשימוש</li>
        </ul>
      </div>

      <div className="cta">
        <a href="/weekly-table" className="btn btn-primary btn-large">
          לך לטבלה השבועית 📋
        </a>
      </div>
    </div>
  )
}