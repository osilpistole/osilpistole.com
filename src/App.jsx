import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import BackToTop from './components/BackToTop'
import EmailSlideIn from './components/EmailSlideIn'
import Home from './pages/Home'
import WorkWithMe from './pages/WorkWithMe'
import SpeakingPage from './pages/SpeakingPage'
import ConsultingPage from './pages/ConsultingPage'
import MentoringPage from './pages/MentoringPage'
import CoachingPage from './pages/CoachingPage'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import SpeakingTopicsPage from './pages/SpeakingTopicsPage'
import ConsultingServicesPage from './pages/ConsultingServicesPage'
import MentoringAreasPage from './pages/MentoringAreasPage'

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
          <Route path="/consulting" element={<ConsultingPage />} />
          <Route path="/mentoring" element={<MentoringPage />} />
          <Route path="/coaching" element={<CoachingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/speaking/topics" element={<SpeakingTopicsPage />} />
          <Route path="/consulting/services" element={<ConsultingServicesPage />} />
          <Route path="/mentoring/areas" element={<MentoringAreasPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <EmailSlideIn />
    </div>
  )
}

export default App
