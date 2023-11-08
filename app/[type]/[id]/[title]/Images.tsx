import ImageCrousel from '../../../../components/Carousels/ImageCrousel';
import { fetchImages } from '../../../../lib/tmdb/tv';

const getImages = async (id: string, type: string) => {
  const res = await fetchImages(id, type);
  return res;
};

const Images = async ({ id, type }: { id: string; type: string }) => {
  const images = await getImages(id, type);

  return <ImageCrousel images={images.backdrops} type={type} title="Images" />;
};

export default Images;
