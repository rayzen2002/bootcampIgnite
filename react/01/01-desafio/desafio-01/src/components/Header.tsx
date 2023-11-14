import background from '../assets/Background.png'
import logo from '../assets/Logo.svg'
import styles from './Header.module.css'

export function Header(){
  return(
    <header className={styles.header}>
      <img  className={styles.background} src={background} alt="Background image" />
      <img  className={styles.logo} src={logo} alt="Logo" />
    </header>
  )
}