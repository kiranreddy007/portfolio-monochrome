import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className="container">
                <nav className={styles.nav}>
                    <Link href="/" className={styles.logo}>
                        DevPortfolio
                    </Link>
                    <ul className={styles.links}>
                        <li><Link href="#about" className={styles.link}>About</Link></li>
                        <li><Link href="#skills" className={styles.link}>Skills</Link></li>
                        <li><Link href="#experience" className={styles.link}>Experience</Link></li>
                        <li><Link href="#projects" className={styles.link}>Projects</Link></li>
                        <li><Link href="#contact" className={styles.link}>Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
