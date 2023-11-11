'use client';

import { Tooltip as ReactTooltip } from 'react-tooltip';

import HoverCard from '../CarouselSlices/HoverCard';

import styles from './tooltip.module.scss';

const Tooltip = () => (
  <div className={styles.movie_card_hover_tooltip_container}>
    <ReactTooltip
      id="movie_card_hover"
      className={styles.tooltip}
      place="right-end"
      delayShow={300}
      delayHide={100}
      render={({ activeAnchor }) => (
        <HoverCard
          backdrop={activeAnchor?.getAttribute('data-backdrop')!}
          title={activeAnchor?.getAttribute('data-title')!}
          genres={activeAnchor?.getAttribute('data-genres')!}
          description={activeAnchor?.getAttribute('data-description')!}
        />
      )}
    />
  </div>
);

export default Tooltip;
