import { useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";

import { useDispatch, useSelector } from "../../redux";

import { fetchWatched } from "../../helpers/user";
import Carousel from "./Carousel";
import WrapH from "../CarouselSlices/Wrap_Horizantal";
import { setRecents } from "../../redux/reducers/recent.reducer";
import { detailLink } from "../../utils";
import { detailLinkWithEpisode } from "../../utils/dashedTitle";

import styles from "../../styles/recent_carousel.module.scss";

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
  const recents = useSelector((state) => state.recents.content);

  const isStale = useSelector((state) => state.recents.stale);

  const dispatch = useDispatch();

  const called = useRef(false);

  useEffect(() => {
    if (isStale && !called.current) {
      called.current = true;
      fetchWatched().then((res) => {
        dispatch(setRecents(res));
      });
    }
  }, [dispatch, isStale]);

  return recents.length > 0 ? (
    <div className={styles.container}>
      <h2>Recently viewed</h2>
      <Carousel carosel_id="recent_carosel" breakPoints={breakPoints}>
        {recents.map((content: any) => (
          <SwiperSlide
            key={
              content.title ||
              `${content.name} S${content.season_number} E${content.episode_number}`
            }
          >
            <Link
              href={
                content.media_type === "movie"
                  ? detailLink(content.media_type, content.id, content.title)
                  : detailLinkWithEpisode(
                      content.media_type,
                      content.id,
                      content.name,
                      content.season_number,
                      content.episode_number
                    )
              }
            >
              <a>
                <WrapH
                  src={`https://image.tmdb.org/t/p/w300/${content.backdrop_path}`}
                  alt={content.title || content.name || ""}
                  title={
                    content.title ||
                    `${content.name} S${content.season_number} E${content.episode_number}`
                  }
                />
              </a>
            </Link>
          </SwiperSlide>
        ))}
      </Carousel>
    </div>
  ) : null;
}

export default RecentCarousel;
