// src/file/Dashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    return (
        <div>
            <h2>Choose a Feature</h2>
            <ul>
                <li>
                    <Link to="/annotate">
                        <button>Annotate PDF</button>
                    </Link>
                </li>
                {/* <li>
                    <Link to="/compression">
                        <button>Compress PDFs</button>
                    </Link>
                </li> */}

                <li>
                    <Link to="/todocx">
                        <button>Convert to docx PDFs</button>
                    </Link>
                </li>
                <li>
                    <Link to="/encryption">
                        <button>Convert to Encrypted</button>
                    </Link>
                </li>
                <li>
                    <Link to="/erase">
                        <button>Convert to erase</button>
                    </Link>
                </li>

                <li>
                    <Link to="/mergepdf">
                        <button>Merge PDFs</button>
                    </Link>
                </li>
                <li>
                    <Link to="/redaction">
                        <button>Redaction PDFs</button>
                    </Link>
                </li>
                <li>
                    <Link to="/reorder">
                        <button>Reorder PDFs</button>
                    </Link>
                </li>
                <li>
                    <Link to="/rewrite">
                        <button>Rewrite PDFs</button>
                    </Link>
                </li>
                <li>
                    <Link to="/splitpdf">
                        <button>Split PDF</button>
                    </Link>
                </li>
            </ul>
        </div>
    );
};

export default Dashboard;
