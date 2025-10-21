// Arquivo: src/components/Experience.jsx
import { ArrowRight } from 'lucide-react';
import styles from './Experience.module.css';

// Função para formatar datas (sem alteração)
const formatDate = (dateString) => {
  if (!dateString) return 'Atual';
  const date = new Date(dateString);
  date.setDate(date.getDate() + 1); 
  return new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(date);
};

function Experience({ data, sectionClass }) {
  return (
    <section className={sectionClass}>
      <h3 className={styles.title}>Experiência Profissional</h3>
      
      <div className={styles.experienceList}>
        {data.map((job) => (
          <div key={job.id} className={styles.jobItem}>
            {/* Coluna da Data (Esquerda) */}
            <div className={styles.jobDate}>
              <p>
                {formatDate(job.start_date)} — {formatDate(job.end_date)}
              </p>
            </div>
            
            {/* Coluna do Conteúdo (Direita) */}
            <div className={styles.jobDetails}>
              <h4 className={styles.jobRole}>{job.role}</h4>
              <p className={styles.jobCompany}>{job.company_name}</p>
              
              <ul className={styles.descriptionList}>
                {job.description.split('•').filter(line => line.trim() !== '').map((line, index) => (
                  <li key={index} className={styles.descriptionItem}>
                    <ArrowRight size={18} className={styles.descriptionIcon} />
                    <span>{line.trim()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;