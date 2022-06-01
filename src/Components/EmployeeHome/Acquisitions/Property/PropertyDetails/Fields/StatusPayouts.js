import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const StatusPayouts = ({ prop, id, dispatch, user }) => {
    const handleStatusPayouts = async (e) => {
        dispatch(updateProp(id, {statusPayouts: e.target.value})).then(() => window.location.reload(false));
    };

  return (
user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <ToggleButtonGroup color='error' aria-label="Status of Payouts" exclusive onChange={handleStatusPayouts} fullWidth value={prop.statusPayouts} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Payouts (If Any) need to be Sent'>
            Payouts (If Any) need to be Sent
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Payouts have been Mailed/Picked Up'>
            Payouts have been Mailed/Picked Up
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='All Payouts (If Any) have Cleared the Account'>
            All Payouts (If Any) have Cleared the Account
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.statusPayouts} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Payouts (If Any) need to be Sent'>
            Payouts (If Any) need to be Sent
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Payouts have been Mailed/Picked Up'>
            Payouts have been Mailed/Picked Up
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='All Payouts (If Any) have Cleared the Account'>
            All Payouts (If Any) have Cleared the Account
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default StatusPayouts