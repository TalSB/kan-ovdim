import logo from './logo.svg'
import './App.css'
import { MainPage } from './views/MainPage'
import { EmployeeProvider } from './EmployeeContext'
import { ProjectProvider } from './ProjectContext'

function App() {
  return (
    <div className="App">
      <ProjectProvider>
        <EmployeeProvider>
          <MainPage></MainPage>
        </EmployeeProvider>
      </ProjectProvider>
    </div>
  )
}

export default App
