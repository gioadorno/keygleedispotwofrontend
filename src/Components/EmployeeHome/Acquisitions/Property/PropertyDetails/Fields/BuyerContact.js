import { updateProp } from "../../../../../../actions/properties";
import { getDispoProps } from '../../../../../../actions/dispoProps';
import { TextField, FormControl } from '@mui/material';
import { Autocomplete } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect } from "react";

const BuyerContact = ({ prop, id, dispatch, user }) => {
    useEffect(() => {
        dispatch(getDispoProps())
    },[])
    const { dispoProps } = useSelector((state) => state.dispo)
    // Removes Duplicates of Dispo Names
    const signerNameList = dispoProps?.filter((value, index, self) => 
    index === self.findIndex((t) => (
        t.signersName === value.signersName
    ))
    );

    // const buyerContact = signerNameList.map(dispo => prop.signersName == dispo.signersName && dispo.buyersPhone )
    // const phoneNumber = new Set(buyerContact);
    // const number = [...phoneNumber][1]


  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <Autocomplete defaultValue={prop.signersName} freeSolo={true} style={{ width: '100%' }} id="combo-box" options={signerNameList.map((prop) => prop.signersName)} renderInput={(params) => <TextField variant='outlined' {...params} label="Buyer Contact"  />} onInputChange={(e, value) => dispatch(updateProp(id, {signersName: value}))} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField variant='outlined' label='Buyer Contact' InputProps={{
            readOnly: true,
        }} value={prop.signersName} />
        </FormControl>
  )
}

export default BuyerContact