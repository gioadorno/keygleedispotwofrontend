import { ToggleButtonGroup, ToggleButton} from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const SellerDocs = ({ prop, id, dispatch, user }) => {
    const handleStatusDocs = async (e) => {
        dispatch(updateProp(id, {statusDocs: e.target.value})).then(() => window.location.reload(false));
    };

  return (
user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <ToggleButtonGroup color='error' aria-label="Status of Sellers Docs" exclusive onChange={handleStatusDocs} fullWidth  value={prop.statusDocs} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Contract or Opening Escrow (Not Required)'>
            Contract or Opening Escrow (Not Required)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Executed Contract Needed with Seller/Supplier'>
            Executed Contract Needed with Seller/Supplier
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Executed Contract Received from Seller/Supplier (Open Escrow)'>
            Executed Contract Received (Open Escrow)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='(Escrow Opened) All Documents are at Title'>
            (Escrow Opened) All Documents are at Title
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color='error' disabled exclusive fullWidth value={prop.statusDocs} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton style={{ height: '100%' }} value='Contract or Opening Escrow (Not Required)'>
            Contract or Opening Escrow (Not Required)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Executed Contract Needed with Seller/Supplier'>
            Executed Contract Needed with Seller/Supplier
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='Executed Contract Received from Seller/Supplier (Open Escrow)'>
            Executed Contract Received (Open Escrow)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='(Escrow Opened) All Documents are at Title'>
            (Escrow Opened) All Documents are at Title
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default SellerDocs