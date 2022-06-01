import { Marker, InfoWindow, } from '@react-google-maps/api';
import { useSelector, useDispatch } from "react-redux";
import { v4 as uuidv4 } from 'uuid'; //For Keys
import { InfoDiv, PhotoBox, Photo, InfoAddress, Info, LabelDiv, Label, PropertyLink } from './styles';
import { useEffect, useState } from 'react';
import { getMarkers } from '../../../../actions/markers';
import { getActiveProps, getAllProperties } from '../../../../actions/properties';
import icon from '../Icons/icons8-home-40.png';
import wholesaleIcon from '../Icons/icons8-home-40-wholesale.png';
import noImage from '../Icons/Empty Photo.png';
import { getAddress } from '../../../../actions/address';
import { Paper } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';


const Markers = ({ labels, infoBox, getMarker, setGetMarker, selected, setSelected }) => {

    const navigate = useNavigate();
    
    // Usings Markers in Database
    const markers = useSelector((state) => state.markers);
    const { props, isLoading } = useSelector((state) => state.posts);
    // const { activeProps, activePropertiesLoading }  = useSelector((state) => state.activeproperties);
    const searchAddress = useSelector((state) => state.address);

    
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllProperties());
    },[])

    useEffect(() => {
        getAddress();
    },'');

    const openProperty = () => {
        navigate(`/acquisitions/${selected._id}`)
    };
    
    
    console.log(selected)

    props.map((marker) => (
        marker.status === 'Active' && getMarker.address === marker.address ? setSelected(marker) : null
    ));
    
    return (
        <>
                {props.map((marker) => (
                    marker.status === 'Active' && marker.submitBy != 'Wholesaler' ?
                        <Marker icon={icon} key={uuidv4()} center={{ lat: marker.lat, lng: marker.lng}} position={{ lat: marker.lat, lng: marker.lng}} onClick={() => {setSelected(marker)}} />
                        : null
                ))}
                {props.map((marker) => (
                    marker.status === 'Active' && marker.submitBy === 'Wholesaler' ?
                        <Marker icon={wholesaleIcon} key={uuidv4()} center={{ lat: marker.lat, lng: marker.lng}} position={{ lat: marker.lat, lng: marker.lng}} onClick={() => {setSelected(marker)}} />
                        : null
                ))}
                {getMarker && (
                    <Marker key={uuidv4()} center={{ lat: getMarker.lat, lng: getMarker.lng}} position={{ lat: getMarker.lat, lng: getMarker.lng}} />
                )}
                    {selected && ( 
                    <InfoWindow onCloseClick={() => {setSelected(null)}} key={uuidv4()} position={{ lat: selected.lat, lng: selected.lng}}>
                        <InfoDiv key={uuidv4()}>
                            <PhotoBox key={uuidv4()}>
                                {selected.propPhoto != '' ? (
                                    <Photo key={uuidv4()} src={selected.propPhoto}/>
                                ) : <Photo key={uuidv4()} src={noImage}/>}
                            </PhotoBox>
                            <LabelDiv key={uuidv4()}>
                                <PropertyLink onClick={openProperty} key={uuidv4()}>
                                    View Property Details
                                </PropertyLink>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <InfoAddress key={uuidv4()}>
                                    {selected.address.replace(', USA', '')}
                                </InfoAddress>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Label key={uuidv4()}>Wholesale: </Label>
                                <Info key={uuidv4()}>{selected.salePrice}</Info>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Label key={uuidv4()}>ARV: </Label>
                                <Info key={uuidv4()}>{selected.arv}</Info>
                            </LabelDiv>
                            <LabelDiv key={uuidv4()}>
                                <Label key={uuidv4()}>Acquistion: </Label>
                                <Info key={uuidv4()}>{selected.name}</Info>
                            </LabelDiv>
                            {selected.dispoName != '' &&
                            <LabelDiv key={uuidv4()}>
                                <Label key={uuidv4()}>Dispositions: </Label>
                                <Info key={uuidv4()}>{selected.dispoName}</Info>
                            </LabelDiv>
                            }
                        </InfoDiv>
                    </InfoWindow>)}
            
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
        photos: 'Photos: '
    }
}

export default Markers
