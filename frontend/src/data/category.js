export const categoryList = [
  "hemohim",
  "health",
  "beauty",
  "hair-body",
  "living",
  "electronic",
  "food",
  "fashion",
  "goods-others",
  "all",
];

export const categoryMap = {
  hemohim: {
    label: "HemoHIM",
    subcategories: [],
  },
  health: {
    label: "Health",
    subcategories: [
      { label: "Semua Produk", value: "all" },
      { label: "Basic Nutrition", value: "basic-nutrition" },
      { label: "Ingredients", value: "ingredients" },
      { label: "Kids", value: "kids" },
      { label: "Nature-Oriented", value: "nature-oriented" }
    ],
  },
  beauty: {
    label: "Beauty",
    subcategories: [
      { label: "Semua Produk", value: "all" },
      { label: "Skin Care", value: "skincare" },
      { label: "Make Up", value: "makeup" },
      { label: "Beauty Devices & Accessories", value: "beauty-devices-accessories" },
    ],
  },
  "hair-body": {
    label: "Hair & Body",
    subcategories: [
      { label: "Semua Produk", value: "all" },
      { label: "Hair Care", value: "hair-care" },
      { label: "Body Care", value: "body-care" },
      { label: "Oral Care", value: "oral-care" },
      { label: "Kids & Mom Care", value: "kids-and-mom-care" },
      { label: "Hair & Body Accessories", value: "hair-and-body-accessories" },
    ],
  },
  living: {
    label: "Living",
    subcategories: [
      { label: "Semua Produk", value: "all" },
      { label: "Detergent", value: "detergents" },
      { label: "Kitchenware", value: "kitchenware" },
      { label: "Hygiene Products & Tissues", value: "hygiene-products-and-tissues" },
      { label: "Bathroom Essentials", value: "bathroom-essentials" },
      { label: "Household Items", value: "household-items" },
      { label: "Home Decor & Bedding", value: "home-decor-and-bedding" },
      { label: "Pet Supplies", value: "pet-supplies" },
    ],
  },
  electronic: {
    label: "Electronic",
    subcategories: [
      { label: "Semua Produk", value: "all" },
      { label: "Home Appliances", value: "home-appliances" },
      { label: "Environment Appliances", value: "environmental-appliances" },
      { label: "Beauty Appliances", value: "beauty-appliances" },
      { label: "Filters & Consumables", value: "filters-and-consumables" },
    ],
  },
  food: {
    label: "Food",
    subcategories: [
      { label: "Semua Produk", value: "all" },
      { label: "Agricultural & Seafood Products", value: "agricultural-and-seafood-products" },
      { label: "Convenient Meals", value: "convenient-meals" },
      { label: "Seasonings & Condiments", value: "seasonings-and-condiments" },
      { label: "Beverages", value: "beverages" },
    ],
  },
  fashion: {
    label: "Fashion",
    subcategories: [
      { label: "Semua Produk", value: "all" },
      { label: "Clothing", value: "clothing" },
      { label: "Under/Innerwear", value: "under/innerwear" },
      { label: "Accessories/Shoes", value: "accessories/shoes" },
      { label: "Goods", value: "goods" },
    ],
  },
  "goods-others": {
    label: "Goods & Others",
    subcategories: [
      { label: "Semua Produk", value: "all" },
      { label: "Publications", value: "publications" },
      { label: "Business Supplies", value: "business-supplies" },
      { label: "Packages/Promotions", value: "packages/promotions" },
    ],
  },
  all: {
    label: "All Products",
    subcategories: [],
  },
};