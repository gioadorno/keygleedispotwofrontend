import { TextField } from "@mui/material";
import { LocalizationProvider, DatePicker} from '@mui/lab';
import { updateProp } from "../../../../../../actions/properties";
import format from 'date-fns/format';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";


const BuyerAcqDate = ({ prop, id, dispatch, user }) => {

    const handleBuyerAcqDate = async (newValue) => {
      dispatch(updateProp(id, {buyerAcqDate: newValue }))
    };

  return (
<LocalizationProvider dateAdapter={AdapterDateFns} >
    {user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <DatePicker
      label="Buyer's Acquisition Date"
      value={prop.buyerAcqDate}
      onChange={handleBuyerAcqDate}
      className='datePicker'
      renderInput={(params) => <TextField variant="outlined" sx={{ width: '100%', marginBottom: '1em', color: '#2285ffde' }} {...params} />}
    />
    :
    <DatePicker
    label="Buyer's Acquisition Date"
    value={prop.buyerAcqDate}
    readOnly
    renderInput={(params) => <TextField variant="outlined" sx={{ width: '100%', marginBottom: '.75em', color: '#2285ffde' }} {...params} />}
  />
}
  </LocalizationProvider>
  )
}

export default BuyerAcqDate