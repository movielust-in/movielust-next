import { SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import useSWR from 'swr';

import { fetchRecents } from '../../lib/api/user/fetch-recents';
import WrapH from '../CarouselSlices/Wrap_Horizantal';
import { detailLink } from '../../utils';
import { detailLinkWithEpisode } from '../../utils/dashedTitle';
import styles from '../../styles/recent_carousel.module.scss';

import Carousel from './Carousel';

const breakPoints = {
  1024: {
    slidesPerView: 4,
  },
  464: {
    slidesPerView: 4,
  },
  0: {
    slidesPerView: 3,
  },
};

function RecentCarousel() {
  const { data, isLoading, error } = useSWR('/api/user/recents', fetchRecents);

  if (isLoading || error) return null;

  return data && data?.length > 0 ? (
    <div className={styles.container}>
      <h2>Recently viewed</h2>
      <Carousel carosel_id="recent_carosel" breakPoints={breakPoints}>
        {data.map((content: any) => (
          <SwiperSlide
            key={
              content.title ||
              `${content.show_name} - ${content.name} - S${content.season_number} E${content.episode_number}`
            }
          >
            <Link
              prefetch={false}
              href={
                content.media_type === 'movie'
                  ? detailLink(content.media_type, content.id, content.title)
                  : detailLinkWithEpisode(
                      content.media_type,
                      content.show_id,
                      content.show_name,
                      content.season_number,
                      content.episode_number
                    )
              }
            >
              <WrapH
                src={`https://image.tmdb.org/t/p/w300/${
                  content.backdrop_path || content.still_path
                }`}
                alt={content.title || content.name || ''}
                title={
                  content.title ||
                  `${content.show_name} - S${content.season_number} E${content.episode_number} ${content.name} `
                }
              />
            </Link>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  ) : null;
}

export default RecentCarousel;
