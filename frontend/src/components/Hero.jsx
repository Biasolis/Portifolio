// Arquivo: src/components/Hero.jsx
import { Mail, Phone, MapPin } from 'lucide-react';
import styles from './Hero.module.css';

function Hero({ data }) {
  return (
    <section className={styles.heroSection}>
      <h1 className={styles.name}>{data.full_name}</h1>
      <h2 className={styles.title}>{data.title}</h2>
      
      <div className={styles.infoContainer}>
        <span className={styles.infoItem}>
          <MapPin size={16} /> {data.location}
        </span>
        <a href={`mailto:${data.email1}`} className={styles.infoItem}>
          <Mail size={16} /> {data.email1}
        </a>
        <a href={`tel:${data.phone}`} className={styles.infoItem}>
          <Phone size={16} /> {data.phone}
        </a>
      </div>
    </section>
  );
}

export default Hero;