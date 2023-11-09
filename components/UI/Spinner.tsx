import Image from 'next/image';

function Spinner({
  width = 30,
  height = 30,
}: {
  width?: number;
  height?: number;
}) {
  return (
    <Image
      alt="spinner"
      src="/images/player_loading.svg"
      width={width}
      height={height}
      unoptimized
      style={{
        maxWidth: '100%',
        height: 'auto',
      }}
    />
  );
}

export default Spinner;
