import { useState } from "react";
import axios from "axios";
import "./SecretForm.css";

const SecretForm = ({ onNewSecret }) => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("random");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    try {
      const response = await axios.post("/api/secrets", { text, category });
      onNewSecret(response.data);
      setText("");
      setCategory("random");
    } catch (error) {
      console.log("Error posting secret:", error);
    }
  };

  return (
    <form className="secret-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="What's your secret?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows="3"
      />

      <div className="form-footer">
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="random">Random</option>
          <option value="confession">Confession</option>
          <option value="work">Work</option>
          <option value="relationship">Relationship</option>
        </select>

        <button type="submit">Post Secret</button>
      </div>
    </form>
  );
};

export default SecretForm;
