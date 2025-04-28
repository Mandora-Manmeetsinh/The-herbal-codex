import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Explore from './pages/Explore';
import PlantDetail from './pages/PlantDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';

import NavigationBar from './components/NavBar';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
// import './styles.css';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/plant/:id" element={<PlantDetail />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
