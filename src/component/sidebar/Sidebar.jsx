import React, { useEffect, useState } from "react";
import "./sidebar.css";
import ButtonComponent from "./ButtonComponent";
import { data } from "./data";
import DraggableModal from "../popup/DraggableModal";

const Sidebar = (props) => {
  const [links, setLinks] = useState([]);
  const [modalData,setModalData] = useState({});
  const [reportFlag, setReportFlag] = useState("Reports");

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = (e,obj) => {
    e.preventDefault();
    setModalOpen(true);
    setModalData(obj)
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    reportFlag === "Reports" ? setLinks(data.quicklink_report) : setLinks(data.quicklink_keys)
  }, [reportFlag]);


  return (
    <div className="sidebarDiv">
      <div>
        <DraggableModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          title={modalData.link_name}
        >
          {/* <span>{modalData.link_name}</span> */}
          {reportFlag === "Reports" && 
          <div className="mb-1">
            <span className="border-right pe-1">ID:{modalData.id}</span>
            <span className="ps-1">Report Type:{modalData.report_type}</span>
          </div>
          }
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi
            corrupti dicta ea officia ex ipsum, tempore eos nisi nesciunt quam
            cum obcaecati velit officiis repellendus, temporibus, dolore
            consequuntur illo odit! Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Similique perferendis unde mollitia voluptatibus
            possimus culpa illo quidem voluptatem accusantium at nemo facilis
            dolorum officiis aliquam repellat ipsum ut, sint expedita! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Ipsum maiores
            nisi soluta veritatis eum delectus voluptate excepturi nemo, ut
            nostrum voluptatibus praesentium quas explicabo ipsam tempora dolore
            temporibus quod aut?Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Minus excepturi esse accusamus, mollitia
            consequuntur cupiditate rerum hic nisi magni debitis. Molestiae
            deleniti sapiente blanditiis ab voluptates nostrum illo veritatis
            provident. Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Perspiciatis mollitia recusandae amet placeat adipisci nesciunt
            corporis, maiores cumque quae. Delectus facere possimus nobis nam
            dolorum aliquid ut vitae voluptatibus aspernatur.
          </p>
        </DraggableModal>
      </div>
      <div
        className={
          props.show === true
            ? "container-fluid bg-color show-list transition"
            : "container-fluid bg-color hide-list transition"
        }
        id="sidebar"
      >
        <div className="d-flex justify-content-between pt-4">
          <div className="float-start align-self-end">
            <p className="quickAccessTitle">
              <b>Quick Links</b>
            </p>
          </div>
          <div className="float-end align-self-end">
            <ButtonComponent
              name="Reports"
              reportFlag={reportFlag}
              onClickAction={() => setReportFlag("Reports")}
              className={
                reportFlag === "Reports"
                  ? "btn btn-dark btn-sm m-2 button"
                  : "btn btn-secondary btn-sm m-2 button"
              }
            />
            <ButtonComponent
              name="Key Links"
              reportFlag={reportFlag}
              onClickAction={() => setReportFlag("Key Links")}
              disable_btn={reportFlag === "Reports" && true}
              className={
                reportFlag !== "Reports"
                  ? "btn btn-dark btn-sm m-2 button"
                  : "btn btn-secondary btn-sm m-2 button"
              }
            />
          </div>
        </div>
        <div className="row">
          <div className="col-10">
            <ul>
              {links &&
                links.map((link) => {
                  return (
                    <li
                      key={link.id}
                      className={
                        reportFlag === "Reports"
                          ? "mb-3"
                          : "mb-3 d-flex justify-content-between"
                      }
                    >
                      <a
                        href=""
                        onClick={(e) => handleOpenModal(e, link)}
                        target="_blank"
                      >
                        {link.link_name}
                      </a>
                      {reportFlag === "Reports" ? (
                        <div>
                          <span className="border-right pe-1">
                            ID:{link.id}
                          </span>
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
    </div>
  );
};
export default Sidebar;
