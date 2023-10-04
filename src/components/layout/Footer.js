import { useContext } from "react";
import { ToDosDataContext } from "../../contexts/ToDosDataContext";

const Footer = () => {
  const { loadingStatus } =
    useContext(ToDosDataContext);

  return (
    <footer className="text-center">
      <div className="stats">

        <div className="footer-refresh" title="Refreshing">
          {loadingStatus === "loading" ? (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
          ) : (
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
              hidden
            ></span>
          )}
        </div>

        <div className="quick-stats">
          <p>
            Click on the course to open the link.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
