import { memo, useMemo } from 'react';
import { useRouter } from 'next/router';
import { SwiperSlide } from 'swiper/react';

import Carousel from './Carousel';
import PersonCard from '../CarouselSlices/PersonCard';
import ShowAllButton from '../CarouselSlices/ShowAllButton';

import { dashedTitle } from '../../utils';

import styles from '../../styles/carousel.module.scss';

interface CastCarouselProps {
  cast: any[];
  title: string;
  type?: string;
  id?: string;
  contentTitle?: string;
}

CastCarousel.defaultProps = {
  id: null,
  type: null,
  contentTitle: '',
};

function CastCarousel({
  cast,
  title,
  type,
  id,
  contentTitle,
}: CastCarouselProps) {
  const router = useRouter();

  const casts = useMemo(() => cast.slice(0, 20), [cast]);

  return (
    <div className={styles.big_container}>
      <div className={styles.Title}>
        <h2>{title}</h2>
        {id && contentTitle ? (
          <ShowAllButton
            link={`/cast/${type}/${id}/${dashedTitle(contentTitle)}`}
            label="See all cast"
          />
        ) : null}
      </div>

      <Carousel carosel_id="cast_slider">
        {casts
          .filter((member) => member.profile_path)
          .map((member) => (
            <SwiperSlide
              id="cast_slider"
              key={member.id}
              onClick={() => {
                router.push(`/person/${member.id}`);
              }}
            >
              {type === 'tv' ? (
                <PersonCard
                  src={`https://image.tmdb.org/t/p/w780/${member.profile_path}`}
                  alt={member.name}
                  title={`${member.name} ${
                    member.roles && member.roles[0].character
                      ? ` as ${member.roles[0].character}`
                      : ''
                  }`}
                />
              ) : (
                <PersonCard
                  src={`https://image.tmdb.org/t/p/w780/${member.profile_path}`}
                  alt={member.name}
                  title={`${member.name} ${
                    member.character ? ` as ${member.character}` : ''
                  }`}
                />
              )}
            </SwiperSlide>
          ))}
      </Carousel>
    </div>
  );
}

export default memo(CastCarousel);
