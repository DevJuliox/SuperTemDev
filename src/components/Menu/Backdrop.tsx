import React from 'react'
import './Menu.scss'

const Backdrop = (props: any) =>{
    return(
       <div className="backdrop" onClick={props.click}></div>
    )
    
}

export default Backdrop

