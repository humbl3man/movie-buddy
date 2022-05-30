import { Content } from '../../typings';

export function setContentType(contentList: Content[], type: 'movie' | 'tv') {
  return contentList.map((c) => ({ ...c, type }));
}
