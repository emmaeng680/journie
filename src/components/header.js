import Link from "next/link";
// import styles from "../styles/header.module.css";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light">
      <div className="container">
        <div className="navbar-header">
          <p className="navbar-brand">DAILY JOURNAL</p>
        </div>
        {/* <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button> */}

        {/* <div className="collapse navbar-collapse" id="navbarNav"> */}
        <ul className="navbar-nav navbar-right">
          <li className="list-inline-item nav-item" id="home">
            <Link href="/">
              <a className="nav-link">Home</a>
            </Link>
          </li>
          <li className="list-inline-item" id="about">
            <Link href="/compose">
              <a className="nav-link">Compose</a>
            </Link>
          </li>
          <li className="list-inline-item" id="contact">
            <Link href="/contact">
              <a className="nav-link">Contact</a>
            </Link>
          </li>
        </ul>
      </div>
      {/* </div> */}
    </nav>
  );
};

export default Header;
