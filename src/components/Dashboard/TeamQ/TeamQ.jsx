import { Routes, Route } from "react-router-dom";
// import AddInternShip from "./Add InternShip/AddInternShip";
import AddTeam from "./Add TeamQ/AddTeamQ";
import AllQuery from "./All Query/AllQuery";
import AllTeam from "./All TeamMembers/AllTeam";
import EditTeam from "./EditeTeam/EditTeam";
// import AllInternShip from "./All InternShip/AllInternShip";
// import EditInternShip from "./Edit InternShip/EditInternShip";
const TeamQ = () => {
  return (
    <Routes>
      <Route path="/add-TeamQ" element={<AddTeam />} />
      <Route path="/all-TeamQ" element={<AllTeam />} />
      <Route path="/all-Query" element={<AllQuery />} />

      <Route path="/update-Team/:id" element={<EditTeam />}></Route>
    </Routes>
  );
};

export default TeamQ;
