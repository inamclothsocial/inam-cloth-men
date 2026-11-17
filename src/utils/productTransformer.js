import { parseShopifyColor } from './colorHelpers';

export function transformShopifyProduct(node) {
  if (!node) return null;
  const price = parseFloat(node.priceRange?.minVariantPrice?.amount || '0');
  const compareAtAmount = parseFloat(node.compareAtPriceRange?.minVariantPrice?.amount || '0');
  const originalPrice = compareAtAmount > price ? compareAtAmount : null;
  const currency = node.priceRange?.minVariantPrice?.currencyCode || 'INR';
  const featuredImg = node.featuredImage?.url || node.images?.nodes?.[0]?.url || '';
  const hoverImg = node.images?.nodes?.[1]?.url || featuredImg;
  const allImages = (node.images?.nodes || []).map((img) => img.url).filter(Boolean);
  if (!allImages.length && featuredImg) allImages.push(featuredImg);

  const variants = (node.variants?.nodes || []).map((v) => ({
    id: v.id,
    title: v.title,
    availableForSale: v.availableForSale !== false,
    price: parseFloat(v.price?.amount || price),
    compareAtPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : originalPrice,
    image: v.image?.url || featuredImg,
    selectedOptions: v.selectedOptions || [],
  }));

  const sizeOption = node.options?.find((o) => o.name?.toLowerCase().includes('size'));
  const colorOption = node.options?.find((o) =>
    o.name?.toLowerCase().includes('color') || o.name?.toLowerCase().includes('colour')
  );
  const sizes = sizeOption?.values?.filter(Boolean) || [];
  const rawColors = colorOption?.values?.filter(Boolean) || [];
  const colors = rawColors.map(parseShopifyColor);
  const allCols = (node.collections?.nodes || []).filter(
    (c) => c && c.handle && c.handle !== 'frontpage'
  );
  const primaryCol = allCols.find((c) => c.handle !== 'dilaab-collection') || allCols[0];
  const collectionName = primaryCol?.title || node.productType || 'Collection';

  return {
    id: node.id,
    handle: node.handle,
    name: node.title,
    title: node.title,
    price,
    originalPrice,
    currency,
    image: featuredImg,
    hoverImage: hoverImg,
    images: allImages.length ? allImages : [featuredImg, hoverImg],
    category: node.productType || collectionName || 'SUIT',
    productType: node.productType || '',
    vendor: node.vendor || 'INAM CLOTH',
    availableForSale: node.availableForSale !== false,
    tags: node.tags || [],
    description: node.description || '',
    descriptionHtml: node.descriptionHtml || `<p>${node.description || ''}</p>`,
    variants,
    options: node.options || [],
    sizes,
    colors,
    rating: 4.8,
    reviewsCount: 12,
    collectionName,
    collectionSlug: primaryCol?.handle || '',
    collections: allCols,
  };
}

export function transformShopifyProducts(nodes) {
  return (nodes || []).map(transformShopifyProduct).filter(Boolean);
}
