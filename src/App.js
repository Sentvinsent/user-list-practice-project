//Components
import UserForm from "./components/Form/UserForm";

//CSS
import "./App.css";
import List from "./components/List/List";
import Card from "./components/Card/Card";

function App() {
  return (
    <div className="App">
      <Card>
        <h1 style={{ color: '#f0f8ff' }}>USERS LIST</h1>
      </Card>
      <UserForm />
      <List />
    </div>
  );
}

export default App;
