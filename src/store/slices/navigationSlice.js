import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  NAV_LINKS,
  TOP_NAV_LINKS,
  CATEGORY_NAV_LINKS,
  BRAND_INFO,
} from '../../data/navigation';
import { BRAND_PARTNERS } from '../../data/brandsData';
import { COLLECTION_SECTIONS } from '../../data/shopByCollectionMenuData';
import { HERO_SLIDES } from '../../data/heroSlides';
import { fetchStorefrontNavigation } from '../../services/navigationService';

const CACHE_KEY = 'inam_home_banners_cache';
const BRAND_LOGOS_CACHE_KEY = 'inam_brand_logos_cache';

const getCachedHomeBanners = () => {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(CACHE_KEY) : null;
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

const getCachedBrandLogos = () => {
  try {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(BRAND_LOGOS_CACHE_KEY) : null;
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

export const fetchNavigationData = createAsyncThunk(
  'navigation/fetchData',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchStorefrontNavigation();
      return data;
    } catch (error) {
      console.warn('Shopify Metaobjects navigation fetch error:', error.message);
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  navLinks: NAV_LINKS,
  topNavLinks: TOP_NAV_LINKS,
  categoryNavLinks: CATEGORY_NAV_LINKS,
  mobileNavLinks: NAV_LINKS,
  collectionSections: COLLECTION_SECTIONS,
  collectionBanners: [],
  homeBanners: getCachedHomeBanners() || HERO_SLIDES,
  brandLogos: getCachedBrandLogos() || BRAND_PARTNERS,
  brandInfo: BRAND_INFO,
  status: 'idle',
  error: null,
};

export const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNavigationData.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchNavigationData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        if (action.payload.navLinks?.length) state.navLinks = action.payload.navLinks;
        if (action.payload.topNavLinks?.length) state.topNavLinks = action.payload.topNavLinks;
        if (action.payload.categoryNavLinks?.length) state.categoryNavLinks = action.payload.categoryNavLinks;
        if (action.payload.mobileNavLinks?.length) state.mobileNavLinks = action.payload.mobileNavLinks;
        if (action.payload.collectionSections?.length) state.collectionSections = action.payload.collectionSections;
        if (action.payload.collectionBanners?.length) state.collectionBanners = action.payload.collectionBanners;
        if (action.payload.brandLogos?.length) {
          state.brandLogos = action.payload.brandLogos;
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(BRAND_LOGOS_CACHE_KEY, JSON.stringify(action.payload.brandLogos));
            }
          } catch (e) {
            console.warn('Brand logos cache error', e);
          }
        }
        if (action.payload.homeBanners?.length) {
          state.homeBanners = action.payload.homeBanners;
          try {
            if (typeof window !== 'undefined') {
              localStorage.setItem(CACHE_KEY, JSON.stringify(action.payload.homeBanners));
            }
          } catch (e) {
            console.warn('Banner cache error', e);
          }
        }
      })
      .addCase(fetchNavigationData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload || 'Failed to fetch Shopify navigation data';
      });
  },
});

export const selectNavLinks = (state) => state.navigation.navLinks;
export const selectTopNavLinks = (state) => state.navigation.topNavLinks;
export const selectCategoryNavLinks = (state) => state.navigation.categoryNavLinks;
export const selectMobileNavLinks = (state) => state.navigation.mobileNavLinks;
export const selectCollectionSections = (state) => state.navigation.collectionSections;
export const selectCollectionBanners = (state) => state.navigation.collectionBanners;
export const selectHomeBanners = (state) => state.navigation.homeBanners;
export const selectBrandLogos = (state) => state.navigation.brandLogos;
export const selectBrandInfo = (state) => state.navigation.brandInfo;
export const selectNavigationStatus = (state) => state.navigation.status;
export const selectNavigationError = (state) => state.navigation.error;

export default navigationSlice.reducer;

