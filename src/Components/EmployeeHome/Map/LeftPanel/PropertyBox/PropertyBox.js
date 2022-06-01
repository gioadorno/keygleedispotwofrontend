import { PropertyDiv, ImageDiv, Image, BoxDiv, Address, BottomDiv, LeftDiv, RightDiv, LabelDiv, Labels, Details, Photos, Wholesaler, Loading, LoadingDiv } from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { getActiveProps } from "../../../../../actions/properties";
import { useEffect } from "react";
import { v4 as uuidv4 } from 'uuid' //For Keys
import { CircularProgress } from "@mui/material";
import noImage from '../../Icons/Empty Photo.png';

const PropertyBox = ({ labels, details, classes }) => {

    const dispatch = useDispatch();

    // Active Properties
    const { activeProps, activePropertiesLoading }  = useSelector((state) => state.activeproperties);


    return (
        <>
        {activePropertiesLoading ? <LoadingDiv><CircularProgress /><Loading>Properties Loading...</Loading> </LoadingDiv> : (
    activeProps.map((prop) => {
    if(prop.status === 'Active') {
        return(
        <PropertyDiv className={classes.propertyBox} key={uuidv4()}>
            <ImageDiv key={uuidv4()}>
                {prop.propPhoto != '' ? (
                    <Image key={uuidv4()} src={prop.propPhoto} />
                ) : <Image key={uuidv4()} src={noImage} />}
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
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.garage}
                            </Labels>
                            <Details key={uuidv4()}>  
                                {prop.parking}
                            </Details>
                        </LabelDiv>
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.pool}
                            </Labels>
                            <Details key={uuidv4()}>  
                                {prop.pool}
                            </Details>
                        </LabelDiv>
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.yearBuilt}
                            </Labels>
                            <Details key={uuidv4()}>  
                                {prop.year}
                            </Details>
                        </LabelDiv>
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.condition}
                            </Labels>
                            <Details key={uuidv4()}>  
                                {prop.condition}
                            </Details>
                        </LabelDiv>
                    </LeftDiv>
                    <RightDiv key={uuidv4()}>
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.wholesale}
                            </Labels>
                            <Details key={uuidv4()}>  
                                {prop.salePrice}
                            </Details>
                        </LabelDiv>
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.arv}
                            </Labels>
                            <Details key={uuidv4()}>  
                                {prop.arv}
                            </Details>
                        </LabelDiv>
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
                        {prop.submitBy === 'Wholesaler' ? (
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.wholesaler}
                            </Labels>
                            <Details key={uuidv4()}>  
                                {prop.name}
                            </Details>
                        </LabelDiv>
                        ) : 
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.employee}
                            </Labels>
                            <Details key={uuidv4()}>  
                                {prop.name}
                            </Details>
                        </LabelDiv>
                        }
                        <LabelDiv key={uuidv4()}>
                            <Labels key={uuidv4()}>
                                {labels.photos}
                            </Labels>
                            <Photos key={uuidv4()} href={prop.pictureLink}>  
                                {details.photos}
                            </Photos>
                        </LabelDiv>
                    </RightDiv>
                </BottomDiv>
            </BoxDiv>
            {prop.submitBy === 'Wholesaler' && (
                    <Wholesaler>
                        Property submitted by a Wholesaler
                    </Wholesaler>
                )}
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
        condition: 'Condition: ',
        employee: 'Employee: ',
        photos: 'Photos: ',
        wholesaler: 'Wholesaler: '
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
