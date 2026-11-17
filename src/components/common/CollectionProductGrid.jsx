import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../home/ProductCard';

export default function CollectionProductGrid({
  loading,
  filteredProducts = [],
  totalProductsCount = 0,
  onResetFilters,
  emptyMessage = 'No designs available in this collection yet.',
  collectionSlug = '',
  collectionTitle = '',
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-1.5 sm:gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-6 lg:gap-y-8">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="w-full flex flex-col space-y-2 animate-pulse">
            <div className="aspect-[2/3] w-full bg-[#F5EBDD]/60 rounded-sm" />
            <div className="h-3 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (filteredProducts.length > 0) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-1.5 sm:gap-x-6 lg:gap-x-8 gap-y-4 sm:gap-y-6 lg:gap-y-8">
        {filteredProducts.map((prod, idx) => (
          <motion.div
            key={`grid-prod-${prod.id}-${idx}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.45, delay: (idx % 4) * 0.06 }}
            className="w-full"
          >
            <ProductCard
              product={prod}
              className="w-full"
              collectionSlug={collectionSlug}
              collectionTitle={collectionTitle}
            />
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <div className="text-center py-16 bg-white rounded-2xl border border-gray-200 p-8">
      <p className="text-sm font-semibold text-[#18221F]">
        {totalProductsCount === 0 ? emptyMessage : 'No designs match your selected price range.'}
      </p>
      {totalProductsCount > 0 && onResetFilters && (
        <button
          onClick={onResetFilters}
          className="mt-4 px-6 py-2.5 bg-[#6fa993] hover:bg-[#568977] text-white text-xs font-semibold rounded-full cursor-pointer"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
