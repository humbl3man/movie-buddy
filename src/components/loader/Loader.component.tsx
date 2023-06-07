import { LoaderProps } from '../../typings';
import { StyledLoadingScreen, StyledSpinner } from './Loader.styles';

const Loader = ({ fullScreen }: LoaderProps) => {
  return (
    <StyledLoadingScreen fullScreen={fullScreen}>
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
