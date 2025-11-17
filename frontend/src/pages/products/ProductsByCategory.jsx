import { useParams, Navigate, Link } from "react-router-dom";
import { useState, useRef, useEffect, useMemo } from "react";
import styles from './ProductsByCategory.module.css';

import { database } from '../../data/products_list';
import { categoryMap } from '../../data/category'

import { HeaderProduct } from "../../components/HeaderProduct";
import { Footer } from "../../components/Footer";

function formatProductName(slug) {
  // special mapping untuk produk tertentu
  const specialCases = {
    'hemohim': 'HemoHIM',
    'all': 'All Products',
  };

  // kalau ada di special case, return langsung
  if (specialCases[slug]) {
    return specialCases[slug];
  }

  // ganti "-" dengan " & "
  let text = slug.replace(/-/g, " & ");

  // capitalize tiap kata
  text = text.replace(/\b\w/g, char => char.toUpperCase());

  return text;
}

function ProductCard({ product }) {
  return (
    <div key={product.id} className={styles["product-card"]}>
      <Link to={`/products/detail/${product.id}`}>
        <div className={styles["product-image-wrapper"]}>
          <img
            src={product.image}
            alt={product.name}
            className={styles["product-image"]}
          />
        </div>
        <div className={styles["product-name"]}>{product.name}</div>
      </Link>
    </div>
  );
}

function FilterComp({ category, selectedValue = "all", onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState("Semua Produk");
  const dropdownRef = useRef(null);

  const options = useMemo(() => {
    return (
      categoryMap[category]?.subcategories || [
        { value: "all", label: "Semua Produk" },
      ]
    );
  }, [category]);

  useEffect(() => {
    const found = options.find((opt) => opt.value === selectedValue);
    if (found) setSelectedLabel(found.label);
  }, [selectedValue, options]);

  const handleToggle = () => setIsOpen((prev) => !prev);

  const handleSelect = (value, label) => {
    setSelectedLabel(label);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className={styles["filter-container"]}>
      <label className={styles["filter-title"]} htmlFor="filterSelection">
        CATEGORY
      </label>
      <div className={styles["divider"]}></div>

      <div
        className={`${styles["custom-select"]} ${isOpen ? styles["open"] : ""}`}
        id="filterSelection"
        ref={dropdownRef}
      >
        <div className={styles["selected"]} onClick={handleToggle}>
          {selectedLabel}
        </div>

        <ul className={styles["options"]}>
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value, option.label)}
              className={selectedLabel === option.label ? styles["active"] : ""}
            >
              {option.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ProductsByCategory() {

  const categoryList = [
    'hemohim',
    'health',
    'beauty',
    'hair-body',
    'living',
    'electronic',
    'food',
    'fashion',
    'goods-others',
    'all'
  ];

  const { category } = useParams();

  const normalizedCategory = category?.toLowerCase();
  const isValidCategory = categoryList.includes(normalizedCategory);

  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setSelectedSubcategory("all");
  }, [normalizedCategory]);

  useEffect(() => {
    const filtered = database.filter((p) => {
      const productCategory = p.category?.toLowerCase() || "";
      const productSubcategory = p.subcategory?.toLowerCase() || "";

      if (normalizedCategory === "all") return true;

      if (normalizedCategory === "hemohim") {
        return productSubcategory === "hemohim";
      }

      if (productCategory !== normalizedCategory) return false;
      if (selectedSubcategory === "all") return true;
      return productSubcategory === selectedSubcategory.toLowerCase();
    });

    setFilteredProducts(filtered);
  }, [normalizedCategory, selectedSubcategory]);

  if (!isValidCategory) {
    return <Navigate to="/products/product-not-found" replace />;
  }

  return (
    <>
      <HeaderProduct />

      <main>
        <section className={styles["section-wrapper"]}>
          <div className={styles["content-container"]}>
            <h2 className={styles["section-title"]}>
              {formatProductName(category)}
            </h2>

            <div className={styles["content-flex"]}>

              {/* Hanya tampilkan FilterComp kalau bukan "hemohim/all" */}
              {!(normalizedCategory === "hemohim" || normalizedCategory === "all") && (
                <FilterComp
                  category={normalizedCategory}
                  selectedValue={selectedSubcategory}
                  onChange={setSelectedSubcategory}
                />
              )}


              <div
                className={styles["product-grid"]}
                style={{
                  gridTemplateColumns:
                    normalizedCategory === "hemohim" || normalizedCategory === "all"
                      ? "repeat(4, 1fr)"
                      : undefined,
                }}
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))
                ) : (
                  <p>Tidak ada produk untuk kategori ini.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}