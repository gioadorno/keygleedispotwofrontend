import { PropertyDiv, ImageDiv, Image, BoxDiv, Address, BottomDiv, LeftDiv, RightDiv, LabelDiv, Labels, Details, Photos, Phone, Email, Loading, LoadingDiv } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid' //For Keys
import { getMapProps, getActiveProps } from "../../../../../actions/properties";
import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import image from '../../Icons/Empty Photo.png'

const PropertyBox = ({ labels, details, classes }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getActiveProps());
    },'')

    // Get Properties from Database
    const { props, isLoading } = useSelector((state) => state.posts);

    return (
        <>
        {isLoading ? <LoadingDiv><CircularProgress /><Loading>Properties Loading...</Loading> </LoadingDiv> : (
        props.map((prop) => {
            if (prop.status === 'Active') {

            return(
            <PropertyDiv className={classes.propertyBox} key={uuidv4()}>
                <ImageDiv key={uuidv4()}>
                    {prop.propPhoto != '' ? (
                        <Image key={uuidv4()} src={prop.propPhoto} />
                    ) : <Image key={uuidv4()} src={image} />}
                </ImageDiv>
                <BoxDiv key={uuidv4()}>
                    <Address key={uuidv4()}>
                        {prop.address.replace(', USA', '')}
                    </Address>
                    <BottomDiv key={uuidv4()}>
                        <LeftDiv key={uuidv4()}>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.beds}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.beds}
                                </Details>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}> 
                                    {labels.baths}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.baths}
                                </Details>
                            </LabelDiv>
                            {prop.parking != '' ? (
                                <LabelDiv key={uuidv4()}>
                                    <Labels key={uuidv4()}>
                                        {labels.garage}
                                    </Labels>
                                    <Details key={uuidv4()}>  
                                        {prop.parking}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                            {prop.pool != '' ? (
                                <LabelDiv key={uuidv4()}>
                                    <Labels key={uuidv4()}>
                                        {labels.pool}
                                    </Labels>
                                    <Details key={uuidv4()}>  
                                        {prop.pool}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.yearBuilt}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.year}
                                </Details>
                            </LabelDiv>
                        </LeftDiv>
                        <RightDiv key={uuidv4()}>
                            {prop.photos != '' ? (
                                <LabelDiv key={uuidv4()}>
                                    <Labels key={uuidv4()}>
                                        {labels.photos}
                                    </Labels>
                                    <Photos key={uuidv4()} href={prop.pictureLink}>  
                                        {details.photos}
                                    </Photos>
                                </LabelDiv>
                            ) : null}
                            <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                    {labels.sqFoot}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.livingArea + details.sqft}
                                </Details>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Labels key={uuidv4()}>
                                    {labels.lotSize}
                                </Labels>
                                <Details key={uuidv4()}>  
                                    {prop.lotSize + details.sqft}
                                </Details>
                            </LabelDiv>
                            {prop.condition != '' ? (
                                <LabelDiv key={uuidv4()}>
                                    <Labels key={uuidv4()}>
                                        {labels.condition}
                                    </Labels>
                                    <Details key={uuidv4()}>  
                                        {prop.condition}
                                    </Details>
                                </LabelDiv>
                            ) : null}
                        </RightDiv>
                    </BottomDiv>
                </BoxDiv>
            </PropertyDiv>
            )
            }
        })
        )}
            
        </>
    )
}

PropertyBox.defaultProps = {
    labels: {
        beds: 'Beds: ',
        baths: 'Baths: ',
        garage: 'Garage: ',
        pool: 'Pool: ',
        sqFoot: 'Sq. Foot: ',
        lotSize: 'Lot Size: ',
        year: 'Year Built: ',
        wholesale: 'Wholesale: ',
        yearBuilt: 'Year: ',
        arv: 'ARV: ',
        market: 'Market: ',
        employee: 'Property Rep: ',
        photos: 'Photos: ',
        callText: 'Call/Text: ',
        email: 'Email: ',
        condition: 'Condition: '
    },
    details: {
        sqft: 'sqft',
        photos: 'Pictures'
    },
    classes: {
        propertyBox: 'propertyBox'
    }
}

export default PropertyBox
