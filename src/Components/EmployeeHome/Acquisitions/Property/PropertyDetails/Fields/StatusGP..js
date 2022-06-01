import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const StatusGP = ({ prop, id, dispatch, user }) => {
    const handleStatusGP = async (e) => {
        dispatch(updateProp(id, {statusGP: e.target.value})).then(() => window.location.reload(false));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <ToggleButtonGroup color='error' aria-label="Status of Actual Gross Profit" exclusive onChange={handleStatusGP} fullWidth value={prop.statusGP} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Needed'>
            Needed
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Received'>
            Received
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Deposited'>
            Deposited
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.statusGP} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Needed'>
            Needed
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Received'>
            Received
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Deposited'>
            Deposited
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default StatusGP