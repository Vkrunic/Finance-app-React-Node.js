import React, { useState } from 'react'
import "./projects.css"
import { Navbar } from "../components/navbar.jsx"
import axios from 'axios'
import { useEffect } from 'react'

export const Projects = () => {

    const [project, setProject] = useState('')
    const [client, setClient] = useState('')

    const [selectedClient, setSelectedClient] = useState('')
    const [selectedProject, setSelectedProject] = useState('')
    const [selectedWorker, setSelectedWorker] = useState('')

    const [temp, setTemp] = useState([''])
    const [tempProjects, setTempProjects] = useState([''])
    const [tempWorkers, setTempWorkers] = useState([''])

    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [specialisation, setSpecialisation] = useState('')
    const [pay, setPay] = useState('')

    const [taskname, setTaskName] = useState('')
    const [earnings, setEarnings] = useState('')
    const [costs, setCosts] = useState('')
    const [date, setDate] = useState('')

    const [expenceName, setExpenceName] = useState("")
    const [expenceAmount, setExpenceAmount] = useState('')
    const [expenceDate, setExpenceDate] = useState('')


    useEffect(() => {
        axios.get('http://localhost:3005/getClient').then((response) => {
            setTemp(response.data)
        });
        axios.get('http://localhost:3005/getProjects').then((response) => {
            setTempProjects(response.data)
        });
        axios.get('http://localhost:3005/getWorkers').then((response) => {
            setTempWorkers(response.data)
        });
        axios.get('http://localhost:3005/getWorkers').then((response) => {
            setTempWorkers(response.data)
        });
    }, [])




    const addTask = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3005/addTask', {
            task_name: taskname,
            project_id: selectedProject,
            worker_id: selectedWorker,
            earnings: earnings,
            costs: costs,
            date: date
        }).then((response) => {
            console.log(response)
        })
    }
    const addProject = async (e) => {
        e.preventDefault()
        await axios.post('http://localhost:3005/addProject', {
            project: project,
            client: selectedClient,
        }).then((response) => {
            console.log(response)
            axios.get('http://localhost:3005/getProjects').then((response) => {
                setTempProjects(response.data)
            });
        })
    }
    const addWorker = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3005/addWorker', {
            worker_name: name,
            worker_lastname: lastname,
            pay: pay,
            specialisation:specialisation
        }).then((response) => {
            console.log(response)

            axios.get('http://localhost:3005/getWorkers').then((response) => {
                setTempWorkers(response.data)
            });
        })
    }
    const addClient = async (e) => {
        e.preventDefault();

        let template =[""];
        temp.forEach(obj => {
        template.push(obj.client_name)
        }) 



        if(template.includes(client)){
            alert("Client with this name already exists!")
        }else{
        await axios.post('http://localhost:3005/addClient', {
            client: client,
        }).then((response) => {
            console.log(response)
            axios.get('http://localhost:3005/getClient').then((response) => {
            setTemp(response.data)
        });
        })
    }}

    const addExpence = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3005/addExpence', {
            expence_name: expenceName,
            expence_amount: expenceAmount,
            expence_date: expenceDate
        }).then((response) => {
            console.log(response)
        })
    }

    return (
        <div className='page'>
            <div className='container projects'>
                <Navbar />
                <div>
                    <h1 className='header'>Update database</h1>
                </div>
                <div className='addStuff'>
                    <div className='addClientContainer'>
                        <h3>Add client</h3>
                        <form className="form-group form" onSubmit={(e) => addClient(e)} >

                            <label>
                                Client name:
                                <input onChange={(e) => {
                                    setClient(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <br />
                            <button className="btn-primary btn" type="submit">Add client</button>
                        </form>
                    </div>
                    <div className='addProjectsContainer'>
                        <h3>Add project</h3>
                        <form className="form-group form" onSubmit={(e) => addProject(e)} >
                            <label>
                                Project Name:
                                <input onChange={(e) => {
                                    setProject(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Client:
                                <select className='form-control' onChange={(value) => setSelectedClient(value.target.value)}>
                                    <option selected="selected">-Select Client-</option>
                                    {temp.map(option =>
                                        <option value={option.id}>{option.client_name}</option>
                                    )}
                                </select>
                            </label>
                            <br />
                            <button className="btn-primary btn" type="submit">Add project</button>
                        </form>

                    </div>


                    <div className='addTaskContainer'>
                        <h3>Add task</h3>
                        <form className="form-group form" onSubmit={(e) => addTask(e)} >
                            <label>
                                Task name:
                                <input onChange={(e) => {
                                    setTaskName(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Project:
                                <select className="form-select" onChange={(value) => setSelectedProject(value.target.value)}>
                                    <option selected="selected">-Select project-</option>
                                    {tempProjects.map(option =>
                                        <option value={option.id}>{option.project_name}</option>
                                    )}
                                </select>
                            </label>

                            <label>
                                Worker:
                                <select className="form-select" id='selectWorker' onChange={(value) => setSelectedWorker(value.target.value)}>
                                    <option selected="selected">-Select worker-</option>
                                    {tempWorkers.map(option =>
                                        <option value={option.id}>{option.worker_name + " " + option.worker_lastname}</option>
                                    )}
                                </select>
                            </label>

                            <label>
                                Earnings:
                                <input onChange={(e) => {
                                    setEarnings(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Costs:
                                <input onChange={(e) => {
                                    setCosts(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Date:
                                <input onChange={(e) => {
                                    setDate(e.target.value)
                                }} className="form-control" type="date" />
                            </label>
                            <br />
                            <button className="btn-primary btn employee-btn" type="submit">Add task</button>
                        </form>
                    </div>
                    <div className='addEmployeesContainer'>
                        <h3>Add worker</h3>
                        <form className="form-group form" onSubmit={(e) => addWorker(e)} >
                            <label>
                                Name:
                                <input onChange={(e) => {
                                    setName(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Last name:
                                <input onChange={(e) => {
                                    setLastname(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Specialisation:
                                <input onChange={(e) => {
                                    setSpecialisation(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Pay:
                                <input onChange={(e) => {
                                    setPay(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <br />
                            <button className="btn-primary btn" type="submit">Add worker</button>
                        </form>
                    </div>

                    <div className='addExpencesContainer'>
                        <h3>Add expence</h3>
                        <form className="form-group form" onSubmit={(e) => addExpence(e)} >

                            <label>
                                Expence name:
                                <input onChange={(e) => {
                                    setExpenceName(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Expence amount:
                                <input onChange={(e) => {
                                    setExpenceAmount(e.target.value)
                                }} className="form-control" type="text" />
                            </label>
                            <label>
                                Expence date:
                                <input onChange={(e) => {
                                    setExpenceDate(e.target.value)
                                }} className="form-control" type="date" />
                            </label>
                            <br />
                            <button className="btn-primary btn" type="submit">Add expences</button>
                        </form>
                    </div>
                </div>

            </div>
        </div>

    )
}
