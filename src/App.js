import React, { useState } from 'react';
import logo from './pilogo.png';
import Menu from './menu';
import './App.css';

function App() {    

  const [servdata, setServdata] = useState({ version: "1.0.0", servtime: null, pihost: "" }); 

       return(
         <div style={{marginLeft: "5px", marginRight: "8px"}}>

          <div className="row">
            <div className="col-md-2">
                <button className="btn btn-outline-secondary btn-sm" style={{ marginTop: '10px' }} data-toggle="collapse">
                <i className="material-icons vertical-align-middle">menu</i></button>
                <img src={ logo } alt="logo" 
                    style={{ height: '55px', paddingTop: '5px' }}/>
            </div>
          
            <div className="col-md-2">
                <h3 style={{ paddingTop: '8px' }}>PI Web Control</h3></div>
            <div className="col-md-2">
                <h3 style={{ paddingTop: '8px' }}>Version { servdata.version }</h3></div>
          </div>

          <Menu pihost={servdata.pihost}></Menu>
      
        </div>
       )
   }

export default App;
