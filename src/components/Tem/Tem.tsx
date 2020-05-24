import React from 'react'
import { Link } from 'react-router-dom'
import './tem.css'
import '../colores.css'
import LazyLoad from 'react-lazyload'

interface Props {
    data: any
}

interface State {
    baseUrl: any,
    tiposDeMap: any,

    handleLoad: Function
}

class Tem extends React.Component<Props, State> {
    constructor(props: any) {
        super(props)
        
        this.state={
            baseUrl: '',
            tiposDeMap: {},
   
            handleLoad: Function,
        }
        
    }
   

    componentDidMount(){

    }

    buscarTipos(data: any){
        let colores = ""
        for (const tipos of data) {
            colores = colores + tipos.name
        }
        return colores
    }

    render(){
        const {data} = this.props
        console.log(data)
        return(
            <div className="tem-container">
                {
                  data.filtrando.map((tem: any, key: any) => {
                      return (
                    <Link to={{
                        pathname: `/${tem.name}`,
                        state: {modal:true,
                            propiedades: tem,

                        },
                         }}  key={key} >
                       
                    <div className={`${this.buscarTipos(tem.types)} tem-normal` }>
                            <div className="titulo">
                                <h2>{tem.name}</h2>
                                <div className="tem-number">
                                    <span>
                                        {`#${tem.number}`}
                                    </span>
                            </div>
                            </div>
                            <div className="tem-normal-info">
                                <div className="tipos">
                                    {tem.types.map((tipos: any, llave: any)=>{
                                        return(
                                            <div key={llave} >
                                                <p>{tipos.name}</p>
                                                <LazyLoad height={data.alturaLoad} offset={data.offset}>
                                          
                                                    <img src={`${tipos.icon} `} className="tipo-icono" alt=""/>
                                                
                                                </LazyLoad>
                                            </div>
                                        )
                                    })}
                                </div>
                                <div>
                                    <LazyLoad height={data.alturaLoad} offset={data.offset}>
                                    {
                                        tem.newimagen.length > 0
                                        ? <img src={tem.newimagen[0].Ubicacion} className="tem-imagen" alt=""/>
                                        :<img src={tem.wikiPortraitUrlLarge} className="tem-imagen" alt=""/>
                                    }
                                    </LazyLoad>
                                </div>
                            </div>
                            <div>
                            
                            </div>
                        </div>
                        
                    </Link>
                    
                  )})
                }   
                
            </div>
        
        )
    }
}


                
                
                

export default Tem