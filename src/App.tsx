import About from "./components/About"
import Experiences from "./components/Experiences"
import Footer from "./components/Footer"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Projects from "./components/Projects"
export default function App() {
  return (
    <div>
      <div className="p-5 md:px-[10%]">
        <Navbar />
        <Home />
      </div>
      <About />
      <div className="p-5 md:p-0 md:px-[10%]">
        <Experiences />
      </div>
      <div className="p-5 md:px-[10%]">
        <Projects />
      </div>
      <Footer />
    </div>
  )
}