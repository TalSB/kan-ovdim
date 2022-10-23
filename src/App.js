import logo from "./logo.svg";
import "./App.css";
import { MainPage } from "./views/MainPage";
import { EmployeeProvider } from "./context/EmployeeContext";
import { ProjectProvider } from "./context/ProjectContext";
import { RoleProvider } from "./context/RoleContext";
function App() {
  return (
    <div className="App">
      <ProjectProvider>
        <EmployeeProvider>
          <RoleProvider>
            <MainPage></MainPage>
          </RoleProvider>
        </EmployeeProvider>
      </ProjectProvider>
    </div>
  );
}

export default App;
