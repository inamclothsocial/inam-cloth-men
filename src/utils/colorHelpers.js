const COLOR_MAP = {
  black: '#18181B',
  white: '#FFFFFF',
  'off white': '#FAF9F6',
  cream: '#FDFBF7',
  beige: '#E7D8C9',
  red: '#DC2626',
  maroon: '#800000',
  wine: '#722F37',
  rust: '#C25E35',
  'light rust': '#C25E35',
  blue: '#1E3A8A',
  'navy blue': '#0F172A',
  'sky blue': '#38BDF8',
  'rama blue': '#0284C7',
  peacock: '#005F73',
  green: '#15803D',
  'dark green': '#14532D',
  'pista green': '#93C572',
  'mehndi green': '#4D7C0F',
  'dark sage green': '#4A5D4E',
  'rama green': '#0D9488',
  'light green': '#86EFAC',
  'dark parrot': '#55A630',
  yellow: '#EAB308',
  mustard: '#D97706',
  'mustard brown': '#854D0E',
  gold: '#CA8A04',
  copper: '#B87333',
  pink: '#EC4899',
  'light pink': '#F9A8D4',
  'baby pink': '#FBCFE8',
  magenta: '#C026D3',
  onion: '#B76E79',
  purple: '#7E22CE',
  lavender: '#C084FC',
  peach: '#FDBA74',
  gray: '#6B7280',
  grey: '#6B7280',
  'dark grey': '#4B5563',
  brown: '#78350F',
};

export function cleanColorName(colorStr = '') {
  if (!colorStr || typeof colorStr !== 'string') return '';
  return colorStr.replace(/\(\d+\)/g, '').replace(/[-_]/g, ' ').replace(/\s+/g, ' ').trim();
}

export function getColorHex(colorStr = '') {
  if (!colorStr || typeof colorStr !== 'string') return '#18181B';
  const clean = cleanColorName(colorStr).toLowerCase();
  if (COLOR_MAP[clean]) return COLOR_MAP[clean];
  for (const [key, hex] of Object.entries(COLOR_MAP)) {
    if (clean.includes(key)) return hex;
  }
  return '#94A3B8';
}

export function parseShopifyColor(colorStr = '') {
  const original = String(colorStr || '').trim();
  const label = cleanColorName(original) || original;
  const hex = getColorHex(original);
  return { name: original, label, hex };
}
