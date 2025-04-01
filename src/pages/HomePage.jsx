// @ts-nocheck
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const HomePage = () => {
  var date = new Date();

  const navigate = useNavigate();
  const [doneFiled, setDoneFiled] = useState([
    {
      doneFiled: "",
      hours: "",
      ishow: true,
    },
  ]);
  const [inprogressFiled, setInProgressFiled] = useState([
    {
      inprogressFiled: "",
      ishow: true,
    },
  ]);
  const [queryFiled, setQueryFiled] = useState([
    {
      queryFiled: "",
      ishow: true,
    },
  ]);
  const [projectFiledData, setProjectFiledData] = useState([
    {
      projectFiled: "",
      projectDoneField: [
        {
          doneFiled: "",
          hours: "",
          ishow: true,
        },
      ],
      projectInprogressFiled: [
        {
          inprogressFiled: "",
          ishow: true,
        },
      ],
      projectQueryFiled: [
        {
          queryFiled: "",
          ishow: true,
        },
      ],
      ishow: true,
    },
  ]);
  const [mainInputData, setMainInputData] = useState({});
  // projectFiled
  const addInputProjectField = () => {
    let newDoneArray = projectFiledData.map((item) => {
      return {
        projectFiled: item.projectFiled,
        projectDoneField: item.projectDoneField,
        projectInprogressFiled: item.projectInprogressFiled,
        projectQueryFiled: item.projectQueryFiled,
        ishow: false,
      };
    });
    setProjectFiledData([
      ...newDoneArray,
      {
        projectFiled: "",
        projectDoneField: [
          {
            doneFiled: "",
            hours: "",
            ishow: true,
          },
        ],
        projectInprogressFiled: [
          {
            inprogressFiled: "",
            ishow: true,
          },
        ],
        projectQueryFiled: [
          {
            queryFiled: "",
            ishow: true,
          },
        ],
        ishow: true,
      },
    ]);
  };

  const removeProjectFiled = (index) => {
    const rows = [...projectFiledData];
    rows.splice(index, 1);
    rows[rows.length - 1].ishow = true;
    setProjectFiledData(rows);
  };
  const handleProjectChange = (index, evnt) => {
    evnt.preventDefault();
    const { name, value } = evnt.target;
    const list = [...projectFiledData];
    list[index][name] = value;
    setProjectFiledData(list);
  };

  const handleSubInputChange = (mainIndex, childIndex, parentKey, key, e) => {
    setProjectFiledData((prev) => {
      const temp = Array.from(prev);
      if (Array.isArray(temp[mainIndex][parentKey])) {
        temp[mainIndex][parentKey][childIndex][key] = e?.target?.value;
      } /* else {
                temp[mainIndex][parentKey][key] = e?.target?.value;
            } */
      return temp;
    });
  };

  // console.log('projectFiledData', projectFiledData);
  const addSubInputField = (mainIndex, childIndex, parentKey, key, e) => {
    const temp = Array.from(projectFiledData);
    if (Array.isArray(temp[mainIndex][parentKey])) {
      if (temp[mainIndex][parentKey]) {
        temp[mainIndex][parentKey].push({
          [key]: "",
          ishow: true,
        });
      }
    }
    setProjectFiledData(temp);
  };

  const removeSubInputField = (mainIndex, childIndex, parentKey, key, e) => {
    const temp = Array.from(projectFiledData);
    if (Array.isArray(temp[mainIndex][parentKey])) {
      if (temp[mainIndex][parentKey]) {
        console.log("temp[mainIndex][parentKey]", temp[mainIndex][parentKey]);
        temp[mainIndex][parentKey].splice(childIndex, 1);
        temp[mainIndex][parentKey][
          temp[mainIndex][parentKey].length - 1
        ].ishow = true;
      }
    }
    setProjectFiledData(temp);
  };
  // doneFileed
  const addInputField = () => {
    let newDoneArray = doneFiled.map((item) => {
      return {
        ...item,
        ishow: false,
      };
    });
    setDoneFiled([
      ...newDoneArray,
      {
        doneFiled: "",
        hours: "",
        ishow: true,
      },
    ]);
  };

  const removedoneFiled = (index) => {
    const rows = [...doneFiled];
    rows.splice(index, 1);
    rows[rows.length - 1].ishow = true;
    setDoneFiled(rows);
  };
  const handleChange = (index, evnt) => {
    evnt.preventDefault();
    const { name, value } = evnt.target;
    const list = [...doneFiled];
    list[index][name] = value;
    setDoneFiled(list);
  };

  // inprogressFileed
  const addInprogressInputField = () => {
    let newInprogressArray = inprogressFiled.map((item) => {
      return {
        inprogressFiled: item.inprogressFiled,
        ishow: false,
      };
    });
    setInProgressFiled([
      ...newInprogressArray,
      {
        inprogressFiled: "",
        ishow: true,
      },
    ]);
  };

  const removeInprogressFiled = (index) => {
    const rows = [...inprogressFiled];
    rows.splice(index, 1);
    rows[rows.length - 1].ishow = true;
    setInProgressFiled(rows);
  };
  const handleInprogressChange = (index, evnt) => {
    evnt.preventDefault();
    const { name, value } = evnt.target;
    const list = [...inprogressFiled];
    list[index][name] = value;
    setInProgressFiled(list);
  };

  // queryFileed
  const addQueryInputField = () => {
    let newQueryArray = queryFiled.map((item) => {
      return {
        queryFiled: item.queryFiled,
        ishow: false,
      };
    });
    setQueryFiled([
      ...newQueryArray,
      {
        queryFiled: "",
        ishow: true,
      },
    ]);
  };

  const removeQueryFiled = (index) => {
    const rows = [...queryFiled];
    rows.splice(index, 1);
    rows[rows.length - 1].ishow = true;
    setQueryFiled(rows);
  };
  const handleQueryChange = (index, evnt) => {
    evnt.preventDefault();
    const { name, value } = evnt.target;
    const list = [...queryFiled];
    list[index][name] = value;
    setQueryFiled(list);
  };

  // const copyToClipboard = async (id) => {
  //   try {
  //     var range = document.createRange();
  //     range.selectNode(document.getElementById(id));
  //     window.getSelection().removeAllRanges(); // clear current selection
  //     window.getSelection().addRange(range); // to select text
  //     document.execCommand("copy");
  //     window.getSelection().removeAllRanges(); // to deselect
  //     toast("Note's Copied");
  //   } catch (error) {
  //     console.log("error", error);
  //   }
  // };
  const copyToClipboard = async (id) => {
    try {
      var range = document.createRange();
      range.selectNode(document.getElementById(id));
      window.getSelection().removeAllRanges();
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      
      const copiedText = document.getElementById(id).innerText;
      
  
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzYZAX2h2zF7qsLzhI9CLBc0fVyh7n8cX5Y74ccxGSMePRvKzEQ_SDXWHE6SRAomkzcLg/exec",
        {
          method: "POST",
          mode: "no-cors",
          body: JSON.stringify({ copiedText }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
  
      toast("Note's Updated");
      const data = await response.json();
      console.log("Google Sheet Updated:", data);
    } catch (error) {
      console.log("error", error);
    }
  };
  
  
  return (
    <div className="container">
      <div className="d-flex justify-content-between mt-3 mb-3">
        <h4 className="text-center">Update Note's</h4>
        <div className="d-flex gap-2">
          {/* <button
            type="button"
            onClick={() => navigate("/to-do")}
            className="btn btn-primary"
          >
            To-Do
          </button> */}
          <button
            type="button"
            onClick={() => copyToClipboard("div_id")}
            className="btn btn-primary"
          >
            {/* Copy Note's */}
            Update
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-sm-12 col-lg-6 mt-2">
          <form>
            <div className="form-group">
              <label>TL Name:</label>
              <input
                type="text"
                className="form-control"
                id="tlName"
                name="tlName"
                placeholder=""
                onChange={(e) => {
                  setMainInputData({
                    ...mainInputData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>Project Name:</label>
              {/* <div className='d-flex'>
                                <input type="text" className="form-control" id="projectName" name='projectName' placeholder="" onChange={(e) => {
                                    setMainInputData({ ...mainInputData, [e.target.name]: e.target.value });
                                }} />
                                <button className="btn btn-outline-success" type='button' onClick={addInputProjectField} style={{ width: '40px', marginLeft: '12px' }}>+</button>
                            </div> */}
              {projectFiledData.map((data, index) => {
                const { projectFiled, ishow } = data;
                return (
                  index === 0 && (
                    <div className="mt-2 d-flex" key={index}>
                      <input
                        type="text"
                        onChange={(evnt) => {
                          setMainInputData({
                            ...mainInputData,
                            [evnt.target.name]: evnt.target.value,
                          });
                          handleProjectChange(index, evnt);
                        }}
                        value={projectFiled}
                        name="projectFiled"
                        className="form-control"
                        placeholder=""
                        style={{ width: "92%" }}
                      />
                      {ishow && (
                        <button
                          className="btn btn-outline-success"
                          type="button"
                          onClick={addInputProjectField}
                          style={{ width: "40px", marginLeft: "12px" }}
                          disabled={projectFiled?.trim().length <= 0}
                        >
                          +
                        </button>
                      )}

                      {index !== 0 ? (
                        <button
                          className="btn btn-outline-danger"
                          type="button"
                          onClick={() => removeProjectFiled(index)}
                          style={{ width: "40px", marginLeft: "12px" }}
                        >
                          x
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  )
                );
              })}
            </div>
            <div className="form-group mt-3">
              <label>Worked-On:</label>
              {doneFiled.map((data, index) => {
                const { doneFiled, ishow, hours } = data;
                return (
                  <div className="mt-2 d-flex" key={index}>
                    <input
                      type="text"
                      onChange={(evnt) => handleChange(index, evnt)}
                      value={doneFiled}
                      name="doneFiled"
                      className="form-control"
                      placeholder=""
                      style={{ width: "92%" }}
                    />
                    <input
                      type="number"
                      name="hours"
                      className="form-control"
                      min={0}
                      style={{
                        maxWidth: "84px",
                        marginLeft: "10px",
                      }}
                      onChange={(evnt) => handleChange(index, evnt)}
                    />
                    {ishow && (
                      <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={addInputField}
                        style={{ width: "40px", marginLeft: "12px" }}
                        disabled={
                          doneFiled?.trim().length <= 0 ||
                          !hours?.trim() ||
                          isNaN(hours)
                        }
                      >
                        +
                      </button>
                    )}

                    {index !== 0 ? (
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => removedoneFiled(index)}
                        style={{ width: "40px", marginLeft: "12px" }}
                      >
                        x
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              {/* <button className="btn btn-outline-success mt-2" type='button' onClick={addInputField}>Add New</button> */}
            </div>
            <div className="form-group mt-3">
              <label>In-Progress:</label>
              {inprogressFiled.map((data, index) => {
                const { inprogressFiled, ishow } = data;
                return (
                  <div className="mt-2 d-flex" key={index}>
                    <input
                      type="text"
                      onChange={(evnt) => handleInprogressChange(index, evnt)}
                      value={inprogressFiled}
                      name="inprogressFiled"
                      className="form-control"
                      placeholder=""
                      style={{ width: "92%" }}
                    />

                    {ishow && (
                      <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={addInprogressInputField}
                        style={{ width: "40px", marginLeft: "12px" }}
                        disabled={inprogressFiled?.trim().length <= 0}
                      >
                        +
                      </button>
                    )}

                    {index !== 0 ? (
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => removeInprogressFiled(index)}
                        style={{ width: "40px", marginLeft: "12px" }}
                      >
                        x
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              {/* <button className="btn btn-outline-success" type='button' onClick={addInprogressInputField}>Add New</button> */}
            </div>
            <div className="form-group mt-3">
              <label>Query:</label>
              {queryFiled.map((data, index) => {
                const { queryFiled, ishow } = data;
                return (
                  <div className="mt-2 d-flex" key={index}>
                    <input
                      type="text"
                      onChange={(evnt) => handleQueryChange(index, evnt)}
                      value={queryFiled}
                      name="queryFiled"
                      className="form-control"
                      placeholder=""
                      style={{ width: "92%" }}
                    />

                    {ishow && (
                      <button
                        className="btn btn-outline-success"
                        type="button"
                        onClick={addQueryInputField}
                        style={{ width: "40px", marginLeft: "12px" }}
                        disabled={queryFiled?.trim().length <= 0}
                      >
                        +
                      </button>
                    )}

                    {index !== 0 ? (
                      <button
                        className="btn btn-outline-danger"
                        type="button"
                        onClick={() => removeQueryFiled(index)}
                        style={{ width: "40px", marginLeft: "12px" }}
                      >
                        x
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                );
              })}
              {/* <button className="btn btn-outline-success" type='button' onClick={addQueryInputField}>Add New</button> */}
            </div>
            <div className="form-group mb-3 mt-3">
              <label>Your Name:</label>
              <input
                type="text"
                className="form-control"
                id="yourName"
                name="yourName"
                placeholder=""
                onChange={(e) => {
                  setMainInputData({
                    ...mainInputData,
                    [e.target.name]: e.target.value,
                  });
                }}
              />
            </div>
            {/* ----------------------------------------------------------------------------------------------------------------------------------------- */}
            <div className="form-group mt-3">
              {projectFiledData.map((data, index) => {
                const { projectFiled, ishow } = data;
                return (
                  index !== 0 && (
                    <>
                      <hr className="mt-5" />
                      <label>Project Name:</label>
                      <div className="mt-2 d-flex" key={index}>
                        <input
                          type="text"
                          onChange={(evnt) => handleProjectChange(index, evnt)}
                          value={projectFiled}
                          name="projectFiled"
                          className="form-control"
                          placeholder=""
                          style={{ width: "92%" }}
                        />
                        {ishow && (
                          <button
                            className="btn btn-outline-success"
                            type="button"
                            onClick={addInputProjectField}
                            style={{ width: "40px", marginLeft: "12px" }}
                            disabled={projectFiled?.trim().length <= 0}
                          >
                            +
                          </button>
                        )}

                        {index !== 0 ? (
                          <button
                            className="btn btn-outline-danger"
                            type="button"
                            onClick={() => removeProjectFiled(index)}
                            style={{ width: "40px", marginLeft: "12px" }}
                          >
                            x
                          </button>
                        ) : (
                          ""
                        )}
                      </div>

                      <div className="form-group mt-3">
                        <label>Worked-On:</label>
                        {data?.projectDoneField?.map((childData, dindex) => {
                          const { doneFiled, hours, ishow } = childData;
                          return (
                            <div className="mt-2 d-flex" key={dindex}>
                              <input
                                type="text"
                                onChange={(evnt) =>
                                  handleSubInputChange(
                                    index,
                                    dindex,
                                    "projectDoneField",
                                    "doneFiled",
                                    evnt
                                  )
                                }
                                value={doneFiled}
                                name="doneFiled"
                                className="form-control"
                                placeholder=""
                                style={{ width: "92%" }}
                              />
                              <input
                                type="number"
                                name="hours"
                                className="form-control"
                                min={0}
                                style={{
                                  maxWidth: "84px",
                                  marginLeft: "10px",
                                }}
                                onChange={(evnt) => {
                                  handleSubInputChange(
                                    index,
                                    dindex,
                                    "projectDoneField",
                                    "hours",
                                    evnt
                                  );
                                }}
                              />
                              {data?.projectDoneField?.length - 1 ===
                                dindex && (
                                <button
                                  className="btn btn-outline-success"
                                  type="button"
                                  onClick={(evnt) =>
                                    addSubInputField(
                                      index,
                                      dindex,
                                      "projectDoneField",
                                      "doneFiled",
                                      evnt
                                    )
                                  }
                                  style={{ width: "40px", marginLeft: "12px" }}
                                  disabled={
                                    doneFiled?.trim().length <= 0 ||
                                    !hours?.trim() ||
                                    isNaN(hours)
                                  }
                                >
                                  +
                                </button>
                              )}

                              {dindex !== 0 ? (
                                <button
                                  className="btn btn-outline-danger"
                                  type="button"
                                  onClick={(evnt) =>
                                    removeSubInputField(
                                      index,
                                      dindex,
                                      "projectDoneField",
                                      "doneFiled",
                                      evnt
                                    )
                                  }
                                  style={{ width: "40px", marginLeft: "12px" }}
                                >
                                  x
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                      <div className="form-group mt-3">
                        <label>In-Progress:</label>
                        {data?.projectInprogressFiled?.map(
                          (childData, inindex) => {
                            const { inprogressFiled, ishow } = childData;
                            return (
                              <div className="mt-2 d-flex" key={inindex}>
                                <input
                                  type="text"
                                  onChange={(evnt) =>
                                    handleSubInputChange(
                                      index,
                                      inindex,
                                      "projectInprogressFiled",
                                      "inprogressFiled",
                                      evnt
                                    )
                                  }
                                  value={inprogressFiled}
                                  name="inprogressFiled"
                                  className="form-control"
                                  placeholder=""
                                  style={{ width: "92%" }}
                                />

                                {data?.projectInprogressFiled.length - 1 ===
                                  inindex && (
                                  <button
                                    className="btn btn-outline-success"
                                    type="button"
                                    onClick={(evnt) =>
                                      addSubInputField(
                                        index,
                                        inindex,
                                        "projectInprogressFiled",
                                        "inprogressFiled",
                                        evnt
                                      )
                                    }
                                    style={{
                                      width: "40px",
                                      marginLeft: "12px",
                                    }}
                                    disabled={
                                      inprogressFiled?.trim().length <= 0
                                    }
                                  >
                                    +
                                  </button>
                                )}

                                {inindex !== 0 ? (
                                  <button
                                    className="btn btn-outline-danger"
                                    type="button"
                                    onClick={(evnt) =>
                                      removeSubInputField(
                                        index,
                                        inindex,
                                        "projectInprogressFiled",
                                        "inprogressFiled",
                                        evnt
                                      )
                                    }
                                    style={{
                                      width: "40px",
                                      marginLeft: "12px",
                                    }}
                                  >
                                    x
                                  </button>
                                ) : (
                                  ""
                                )}
                              </div>
                            );
                          }
                        )}
                      </div>
                      <div className="form-group mt-3 mb-5">
                        <label>Query:</label>
                        {data?.projectQueryFiled?.map((childData, qindex) => {
                          const { queryFiled, ishow } = childData;
                          return (
                            <div className="mt-2 d-flex" key={qindex}>
                              <input
                                type="text"
                                onChange={(evnt) =>
                                  handleSubInputChange(
                                    index,
                                    qindex,
                                    "projectQueryFiled",
                                    "queryFiled",
                                    evnt
                                  )
                                }
                                value={queryFiled}
                                name="queryFiled"
                                className="form-control"
                                placeholder=""
                                style={{ width: "92%" }}
                              />

                              {data?.projectQueryFiled.length - 1 ===
                                qindex && (
                                <button
                                  className="btn btn-outline-success"
                                  type="button"
                                  onClick={(evnt) =>
                                    addSubInputField(
                                      index,
                                      qindex,
                                      "projectQueryFiled",
                                      "queryFiled",
                                      evnt
                                    )
                                  }
                                  style={{ width: "40px", marginLeft: "12px" }}
                                  disabled={queryFiled?.trim().length <= 0}
                                >
                                  +
                                </button>
                              )}

                              {qindex !== 0 ? (
                                <button
                                  className="btn btn-outline-danger"
                                  type="button"
                                  onClick={(evnt) =>
                                    removeSubInputField(
                                      index,
                                      qindex,
                                      "projectQueryFiled",
                                      "queryFiled",
                                      evnt
                                    )
                                  }
                                  style={{ width: "40px", marginLeft: "12px" }}
                                >
                                  x
                                </button>
                              ) : (
                                ""
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )
                );
              })}
            </div>
          </form>
        </div>
        <div className="col-sm-12 col-lg-6 mt-2 mt-2">
          {(mainInputData?.tlName ||
            mainInputData?.projectFiled ||
            doneFiled[0].doneFiled ||
            inprogressFiled[0].inprogressFiled ||
            queryFiled[0].queryFiled ||
            mainInputData?.yourName) && (
            <>
              <div className={`card border-dark mt-2`} id="div_id">
                <div className="card-body mt-2">
                  {mainInputData?.tlName && (
                    <label>Hi {mainInputData?.tlName},</label>
                  )}
                  {mainInputData?.projectFiled && (
                    <p>
                      Here is the update of{" "}
                      <span className="fw-bold">
                        {mainInputData?.projectFiled}
                      </span>{" "}
                      as on{" "}
                      {(date.getDate() > 9
                        ? date.getDate()
                        : "0" + date.getDate()) +
                        "/" +
                        (date.getMonth() > 8
                          ? date.getMonth() + 1
                          : "0" + (date.getMonth() + 1)) +
                        "/" +
                        date.getFullYear()}
                    </p>
                  )}
                  {(mainInputData?.tlName || mainInputData?.projectFiled) && (
                    <br />
                  )}

                  {doneFiled[0].doneFiled && (
                    <label className="fw-bold">Worked-On:</label>
                  )}
                  {doneFiled.map((itemdone, index) => {
                    return (
                      itemdone.doneFiled && (
                        <p
                          key={index}
                          className={`lh-1 ${index !== 0 && "mt-2"}`}
                        >
                          {itemdone.doneFiled && `-`} {itemdone.doneFiled}{" "}
                          {itemdone?.hours !== undefined &&
                            itemdone?.hours !== "" && (
                              <b>[{itemdone?.hours} hrs]</b>
                            )}
                        </p>
                      )
                    );
                  })}
                  {doneFiled[0].doneFiled && <br />}
                  {inprogressFiled[0].inprogressFiled && (
                    <label className="fw-bold">In-Progress Task:</label>
                  )}
                  {inprogressFiled.map((itemdone, index) => {
                    return (
                      itemdone.inprogressFiled && (
                        <p
                          key={index}
                          className={`lh-1 ${index !== 0 && "mt-2"}`}
                        >
                          {itemdone.inprogressFiled && `-`}{" "}
                          {itemdone.inprogressFiled}
                        </p>
                      )
                    );
                  })}
                  {inprogressFiled[0].inprogressFiled && <br />}

                  {queryFiled[0].queryFiled && (
                    <label className="fw-bold">Query:</label>
                  )}
                  {queryFiled.map((itemdone, index) => {
                    return (
                      itemdone.queryFiled && (
                        <p
                          key={index}
                          className={`lh-1 ${index !== 0 && "mt-2"}`}
                        >
                          {itemdone.queryFiled && `-`} {itemdone.queryFiled}
                        </p>
                      )
                    );
                  })}
                  {queryFiled[0].queryFiled && <br />}
                </div>

                {/* ----------------------------------------------------------------------------------------- */}
                {projectFiledData.length > 1 && (
                  <div className="card-body">
                    {projectFiledData.map((item, index) => {
                      return (
                        <>
                          {item?.projectFiled && index > 0 && (
                            <p>
                              Here is the update of{" "}
                              <span className="fw-bold">
                                {item?.projectFiled}
                              </span>{" "}
                              as on{" "}
                              {(date.getMonth() > 8
                                ? date.getMonth() + 1
                                : "0" + (date.getMonth() + 1)) +
                                "/" +
                                (date.getDate() > 9
                                  ? date.getDate()
                                  : "0" + date.getDate()) +
                                "/" +
                                date.getFullYear()}
                            </p>
                          )}
                          {item?.projectFiled && index > 0 && <br />}

                          {item?.projectDoneField[0].doneFiled && (
                            <label className="fw-bold">Worked-On:</label>
                          )}

                          {item?.projectDoneField?.map((itemdone, index) => {
                            console.log("itemdone", itemdone);
                            return (
                              itemdone?.doneFiled && (
                                <p
                                  key={index}
                                  className={`lh-1 ${index !== 0 && "mt-2"}`}
                                >
                                  {itemdone?.doneFiled && `-`}{" "}
                                  {itemdone?.doneFiled}{" "}
                                  {itemdone?.hours !== undefined &&
                                    itemdone?.hours !== "" && (
                                      <b>[{itemdone?.hours} hrs]</b>
                                    )}
                                </p>
                              )
                            );
                          })}
                          {item?.projectDoneField[0]?.doneFiled && <br />}
                          {item?.projectInprogressFiled[0]?.inprogressFiled && (
                            <label className="fw-bold">In-Progress Task:</label>
                          )}
                          {item?.projectInprogressFiled?.map(
                            (itemdone, index) => {
                              return (
                                itemdone?.inprogressFiled && (
                                  <p
                                    key={index}
                                    className={`lh-1 ${index !== 0 && "mt-2"}`}
                                  >
                                    {itemdone?.inprogressFiled && `-`}{" "}
                                    {itemdone?.inprogressFiled}
                                  </p>
                                )
                              );
                            }
                          )}
                          {item?.projectInprogressFiled[0]?.inprogressFiled && (
                            <br />
                          )}

                          {item.projectQueryFiled[0].queryFiled && (
                            <label className="fw-bold">Query:</label>
                          )}
                          {item.projectQueryFiled.map((itemdone, index) => {
                            return (
                              itemdone.queryFiled && (
                                <p
                                  key={index}
                                  className={`lh-1 ${index !== 0 && "mt-2"}`}
                                >
                                  {itemdone.queryFiled && `-`}{" "}
                                  {itemdone.queryFiled}
                                </p>
                              )
                            );
                          })}
                          {item.projectQueryFiled[0].queryFiled && <br />}
                        </>
                      );
                    })}
                  </div>
                )}

                <div className="card-body mt-2">
                  {mainInputData?.yourName && (
                    <>
                      <p className="fw-bold">Thank You, </p>
                      {mainInputData?.yourName}
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
