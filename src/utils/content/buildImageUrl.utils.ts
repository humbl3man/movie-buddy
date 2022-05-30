interface BuildOptions {
  posterSize?: 'w92' | 'w154' | 'w185' | 'w342' | 'w500' | 'w780' | 'original';
  backdropSize?: 'w300' | 'w780' | 'w1280' | 'original';
  src: string | undefined;
}

export function buildImageUrl(options: BuildOptions) {
  const baseURL = 'https://image.tmdb.org/t/p/';
  const { posterSize, backdropSize, src } = options;
  let size = 'original';
  if (typeof posterSize !== 'undefined') {
    size = posterSize;
  }
  if (typeof backdropSize !== 'undefined') {
    size = backdropSize;
  }

  return `${baseURL}/${size}/${src}`;
}
