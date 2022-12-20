import { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const AllMentorship = () => {
  const [Mentorship, setMentorship] = useState(null);
  const navigate = useNavigate();
  const [update, setUpdate] = useState(false);
  const [singleMentorship, setSingleMentorship] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    getMentorship();
  }, [update]);

  // Function to get all Mentorships

  const getMentorship = () => {
    setLoading(true);
    axios
      .get(
        `https://thrivers-assignment-server.onrender.com/MentorshipRouter/getAllMentorshipProgram`
      )
      .then((res) => {
        setMentorship(res.data.content);
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
    let tempIntern = [...Mentorship];
    let d = tempIntern.filter((Intern) => Intern?._id == id);
    console.log("fff", d);
    setSingleMentorship(d);
    console.log("singleMentorship", singleMentorship);
  }
  function editMentorship(id) {
    navigate(`/dashboard/Mentorship/update-Mentorship/${id}`);
  }
  async function deleteMentorship(id) {
    try {
      const rawData = await axios.delete(
        `https://thrivers-assignment-server.onrender.com/MentorshipRouter/${id}`
      );
      if (rawData.status == 200) {
        setUpdate(!update);
        alert("Mentorship deleted successfully");
      } else {
        alert("Mentorship deletion failed");
      }
    } catch (err) {}
  }

  const handleConfirmDelete = (id) => {
    const text = "Are you Sure to Delete";
    if (confirm(text) == true) {
      deleteMentorship(id);
    }
  };
  return (
    <main id="main" className="main">
      <PageTitle name={"All Mentorships"} />
      <section className="section dashboard">
        <div className="row">
          {Mentorship?.length > 0 && (
            <div className="col-lg-8">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price Detail</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Mentorship?.map((singleMentorship, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>
                        {singleMentorship?.title}{" "}
                        {/* {singleMentorship?.PriceDetail} */}
                      </td>
                      {singleMentorship?.PriceDetail && (
                        <td className="overflowY-auto">
                          {singleMentorship?.PriceDetail}{" "}
                        </td>
                      )}
                      {!singleMentorship?.PriceDetail && <td>--</td>}
                      <button
                        className="btn"
                        type="button"
                        onClick={() => showDetails(singleMentorship?._id)}
                      >
                        Details
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() => editMentorship(singleMentorship?._id)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn"
                        type="button"
                        onClick={() =>
                          handleConfirmDelete(singleMentorship?._id)
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
          {Mentorship?.length == 0 && (
            <div class="alert alert-primary" role="alert">
              No Mentorships found
            </div>
          )}
          {singleMentorship.length > 0 && (
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img
                    style={{ width: `200px`, height: `200px` }}
                    src={singleMentorship?.[0]?.Image}
                    alt="Profile"
                    className="rounded-circle"
                  />
                  <h3 className="text-center">{singleMentorship[0]?.title} </h3>
                  <div className="col-12">
                    <table className="table table-sm">
                      <tbody>
                        <tr>
                          <th scope="row">Details</th>
                          <td>{singleMentorship[0]?.PriceDetail}</td>
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

export default AllMentorship;
