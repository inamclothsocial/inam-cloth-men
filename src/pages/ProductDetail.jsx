import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import Breadcrumbs from '../components/common/Breadcrumbs';
import ProductGallery from '../components/product/ProductGallery';
import ProductDescription from '../components/product/ProductDescription';
import ProductInfo from '../components/product/ProductInfo';
import ProductReviews from '../components/product/ProductReviews';
import ProductFAQ from '../components/product/ProductFAQ';
import ProductLightboxModal from '../components/product/ProductLightboxModal';
import ProductCard from '../components/home/ProductCard';
import { fetchProductByHandle, fetchProductsByCollection } from '../services/productService';
import { slugify } from '../data/collectionsData';

const formatSlug = (str) =>
  str ? str.split('-').map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ') : '';

export default function ProductDetail() {
  const { collectionSlug, productSlug, id } = useParams();
  const location = useLocation();
  const targetHandle = productSlug || id || '';
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const stateColName = location.state?.collectionName;
  const stateColSlug = location.state?.collectionSlug;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    let isMounted = true;
    setLoading(true);

    fetchProductByHandle(targetHandle).then(async (prod) => {
      if (!isMounted) return;
      if (prod) {
        setProduct(prod);
        const colHandle = collectionSlug || stateColSlug || prod.collectionSlug;
        const rel = colHandle ? await fetchProductsByCollection(colHandle) : await fetchProductsByCollection('instagram-sale');
        if (isMounted) {
          setRelatedProducts((rel || []).filter((p) => p.id !== prod.id).slice(0, 4));
          setLoading(false);
        }
      } else {
        setProduct(null);
        setLoading(false);
      }
    }).catch(() => { if (isMounted) { setProduct(null); setLoading(false); } });

    return () => { isMounted = false; };
  }, [collectionSlug, targetHandle, stateColSlug]);

  const collectionName = stateColName || (collectionSlug ? formatSlug(collectionSlug) : null) || product?.collectionName || product?.productType || 'Collection';
  const resolvedColSlug = stateColSlug || collectionSlug || product?.collectionSlug || slugify(collectionName);
  const images = useMemo(() => product?.images || [], [product]);
  const discount = useMemo(() => {
    return product?.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : null;
  }, [product]);

  const breadcrumbItems = useMemo(() => {
    return [
      { label: collectionName, link: `/${resolvedColSlug}` },
      { label: product?.name || '' },
    ];
  }, [collectionName, resolvedColSlug, product]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-12 pb-16 px-4 sm:px-8 max-w-7xl mx-auto flex items-center justify-center">
        <div className="animate-pulse space-y-4 w-full max-w-3xl">
          <div className="h-6 bg-gray-200 rounded w-1/3" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="aspect-[2/3] bg-[#F5EBDD]/60 rounded-xl" />
            <div className="space-y-4 pt-4"><div className="h-8 bg-gray-200 rounded w-3/4" /><div className="h-6 bg-gray-200 rounded w-1/4" /><div className="h-24 bg-gray-100 rounded w-full" /></div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white pt-16 pb-20 px-4 text-center">
        <h2 className="text-xl font-bold text-[#18221F]">Product Not Found</h2>
        <p className="text-sm text-[#6F756F] mt-2">The design you are looking for is currently not available.</p>
        <Link to="/shop-by-category" className="mt-6 inline-block px-6 py-2.5 bg-[#6fa993] text-white text-xs font-semibold rounded-full">Browse Collections</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-8 sm:pt-14 md:pt-16 pb-12 sm:pb-16 px-4 sm:px-8 md:px-12 lg:px-16 xl:px-24 select-none">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between pb-3 border-b border-[#E9D8C4]/60 mb-5">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-14 items-start">
          <div className="lg:col-span-6">
            <h1 className="block lg:hidden text-xl sm:text-2xl font-medium tracking-tight text-[#18221F] leading-snug mb-3.5">{product.name}</h1>
            <ProductGallery product={product} discount={discount} onOpenLightbox={(idx) => { setLightboxIndex(idx); setIsLightboxOpen(true); }} />
          </div>
          <div className="lg:col-span-6 lg:sticky lg:top-24 self-start bg-transparent">
            <ProductInfo product={product} />
          </div>
        </div>
        <ProductDescription product={product} />
        {relatedProducts.length > 0 && (
          <div className="mt-14 pt-8 border-t border-[#E9D8C4]/60">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-sans text-xl sm:text-2xl font-bold text-[#18221F]">Related Products</h2>
              <Link to="/shop-by-category" className="text-xs font-semibold text-[#426E5F] hover:underline">View All Categories →</Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3.5 sm:gap-6">
              {relatedProducts.map((relProd, idx) => (<ProductCard key={`rel-${relProd.id}-${idx}`} product={relProd} />))}
            </div>
          </div>
        )}
        <ProductReviews />
        <ProductFAQ />
        <ProductLightboxModal isOpen={isLightboxOpen} onClose={() => setIsLightboxOpen(false)} images={images} initialIndex={lightboxIndex} productName={product.name} />
      </div>
    </div>
  );
}
