import { Link, Outlet } from "react-router-dom";

const AboutLayout = () => {
  return (
    <div className="container-fluid mt-3">
      <div className="mx-auto background-color rounded ">
        <div className="row">
          <div className="col-4">
            <div className="about-sidebar">
              <h2>
                <Link to={""}>About</Link>
              </h2>
              <ul>
                <li>
                  <Link to={""}>Overview</Link>
                </li>
                <li>
                  <Link to={""}>Overview</Link>
                </li>
                <li>
                  <Link to={""}>Overview</Link>
                </li>
                <li>
                  <Link to={""}>Overview</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutLayout;
