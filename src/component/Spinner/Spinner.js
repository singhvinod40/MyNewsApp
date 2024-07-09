import React, { Component } from 'react'
import PropTypes from 'prop-types'
import loader from './spiner.gif'; 

export class Spinner extends Component {
    static propTypes = {

    }

    render() {
        return (
            <div className='text-center'>
            <img src={loader} alt='loading' width={80}height={80}></img>         
            </div>
        )
    }
}

export default Spinner
