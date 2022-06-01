import { TextField, FormControl, Divider } from "@mui/material";

const AcqDate = ({ prop }) => {
  return (
    <FormControl style={{ width: '100%', marginBottom: '1em' }}>
            <TextField style={{ fontSize: '1.5em' }} InputProps={{ readOnly: true }} id='standard-search' label='Acquisitions Date' variant='outlined' value={prop.date} />
    </FormControl>
  )
}

export default AcqDate