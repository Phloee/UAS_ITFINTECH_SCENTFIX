import { Link } from "react-router"
import styles from './ProductNotFound.module.css'

export function ProductNotFound() {
  return (
    <>
      <main>
        <div className={styles.container}>
          <div className={styles.header}>Oops,</div>
          <div className={styles.subheader}>404 - PAGE NOT FOUND </div>
          <p className={styles.text}>The page you are looking for doesn't exist or has been removed.</p>
          <p className={styles.text}>Try going back to our catalog page.</p>
          <Link to='/products'>
            <button className={styles.button}>BACK TO CATALOG</button>
          </Link>
        </div>
      </main>
    </>
  )
}