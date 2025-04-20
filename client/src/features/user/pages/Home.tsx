import Header from "../../../components/header/Header"
import Navbar from "../../../components/header/Navbar"

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen items-center 
    justify-center bg-[url('./assets/bg_img.png')] bg-cover bg-center ">
        <Navbar/>
        <Header/>
    </div>
  )
}

export default Home
