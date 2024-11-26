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
    const data = await response.json();
    console.log(data);
    console.log(ticketsList);

    if (data) {
      setTicketsList((ticketsList) => [...ticketsList, data]);
    } else {
      console.log("error");
    }
    console.log(ticketsList);
    setFormDataRaising({
      title: "",
      description: "",
      createdBy: "",
      priority: "low",
    });
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

  const [filterData, setFilterData] = useState({
    filterStatus: "All",
    filterPriority: "All",
  });

  const handleChangeFilter = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + " " + value);
    setFilterData({
      ...filterData,
      [name]: value,
    });
  };

  const [ticketsList, setTicketsList] = useState([]);

  useEffect(() => {
    getTicketList();
  }, []);

  async function getTicketList() {
    const resp = await fetch("http://localhost:8000/tickets");
    const data = await resp.json();

    setTicketsList(data);
  }
  // console.log(ticketsList);

  const filteredTickets = ticketsList.filter((ticket) => {
    const statusFilter =
      filterData.filterStatus === "All" ||
      (ticket.status &&
        ticket.status.toLowerCase() === filterData.filterStatus.toLowerCase());
    const priorityFilter =
      filterData.filterPriority === "All" ||
      (ticket.priority &&
        ticket.priority.toLowerCase() ===
          filterData.filterPriority.toLowerCase());

    return statusFilter && priorityFilter;
  });

  // console.log(filteredTickets);

  async function handleDelete(id) {
    const resp = await fetch(`http://localhost:8000/deleteTicket/${id}`, {
      method: "DELETE",
    });
    const data = await resp.json();

    if (resp.ok) {
      console.log(data.message);
      setTicketsList((prevTickets) => prevTickets.filter((ticket) => ticket._id !== id));
    } else {
      console.error("Error deleting ticket:", data.message || "Unknown error");
    }
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

          <label htmlFor="filterStatus">status : </label>
          <select
            name="filterStatus"
            value={filterData.filterStatus}
            onChange={handleChangeFilter}
          >
            <option value="All">All</option>
            <option value="open">Solved</option>
            <option value="close">Unsolved</option>
          </select>
          <br />

          <label htmlFor="filterPriority">priority : </label>
          <select
            name="filterPriority"
            value={filterData.filterPriority}
            onChange={handleChangeFilter}
          >
            <option value="All">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
        </div>

        <h2>Tickets</h2>
        <div
          className="card"
          style={{
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            justifyContent: "left",
          }}
        >
          {filteredTickets.map((ticket) => {
            return (
              <Card
                key={ticket._id}
                id={ticket._id}
                description={ticket.description}
                createdBy={ticket.createdBy}
                priority={ticket.priority}
                onDelete={() => handleDelete(ticket._id)}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
