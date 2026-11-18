import { slugify, getMenuPath, getFallbackBanner, buildCategoryCardPath } from './navigationHelpers.js';
export { parseHomePageBanners, parseCollectionBanners } from './bannerParsers.js';

export function parseMenuItems(itemNodes) {
  const allItems = (itemNodes || []).map((node) => {
    const fields = {};
    node.fields?.forEach((f) => {
      fields[f.key] = f.value;
      if (f.reference) fields[`${f.key}_ref`] = f.reference;
    });
    const colRef = fields.collection_ref, imgRef = fields.image_ref;
    const title = fields.title || colRef?.title || '';
    const rawCol = fields.collection || '';
    const handle = colRef?.handle || (!rawCol.startsWith('gid://') && rawCol ? rawCol : slugify(title));
    return {
      id: node.handle || slugify(title),
      title,
      handle,
      collectionGid: colRef?.id || rawCol || '',
      parent_menu: slugify(fields.parent_menu || ''),
      section: fields.section || 'None',
      sort_order: parseInt(fields.sort_order || '99', 10),
      is_active: fields.is_active !== 'false' && fields.is_active !== false,
      image: imgRef?.image?.url || colRef?.image?.url || getFallbackBanner(),
    };
  }).filter((item) => item.is_active && item.title);

  const itemsByParent = {};
  allItems.forEach((item) => {
    itemsByParent[item.parent_menu] = itemsByParent[item.parent_menu] || [];
    itemsByParent[item.parent_menu].push(item);
  });
  Object.keys(itemsByParent).forEach((k) => itemsByParent[k].sort((a, b) => a.sort_order - b.sort_order));
  return itemsByParent;
}

export function parseNavigationMenus(navNodes) {
  const list = (navNodes || []).map((node) => {
    const fields = {};
    node.fields?.forEach((f) => { fields[f.key] = f.value; });
    const title = fields.title || '';
    return {
      id: slugify(title) || node.handle,
      handle: node.handle,
      label: title,
      desktop_order: parseInt(fields.desktop_order || '99', 10),
      desktop_row: parseInt(fields.desktop_row || '1', 10),
      mobile_order: parseInt(fields.mobile_order || '99', 10),
      is_active: fields.is_active !== 'false' && fields.is_active !== false,
    };
  }).filter((m) => m.is_active && m.label);

  if (!list.some((m) => m.id === 'shop-by-category' || m.label.toLowerCase() === 'shop by category')) {
    list.push({
      id: 'shop-by-category', handle: 'shop-by-category', label: 'Shop By Category',
      desktop_order: 1, desktop_row: 2, mobile_order: 3, is_active: true,
    });
  }
  return list;
}

export function buildNavLinks(navMenus, itemsByParent) {
  return navMenus.map((menu) => {
    const isCategoryMegaMenu = (menu.id === 'shop-by-category' || menu.label.toLowerCase() === 'shop by category') && menu.label.toLowerCase() !== 'stitched';
    const result = {
      id: menu.id,
      label: menu.label,
      path: isCategoryMegaMenu ? '/shop-by-category' : getMenuPath(menu.id),
      desktop_row: menu.desktop_row,
      desktop_order: menu.desktop_order,
      mobile_order: menu.mobile_order,
      isMegaMenu: isCategoryMegaMenu,
    };

    if (menu.id === 'luxury') {
      result.isGrouped = true;
      const luxuryItems = itemsByParent['luxury'] || [];
      result.groups = [
        {
          groupTitle: 'Stitched',
          items: luxuryItems.filter((i) => !i.section.toLowerCase().includes('unstitched')).map((i) => ({ id: `luxury-stitched-${i.handle}`, label: i.title, path: `/luxury/stitched/${i.handle}`, collectionHandle: i.handle, collectionGid: i.collectionGid })),
        },
        {
          groupTitle: 'Unstitched',
          items: luxuryItems.filter((i) => i.section.toLowerCase().includes('unstitched')).map((i) => ({ id: `luxury-unstitched-${i.handle}`, label: i.title, path: `/luxury/unstitched/${i.handle}`, collectionHandle: i.handle, collectionGid: i.collectionGid })),
        },
      ];
    } else if (!isCategoryMegaMenu && itemsByParent[menu.id]?.length) {
      result.children = itemsByParent[menu.id].map((i) => ({
        id: `${menu.id}-${i.handle}`,
        label: i.title,
        path: `/${menu.id}/${i.handle}`,
        collectionHandle: i.handle,
        collectionGid: i.collectionGid,
      }));
    }
    return result;
  });
}

export function buildCollectionSections(itemsByParent) {
  const shopByCategoryItems = itemsByParent['shop-by-category'] || [];
  const sectionMap = {};

  shopByCategoryItems.forEach((item) => {
    const sec = item.section && item.section !== 'None' ? item.section : 'General';
    sectionMap[sec] = sectionMap[sec] || [];
    sectionMap[sec].push({
      id: item.id,
      name: item.title.toUpperCase(),
      image: item.image || getFallbackBanner(),
      path: buildCategoryCardPath(sec, item.handle),
      sort_order: item.sort_order,
      collectionHandle: item.handle,
      collectionGid: item.collectionGid,
    });
  });

  // Ensure INSTAGRAM SALE is ALWAYS in Fabrics section
  if (sectionMap['Fabrics']) {
    const hasIg = sectionMap['Fabrics'].some(
      (c) => c.name?.toLowerCase().includes('instagram') || c.collectionHandle === 'instagram-sale'
    );
    if (!hasIg) {
      sectionMap['Fabrics'].push({
        id: 'fab-instagram-sale',
        name: 'INSTAGRAM SALE',
        image: getFallbackBanner(),
        path: '/instagram-sale',
        sort_order: 99,
        collectionHandle: 'instagram-sale',
        collectionGid: 'gid://shopify/Collection/306869239959',
      });
    }
  }

  return Object.keys(sectionMap).map((title) => ({
    title,
    cards: sectionMap[title].sort((a, b) => a.sort_order - b.sort_order),
  }));
}

export function parseBrandLogos(logoNodes) {
  return (logoNodes || [])
    .map((node) => {
      const fields = {};
      node.fields?.forEach((f) => {
        fields[f.key] = f.value;
        if (f.reference) fields[`${f.key}_ref`] = f.reference;
      });
      const imgRef = fields.logo_image_ref || fields.image_ref;
      const imageUrl = imgRef?.image?.url || (typeof fields.logo_image === 'string' && fields.logo_image.startsWith('http') ? fields.logo_image : '') || '';
      const order = parseInt(fields.order || fields.sort_order || node.handle || '99', 10);
      const name = fields.name || fields.title || `Brand ${node.handle || ''}`.trim();
      return { id: node.id || node.handle, handle: node.handle, name, src: imageUrl, order: isNaN(order) ? 99 : order };
    })
    .filter((item) => item.src)
    .sort((a, b) => a.order - b.order);
}

