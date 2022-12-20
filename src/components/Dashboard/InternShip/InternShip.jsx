import { Routes, Route } from "react-router-dom";
import AddInternShip from "./Add InternShip/AddInternShip";
import AllApplication from "./All Applications/AllApplications";
import AllInternShip from "./All InternShip/AllInternShip";
import EditInternShip from "./Edit InternShip/EditInternShip";
const InternShip = () => {
  return (
    <Routes>
      <Route path="/add-InternShip" element={<AddInternShip />} />
      <Route path="/all-InternShips" element={<AllInternShip />} />
      <Route path="/all-Internship-Application" element={<AllApplication />} />
      <Route path="/update-InternShip/:id" element={<EditInternShip />}></Route>
    </Routes>
  );
};

export default InternShip;
