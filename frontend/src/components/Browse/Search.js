import React from 'react'
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
export default function Search(props) {
    let history = useHistory();
    const handleChange = event => props.setFilter(event.target.value);
    const onKeyDown = event => {

        if(event.key === 'Enter' ) {
            history.push(`/browse?name=${props.filter}`);
        }
    };
    return (
        <div>
            <TextField id="outlined-basic" label="Search" variant="outlined" value={props.filter} onChange={handleChange} onKeyDown={onKeyDown}/>
        </div>
    )
}
