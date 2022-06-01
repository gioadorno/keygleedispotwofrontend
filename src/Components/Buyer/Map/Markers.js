import { Marker, InfoWindow } from '@react-google-maps/api';
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid'; //For Keys
import { useEffect, useState } from 'react';
import { InfoDiv, PhotoBox, Photo, InfoAddress, Info, LabelDiv, Label, Photos, InfoLink } from './styles';
import { getBuyerProperties } from '../../../actions/buyerproperties';
import icon from './Icons/icons8-home-40.png';
import emptyPhoto from '../Empty Photo.png';
import { Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const Markers = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    // Get Properties from database
    const { buyerProps } = useSelector((state) => state.buyerproperties);
    
    
    // Allows the info box to be open and closed
    const [selected, setSelected] = useState(null);

    return (
        <>
        {buyerProps.map((marker) => (
                    marker.status === 'Active' && 
                        <Marker icon={icon} key={uuidv4()} animation={4} title={marker.address.replace(', USA', '')} center={{ lat: marker.lat, lng: marker.lng}} position={{ lat: marker.lat, lng: marker.lng}} onClick={() => {setSelected(marker)}} />
                ))}
        {selected && ( 
        <InfoWindow onCloseClick={() => {setSelected(null)}} key={uuidv4()} position={{ lat: selected.lat, lng: selected.lng}}>
            <InfoDiv key={uuidv4()}>
                <PhotoBox key={uuidv4()}>
                    <Photo key={uuidv4()} src={selected.propPhoto || emptyPhoto}/>
                </PhotoBox>
                <LabelDiv key={uuidv4()}>
                    <InfoAddress key={uuidv4()}>
                        {selected.address.replace(', USA', '')}
                    </InfoAddress>
                </LabelDiv>
                <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>Beds: </Label>
                    <Info key={uuidv4()}>{selected.beds}</Info>
                </LabelDiv>
                <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>Baths: </Label>
                    <Info key={uuidv4()}>{selected.baths}</Info>
                </LabelDiv>
                {/* <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>
                        Condition: 
                    </Label>
                    <Info key={uuidv4()}>  
                        {selected.condition}
                    </Info>
                </LabelDiv> */}
                <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>Property Rep: </Label>
                    <Info key={uuidv4()}>{selected.dispoName}</Info>
                </LabelDiv>
                <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>
                        Call/Text: 
                    </Label>
                    <InfoLink href={`tel:${selected.dispoPhone}`} key={uuidv4()}>  
                        {selected.dispoPhone}
                    </InfoLink>
                </LabelDiv>
                <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>
                        Email: 
                    </Label>
                    <InfoLink href={`mailto:${selected.dispoEmail}`} key={uuidv4()}>  
                        {selected.dispoEmail}
                    </InfoLink>
                </LabelDiv>
                {/* {selected.dispoName2 != '' && (
                    <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>Property Rep: </Label>
                    <Info key={uuidv4()}>{selected.dispoName2}</Info>
                </LabelDiv>
                )}
                {selected.dispoPhone2 != '' && (
                    <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>Call/Text: </Label>
                    <InfoLink href={`tel:${selected.dispoPhone2}`} key={uuidv4()}>{selected.dispoPhone2}</InfoLink>
                </LabelDiv>
                )}
                {selected.dispoEmail2 != '' && (
                    <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>Email: </Label>
                    <InfoLink href={`mailto:${selected.dispoEmail2}`} key={uuidv4()}>{selected.dispoEmail2}</InfoLink>
                </LabelDiv>
                )} */}
                {selected.pictureLink != '' && 
                <LabelDiv key={uuidv4()}>
                    <Label key={uuidv4()}>
                        Photos: 
                    </Label>
                    <Photos href={selected.pictureLink} key={uuidv4()}>  
                        Pictures
                    </Photos>
                </LabelDiv>
                }
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', mt: 1, pb: 2 }}>
                    <Button onClick={() => navigate(`/dashboard/${selected._id}`)}>Take it at&nbsp;  
                    {Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(selected.salePrice.replace('$', '').replace(',', '')) === `$${NaN}` ? selected.salePrice || 'Contact for Price'
                                    : Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(selected.salePrice.replace('$', '').replace(',', '')).replace('.00', '')}</Button>
                </Box>
            </InfoDiv>
        </InfoWindow>)}
</>
    )
}

export default Markers
