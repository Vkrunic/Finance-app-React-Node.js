import React, { useState } from 'react'
import { Navbar } from "../components/navbar.jsx"
import axios from 'axios'
import { useEffect } from 'react'
import "./calculations.css"
import { DataTable } from "primereact/datatable"
import { Column } from 'primereact/column'
import "primereact/resources/themes/lara-light-indigo/theme.css"
import "primereact/resources/primereact.min.css"

export const RunningCost = () => {
    const [expences, setExpences] = useState([])
    const [workers, setWorkers] = useState([])
    const [select, setSelect] = useState('')
    const [filtered, setFiltered] = useState([]);


    useEffect(() => {
        axios.get('http://localhost:3005/getWorkers').then((response) => {

            // console.log('response.data', response.data)
            // let tempWorkers = response.data;
            // response.data.forEach(worker => {
            //     let formatedDate=new Date(worker.expence_date);


            // })


            setWorkers(response.data)

        })
        axios.get('http://localhost:3005/getExpences').then((response) => {
            setExpences(response.data)
        })
    }, [])

    useEffect(() => {
        if (filtered.length == 0 && select === '') {
            setFiltered(expences)
        } else if (select !== '') {
            setFiltered(expences.filter(expence => (select.toLowerCase() === expence.expence_name.slice(0, select.length).toLowerCase()
                || expence.expence_date.slice(0, select.length).toLowerCase() === select.toLowerCase()
                || expence.id.toString().slice(0, select.length).toLowerCase() === select.toLowerCase()

            )))
        } else if (select === '') {
            setFiltered(expences)
        }

    }, [expences, select])


    const handleSelect = (value) => {
        setSelect(value.target.value)
        if (expences != 0) {
            filtered = expences.filter(function (el) {
                return el.expence_name.toLowerCase() == select.toLowerCase() || el.expence_date.toString().includes(select)
            })
        }
    }



    return (
        <div className='pages'>
            <div className='container projects'>
                <Navbar />
                <div>
                    <h1 className='header'>Running costs</h1>
                </div>
                <h2>Bills</h2>
                <input placeholder='Search...' type="text" className="form-control" onChange={(e) => setSelect(e.target.value)} />

                <div className='table'>
                    <DataTable value={filtered}>
                        <Column field='id' header='ID' />
                        <Column field='expence_name' header='Expence Name' />
                        <Column field='expence_amount' header='Expence Amount' />
                        <Column field='expence_date' header='Expence Date' />
                    </DataTable>
                </div>
                <h2>Payroll</h2>
                <div className='tablePayroll'>
                    <DataTable value={workers}>
                        <Column field='id' header='ID' />
                        <Column field='worker_name' header='Name' />
                        <Column field='worker_lastname' header='Lastname' />
                        <Column field='pay' header='Bruto Pay' />
                    </DataTable>
                </div>
            </div>
            <div className='bottomPart'>

            </div>
        </div>
    )
}
