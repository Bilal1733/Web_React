import React, { useEffect, useState } from "react";
import "./sidebar.css";
import ButtonComponent from "./ButtonComponent";
import { data } from "./data";

const Sidebar = () => {
  const [links, setLinks] = useState([]);
  const [reportFlag, setReportFlag] = useState("Reports");
  console.log("reportFlag", reportFlag);
  useEffect(() => {
    reportFlag == " Reports"
      ? setLinks(data.quicklink_report)
      : setLinks(data.quicklink_keys);
  }, [reportFlag]);

  console.log(links);

  return (
    <div className=" bg-color">
      <div className="row mt-4">
        <div className="col-8">
          <p className="quickAccessTitle">
            <b>Quick Links</b>
          </p>
        </div>
        <div className="col-2">
          <ButtonComponent
            name="Reports"
            onClickAction={() => setReportFlag("Reports")}
          />
        </div>
        <div className="col-2">
          <ButtonComponent
            name="Key Links"
            onClickAction={() => setReportFlag("Key Links")}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-10">
          <ul>
            {links &&
              links.map((link) => {
                return (
                  <li key={link.id} className="mb-2">
                    <a href="">{link.link_name}</a>
                    {reportFlag === "Reports" ? (
                      <div>
                        <span className="border-right pe-1">ID:{link.id}</span>
                        <span className="ps-1">
                          Report Type:{link.report_type}
                        </span>
                      </div>
                    ) : (
                        <span className="ps-1">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="13"
                            height="13"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            class="feather feather-external-link"
                          >
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                          </svg>
                        </span>
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};
export default Sidebar;
