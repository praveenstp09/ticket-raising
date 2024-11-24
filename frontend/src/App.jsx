import { useEffect, useState } from "react";

import "./App.css";
import Card from "./Component/Card";

function App() {
  const [formDataRaising, setFormDataRaising] = useState({
    title: "",
    description: "",
    createdBy: "",
    priority: "low",
  });
  async function handleFormRaising(e) {
    e.preventDefault();
    // console.log(formDataRaising);
    const response = await fetch("http://localhost:8000/generateTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formDataRaising),
    });
    const data =await response.json();
    console.log(data);

  }

  const handleChangeRaising = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + " " + value);
    setFormDataRaising({
      ...formDataRaising,
      [name]: value,
    });
  };

  const [filterDate, setFilterData] = useState({
    filterStatus: "all",
    filterPriority: "all",
  });

  const handleChangeFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + " " + value);
    setFilterData({
      ...formDataRaising,
      [name]: value,
    });
  };

  const [ticketsList,setTicketsList]=useState([])

  useEffect(() => {
    getTicketList();
  }, [filterDate]);

  async function getTicketList(){
    const resp=await fetch('http://localhost');
    const data=resp.json();
    console.log(data);
    setTicketsList(data);
  }

  return (
    <>
      <div className="riasing-platform">
        <h2>Ticket Raising platform</h2>
        <form onSubmit={handleFormRaising}>
          <label htmlFor="title">Title : </label>
          <input
            type="text"
            name="title"
            value={formDataRaising.title}
            onChange={handleChangeRaising}
          />
          <br />

          <label htmlFor="description">Description : </label>
          <input
            type="text"
            name="description"
            value={formDataRaising.description}
            onChange={handleChangeRaising}
          />
          <br />

          <label htmlFor="createdBy">createdBy : </label>
          <input
            type="text"
            name="createdBy"
            value={formDataRaising.createdBy}
            onChange={handleChangeRaising}
          />
          <br />

          <label htmlFor="priority">priority : </label>
          <select
            name="priority"
            value={formDataRaising.priority}
            onChange={handleChangeRaising}
          >
            <option value="low" selected>
              Low
            </option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>

      <div>
        <div className="filter-search">
          <h2>Filters and search</h2>

          <label htmlFor="status">status : </label>
          <select
            name="status"
            value={filterDate.filterStatus}
            onChange={handleChangeFilter}
          >
            <option value="all" selected>
              all
            </option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
          </select>
          <br />

          <label htmlFor="priority">priority : </label>
          <select
            name="priority"
            value={filterDate.filterPriority}
            onChange={handleChangeFilter}
          >
            <option value="all" selected>
              All
            </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
        </div>

        <h2>Tickets</h2>
        <div className="card" style={{display:"flex", alignItems:"center",justifyContent:"flex-start"}}>

          {ticketsList.map((ticket)=>{
            return (
              <div style={{border:"2px solid black", padding:"5px"}}>
                <p>{ticket.description}</p>
                <p>Created by:{ticket.createdBy}</p>
                <p>Priority : {ticket.priority}</p>
                <button>Delete</button>
              </div>
            )
          })}
        </div>
      </div>
    </>
  );
}

export default App;
