import { TextField, FormControl } from "@mui/material";
import { useState } from "react";
import { updateProp } from "../../../../../../actions/properties";

const EscrowOfficer = ({ prop, id, dispatch, user }) => {
    const handleEscrowOfficer = async (e) => {
        dispatch(updateProp(id, {escrowOfficer: e.target.value }))
    }

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField id='standard-search' label='Escrow Officer' variant='outlined' defaultValue={prop.escrowOfficer} onChange={handleEscrowOfficer}/>
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField id='standard-search' label='Escrow Officer' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.escrowOfficer} />
        </FormControl>
  )
}

export default EscrowOfficer