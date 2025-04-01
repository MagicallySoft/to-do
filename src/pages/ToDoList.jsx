import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import  Cancel  from "../../src/assets/cancel.svg";
import DeleteBtn  from "../../src/assets/delete.svg";
import EditBtn  from "../../src/assets/edit_btn.svg";
import Revert  from "../../src/assets/revert-icon.svg";
import Update  from "../../src/assets/update.svg";
import "../css/pages/ToDoList.css";

const ToDoList = () => {
  const navigate = useNavigate();
  const [isDayWis, setIsDayWis] = useState(false);
  const madeDateFormateDDMMYYYY = (date) => {
    let ADate = new Date(date);

    let day = ADate.getDate();
    let month = ADate.getMonth() + 1;
    let year = ADate.getFullYear();

    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    return `${day} / ${month} / ${year}`;
  };
  const [isEditTask, setIsEditTask] = useState("");

  const todayDate = madeDateFormateDDMMYYYY(new Date());
  const localStorageTaskDataKey = "Wa_daily_Update_Recode";
  const pendingStatus = "pending";
  const DoneStatus = "Done";
  const HighPriority = "High";
  const MediumPriority = "Medium";
  const LowPriority = "Low";

  const LocalToDo = JSON.parse(localStorage.getItem(localStorageTaskDataKey));

  const initialData = [
    {
      DateAndTime: todayDate,
      tasks: [],
      priority: LowPriority,
    },
  ];

  const initialTask = {
    id: new Date().getTime(),
    date: todayDate,
    title: "",
    status: "pending",
  };

  const [list, setList] = React.useState([]);

  const isDateExist = (date1, arr) => {
    if (arr?.length) {
      const result = arr.some((item) => item.DateAndTime === date1);
      return result;
    }
    return false;
  };

  const SetData = (editData) => {
    if (typeof editData === "object") {
      localStorage.setItem(localStorageTaskDataKey, JSON.stringify(editData));
      setList(editData);
    }
  };

  const getPreDateTask = (currentDate, array) => {
    const preDate = madeDateFormateDDMMYYYY(moment().subtract(1, "d").toDate());
    return array
      ?.filter((item) => item.DateAndTime === preDate)[0]
      ?.tasks?.filter((item) => item.status === pendingStatus);
  };

  useEffect(() => {
    if (!LocalToDo) {
      return SetData(initialData);
    } else if (!!LocalToDo && !isDateExist(todayDate, LocalToDo)) {
      const copyLocalToDo = Array.from(LocalToDo);
      const preDateTask = getPreDateTask(todayDate, copyLocalToDo);
      copyLocalToDo.push({ ...initialData[0], tasks: preDateTask });
      return SetData(copyLocalToDo);
    }
    SetData(LocalToDo);
  }, []);

  const addTaskHandler = (id, task, priority) => {
    if (!task) return;
    setList((pre) => {
      const updatedData = pre?.map((datwisObj) => {
        if (datwisObj.DateAndTime === id) {
          datwisObj.tasks = [
            ...datwisObj.tasks,
            { ...initialTask, title: task, priority: priority },
          ];
        }
        return datwisObj;
      });

      localStorage.setItem(
        localStorageTaskDataKey,
        JSON.stringify(updatedData)
      );
      return updatedData;
    });
  };

  const doneTaskHandler = (id, taskId) => {
    setList((pre) => {
      const updatedData = pre.map((datwisObj) => {
        if (datwisObj.DateAndTime === id) {
          datwisObj.tasks = datwisObj.tasks.map((taskObj, i) => {
            if (taskObj.id === taskId) {
              return { ...taskObj, status: DoneStatus };
            }
            return taskObj;
          });
        }
        return datwisObj;
      });

      localStorage.setItem(
        localStorageTaskDataKey,
        JSON.stringify(updatedData)
      );
      return updatedData;
    });
  };
  const deleteTaskHandler = (id, taskId) => {
    // eslint-disable-next-line no-restricted-globals
    if (confirm("Are you sure!"))
      setList((pre) => {
        const updatedData = pre.map((datwisObj) => {
          if (datwisObj.DateAndTime === id) {
            datwisObj.tasks = datwisObj.tasks.filter(
              (taskObj) => taskObj.id !== taskId
            );
          }
          return datwisObj;
        });

        localStorage.setItem(
          localStorageTaskDataKey,
          JSON.stringify(updatedData)
        );
        return updatedData;
      });
  };
  const revertTaskHandler = (id, taskId) => {
    setList((pre) => {
      const updatedData = pre.map((datwisObj) => {
        if (datwisObj.DateAndTime === id) {
          datwisObj.tasks = datwisObj.tasks.map((taskObj, i) => {
            if (taskObj.id === taskId) {
              return { ...taskObj, status: pendingStatus };
            }
            return taskObj;
          });
        }
        return datwisObj;
      });

      localStorage.setItem(
        localStorageTaskDataKey,
        JSON.stringify(updatedData)
      );
      return updatedData;
    });
  };

  const editTaskHandler = (id, taskId, editTaskTitle, editPriority) => {
    setList((pre) => {
      const updatedData = pre.map((datwisObj) => {
        if (datwisObj.DateAndTime === id) {
          datwisObj.tasks = datwisObj.tasks.map((taskObj) => {
            if (taskObj.id === taskId) {
              return {
                ...taskObj,
                title: editTaskTitle,
                priority: editPriority,
              };
            }
            return taskObj;
          });
        }
        return datwisObj;
      });
      localStorage.setItem(
        localStorageTaskDataKey,
        JSON.stringify(updatedData)
      );
      return updatedData;
    });
    setIsEditTask("");
  };

  const sortByPriorityToTask = (askArray) => {
    return askArray?.sort((a, b) => {
      const priorityOrder = { Low: 0, Medium: 1, High: 2 };
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  };

  const isTodayList = useMemo(() => {
    if (isDayWis) {
      return list?.map((data) => ({
        ...data,
        tasks: sortByPriorityToTask(data.tasks),
      }));
    }
    return list
      ?.filter((datwisObj) => datwisObj.DateAndTime === todayDate)
      ?.map((data) => ({
        ...data,
        tasks: sortByPriorityToTask(data.tasks),
      }));
  }, [isDayWis, list, todayDate]);

  const isSelectPriorityColor = (value) => {
    if (value === HighPriority) {
      return "border-danger";
    } else if (value === MediumPriority) {
      return "border-info";
    } else {
      return "border-success";
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <div className="d-flex justify-content-end gap-1">
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setIsDayWis(!isDayWis)}
            >
              {!isDayWis ? "Day Wis tasks" : "Today tasks"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => navigate("/")}
            >
              UPDATE PAGE
            </button>
          </div>
        </div>
        {isTodayList.length &&
          isTodayList.map(({ DateAndTime, tasks }, i) => (
            <div className="col-3" key={i}>
              <div className="w-100 border border-5 rounded-5 border-black">
                <div className="mb-2 border border-top-0 border-right-0 border-left-0 px-4 d-flex align-center rounded-top-5 bg-body-secondary justify-content-between py-2">
                  <p className="m-0 fw-bold fs-5">TO-DO</p>
                  <p className="m-0 fw-bold fs-5">{DateAndTime}</p>
                </div>
                <div className="">
                  {DateAndTime === todayDate && (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        console.log(e.target[1].value);
                        const selectedPriority = e.target.querySelector(
                          'input[name="Priority"]:checked'
                        ).value;
                        addTaskHandler(
                          DateAndTime,
                          e.target[0].value,
                          selectedPriority
                        );
                        e.target.reset();
                      }}
                    >
                      <div className="d-flex p-1">
                        <div className="add-task-btn d-flex flex-column gap-1 pb-2 px-3 w-100">
                          <div>
                            <input
                              className="w-100 rounded p-2"
                              placeholder="Enter task"
                            />
                            <div className="d-flex gap-2">
                              <div className="form-check">
                                <input
                                  className="form-check-input form-check-input-high"
                                  type="radio"
                                  name="Priority"
                                  id="HighPriorityEdit"
                                  value={HighPriority}
                                />
                                <label
                                  className="form-check-label text-danger"
                                  htmlFor="HighPriorityEdit"
                                >
                                  High
                                </label>
                              </div>
                              <div className="form-check">
                                <input
                                  className="form-check-input form-check-input-medium"
                                  type="radio"
                                  name="Priority"
                                  id="MediumPriorityEdit"
                                  value={MediumPriority}
                                />
                                <label
                                  className="form-check-label text-info"
                                  htmlFor="MediumPriorityEdit"
                                >
                                  Medium
                                </label>
                              </div>
                              <div className="form-check text-success">
                                <input
                                  className="form-check-input form-check-input-low"
                                  type="radio"
                                  name="Priority"
                                  id="LowPriorityEdit"
                                  value={LowPriority}
                                  defaultChecked
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="LowPriorityEdit"
                                >
                                  Low
                                </label>
                              </div>
                            </div>
                          </div>
                          {/* <button type="submit" className="w-20">
                              Add
                            </button> */}
                        </div>
                        <button
                          className="btn btn-outline-success"
                          type="submit"
                          style={{
                            width: "40px",
                            marginRight: "12px",
                            height: "40px",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </form>
                  )}
                  <div className="bg-warning-subtle px-2 pb-4 rounded-bottom-5">
                    {DateAndTime === todayDate &&
                      !!tasks?.filter(
                        ({ title, status }) => status === pendingStatus
                      ).length && (
                        <div>
                          <div>
                            <p className="fw-bold m-0 p-1 text-danger">
                              PENDING TASK
                            </p>
                          </div>
                          {tasks
                            .filter(
                              ({ title, status }) => status === pendingStatus
                            )
                            .map(({ title, status, id, priority }, i) => (
                              <div
                                className={`border border-4 rounded-5 px-3 py-1 mb-2 ${isSelectPriorityColor(
                                  priority
                                )}`}
                                key={i}
                              >
                                <div className="m-0 gap-2">
                                  {id === isEditTask ? (
                                    <>
                                      <form
                                        onSubmit={(e) => {
                                          e.preventDefault();
                                          const editPriority =
                                            e.target.querySelector(
                                              'input[name="PriorityEdit"]:checked'
                                            ).value;
                                          editTaskHandler(
                                            DateAndTime,
                                            id,
                                            e.target[0].value,
                                            editPriority
                                          );
                                          e.target.reset();
                                        }}
                                      >
                                        <div className="d-flex gap-1 add-task-btn w-100 border border-top-0 border-right-0 border-left-0 p-1">
                                          {/* <textarea
                                            rows={3}
                                            className="w-100 h-100"
                                            placeholder="Enter task"
                                            defaultValue={title}
                                          /> */}
                                          <div className="d-flex flex-column w-100 h-100">
                                            <input
                                              className=""
                                              placeholder="Enter task"
                                              defaultValue={title}
                                            />
                                            <div className="d-flex gap-2">
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input form-check-input-high"
                                                  type="radio"
                                                  name="PriorityEdit"
                                                  id="flexRadioDefault1"
                                                  value={HighPriority}
                                                  defaultChecked={
                                                    HighPriority === priority
                                                  }
                                                />
                                                <label
                                                  className="form-check-label text-danger"
                                                  htmlFor="flexRadioDefault1"
                                                >
                                                  High
                                                </label>
                                              </div>
                                              <div className="form-check">
                                                <input
                                                  className="form-check-input form-check-input-medium"
                                                  type="radio"
                                                  name="PriorityEdit"
                                                  id="flexRadioDefault2"
                                                  value={MediumPriority}
                                                  defaultChecked={
                                                    MediumPriority === priority
                                                  }
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="flexRadioDefault2"
                                                >
                                                  Medium
                                                </label>
                                              </div>
                                              <div className="form-check text-success">
                                                <input
                                                  className="form-check-input form-check-input-low"
                                                  type="radio"
                                                  name="PriorityEdit"
                                                  id="flexRadioDefault3"
                                                  value={LowPriority}
                                                  defaultChecked={
                                                    LowPriority === priority
                                                  }
                                                />
                                                <label
                                                  className="form-check-label"
                                                  htmlFor="flexRadioDefault3"
                                                >
                                                  Low
                                                </label>
                                              </div>
                                            </div>
                                          </div>
                                          <button
                                            type="submit"
                                            className="remove-default-button"
                                          >
                                            <Update />
                                          </button>
                                          <button
                                            className="remove-default-button"
                                            onClick={() => setIsEditTask("")}
                                          >
                                            <Cancel width="25px" />
                                          </button>
                                          {/* <button
                                              type="submit"
                                              className="w-20"
                                              onClick={() => setIsEditTask("")}
                                            >
                                              Cancel
                                            </button> */}
                                        </div>
                                      </form>
                                    </>
                                  ) : (
                                    <div className="d-flex gap-2 justify-content-between align-items-center">
                                      <div className="d-flex gap-2">
                                        <input
                                          className="form-check-input m-0"
                                          style={{
                                            width: "25px",
                                            height: "25px",
                                          }}
                                          type="radio"
                                          name="flexRadioDefault"
                                          id="flexRadioDefault1"
                                          onClick={() =>
                                            doneTaskHandler(DateAndTime, id)
                                          }
                                        />
                                        <p
                                          className="m-0 text-break fw-bold"
                                          // onDoubleClick={() => {
                                          //   setIsEditTask(id);
                                          // }}
                                        >
                                          {i + 1}
                                          {"."} {title}
                                        </p>
                                      </div>
                                      <div
                                        className="d-flex align-items-center gap-1"
                                        style={{
                                          cursor: "pointer",
                                        }}
                                      >
                                        <EditBtn
                                          onClick={() => setIsEditTask(id)}
                                        />
                                        <DeleteBtn
                                          onClick={() =>
                                            deleteTaskHandler(DateAndTime, id)
                                          }
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            ))}
                        </div>
                      )}
                    {!!tasks?.filter(
                      ({ title, status }) => status === DoneStatus
                    ).length && (
                      <div className="">
                        <div>
                          <p className="fw-bold m-0 p-1 text-success">
                            DONE TASK
                          </p>
                        </div>
                        <div>
                          {tasks
                            .filter(
                              ({ title, status }) => status === DoneStatus
                            )
                            .map(({ title, status, id, priority }, i) => (
                              <div
                                className={`d-flex justify-content-between border border-4 rounded-5 px-3 py-1 mb-2 ${isSelectPriorityColor(
                                  priority
                                )}`}
                                key={i}
                              >
                                <div className="d-flex">
                                  {/* <span className="pe-1 text-decoration-line-through text-secondary">
                                        
                                      </span> */}
                                  <p className="m-0 text-decoration-line-through text-secondary text-break">
                                    {i + 1}. {title}
                                  </p>
                                </div>
                                {DateAndTime === todayDate && (
                                  <div
                                    className="d-flex align-items-center gap-1"
                                    style={{
                                      cursor: "pointer",
                                    }}
                                  >
                                    <Revert
                                      onClick={() =>
                                        revertTaskHandler(DateAndTime, id)
                                      }
                                    />
                                    <DeleteBtn
                                      onClick={() =>
                                        deleteTaskHandler(DateAndTime, id)
                                      }
                                    />
                                  </div>
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ToDoList;
