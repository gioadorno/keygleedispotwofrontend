import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker} from '@mui/lab';
import { updateProp } from "../../../../../../actions/properties";
import format from 'date-fns/format';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";


const BuyerCloseDate = ({ prop, id, dispatch, user }) => {
    const handleBuyerCloseDate = (newValue) => {
        dispatch(updateProp(id, {buyerCloseDate : format(newValue, 'MM/dd/yyyy')}));
    };


  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <DatePicker
      label="Buyer's Closing Date"
      value={prop.buyerCloseDate}
      onChange={handleBuyerCloseDate}
      renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
    />
    :
    <DatePicker
    label="Buyer's Closing Date"
    value={prop.buyerCloseDate}
    readOnly
    renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default BuyerCloseDate