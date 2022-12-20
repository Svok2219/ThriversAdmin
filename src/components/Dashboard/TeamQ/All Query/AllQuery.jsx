import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllQuery = () => {
  const [Query, setQuery] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleQuery, setSingleQuery] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getQuery();
  }, [update]);

  // Function to get all Querys

  const getQuery = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/Contact/getAllMessege`
      )
      .then((res) => {
        setQuery(res.data.content);
        console.log(res.data.content);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  function getDateStr(date) {
    let tdate = new Date(date);
    return (
      tdate.getDate() + "/" + (tdate.getMonth() + 1) + "/" + tdate.getFullYear()
    );
  }

  // function to convert image to base64

  function showDetails(id) {
    let tempIntern = [...Query];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSingleQuery(d);
    console.log("singleQuery", singleQuery);
  }

  return (
    <main id="main" className="main">
      <PageTitle name={"All Query"} />
      <section className="section dashboard">
        <div className="row">
          {Query?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">ContactNumber</th>
                  </tr>
                </thead>
                <tbody>
                  {Query?.map((singleQuery, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {singleQuery?.Name} {/* {singleQuery?.Email} */}
                      </td>
                      {singleQuery?.Email && (
                        <td className="overflowY-auto">
                          {singleQuery?.Email}{" "}
                        </td>
                      )}
                      {singleQuery?.ContactNumber && (
                        <td className="overflowY-auto">
                          {singleQuery?.ContactNumber}{" "}
                        </td>
                      )}
                      {!singleQuery?.Email && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singleQuery?._id)}
                      >
                        Details
                      </button>
                      {/* <button
                        className="btn"
                        type="button"
                        onClick={() => editQuery(singleQuery?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => handleConfirmDelete(singleQuery?._id)}
                      >
                        Delete
                      </button> */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {Query?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Queries found
            </div>
          )}
          {singleQuery.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div
                  style={{ overflow: "auto" }}
                  className="card-body profile-card pt-4 d-flex flex-column align-items-center"
                >
                  {/* <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singleQuery?.[0]?.Image}
                    alt="Profile"
                    className="rounded-circle"
                  /> */}
                  <h3>{singleQuery[0]?.Name} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Email</th>
                          <td>{singleQuery[0]?.Email}</td>
                        </tr>
                        <tr>
                          <th scope="row">ContactNumber</th>
                          <td className="mx-5">
                            <a href={singleQuery[0]?.ContactNumber}>
                              {singleQuery[0]?.ContactNumber}
                            </a>{" "}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Branch</th>
                          <td>{singleQuery[0]?.Branch}</td>
                        </tr>
                        <tr>
                          <th scope="row">PassoutYear</th>
                          <td className="mx-5">
                            <a href={singleQuery[0]?.PassoutYear}>
                              {singleQuery[0]?.PassoutYear}
                            </a>{" "}
                          </td>
                        </tr>{" "}
                        <tr>
                          <th scope="row">StateMent</th>
                          <td className="mx-5">
                            <a href={singleQuery[0]?.Query}>
                              {singleQuery[0]?.Query}
                            </a>{" "}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {loading && (
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <CircularProgress />
            </Box>
          )}
        </div>
      </section>
    </main>
  );
};

export default AllQuery;
