import React, { useState, useEffect} from 'react';
    
const BASEURL = 'http://localhost:8075'

function GroupShow(props) {

  
    const [group, setGroup] = useState({ 
        on: props.group.action.attributes.on,
        bri: props.group.action.attributes.bri,
        id: props.group.attributes.attributes.id
    }); 

    useEffect(() => { setGroup({
            on: props.group.action.attributes.on,
            bri: props.group.action.attributes.bri,
            id: props.group.attributes.attributes.id
        })
    }, [props]);

    function toggleGroup() { 
        setGroup({...group, on: !group.on})
        props.updtGroup({...group, on: !group.on})
    }

    function updtGroup() { 
        props.updtGroup({...group})
    }

    const handleChange = (e) => {
        setGroup({ ...group, [e.target.name]: e.target.value });
    }

    return(
        <div>
        <table className="table table-sm table-condensed">
        <thead>
          <tr>
            <th>Group</th>
            <th>ID</th>
            <th>Type</th>
            <th>Class</th>
            <th>Bright</th>
            <th>Any on</th>
            <th>All on</th>
            <th>Updt</th>
            <th>Lights</th>
          </tr>
        </thead>
        <tbody>
        <tr >
            <td><input type="text" className="input-sm long" value={props.group.attributes.attributes.name} disabled /></td>
            <td><input type="text" className="input-sm short" value={props.group.attributes.attributes.id} disabled /></td>
            <td><input type="text" className="input-sm long" value={props.group.attributes.attributes.type} disabled /></td>
            <td><input type="text" className="input-sm long" value={props.group.attributes.attributes.class} disabled /></td>
            <td><input type="text" name="bri" className="input-sm short" value={group.bri} onChange={handleChange} /></td>
            <td><input type="text" className="input-sm short" value={props.group.state.attributes.any_on} disabled /></td>
            <td><input type="text" className="input-sm short" value={props.group.state.attributes.all_on} disabled /></td>
            <td><button className="btn btn-primary btn-sm" onClick={ (e) => updtGroup(e)}>
            <i style={{fontSize: "20px"}} className="material-icons vertical-align-middle">sync</i>
            </button></td>
            <td><button className={ `"btn btn-sm ${ group.on ? "btn-success" : "btn-secondary"} `} 
                onClick={ (e) => toggleGroup(e)}>
                <i style={{fontSize: "20px"}} className="material-icons vertical-align-middle">play_circle_outline</i>
            </button></td>
        </tr>
        </tbody></table>
        </div>
    )}

function LightShow(props) {

    const [light, setLight] = useState({ 
        id: props.light.attributes.attributes.id, 
        on: props.light.state.attributes.on,
        bri: props.light.state.attributes.bri
    }); 

    function toggleLight() { 
        setLight({...light, on: !light.on})
        props.updtLight({...light, on: !light.on})
    }

    function updtLight() { 
        props.updtLight({...light})
    }

    const handleChange = (e) => {
        setLight({ ...light, [e.target.name]: e.target.value });
    }

    var ingroup = props.lights.find( light => light === props.light.attributes.attributes.id )
    if (!ingroup) ingroup = 0
    
    return(
        <tr className={ `${ ingroup ? "table-active" : "none"} `} >
            <td><input type="text" className="input-sm long" value={props.light.attributes.attributes.name} disabled /></td>
            <td><input type="text" className="input-sm short" value={props.light.attributes.attributes.id} disabled /></td>
            <td><input type="text" className="input-sm long" value={props.light.attributes.attributes.type} disabled /></td>
            <td><input type="text" name="bri" className="input-sm short" value={light.bri} onChange={handleChange} /></td>
            <td><input type="text" className="input-sm short" value={props.light.state.attributes.hue} disabled /></td>
            <td><button className="btn btn-primary btn-sm" onClick={ (e) => updtLight(props.light,e)}>
                <i style={{fontSize: "20px"}} className="material-icons vertical-align-middle">sync</i>
            </button></td>
            <td><button className={ `"btn btn-sm ${ light.on ? "btn-success" : "btn-secondary"} `} 
                onClick={ (e) => toggleLight(light,e)}>
                <i style={{fontSize: "20px"}} className="material-icons vertical-align-middle">play_circle_outline</i>
            </button></td>
        </tr>
    )}

function GroupMenu(props) {

    const [hide, setHide] = useState(false); 

    function toggleHide() { setHide(!hide) }
    function setGroup(group) { props.setGroup(group) }


    return ( 
        <div>
            { /* eslint-disable-next-line */ }
            <a onClick={toggleHide}><i className="material-icons vertical-align-middle">folder</i>
                &nbsp;&nbsp;Groups</a><br/>
            { hide ? <div/> : props.groups.map(group => (
              /* eslint-disable-next-line */
            <a onClick={ (e) => setGroup(group,e)} key={group.attributes.attributes.id} 
                style={{ color:  props.group.attributes.attributes.id === group.attributes.attributes.id ? "red" : "blue" }}>
            <i style={{fontSize: "16px"}} className="material-icons vertical-align-middle">location_searching</i>
                &nbsp;&nbsp;{group.attributes.attributes.name }<br/>
            </a>   ) ) }
        </div>
    )
}

function LightMenu(props) {

    const [curlight, setCurlight] = useState({id: 0}); 
    const [hide, setHide] = useState(false); 

    function toggleHide() { setHide(!hide) }
    function setLight(light) { setCurlight(light.attributes.attributes) }


    return ( 
        <div>
            { /* eslint-disable-next-line */ }
            <a onClick={toggleHide}><i className="material-icons vertical-align-middle">folder</i>
                &nbsp;&nbsp;Lights</a><br/>
            { hide ? <div/> : props.lights.map(light => (
              /* eslint-disable-next-line */
            <a onClick={ (e) => setLight(light,e)} key={light.attributes.attributes.id} 
                style={{ color:  curlight.id === light.attributes.attributes.id ? "red" : "blue" }}>
            <i style={{fontSize: "16px"}} className="material-icons vertical-align-middle">location_searching</i>
                &nbsp;&nbsp;{light.attributes.attributes.name }<br/>
            </a>   ) ) }
        </div>
    )
}

export default function Menu(props) {


    const [hide, setHide] = useState(false); 
    const [groups, setGroups] = useState([]); 
    const [lights, setLights] = useState([]); 
    const [group, setGroup] = useState({ 
        attributes: { attributes: {id: 0, name: "None", class: "None", lights: [], type: 'None'}},
        state: { attributes: { any_on: false, all_on: false}},
        action: { attributes: { bri: 0} }
    }); 

    useEffect(() => { loadItems('groups',setGroups); }, []);
    useEffect(() => { loadItems('lights',setLights); }, []);

    function toggleHide() { setHide(!hide) }
    function updtLight(light) { putItem('light',light) }
    function updtGroup(group) { putItem('group',group) }
    function setTheGroup(group) { setGroup(group) }

    function loadItems(type,setFunc) {
        var url = `${BASEURL}/${type}`
        fetch(url).then( response => {
            if (response.ok) {
                response.json().then(
                result =>  { setFunc(result) }); 
                }
            else
                throw new Error(response.status+' '+response.statusText);
            }).catch( () => { setFunc([]) })
    }

   function putItem(type,item) {
        var url = `${BASEURL}/${type}`
        fetch(url,{ method: "PUT", body: JSON.stringify(item),
            headers: {'Content-Type': 'application/json'}
        }).then( response => {
            if (response.ok) {
                response.json().then(
                    result =>  { console.log("Put result ",result) }); 
                    }
            else
                throw new Error(response.status+' '+response.statusText);
            }).catch( () => { console.log("Error") }
          )
      }

    return(
        <div className="row">
            <div className="col-md-2">
            <div className="card" style={{ backgroundColor: "#f0f0f0"}}>
            <div className="card-body">
                <GroupMenu groups={ groups } group={group} setGroup={setTheGroup}/>
                <LightMenu lights={ lights } />
                { /* eslint-disable-next-line */ }
                <a onClick={toggleHide}><i className="material-icons vertical-align-middle">folder</i>
                    &nbsp;&nbsp;Login</a><br/>
            </div>
            </div>
            </div>
 
            <div className="col-md-10">
            <div className="card" style={{ backgroundColor: "#f0f0f0"}}>
            <div className="card-body">
                <GroupShow group={group} updtGroup={updtGroup}/><hr/>
                <table className="table table-sm table-condensed">
                <thead>
                <tr>
                    <th>Light</th>
                    <th>ID</th>
                    <th>Type</th>
                    <th>Bright</th>
                    <th>Hue</th>
                    <th>Updt</th>
                    <th>Light</th>
                </tr>
                </thead>
                <tbody>
                { lights.map(light => (
                <LightShow key={light.attributes.attributes.id} light={ light } lights={ group.attributes.attributes.lights } updtLight={updtLight} /> )) }
                  </tbody></table>
            </div>
            </div>
            </div>
    </div>
    )
}
