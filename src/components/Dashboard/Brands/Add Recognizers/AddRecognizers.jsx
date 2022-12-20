import { useRef, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import { useForm } from "react-hook-form";
import axios from "axios";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

import { Button } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const AddRecognizers = () => {
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

  const formElRecognize = useRef();
  const HandleSubmit = async (e) => {
    e.preventDefault();
    console.log("logloglaog");
    await axios
      .post(
        `https://thrivers-assignment-server.onrender.com/RecognizedRouter`,
        {
          RecognizersTitle: formElRecognize.current.elements[0].value,
          RecognizersImage: formElRecognize.current.elements[1].value,
          RecognizersName: formElRecognize.current.elements[2].value,
          RecognizersLink: formElRecognize.current.elements[3].value,
        }
      )
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

  return (
    <ThemeProvider theme={theme}>
      <main id="main" className="main">
        <PageTitle name={"Add Brands"} />

        <section className="section dashboard my-3">
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
                      Add Recognizer
                    </h5>
                    <p className="text-center small">
                      Enter details of new Recognizer
                    </p>
                  </div>

                  <form
                    ref={formElRecognize}
                    onSubmit={HandleSubmit}
                    className="row g-3 needs-validation "
                    novalidate
                  >
                    <div className="col-md-4 position-relative">
                      <label for="validationTooltip02" className="form-label">
                        Title/role of the Brand
                      </label>
                      <input
                        type="text"
                        name="Title"
                        className="form-control"
                        id="validationTooltip02"
                        placeholder=""
                        required
                      />
                      <div className="valid-tooltip">Looks good!</div>
                    </div>
                    <div className="col-md-8 position-relative">
                      <label for="validationTooltip2" className="form-label">
                        Image
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
                        Brand's Name
                      </label>
                      <input
                        type="text"
                        name="priceDetail"
                        className="form-control"
                        id="validationTooltip03"
                        required
                      />
                      <div className="invalid-tooltip">
                        Enter the Brand's Name.
                      </div>
                    </div>
                    <div className="col-md-6 position-relative">
                      <label for="validationTooltip3" className="form-label">
                        Brand's Website
                      </label>
                      <input
                        type="text"
                        name="Brand_Website"
                        className="form-control"
                        id="validationTooltip03"
                        required
                      />
                      <div className="invalid-tooltip">
                        Enter the Brand's website url.
                      </div>
                    </div>

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

export default AddRecognizers;
