import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker} from '@mui/lab';
import { updateProp } from "../../../../../../actions/properties";
import format from 'date-fns/format';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";


const PricingDate = ({ prop, id, dispatch, user }) => {

    const handlePricingDate = (newValue) => {
        dispatch(updateProp(id, {pricingDate: newValue}));
    };

  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <DatePicker
      label="Pricing Date"
      value={prop.pricingDate}
      onChange={handlePricingDate}
      renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '1em' }} {...params} />}
    />
    :
    <DatePicker
    label="Pricing Date"
    value={prop.pricingDate}
    readOnly
    renderInput={(params) => <TextField variant='outlined' style={{ width: '100%', marginBottom: '.75em' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default PricingDate