import { useRef, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

import axios from "axios";
import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AddTeam = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validateMessage, setValidateMessage] = useState("");

  const toggleSuccess = () => {
    setSuccess(false);
  };
  const toggleError = () => {
    setError(false);
  };

  const ImagetoBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const formEl = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("logloglaog");
    await axios
      .post(`https://thrivers-assignment-server.onrender.com/TeamRouter`, {
        TeamName: formEl.current.elements[0].value,
        TeamPosition: formEl.current.elements[1].value,
        TeamImage: formEl.current.elements[2].value,
        LinkedIN: formEl.current.elements[3].value,
      })
      .then((res) => {
        if (res.status === 200) {
          setSuccess(true);
          setSuccessMessage(res.data.message);
        } else {
          setError(true);
          setErrorMessage(res.data.message);
        }
      })
      .catch((err) => {
        if (err.response?.status == 302) {
          setErrorMessage("InternShip with this email already exists");
        } else if (err.response?.status == 500) {
          setErrorMessage("Form submission failed, try again later!");
          console.log(err);
        } else {
          setErrorMessage("Form submission failed, try again later!");
          console.log(err);
        }
        setSuccess(false);
        setError(true);
      });
  };

  const theme = createTheme({
    palette: {
      neutral: {
        main: "#64748B",
        contrastText: "#fff",
      },
    },
  });

  // if (gender !== "") {

  // }
  return (
    <ThemeProvider theme={theme}>
      <main id="main" className="main">
        <PageTitle name={"Add Team"} />
        <section className="section dashboard">
          <div className="row justify-content-center">
            <div className="col-lg-8 col-md-6 d-flex flex-column align-items-center justify-content-center">
              <div className="card mb-3">
                <div className="card-body">
                  {success && (
                    <div className="pt-4 pb-2">
                      <div
                        className="alert alert-primary alert-dismissible fade show"
                        role="alert"
                      >
                        {successMessage}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                          onClick={toggleSuccess}
                        ></button>
                      </div>
                    </div>
                  )}

                  {error && (
                    <div className="pt-4 pb-2">
                      <div
                        className="alert alert-danger alert-dismissible fade show"
                        role="alert"
                      >
                        {errorMessage}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                          onClick={toggleError}
                        ></button>
                      </div>
                    </div>
                  )}
                  <div className="pt-4 pb-2">
                    <h5 className="card-title text-center pb-0 fs-4">
                      Add Team
                    </h5>
                    <p className="text-center small">
                      Enter details of new Team
                    </p>
                  </div>

                  <form
                    ref={formEl}
                    onSubmit={handleSubmit}
                    className="row g-3 needs-validation "
                    novalidate
                  >
                    <div className="col-md-4 position-relative">
                      <label for="validationTooltip02" className="form-label">
                        Name od the Member
                      </label>
                      <input
                        type="text"
                        name="Project Title"
                        className="form-control"
                        id="validationTooltip02"
                        placeholder=""
                        required
                      />
                      <div className="valid-tooltip">Looks good!</div>
                    </div>
                    <div className="col-md-8 position-relative">
                      <label for="validationTooltip2" className="form-label">
                        Position
                      </label>
                      <input
                        type="text"
                        name="Image"
                        className="form-control"
                        id="validationTooltip02"
                        // placeholder="https://sfdfdfsdfsfsd.com"
                        required
                      />
                      <div className="valid-tooltip">Looks good!</div>
                    </div>
                    <div className="col-md-6 position-relative">
                      <label for="validationTooltip3" className="form-label">
                        Member's Image{" "}
                      </label>
                      <input
                        type="text"
                        name="priceDetail"
                        className="form-control"
                        id="validationTooltip03"
                        required
                      />
                      <div className="invalid-tooltip">
                        Enter the Image url.
                      </div>
                    </div>
                    <div className="col-md-6 position-relative">
                      <label for="validationTooltip3" className="form-label">
                        LinkedIN url{" "}
                      </label>
                      <input
                        type="text"
                        name="priceDetail"
                        className="form-control"
                        id="validationTooltip03"
                        required
                      />
                      <div className="invalid-tooltip">Enter Linkedin url.</div>
                    </div>
                    {/* <div className="col-md-6 position-relative">
                      <label for="validationTooltip04" className="form-label">
                        Description
                      </label>
                      <textarea
                        type="text"
                        name="Description"
                        className="form-control"
                        id="validationTooltip04"
                        required
                      />
                      <div className="invalid-tooltip">
                        Please provide a Description .
                      </div>
                    </div>
                    <div className="col-md-6 position-relative">
                      <label for="validationTooltip05" className="form-label">
                        Enter the due Deadline
                      </label>
                      <input
                        type="text"
                        name="Deadline"
                        className="form-control"
                        id="validationTooltip05"
                        required
                      />
                      <div className="invalid-tooltip">
                        Enter the due Deadline
                      </div>
                    </div>
                    <div className="col-md-6 ">
                      <label for="validationTooltip03" className="form-label">
                        SRS
                      </label>
                      <input
                        type="text"
                        name="SRS"
                        placeholder="Provide us a SRS link"
                        className="form-control"
                        id="validationTooltip03"
                        required
                      />
                      <div className="invalid-tooltip">
                        Provide us a SRS link
                      </div>
                    </div> */}
                    <Button
                      type="submit"
                      Button
                      color="neutral"
                      variant="outlined"
                      className="mt-5"
                    >
                      SUBMIT
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </ThemeProvider>
  );
};

export default AddTeam;
