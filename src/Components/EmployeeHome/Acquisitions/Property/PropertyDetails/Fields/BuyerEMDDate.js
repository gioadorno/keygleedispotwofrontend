import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker} from '@mui/lab';
import { updateProp } from "../../../../../../actions/properties";
import format from 'date-fns/format';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";


const BuyerEMDDate = ({ prop, id, dispatch, user }) => {
    const handleBuyersEMDDate = (newValue) => {
        dispatch(updateProp(id, {buyersEMDDate: format(newValue, 'MM/dd/yyyy')}));
    };

  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <DatePicker
      label="Date Buyer's EMD was Deposited"
      value={prop.buyersEMDDate}
      onChange={handleBuyersEMDDate}
      renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
    />
    :
    <DatePicker
    label="Date Buyer's EMD was Deposited"
    value={prop.buyersEMDDate}
    readOnly
    renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default BuyerEMDDate