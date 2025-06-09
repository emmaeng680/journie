import Header from "../components/header";
import Footer from "../components/footer";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Link from "next/link";

const Home = ({ data }) => {
  return (
    <div className='page'>
      <Head>
        <title>Home</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <main>
        <div className='title text-center'>
          <h1>All Journals</h1>
        </div>

        <section className='entries'>
          {data?.map((entry) => {
            return (
              <div className='card' key={entry?._id}>
                <div className='card-body'>
                  <h2 className='card-title'>
                    <Link href={`/${entry?._id}/edit`}>
                      <a className='card-link'>{entry?.title}</a>
                    </Link>
                  </h2>
                  <span className='card-date text-muted mb-2'>
                    {entry?.year}-{entry?.month}-{entry?.day}
                  </span>
                  <p className='card-text'>
                    {entry?.description.substr(0, 150)}...
                  </p>
                  <Link href={`/${entry?._id}`}>
                    <a className='homeReadMore btn'>Read More...</a>
                  </Link>
                </div>
              </div>
            );
          })}
        </section>
      </main>
      <div className='footer-padding'></div>
      <Footer />
    </div>
  );
};

Home.getInitialProps = async () => {
  const res = await fetch("http://localhost:3000/api/journals");
  const { data } = await res.json();

  return { data: data };
};

export default Home;
