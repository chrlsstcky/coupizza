import React from 'react'; 
import queryString from 'query-string'; 
import 'whatwg-fetch'; 
import MapComp from './Map'

import Loading from './renderers/Loading.js'
import Codes from './renderers/Codes.js'
import NoCodes from './renderers/NoCodes.js'

var GoogleMapsLoader =  require('google-maps')

class Codelist extends React.Component{
  constructor(){
    super()
    this.state={
      isLoading: true,
      latitude: 0,
      longitude: 0,
      codes: [] 
    } 
    this.componentDidMount = this.componentDidMount.bind(this)
  }
  componentDidMount(){
    fetch('/api/codelist' + this.props.location.search) 
      .then((res)=>{
        return res.json() 
      })
      .then((arr)=>{
        this.setState({
          isLoading: false,
          codes: arr.codelist,
          longitude: arr.longitude,
          latitude: arr.latitude
        }) 
      })
  }
  render(){
    return (
      <div id='codelistContainer'>
        <div id='header'>
          <h4>Codes available in your area:</h4>
        </div>
        <div id='codelist'>
          <ul className="codesLi">
            {Loading(this.state.isLoading)} 
            {Codes(this.state.codes)}
            {NoCodes(this.state.codes, this.state.isLoading)}
          </ul>
          <div id='spacer'>
            <MapComp lati={this.state.latitude} long={this.state.longitude}/>
          </div>
        </div>
      </div>
    )
  }
}

module.exports = Codelist; 
