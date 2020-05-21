import React from 'react'
import './Menu.scss'

interface Props {
    botonMenu: any
}

class MenuComponent extends React.Component<Props> {
    constructor(props: any) {
        super(props)
        this.state={
            
        }
    }

  render () {
    return (
        <button className="boton-toggle" onClick={this.props.botonMenu}>
            <div className="boton-toggle-lineas"></div>
            <div className="boton-toggle-lineas"></div>
            <div className="boton-toggle-lineas"></div>
        </button>
    );
  }
}

export default MenuComponent