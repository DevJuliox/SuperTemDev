import React from 'react'
import Tem from '../Tem/Tem'
import Titulo from '../Titulo'
import  './temcontainer.css'
import '../colores.css'
import MenuComponent from '../Menu/MenuComponent'
import {nuevosIconos } from './Imagenes'
import {todosLosTems} from './TodosLosTems'
import Sidebar from '../Menu/Sidebar'
import Backdrop from '../Menu/Backdrop'
import LazyLoad from 'react-lazyload'
import { Link } from 'react-router-dom'
// import { Switch, Route } from 'react-router-dom';
// import ModalTem from './ModalTem'
// import Search from './Search'

interface Props {
    data: any
    pageWrapId: any
    botonMenu: any
}

interface State {
    temTipyImg: any,
    isFetch: Boolean,
    losTiposNuevos: any,
    conDesconocido: any
    filtrarPorTipo: any
    sacandoTipos: any
    location: any
    filtrando: any
    baseUrl: any
    sideBarOpen: any
    alturaLoad: any
    offset: any,
    hasFetched: any

}
class TemContainer extends React.Component<Props, State> {

    constructor (props: any) {
        super(props)
        this.state = {
            temTipyImg: [],
            isFetch: true,
            losTiposNuevos: nuevosIconos,
            conDesconocido: [],
            filtrarPorTipo: [],
            sacandoTipos: [],
            location: [],
            filtrando: [],
            baseUrl: 'https://temtem-api.mael.tech',
            sideBarOpen: false,
            alturaLoad: 80,
            offset: 400,
            hasFetched: false
        }
    
    }




    async componentDidMount(){
        window.addEventListener('load', () =>{
            registerSW();
        })
        
        async function registerSW(){
          if('serviceWorker' in navigator) {
            try { 
              await navigator.serviceWorker.register('./sw.js')
            } catch(e){
              console.log("SW registration failed", e)
            }
          }
        }

            this.setState({
               filtrando: todosLosTems,
               isFetch: !this.state.isFetch,
            })
        
         
     }

     shouldComponentUpdate(nextProps:any, nextState: any) {
        if ( this.state.hasFetched ) {
          return false;
        }
        return true;
      }

    filtrar(elTipo:any){

        console.log(this.state.hasFetched)
        let filtrando = todosLosTems
        // let tipo1 = elTipo

        if(elTipo ==="borrar"){
            this.setState({
                filtrando
            })  
        }
        else{

            let filtrado =  filtrando.filter((tem: any) =>
            tem.types.some((tipos: any) =>  tipos.name === elTipo))
            .map((tem: any) => {
                let nuevosTem = {...tem}
                return nuevosTem
            })

            this.setState({
  
                filtrando: filtrado
            })
        
        }
        

        
    }



    botonMenu =() =>{
        this.setState((prevState) =>{
            return { sideBarOpen: !prevState.sideBarOpen}
        })
    }
    backdropPresionado =() =>{
        this.setState({
            sideBarOpen: false
        })
    }
    render ()  {

        const { filtrando, losTiposNuevos, sideBarOpen, alturaLoad, offset } = this.state
        this.filtrar = this.filtrar.bind(this)
        const propiedades ={
            filtrando,
            alturaLoad,
            offset
        }


        return(
            <>
            <div className="max">
            <div className="header">
                <MenuComponent  botonMenu={this.botonMenu}/>
                <Sidebar show={this.state.sideBarOpen}/> 
        
                {
                    sideBarOpen && <Backdrop click={this.backdropPresionado}/>
                }
                <Link to="/">
                    <img src={`./iconos/Logo.png`} className="tipo-icono-logo" alt=""/>
                </Link>
                
            </div>
            <div>
                <div className="tipos-container">
                    {
                        Object.keys(losTiposNuevos).map((key:any) =>{
                            return(
                                <button key={key} className={`${losTiposNuevos[key].name} boton-filtro`} aria-label={losTiposNuevos[key].name}  onClick={() => this.filtrar(key)}>
                                        <div>
                                        {/* <p>{losTiposNuevos[key].name}</p> */}
                                        <LazyLoad height={alturaLoad} offset={offset}>
                                        
                                            <img src={`${losTiposNuevos[key].icon}`} className="tipo-icono" alt=""/>
                                        
                                        </LazyLoad>
                                        </div>
                                </button>
                            )
                        })
                    }
                    <button className={`boton-filtro`}  onClick={() => this.filtrar("borrar")}>
                                        <div>
                                        {/* <p>All Tem</p> */}
                                  
                                        <img src={`./iconos/all.png`} className="tipo-icono" alt=""/>
            
                                        </div>
                                </button>
      
                </div>
            </div>
            <Titulo>Tems</Titulo>
            {/* {
                isFetch && <div className="loader" title="3">
                                  <svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                                width="40px" height="40px" viewBox="0 0 40 40" enable-background="new 0 0 40 40" xmlSpace="preserve">
                                <path opacity="0.2" fill="#000" d="M20.201,5.169c-8.254,0-14.946,6.692-14.946,14.946c0,8.255,6.692,14.946,14.946,14.946
                                    s14.946-6.691,14.946-14.946C35.146,11.861,28.455,5.169,20.201,5.169z M20.201,31.749c-6.425,0-11.634-5.208-11.634-11.634
                                    c0-6.425,5.209-11.634,11.634-11.634c6.425,0,11.633,5.209,11.633,11.634C31.834,26.541,26.626,31.749,20.201,31.749z"/>
                                <path fill="#000" d="M26.013,10.047l1.654-2.866c-2.198-1.272-4.743-2.012-7.466-2.012h0v3.312h0
                                    C22.32,8.481,24.301,9.057,26.013,10.047z">
                                    <animateTransform attributeType="xml"
                                    attributeName="transform"
                                    type="rotate"
                                    from="0 20 20"
                                    to="360 20 20"
                                    dur="0.5s"
                                    repeatCount="indefinite"/>
                                    </path>
                                </svg>
                            </div>
            } */}

            <Tem data={propiedades}  />
            </div>
            </>
        ) 
    }
}

export default TemContainer