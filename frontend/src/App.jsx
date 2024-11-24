import { useState } from "react";

import "./App.css";

function App() {
  const [formDataRaising, setFormDataRaising] = useState({
    title: "",
    description: "",
    createdBy: "",
    priority: "",
  });
  async function handleFormRaising(e) {
    e.preventDefault();
    const response = await fetch("http://localhost:8000/generateTicket", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = response.json();
    console.log(data);
  }
  
  const handleChangeRaising = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name + " " + value);
    setFormDataRaising({
      ...formData,
      [name]: value,
    });
  };

  const [searchStatus,setSearchStatus]=useState("all")
  const [priority,setPriority]=useState("all")
  async function handleFormFilter(e){
    
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
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
          <input type="submit" value="submit" />
        </form>
      </div>

      <div className="filter-search">
        <h2>Filters and search</h2>
        <form onSubmit={handleFormFilter}>
        <label htmlFor="status">status : </label>
        <select
            name="status"
            value={searchStatus}
            onChange={(e)=>setSearchStatus(e.target.value)}
          >
            <option value="all">all</option>
            <option value="solved">Solved</option>
            <option value="unsolved">Unsolved</option>
            
          </select>
          <br />

          <label htmlFor="priority">priority : </label>
          <select
            name="priority"
            value={priority}
            onChange={(e)=>setPriority(e.target.value)}
          >
            <option value="all">All</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <br />
        </form>
      </div>
    </>
  );
}

export default App;
