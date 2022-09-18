import React, { useContext, useState } from 'react'
import { EmployeeGroup } from './EmployeeGroup'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useEffect } from 'react'
import { useClickOutside } from '../hooks/useClickOutside'
import ProjectContext from '../ProjectContext'
import EmployeeContext from '../EmployeeContext'

export function ProjectGroup({ project }) {
  const [dates, setDates] = useState(null)
  const [isPickingDates, setIsPickingDates] = useState(false)
  const [isAddingEmployee, setIsAddingEmployee] = useState(false)
  const { updateProject } = useContext(ProjectContext)
  const { employees, updateEmployee } = useContext(EmployeeContext)

  useEffect(() => {
    const { startDate, endDate } = project
    const dateObj = {}

    if (startDate) dateObj.from = startDate
    if (endDate) dateObj.to = endDate

    setDates(dateObj)
  }, [])

  const setProjectDates = async () => {
    setIsPickingDates(false)
    const updatedProject = JSON.parse(JSON.stringify(project))

    if (dates?.from) updatedProject.startDate = dates.from
    if (dates?.to) updatedProject.endDate = dates.to

    await updateProject(updatedProject)

    const projectEmployees = employees.filter((employee) =>
      project.employeeIds.includes(employee.id),
    )
    projectEmployees.forEach(async (employee) => {
      const updatedEmployee = { ...employee }
      if (updatedEmployee.isOccupiedChanged) return
      updatedEmployee.occupiedFrom = dates?.from
      updatedEmployee.occupiedUntil = dates?.to
      await updateEmployee(updatedEmployee)
    })
  }

  return (
    <section className="project-group">
      <button onClick={() => setIsPickingDates(true)}>Set Time</button>
      <h3 className="project-name">{project.name}</h3>
      <ul className="project-employee-list">
        {employees.map((employee) => {
          if (project.employeeIds?.includes(employee.id))
            return (
              <div key={employee.id} className="project-employee-preview">
                <li>{employee.name}</li>
                <li>{employee.occupiedFrom?.toString()}</li>
                <li>{employee.occupiedUntil?.toString()}</li>
              </div>
            )
        })}
      </ul>
      {isPickingDates ? (
        <div className="date-picker">
          <DayPicker
            numberOfMonths={2}
            mode="range"
            selected={dates}
            onSelect={setDates}
          />
          <button onClick={setProjectDates}>Choose Dates</button>
        </div>
      ) : (
        ''
      )}

      {isAddingEmployee ? (
        <EmployeeGroup
          setIsAddingEmployee={setIsAddingEmployee}
          projectId={project.id}
        ></EmployeeGroup>
      ) : (
        <button onClick={() => setIsAddingEmployee(true)}>Add Employee</button>
      )}
    </section>
  )
}
