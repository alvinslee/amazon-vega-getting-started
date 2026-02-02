/**
 * Resolves image URLs from video metadata to a valid React Native Image source.
 * - Remote URLs (http/https): used as-is with {uri: url}
 * - Local asset paths (e.g. "assets/movie-content/tile01.jpg"): mapped to require() for bundled assets
 */

const LOCAL_ASSETS: {[path: string]: number} = {
  'assets/movie-content/tile01.jpg': require('../assets/movie-content/tile01.jpg'),
  'assets/movie-content/tile02.jpg': require('../assets/movie-content/tile02.jpg'),
  'assets/movie-content/tile03.jpg': require('../assets/movie-content/tile03.jpg'),
  'assets/movie-content/tile04.jpg': require('../assets/movie-content/tile04.jpg'),
  'assets/movie-content/tile05.jpg': require('../assets/movie-content/tile05.jpg'),
  'assets/movie-content/tile06.jpg': require('../assets/movie-content/tile06.jpg'),
  'assets/movie-content/tile07.jpg': require('../assets/movie-content/tile07.jpg'),
  'assets/movie-content/tile08.jpg': require('../assets/movie-content/tile08.jpg'),
  'assets/movie-content/tile09.jpg': require('../assets/movie-content/tile09.jpg'),
  'assets/movie-content/tile10.jpg': require('../assets/movie-content/tile10.jpg'),
  'assets/movie-content/tile11.jpg': require('../assets/movie-content/tile11.jpg'),
  'assets/movie-content/tile12.jpg': require('../assets/movie-content/tile12.jpg'),
  'assets/movie-content/tile13.jpg': require('../assets/movie-content/tile13.jpg'),
  'assets/movie-content/tile14.jpg': require('../assets/movie-content/tile14.jpg'),
  'assets/movie-content/tile15.jpg': require('../assets/movie-content/tile15.jpg'),
  'assets/movie-content/tile16.jpg': require('../assets/movie-content/tile16.jpg'),
  'assets/movie-content/tile17.jpg': require('../assets/movie-content/tile17.jpg'),
  'assets/movie-content/tile18.jpg': require('../assets/movie-content/tile18.jpg'),
  'assets/movie-content/tile19.jpg': require('../assets/movie-content/tile19.jpg'),
  'assets/movie-content/tile20.jpg': require('../assets/movie-content/tile20.jpg'),
  'assets/movie-content/tile21.jpg': require('../assets/movie-content/tile21.jpg'),
};

export function resolveImageSource(
  imgURL: string,
): {uri: string} | number {
  if (!imgURL) {
    return {uri: ''};
  }
  if (imgURL.startsWith('http://') || imgURL.startsWith('https://')) {
    return {uri: imgURL};
  }
  const localSource = LOCAL_ASSETS[imgURL];
  if (localSource !== undefined) {
    return localSource;
  }
  return {uri: imgURL};
}
