import "bootstrap/dist/css/bootstrap.min.css";
import img from "../logo/logo.png"

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div>
      <footer className="bg-dark text-center text-lg-start" style={{padding:"0px"}}>
        <div className="container p-4">
          <div className="row align-items-center text-center text-md-start">
            {/* Logo and Copyright Section */}
            <div className="col-md-6 d-flex flex-column flex-md-row align-items-center justify-content-center justify-content-md-start">
              <img
                src={img}
                alt="Logo"
                style={{ width: "40px", marginRight: "10px" }}
                className="rounded-circle"
              />
              <span className="text-white">
                © {year} <b>photoShare</b>, Inc
              </span>
            </div>

            {/* Social Media Links */}
            <div className="col-md-6 d-flex justify-content-center justify-content-md-end mt-3 mt-md-0">
              <a
                href="https://github.com/ruturajjadhav07"
                className="text-white me-3 social-icon"
              >
                <i className="bi bi-github"></i>
              </a>
              <a
                href="https://www.linkedin.com/in/ruturaj-jadhav-0a250821b/"
                className="text-white me-3 social-icon"
              >
                <i className="bi bi-linkedin"></i>
              </a>
              <a
                href="https://x.com/spoiidermon"
                className="text-white me-3 social-icon"
              >
                <i className="bi bi-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/ruturajj_07/"
                className="text-white me-3 social-icon"
              >
                <i className="bi bi-instagram"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
