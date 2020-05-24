import React from 'react';
import { Link } from 'react-router-dom'
import './modal.css'


var ModalTem = ({location}: any) => {
  const { state = { } } = location;
  const { modal } = state;
  return (
      <>
    <div className={modal ? "modal" : undefined}>
      {modal && <Link to="/" >Close</Link>}
      </div>
      <div>
          <h1>{modal.name}</h1>
      </div>
    </>
  )
}

export default ModalTem;