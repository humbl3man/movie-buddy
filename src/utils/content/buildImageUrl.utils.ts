import placeholderImage from '../../assets/imagePlaceholder.svg';

interface BuildOptions {
  posterSize?: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  backdropSize?: 'w300' | 'w780' | 'w1280' | 'original';
}

export function buildImageUrl(imageSrc: string | undefined | null, buildOptions: BuildOptions) {
  if (!imageSrc) return placeholderImage;

  const baseURL = 'https://image.tmdb.org/t/p';
  const { posterSize, backdropSize } = buildOptions;
  let size = 'original';
  if (typeof posterSize !== 'undefined') {
    size = posterSize;
  }
  if (typeof backdropSize !== 'undefined') {
    size = backdropSize;
  }

  return new URL(`${baseURL}/${size}/${imageSrc}`.replaceAll('//', '/'), import.meta.url).href;
}
