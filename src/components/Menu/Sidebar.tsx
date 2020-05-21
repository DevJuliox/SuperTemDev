import React from 'react'
import './Menu.scss'
import LazyLoad from 'react-lazyload'
const Sidebar = (props: any) =>{
    let activo = 'sidebar'
    if(props.show){
        activo = 'sidebar activo'
    }
    return(
        <nav className={activo} >
            <div className="side-header">
            <LazyLoad height={50} offset={50}>
                <img src="./images/pvp.jpg" alt=""/>
            </LazyLoad>
            </div>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/Techniques">Techniques</a>
                </li>
            </ul>
        </nav>
    )
    
}

export default Sidebar