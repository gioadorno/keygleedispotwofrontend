import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { updateProp } from "../../../../../../actions/properties";


const TransactionType = ({ prop, id, dispatch, transaction, user }) => {
    const handleTransactionType = (e) => {
        dispatch(updateProp(id, {transactionType: e.target.value}));
    };
    
  return (
    user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' ? (
        <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
            <InputLabel variant='outlined'>Transaction Type</InputLabel>
            <Select name='transactionType' label='Transaction Type' labelId="transactionType" id="transactionType" defaultValue={prop.transactionType} onChange={handleTransactionType}>
                <MenuItem value={transaction.noValue}>
                    {transaction.noValue}
                </MenuItem>
                <MenuItem value={transaction.assignment}>
                    {transaction.assignment}
                </MenuItem>
                <MenuItem value={transaction.doubleClose}>
                    {transaction.doubleClose}
                </MenuItem>
                <MenuItem value={transaction.purchase}>
                    {transaction.purchase}
                </MenuItem>
                <MenuItem value={transaction.subjectTo}>
                    {transaction.subjectTo}
                </MenuItem>
            </Select>
        </FormControl>
        ) :
        <FormControl sx={{ width: '100%', mb: 2 }} variant='outlined'>
        <InputLabel variant='outlined'>Transaction Type</InputLabel>
        <Select label='Transaction Type' disabled defaultValue={prop.transactionType} />
        </FormControl>
  )
}

TransactionType.defaultProps = {
    transaction: {
        noValue: 'No Value',
        assignment: 'Assignment',
        doubleClose: 'Double Close',
        purchase: 'Purchase',
        subjectTo: 'Subject-To'
    },
}

export default TransactionType