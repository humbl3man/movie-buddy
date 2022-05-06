import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Content } from '../typings';
import ContentCard from './ContentCard';

type ContentListProps = {
  data?: Content[] | undefined;
};

const StyledContentList = styled.section`
  display: grid;
  grid-gap: 2.4rem;
  grid-template-columns: repeat(2, 1fr);
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ContentList: React.FC<ContentListProps> = (props) => {
  const list = props.data ?? [];

  function renderContent(content: Content) {
    const detailURL = content.type === 'movie' ? `/movie/${content.id}` : `/tv/${content.id}`;
    return (
      <Link key={content.id} to={detailURL}>
        <ContentCard key={content.id} content={content} />
      </Link>
    );
  }

  return <StyledContentList>{list.length > 0 && list.map(renderContent)}</StyledContentList>;
};
export default ContentList;
