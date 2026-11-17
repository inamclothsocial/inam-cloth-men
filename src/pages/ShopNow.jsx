import React, { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import QuickViewModal from "../components/home/QuickViewModal";
import FilterDrawer from "../components/common/FilterDrawer";
import FilterHeader from "../components/common/FilterHeader";
import ProductFAQ from "../components/product/ProductFAQ";
import CollectionProductGrid from "../components/common/CollectionProductGrid";
import { fetchAllStoreProducts } from "../services/productService";
import { INITIAL_FILTERS, computePriceRange, applyProductFilters, countActiveFilters } from "../utils/filterHelpers";

export default function ShopNow() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchAllStoreProducts()
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

  const filteredProducts = useMemo(() => applyProductFilters(products, filters), [products, filters]);
  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  const handleReset = () => setFilters(INITIAL_FILTERS);
  const handleRemove = (k, val) => {
    if (k === "price") setFilters((p) => ({ ...p, minPrice: 0, maxPrice: 0, selectedMax: 0 }));
    else if (k === "size") setFilters((p) => ({ ...p, sizes: (p.sizes || []).filter((s) => s !== val) }));
    else setFilters((p) => ({ ...p, [k]: "all" }));
  };

  return (
    <div className="py-10 sm:py-16 bg-white min-h-[60vh] select-none">
      <Container size="wide" className="!px-1.5 sm:!px-6 lg:!px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="px-1 sm:px-0">
          <FilterHeader
            title="Shop All Designs"
            subtitle="Discover pure fabrics, handcrafted embroideries, and unstitched & readymade luxury suits."
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
          emptyMessage="No designs available currently in the store."
        />
        <ProductFAQ />
      </Container>
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} filters={filters} setFilters={setFilters} onReset={handleReset} totalCount={filteredProducts.length} />
      <QuickViewModal />
    </div>
  );
}
