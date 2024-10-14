// src/file/Dashboard.jsx
import {React} from 'react';
import { Link } from 'react-router-dom';

const Dashboardc = () => {
    return (
        <div>
            <h2>Choose a Feature</h2>
            <ul>
                <li>
                    <Link to="/createrepo">
                        <button>Create repo</button>
                    </Link>
                </li>
                {/* <li>
                    <Link to="/compression">
                        <button>Compress PDFs</button>
                    </Link>
                </li> */}

                <li>
                    <Link to="/clonerepo">
                        <button>Clone repo</button>
                    </Link>
                </li>
                <li>
                    <Link to="/deleterepo">
                        <button>Delete repo</button>
                    </Link>
                </li>

                <li>
                    <Link to="/trackrepo">
                        <button>Trackrepo </button>
                    </Link>
                </li>
                <li>
                    <Link to="/commitfile">
                        <button>Commit file</button>
                    </Link>
                </li>
                <li>
                    <Link to="/createbranch">
                        <button>Create branch</button>
                    </Link>
                </li>
                <li>
                    <Link to="/changebranch">
                        <button>Change branch</button>
                    </Link>
                </li>

                <li>
                    <Link to="/deletebranch">
                        <button>Delete branch</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Dashboardc;
