import { StyledLoadingScreen, StyledSpinner } from './Loader.styles';

type LoaderProps = {
  fullScreen?: boolean;
};

const Loader: React.FC<LoaderProps> = (props) => {
  return (
    <StyledLoadingScreen fullScreen={props.fullScreen}>
      <StyledSpinner>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </StyledSpinner>
    </StyledLoadingScreen>
  );
};

export default Loader;
