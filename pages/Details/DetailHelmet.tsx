import Helmet from "next/head";
import { CommonData } from "./DetailTypes";
import { image } from "../../api/Urls";

interface DetailHelmetProps {
  commonData: CommonData | undefined;
}

function DetailHelmet({ commonData }: DetailHelmetProps) {
  // console.log(commonData)

  return (
    <Helmet>
      <title>{commonData?.title} - Movielust</title>
      <meta name="description" content={commonData?.overview} />
      <meta
        property="og:title"
        name="og:title"
        content={`${commonData?.title} - Movielust`}
      />
      <meta property="og:description" content={commonData?.overview} />
      <meta property="og:site_name" content="Movielust" />
      <meta property="og:url" content={window.location.href} />
      <meta
        property="og:image"
        content={image(200, commonData?.poster || "")}
      />
      <meta name="twitter:title" content={`${commonData?.title} - Movielust`} />
      <meta name="twitter:description" content={commonData?.overview} />
      <meta name="twitter:card" content="player" />
      <meta name="twitter:site" content="@movielust" />
      <meta name="twitter:url" content="https://www.movielust.in" />
      <meta
        name="twitter:image"
        content={image(200, commonData?.poster || "")}
      />
    </Helmet>
  );
}

export default DetailHelmet;
