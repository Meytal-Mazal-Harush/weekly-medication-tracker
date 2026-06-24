import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { updateMedicineAmount } from '../redux/slices/weekSlice'
// ...existing code...

export default function EditMedicine() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { dayIndex, medicineId } = useParams()

  const week = useSelector((state) => state.week)
  const day = week[parseInt(dayIndex, 10)]

  const [medicineName, setMedicineName] = useState('')
  const [amount, setAmount] = useState('') // תמיד כמחרוזת
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (!day) return

    const medIdStr = String(medicineId)
    const medicine = day.medicines.find((m) => String(m.id) === medIdStr)

    if (medicine) {
      setMedicineName(medicine.name || '')
      setAmount(medicine.amount != null ? String(medicine.amount) : '')
    }
  }, [day, medicineId])

  const validateForm = () => {
    const newErrors = {}
    if (!String(medicineName).trim()) newErrors.name = 'שם התרופה חובה'
    if (!String(amount).trim()) newErrors.amount = 'הכמות חובה'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // המרה חכמה: אם הכניסה היא מספר נקי - נשמור כמספר, אחרת נשמור כמחרוזת
  const normalizeAmountForStore = (val) => {
    const s = String(val).trim()
    if (/^-?\d+(\.\d+)?$/.test(s)) return Number(s)
    return s
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const dayIndexInt = parseInt(dayIndex, 10)
    const medicineIdInt = Number.isNaN(parseInt(medicineId, 10))
      ? medicineId
      : parseInt(medicineId, 10)

    const payloadAmount = normalizeAmountForStore(amount)

    dispatch(
      updateMedicineAmount({
        dayIndex: dayIndexInt,
        medicineId: medicineIdInt,
        newAmount: payloadAmount
      })
    )

    navigate(`/day/${dayIndex}`)
  }

  if (!day) {
    return <div className="not-found">היום לא נמצא</div>
  }

  const medicine = day.medicines.find((m) => String(m.id) === String(medicineId))
  if (!medicine) {
    return <div className="not-found">התרופה לא נמצאה</div>
  }

  return (
    <div className="add-medicine-container card">
      <h1>✏️ עדכון כמות</h1>

      <form onSubmit={handleSubmit} className="medicine-form">
        <div className="form-group form-field">
          <label>יום:</label>
          <input type="text" value={day.name} disabled />
        </div>

        <div className="form-group form-field">
          <label htmlFor="medicine-name">שם התרופה:</label>
          <input id="medicine-name" type="text" value={medicineName} disabled />
        </div>

        <div className="form-group form-field">
          <label htmlFor="amount">כמות:</label>
          <input
            id="amount"
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="דוגמה: 2 או '2 כדורים'"
            className={errors.amount ? 'input-error' : ''}
          />
          {errors.amount && <p className="error">{errors.amount}</p>}
        </div>

        <button type="submit" className="btn btn-primary">
          עדכן
        </button>
      </form>
    </div>
  )
}
//