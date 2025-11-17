import { Link } from "react-router"
import styles from './PageNotFound.module.css'

export function PageNotFound() {
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.header}>Oops,</div>
          <div className={styles.subheader}>404 - PAGE NOT FOUND </div>
          <p className={styles.text}>The page you are looking for doesn't exist or has been removed.</p>
          <p className={styles.text}>Try going back to our homepage.</p>
          <Link to='/'>
            <button className={styles.button}>BACK TO HOMEPAGE</button>
          </Link>
        </div>
      </main>
    </>
  )
}