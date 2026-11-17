import React, { useState, useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import QuickViewModal from "../components/home/QuickViewModal";
import FilterDrawer from "../components/common/FilterDrawer";
import FilterHeader from "../components/common/FilterHeader";
import ProductFAQ from "../components/product/ProductFAQ";
import CollectionHeroBanner from "../components/common/CollectionHeroBanner";
import CollectionProductGrid from "../components/common/CollectionProductGrid";
import { selectCollectionBanners } from "../store/slices/navigationSlice";
import { resolveCollectionBanner } from "../utils/bannerHelpers";
import { fetchNewArrivalsProducts } from "../services/productService";
import { INITIAL_FILTERS, computePriceRange, applyProductFilters, countActiveFilters } from "../utils/filterHelpers";

export default function NewArrivals() {
  const collectionBanners = useSelector(selectCollectionBanners);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchNewArrivalsProducts()
      .then((res) => {
        if (!isMounted) return;
        setProducts(res || []);
        const { min, max } = computePriceRange(res);
        if (max > 0) setFilters((prev) => ({ ...prev, minPrice: min, maxPrice: max, selectedMax: max }));
        setLoading(false);
      })
      .catch(() => { if (isMounted) { setProducts([]); setLoading(false); } });
    return () => { isMounted = false; };
  }, []);

  const { desktopBanner, mobileBanner } = useMemo(() => {
    return resolveCollectionBanner(collectionBanners, { slug: "new-arrivals", title: "New Arrivals" });
  }, [collectionBanners]);

  const filteredProducts = useMemo(() => applyProductFilters(products, filters), [products, filters]);
  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  const handleReset = () => setFilters(INITIAL_FILTERS);
  const handleRemove = (k, val) => {
    if (k === "price") setFilters((p) => ({ ...p, minPrice: 0, maxPrice: 0, selectedMax: 0 }));
    else if (k === "size") setFilters((p) => ({ ...p, sizes: (p.sizes || []).filter((s) => s !== val) }));
    else setFilters((p) => ({ ...p, [k]: "all" }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CollectionHeroBanner desktopBanner={desktopBanner} mobileBanner={mobileBanner} title="New Arrivals" />
      <div className="pt-3 sm:pt-4 pb-10 sm:pb-14">
        <Container size="wide" className="!px-1.5 sm:!px-6 lg:!px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="px-1 sm:px-0">
            <FilterHeader
              title="New Arrivals"
              subtitle="Explore the latest handcrafted festive masterworks, organza silk, and embroidered luxury edits."
              totalCount={filteredProducts.length}
              activeFiltersCount={activeCount}
              onOpenFilter={() => setIsFilterOpen(true)}
              filters={filters}
              onReset={handleReset}
              onRemoveFilter={handleRemove}
            />
          </motion.div>
          <CollectionProductGrid
            loading={loading}
            filteredProducts={filteredProducts}
            totalProductsCount={products.length}
            onResetFilters={handleReset}
            emptyMessage="No new arrival designs available currently."
          />
          <ProductFAQ />
        </Container>
      </div>
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} filters={filters} setFilters={setFilters} onReset={handleReset} totalCount={filteredProducts.length} />
      <QuickViewModal />
    </div>
  );
}
