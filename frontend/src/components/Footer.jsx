// Arquivo: src/components/Footer.jsx
import { Github, Linkedin, Mail } from 'lucide-react';
import styles from './Footer.module.css';

function Footer({ data }) {
  return (
    <footer className={styles.footer}>
      <div className={styles.socialLinks}>
        {data.github_url && (
          <a href={data.github_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <Github size={24} />
          </a>
        )}
        {data.linkedin_url && (
          <a href={data.linkedin_url} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
        )}
        <a href={`mailto:${data.email1}`} aria-label="Email">
          <Mail size={24} />
        </a>
      </div>
      <p className={styles.copyright}>
        Desenvolvido com React, Node.js e muito ☕.
        <br />
        Leonardo Biasoli Piola de Sousa © {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;