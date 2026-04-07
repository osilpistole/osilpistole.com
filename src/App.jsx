import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import EmailSlideIn from './components/EmailSlideIn'
import Home from './pages/Home'
import WorkWithMe from './pages/WorkWithMe'
import SpeakingPage from './pages/SpeakingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'

function App() {
  return (
    <div className="bg-parchment text-ink font-body min-h-screen">
      <ScrollToTop />
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work-with-me" element={<WorkWithMe />} />
          <Route path="/speaking" element={<SpeakingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <EmailSlideIn />
    </div>
  )
}

export default App
