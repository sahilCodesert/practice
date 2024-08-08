import React, { useEffect, useState } from "react";

const Crud = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    hobby: [],
    standerd: "",
    gender: "",
  });

  const [userlistData, setUserlistData] = useState([]);
  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("userData"));
    console.log("items--------> userlistData", items);

    if (items) {
      setUserlistData(items);
    }
  }, []);
  const [errors, setErrors] = useState({});

  console.log("userlistData", userlistData);

  const onsubmit = () => {
    let userTableData = [...userlistData];
    const err = validate();
    if (Object.keys(err).length === 0) {
      if (userData?.id) {
        const editindex = userTableData.findIndex((x) => x.id === userData?.id);
        // userTableData[editindex] = userData;
        userTableData.splice(editindex, 1, userData);
        setUserlistData([...userTableData]);
      } else {
        userTableData.push({ ...userData, id: userlistData.length + 1 });
        setUserlistData([...userTableData]);
      }
      console.log("userlistData insided", userTableData);

      localStorage.setItem("userData", JSON.stringify(userTableData));
    } else {
      setErrors(err);
    }

    setUserData({ name: "", email: "", hobby: [], standerd: "" });
  };

  const editRecord = (element) => {
    setUserData(element);
  };

  const deleteRecord = (index) => {
    let deleteTableRow = [...userlistData];
    deleteTableRow.splice(index);
    setUserlistData(deleteTableRow);
  };

  const validate = () => {
    let err = {};
    if (!userData.name) {
      err.name = "name is required";
    }

    if (!userData.email) {
      err.email = "Email is required";
    }
    console.log("err", err);
    return err;
  };
  const checkboxs = ["cricket", "movie", "animallove", "news", "travelling"];

  function selectbox(value, index) {
    const hobby = userData?.hobby?.length > 0 ? [...userData?.hobby] : [];
    const checkIndex = hobby?.indexOf(value);
    if (checkIndex !== -1) {
      hobby.splice(checkIndex, 1);
    } else {
      hobby.push(value);
    }
    setUserData({ ...userData, hobby });
  }

  return (
    <>
      <div style={{ textAlign: "center" }}>
        <div style={{ marginLeft: "5px", fontSize: "20px", fontWeight: "700" }}>
          Name
          {errors.name && <span className="error">{errors.name}</span>}
          <input
            type="text"
            style={{
              margin: "20px",
              borderRadius: "10px",
              padding: "10px 30px",
            }}
            value={userData.name}
            onChange={(event) => {
              setUserData((prev) => ({ ...prev, name: event.target.value }));
            }}
          />
        </div>

        <div style={{ marginLeft: "5px", fontSize: "20px", fontWeight: "700" }}>
          Email
          {errors.email && <span>{errors.email}</span>}
          <input
            type="email"
            style={{
              margin: "20px",
              borderRadius: "10px",
              padding: "10px 30px",
            }}
            value={userData.email}
            onChange={(event) => {
              setUserData((prev) => ({ ...prev, email: event.target.value }));
            }}
          />
        </div>

        <div
          style={{
            fontSize: "20px",
            fontWeight: "700",
          }}
        >
          <input
            type="radio"
            name="gender"
            value="male"
            style={{
              margin: "15px",
              borderRadius: "10px",
              padding: "10px 30px",
            }}
            checked={userData.gender === "male"}
            onChange={(event) => {
              setUserData((prev) => ({ ...prev, gender: event.target.value }));
            }}
          />
          <label htmlFor="">Male</label>
          <input
            type="radio"
            value="female"
            name="gender"
            style={{
              margin: "15px",
              borderRadius: "10px",
              padding: "10px 30px",
            }}
            checked={userData.gender === "female"}
            onChange={(event) => {
              setUserData((prev) => ({ ...prev, gender: event.target.value }));
            }}
          />
          <label htmlFor="">Female</label>

          <input
            type="radio"
            value="third"
            name="gender"
            style={{
              margin: "15px",
              borderRadius: "10px",
              padding: "10px 30px",
            }}
            checked={userData.gender === "third"}
            onChange={(event) => {
              setUserData((prev) => ({ ...prev, gender: event.target.value }));
            }}
          />
          <label htmlFor=""> Third</label>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div style={{ fontSize: "large", fontWeight: "800" }}>
            select your standerd
            <select
              onChange={(event) => {
                setUserData((prev) => ({
                  ...prev,
                  standerd: event.target.value,
                }));
              }}
              value={userData.standerd}
              name="standerd"
              style={{
                marginLeft: "20px",
                fontSize: "large",
                fontWeight: "500",
              }}
            >
              <option value="">select</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          <label
            htmlFor=""
            style={{
              fontSize: "20px",
              fontWeight: "700",
              marginBottom: "20px",
            }}
          >
            Hobby
          </label>
          {checkboxs.map((item, index) => {
            return (
              <div
                key={item}
                style={{
                  marginBottom: "10px",
                  width: "8%",
                  display: "flex",
                  justifyContent: "space-between",
                  fontWeight: "bold",
                }}
              >
                <label>{item}</label>
                <input
                  type="checkbox"
                  value={item}
                  checked={userData?.hobby?.includes(item)}
                  onChange={() => selectbox(item, index)}
                  style={{ marginTop: "auto" }}
                />
              </div>
            );
          })}
        </div>

        <button
          style={{
            margin: "20px",
            borderRadius: "10px",
            padding: "10px 30px",
            background: "blue",
            color: "#fff",
            fontSize: "20px",
            border: "none",
            marginLeft: "57px",
          }}
          type="button"
          onClick={() => onsubmit()}
        >
          submit
        </button>
      </div>
      <table>
        <th>name </th>
        <th>email</th>
        <th>gender</th>
        <th>standard</th>
        <th>hobby</th>
        <th>edit</th>
        <th>Delete</th>

        <tbody>
          {userlistData.map((element, index) => {
            console.log("userlistDatass", userlistData);
            return (
              <tr>
                <td>{element.name}</td>
                <td>{element.email}</td>
                <td>{element.gender}</td>
                <td>{element.standerd}</td>
                <td>
                  <div>
                    {element.hobby.map((x) => {
                      return <span className="hobby">{x}</span>;
                    })}
                  </div>
                </td>
                <td onClick={() => editRecord(element)}>
                  <button>edit</button>
                </td>
                <td onClick={() => deleteRecord(index)}>
                  <button>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Crud;
