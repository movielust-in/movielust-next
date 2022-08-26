import Image from 'next/image';

function Spinner({
  width,
  height,
}: {
  width?: string | number;
  height?: string | number;
}) {
  return (
    <Image src="/images/player_loading.svg" width={width} height={height} />
  );
}

export default Spinner;

Spinner.defaultProps = {
  width: 30,
  height: 30,
};
