export function parseHomePageBanners(bannerNodes) {
  return (bannerNodes || [])
    .map((node, index) => {
      const fields = {};
      node.fields?.forEach((f) => {
        fields[f.key] = f.value;
        if (f.reference) fields[`${f.key}_ref`] = f.reference;
      });
      const desktop = fields.leptop_ref?.image?.url || fields.desktop_ref?.image?.url || fields.image_ref?.image?.url || '';
      const mobile = fields.mobile_ref?.image?.url || desktop || '';
      const order = parseInt(fields.order || node.handle || `${index + 1}`, 10);
      return {
        id: node.id || node.handle || `slide-${index}`,
        order: isNaN(order) ? index + 1 : order,
        imageUrl: desktop || mobile,
        desktopImage: desktop,
        mobileImage: mobile,
        eager: index === 0,
      };
    })
    .filter((b) => Boolean(b.desktopImage || b.mobileImage))
    .sort((a, b) => a.order - b.order)
    .map((b, idx) => ({ ...b, eager: idx === 0 }));
}

export function parseCollectionBanners(bannerNodes) {
  return (bannerNodes || [])
    .map((node) => {
      const fields = {};
      node.fields?.forEach((f) => {
        fields[f.key] = f.value;
        if (f.reference) fields[`${f.key}_ref`] = f.reference;
      });
      const colRef = fields.collection_reference_ref || fields.collection_ref;
      const rawRef = fields.collection_reference || fields.collection || '';
      const colHandle = colRef?.handle || (!rawRef.startsWith('gid://') && rawRef ? rawRef : node.handle);
      return {
        id: node.id,
        handle: node.handle,
        title: fields.title || colRef?.title || '',
        collectionHandle: colHandle,
        collectionGid: colRef?.id || rawRef,
        desktopBanner: fields.desktop_banner_ref?.image?.url || null,
        mobileBanner: fields.mobile_banner_ref?.image?.url || null,
        isActive: fields.is_active !== 'false' && fields.is_active !== false,
      };
    })
    .filter((b) => b.isActive);
}
