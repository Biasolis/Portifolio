// Arquivo: src/components/About.jsx
import styles from './About.module.css';

function About({ data, sectionClass }) {
  return (
    <section className={sectionClass}>
      <h3 className={styles.title}>Sobre Mim</h3>
      <p className={styles.bio}>
        {data.bio}
      </p>
    </section>
  );
}

export default About;