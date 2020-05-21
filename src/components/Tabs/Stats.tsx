import React from 'react'
interface Props {
    Stats: any
}

interface State {
  //empty in our case
}

class Stats extends React.Component<Props, State> {
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
      const {Stats} = this.props
      const atk = Stats.atk
      const def = Stats.def
      const hp = Stats.hp
      const spatk = Stats.spatk
      const spd = Stats.spd
      const spdef = Stats.spdef
      const sta = Stats.sta
      const total = Stats.total
    return(
        <div className="list">
            <div className="list-item stats">
                        <div className="list-item-nieto">Hp</div>
                        <div className="list-item-nieto">
                        {`${hp}`}
                        </div>
                        <div className="barra">
                            <div className={`barra-color${hp <= 50 ? '-red': hp <= 80 ? '-orange': hp <= 100 ? '-green' : '' }`} style={{width: `${hp}%`}}>

                            </div>
                        </div>
                </div>
                <div className="list-item stats">
                        <div className="list-item-nieto">Attack</div>
                        <div className="list-item-nieto">
                        {`${Stats.atk}`}
                        </div>
                        <div className="barra">
                            <div className={`barra-color${atk <= 50 ? '-red': atk <= 80 ? '-orange': atk <= 100 ? '-green' : '' }`} style={{width: `${atk}%`}}>

                            </div>
                        </div>
                </div>
                <div className="list-item stats">
                        <div className="list-item-nieto">Defense</div>
                        <div className="list-item-nieto">
                        {`${def}`}
                        </div>
                        <div className="barra">
                            <div className={`barra-color${def <= 50 ? '-red': def <= 80 ? '-orange': def <= 100 ? '-green' : '' }`} style={{width: `${def}%`}}>

                            </div>
                        </div>
                </div>
                
                <div className="list-item stats">
                        <div className="list-item-nieto">Sp. Atk</div>
                        <div className="list-item-nieto">
                        {`${spatk}`}
                        </div>
                        <div className="barra">
                            <div className={`barra-color${spatk <= 50 ? '-red': spatk <= 80 ? '-orange': spatk <= 100 ? '-green' : '' }`} style={{width: `${spatk}%`}}>

                            </div>
                        </div>
                </div>
                <div className="list-item stats">
                        <div className="list-item-nieto">Sp. Def</div>
                        <div className="list-item-nieto">
                        {`${spdef}`}
                        </div>
                        <div className="barra">
                            <div className={`barra-color${spdef <= 50 ? '-red': spdef <= 80 ? '-orange': spdef <= 100 ? '-green' : '' }`} style={{width: `${spdef}%`}}>

                            </div>
                        </div>
                </div>
                <div className="list-item stats">
                        <div className="list-item-nieto">Speed</div>
                        <div className="list-item-nieto">
                        {`${spd}`}
                        </div>
                        <div className="barra">
                            <div className={`barra-color${spd <= 50 ? '-red': spd <= 80 ? '-orange': spd <= 100 ? '-green' : '' }`} style={{width: `${spd}%`}}>

                            </div>
                        </div>
                </div>
                
                <div className="list-item stats">
                        <div className="list-item-nieto">Stamina</div>
                        <div className="list-item-nieto">
                        {`${sta}`}
                        </div>
                        <div className="barra">
                            <div className={`barra-color${sta <= 50 ? '-red': sta <= 80 ? '-orange': sta <= 100 ? '-green' : '' }`} style={{width: `${sta}%`}}>

                            </div>
                        </div>
                </div>
                <div className="list-item stats">
                        <div className="list-item-nieto">Total</div>
                        <div className="list-item-nieto">
                        {`${total}`}
                        </div>
                        <div className="barra">
                            <div className={`barra-color${total <= 400 ? '-red': total <= 500 ? '-orange': total <= 700 ? '-green' : '' }`} style={{width: `${this.agregarPunto(total)}%`}}>

                            </div>
                        </div>
                </div>
                </div>
    )
  }
}
export default Stats