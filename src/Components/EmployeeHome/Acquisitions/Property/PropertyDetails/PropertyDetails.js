import { useEffect, useState } from "react";
import { FormGroup, FormControlLabel, FormHelperText, FormLabel, Switch, FormControl, TextField, Select, MenuItem, InputLabel, ButtonGroup, Paper, Typography, CircularProgress, Divider, Box, Grid, CardMedia, Modal, Backdrop, Fade, Button, Card, Container  } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { blueGrey, red, cyan, lightBlue } from "@material-ui/core/colors";
import { ThemeProvider } from "@material-ui/core";
import FileBase64 from 'react-file-base64';

import Company from "./Fields/Company";
import Territory from "./Fields/Territory";
import FileType from "./Fields/FileType";
import Market from "./Fields/Market";
import Status from './Fields/Status';
import TransactionType from "./Fields/TransactionType";
import Supplier from "./Fields/Supplier";
import SourceOfDeal from "./Fields/SourceOfDeal";
import FileNotes from "./Fields/FileNotes";
import AcqDate from "./Fields/AcqDate";
import InspectionPeriod from "./Fields/InspectionPeriod";
import COE from "./Fields/COE";
import Access from "./Fields/Access";
import PostPossession from "./Fields/PostPossession";
import SellerDocs from "./Fields/SellerDocs";
import EarnestDeposit from "./Fields/EarnestDeposit";
import EMDCheck from './Fields/EMDCheck';
import EMD from "./Fields/EMD";
import AcqContractPrice from './Fields/AcqContractPrice';
import AcqPriceDrops from "./Fields/AcqPriceDrops";
import AcqPriceIncrease from "./Fields/AcqPriceIncrease";
import AdditionalCost from "./Fields/AdditionalCost";
import OptionFee from "./Fields/OptionFee";
import FirstLegCredits from "./Fields/FirstLegCredits";
import FirstLegDebits from "./Fields/FirstLegDebits";
import AcqFinalCost from "./Fields/AcqFinalCost";
import EscrowOfficer from "./Fields/EscrowOfficer";
import BuyerDocs from "./Fields/BuyerDocs";
import BuyerEMD from "./Fields/BuyerEMD";
import BuyersEarnest from "./Fields/BuyersEarnest";
import BuyerEMDDate from './Fields/BuyerEMDDate';
import SecondEscrow from "./Fields/SecondEscrow";
import WhoSold from './Fields/WhoSold';
import WhoAssisted from "./Fields/WhoAssisted";
import SoldBy from './Fields/SoldBy';
import BuyerContact from "./Fields/BuyerContact";
import Commissions from "./Fields/Commissions";
import Payouts from './Fields/Payouts';
import PayoutRecipient from "./Fields/PayoutRecipient";
import StatusPayouts from "./Fields/StatusPayouts";
import BuyerAcqDate from "./Fields/BuyerAcqDate";
import BuyerCloseDate from "./Fields/BuyerCloseDate";
import DispoContractPrice from './Fields/DispoContractPrice';
import DispoPriceDrop from "./Fields/DispoPriceDrop";
import DispoPriceIncrease from "./Fields/DispoPriceIncrease";
import SecondLegCredits from "./Fields/SecondLegCredits";
import SecondLegDebits from "./Fields/SecondLegDebits";
import BuyerCredits from "./Fields/BuyerCredits";
import PerDiem from './Fields/PerDiem';
import DispoFinal from "./Fields/DispoFinal";
import NetPrice from './Fields/WholesalePrice';
import AddComp from "./Fields/AdditionalCompensation";
import CompletionDate from "./Fields/CompletionDate";
import DueToUs from "./Fields/DueToUs";
import Revenue from "./Fields/Revenue";
import GoodsSold from "./Fields/GoodsSold";
import GrossProfit from "./Fields/GrossProfit";
import StatusGP from "./Fields/StatusGP.";
import Split from './Fields/Split';
import AcqGP from "./Fields/AcqGP";
import SoldGP from './Fields/SoldGP';
import PricingDate from './Fields/PricingDate';
import CommitRelation from "./Fields/CommitRelation";
import Files from './Fields/Files';

import { useDispatch, useSelector } from "react-redux";
import Moment from 'react-moment';
import { useParams, useNavigate } from "react-router-dom";
import useStyles from './styles';
import { getProp, updateProp, deleteProp } from '../../../../../actions/properties';
import emptyPhoto from '../Empty Photo.png';
import OuterBar from '../../../OuterBar';
import Login from "../../../../Login/Login";
import MobileNav from "../../../MobileNav";

import './Fields/styles.css'

const updateTC = {
    laura: false,
    kristen: false,
    jacob: false,
};

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

const PropertyDetails = () => {
    const user = JSON.parse(localStorage.getItem('profile')); //Gets logged in user info
    const { prop, props, isLoadingProp, isUpdating } = useSelector((state) => state.posts);
    const [showHidden, setShowHidden] = useState(false);
    const [ deleteModal, setDeleteModal ] = useState(null);
    const handleAudited = (e) => {
        dispatch(updateProp({audited: e.target.checked}))
    };

    const handleHidden = (e) => {
        setShowHidden(e.target.checked);
    };
    
    const [ photoModal, setPhotoModal ] = useState(null);
    const [ uploadPhoto, setUploadPhoto ] = useState({ propPhoto: '' });


    const closePhotoModal = () => {
        setPhotoModal(null)
    };

    const savePhoto = async () => {
        dispatch(updateProp(id, uploadPhoto)).then(() => window.location.reload(false))
    };
    
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getProp(id));
    }, [dispatch]);

    const currencyFormat = new Intl.NumberFormat('en-US', {maximumFractionDigits: 2});
    // Acq Final Price
    const one = prop?.salePrice.replace('$', '');
    const two = prop?.acqDrop.replace('$', '');
    const six = prop?.acqIncrease.replace('$', '');
    const three = one?.replace(',', '');
    const four = two?.replace(',', '');
    const seven = six?.replace(',', '');

    const acqFinalContract = (Number(three) - Number(four) + Number(seven));

    let acqFinal = currencyFormat.format(parseFloat(acqFinalContract)); //uses the Intl.NumberFormat to format the number according to US number standards to only 2 decimal places.
    let acqFinalNumber = "$" + acqFinal; //simply concatenates the $ to the front of the number

    // Dispo Final Price
    const dispoPriceRemoveDollar = prop?.dispoContractPrice.replace('$', '');
    const dispoDrop = prop?.dispoPriceDrop.replace('$', '');
    const dispoIncrease = prop?.dispoPriceIncrease.replace('$', '');
    const dispoPrice = dispoPriceRemoveDollar?.replace(',', '');
    const dispoDropPrice = dispoDrop?.replace(',', '');
    const dispoIncreasePrice = dispoIncrease?.replace(',', '');

    const dispoPriceNumber = (Number(dispoPrice) - Number(dispoDropPrice) + Number(dispoIncreasePrice));

    const parseDispoPrice = currencyFormat.format(parseFloat(dispoPriceNumber)); //uses the Intl.NumberFormat to format the number according to US number standards to only 2 decimal places.
    const dispoFinal = "$" + parseDispoPrice; //simply concatenates the $ to the front of the number

    // Revenue
    
    const revenueNumber = (dispoPriceNumber - acqFinalContract);
    const parseRevenue = currencyFormat.format(parseFloat(revenueNumber));
    const revenueFinal = '$' + parseRevenue;

        // Gross Profit
        const goodsRemoveDollar = prop?.goodsSold.replace('$', '');
        const goodsPrice = goodsRemoveDollar?.replace(',', '');
    
        const grossProfitNumber = (revenueNumber + Number(goodsPrice));
        const parseGrossProfit = currencyFormat.format(parseFloat(grossProfitNumber));
        const positiveGP = parseGrossProfit > 0 ? parseGrossProfit : 0;
        const grossProfit = '$' + parseGrossProfit;
    
        // Split 50/50
        const splitFifty = (grossProfitNumber / 2);
        const parseSplitFifty = currencyFormat.format(parseFloat(splitFifty));
        const acqGPFifty = '$' + parseSplitFifty;

    const [tc, setTC] = useState({
        laura: prop?.tc?.laura || false,
        kristen: prop?.tc?.kristen || false,
        jacob: prop?.tc?.jacob || false,
    });
    const submitTC = () => {
        dispatch(updateProp(id, tc));
    }
    const handleTC = (e) => {
        setTC({ ...tc, [e.target.name]: e.target.checked });
    }


    if (isLoadingProp) {
        return <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size='7em' />
        </Paper>
    }


    if(!user?.result?.name || user?.result?.accountLevel != 'Employee') {
        return (
            <Login />
        )
    };

    // Delete Property
    const closeDelete = () => {
        setDeleteModal(null);
    };
    const deleteProperty = async () => {
        dispatch(deleteProp(prop._id)).then(() => navigate('/acquisitions?page=1'));
    }

  return (
      <Box sx={{ display: 'flex', pb: '5em', mr: 1, flexWrap: 'nowrap', mt: {sm: 10} }}>
            <OuterBar />
            <Container maxWidth="2xl" sx={{ mt: 2, mb: 4, display: 'flex', alignItems: 'center', height: '100vh', justifyContent: 'flex-start', flexDirection: 'column' }}>
            <Paper sx={{ borderRadius: '15px', width: 'auto', p: '20px' }} elevation={6}>
                <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClose={closePhotoModal} open={photoModal}>
                    <Box sx={{ width: '30%', height: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white' }}>
                        <Typography style={{ marginBottom: '1em' }} component='h4' variant='h4'>
                            Upload a property photo 
                        </Typography>
                        <FileBase64 type='file' onDone={(fileInfo) => setUploadPhoto({ ...uploadPhoto, propPhoto: fileInfo.base64 })} multiple={false}  />
                        <Button onClick={savePhoto} style={{ marginTop: '1em', color: 'blue' }} variant='outlined'>
                            Upload
                        </Button>
                    </Box>
                </Modal>
                <Modal style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClose={closeDelete} open={deleteModal}>
                    <Box sx={{ width: '30%', height: '30%', display: 'flex', flexDirection: 'column', alignItems: 'center', bgcolor: 'white' }}>
                        <Typography style={{ padding: '1em', textAlign: 'center' }} component='h4' variant='h4'>
                            Are you sure you want to delete this property?
                        </Typography>
                        <ButtonGroup>
                            <Button style={{ marginRight: '1em' }} size='large' color='secondary' onClick={deleteProperty} variant='outlined'>Yes</Button>
                            <Button size='large' color='secondary' onClick={closeDelete} variant='outlined'>No</Button>
                        </ButtonGroup>
                    </Box>
                </Modal>
                <div className={classes.card}>
                    <div className={classes.section}>
                        <Typography variant="h4" component="h2">{prop.address.replace(', USA', '')}</Typography>
                        <Typography variant="h6" color="textSecondary" component="h2">Created by: {prop.name}  </Typography>
                        <Typography gutterBottom variant="body3"><Moment style={{ color: '#00000099' }} fromNow>{prop.date}</Moment></Typography>
                        <Grid container spacing={2}>
                            {/* Hidden Fields */}
                            <Grid item xs={12}>
                                <FormGroup>
                                    <FormControlLabel control={<Switch checked={showHidden} onChange={handleHidden} inputProps={{ 'aria-label': 'controlled' }} />} label='Show Hidden Fields' />
                                </FormGroup>
                                <FormGroup>
                                    {user.result.securityLevel === 'Auditor' ? (
                                        <FormControlLabel control={<Switch defaultChecked={prop.audited} onChange={handleAudited} inputProps={{ 'aria-label': 'controlled' }} />} label='Property Audited' />
                                    ) :
                                    <FormControlLabel control={<Switch disabled checked={prop.audited} inputProps={{ 'aria-label': 'controlled' }} />} label='Property Audited' />
                                    }
                                </FormGroup>
                                {user.result.securityLevel != 'Acq' && 'Dispo' ? (
                                    <Button onClick={() => setDeleteModal(true)} sx={{ marginTop: '1em', color: '#088affbf', borderColor: '#088affbf' }} variant="outlined">Delete Property</Button>
                                ):
                                <Button disabled style={{ marginTop: '1em' }} variant="outlined">Delete Property</Button>
                                }
                                {isUpdating === true ? (
                                    <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                                    <Typography variant="h6" style={{ color: '#1de9b6' }} component="h2">Property has been updated</Typography>
                                    <Typography variant="h6" style={{ color: '#1de9b6' }} component="h2">Refresh page to see changes</Typography>
                                    </Box>
                                ) : null}
                            </Grid>
                            {/* TC */}
                            <Grid item xs={12}>
                                <FormControl sx={{ pb: 5 }} component="fieldset" variant="standard">
                                    <FormLabel component="legend">Assign TC</FormLabel>
                                    <FormGroup row>
                                        {user.result.securityLevel === 'Operations' || 'System Administrator' ? (
                                            <>
                                            <FormControlLabel
                                            control={
                                                <Switch color='primary' checked={prop.tc?.laura != undefined ? prop.tc.laura : tc.laura} onChange={handleTC} onBlur={submitTC} name="laura" />
                                            }
                                            label="Laura Humble"
                                            />
                                            <FormControlLabel
                                            control={
                                                <Switch color='primary' checked={prop.tc?.kristen != undefined ? prop.tc.kristen : tc.kristen} onChange={handleTC} onBlur={submitTC} name="kristen" />
                                            }
                                            label="Kristen Frabotta"
                                            />
                                            <FormControlLabel
                                            control={
                                                <Switch color='primary' checked={prop.tc?.jacob != undefined ? prop.tc.jacob : tc.jacob} onChange={handleTC} onBlur={submitTC} name="jacob" />
                                            }
                                            label="Jacob Loch"
                                            />
                                            </>
                                        ) :
                                        <>
                                        <FormControlLabel
                                        control={
                                            <Switch disabled checked={prop.tc?.laura != undefined ? prop.tc.laura : tc.laura} name="laura" />
                                        }
                                        label="Laura Humble"
                                        />
                                        <FormControlLabel
                                        control={
                                            <Switch disabled checked={prop.tc?.kristen != undefined ? prop.tc.kristen : tc.kristen} name="kristen" />
                                        }
                                        label="Kristen Frabotta"
                                        />
                                        <FormControlLabel
                                        control={
                                            <Switch disabled checked={prop.tc?.jacob != undefined ? prop.tc.jacob : tc.jacob} name="jacob" />
                                        }
                                        label="Jacob Loch"
                                        />
                                        </>
                                        }
                                    </FormGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Divider style={{ margin: '20px 0' }} />
                            <Company prop={prop} />
                            <Territory prop={prop} id={id} dispatch={dispatch} user={user} />
                            {/* File Type */}
                            <FileType prop={prop} id={id} dispatch={dispatch} user={user} />
                            <Market prop={prop} id={id} dispatch={dispatch} user={user} />
                            <Typography gutterBottom variant="h6" color='light' component="h6">Property Status</Typography>
                            <Status  prop={prop} id={id} dispatch={dispatch} user={user}/>
                            <TransactionType prop={prop} id={id} dispatch={dispatch} user={user} />
                            
                        </Grid>
                    </div>
                    <Grid style={{ marginLeft: '1em', paddingRight: '2em', position: 'relative' }} xs={6} md={7} container>
                        <Box onClick={() => setPhotoModal(true)} sx={{ display: 'flex', width: '96.5%', height: '75.5%', opacity: 0, '&:hover': { opacity: 100 , cursor: 'pointer'}, alignItems: 'center', justifyContent: 'center', position: 'absolute', zIndex: 50, top: 0, left: 0, right: 0, borderRadius: '20px'}}>
                                <Typography variant='h4' style={{ color: 'white', marginBottom: '2em'  }}>
                                    Upload Property Photo
                                </Typography>
                        </Box>
                        <CardMedia sx={{ display: { xs: 'none', md: 'inline-flex' } }} className={classes.media} component='img'  src={prop.propPhoto || emptyPhoto} alt={prop.address} />
                    </Grid>
                </div>
                            <Divider sx={{ width: '100%' }} />
                <div style={{ paddingRight: '2em' }} className={classes.card}>
                    <div className={classes.section}>
                        <Grid container>
                            <Grid item xs={12} lg={6}>

                                <Box sx={{ width: '95%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }} container spacing={2}>
                                    <Supplier prop={prop} />
                                    {showHidden && (
                                        <FileNotes ThemeProvider={ThemeProvider}  prop={prop} id={id} dispatch={dispatch} user={user} />
                                    )}
                                    <AcqDate prop={prop} />
                                    <InspectionPeriod prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <PostPossession prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <EarnestDeposit prop={prop} id={id} dispatch={dispatch} user={user} />
                                    {showHidden && 
                                    <EMDCheck prop={prop} id={id} dispatch={dispatch} user={user} />
                                    }
                                        <EMD prop={prop} id={id} dispatch={dispatch} />
                                    <AcqContractPrice prop={prop} id={id} dispatch={dispatch} user={user} />
                                    {showHidden && 
                                        <AcqPriceDrops prop={prop} id={id} dispatch={dispatch} user={user} />
                                    }
                                    {showHidden && 
                                        <AcqPriceIncrease prop={prop} id={id} dispatch={dispatch} user={user} />
                                    }
                                    {showHidden && 
                                        <AdditionalCost prop={prop} id={id} dispatch={dispatch} user={user} />
                                    }
                                    <OptionFee prop={prop} id={id} dispatch={dispatch} user={user} />
                                    {showHidden && 
                                        <FirstLegCredits prop={prop} id={id} dispatch={dispatch} user={user} />
                                    }
                                    {showHidden && 
                                        <FirstLegDebits prop={prop} id={id} dispatch={dispatch} user={user} />
                                    }
                                    <AcqFinalCost acqFinalNumber={acqFinalNumber} prop={prop} />
                                    <EscrowOfficer prop={prop} id={id} dispatch={dispatch} user={user}  />
                                    {showHidden && 
                                        <SecondEscrow prop={prop} id={id} dispatch={dispatch} user={user}  />
                                    }
                                    <WhoSold prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <WhoAssisted prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <SoldBy prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <DispoContractPrice prop={prop} id={id} dispatch={dispatch} user={user} />
                                    {showHidden && 
                                    <>
                                        <DispoPriceDrop prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <DispoPriceIncrease prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <SecondLegCredits prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <SecondLegDebits prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <BuyerCredits prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <PerDiem prop={prop} id={id} dispatch={dispatch} user={user} />
                                    </>
                                    }
                                    <DispoFinal dispoFinal={dispoFinal} prop={prop} id={id} dispatch={dispatch} user={user} />
                                    {showHidden && 
                                    <>
                                        <Revenue revenueFinal={revenueFinal} prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <GoodsSold prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <GrossProfit grossProfit={grossProfit} prop={prop} id={id} dispatch={dispatch} user={user} />
                                    </>
                                    }
                                    <SoldGP prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <PricingDate prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <CommitRelation prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <Typography gutterBottom variant="h6" color='light' component="h6">Source of Deal</Typography>
                                    <SourceOfDeal  prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <COE prop={prop}  />
                                    <Access prop={prop} />
                                </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <Box sx={{ width: '95%', display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center' }}>
                                    <Typography gutterBottom variant="h6" color='light' component="h6">Status of Sellers Docs</Typography>
                                        <SellerDocs  prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <Typography gutterBottom variant="h6" color='light' component="h6">Status of Cash Buyer's Docs</Typography>
                                        <BuyerDocs  prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <BuyerEMD prop={prop} id={id} dispatch={dispatch} user={user} />
                                    <Typography gutterBottom variant="h6" color='light' component="h6">Buyer's Earnest Deposit</Typography>
                                        <BuyersEarnest prop={prop} id={id} dispatch={dispatch} user={user}  />
                                        <BuyerEMDDate prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <BuyerContact prop={prop} id={id} dispatch={dispatch} user={user} />
                                        {showHidden && (
                                            <Commissions prop={prop} id={id} dispatch={dispatch} user={user} />
                                        )}
                                        {showHidden && 
                                            <Payouts prop={prop} id={id} dispatch={dispatch} user={user} />
                                        }
                                        {showHidden && 
                                            <PayoutRecipient prop={prop} id={id} dispatch={dispatch} user={user} />
                                        }
                                        {showHidden && 
                                        <>
                                            <Typography gutterBottom variant="h6" color='light' component="h6">Status of Payouts</Typography>
                                                <StatusPayouts prop={prop} id={id} dispatch={dispatch} user={user} />
                                        </>
                                        }
                                        <BuyerAcqDate prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <BuyerCloseDate prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <NetPrice prop={prop} id={id} dispatch={dispatch} user={user} />
                                        {showHidden &&
                                            <AddComp prop={prop} id={id} dispatch={dispatch} user={user} />
                                        }
                                        <CompletionDate prop={prop} />
                                        <DueToUs prop={prop} id={id} dispatch={dispatch} user={user} />
                                        {showHidden &&
                                        <>
                                        <Typography gutterBottom variant="h6" color='light' component="h6">Status of Actual Gross Profit</Typography>
                                            <StatusGP prop={prop} id={id} dispatch={dispatch} user={user} />
                                        </>
                                        }
                                        <Split prop={prop} id={id} dispatch={dispatch} user={user} />
                                        <AcqGP prop={prop} id={id} dispatch={dispatch} user={user} acqGPFifty={acqGPFifty} grossProft={grossProfit} />
                                        <Typography gutterBottom variant="h6" color='light' component="h6">Files</Typography>
                                        <Files prop={prop} id={id} dispatch={dispatch} user={user} />

                                </Box>
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </Paper>
        </Container>
            <MobileNav />
        </Box>
  )
}

export default PropertyDetails