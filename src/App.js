import { useRef, useState } from "react";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [editText, setEditText] = useState("");

  const inputRef = useRef();

  const handelAddClick = () => {
    const text = inputRef.current.value;
    const newItem = { completed: false, text, isEditing: false };
    if (text === "") {
      return;
    }
    setList([...list, newItem]);
    inputRef.current.value = "";
  };

  const handelCompleted = (index) => {
    const newTodos = [...list];
    newTodos[index].completed = !newTodos[index].completed;
    setList(newTodos);
  };

  const handelDeleteItem = (index) => {
    const newTodos = [...list];
    newTodos.splice(index, 1);
    setList(newTodos);
  };

  const handelEditItem = (index) => {
    setList(
      list.map((item, i) => (i === index ? { ...item, isEditing: true } : item))
    );
    setEditText(list[index].text); // Set the current text in the input field
  };

  const handleInputChange = (e) => {
    setEditText(e.target.value);
  };

  const handelSave = (index) => {
    setList(
      list.map((item, i) =>
        i === index ? { ...item, text: editText, isEditing: false } : item
      )
    );
    setEditText("");
  };

  return (
    <div className="App">
      <div className="Container">
        <h1 style={{ fontSize: "50px", color: "#E4B1F0" }}>Todo-List</h1>
        <div className="ulList">
          <ul className="uli">
            {list.map(({ text, completed, isEditing }, index) => {
              return (
                <div className="liList" key={index}>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editText}
                      onChange={handleInputChange}
                    />
                  ) : (
                    <li
                      style={{
                        textDecoration: completed ? "line-through" : "none",
                      }}
                      onClick={() => handelCompleted(index)}
                    >
                      {text}
                    </li>
                  )}
                  <div className="btns">
                    <span onClick={() => handelDeleteItem(index)}>🗑️</span>

                    {isEditing ? (
                      <span
                        style={{ color: "#e4b1f0" }}
                        onClick={() => handelSave(index)}
                      >
                        Save
                      </span>
                    ) : (
                      <span onClick={() => handelEditItem(index)}>👨🏻‍🔧</span>
                    )}
                  </div>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="Controller">
          <input ref={inputRef} type="text" placeholder="Enter Item..." />
          <button onClick={handelAddClick}>Add</button>
        </div>
      </div>
    </div>
  );
}

export default App;
