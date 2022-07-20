import { Grid, Paper, Box, Typography, Toolbar, TextField, FormControl, MenuItem, Select, FormControlLabel, Radio, RadioGroup, Input, FormLabel, CardMedia, Button, Snackbar, IconButton, Modal, CircularProgress, Switch, Stack } from "@mui/material";
import { Autocomplete, InputAdornment } from "@mui/material";
import OuterBar from '../../OuterBar';
import { getGeocode, getLatLng } from "use-places-autocomplete";
import { useState, useEffect, forwardRef, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createProp, getProps } from "../../../../actions/properties";
import FileBase64 from 'react-file-base64';
import { usePlacesWidget } from 'react-google-autocomplete';
import { getDispoEmployees } from "../../../../actions/dispoemployees";
import PropTypes from 'prop-types';
import { IMaskInput } from 'react-imask';
import NumberFormat from 'react-number-format';
import { LocalizationProvider, DatePicker} from '@mui/lab';
import AdapterDateFns from "@mui/lab/modern/AdapterDateFns";
import './style.css'
import enLocale from 'date-fns/locale/en-US';
import { format } from "date-fns";
import Login from "../../../Login/Login";
import MobileNav from "../../MobileNav";
import CloseIcon from '@mui/icons-material/Close';

const TextMaskCustom = forwardRef(function TextMaskCustom(props, ref) {

    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(#00) 000-0000"
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        overwrite
      />
    );
  });

  TextMaskCustom.propTypes = {
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
  };


const NumberCommaFormatCustom = forwardRef(function NumberFormatCustom(props, ref) {
    const { onChange, ...other } = props;
    
    return (
        <NumberFormat
        {...other}
        getInputRef={ref}
        onValueChange={(values) => {
            onChange({
            target: {
                name: props.name,
                value: values.value,
            },
            });
        }}
        thousandSeparator
        isNumericString
        prefix=''
        />
    );
    });



const AcqOptions = ({ markets }) => {
    const [ open, setOpen ] = useState(false);
    const GoogleAPI = "AIzaSyBat1MaRl7stoHN62WZ7f9aGYWYOqHnBtU";
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info
        // Get current Date and format it to mm/dd/yyyy
        let today = new Date();
        let date = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();
        // Input Values for properties
        const [propertyData, setPropertyData] = useState({
            date: date,
            status: 'Active',
            name: user.result.name,
            dispoName: '',
            dispoPhone: '',
            dispoEmail: '',
            dispoName2: '',
            dispoPhone2: '',
            dispoEmail2: '',
            dealulator: '',
            exclusive: '',
            supplier: '',
            supplierName: '',
            supplierEmail: '',
            supplierPhone: '',
            address: ''.replace(', USA', ''),
            propType: '',
            arv: '',
            netPrice: '',
            salePrice: '',
            emd: '',
            optionFee: '',
            dealSplit: '',
            underlyingContract: '',
            coe: '',
            titleCompany: '',
            typeAccess: '',
            postPossession: '',
            vacantCOE: '',
            tenantOccupied: '',
            leaseTerm: '',
            notes: '',
            beds: '',
            baths: '',
            parking: '',
            pool: '',
            livingArea: '',
            lotSize: '',
            year: '',
            condition: '',
            pictureLink: '',
            market: '',
            propPhoto: '',
            uploadContract: '',
            audited: false,
            acqDrop: '$0',
            acqIncrease: '$0',
            dispoContractPrice: '$0',
            dispoPriceDrop: '$0',
            dispoPriceIncrease: '$0',
            goodsSold: '$0',
            addComp: '$0',
            acqGP: '0',
            submitBy: '',
            lat: '',
            lng: '',
            agentWriting: '',
            segmentID: [],
            senderID: '',
            fileName: '',
            photoLink: '',
            image: '',
            photoFile: '',
            fileType: '',
            PropertyPhoto: '',
            tags: '',
            emailBlast: false
        });
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getDispoEmployees())
    },[])
    const dispoReps = useSelector((state) => state.dispoemployees);
    useEffect(() => {
        dispatch(getProps())
    },[])
    const { props, START_CREATING } = useSelector((state) => state.posts);

    // Reading image file to be displayed
    const [createFile, setFile] = useState('');
    const [showOccupied, setShowOccupied] = useState(null);

    const fileHandler = (e) => {
        console.log(e.target.files[0])
        setFile(e.target.files[0])
        let reader = new FileReader();
        reader.onload = function(e) {
            setFile(e.target.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    };

        // Address Input
    const { ref } = usePlacesWidget({
    apiKey: GoogleAPI,
    onPlaceSelected: (place) => {
        
    },
    options: {
        types: ["address"],
        componentRestrictions: { country: "us" },
    },
    });

    console.log(propertyData.emailBlast)

    const handleChange = (e) => {
        setPropertyData({ ...propertyData, [e.target.name]: e.target.value })
    };
    const handleSubmit = async (e) => {
        e.preventDefault()

        await dispoReps.map((dispoRep) => {
            if (propertyData.market == dispoRep.market[0]) {
                propertyData.dispoName = dispoRep.name;
                propertyData.dispoPhone = dispoRep.phone;
                propertyData.dispoEmail = dispoRep.email;
                propertyData.senderID = dispoRep.senderID;
                propertyData.segmentID = dispoRep.segmentID;
            }
            if (propertyData.dispoName === '' && propertyData.market == dispoRep.market[1]) {
                propertyData.dispoName = dispoRep.name;
                propertyData.dispoPhone = dispoRep.phone;
                propertyData.dispoEmail = dispoRep.email;
                propertyData.senderID = dispoRep.senderID;
                propertyData.segmentID = dispoRep.segmentID;
            }
            if (propertyData.market == dispoRep.market[1]) {
                propertyData.dispoName2 = dispoRep.name;
                propertyData.dispoPhone2 = dispoRep.phone;
                propertyData.dispoEmail2 = dispoRep.email;
                propertyData.senderID = dispoRep.senderID;
                propertyData.segmentID = dispoRep.segmentID;
            }
            if (propertyData.dispoName2 === '' && propertyData.market == dispoRep.market[0]) {
                propertyData.dispoName2 = dispoRep.name;
                propertyData.dispoPhone2 = dispoRep.phone;
                propertyData.dispoEmail2 = dispoRep.email;
                propertyData.senderID = dispoRep.senderID;
                propertyData.segmentID = dispoRep.segmentID;
            }
            if(propertyData.dispoName === propertyData.dispoName2) {
                propertyData.dispoName2 = null;
                propertyData.dispoPhone2 = null;
                propertyData.dispoEmail2 = null;
            }
        });

            propertyData.tags = [propertyData.address, `Acq: ${propertyData.name}`, `Dispo: ${propertyData.dispoName}`, propertyData.status, propertyData.supplier, propertyData.supplierEmail, `Beds : ${propertyData.beds}`, `Baths : ${propertyData.baths}`, propertyData.parking, `Pool: ${propertyData.pool}`, propertyData.year, propertyData.market, propertyData.date, `Audited: ${propertyData.audited}`, ];


        // Getting Lat and Lng for markers to be displayed on the map, along with other info
        getGeocode({address : propertyData.address})
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
            const { lat, lng } = latLng;
            propertyData.lat = lat;
            propertyData.lng = lng;

            dispatch(createProp(propertyData)).then(() => {
                setOpen(true);
            })
        });
    };

      
    // Removes Duplicates of Supplier Names
    const supplierNameList = props.filter((value, index, self) => 
    index === self.findIndex((t) => (
        t.supplierName === value.supplierName
        ))
        );

        // Removes Duplicates of Supplier Emails
        const supplierEmailList = props.filter((value, index, self) => 
        index === self.findIndex((t) => (
            t.supplierEmail === value.supplierEmail
        ))
        );

        // Removes Duplicates of Title Company
        const titleCompanyList = props.filter((value, index, self) => 
        index === self.findIndex((t) => (
            t.titleCompany === value.titleCompany
        ))
        );

        if(!user?.result?.name || user?.result?.accountLevel != 'Employee') {
            return (
                <Login />
            )
        };


        // SnackBar

          const handleClose = (event, reason) => {
            if (reason === 'clickaway') {
              return;
            }
        
            setOpen(false);
          };

          const propertyAction = (
            <Fragment>
              <IconButton
                size="large"
                aria-label="close"
                sx={{ color: 'white' }}
                onClick={handleClose}
              >
                <CloseIcon fontSize="medium" />
              </IconButton>
            </Fragment>
          );

        if(START_CREATING) {
            return <Modal sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }} open={true}>
                <CircularProgress color='success' />
                <Typography variant='h5' sx={{ pt: 3 }} >Creating Property...</Typography>
            </Modal>
        }


  return (
        <div style={{ display: 'flex', height: '100%', paddingBottom: '2em'}}>
            <Snackbar open={open} autoHideDuration={10000} onClose={handleClose} message='Property has been submitted' action={propertyAction} />
            <OuterBar />
            <Box autoComplete={true} component='form' maxWidth='2xl' style={{ marginTop: '5em', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row', flexWrap: 'wrap' }}>
                <Paper style={{ width: '95%', paddingBottom: '3em' }} elevation={12}>
                <Toolbar sx={{ width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant='h3' component='h4' style={{ width: '100%', textAlign: 'center' }}>
                            Acq Options
                        </Typography>
                </Toolbar>
                    <Grid container style={{ marginTop: '1em' }} spacing={4}>
                        <Grid item xs={12} sm={6} >
                            
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Your Name</FormLabel>
                                    <TextField style={{ width: '90%' }} variant='outlined' label='Your Name' value={user.result.name} InputProps={{ readOnly: true }} id="name"  />
                                </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Property Address</FormLabel>
                                    <TextField required inputRef={ref} style={{ width: '90%' }} variant='outlined' aria-describedby='address' label='Property Address' onBlur={(e) => setPropertyData({ ...propertyData, address: e.target.value })} />
                                </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5em' }}>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Property Type</FormLabel>
                                    <Select name='propType' value={propertyData.propType} aria-describedby='propType' onChange={e => setPropertyData({ ...propertyData, propType: e.target.value })} style={{ width: '90%', height: '3em' }} variant='outlined'>
                                        <MenuItem value='SF House'>
                                            SF House
                                        </MenuItem>
                                        <MenuItem value='MF'>
                                        MF
                                        </MenuItem>
                                        <MenuItem value='Mobile'>
                                        Mobile
                                        </MenuItem>
                                        <MenuItem value='Commercial'>
                                            Commercial
                                        </MenuItem>
                                        <MenuItem value='Other'>
                                            Other
                                        </MenuItem>
                                    </Select>
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <RadioGroup aria-describedby='dealulator' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} value={propertyData.dealulator} onChange={e => setPropertyData({ ...propertyData, dealulator: e.target.value })} row>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Is this deal from a Dealulator?</FormLabel>
                                    <FormControlLabel name="dealulator" color="primary" value='Yes' control={<Radio />} label='Yes' />
                                    <FormControlLabel name="dealulator" value='No' control={<Radio />} label='No' />
                                </RadioGroup>
                                
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                                <RadioGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onChange={e => setPropertyData({ ...propertyData, exclusive: e.target.value })} row>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Exclusive?</FormLabel>
                                    <FormControlLabel name="exclusive" value='Yes' control={<Radio />} label='Yes' />
                                    <FormControlLabel name="exclusive" value='No' control={<Radio />} label='No' />
                                </RadioGroup>
                                    
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                                <RadioGroup aria-describedby='supplier' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} onChange={e => setPropertyData({ ...propertyData, supplier: e.target.value })} row>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Supplier</FormLabel>
                                    <FormControlLabel name="supplier" value='Wholesaler' control={<Radio />} label='Wholesaler' />
                                    <FormControlLabel name="supplier" value='Agent' control={<Radio />} label='Agent' />
                                </RadioGroup>
                                    
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                            <FormControl aria-describedby='supplierName' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Supplier Name</FormLabel>
                                <Autocomplete freeSolo={true} style={{ width: '90%' }} options={supplierNameList.map((prop) => prop.supplierName)} renderInput={(params) => <TextField variant='outlined' {...params} label="Supplier Name"  />} onInputChange={(e, value) => setPropertyData({ ...propertyData, supplierName: value })} />
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                            <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Supplier Email</FormLabel>
                                <Autocomplete freeSolo={true} style={{ width: '90%' }} options={supplierEmailList.map((prop) => prop.supplierEmail)} renderInput={(params) => <TextField variant='outlined' {...params} label="Supplier Email"  />} onInputChange={(e, value) => setPropertyData({ ...propertyData, supplierEmail: value })} />
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                            <FormControl variant='outlined' style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Supplier Phone</FormLabel>
                            <TextField InputProps={{ inputComponent: TextMaskCustom }} placeholder="Supplier Phone" name='supplierPhone' style={{ width: '90%' }} variant='outlined' label='Supplier Phone' value={propertyData.supplierPhone} onBlur={handleChange} />
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>After Repair Value</FormLabel>
                            <NumberFormat label='After Repair Value' customInput={TextField} style={{ width: '90%' }} defaultValue={propertyData.arv} onValueChange={({ value }) => setPropertyData({ ...propertyData, arv: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '') })} thousandSeparator isNumericString prefix='$'  />
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em', py: 3 }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Net Price</FormLabel>
                            <NumberFormat label='Net Price' customInput={TextField} style={{ width: '90%' }} defaultValue={propertyData.netPrice} onValueChange={({ value }) => setPropertyData({ ...propertyData, netPrice: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '') })} thousandSeparator isNumericString prefix='$'  />
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                            <FormControl sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em', py: 3 }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Sale Price</FormLabel>
                            <NumberFormat label='Sale Price' customInput={TextField} style={{ width: '90%' }} defaultValue={propertyData.salePrice} onValueChange={({ value }) => setPropertyData({ ...propertyData, salePrice: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '') })} thousandSeparator isNumericString prefix='$'  />
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                            <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Earnest Money Deposit</FormLabel>
                            <NumberFormat label='EMD' customInput={TextField} style={{ width: '90%' }} defaultValue={propertyData.emd} onValueChange={({ value }) => setPropertyData({ ...propertyData, emd: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '') })} thousandSeparator isNumericString prefix='$'  />
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                            <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Option Fee</FormLabel>
                            <NumberFormat label='Option Fee' customInput={TextField} style={{ width: '90%' }} defaultValue={propertyData.optionFee} onValueChange={({ value }) => setPropertyData({ ...propertyData, optionFee: Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(value).replace('.00', '') })} thousandSeparator isNumericString prefix='$'  />
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                                <RadioGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} name='dealSplit' value={propertyData.dealSplit} onChange={handleChange} row>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Deal Split</FormLabel>
                                    <FormControlLabel name="dealSplit" value='100' control={<Radio />} label='100' />
                                    <FormControlLabel name="dealSplit" value='50/50' control={<Radio />} label='50/50' />
                                    <FormControlLabel name="dealSplit" value='Other' control={<Radio />} label='Other' />
                                </RadioGroup>
                                    
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                                <RadioGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} name='underlyingContract' value={propertyData.underlyingContract} onChange={handleChange} row>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Do we have an Underlying Contract?</FormLabel>
                                    <FormControlLabel name="underlyingContract" value='Yes' control={<Radio />} label='Yes' />
                                    <FormControlLabel name="underlyingContract" value='No' control={<Radio />} label='No' />
                                </RadioGroup>
                                    
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                            <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '3em' }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>When is COE?</FormLabel>
                                <LocalizationProvider locale={enLocale} dateAdapter={AdapterDateFns}>
                                    <DatePicker name='coe' label="COE" style={{ width: '90%' }} value={propertyData.coe} onChange={(newValue) => setPropertyData({ ...propertyData, coe: format(newValue, 'MM/dd/yyyy') })} renderInput={(params) => <TextField variant="outlined" style={{ width: '90%', }} {...params}/> } />
                                </LocalizationProvider>
                            {/* <TextField InputProps={{ inputComponent: NumberFormatCustom }} name='coe' style={{ width: '90%' }} variant='outlined' onBlur={handleChange} value={propertyData.coe}  /> */}
                            </FormControl>
                            
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                            <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Title Company</FormLabel>
                                <Autocomplete id='titleCompany' key='titleCompany' freeSolo={true} style={{ width: '90%' }}  options={titleCompanyList.map((prop) => prop.titleCompany)} renderInput={(params) => <TextField {...params} variant='outlined' label="Title Company" />} onInputChange={(e, value) => setPropertyData({ ...propertyData, titleCompany: value })} />
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                                <RadioGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} name='typeAccess' value={propertyData.typeAccess} onChange={handleChange} row>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Type of Access</FormLabel>
                                    <FormControlLabel name="typeAccess" value='Appointment' control={<Radio />} label='Appointment' />
                                    <FormControlLabel name="typeAccess" value='LockBox' control={<Radio />} label='Lockbox' />
                                    <FormControlLabel name="typeAccess" value='No Access' control={<Radio />} label='No Access' />
                                </RadioGroup>
                                    
                        </Grid>
                        <Grid item xs={12} sm={6} >
                            
                                <RadioGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} name='postPossession' value={propertyData.postPossession} onChange={handleChange} row>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Post Possession</FormLabel>
                                    <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                                    <FormControlLabel value='No' control={<Radio />} label='No' />
                                </RadioGroup>
                                    
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <RadioGroup sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', pt: 5 }} name='vacantCOE' value={propertyData.vacantCOE} onChange={handleChange} row>
                        <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Vacant at COE?</FormLabel>
                                    <FormControlLabel onClick={() => setShowOccupied(false)} value='Yes' control={<Radio />} label='Yes' />
                                    <FormControlLabel onClick={() => setShowOccupied(true)} value='No' control={<Radio />} label='No' />
                                </RadioGroup>
                                    
                        </Grid>
                        {showOccupied && (
                            <>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>If tenant occupied, what is current rent?</FormLabel>
                                    <TextField style={{ width: '90%' }} name='tenantOccupied' variant='outlined' label='Tenant Occupied' onChange={(e => setPropertyData({ ...propertyData, tenantOccupied: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>If tenant occupied, what is lease term</FormLabel>
                                    <TextField style={{ width: '90%' }} name='leaseTerm' variant='outlined' label='Lease Term' onChange={(e => setPropertyData({ ...propertyData, leaseTerm: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        </>
                        )}
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Additional Notes</FormLabel>
                                    <TextField multiline rows={5} style={{ width: '90%' }} name='notes' variant='outlined' label='Additional Notes' onChange={(e => setPropertyData({ ...propertyData, notes: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Beds</FormLabel>
                                    <TextField style={{ width: '90%' }} name='beds' variant='outlined' label='Beds' onChange={(e => setPropertyData({ ...propertyData, beds: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Baths</FormLabel>
                                    <TextField style={{ width: '90%' }} name='baths' variant='outlined' label='Baths' onChange={(e => setPropertyData({ ...propertyData, baths: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <RadioGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} name='parking' value={propertyData.parking} onChange={handleChange} row>
                        <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Parking</FormLabel>
                                    <FormControlLabel name="parking" value='Garage' control={<Radio />} label='Garage' />
                                    <FormControlLabel name="parking" value='Carport' control={<Radio />} label='Carport' />
                                    <FormControlLabel name="parking" value='No Parking' control={<Radio />} label='No Parking' />
                                    <FormControlLabel name="parking" value='Garage - Detached' control={<Radio />} label='Garage - Detached' />
                                    <FormControlLabel name="parking" value='On Street' control={<Radio />} label='On Street' />
                                </RadioGroup>
                                    
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <RadioGroup style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} name='pool' value={propertyData.pool} onChange={handleChange} row>
                        <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Pool</FormLabel>
                                    <FormControlLabel value='Yes' control={<Radio />} label='Yes' />
                                    <FormControlLabel value='No' control={<Radio />} label='No' />
                                </RadioGroup>
                                    
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Living Area</FormLabel>
                                    <TextField InputProps={{ inputComponent: NumberCommaFormatCustom }} style={{ width: '90%' }} name='livingArea' variant='outlined' label='Living Area' onBlur={(e => setPropertyData({ ...propertyData, livingArea: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Lot Size</FormLabel>
                                    <TextField InputProps={{ inputComponent: NumberCommaFormatCustom }} style={{ width: '90%' }} name='lotSize' variant='outlined' label='Lot Size' onBlur={(e => setPropertyData({ ...propertyData, lotSize: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Year</FormLabel>
                                    <TextField type='number' style={{ width: '90%' }} name='year' variant='outlined' label='Year' onChange={(e => setPropertyData({ ...propertyData, year: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Link to Photos</FormLabel>
                                    <TextField style={{ width: '90%' }} name='pictureLink' variant='outlined' label='Link to Photos' onChange={(e => setPropertyData({ ...propertyData, pictureLink: e.target.value }))} />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} >
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5em' }}>
                                <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550', textAlign: 'center', width: '100%' }}>Market</FormLabel>
                                    <Select name="market" required value={propertyData.market} aria-describedby='propType' onChange={e => setPropertyData({ ...propertyData, market: e.target.value })} style={{ width: '90%', height: '3em' }} variant='outlined'>
                                    <MenuItem value={markets.orlando}>
                                        {markets.orlando}
                                    </MenuItem>
                                    <MenuItem value={markets.tampa}>
                                        {markets.tampa}
                                    </MenuItem>
                                    <MenuItem value={markets.newark}>
                                        {markets.newark}
                                    </MenuItem>
                                    <MenuItem value={markets.saltLake}>
                                        {markets.saltLake}
                                    </MenuItem>
                                    <MenuItem value={markets.charlotte}>
                                        {markets.charlotte}
                                    </MenuItem>
                                    <MenuItem value={markets.columbus}>
                                        {markets.columbus}
                                    </MenuItem>
                                    <MenuItem value={markets.kansasCity}>
                                        {markets.kansasCity}
                                    </MenuItem>
                                    <MenuItem value={markets.stLouis}>
                                        {markets.stLouis}
                                    </MenuItem>
                                    <MenuItem value={markets.austin}>
                                        {markets.austin}
                                    </MenuItem>
                                    <MenuItem value={markets.atlanta}>
                                        {markets.atlanta}
                                    </MenuItem>
                                    <MenuItem value={markets.sanAntonio}>
                                        {markets.sanAntonio}
                                    </MenuItem>
                                    <MenuItem value={markets.tucson}>
                                        {markets.tucson}
                                    </MenuItem>
                                    <MenuItem value={markets.northernAZ}>
                                        {markets.northernAZ}
                                    </MenuItem>
                                    <MenuItem value={markets.lasVegas}>
                                        {markets.lasVegas}
                                    </MenuItem>
                                    <MenuItem value={markets.indianapolis}>
                                        {markets.indianapolis}
                                    </MenuItem>
                                    <MenuItem value={markets.birmingham}>
                                        {markets.birmingham}
                                    </MenuItem>
                                    <MenuItem value={markets.dallas}>
                                        {markets.dallas}
                                    </MenuItem>
                                    <MenuItem value={markets.houston}>
                                        {markets.houston}
                                    </MenuItem>
                                    <MenuItem value={markets.denver}>
                                        {markets.denver}
                                    </MenuItem>
                                    </Select>
                                </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel>Blast property right away?</FormLabel>
                                    <Stack direction='row' spacing={1} alignItems='center'>
                                    <Typography>No</Typography>
                                    <Switch color='primary' checked={propertyData.emailBlast} onChange={e => setPropertyData({ ...propertyData, emailBlast: e.target.checked })} name="emailBlast" />
                                    <Typography>Yes</Typography>
                                    </Stack>
                                </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                                <Box width={'auto'} height='auto'>
                                    <CardMedia component='img' src={propertyData.propPhoto} />
                                </Box>
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Upload Property Photo</FormLabel>
                                    <FileBase64 name="propPhoto" required={true} type='file' onDone={(fileInfo) => setPropertyData({ ...propertyData, propPhoto: fileInfo.base64.replace('heic', 'jpg'), fileName: fileInfo.name })} onChange={fileHandler} multiple={false}  />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                                <FormControl style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                    <FormLabel style={{ marginBottom: '1em', color: '#607d8b', fontWeight: '550' }}>Upload Contract</FormLabel>
                                    <FileBase64 type='file' onDone={({base64}) => setPropertyData({ ...propertyData, uploadContract: base64  })} onChange={fileHandler} multiple={false}  />
                                </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                                <Button disabled={open === false ? false : true} onClick={handleSubmit} color='primary' variant='contained'>{open === false ? 'Submit' : 'Property Submitted'}</Button>
                            </Box>
                        </Grid>
                    </Grid>
                </Paper>
            </Box>
            <MobileNav />
        </div>
  )
}

AcqOptions.defaultProps = {
    markets: {
        orlando: 'Orlando, FL',
        memphis: 'Memphis, TN',
        tampa: 'Tampa, FL',
        newark: 'Newark, NJ',
        saltLake: 'Salt Lake City, UT',
        charlotte: 'Charlotte, NC',
        columbus: 'Columbus, OH',
        kansasCity: 'Kansas City, MO',
        stLouis: 'St. Louis, MO',
        austin: 'Austin, TX',
        atlanta: 'Atlanta, GA',
        sanAntonio: 'San Antonio, TX',
        tucson: 'Tucson, AZ',
        northernAZ: 'Northern Arizona',
        lasVegas: 'Las Vegas, NV',
        indianapolis: 'Indianapolis, IN',
        birmingham: 'Birmingham, AL',
        dallas: 'Dallas, TX',
        houston: 'Houston, TX',
        denver: 'Denver, CO'
        
    },
}

export default AcqOptions