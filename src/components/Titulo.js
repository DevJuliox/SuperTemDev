import React from 'react'
import ProptTypes from 'prop-types'

const Titulo = ({children}) => <h1>{children}</h1>

Titulo.ProptTypes = {
    children: ProptTypes.string
}

export default Titulo