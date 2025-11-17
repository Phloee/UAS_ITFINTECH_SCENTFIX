import { HeaderProduct } from '../../components/HeaderProduct';
import { Footer } from '../../components/Footer';
import { Link } from 'react-router';
import { database } from '../../data/products_list';

import styles from './ProductsHome.module.css';

function ProductCard({ product }) {
  return (
    <div className={styles["product-card"]}>
      <Link to={`/products/detail/${product.id}`}>
        <div className={styles["product-image-wrapper"]}>
          <img src={product.image} alt={product.name}
            className={styles["product-image"]} />
        </div>
        <div className={styles["product-name"]}>{product.name}</div>
      </Link>
    </div>
  )
}

function HorizontalProductCard({ product }) {
  return (
    <Link to={`/products/detail/${product.id}`}>
      <div className={styles["product-card"]}>
        <div className={styles["product-image-wrapper"]}>
          <img src={product.image} alt={product.name}
            className={styles["uv-product-image"]} />
        </div>
        <div className={styles["uv-product-name"]}>{product.name}</div>
      </div>
    </Link>
  )
}

function getProductsByIds(ids) {
  return database.filter((product) => ids.includes(product.id));
};

export function ProductsHome() {

  const bestSellers = ['000011', '000121', '000973', '000108'];
  const healthCare = ['000164', '004007', '000178', '004004'];
  const toothpaste = ['000505', '000518', '000510', '000509'];
  const uvStrategy = ['001555', '000276', '000460', '001531', '000279', '000270'];
  const skinCare = ['000207', '001532', '000003'];

  const bestSellerProducts = getProductsByIds(bestSellers);
  const healthCareProducts = getProductsByIds(healthCare);
  const toothpasteProducts = getProductsByIds(toothpaste);
  const uvStrategyProducts = getProductsByIds(uvStrategy);
  const skinCareProducts = getProductsByIds(skinCare);

  const uvFirstRow = uvStrategyProducts.slice(0, 3);
  const uvSecondRow = uvStrategyProducts.slice(3);

  return (
    <>
      <HeaderProduct />

      <main>
        {/* Hero Section */}
        <section className={styles["container"]}>
          <div className={styles["content-container"]}>
            <div className={styles["hero-section"]}></div>
          </div>
        </section>

        {/* Best Sellers Section */}
        <section className={styles["section-wrapper"]}>
          <div className={styles["content-container"]}>
            <h2 className={styles["section-title"]}>Best Sellers</h2>

            <div className={styles["product-grid"]}>
              {bestSellerProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>

        {/* Banner Section */}
        <section className={styles["container"]}>
          <div className={styles["content-container"]}>
            <div className={styles["banner-section"]}>
              <img src="/productsHome/img_screenshot_2025_07_22_626x1440.png" alt="Product Banner"
                className={styles["banner-image"]} />
            </div>
          </div>
        </section>

        {/* Health Care Section */}
        <section className={styles["section-wrapper"]}>
          <div className={styles["content-container"]}>
            <h2 className={styles["section-title"]}>Health Care</h2>

            <div className={styles["product-grid"]}>
              {healthCareProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Link to='/products/health'><button className={styles["discover-btn"]}>Discover the Collection</button></Link>
          </div>
        </section>

        {/* Hair Care Section */}
        <section className={styles["section-wrapper"]}>
          <div className={styles["content-container"]}>
            <div className={styles["hair-care-section"]}>
              <div className={styles["hair-care-content"]}>
                <img src="/productsHome/img_image_32.png" alt="Atomy Root Vital Hair Care"
                  className={styles["hair-care-image"]} />
                <div className={styles["hair-care-text"]}>
                  <h3 className={styles["hair-care-title"]}>Atomy Root Vital Hair Care</h3>
                  <ul className={styles["hair-care-description"]}>
                    <li>Atomy Root Vital Scalp Ampoule</li>
                    <li>Atomy Root Vital Scalp & Hair Pack</li>
                    <li>Atomy Root Vital Shampoo</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Toothpaste Section */}
        <section className={styles["section-wrapper"]}>
          <div className={styles["content-container"]}>
            <h2 className={styles["section-title"]}>Atomy Toothpaste</h2>

            <div className={styles["product-grid"]}>
              {toothpasteProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Link to={'/products/hair-body'}><button className={styles["discover-btn"]}>Discover the Collection</button></Link>
          </div>
        </section>

        {/* UV Strategy Section */}
        <section className={styles["section-wrapper"]}>
          <div className={styles["content-container"]}>
            <h2 className={styles["section-title"]}>UV Strategy for Every Day</h2>

            <div className={styles["uv-strategy-section"]}>
              <img src="/productsHome/img_image_25.png" alt="UV Strategy Products"
                className={styles["uv-main-image"]} />

              <div className={styles["uv-products"]}>
                <div className={styles["uv-product-row"]}>
                  {uvFirstRow.map((product) => (
                    <HorizontalProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className={styles["divider"]}></div>

                <div className={styles["uv-product-row"]}>
                  {uvSecondRow.map((product) => (
                    <HorizontalProductCard key={product.id} product={product} />
                  ))}
                </div>

                <div className={styles["divider"]}></div>

              </div>
            </div>
          </div>
        </section>

        {/* Skincare Set Section */}
        <section className={styles["section-wrapper"]}>
          <div className={styles["content-container"]}>
            <h2 className={styles["section-title"]}>Atomy Skincare Set</h2>
            <p className={styles["section-subtitle"]}>Rangkaian perawatan untuk kulit Anda</p>

            <div className={`${styles["product-grid"]} ${styles["skincare-grid"]}`}>
              {skinCareProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Link to={'/products/beauty'}>
              <button className={styles["discover-btn"]}>Discover the Collection</button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}