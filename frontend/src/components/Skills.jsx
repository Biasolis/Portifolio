// Arquivo: src/components/Skills.jsx
import styles from './Skills.module.css';

function Skills({ data, sectionClass }) {
  // Agrupar habilidades por categoria (sem alteração)
  const skillsByCategory = data.reduce((acc, skill) => {
    const category = skill.category || 'Outras';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {});

  return (
    <section className={sectionClass}>
      <h3 className={styles.title}>Competências Técnicas</h3>
      
      <div className={styles.skillsGrid}>
        {Object.keys(skillsByCategory).map((category) => (
          <div key={category} className={styles.skillCard}>
            <h4 className={styles.cardTitle}>{category}</h4>
            <ul className={styles.skillList}>
              {skillsByCategory[category].map((skill) => (
                <li key={skill.id} className={styles.skillItem}>{skill.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Skills;