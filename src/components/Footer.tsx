import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <p className={styles.text}>
                    © {new Date().getFullYear()} DevPortfolio. Built with Next.js & Vanilla CSS.
                </p>
            </div>
        </footer>
    );
}
