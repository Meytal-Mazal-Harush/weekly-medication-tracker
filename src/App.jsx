import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import Home from './pages/Home'
import WeeklyTable from './pages/WeeklyTable'
import AddMedicine from './pages/AddMedicine'
import DayDetails from './pages/DayDetails'
import EditMedicine from './pages/EditMedicine'
import './App.css'

function App() {
  return (
    <Router>
      <Navigation />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weekly-table" element={<WeeklyTable />} />
          <Route path="/add-medicine" element={<AddMedicine />} />
          <Route path="/edit-medicine/:dayIndex/:medicineId" element={<EditMedicine />} />
          <Route path="/day/:dayIndex" element={<DayDetails />} />
        </Routes>
      </main>
    </Router>
  )
}

export default App