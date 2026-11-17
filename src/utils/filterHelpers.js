export const INITIAL_FILTERS = {
  minPrice: 0,
  maxPrice: 0,
  selectedMax: 0,
  defaultMin: 0,
  defaultMax: 0,
  isPriceFiltered: false,
  availability: 'all',
  sortBy: 'featured',
  sizes: [],
};

export function computePriceRange(products = []) {
  if (!products || !products.length) return { min: 0, max: 0 };
  const prices = products.map((p) => Number(p.price) || 0).filter((p) => p > 0);
  if (!prices.length) return { min: 0, max: 0 };
  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

export function applyProductFilters(products = [], filters = INITIAL_FILTERS) {
  return (products || [])
    .filter((prod) => {
      if (filters.isPriceFiltered) {
        const min = Number(filters.minPrice) || 0;
        const max = Number(filters.selectedMax) || Number(filters.maxPrice) || Infinity;
        if (min > 0 && prod.price < min) return false;
        if (max < Infinity && prod.price > max) return false;
      }
      if (filters.availability === 'in-stock' && !prod.availableForSale) return false;
      if (filters.availability === 'out-of-stock' && prod.availableForSale) return false;
      if (
        filters.sizes?.length > 0 &&
        !filters.sizes.some((sz) => prod.sizes?.includes(sz))
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      return filters.sortBy === 'rating' ? (b.rating || 0) - (a.rating || 0) : 0;
    });
}

export function countActiveFilters(filters = INITIAL_FILTERS) {
  const hasPrice = filters.isPriceFiltered === true;
  return (
    (hasPrice ? 1 : 0) +
    (filters.availability !== 'all' ? 1 : 0) +
    (filters.sortBy !== 'featured' ? 1 : 0) +
    (filters.sizes?.length || 0)
  );
}
