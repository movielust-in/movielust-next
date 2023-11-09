import styles from './disclaimer.module.scss';

function Disclaimer() {
  return (
    <div className={styles.Container}>
      <h3>Website Disclaimer</h3>
      <ul className={styles.Notice}>
        <li>
          <h2>01</h2>
          <p>
            All the posts are made only for educational purposes and any linked
            content is stored only in third-party websites. Since freedom of
            speech is allowed in this fashion, we do not attend in any kind of
            copyright infringing.
          </p>
        </li>
        <li>
          <h2>02</h2>
          <p>
            Movielust does not host any files on servers.All files or contents
            hosted on third party websites. movie-lust.vercel.app does not
            accept responsibility for contents hosted on third party websites.
            We just index those links which are already available in internet
            This is a promotional website only, all the content provided on this
            site (All materials) is for testing/promotion purposes only. All
            files placed here are for introducing purpose.
          </p>
        </li>
        <li>
          <h2>03</h2>
          <p>
            We highly ENCOURAGE users to BUY the OTT platform subscription for
            watching movies and TV series.Please, buy OTT platform subscription
            contents from author or developer site! If you Do not agree to all
            the terms, please disconnect from this site now itself.
          </p>
        </li>
        <li>
          <h2>04</h2>
          <p>
            By remaining at this site, you affirm your understanding and
            compliance of the above disclaimer and absolve this site of any
            responsibility henceforth.Also, you accept that it is not harmful to
            watch and download this data. Moreover,no data is used for business
            or to earn profit.
          </p>
        </li>
        <li>
          <h2>05</h2>
          <p>
            All files found on this site have been collected from various
            sources across the web and are believed to be in the “public
            domain”. You should DELETE IT(data) within 24 hours and make a point
            to buy the OTT platform subscription.
          </p>
        </li>
        <li>
          <h2>06</h2>
          <p>
            If you are the rightful owner of any contents posted here and object
            to them being displayed or If you are one of the representatives of
            copy rights department and you don’t like our conditions of store,
            please mail us regarding your query.
          </p>
        </li>
      </ul>
    </div>
  );
}

export default Disclaimer;
