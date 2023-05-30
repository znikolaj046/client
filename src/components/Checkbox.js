import { useContext } from 'react'
import { AppContext } from './AppContext.js'
import { useState } from 'react';
import { observer } from 'mobx-react-lite'
import base64 from 'react-native-base64'

const Checkbox = ({id, value}) => {
    const { catalog } = useContext(AppContext)
    const [checked, setChecked] = useState(true);

    function toggleChecked() {

        /*const value64 = id + '-is-' + base64.encode(value)        
        if (checked === false) {
            catalog.filterAdd({id : value64})    
        } else {
            catalog.filterRemove({id : value64})
        }*/
        console.log(checked)
        setChecked(!checked)
    }

    return (
        <label style={{display:'block'}}>
            <input
                type="checkbox"
                checked = {checked}
                onChange={toggleChecked(id, value)}
            />

            <span style={{marginLeft:'15px'}}>{value}</span>
        </label>
    )
    
}

export default Checkbox

