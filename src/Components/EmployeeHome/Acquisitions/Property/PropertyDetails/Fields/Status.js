import { ToggleButtonGroup, ToggleButton, } from "@mui/material";
import { useState } from "react";
import { updateProp } from "../../../../../../actions/properties";
import { teal } from "@mui/material/colors";


const Status = ({ prop, id, dispatch, user }) => {
    const [status, setStatus] = useState({ status: prop.status });
    let today = new Date();
    const newDate = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();
    const [ completionDate, setCompletionDate ] = useState({ completionDate: newDate })
    const handleStatus = (e) => {
        setStatus({ ...status, status: e.target.value })
    };
    const submitStatus = () => {
        dispatch(updateProp(id, status));
        if(status.status === 'closed') dispatch(updateProp(id, completionDate));
    }
    
  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <ToggleButtonGroup aria-label="Property Status" color='error' exclusive onChange={handleStatus} onBlur={submitStatus} fullWidth value={status.status} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
            <ToggleButton value='Active'>
                Active
            </ToggleButton>
            <ToggleButton value='Pending'>
            Pending
            </ToggleButton>
            <ToggleButton value='Closed'>
            Closed
            </ToggleButton>
            <ToggleButton value='Sidelined'>
            Sidelined
            </ToggleButton>
            <ToggleButton value='Cancelled'>
            Cancelled
            </ToggleButton>
            <ToggleButton value='Dead'>
            Dead
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.status} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton value='Active'>
                Active
            </ToggleButton>
            <ToggleButton value='Pending'>
            Pending
            </ToggleButton>
            <ToggleButton value='Closed'>
            Closed
            </ToggleButton>
            <ToggleButton value='Sidelined'>
            Sidelined
            </ToggleButton>
            <ToggleButton value='Cancelled'>
            Cancelled
            </ToggleButton>
            <ToggleButton value='Dead'>
            Dead
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default Status