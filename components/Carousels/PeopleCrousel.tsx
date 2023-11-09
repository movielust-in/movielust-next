import { useRouter } from 'next/router';

import Wrap from '../CarouselSlices/Wrap';
import { Person } from '../../types/tmdb';
import styles from '../../styles/people_carousel.module.scss';

import Carousel from './Carousel';

interface PeopleCrouselProps {
  data: Person[];
  title: string;
}

function PeopleCrousel({ data, title }: PeopleCrouselProps) {
  const router = useRouter();

  return (
    <>
      {title && <div className={styles.Title}>{title}</div>}
      <Carousel>
        {data &&
          data.map((member) => (
            <div className={styles.PeopleContainer} key={member.id}>
              <div
                className={styles.Card}
                role="presentation"
                onClick={() => {
                  router.push(`/person/${member.id}`);
                }}
              >
                <Wrap
                  alt={member.name!}
                  src={`https://image.tmdb.org/t/p/w200/${member.profile_path}`}
                />
              </div>
              <div className={styles.Detail}>{member.name}</div>
            </div>
          ))}
      </Carousel>
    </>
  );
}

export default PeopleCrousel;
