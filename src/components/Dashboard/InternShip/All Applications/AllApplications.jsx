import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllApplication = () => {
  const [Application, setApplication] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleApplication, setSingleApplication] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getApplication();
  }, [update]);

  // Function to get all Applications

  const getApplication = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/InternOpeningsRouter/getAllApplication`
      )
      .then((res) => {
        setApplication(res.data.content);
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
    let tempIntern = [...Application];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSingleApplication(d);
    console.log("singleApplication", singleApplication);
  }
  function editApplication(id) {
    navigate(`/dashboard/Internship/update-Application/${id}`);
  }
  async function deleteApplication(id) {
    try {
      const rawData = await axios.delete(
        `https://thrivers-assignment-server.onrender.com/InternOpeningsRouter/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("Application deleted successfully");
      } else {
        alert("Application deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deleteApplication(id);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"All Applications"} />
      <section className="section dashboard">
        <div className="row">
          {Application?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Contact Number</th>
                  </tr>
                </thead>
                <tbody>
                  {Application?.map((singleApplication, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {singleApplication?.Name}{" "}
                        {/* {singleApplication?.OpeningDetails} */}
                      </td>
                      {singleApplication?.Email && (
                        <td className="overflowY-auto">
                          {singleApplication?.Email}{" "}
                        </td>
                      )}
                      {singleApplication?.ContactNumber && (
                        <td className="overflowY-auto">
                          {singleApplication?.ContactNumber}{" "}
                        </td>
                      )}
                      {!singleApplication?.OpeningDetails && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singleApplication?._id)}
                      >
                        Details
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {Application?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Applications found
            </div>
          )}
          {singleApplication.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div
                  style={{ overflow: "auto" }}
                  className="card-body profile-card pt-4 d-flex flex-column align-items-center"
                >
                  <h3>{singleApplication[0]?.Name} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Email</th>
                          <td>{singleApplication[0]?.Email}</td>
                        </tr>
                        <tr>
                          <th scope="row">Contact Number</th>
                          <td>{singleApplication[0]?.ContactNumber}</td>
                        </tr>
                        <tr>
                          <th scope="row">Resume</th>
                          <td className="mx-5">
                            <a href={singleApplication[0]?.Resume}>
                              {singleApplication[0]?.Resume}
                            </a>{" "}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">College</th>
                          <td className="mx-5">
                            {singleApplication[0]?.College}
                          </td>
                        </tr>{" "}
                        <tr>
                          <th scope="row">Branch</th>
                          <td className="mx-5">
                            {singleApplication[0]?.Branch}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Opening Title</th>
                          <td className="mx-5">
                            {singleApplication[0]?.OpeningTitle}
                          </td>
                        </tr>
                        <tr>
                          <th scope="row">Pass Out Year</th>
                          <td className="mx-5">
                            {singleApplication[0]?.PassoutYear}
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

export default AllApplication;
