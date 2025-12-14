import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./Pages/Home";
import AddItem from "./Pages/AddItem";
import EditItem from "./Pages/EditItem";

function App() {
  const [items, setItems] = useState([]);

  const addItem = (newItem) => {
    setItems((prev) => [...prev, { ...newItem, id: Date.now() }]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home items={items} />} />
        <Route path="/add" element={<AddItem addItem={addItem} />} />
        <Route path="/edit/:id" element={<EditItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
