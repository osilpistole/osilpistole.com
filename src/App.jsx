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
import AwakenAndAlignPage from './pages/AwakenAndAlignPage'
import AwakenJournalPage from './pages/AwakenJournalPage'
import PresencePage from './pages/PresencePage'
import ProgramsPage from './pages/ProgramsPage'
import ProductPage from './pages/ProductPage'
import SpiritualGiftsPage from './pages/SpiritualGiftsPage'
import FivefoldPage from './pages/FivefoldPage'
import EnneagramPage from './pages/EnneagramPage'
import QuizLandingPage from './pages/QuizLandingPage'
import QuizChat from './components/QuizChat'
import WhoIHelpPage from './pages/WhoIHelpPage'
import AskOsilPage from './pages/AskOsilPage'

function SiteLayout() {
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
          <Route path="/awaken-and-align" element={<AwakenAndAlignPage />} />
          <Route path="/awaken-journal" element={<AwakenJournalPage />} />
          <Route path="/presence" element={<PresencePage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/programs/:slug" element={<ProductPage />} />
          <Route path="/spiritual-gifts" element={<SpiritualGiftsPage />} />
          <Route path="/fivefold" element={<FivefoldPage />} />
          <Route path="/enneagram" element={<EnneagramPage />} />
          <Route path="/quiz" element={<QuizLandingPage />} />
          <Route path="/who-i-help" element={<WhoIHelpPage />} />
          <Route path="/ask-osil" element={<AskOsilPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <EmailSlideIn />
    </div>
  )
}

function App() {
  return (
    <Routes>
      {/* Full-screen — no site header/footer */}
      <Route path="/quiz/start" element={<QuizChat />} />
      {/* All other pages with site layout */}
      <Route path="/*" element={<SiteLayout />} />
    </Routes>
  )
}

export default App
