import "./Admin.css";
import { useState } from "react";
import Topbar from "../../components/topbar/Topbar";
import { FcPlus } from "react-icons/fc";
function Admin() {
  const inputArr = [
    {
      type: "text",
      id: 1,
      value: "",
    },
  ];

  const [arr, setArr] = useState(inputArr);

  const addInput = () => {
    setArr((s) => {
      return [
        {
          type: "text",
          value: "",
        },
        ...s
      ];
    });
  };
  let loginflag = localStorage.getItem("isLoggedIn");
  let curr_user;
  if (loginflag === "true") {
    curr_user = localStorage.getItem("loggedUser");
  }
  const handleSubmit = () => {};
  const handleChange = e => {
    e.preventDefault();

    const index = e.target.id;
    setArr(s => {
      const newArr = s.slice();
      newArr[index].value = e.target.value;

      return newArr;
    });
  };

  return (
    <div className="up-form">
      {curr_user === "admin" && (
        <div>
          <Topbar />
          <h1>Upload new products here!</h1>
          <form className="form-control">
            <div className="up-div">
              <label htmlFor="name" className="up-form-lb">
                Name
              </label>
              <input id="name" className="up-form-ip"></input>
            </div>
            <div className="up-div">
              <label htmlFor="category" className="up-form-lb">
                Category
              </label>
              <input id="category" className="up-form-ip"></input>
            </div>
            <div className="up-div">
              <label htmlFor="image" className="up-form-lb">
                Image
              </label>
              <input id="image" className="up-form-ip"></input>
            </div>
            <div className="up-div">
              <label htmlFor="price" className="up-form-lb">
                Price
              </label>
              <input id="price" className="up-form-ip"></input>
            </div>
            <div className=" up-lb-hlt">
              <label htmlFor="highlights" className="up-form-lb up-form-hlt-lb">
                Highlights
              </label></div>
              <div className="up-highlights-div">
                {arr.map((item, i) => {
                  return (
                    <input
                      onChange={handleChange}
                      value={item.value}
                      id={i}
                      type={item.type}
                      className="up-form-ip up-hlt-ip"
                    />
                  );
                })}
            </div>
          <button type="submit" className="primary-btn up-form-btn">Upload product</button>
          </form>
          <FcPlus
            className="more-highlights-btn"
            size="30"
            onClick={addInput}
          />
        </div>
      )}
      {curr_user !== "admin" && <div>Not an admin!</div>}
    </div>
  );
}

export default Admin;
