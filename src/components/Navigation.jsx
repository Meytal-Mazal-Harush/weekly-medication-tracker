import { Link } from 'react-router-dom'
export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-link">🏠 דף בית</Link>
        <Link to="/weekly-table" className="nav-link">📋 הטבלה השבועית</Link>
        <Link to="/add-medicine" className="nav-link">➕ הוספת תרופה</Link>
      </div>
    </nav>
  )
}