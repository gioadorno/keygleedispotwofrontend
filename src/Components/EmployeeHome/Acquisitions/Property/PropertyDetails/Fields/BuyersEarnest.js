import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const BuyersEarnest = ({ prop, id, dispatch, user }) => {
    const handleBuyersEarnest = async (e) => {
        dispatch(updateProp(id, {buyersEarnest: e.target.value})).then(() => window.location.reload(false));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <ToggleButtonGroup color='error' exclusive onChange={handleBuyersEarnest} fullWidth value={prop.buyersEarnest} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Needed'>
            Needed
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Deposited'>
            Deposited
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='In Dispute'>
            In Dispute
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Released'>
            Released
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Seized'>
            Seized
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Not Required'>
            Not Required
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.buyersEarnest} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Needed'>
            Needed
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Deposited'>
            Deposited
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='In Dispute'>
            In Dispute
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Released'>
            Released
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Seized'>
            Seized
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Not Required'>
            Not Required
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default BuyersEarnest