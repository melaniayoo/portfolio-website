// src/pages/_app.js
import '../styles/globals.css';
import BackgroundParticles from '../components/BackgroundParticles';
import ScrollProgress from '../components/ScrollProgress';

export default function App({ Component, pageProps }) {
  return (
    <>
      <BackgroundParticles />
      <ScrollProgress />
      <Component {...pageProps} />
    </>
  );
}

