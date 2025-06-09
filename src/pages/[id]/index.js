import Header from "../../components/header";
import Footer from "../../components/footer";
import Head from "next/head";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { useRouter } from "next/router";

const Post = ({ data }) => {
  const router = useRouter();

  const handleDel = async () => {
    const postID = router.query.id;
    try {
      const { status } = await fetch(
        `http://localhost:3000/api/journals/${postID}`,
        {
          method: "DELETE",
        }
      );
      if (status == 201) {
        $(".modal-backdrop").remove();
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='page'>
      <Head>
        <title>{data?.title}</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Header />
      <main>
        <article>
          <div className='title journalTitle'>
            <h1>{data?.title}</h1>
          </div>
          <span className='card-date text-primary font-weight-bolder mb-2'>
            {data?.year}-{data?.month}-{data?.day}
          </span>

          <div className='content'>{data?.description}</div>
          <Link href={`/${data?._id}/edit`}>
            <button type='button' className='btn btn-primary'>
              <a>Edit</a>
            </button>
          </Link>
          <button
            type='button'
            className='btn del btn-danger'
            data-toggle='modal'
            data-target='#exampleModal'>
            Delete
          </button>
          <div
            className='modal fade'
            id='exampleModal'
            tabIndex='-1'
            role='dialog'
            aria-labelledby='exampleModalLabel'
            aria-hidden='true'>
            <div className='modal-dialog' role='document'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    Confirm Delete
                  </h5>
                  <button
                    type='button'
                    className='close'
                    data-dismiss='modal'
                    aria-label='Close'>
                    <span aria-hidden='true'>&times;</span>
                  </button>
                </div>
                <div className='modal-body'>
                  Are you sure you want to delete this?
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-dismiss='modal'>
                    Cancel
                  </button>
                  <button
                    type='button'
                    className='btn btn-danger'
                    onClick={handleDel}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </div>
  );
};

Post.getInitialProps = async ({ query }) => {
  const res = await fetch(`http://localhost:3000/api/journals/${query.id}`);
  const { data } = await res.json();

  return { data: data };
};

export default Post;
