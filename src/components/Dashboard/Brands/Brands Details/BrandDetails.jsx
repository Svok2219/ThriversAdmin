import React, { useEffect, useState } from "react";
import PageTitle from "../../../PageTitle/PageTitle";
import axios from "axios";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useParams } from "react-router-dom";
const BrandsDetails = () => {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [Brands, setBrands] = useState();
  const getBrandsdetails = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/Brands/get-Brands/${id}`)
      .then((res) => {
        setBrands(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getBrandsdetails();
  }, []);

  function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
  }
  const showFullPrice = () => {
    return (
      Number(
        dateDiffInDays(new Date(Brands?.startDate), new Date(Brands?.endDate))
      ) * Brands?.Brands_price || "0"
    );
  };
  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
        }}
        id="main"
        className="main"
      >
        <CircularProgress />
      </Box>
    );
  }
  return (
    <div id="main" className="main">
      <PageTitle name={"Brands Details"} />
      <Card className="px-3">
        <Box component="section">
          <Container maxWidth="xl" sx={{ py: 6 }}>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: "space-between" }}
            >
              <Grid item xs={12} md={4}>
                <Box
                  alt="Brandsimagee"
                  component="img"
                  src={Brands?.BrandsPic}
                  sx={{
                    borderRadius: 4,
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <Typography sx={{ mb: 2 }} variant="h4">
                  {Brands?.BrandsName}
                </Typography>

                <Box
                  key={Brands?.BrandsName}
                  sx={{ display: "flex", flexDirection: "row", mb: 2 }}
                >
                  <Box>
                    <table className="table table-responsive">
                      <tbody>
                        <tr>
                          <th>Brands Name</th>
                          <td>{Brands?.BrandsName}</td>
                        </tr>
                        <tr>
                          <th>Brands Location</th>
                          <td>{Brands?.BrandsLocation}</td>
                        </tr>
                        <tr>
                          <th>Brands City</th>
                          <td>{Brands?.Brands_city}</td>
                        </tr>
                        <tr>
                          <th>
                            Price{" "}
                            <small className="text-success"> Of a day</small>
                          </th>
                          <td>{Brands?.Brands_price} Rs</td>
                        </tr>
                        <tr>
                          <th>Duration</th>
                          <td>
                            {Brands?.startDate} to {Brands?.endDate}
                          </td>
                        </tr>
                        <tr>
                          <th>Car</th>
                          <td>
                            {Brands?.car?.carBrand?.name} {Brands?.car?.carName}
                          </td>
                        </tr>
                        <tr>
                          <th>Car Number</th>
                          <td>{Brands?.car?.carNumber}</td>
                        </tr>
                      </tbody>
                    </table>
                  </Box>
                </Box>
              </Grid>
            </Grid>
            <div className="col-12">
              <h3>Description</h3>
              <div
                dangerouslySetInnerHTML={{ __html: Brands?.packageDes }}
              ></div>
            </div>
          </Container>
        </Box>
      </Card>
    </div>
  );
};

export default BrandsDetails;
