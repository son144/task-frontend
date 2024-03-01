import styles from "./Card.module.css"
import React, { useState, Fragment } from 'react'
import { IoIosMore } from "react-icons/io";
import { MdKeyboardArrowDown } from "react-icons/md";
import { Menu, Transition } from "@headlessui/react"
import axios from "axios";
import DeleteTaskModal from "../Modals/DeleteTaskModal";
import moment from 'moment';
import { toast } from "react-toastify";
import EditModal from "../Modals/EditModal";

const Card = ({ data, deleteTask, status, updateTodoData, editTodoData }) => {
  const [task, setTask] = useState(data)
  const [newData, setNewData] = useState("")
  const [isView, setIsView] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [changedStatus, setChangedStatus] = useState("")
  const formattedDate = moment(data?.dueDate, 'DD-MM-YYYY').format('MMM Do');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const dueDate = moment(data.dueDate, 'DD-MM-YYYY').startOf('day');
  const currentDate = moment().startOf('day');
  const isPastDue = dueDate.isBefore(currentDate);
  const completedSubtasks = task.subTodos.filter(subTodo => subTodo.isCheck).length;
  const totalSubtasks = task.subTodos.length;
  const checklistText = `Checklist (${completedSubtasks}/${totalSubtasks})`;
  const url = process.env.REACT_APP_API_URL
  // console.log("hii");
  // console.log(url,"url");
  // console.log(task,"task");
  // console.log("data",data);
  // console.log("title",data?.title);
  // console.log(updateTodoData);
  // console.log("formattedDate",formattedDate);
  // console.log("dueDate:", dueDate.format('DD-MM-YYYY'));
  // console.log("currentDate:", currentDate.format('DD-MM-YYYY'));
  // Compare dueDate with currentDate
  // console.log("isPastDue", isPastDue);

  const toggleSubTodo = async (index, id) => {
    // console.log("inside toggle",index,id);
    const updatedSubTodos = [...task.subTodos];
    updatedSubTodos[index].isCheck = !updatedSubTodos[index].isCheck;
    setTask({ ...data, subTodos: updatedSubTodos });
    try {
      const res = await axios.put(`/api/v1/users//update-subTodo/${id}`, { subTodos: updatedSubTodos })
      // console.log(res,"res");
    } catch (error) {
      toast.error("Something went wrong!")
      // console.log("catch");
    }
  };

  const changeTaskStatus = async (id, status) => {
    // console.log("id fromchange", id, status);
    try {
      const res = await axios.put(`/api/v1/users/${id}`, { status: status });
      // console.log(res, "rees");
      data.complete = status
      updateTodoData(id, status)
      toast.success(`Moved to ${status}`);
    } catch (err) {
      toast.error("Something went wrong!")
    }
  }

  const editTaskHandler = async (id, obj) => {
    console.log(id,"from card");
    console.log(obj,"---- from card");
    try {
      const res = await axios.put(`/api/v1/users/current-user/${id}`, obj);
      const data = res?.data?.data
      // console.log(data,"data edited");
      // console.log(res, "res from card");
      console.log({...obj},"------");
      toast.success(`Task update successfully`);
      setTask({...data})
      // await editTodoData(id, data)
    } catch (err) {
      toast.error(`${err.response.data.message}`)
    }
  }

  const onShareHandler = async (id) => {
    console.log("inside on share", id);

    const url = process.env.REACT_APP_API_URL + "/shared-task/" + id;
    console.log(url, "url");

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link Copied ");
    } catch (error) {
      toast.error("Failed To Copy");
      console.error(error);
    }
  };


  // const onShareHandler=async(id)=>{
  //   console.log("inside on share",id);

  //   const url=process.env.REACT_APP_API_URL+"/shared-task/"+id
  //   console.log("hii");
  //   console.log(url,"url");
  //   // const link=/shared-task/65dfeb04efb8d5f7b6dfae44
  //   // try {
  //   //   console.log("try");
  //   //   const response = await axios.post(`/api/v1/users/current-user-share-task/${id}`);
  //   //   console.log(response);
  //   //   toast.success("cpopied successfully")
  //   // } catch (error) {
  //   //   const err=error.response.data.message
  //   //   toast.error(`${err}`)
  //   //   console.error(error.response,"dfdsg");
  //   // }
  // }
  // console.log(changedStatus);
  return (
    <div className={styles.maincard}>
      <div className={styles.options}>
        <div className={styles.pricontainer}>
          <div className={styles.dot}
            style={{
              backgroundColor: task?.priority === "LOW PRIORITY" && "#63C05B" || task?.priority === "MODERATE PRIORITY" && "#17A2B8" ||
                task?.priority === "HIGH PRIORITY" && "red"
            }}
          ></div>
          <p className={styles.textpriority} >{task?.priority} </p>
        </div>
        <div className={styles.menuContainer}>
          <Menu
            as="div"
            className={styles.menu}
          >
            <div className={styles.menuBtnDiv}>
              <Menu.Button className="">
                <div className={styles.innerMenuDiv}>
                  <IoIosMore className=" more-icon" style={{ fontSize: '1.25rem' }} />
                </div>
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className={styles.popup}>
                <div className={styles.customPadding}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => {
                          setIsEditModalOpen(true)

                        }}
                        style={{
                          backgroundColor: active ? '#EEF2F5' : 'transparent',
                          color: active ? '#f56565' : '#000000'
                        }}
                        className={styles.customStyle}
                      >
                        Edit
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className={styles.customPadding}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={async () => {
                          onShareHandler(data?._id)

                        }}

                        style={{
                          backgroundColor: active ? '#EEF2F5' : 'transparent',
                          color: active ? '#f56565' : '#000000'
                        }}
                        className={styles.customStyle}
                      >
                        {/* {active ? "active" : "notActive"} */}
                        Share
                      </button>
                    )}
                  </Menu.Item>
                </div>
                <div className={styles.customPadding}>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={async () => {
                          // deleteTask(data?._id)
                          setIsDelete(true)
                          setNewData(data)
                        }}
                        style={{
                          backgroundColor: active ? '#EEF2F5' : 'transparent',
                          color: active ? '#f56565' : '#000000'
                        }}
                        className={styles.customStyle}

                      >
                        {/* {active ? "active" : "notActive"} */}
                        Delete
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
      </div>
      <h1 className={styles.title}>{task?.title}  </h1>
      <div className={styles.arrowcont}>
        {/* <p className={styles.checklist}>Checklist (1/3)</p> */}
        <p className={styles.checklist}>{checklistText}</p>
        <div onClick={() => setIsView((prev) => !prev)}
          className={styles.dropdownIcon}
          style={{ transform: isView ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          <MdKeyboardArrowDown className={styles.dropdowniconMain} />
        </div>
      </div>
      {
        isView && <div className={styles.maincheckcont} >
          {
            task?.subTodos.map((subTodo, index) => {
              return <div key={index} className={styles.checkcont}>
                <input type="checkbox" checked={subTodo?.isCheck}
                  onChange={() => toggleSubTodo(index, task._id)} />
                <p className={styles.task}>{subTodo?.text}</p>
              </div>
            })
          }
        </div>
      }
      <div className={styles.statuscont}>
        {
          task?.dueDate &&
          <p className={styles.due} style={{
            backgroundColor: task.complete === "DONE" ? "#63C05B" : (isPastDue ? "#CF3636" : "#5A5A5A")
          }}>
            {formattedDate}
          </p>
        }
        <div className={styles.statusinner}>
          {status && status.length > 0 && status.map((status, idx) => {
            return <p key={idx} onClick={() => {
              setChangedStatus(status)
              changeTaskStatus(data?._id, status)
            }} className={styles.status}>{status}</p>
          })}
        </div>
      </div>
      {isEditModalOpen && <EditModal data={task} setIsEditModalOpen={setIsEditModalOpen} editTaskHandler={editTaskHandler} />}
      {isDelete && <DeleteTaskModal setIsDelete={setIsDelete} newData={newData} deleteTask={deleteTask} />}
    </div>
  )
}

export default Card