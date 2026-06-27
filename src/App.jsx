import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import MetaPixelPageView from './components/MetaPixelPageView'
import BackToTop from './components/BackToTop'
import EmailSlideIn from './components/EmailSlideIn'
import AskOsilBubble from './components/AskOsilBubble.jsx'
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
import PrivacyPage from './pages/PrivacyPage'
import CallingPage from './pages/CallingPage'
import CallingQuiz from './components/CallingQuiz'
import FreePage from './pages/FreePage'
import ContentPlanPage from './pages/ContentPlanPage'
import ContentPlanQuiz from './components/ContentPlanQuiz'
import BuildPage from './pages/BuildPage'

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
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/calling" element={<CallingPage />} />
          <Route path="/free" element={<FreePage />} />
          <Route path="/30-days-done" element={<ContentPlanPage />} />
          <Route path="/build" element={<BuildPage />} />
        </Routes>
      </main>
      <Footer />
      <BackToTop />
      <EmailSlideIn />
      <AskOsilBubble />
    </div>
  )
}

function App() {
  return (
    <>
      <MetaPixelPageView />
      <Routes>
        {/* Full-screen — no site header/footer */}
        <Route path="/quiz/start" element={<QuizChat />} />
        <Route path="/calling/start" element={<CallingQuiz />} />
        <Route path="/30-days-done/quiz" element={<ContentPlanQuiz />} />
        {/* All other pages with site layout */}
        <Route path="/*" element={<SiteLayout />} />
      </Routes>
    </>
  )
}

export default App
