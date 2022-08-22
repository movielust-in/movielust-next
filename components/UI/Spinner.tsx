import { PlayerSpinner } from '../../assets';

function Spinner({
  width,
  height,
}: {
  width?: string | number;
  height?: string | number;
}) {
  return <PlayerSpinner width={width} height={height} />;
}

export default Spinner;

Spinner.defaultProps = {
  width: 'auto',
  height: 'auto',
};
