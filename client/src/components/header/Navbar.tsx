import { useNavigate } from "react-router-dom"
import { assets } from "../../assets/assets"

const Navbar = () => {

  const navigate = useNavigate();
  return (
    <div className=" w-full flex justify-between items-center p-4 sm:p-6 sm:px-24 absolute top-0">

      <img src={assets.logo} alt="" className="w-12 sm:w-16 h-12 sm:h-16 rounded-full" />

      <button onClick={() => navigate('/auth/login')} className="flex items-center gap-2 border border-gray-500 rounded-full 
        px-6 py-2 text-gray-800 hover:bg-gray-100 transition-all">Login
        <img src={assets.arrow_icon} alt="" /></button>

    </div>
  )
}

export default Navbar
