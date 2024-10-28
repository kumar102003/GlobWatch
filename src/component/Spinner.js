import React, { Component } from 'react'
import spin from "./spin.gif"
export default class Spinner extends Component {
  render() {
    return (
        <div className='text-centre' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
  <img src={spin} alt="loading" style={{ width: '80px', height: '80px' }} />
</div>

      
    )
  }
}
