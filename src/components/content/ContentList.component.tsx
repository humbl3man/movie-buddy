import { Content } from '../../typings';
import ContentCard from './ContentCard.component';
import { StyledContentList } from './ContentList.styles';

type ContentListProps = {
  data?: Content[] | undefined;
  showWatchlistButton: boolean;
};

const ContentList: React.FC<ContentListProps> = (props) => {
  const list = props.data ?? [];

  function renderContent(content: Content) {
    const detailURL = content.type === 'movie' ? `/movie/${content.id}` : `/tv/${content.id}`;
    return <ContentCard url={detailURL} key={content.id} content={content} showWatchlistButton={props.showWatchlistButton} />;
  }

  return <StyledContentList>{list.length > 0 && list.map(renderContent)}</StyledContentList>;
};
export default ContentList;
