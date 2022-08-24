import React, { useState, useLayoutEffect } from "react";
import Axios from "axios";
const App = () => {
    const [name, setName] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [editName, setEditName] = useState("");
    const [editAge, setEditAge] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [edit, setEdit] = useState(null);
    const [userList, setUserList] = useState([]);
    const handleClick = (e) => {
        if (name && email && age) {
            Axios.post("http://localhost:2222/create", {
                name: name,
                age: age,
                email: email,
            });
            setUserList([
                ...userList,
                {
                    id: Math.random(),
                    name: name,
                    age: age,
                    email: email,
                },
            ]);
            setName("");
            setAge("");
            setEmail("");
        }
        e.preventDefault();
    };
    const handleClear = (e) => {
        setUserList(userList.toString());
        Axios.delete("http://localhost:2222/clear");
        setUserList([]);
        e.preventDefault();
    };
    useLayoutEffect(
        () =>
            Axios.get("http://localhost:2222/get").then((result) =>
                setUserList(result.data)
            ),
        []
    );
    const handleRemove = (id) => {
        Axios.delete(`http://localhost:2222/delete/${id}`);
        window.location.reload();
    };
    const handleEdit = (id) => {
        userList.map((user) => {
            if (user.id === id) {
                if (editName && editAge && editEmail) {
                    user.name = editName;
                    user.age = editAge;
                    user.email = editEmail;
                    Axios.put("http://localhost:2222/update", {
                        id: id,
                        name: editName,
                        age: editAge,
                        email: editEmail,
                    });
                } else if (editName) {
                    user.name = editName;
                    Axios.put("http://localhost:2222/update", {
                        id: id,
                        name: editName,
                        age: user.age,
                        email: user.email,
                    });
                } else if (editAge) {
                    user.age = editAge;
                    Axios.put("http://localhost:2222/update", {
                        id: id,
                        name: user.name,
                        age: editAge,
                        email: user.email,
                    });
                } else if (editEmail) {
                    user.email = editEmail;
                    Axios.put("http://localhost:2222/update", {
                        id: id,
                        name: user.name,
                        age: user.age,
                        email: editEmail,
                    });
                }
                return user;
            }
        });
        setEdit(null);
        setEditName("");
        setEditAge("");
        setEditEmail("");
    };
    return (
        <form className="app" onSubmit={handleClick}>
            <div className="information">
                <label htmlFor="name">Name</label>
                <input
                    className="info-input"
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="age">Age</label>
                <input
                    className="info-input"
                    type="number"
                    name="age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />
                <label htmlFor="email">Email</label>
                <input
                    className="info-input"
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <div className="buttons">
                    <button className="add" onClick={handleClick}>
                        Add
                    </button>
                    <button className="remove" onClick={handleClear}>
                        Delete Users
                    </button>
                </div>
            </div>
            <div className="users">
                <h3>Users</h3>
                {userList.map((user) => {
                    return (
                        <span className="usercard" key={user.id}>
                            {edit === user.id ? (
                                <>
                                    <input
                                        type="text"
                                        value={editName}
                                        className="input-edit"
                                        placeholder={user.name}
                                        onChange={(e) => setEditName(e.target.value)}
                                    />
                                    <input
                                        type="number"
                                        value={editAge}
                                        className="input-edit"
                                        placeholder={user.age}
                                        onChange={(e) => setEditAge(e.target.value)}
                                    />
                                    <input
                                        type="email"
                                        value={editEmail}
                                        className="input-edit"
                                        placeholder={user.email}
                                        onChange={(e) => setEditEmail(e.target.value)}
                                    />
                                </>
                            ) : (
                                <>
                                    <p>{user.name}</p>
                                    <p>{user.age}</p>
                                    <p>{user.email}</p>
                                </>
                            )}
                            {edit === user.id ? (
                                <button
                                    onClick={() => handleEdit(user.id)}
                                    className="save"
                                >
                                    Save
                                </button>
                            ) : (
                                <div className="control-icons">
                                    <span
                                        onClick={() => handleRemove(user.id)}
                                        className="delete"
                                    />
                                    <span
                                        onClick={() => setEdit(user.id)}
                                        className="edit"
                                    />
                                </div>
                            )}
                        </span>
                    );
                })}
            </div>
        </form>
    );
};

export default App;