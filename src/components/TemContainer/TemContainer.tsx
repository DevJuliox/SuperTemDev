import React from 'react'
import Tem from '../Tem/Tem'
import { getTems, getTemsTyipos } from '../../services/getTem'
import Titulo from '../Titulo'
import  './temcontainer.css'
import '../colores.css'
import MenuComponent from '../Menu/MenuComponent'
import {Tems } from './Imagenes'
import Sidebar from '../Menu/Sidebar'
import Backdrop from '../Menu/Backdrop'
import LazyLoad from 'react-lazyload';
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
    offset: any

}
class TemContainer extends React.Component<Props, State> {
    constructor (props: any) {
        super(props)
        this.state = {
            temTipyImg: [],
            isFetch: true,
            losTiposNuevos: [],
            conDesconocido: [],
            filtrarPorTipo: [],
            sacandoTipos: [],
            location: [],
            filtrando: [],
            baseUrl: 'https://temtem-api.mael.tech',
            sideBarOpen: false,
            alturaLoad: '50',
            offset: '50'
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
              console.log("SW registration failed")
            }
          }
        }
        
    

        try {
        let {losTiposNuevos, temTipyImg} = this.state
        const todosLosTem = await getTems()
        const todosLosTipos = await getTemsTyipos()
        let Unknown =  {name: 'Unknown', icon: './iconos/unknown.png'}
        todosLosTipos.push(Unknown)
            
            losTiposNuevos = todosLosTipos.reduce(function(arregloTipos: any, img: any ) {
                let key = img.name
                let esxisteTipo = key in arregloTipos
                if(!esxisteTipo){
                    arregloTipos[key] = img
                }
                return {...arregloTipos}
            }, {})
            
            this.setState({
               losTiposNuevos
               
            })

            temTipyImg = todosLosTem.map(function(unSoloTem: any) {
                let types = unSoloTem.types.map(function(estoEsTipo: any, llave: any){
                  return  losTiposNuevos[estoEsTipo]
                })
                
                return {...unSoloTem, types }
            })
            for (const i in temTipyImg) {
                temTipyImg[i].newimagen=[]/** se le agrego el nuevo atributno new imagen
                Se hizo array para que se le agreguen varias imagenes* */
            }
        
             for (const i in temTipyImg) {/**en cada elemento se busca que el nombre sea igual al nombre de json de imagenes,si es igual se inserta la nueva ruta */
                for (const j in Tems) {
                    if (temTipyImg[i].name===Tems[j].name) {/**aqui recore el array Tems para compararlo con el nombre del array principal */
                        temTipyImg[i].newimagen.push(Tems[j])/**se le hace un push al atributo imagen* */
                    }
                }
            }

            temTipyImg.forEach((element1:any,i: any) => {
                if (element1.evolution.evolves!==false) {
                    element1.evolution.evolutionTree.forEach((element: any,j: any) => {
                        temTipyImg[i].evolution.evolutionTree[j].imagenEvolution={}/**Se agrega el nuevo campo imagenEvolution y stats al array de evoluciones* */
                        temTipyImg[i].evolution.evolutionTree[j].stats={}
                    });
                }
               
            });

            temTipyImg.forEach((element1:any,i: any) => {
                if (element1.evolution.evolves!==false) {/*se valida que el pokemon tenga evoluciones** */
                    element1.evolution.evolutionTree.forEach((element2: any,k: any) => {/** si tiene evoluciones se hace un array a sus evoluciones */
                        temTipyImg.forEach((element3: any) => {/**Se recorre el array original* */
                            if (element3.name===element2.name) {/** se valida que el nombre de la evolucion sea igual al nombre del pokemon del array original* */
                                if (element3.newimagen.length===0) {/***se valida que el campo new imagen tenga informacion */
                                    temTipyImg[i].evolution.evolutionTree[k].stats=element3.stats
                                    temTipyImg[i].evolution.evolutionTree[k].imagenEvolution=element3.icon/**si tiene informacion se inserta la nueva imagen** */
                                }else {/**si no tiene informacion se inserta la imagen vieja* */
                                    temTipyImg[i].evolution.evolutionTree[k].stats=element3.stats
                                    temTipyImg[i].evolution.evolutionTree[k].imagenEvolution=element3.newimagen
                                }
                            }
                        });
                    });
                }
               
            });
        
            this.setState({
               temTipyImg,
               filtrando: temTipyImg
            })

        } catch (error) {
            console.log("es el error de todos los tem",error)
        }
        
        this.setState({
            isFetch: !this.state.isFetch,
            
        })
         
     }
    componentDidUpdate(){
    }
    handleSearch(search: any){

    }
    filtrar(elTipo:any){
        let {temTipyImg} = this.state
        let filtrando = temTipyImg
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

        const { isFetch, filtrando, losTiposNuevos, baseUrl, sideBarOpen, alturaLoad, offset } = this.state
        this.filtrar = this.filtrar.bind(this)
        const propiedades ={
            filtrando,
            alturaLoad,
            offset
        }
        return(
            <>
            
            <div className="header">
            <MenuComponent  botonMenu={this.botonMenu}/>
            <Sidebar show={this.state.sideBarOpen}/> 
      
            {
                sideBarOpen && <Backdrop click={this.backdropPresionado}/>
            }
            <Link to="/">
                <img src={`./iconos/Super192.png`} className="tipo-icono" alt=""/>
            </Link>
                
            </div>
            <div>
                <div className="tipos-container">
                    {
                        Object.keys(losTiposNuevos).map((key:any) =>{
                            return(
                                <button className={`${losTiposNuevos[key].name} boton-filtro`}  onClick={() => this.filtrar(key)}>
                                        <div>
                                        {/* <p>{losTiposNuevos[key].name}</p> */}
                                        <LazyLoad height={alturaLoad} offset={offset}>
                                        {
                                            losTiposNuevos[key].name === 'Unknown' 
                                            ? <img src={`${losTiposNuevos[key].icon}`} className="tipo-icono" alt=""/>
                                            : <img src={`${baseUrl}${losTiposNuevos[key].icon}`} className="tipo-icono" alt=""/>
                                        }
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
            {/* <button onClick={() => this.filtrar("Digital")}>Digital</button>
            <button onClick={() => this.filtrar("Water")}>Water</button>
            <button onClick={() => this.filtrar("Fire")}>Fire</button>
            <button onClick={() => this.filtrar("borrar")}>Todos</button>
            <button onClick={() => this.filtrar("Toxic")}>Toxic</button> */}
            </div>
            <Titulo>Tems</Titulo>
            {/* <Search handleSearch={this.handleSearch}/> */}
            {
                isFetch && <div>cargando</div>
            }

            <Tem data={propiedades}  />
            </>
        ) 
    }
}

export default TemContainer