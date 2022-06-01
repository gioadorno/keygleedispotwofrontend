import { Marker, InfoWindow, } from '@react-google-maps/api';
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid'; //For Keys
import { InfoDiv, PhotoBox, Photo, InfoAddress, Info, LabelDiv, Label, Photos, InfoLink } from './styles';
import { useEffect, useState } from 'react';
import { getMarkers } from '../../../../actions/markers';
import { getActiveProps } from '../../../../actions/properties';
import icon from '../Icons/icons8-home-40.png';
import noImage from '../Icons/Empty Photo.png';


const marketMarkers = [
    {
        market: 'Orlando, FL',
        lat: 28.5384,
        lng: -81.3792
    },
    {
        market: 'Tampa, FL',
        lat: 27.9791,
        lng: -82.5393
    },
    {
        market: 'Newark, NJ',
        lat: 40.7356,
        lng: -74.1723
    },
    {
        market: 'Orlando, FL',
        lat: 28.5384,
        lng: -81.3792
    },
    {
        market: 'Salt Lake City, UT',
        lat: 40.7587,
        lng: -111.8761
    },
    {
        market: 'Charlotte, NC',
        lat: 35.2270,
        lng: -80.8431
    },
    {
        market: 'Columbus, OH',
        lat: 39.9833,
        lng: -82.9833
    },
    {
        market: 'Kansas City, MO',
        lat: 39.0997,
        lng: -94.5783
    },
    {
        market: 'St. Louis, MO',
        lat: 38.6270,
        lng: -90.1994
    },
    {
        market: 'Austin, TX',
        lat: 30.2666,
        lng: -97.7333
    },
    {
        market: 'San Antonio, TX',
        lat: 29.4243,
        lng: -98.4911
    },
    {
        market: 'Dallas, TX',
        lat: 32.7791,
        lng: -96.8088
    },
    {
        market: 'Houston, TX',
        lat: 29.7499,
        lng: -95.3584
    },
    {
        market: 'Atlanta, GA',
        lat: 33.7537,
        lng: -84.3863
    },
    {
        market: 'Tucson, AZ',
        lat: 32.2534,
        lng: -110.9117
    },
    {
        market: 'Northern Arizona',
        lat: 35.1982,
        lng: -111.6512
    },
    {
        market: 'Las Vegas, NV',
        lat: 36.1146,
        lng: -115.1728
    },
    {
        market: 'Indianapolis, IN',
        lat: 39.7910,
        lng: -86.1480
    },
    {
        market: 'Birmingham, AL',
        lat: 33.5436,
        lng: -86.7796
    },
]


const Markers = ({ labels, infoBox }) => {

    // Usings Markers in Database
    // const markers = useSelector((state) => state.markers);
    const { props, isLoading } = useSelector((state) => state.posts);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getActiveProps());
    },[]);
    
    // Allows the info box to be open and closed
    const [selected, setSelected] = useState(null);

    
    return (
        <>
                {/* {props.map((marker) => (
                    marker.status === 'Active' ?
                        <Marker icon={icon} title={marker.address} key={uuidv4()} center={{ lat: marker.lat, lng: marker.lng}} position={{ lat: marker.lat, lng: marker.lng}} onClick={() => {setSelected(marker)}} />
                        : null
                ))} */}
                {marketMarkers.map((marker) => (
                    <Marker icon={icon} title={marker.market} key={uuidv4()} center={{ lat: marker.lat, lng: marker.lng}} position={{ lat: marker.lat, lng: marker.lng}} onClick={() => {setSelected(marker)}} />
                ))}
                    {selected && ( 
                        <InfoWindow onCloseClick={() => {setSelected(null)}} position={{ lat: selected.lat, lng: selected.lng}}>
                            <>
                            <Info style={{ width: '100%', textAlign: 'center', fontWeight: '600', textDecoration: 'underline' }}>{selected.market}</Info>

                            <Info style={{ width: '100%', textAlign: 'center' }}>For more information, <br/> Call/Text us at <a href={`tel:602-784-3800`}>602-784-3800</a></Info>
                            </>
                        </InfoWindow>
                    // <InfoWindow onCloseClick={() => {setSelected(null)}} key={uuidv4()} position={{ lat: selected.lat, lng: selected.lng}}>
                    //     <InfoDiv key={uuidv4()}>
                    //         <PhotoBox key={uuidv4()}>
                    //             {selected.propPhoto != '' ? (
                    //                 <Photo key={uuidv4()} src={selected.propPhoto}/>
                    //             ) : <Photo key={uuidv4()} src={noImage}/>}
                    //         </PhotoBox>
                    //         <LabelDiv key={uuidv4()}>
                    //             <InfoAddress key={uuidv4()}>
                    //                 {selected.address.replace(', USA', '')}
                    //             </InfoAddress>
                    //         </LabelDiv>
                    //         <LabelDiv key={uuidv4()}>
                    //             <Label key={uuidv4()}>Beds: </Label>
                    //             <Info key={uuidv4()}>{selected.beds}</Info>
                    //         </LabelDiv>
                    //         <LabelDiv key={uuidv4()}>
                    //             <Label key={uuidv4()}>Baths: </Label>
                    //             <Info key={uuidv4()}>{selected.baths}</Info>
                    //         </LabelDiv>
                    //         <LabelDiv key={uuidv4()}>
                    //             <Label key={uuidv4()}>
                    //                 Condition: 
                    //             </Label>
                    //             <Info key={uuidv4()}>  
                    //                 {selected.condition}
                    //             </Info>
                    //         </LabelDiv>
                    //         <LabelDiv key={uuidv4()}>
                    //             <Label key={uuidv4()}>Property Rep: </Label>
                    //             <Info key={uuidv4()}>{selected.dispoName}</Info>
                    //         </LabelDiv>
                    //         <LabelDiv key={uuidv4()}>
                    //             <Label key={uuidv4()}>
                    //                 Call/Text: 
                    //             </Label>
                    //             <InfoLink href={`tel:${selected.dispoPhone}`} key={uuidv4()}>  
                    //                 {selected.dispoPhone}
                    //             </InfoLink>
                    //         </LabelDiv>
                    //         <LabelDiv key={uuidv4()}>
                    //             <Label key={uuidv4()}>
                    //                 Email: 
                    //             </Label>
                    //             <InfoLink href={`mailto:${selected.dispoEmail}`} key={uuidv4()}>  
                    //                 {selected.dispoEmail}
                    //             </InfoLink>
                    //         </LabelDiv>
                    //         <LabelDiv key={uuidv4()}>
                    //             <Label key={uuidv4()}>
                    //                 Photos: 
                    //             </Label>
                    //             <Photos href={selected.pictureLink} key={uuidv4()}>  
                    //                 Pictures
                    //             </Photos>
                    //         </LabelDiv>
                    //     </InfoDiv>
                    // </InfoWindow>
                    )}
            
        </>
    )
}

Markers.defaultmarkers = {
    infoBox: 'infoBox',
    infoBoxStyle: {
        display: 'none',
    },
    labels: {
        beds: 'Beds: ',
        baths: 'Baths: ',
        garage: 'Garage: ',
        pool: 'Pool: ',
        sqFoot: 'Sq. Foot: ',
        lotSize: 'Lot Size: ',
        year: 'Year Built: ',
        wholesale: 'Wholesale: ',
        arv: 'ARV: ',
        market: 'Market: ',
        employee: 'Employee: ',
        photos: 'Photos: ',
        callText: 'Call/Text:',
        email: 'Email:'
    }
}

export default Markers
