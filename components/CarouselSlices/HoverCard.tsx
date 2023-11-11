import { memo } from 'react';

import { image } from '../../lib/tmdb/Urls';
import styles from '../../styles/Wrap.module.scss';

interface Props {
  backdrop: string;
  title: string;
  genres: string;
  description: string;
}

const HoverCard = ({ backdrop, title, genres, description }: Props) => (
  <div
    role="presentation"
    className={styles.card}
    style={backdrop ? { backgroundImage: `url(${image(200, backdrop)})` } : {}}
    id="card"
  >
    <div className={styles.title} id="card_title">
      {title}
    </div>
    <div className={styles.genres} id="card_genres">
      {genres?.split(',').map((genre) => (
        <span key={genre} id="card_genre_span">
          {genre}
        </span>
      ))}
    </div>

    <div className={styles.description} id="card_desc">
      {description}
    </div>
  </div>
);

export default memo(HoverCard);
