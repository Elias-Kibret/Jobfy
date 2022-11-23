import { useAppContext } from "../context/appContext"

const Alet = () => {
  const {alertType,alertText}=useAppContext()
  return (
    <div className={`alert alert-${alertType}`}>{ alertText}</div>
  )
}
export default Alet