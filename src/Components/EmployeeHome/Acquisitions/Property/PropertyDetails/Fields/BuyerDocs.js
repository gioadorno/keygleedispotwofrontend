import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";

const BuyerDocs = ({ prop, id, dispatch, user }) => {
    const handleBuyerDocs = async (e) => {
        dispatch(updateProp(id, {buyerDocs: e.target.value})).then(() => window.location.reload(false));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <ToggleButtonGroup color="error" aria-label="Status of Cash Buyer's Docs" exclusive onChange={handleBuyerDocs} fullWidth  value={prop.buyerDocs} sx={{ mb: 2, alignItems: 'center' }} variant='outlined'>
            <ToggleButton value='Executed Contract Received from Buyer (Open Escrow)'>
            Executed Contract Received from Buyer (Open Escrow)
            </ToggleButton>
            <ToggleButton value="Escrow Contacted for Buyer's EMD (Waiting on Acq Side)">
            Escrow Contacted for Buyer's EMD (Waiting on Acq Side)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='(Escrow Opened) All Documents are at Title'>
            (Escrow Opened) All Documents are at Title
            </ToggleButton>
        </ToggleButtonGroup>
        ) :
        <ToggleButtonGroup color="error" disabled exclusive fullWidth value={prop.buyerDocs} sx={{ mb: 2 }} variant='outlined'>
            <ToggleButton value='Executed Contract Received from Buyer (Open Escrow)'>
            Executed Contract Received from Buyer (Open Escrow)
            </ToggleButton>
            <ToggleButton value="Escrow Contacted for Buyer's EMD (Waiting on Acq Side)">
            Escrow Contacted for Buyer's EMD (Waiting on Acq Side)
            </ToggleButton>
            <ToggleButton style={{ height: '100%' }} value='(Escrow Opened) All Documents are at Title'>
            (Escrow Opened) All Documents are at Title
            </ToggleButton>
        </ToggleButtonGroup>
  )
}

export default BuyerDocs