import React, { useState, useMemo, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import Container from "../components/common/Container";
import QuickViewModal from "../components/home/QuickViewModal";
import FilterDrawer from "../components/common/FilterDrawer";
import FilterHeader from "../components/common/FilterHeader";
import Breadcrumbs from "../components/common/Breadcrumbs";
import CollectionFAQ from "../components/common/CollectionFAQ";
import CollectionHeroBanner from "../components/common/CollectionHeroBanner";
import CollectionProductGrid from "../components/common/CollectionProductGrid";
import { shopByCollections, slugify } from "../data/collectionsData";
import { selectNavLinks, selectCollectionBanners } from "../store/slices/navigationSlice";
import { resolveCollectionBanner } from "../utils/bannerHelpers";
import { fetchProductsByCollection } from "../services/productService";
import { INITIAL_FILTERS, computePriceRange, applyProductFilters, countActiveFilters } from "../utils/filterHelpers";

const formatSlug = (str) =>
  str ? str.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ") : "";

export default function CollectionDetail() {
  const params = useParams();
  const [searchParams] = useSearchParams();
  const navLinks = useSelector(selectNavLinks);
  const collectionBanners = useSelector(selectCollectionBanners);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categorySlug = params.categorySlug || params.slug || "";
  const subCategorySlug = params.subCategorySlug || searchParams.get("fabric") || searchParams.get("category") || searchParams.get("sale") || "";
  const fullCollectionPath = [params.categorySlug, params.groupSlug, params.subCategorySlug].filter(Boolean).join('/') || categorySlug || '';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setFilters(INITIAL_FILTERS);
  }, [categorySlug, subCategorySlug]);

  const navCategory = useMemo(() => {
    return (navLinks || []).find((i) => i.id === categorySlug || i.path === `/${categorySlug}` || i.path === `/collections/${categorySlug}`);
  }, [categorySlug, navLinks]);

  const activeItem = useMemo(() => {
    if (!subCategorySlug) return null;
    const fromChild = navCategory?.children?.find((c) => c.path.includes(subCategorySlug) || c.id.endsWith(subCategorySlug) || c.collectionHandle === subCategorySlug);
    if (fromChild) return fromChild;

    const groupSlug = (params.groupSlug || "").toLowerCase();
    let relevantItems = navCategory?.groups?.flatMap((g) => g.items || []) || [];
    if (groupSlug && navCategory?.groups) {
      const matchedGroup = navCategory.groups.find((g) => (g.groupTitle || "").toLowerCase() === groupSlug);
      if (matchedGroup?.items?.length) {
        relevantItems = matchedGroup.items;
      }
    }
    const fromGroup = relevantItems.find(
      (i) => (groupSlug ? i.path.toLowerCase().includes(groupSlug) : true) &&
             (i.path.includes(subCategorySlug) || i.id.endsWith(subCategorySlug) || i.collectionHandle === subCategorySlug)
    ) || relevantItems.find((i) => i.path.includes(subCategorySlug) || i.id.endsWith(subCategorySlug) || i.collectionHandle === subCategorySlug);
    return fromGroup || null;
  }, [navCategory, subCategorySlug, params.groupSlug]);

  const targetHandle = useMemo(() => {
    if (activeItem) return activeItem.collectionGid || activeItem.collectionHandle || subCategorySlug;
    if (subCategorySlug) return subCategorySlug;
    if (navCategory) {
      const childHandles = navCategory.children?.map((c) => c.collectionGid || c.collectionHandle).filter(Boolean) || [];
      const groupHandles = navCategory.groups?.flatMap((g) => g.items?.map((i) => i.collectionGid || i.collectionHandle)).filter(Boolean) || [];
      const allHandles = [...childHandles, ...groupHandles];
      if (allHandles.length) return allHandles;
      return navCategory.collectionHandle || categorySlug;
    }
    return categorySlug || params.slug || "";
  }, [activeItem, subCategorySlug, navCategory, categorySlug, params.slug]);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    fetchProductsByCollection(targetHandle)
      .then((res) => {
        if (!isMounted) return;
        setProducts(res || []);
        const { min, max } = computePriceRange(res);
        if (max > 0) setFilters((prev) => ({ ...prev, defaultMin: min, defaultMax: max, minPrice: min, maxPrice: max, selectedMax: max, isPriceFiltered: false }));
        setLoading(false);
      })
      .catch(() => { if (isMounted) { setProducts([]); setLoading(false); } });
    return () => { isMounted = false; };
  }, [targetHandle]);

  const { categoryTitle, pageTitle } = useMemo(() => {
    const col = shopByCollections.find((c) => slugify(c.name) === categorySlug || String(c.id) === String(categorySlug));
    const catTitle = col?.name || navCategory?.label || formatSlug(categorySlug) || "Category";
    const subTitle = activeItem?.label || (subCategorySlug ? formatSlug(subCategorySlug) : "");
    return { categoryTitle: catTitle, pageTitle: subTitle || catTitle };
  }, [categorySlug, subCategorySlug, navCategory, activeItem]);

  const { desktopBanner, mobileBanner } = useMemo(() => {
    return resolveCollectionBanner(collectionBanners, {
      categorySlug, groupSlug: params.groupSlug || "", subCategorySlug,
      slug: params.slug || "", title: pageTitle,
      collectionGid: activeItem?.collectionGid || "",
      collectionHandle: activeItem?.collectionHandle || (typeof targetHandle === "string" ? targetHandle : ""),
    });
  }, [collectionBanners, categorySlug, params.groupSlug, subCategorySlug, params.slug, pageTitle, activeItem, targetHandle]);

  const breadcrumbsItems = useMemo(() => {
    return [{ label: pageTitle }];
  }, [pageTitle]);

  const filteredProducts = useMemo(() => applyProductFilters(products, filters), [products, filters]);
  const activeCount = useMemo(() => countActiveFilters(filters), [filters]);

  const handleReset = () => setFilters((p) => ({ ...INITIAL_FILTERS, defaultMin: p.defaultMin, defaultMax: p.defaultMax, minPrice: p.defaultMin, maxPrice: p.defaultMax, selectedMax: p.defaultMax, isPriceFiltered: false }));
  const handleRemove = (k, val) => {
    if (k === "price") setFilters((p) => ({ ...p, minPrice: p.defaultMin || 0, maxPrice: p.defaultMax || 0, selectedMax: p.defaultMax || 0, isPriceFiltered: false }));
    else if (k === "size") setFilters((p) => ({ ...p, sizes: (p.sizes || []).filter((s) => s !== val) }));
    else setFilters((p) => ({ ...p, [k]: "all" }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <CollectionHeroBanner desktopBanner={desktopBanner} mobileBanner={mobileBanner} title={pageTitle} />
      <div className="pt-2 sm:pt-3 pb-8 sm:pb-12">
        <Container size="wide" className="!px-1.5 sm:!px-6 lg:!px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="px-1 sm:px-0">
            <Breadcrumbs items={breadcrumbsItems} />
            <FilterHeader
              title={pageTitle}
              subtitle={null}
              totalCount={filteredProducts.length}
              activeFiltersCount={activeCount}
              onOpenFilter={() => setIsFilterOpen(true)}
              filters={filters}
              onReset={handleReset}
              onRemoveFilter={handleRemove}
            />
          </motion.div>
          <CollectionProductGrid loading={loading} filteredProducts={filteredProducts} totalProductsCount={products.length} onResetFilters={handleReset} collectionSlug={fullCollectionPath} collectionTitle={pageTitle} />
          <CollectionFAQ collectionName={pageTitle} />
        </Container>
      </div>
      <FilterDrawer isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} filters={filters} setFilters={setFilters} onReset={handleReset} totalCount={filteredProducts.length} />
      <QuickViewModal />
    </div>
  );
}
