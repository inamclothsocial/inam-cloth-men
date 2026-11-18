import { slugify } from './navigationHelpers.js';
import defaultDesktopBanner from '../assets/banner/New_Arrivals.webp';
import defaultMobileBanner from '../assets/banner/New_Arrivals_Mobile.webp';

export function resolveCollectionBanner(banners, {
  categorySlug = '',
  groupSlug = '',
  subCategorySlug = '',
  slug = '',
  title = '',
  collectionGid = '',
  collectionHandle = '',
} = {}) {
  if (!banners || !banners.length) {
    return { desktopBanner: defaultDesktopBanner, mobileBanner: defaultMobileBanner };
  }

  const cat = slugify(categorySlug || '');
  const grp = slugify(groupSlug || '');
  const sub = slugify(subCategorySlug || '');
  const singleSlug = slugify(slug || '');
  const pageTitleSlug = slugify(title || '');

  const isCurrentUnstitched = cat.includes('unstitched') || grp.includes('unstitched');
  const isCurrentStitched = (cat.includes('stitched') || grp.includes('stitched')) && !isCurrentUnstitched;

  if (collectionGid) {
    const byGid = banners.find((b) => b.isActive && b.collectionGid && b.collectionGid === collectionGid);
    if (byGid && byGid.desktopBanner) {
      return { desktopBanner: byGid.desktopBanner, mobileBanner: byGid.mobileBanner || defaultMobileBanner };
    }
  }

  const qualifiedCandidates = [];
  if (cat && sub) {
    qualifiedCandidates.push(`${cat}-${sub}`, `${sub}-${cat}`);
    if (grp) {
      qualifiedCandidates.push(`${cat}-${grp}-${sub}`, `${grp}-${sub}`, `${sub}-${grp}`);
    }
  }

  for (const cand of qualifiedCandidates) {
    const match = banners.find((b) => {
      if (!b.isActive) return false;
      const bHandle = slugify(b.handle || '');
      const bTitle = slugify(b.title || '');
      const bColHandle = slugify(b.collectionHandle || '');
      return bHandle === cand || bTitle === cand || bColHandle === cand;
    });
    if (match) {
      return { desktopBanner: match.desktopBanner || defaultDesktopBanner, mobileBanner: match.mobileBanner || defaultMobileBanner };
    }
  }

  const targetKeys = [sub, singleSlug, slugify(collectionHandle || ''), cat, pageTitleSlug].filter(Boolean);

  for (const target of targetKeys) {
    const match = banners.find((b) => {
      if (!b.isActive) return false;
      const bHandle = slugify(b.handle || '');
      const bTitle = slugify(b.title || '');
      const bColHandle = slugify(b.collectionHandle || '');
      const isExactMatch = bHandle === target || bTitle === target || bColHandle === target;
      if (!isExactMatch) return false;

      const bannerHasUnstitched = bHandle.includes('unstitched') || bTitle.includes('unstitched') || bColHandle.includes('unstitched');
      if (isCurrentStitched && bannerHasUnstitched) return false;

      const bannerIsStitchedOnly = (bHandle.includes('stitched') || bTitle.includes('stitched') || bColHandle.includes('stitched')) && !bannerHasUnstitched;
      if (isCurrentUnstitched && bannerIsStitchedOnly) return false;

      return true;
    });

    if (match) {
      return { desktopBanner: match.desktopBanner || defaultDesktopBanner, mobileBanner: match.mobileBanner || defaultMobileBanner };
    }
  }

  return { desktopBanner: defaultDesktopBanner, mobileBanner: defaultMobileBanner };
}
