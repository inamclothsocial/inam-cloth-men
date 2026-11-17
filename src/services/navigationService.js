import { shopifyFetch } from './shopifyClient';
import {
  parseMenuItems,
  parseNavigationMenus,
  parseCollectionBanners,
  parseHomePageBanners,
  parseBrandLogos,
  buildNavLinks,
  buildCollectionSections,
} from '../utils/navigationTransformer';

export const NAVIGATION_METAOBJECTS_QUERY = `
  query GetStorefrontNavigation {
    navigationMenus: metaobjects(type: "navigation_menu", first: 50) {
      nodes {
        id handle type
        fields { key value }
      }
    }
    menuItems: metaobjects(type: "menu_item", first: 250) {
      nodes {
        id handle type
        fields {
          key value
          reference {
            __typename
            ... on Collection { id title handle image { url altText } }
            ... on MediaImage { id image { url altText } }
          }
        }
      }
    }
    collectionBanners: metaobjects(type: "collection_banner", first: 100) {
      nodes {
        id handle type
        fields {
          key value
          reference {
            __typename
            ... on Collection { id title handle }
            ... on MediaImage { id image { url altText } }
          }
        }
      }
    }
    homePageBanners: metaobjects(type: "home_page_banner", first: 20) {
      nodes {
        id handle type
        fields {
          key value
          reference {
            __typename
            ... on MediaImage { id image { url altText width height } }
          }
        }
      }
    }
    logos: metaobjects(type: "logos", first: 50) {
      nodes {
        id handle type
        fields {
          key value
          reference {
            __typename
            ... on MediaImage { id image { url altText width height } }
          }
        }
      }
    }
  }
`;

export function transformMetaobjectsData(data) {
  const navNodes = data?.navigationMenus?.nodes || [];
  const itemNodes = data?.menuItems?.nodes || [];
  const bannerNodes = data?.collectionBanners?.nodes || [];
  const homeBannerNodes = data?.homePageBanners?.nodes || [];
  const logoNodes = data?.logos?.nodes || [];

  const itemsByParent = parseMenuItems(itemNodes);
  const navMenus = parseNavigationMenus(navNodes);
  const collectionBanners = parseCollectionBanners(bannerNodes);
  const homeBanners = parseHomePageBanners(homeBannerNodes);
  const brandLogos = parseBrandLogos(logoNodes);
  const fullNavLinks = buildNavLinks(navMenus, itemsByParent);

  const topNavLinks = fullNavLinks
    .filter(
      (m) =>
        m.desktop_row === 1 ||
        ['home', 'new-arrivals', 'about', 'about-us', 'contact', 'contact-us'].includes(m.id)
    )
    .sort((a, b) => a.desktop_order - b.desktop_order);

  const categoryNavLinks = fullNavLinks
    .filter(
      (m) =>
        m.desktop_row === 2 ||
        ['shop-by-category', 'stitched', 'unstitched', 'luxury', 'special', 'sale-deals'].includes(m.id)
    )
    .sort((a, b) => a.desktop_order - b.desktop_order);

  const mobileNavLinks = [...fullNavLinks].sort((a, b) => a.mobile_order - b.mobile_order);
  const collectionSections = buildCollectionSections(itemsByParent);

  return {
    navLinks: fullNavLinks,
    topNavLinks,
    categoryNavLinks,
    mobileNavLinks,
    collectionSections,
    collectionBanners,
    homeBanners,
    brandLogos,
  };
}

export async function fetchStorefrontNavigation() {
  const data = await shopifyFetch({ query: NAVIGATION_METAOBJECTS_QUERY });
  return transformMetaobjectsData(data);
}
