import { FormControl, InputLabel, MenuItem, Select, Divider } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";


const EarnestDeposit = ({ prop, id, dispatch, earnestStatus }) => {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info
    const handleStatusEarnest = (e) => {
        dispatch(updateProp(id, {statusEarnest: e.target.value}));
    };

  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
            <InputLabel variant='outlined'>Status of Our Earnest Deposit</InputLabel>
            <Select labelId="Status of Our Earnest Deposit" defaultValue={prop.statusEarnest} onChange={handleStatusEarnest}>
            <MenuItem value={earnestStatus.notRequired}>
                {earnestStatus.notRequired}
            </MenuItem>
            <MenuItem value={earnestStatus.earnestRequired}>
                {earnestStatus.earnestRequired}
            </MenuItem>
            <MenuItem value={earnestStatus.earnestOrdered}>
                {earnestStatus.earnestOrdered}
            </MenuItem>
            <MenuItem value={earnestStatus.earnestDeposited}>
                {earnestStatus.earnestDeposited}
            </MenuItem>
            <MenuItem value={earnestStatus.comingBack}>
                {earnestStatus.comingBack}
            </MenuItem>
            <MenuItem value={earnestStatus.returned}>
                {earnestStatus.returned}
            </MenuItem>
            <MenuItem value={earnestStatus.seized}>
                {earnestStatus.seized}
            </MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
        <InputLabel variant='outlined'>Status of Our Earnest Deposit</InputLabel>
        <Select disabled defaultValue={prop.statusEarnest} />
        </FormControl>
  )
};

EarnestDeposit.defaultProps = {
    earnestStatus: {
        notRequired: 'Not Required',
        earnestRequired: 'Earnest Required',
        earnestOrdered: 'Earnest Deposit Ordered',
        earnestDeposited: 'Earnest Deposited',
        comingBack: 'Coming Back',
        returned: 'Returned',
        seized: 'Seized'
    },
}

export default EarnestDeposit