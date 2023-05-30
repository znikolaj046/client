import { useContext } from 'react'
import { useState } from 'react';
import { AppContext } from './AppContext.js'
import { observer } from 'mobx-react-lite'
import base64 from 'react-native-base64'

const SmartFilter = observer(() => {    
    const { catalog } = useContext(AppContext)
    const [checked, setChecked] = useState([]);

    const handleCheck = (event) => {
        let updatedList = [...checked];
        if (event.target.checked) {
          updatedList = [...checked, event.target.value];
        } else {
          updatedList.splice(checked.indexOf(event.target.value), 1);
        }
        
        catalog.filter = updatedList

        setChecked(updatedList)
    };

    return (
        <div>
            {catalog.properties.map(item =>
                <div key={item.id}>
                    <strong>{item.name}</strong>
                    {item.values.map(value =>

                        <label style={{display:'block'}} key={item.id + '-is-' + base64.encode(value)}>
                            <input onChange={handleCheck}
                                type="checkbox"
                                value={item.id + '-is-' + base64.encode(value)}
                            />            
                            <span style={{marginLeft:'15px'}}>{value}</span>
                        </label>
                    )}

                </div>
            )}

        </div>
    )
})

export default SmartFilter