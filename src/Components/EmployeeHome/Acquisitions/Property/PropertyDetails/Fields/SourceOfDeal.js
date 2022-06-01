import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";


const SourceOfDeal = ({ prop, id, dispatch, user }) => {
    const handleSupplier = async (e) => {
        dispatch(updateProp(id, {supplier: e.target.value})).then(() => window.location.reload(false));
    };
  return (

    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <ToggleButtonGroup color='error' aria-label="Property Status" exclusive onChange={handleSupplier} fullWidth value={prop.supplier} sx={{ mb: 0, alignItems: 'center' }} variant='outlined'>
            <ToggleButton value='Wholesaler'>
            Wholesaler
            </ToggleButton>
            <ToggleButton value='Agent'>
            Agent
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' InputProps={{readOnly: true}} exclusive fullWidth value={prop.supplier} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton value='Active'>
                Wholesaler
            </ToggleButton>
            <ToggleButton value='Agent'>
                Agent
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default SourceOfDeal