import React, { useState } from 'react'
import { Navbar } from "../components/navbar.jsx"
import axios from 'axios'
import { useEffect } from 'react'
import "./calculations.css"
import { DataTable } from "primereact/datatable"
import { Column } from 'primereact/column'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

export const Calculations = () => {

    const [clients, setClients] = useState([''])
    
    const [tasks, setTasks] = useState([''])
    
    const [projects, setProjects] = useState([''])

    const [temp, setTemp] = useState([])
    const [tempTasks, setTempTasks] = useState([''])
    const [finalValue, setFinalValue] = useState([''])

    useEffect(() => {
        axios.get('http://localhost:3005/getClient').then((response) => {
            setClients(response.data)
        });
        axios.get('http://localhost:3005/getTasks').then((response) => {
            setTasks(response.data)
        })
        axios.get('http://localhost:3005/getProjects').then((response) => {
            setProjects(response.data)
        })
    }, [])

    useEffect(() => {
        let tempTasks = [];
        temp.forEach(projekat => {
            tasks.forEach(task => {
                if (task.project_id === projekat.id) {
                    tempTasks.push(task)
                }
            })
        })
        let sumEarnings = 0;
        let sumCosts = 0;

        tempTasks.forEach((task) => {
            sumEarnings += Number(task.earnings)
            sumCosts += Number(task.costs)
        });


        if (temp.length > 0) tempTasks.push({ "id": "SUM", "task_name": "", 'Project_ID': "", "Worker_ID": "", "earnings": sumEarnings, "costs": sumCosts, "Date": "" })

        setTempTasks(tempTasks)
        setFinalValue((sumEarnings-sumCosts))
        
    }, [temp])

    const sequence = (value) => {
        setTemp(projects.filter(projects => projects.client_id == value.target.value))
    }


    return (
        <div className='pages'>
            <div className='container projects'>
                <Navbar />
                <header>
                    <h1 className='header'>Bussines projection</h1>
                </header>
                <div className='filter'>
                    <h3>Select Client</h3>

                    <select className='form-control' onChange={(e) => sequence(e)}>
                        <option value="default" selected="selected">-Click to Select Client-</option>
                        {clients.map(option =>
                            <option value={option.id}>{option.client_name}</option>
                        )}
                    </select>
                    

                </div>
                <div className='table'>
                    <DataTable value={temp}>
                        <Column field='id' header='ID' />
                        <Column field='project_name' header='Name' />
                        <Column field='client_id' header='Client_id' />
                    </DataTable>
                </div>
                <div className='table suma'>
                    <DataTable value={tempTasks}>
                        <Column field='id' header='ID' />
                        <Column field='task_name' header='Task Name' />
                        <Column field='project_id' header='Project_ID' />
                        <Column field='worker_id' header='Worker_ID' />
                        <Column field='earnings' header='Earnings' />
                        <Column field='costs' header='Costs' />
                        <Column field='date' header='Date' />
                    </DataTable>
                </div>
                <div className='totalSecion'>
                    <h3>Total Earnings Before Running Costs:</h3>
                    <div className='total'>
                             {finalValue}
                    </div>
                </div>
            </div>
        </div>
    )
}
