import sharp from 'sharp';
// Deterministically unmatte the supplied logo; do not redraw its artwork.
const input = 'public/images/brand/australis-live-logo.png';
const output = 'public/images/brand/australis-live-logo-transparent.png';
const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
let transparent = 0;
for (let p = 0; p < info.width * info.height; p++) {
  const rgb = [data[p*3], data[p*3+1], data[p*3+2]];
  const maximum = Math.max(...rgb);
  const alpha = maximum <= 4 ? 0 : maximum;
  if (!alpha) transparent++;
  for (let c = 0; c < 3; c++) rgba[p*4+c] = alpha ? Math.round(rgb[c] * 255 / alpha) : 0;
  rgba[p*4+3] = alpha;
}
await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toFile(output);
console.log({output, width:info.width, height:info.height, fullyTransparentPixels:transparent});
