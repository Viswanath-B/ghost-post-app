import { useEffect, useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import SecretForm from "./components/SecretForm";

function App() {
  const [secrets, setSecrets] = useState([]);

  useEffect(() => {
    const fetchSecrets = async () => {
      try {
        const response = await axios.get("/api/secrets");
        setSecrets(response.data);
      } catch (err) {
        console.log("error fetching data:", err);
      }
    };
    fetchSecrets();
  }, []);

  const handleNewSecret = (newSecret) => {
    setSecrets((prev) => [newSecret, ...prev]);
  };

  const handleLike = async (id) => {
    try {
      const response = await axios.put(`/api/secrets/${id}/like`);
      const updatedSecret = response.data;

      setSecrets((prev) =>
        prev.map((secret) =>
          secret._id === id ? updatedSecret : secret
        )
      );
    } catch (error) {
      console.log("Error liking secret:", error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>👻 Ghost Post</h1>
        <p>Share Your Opinions anonymously</p>
      </header>

      <SecretForm onNewSecret={handleNewSecret} />

      <div className="secrets-feed">
        {secrets.length === 0 ? (
          <p style={{ textAlign: "center", color: "#94a3b8" }}>
            No opinions yet.....
          </p>
        ) : (
          secrets.map((secret) => (
            <div key={secret._id} className="secret-card">
              <div className="card-header">
                <span className="category-tag">{secret.category}</span>
                <span className="timestamp">
                  {secret.createdAt &&
                    formatDistanceToNow(new Date(secret.createdAt), {
                      addSuffix: true,
                    })}
                </span>
              </div>

              <p className="secret-text">{secret.text}</p>
              <button
                className="like-btn"
                onClick={() => handleLike(secret._id)}
              >
                💞 {secret.likes} Likes
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
