import React from 'react'
import './evolutions.scss'
import './teminfo.scss'
interface Props {
    Evolutions: any
}

interface State {
  //empty in our case
}

class Evolutions extends React.Component<Props, State> {
  constructor(props: any){
    super(props)
    this.state = {
    }
  }  

  agregarPunto(total: any){
      let letra = total.toString()
   let final = letra.slice(0, -1) + '.' + letra.slice(-1)
   return final
  }
  render() {
    const {Evolutions} = this.props
    //   const atk = Evolutions.stats.atk
    //   const def = Evolutions.stats.def
    //   const hp = Evolutions.stats.hp
    //   const spatk = Evolutions.stats.spatk
    //   const spd = Evolutions.stats.spd
    //   const spdef = Evolutions.stats.spdef
    //   const sta = Evolutions.stats.sta
    //   const total = Evolutions.stats.total

      // const atk = Evolutions.evolution.stats.atk
      // const def = Evolutions.evolution.stats.def
      // const hp = Evolutions.evolution.stats.hp
      // const spatk = Evolutions.evolution.stats.spatk
      // const spd = Evolutions.evolution.stats.spd
      // const spdef = Evolutions.evolution.stats.spdef
      // const sta = Evolutions.evolution.stats.sta
      // const total = Evolutions.evolution.stats.total
      console.log(Evolutions)
    return(
      <div className="evolutions">
        <div className="tem-izquierdo">

        {
                Evolutions.evolution.evolutionTree.map((item:any, key:any) =>{
                    return(
                        
                            <div key={key}>
                                {
                                    Evolutions.evolution.stage === item.stage && <div> 
                                        <img src={item.imagenEvolution[0].Ubicacion} className="tem-imagen" alt=""/> 
                                        <p>{item.name}</p>
                                        </div>
                                
                                }
                            </div>

                    )
                })
            }

        </div>
        <div className="tem-derecho">
        {
                Evolutions.evolution.evolutionTree.map((item:any, key:any) =>{
                    return(
                        
                            <div key={key}>
                                {
                                    Evolutions.evolution.stage === item.stage && <div> 
                                        <img src={item.imagenEvolution[0].Ubicacion} className="tem-imagen" alt=""/> 
                                        <p>{item.name}</p>
                                        </div>
                                
                                }
                            </div>

                    )
                })
            }
        </div>


  </div>
    )
  }
}
export default Evolutions