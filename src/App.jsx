// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AnnotationForm from "./file/Annotation.jsx";
import Compression from "./file/Compression.jsx";
import Dashboard from "./Dahboard.jsx";
import Convert from "./file/Convert.jsx";
import Encryption from "./file/Encryption.jsx";
import Erase from "./file/Erase.jsx";
import Mergepdf from "./file/merge.jsx";
import Redaction from "./file/Redaction.jsx";
import Reorder  from "./file/reorder.jsx";
import Rewrite from "./file/rewrite.jsx";
import Split from "./file/split.jsx";


import Dashboardc from "./1.clone/Dashboard.jsx";
import Createrepo from "./1.clone/1.repository/Createrepo.jsx";
import Clonerepo from "./1.clone/1.repository/clonerepo.jsx";
import Deleterepo from "./1.clone/1.repository/Deleterepo.jsx";
import Trackchanges from "./1.clone/2.version-control/track-changes.jsx";
import Commit  from "./1.clone/2.version-control/commit.jsx";
import Createbranch  from "./1.clone/3.branch/createbranch.jsx";
import  Changebranch from "./1.clone/3.branch/Changebranch.jsx";
import  Deletebranch from "./1.clone/3.branch/deletebranch.jsx";





const App = () => {
  return (
    <Router>
      <div>
        <h1>PDF Management System</h1>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/annotate" element={<AnnotationForm />} />
          <Route path="/compress" element={<Compression />} />
          <Route path="/todocx" element={<Convert />} />
          <Route path="/encryption" element={<Encryption />} />
          <Route path="/erase" element={<Erase />} />
          <Route path="/mergepdf" element={<Mergepdf />} />
          <Route path="/redaction" element={<Redaction />} />
          <Route path="/reorder" element={<Reorder />} />
          <Route path="/rewrite" element={<Rewrite/>} />
          <Route path="/splitpdf" element={<Split/>} />


          <Route path="/clone" element={<Dashboardc />} />
          <Route path="/createrepo" element={<Createrepo />} />
          <Route path="/clonerepo" element={<Clonerepo />} />
          <Route path="/deleterepo" element={<Deleterepo />} />

          <Route path="/trackrepo" element={<Trackchanges />} />
          <Route path="/commitfile" element={<Commit />} />

          <Route path="/createbranch" element={<Createbranch/>} />
          <Route path="/changebranch" element={<Changebranch/>} />
          <Route path="/deletebranch" element={<Deletebranch/>} />



        </Routes>
      </div>
    </Router>
  );
};

export default App;
