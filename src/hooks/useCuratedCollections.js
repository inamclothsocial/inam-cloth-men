import { useMemo } from 'react';
import { COLLECTION_SECTIONS } from '../data/shopByCollectionMenuData';
import { resolveCollectionBanner } from '../utils/bannerHelpers';

export function useCuratedCollections(dynamicSections, collectionBanners) {
  return useMemo(() => {
    const sections = dynamicSections?.length ? dynamicSections : COLLECTION_SECTIONS;
    const fab = sections.find((s) => s.title?.toLowerCase().includes('fabric'))?.cards?.slice(0, 4) || [];
    const lux = sections.find((s) => s.title?.toLowerCase().includes('lux'))?.cards?.slice(0, 4) || [];
    const spec = sections.find((s) => s.title?.toLowerCase().includes('spec'))?.cards?.slice(0, 4) || [];
    const list = [...fab, ...lux, ...spec];

    return list.map((card, idx) => {
      const banner = resolveCollectionBanner(collectionBanners, {
        title: card.name,
        slug: card.collectionHandle || card.id,
        collectionGid: card.collectionGid,
        collectionHandle: card.collectionHandle,
      });
      return {
        id: card.id || `col-${idx}`,
        name: card.name,
        image: banner.desktopBanner || card.image,
        link: card.path || `/${card.collectionHandle || card.id}`,
      };
    });
  }, [dynamicSections, collectionBanners]);
}
