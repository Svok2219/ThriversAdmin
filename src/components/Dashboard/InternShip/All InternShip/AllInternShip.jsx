import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllInternShip = () => {
  const [InternShip, setInternShip] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleInternShip, setSingleInternShip] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getInternShip();
  }, [update]);

  // Function to get all InternShips

  const getInternShip = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/InternOpeningsRouter/getAllInternship`
      )
      .then((res) => {
        setInternShip(res.data.content);
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
    let tempIntern = [...InternShip];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSingleInternShip(d);
    console.log("singleInternShip", singleInternShip);
  }
  function editInternShip(id) {
    navigate(`/dashboard/InternShip/update-InternShip/${id}`);
  }
  async function deleteInternShip(id) {
    try {
      const rawData = await axios.delete(
        `https://thrivers-assignment-server.onrender.com/InternOpeningsRouter/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("InternShip deleted successfully");
      } else {
        alert("InternShip deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deleteInternShip(id);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"All InternShips"} />
      <section className="section dashboard">
        <div className="row">
          {InternShip?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">OpeningDetails</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {InternShip?.map((singleInternShip, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {singleInternShip?.title}{" "}
                        {/* {singleInternShip?.OpeningDetails} */}
                      </td>
                      {singleInternShip?.OpeningDetails && (
                        <td className="overflowY-auto">
                          {singleInternShip?.OpeningDetails}{" "}
                        </td>
                      )}
                      {!singleInternShip?.OpeningDetails && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singleInternShip?._id)}
                      >
                        Details
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => editInternShip(singleInternShip?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() =>
                          handleConfirmDelete(singleInternShip?._id)
                        }
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {InternShip?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No InternShips found
            </div>
          )}
          {singleInternShip.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singleInternShip?.[0]?.Image}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h3>{singleInternShip[0]?.title} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Details</th>
                          <td>{singleInternShip[0]?.OpeningDetails}</td>
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

export default AllInternShip;
