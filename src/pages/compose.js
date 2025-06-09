import Header from "../components/header";
import Footer from "../components/footer";
import Spinner from "../components/spinner";
import Head from "next/head";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { useRouter } from "next/router";

const Compose = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  const router = useRouter();
  const [submit, setSubmit] = useState(false);
  const [errors, setError] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title) form.title = "Untitled";
    // else if (form.title.length > 50) {
    //   form.title = form.title.substr(0, 50);
    // }
    let err = validate();
    setError(err);
    setSubmit(true);
  };

  const validate = () => {
    let err = {};
    if (!form.description) {
      err.description = "Entry cannot be empty.";
    }
    return err;
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (submit) {
      if (Object.keys(errors).length === 0) {
        publishJournal();
      } else {
        setSubmit(false);
        console.log(form.title.length);
        if (form.title.length > 50) {
          alert(
            "Title cannot be more than 50 characters. Post cannot be empty"
          );
        } else alert("Post cannot be empty");
      }
    }
  }, [errors]);

  const publishJournal = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/journals", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="page">
      <Head>
        <title>Compose</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Header />
      <main>
        {submit ? (
          <Spinner />
        ) : (
          <h1 className="container-fluid">
            <div className="row">
              <div className="col-lg-9">
                <h1>Compose</h1>
                <form className="form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      placeholder="Title"
                      className="form-control"
                      onChange={handleChange}
                    />

                    <label htmlFor="textInput">Post</label>
                    <textarea
                      name="description"
                      id="textInput"
                      className="form-control"
                      rows="8"
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <button type="submit" className="btn btn-lg">
                    Publish
                  </button>
                </form>
              </div>
            </div>
          </h1>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Compose;
