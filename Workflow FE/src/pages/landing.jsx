import React from 'react'
import "./landing.css"

export const Landing = () => {

    return (
        <div className='page'>
            <div className=''>
                <div className='login'>
                    <h1 className="headline">Welcome to Workflow!</h1>
                    <div className='landingForm'>
                    <a href="/inputdata" class="btn btn-primary">Get started!</a>
                    </div>
                </div>
            </div>
        </div>

    )
}
