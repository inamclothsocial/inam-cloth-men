import newArrivalsBanner from '../assets/banner/New_Arrivals.webp';

export function slugify(text) {
  if (!text) return '';
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

export function getMenuPath(menuId) {
  if (menuId === 'home') return '/';
  if (menuId === 'new-arrivals') return '/new-arrivals';
  if (menuId === 'about-us' || menuId === 'about') return '/about';
  if (menuId === 'contact-us' || menuId === 'contact') return '/contact';
  if (
    menuId === 'shop-by-category' ||
    menuId === 'categories' ||
    menuId === 'collections'
  ) {
    return '/shop-by-category';
  }
  return `/${menuId}`;
}

export function buildCategoryCardPath(secName, handle) {
  const lowerSec = (secName || '').toLowerCase();
  if (lowerSec.includes('fabric')) return `/stitched/${handle}`;
  if (lowerSec.includes('lux')) return `/luxury/stitched/${handle}`;
  if (lowerSec.includes('spec')) return `/special/${handle}`;
  return `/${handle}`;
}

export function getFallbackBanner() {
  return newArrivalsBanner;
}
