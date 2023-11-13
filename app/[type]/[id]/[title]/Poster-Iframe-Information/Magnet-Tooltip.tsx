import { Tooltip } from 'react-tooltip';

import styles from '../Detail.module.scss';

const MagnetTooltip = () => (
  <Tooltip
    id="magnet_tooltip"
    className={styles.magnet_tooltip}
    classNameArrow={styles.magnet_tooltip_arrow}
  />
);

export default MagnetTooltip;
