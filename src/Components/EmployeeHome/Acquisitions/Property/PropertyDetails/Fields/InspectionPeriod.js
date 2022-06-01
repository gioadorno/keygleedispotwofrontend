import { TextField, FormControl } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";


const InspectionPeriod = ({ prop, id, dispatch, user }) => {
    const handleInspectionPeriod = (e) => {
        dispatch(updateProp(id, {inspectionPeriod: e.target.value}));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? 
    <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
        <TextField label='Inspection Period' variant='outlined' defaultValue={prop.inspectionPeriod} onChange={handleInspectionPeriod} />
    </FormControl>
    :
        <FormControl style={{ width: '100%', marginBottom: '.75em' }}>
            <TextField label='Inspection Period' variant='outlined' InputProps={{
            readOnly: true,
        }} value={prop.inspectionPeriod} />
        </FormControl>
  )
}

export default InspectionPeriod