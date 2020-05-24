import React from 'react'
import { Link } from 'react-router-dom'

import '../colores.css'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import 'react-tabs/style/react-tabs.css'
import './teminfo.scss'
import Stats from '../Tabs/Stats'
import Evolutions from './Evolutions'
import './modal.scss'
interface Props {
    match: any
    location: any
    propiedades: any
}

interface State {
    modal: any
    datos: any
    
}

class TemModal extends React.Component<Props, State>  {
    constructor(props: any) {
        super(props)
        this.state={
            modal: props.location.state.modal,
            datos: props.location.state.propiedades
        }
    }

    componentDidMount(){
        // const { match: { params } } = this.props
        // const baseUrl = 'https://temtem-api.mael.tech'
    }

    buscandoColores(data: any){
        let colores = ""
        for (const tipos of data) {
            colores = colores + tipos.name
        }
        return colores
    }
    render(){

        const {datos, modal} = this.state
       
        return (
            <>
            <div className="max">
           <div className={`${this.buscandoColores(datos.types)} tem-info`}>
            <div className="close"> 
                {modal && <Link to="/" ><img src="./iconos/back.png" alt=""/></Link>}
            </div>
            <div className="nombre">
                <h1>{datos.name}</h1>
                <div className="numero">
                    <span >{`#${datos.number}`}</span>
                </div>
            </div>
            <div className="tipos">
                {datos.types.map((tipos: any, llave: any)=>{
                    return(
                        <div key={llave} >
                            <p>{tipos.name}</p>
                            <img src={`${tipos.icon}`} className="tipo-icono" alt=""/>
                        </div>
                    )
                })}
            </div>
            <div className="imagen-principal">
                {
                    datos.newimagen.length > 0
                    ? <img src={`${datos.newimagen[0].Ubicacion}`} className="tem-imagen" alt=""/>
                    :<img src={datos.wikiPortraitUrlLarge} className="tem-imagen" alt=""/>
                }
                
            </div>
            </div>
            <div className="tem-tabs">
            <Tabs>
                <TabList>
                    <Tab>About</Tab>
                    <Tab>Base Stats</Tab>
                    {
                        datos.evolution.evolves && <Tab>Evolution</Tab>
                    }
                    
                    <Tab>Moves</Tab>
                </TabList>

                <TabPanel>
                <div className="list">
                        <p className="descripcion">{datos.gameDescription}</p>
                        <div className="flotante">
                            <p>Characteristics</p>
                            <div className="de-lado">
                                <div className="">
                                    <div className="titulo"> Height</div>
                                    <div className="">
                                    {`${datos.details.height.inches}*`}
                                    {` (${datos.details.height.cm})cm`}
                                    </div>
                                </div>
                                <div className="">
                                    <div className="titulo">Weight</div>
                                    <div className="">
                                    {`${datos.details.weight.lbs}lbs`}
                                    {` (${datos.details.weight.kg})kg`}
                                    </div>
                                </div>
                            </div>
                            <div className="de-lado">
                                <div className="">
                                    <div className="titulo"> CatchRate</div>
                                    <div className="">
                                    {`${datos.catchRate}`}
                                    </div>
                                </div>
                                <div className="">
                                    <div className="titulo">Gender</div>
                                    <div className="genero">
                                        <div >
                                            <img src="./iconos/woman.png" alt=""/>
                                            {datos.genderRatio.female} 
                                        </div>
                                        <div>
                                            <img src="./iconos/man.png" alt=""/>
                                            {datos.genderRatio.male}
                                        </div>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flotante">
                            <p>Traits</p>
                            <div className="de-lado">
                                
                                    {datos.traits.map((item:any, key:any)=>{
                                        return(
                                            <div className="titulo" key={key}>{item}</div>
                                        )
                                    })}
                                    
                            </div>
                        </div>
                        <div className="flotante">
                            <p>Trivia</p>
                            <div className="de-lado">
                                {
                                    datos.trivia.map((item:any, key: any) =>{
                                        return(
                                            <div className="">
                                    <div className="titulo">{item}</div>
    
                                </div>
                                        )
                                    })
                                }
                            </div>

                        </div>
                
                    
                </div>
                </TabPanel>
                <TabPanel>
                <Stats Stats={datos.stats}  />
                </TabPanel>
                    {
                        datos.evolution.evolves && <TabPanel>
                         <Evolutions Evolutions={datos} />
                        </TabPanel>
                    }
                
                <TabPanel>
                <p>Working</p>
                </TabPanel>
            </Tabs>
            </div>
            </div>
            </>
        )
    }
}

  export default TemModal