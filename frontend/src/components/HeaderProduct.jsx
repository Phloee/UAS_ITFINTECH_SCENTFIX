import styles from './HeaderProduct.module.css';
import { Link, useParams } from 'react-router';

export function HeaderProduct() {
  const { category } = useParams()

  const navItems = [
    { path: "hemohim", label: "HemoHIM" },
    { path: "health", label: "Health" },
    { path: "beauty", label: "Beauty" },
    { path: "hair-body", label: "Hair & Body" },
    { path: "living", label: "Living" },
    { path: "electronic", label: "Electronic" },
    { path: "food", label: "Food" },
    { path: "fashion", label: "Fashion" },
    { path: "goods-others", label: "Goods & Others" },
    { path: "all", label: "All Products" },
  ];

  return (
    <header>
      <div className={styles["container"]} id={styles["header-logo"]}>
        <Link to={"/products"}>
          <img src="/header/logo.svg" alt="Kumalawati Logo" className={styles["country-flag"]} />
        </Link>
      </div>

      <div className={styles["header-divider"]}></div>

      <nav>
        <div className={styles["container"]}>
          <div className={styles["main-nav"]}>
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={`/products/${item.path}`}
                className={`
                  ${styles["nav-item"]}
                  ${category === item.path ? styles["active"] : ""
                  }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <div className={styles["header-divider"]}></div>
    </header>
  )
}