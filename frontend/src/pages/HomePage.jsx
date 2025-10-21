// Arquivo: src/pages/HomePage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Footer from '../components/Footer';

// Importa nosso CSS Module
import styles from './HomePage.module.css';

const API_URL = 'http://localhost:3001/api/portfolio-data';

function HomePage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(API_URL);
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os dados. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className={styles.loading}>Carregando...</div>;
  }

  if (error) {
    return <div className={styles.error}>{error}</div>;
  }

  if (!data) {
    return null; 
  }

  const { personalInfo, skills, experiences, education } = data;

  return (
    // Layout principal com nossa classe do CSS Module
    <div className={styles.mainContainer}>
      <Hero data={personalInfo} />
      {/* Passamos a classe 'section' como prop para os componentes 
        para padronizar o espaçamento
      */}
      <About data={personalInfo} sectionClass={styles.section} />
      <Experience data={experiences} sectionClass={styles.section} />
      <Skills data={skills} sectionClass={styles.section} />
      {/* (Componente de Educação pode ser adicionado aqui) */}
      <Footer data={personalInfo} />
    </div>
  );
}

export default HomePage;