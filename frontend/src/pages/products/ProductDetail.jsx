import { useParams, Link, useNavigate } from "react-router";
import { HeaderProduct } from "../../components/HeaderProduct";
import { database } from "../../data/products_list";
import { categoryMap } from "../../data/category";

import styles from './ProductDetail.module.css'
import { Footer } from "../../components/Footer";
import { useState, useEffect } from "react";

function getRandomProducts(database, count, excludeId = null) {
  // Filter agar tidak termasuk produk yang sedang dibuka
  const filtered = excludeId
    ? database.filter((p) => p.id !== excludeId)
    : database;

  // Shuffle array
  const shuffled = [...filtered].sort(() => Math.random() - 0.5);

  // Ambil sejumlah count item
  return shuffled.slice(0, count);
}

function RecomCard({ product }) {
  return (
    <Link to={`/products/detail/${product.id}`} className={styles["recommendation-card"]}>
      <div className={styles["card-image"]}>
        <img src={product.image} alt={product.name} />
      </div>
      <div className={styles["card-title"]}>
        {product.name}
      </div>
    </Link>
  )
}

export function ImageCarousel({ images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (images.length === 0) return null;

  return (
    <div className={styles.carousel}>
      <button onClick={prevImage} className={styles.navButton}>❮</button>

      <div className={styles.imageWrapper}>
        <img
          src={images[currentIndex]}
          alt={`Product ${currentIndex + 1}`}
          className={styles.image}
        />
      </div>

      <button onClick={nextImage} className={styles.navButton}>❯</button>
    </div>
  );
}

export function ProductDetail() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [recommendations, setRecommendations] = useState([]);

  const product = database.find((item) => item.id === productId);

  useEffect(() => {
    if (!product || !product.page_available) {
      navigate("/products/product-not-found", { replace: true });
    }
  }, [product, navigate]);

  useEffect(() => {
    if (!product) return;
    const randomProducts = getRandomProducts(database, 20, product.id);
    setRecommendations(randomProducts);
  }, [product]);

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const baseUrl = "https://res.cloudinary.com/dlp799b8m/image/upload";
    const id = product.id;

    const checkImage = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false); // tidak akan munculkan 404 di console
        img.src = url;
      });
    };

    const loadImages = async () => {
      const normalUrl = `${baseUrl}/${id}.png`;
      const normalExists = await checkImage(normalUrl);

      const urls = [];

      if (normalExists) {
        // case: product only has single image (ex: 000111.png)
        urls.push(normalUrl);
      } else {
        // case: product has multi images (ex: 002233_1.png, _2.png, etc)
        let index = 1;
        let searching = true;

        while (searching) {
          const numberedUrl = `${baseUrl}/${id}_${index}.png`;
          const exists = await checkImage(numberedUrl);
          if (exists) {
            urls.push(numberedUrl);
            index++;
          } else {
            searching = false;
          }
        }
      }

      setImageUrls(urls);
    };

    loadImages();
  }, [product.id]);

  if (!product || !product.page_available) return null;

  let categoryLabel = categoryMap[product.category].label;
  let subcategoryLabel = "";
  let categoryValue = '';

  // Cari subcategory label
  if (categoryMap[product.category]) {
    const subcategories = categoryMap[product.category].subcategories;

    const found = subcategories.find(function (s) {
      return s.value === product.subcategory;
    });

    if (found) {
      subcategoryLabel = found.label;
    }
  }

  // Khusus: kalau subcategory produk adalah "hemohim"
  if (product.subcategory === "hemohim") {
    categoryLabel = "HemoHIM";
    categoryValue = "hemohim";
  }

  return (
    <>
      <HeaderProduct />

      <main>
        <section className={styles["section-wrapper"]}>
          <div className={styles["content-container"]}>

            <div className={styles["product-wrapper"]}>
              <div className={styles["breadcrumbs"]}>
                <div className={styles["breadcrumbs"]}>
                  <Link className={styles["category-1"]} to={'/products/all'}>Produk</Link>
                  <div className={styles["arrow-divider"]}>{">"}</div>

                  {subcategoryLabel ? (
                    <>
                      <Link className={styles["category-2"]} to={`/products/${product.category}`}>{categoryLabel}</Link>
                      <div className={styles["arrow-divider"]}>{">"}</div>
                      <Link className={styles["category-2"]} to={`/products/${product.category}`}>{subcategoryLabel}</Link>
                    </>
                  ) : (
                    <Link className={styles["category-2"]} to={`/products/${categoryValue}`}>{categoryLabel}</Link>
                  )}
                </div>
              </div>
              <ImageCarousel images={product.image_carosel} />
              <div className={styles["product-name"]}>
                {product.name}
              </div>
              <Link to={product.url}>
                <button className={styles["learn-more-btn"]}>Pelajari Lebih Lanjut</button>
              </Link>
              <div className={styles["product-detail"]}>
                <div className={styles["detail-header"]}>
                  <div className={styles["detail-title"]}>Detail Produk</div>
                  <div className={styles["detail-divider"]}></div>
                </div>
                <div className={styles["detail-content"]}>
                  {imageUrls.length > 0 ? (
                    imageUrls.map((url, i) => <img key={i} src={url} alt={product.id} />)
                  ) : (
                    <p>No image found</p>
                  )}
                </div>
              </div>
            </div>

            <div className={styles["recommendation-wrapper"]}>
              <div className={styles["recommendation-title"]}>
                Rekomendasi Produk Lainnya
              </div>
              <div className={styles["recommendation-items"]}>
                {recommendations.map((item) => (
                  <RecomCard key={item.id} product={item} />
                ))}
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}