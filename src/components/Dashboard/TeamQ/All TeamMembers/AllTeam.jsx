import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllTeam = () => {
  const [Team, setTeam] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleTeam, setSingleTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getTeam();
  }, [update]);

  // Function to get all Teams

  const getTeam = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/TeamRouter/getAllTeam`
      )
      .then((res) => {
        setTeam(res.data.content);
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
    let tempIntern = [...Team];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSingleTeam(d);
    console.log("singleTeam", singleTeam);
  }
  function editTeam(id) {
    navigate(`/dashboard/TeamQ/update-Team/${id}`);
  }
  async function deleteTeam(id) {
    try {
      const rawData = await axios.delete(
        `https://thrivers-assignment-server.onrender.com/TeamRouter/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("TeamMeMber deleted successfully");
      } else {
        alert("TeamMember deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deleteTeam(id);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"All Teams"} />
      <section className="section dashboard">
        <div className="row">
          {Team?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Position</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Team?.map((singleTeam, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {singleTeam?.Name} {/* {singleTeam?.Position} */}
                      </td>
                      {singleTeam?.Position && (
                        <td className="overflowY-auto">
                          {singleTeam?.Position}{" "}
                        </td>
                      )}
                      {!singleTeam?.Position && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singleTeam?._id)}
                      >
                        Details
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => editTeam(singleTeam?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => handleConfirmDelete(singleTeam?._id)}
                      >
                        Delete
                      </button>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          {Team?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Teams found
            </div>
          )}
          {singleTeam.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div
                  style={{ overflow: "auto" }}
                  className="card-body profile-card pt-4 d-flex flex-column align-items-center"
                >
                  <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singleTeam?.[0]?.Image}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h3>{singleTeam[0]?.title} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Details</th>
                          <td>{singleTeam[0]?.Position}</td>
                        </tr>
                        <tr>
                          <th scope="row">LinkeddIn</th>
                          <td className="mx-5">
                            <a href={singleTeam[0]?.LinkedIN}>
                              {singleTeam[0]?.LinkedIN}
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

export default AllTeam;
