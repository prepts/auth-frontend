import { customAxios } from "./API/axios";
import "./App.css";
import { useAuth } from "./context/AuthContext";

function App() {
  const { login, logout } = useAuth();

  const handleGreetings = () => {
    customAxios
      .post("/test/greetings", { name: "thiru" }, { params: { isAuthRequired: true } })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAbout = () => {
    customAxios
      .get("/test/about")
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div style={{ padding: 20, display: "flex", gap: 15 }}>
      <button onClick={login}>Login</button>
      <button onClick={handleAbout}>About</button>
      <button onClick={handleGreetings}>Greetings</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
}

export default App;
