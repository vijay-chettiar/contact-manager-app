import React, { useState, useRef } from "react";
import { parse } from "papaparse";
import "./Main.css";
import Delete from "../assets/Main/delete.png";
import edit from "../assets/Main/edit.png";
import updown from "../assets/Main/updown.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faAngleDown,
    faArrowUpFromBracket,
    faTrashCan,
    faCheck,
    faFile,
} from "@fortawesome/free-solid-svg-icons";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import ReactPaginate from "react-paginate"; // export pagination inbuild module
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

const Main = ({ contactData, setContactData, searchEmail, setSearchEmail }) => {
    const modalRef = useRef();
    const modalRefTwo = useRef();
    const importRef = useRef();
    const importRefComplete = useRef();

    const [importModal, setImportModal] = useState(false);
    const [importModalTwo, setImportModalTwo] = useState(false);
    const [modal, setmodal] = useState(false);
    const [modalTwo, setmodalTwo] = useState(false);
    const [data, setdata] = useState([]);

    const handleContactData = async (list) => {
        fetch("http://localhost:8080/contact/addcontacts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(list),
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
            })
            .catch((err) => console.log(err));
    };

    const handleModal = () => {
        setmodal(!modal);
    };
    const handleInputModal = () => {
        setImportModal(!importModal);
    };

    window.onclick = (e) => {
        if (e.target === modalRef.current) {
            setmodal(false);
        }
        if (e.target === modalRefTwo.current) {
            setmodalTwo(false);
        }
        if (e.target === importRef.current) {
            setImportModal(false);
        }
        if (e.target === importRefComplete.current) {
            setImportModalTwo(false);
        }
    };

    const inputRef = useRef();
    const handleInput = () => {
        inputRef.current.click();
    };
    const [multipleuser, setmultipleuser] = useState([]); //to select multiple user for delete

    const handleOk = (e) => {
        fetch("http://localhost:8080/contact/delete", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem("token"),
            },
            body: JSON.stringify(multipleuser),
        })
            .then((res) => res.json())
            .then((res) => {
                let parent = document.getElementById("tablebody");
                let inputElements = parent.getElementsByTagName("input")
                Array.from(inputElements).forEach((input) => {
                    input.checked = false;
                })
            })
            .catch((err) => console.log(err));
        setmodal(false);
        setmodalTwo(true);
        setTimeout(() => {
            setmodalTwo(false);
        }, 1000);
    };

    //coloredtoolpit
    const [PageNumber, SetPageNumber] = useState(0);
    //pagination for toolpit

    const UsersPerPage = 12;
    const PagesVisited = PageNumber * UsersPerPage;
    const pageCount = Math.ceil(contactData.length / UsersPerPage);

    const changepage = ({ selected }) => {
        SetPageNumber(selected);
    };

    if (contactData.length > 0) {
        var DisplayUsers = contactData
            .filter((serachid) => {
                // filter with searchdata
                if (searchEmail === "") {
                    return serachid;
                } else if (
                    serachid.email.toLowerCase().includes(searchEmail.toLowerCase())
                ) {
                    return serachid;
                }
                // return serachid
            }) //display users per page
            .map((userinfo, key) => {
                return (
                    <tr key={key} className={key % 2 === 0 ? "lighttheme" : "darktheme"}>
                        <td>
                            <input
                                type="checkbox"
                                onClick={(e) => {
                                    hanldecheckbox(e, userinfo._id);
                                }}
                            />
                        </td>
                        <td> {userinfo.name}</td>
                        <td> {userinfo.designation}</td>
                        <td> {userinfo.company}</td>
                        <td className="userinfo"> {userinfo.industry}</td>

                        {userinfo.email.length > 20 ? (
                            <Tippy
                                placement="bottom-start"
                                arrow={true}
                                content={
                                    <p style={{ position: "relative" }} className={"displaytootip"}>
                                        {userinfo.email}
                                    </p>
                                }
                            >
                                <td style={{ cursor: "pointer" }}>
                                    {userinfo.email.slice(0, 20) + "..."}{" "}
                                </td>
                            </Tippy>
                        ) : (
                            <td>{userinfo.email}</td>
                        )}

                        <td> {userinfo.phoneNumber}</td>
                        <td> {userinfo.country}</td>
                        <td>
                            <div className="action-btns">
                                <img src={edit} alt="edit" />
                                <img src={Delete} alt="delete" />
                            </div>
                        </td>
                    </tr>
                );
            })
            .slice(PagesVisited, PagesVisited + UsersPerPage);
    } else {
        DisplayUsers = ''
    }

    const checkexisting = (usermailid) => {
        let value = false;
        let index = null;
        for (let i = 0; i < multipleuser.length; i++) {
            if (multipleuser[i] === usermailid) {
                value = true;
                index = i;
                break;
            }
        }
        return [value, index];
    };

    const hanldecheckbox = (e, usermailid) => {
        let [retrurnexistingvalue, index] = checkexisting(usermailid);
        if (retrurnexistingvalue) {
            multipleuser.splice(index, 1);
        } else {
            multipleuser.push(usermailid);
            setmultipleuser([...multipleuser]);
        }
    };

    const handleSelectAll = (e, id1) => {
        const arr = contactData.map((id) => {
            return id._id;
        });
        setmultipleuser(arr);
        let parent = document.getElementById(id1);
        let inputElements = parent.getElementsByTagName("input")
        Array.from(inputElements).forEach((input) => {
            if (e.target.checked) {
                input.checked = true;
            } else {
                input.checked = false;
                setmultipleuser([])
            }
        })
    }

    return (
        <>
            {/* jsx for contact table */}
            <div className="content-section">
                <div className="navbar">
                    <div className="leftside">
                        <div className="leftsideBtn">
                            <button className="leftBtn leftnavbtn">
                                <div className="nav-btn">
                                    <div>
                                        <CalendarMonthOutlinedIcon />
                                    </div>
                                    <div className="fontSize">Select Date</div>
                                    <div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                </div>
                            </button>
                        </div>
                        <div className="leftsideBtn">
                            <button className="leftBtn leftnavbtn">
                                <div className="nav-btn">
                                    <div>
                                        <FilterListOutlinedIcon />
                                    </div>
                                    <div className="fontSize">Filters</div>
                                    <div>
                                        <FontAwesomeIcon icon={faAngleDown} />
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="rightside">
                        <div className="rightsideBtn">
                            <button className="rightBtn rightnavbtn" onClick={handleModal}>
                                <div className="nav-btn">
                                    <div>
                                        <DeleteOutlineIcon />
                                    </div>
                                    <div className="fontSize">Delete</div>
                                </div>
                            </button>

                            {/* Delete UI */}
                            <div
                                id="myModal"
                                className="modal-del"
                                style={
                                    modal === true ? { display: "flex" } : { display: "none" }
                                }
                                ref={modalRef}
                            >
                                <div className="modal-content-del">
                                    <div className="modal-body-del">
                                        <div className="delete">
                                            <div className="docdiv-del">
                                                <div className="doc-icon-del">
                                                    <div className="delete-icon">
                                                        <FontAwesomeIcon
                                                            className="fonticon-del"
                                                            icon={faTrashCan}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="deleteHead">
                                                <h3 className="header-del">Delete Contacts</h3>
                                            </div>
                                            <div className="deleteMsg">
                                                Sure you want to delete this Contacts?
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer-del">
                                        <button
                                            className="deleteCancel"
                                            onClick={() => {
                                                setmodal(false);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                        <h2 className="deleteOk" onClick={handleOk}>
                                            Ok
                                        </h2>
                                    </div>
                                </div>
                            </div>

                            <div
                                id="myModal"
                                className="modal-del"
                                style={
                                    modalTwo === true ? { display: "flex" } : { display: "none" }
                                }
                                ref={modalRefTwo}
                            >
                                <div className="modal-content-del">
                                    <div className="modal-body-del-complete">
                                        <div className="delete">
                                            <div className="docdiv-del">
                                                <div className="doc-icon-del">
                                                    <div className="delete-icon">
                                                        <FontAwesomeIcon
                                                            className="fonticon-del"
                                                            icon={faCheck}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="deleteHeadComplete">
                                                <h3 className="header-del">Deleted Contacts</h3>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="rightsideBtn">
                            <button
                                className="rightBtn rightnavbtn"
                                onClick={handleInputModal}
                            >
                                <div className="nav-btn">
                                    <div>
                                        <ImportExportIcon />
                                    </div>
                                    <div className="fontSize">Import</div>
                                </div>
                            </button>

                            {/* Import UI */}
                            <div
                                id="myImportModal"
                                className="modal"
                                style={
                                    importModal === true
                                        ? { display: "flex" }
                                        : { display: "none" }
                                }
                                ref={importRef}
                            >
                                <div className="modal-content-imp">
                                    <div className="modal-body">
                                        <div className="import">
                                            <div className="docdiv">
                                                <div className="doc-icon">
                                                    <input
                                                        style={{ display: "none" }}
                                                        type="file"
                                                        ref={inputRef}
                                                    />
                                                    <div className="upload">
                                                        <FontAwesomeIcon
                                                            className="fonticon"
                                                            icon={faFile}
                                                            onClick={handleInput}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="importHead">
                                                <h3 className="header">Import File</h3>
                                            </div>
                                            <div
                                                className="drag-drop"
                                                onDragOver={(e) => {
                                                    e.preventDefault();
                                                }}
                                                onDrop={(e) => {
                                                    e.preventDefault();
                                                    console.log(e.dataTransfer.files);
                                                    Array.from(e.dataTransfer.files).map(async (file) => {
                                                        let text = await file.text();
                                                        let result = parse(text, { header: true });
                                                        if (
                                                            result.data[result.data.length - 1].name === ""
                                                        ) {
                                                            result.data.pop();
                                                        }
                                                        setContactData(result.data);
                                                        setdata(result.data);
                                                        setImportModal(false);
                                                        setImportModalTwo(true);
                                                        handleContactData(result.data);
                                                        setTimeout(() => {
                                                            setImportModalTwo(false);
                                                        }, 2000);
                                                    });
                                                }}
                                            >
                                                <span>Drag and drop CSV file to</span> Upload
                                            </div>
                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="importCancel"
                                            onClick={() => {
                                                setImportModal(false);
                                            }}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {data.length > 0 ? (
                                <div
                                    id="myImportModal"
                                    className="modal"
                                    style={
                                        importModalTwo === true
                                            ? { display: "flex" }
                                            : { display: "none" }
                                    }
                                    ref={importRefComplete}
                                >
                                    <div className="modal-content-imp">
                                        <div className="modal-body-complete">
                                            <div className="import">
                                                <div className="docdiv">
                                                    <div className="doc-icon">
                                                        <div className="upload">
                                                            <FontAwesomeIcon
                                                                className="fonticon"
                                                                icon={faCheck}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="importHead">
                                                    <h3 className="header">Import Complete</h3>
                                                </div>
                                                <div className="drag-drop">CSV File is uploaded</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div className="rightsideBtn">
                            <button className="rightBtn rightnavbtn">
                                <div className="nav-btn">
                                    <div>
                                        <FontAwesomeIcon icon={faArrowUpFromBracket} />
                                    </div>
                                    <div className="fontSize">Export</div>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                {contactData && contactData.length > 0 ? (
                    <table>
                        <tbody id="tablebody">
                            <tr
                                className="tableheading"
                                style={{ backgroundColor: "#B2DFFF", height: "50px" }}
                            >
                                <th>
                                    <input type="checkbox" onChange={(e) => { handleSelectAll(e, "tablebody") }} />
                                </th>
                                <th> Name</th>
                                <th>
                                    <div className="updowndiv">
                                        | Designation
                                        <img src={updown} alt="updown" />
                                    </div>
                                </th>
                                <th>
                                    <div className="updowndiv">
                                        | Company
                                        <img src={updown} alt="updown" />
                                    </div>
                                </th>
                                <th>
                                    <div className="updowndiv">
                                        | Industry
                                        <img src={updown} alt="updown" />
                                    </div>
                                </th>
                                <th>| Email</th>
                                <th>| Phone Number</th>
                                <th>| Country</th>
                                <th>| Action</th>
                            </tr>
                            {DisplayUsers}
                        </tbody>
                    </table>
                ) : (
                    ""
                )}
            </div>
            <ReactPaginate //pagination inbuilt module
                previousLabel={"<"}
                nextLabel={">"}
                pageCount={pageCount}
                onPageChange={changepage}
                containerClassName={"paginationbutton"}
                previousLinkClassName={"previousbutton"}
                nextLinkClassName={"nextbutton"}
                disabledClassName={"paginationDisabled"}
                activeClassName={"paginationActive"}
            />
        </>
    );
};

export default Main;
