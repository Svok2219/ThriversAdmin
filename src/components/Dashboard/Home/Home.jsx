import PageTitle from "../../PageTitle/PageTitle";

import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
const Home = () => {
  return (
    <main id="main" className="main">
      <PageTitle name={"Dashboard"} />
      <section className="section dashboard">
        <div className="row text-center d-flex justify-content-center align-items-center">
          <h1>!!! Wellcome Admin !!!</h1>
        </div>
      </section>
    </main>
  );
};

export default Home;
