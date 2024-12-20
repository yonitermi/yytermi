import { Suspense } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { AISecurityPage } from './pages/AISecurityPage';
import { ContactPage } from './pages/ContactPage';
import { LoadingSpinner } from './components/LoadingSpinner';

function App() {
  return (
    <Router>
      <Layout>
        <Suspense fallback={<LoadingSpinner />}>
          <section id="home" className="pt-16">
            <HomePage />
          </section>
          <section id="about">
            <AboutPage />
          </section>
          <section id="services">
            <ServicesPage />
          </section>
          <section id="security">
            <AISecurityPage />
          </section>
          <section id="contact">
            <ContactPage />
          </section>
        </Suspense>
      </Layout>
    </Router>
  );
}

export default App;