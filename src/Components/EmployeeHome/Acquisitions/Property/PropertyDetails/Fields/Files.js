import { Grid, ListItem, Button, CardMedia, Modal, Box, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { Stack, Paper } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FileBase from 'react-file-base64';
import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { getFiles, createFile, deleteFile } from "../../../../../../actions/files";
import { pink } from '@mui/material/colors';
import { Document, Page, pdfjs  } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const Files = ({ user, prop, dispatch, id }) => {
    let today = new Date();
    const placeholderDate = parseInt(today.getMonth()+1) + '-' + today.getDate() + "-" + today.getFullYear();

    useEffect(() => {
        dispatch(getFiles());
    }, [dispatch])

    const propertyFiles = useSelector((state) => state.files);
    const [getFileID, setGetFileID] = useState(null);
    const [uploadFiles, setUploadFiles] = useState({ 
        address: prop.address,
        fileName: '',
        file: '',
        date: placeholderDate,
        uploadBy: user?.result?.name
    });
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [openFile, setOpenFile] = useState(null);

  
    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    }

    const changeFiles = (e) => {
        e.preventDefault();
        dispatch(createFile(uploadFiles));
    };

    const deleteFileFunction = () => {
        dispatch(deleteFile(getFileID._id))
    };

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        width: '100%',
        
        
      }));

  return (
    <Grid container style={{ width: '100%' }} spacing={2} >
        <Stack style={{ width: '100%' }} spacing={2}>
        {propertyFiles.map((file) => {
            if(prop.address === file.address) return (
                <Item className="grid grid-cols-3" elevation={4} onMouseOver={() => setGetFileID(file)}>
                    <Grid item>
                    <Button  variant='text' onClick={() => setOpenFile(file)} >
                        {file.fileName}
                    </Button>
                    </Grid>
                    {openFile && openFile.file == file.file && (
                        <Modal open={file} onClose={() => setOpenFile(!openFile)}>
                        <Document file={file.file} onLoadSuccess={onDocumentLoadSuccess}>
                        {Array.from(
                        new Array(numPages),
                        (el, index) => (
                        <Page
                            key={`page_${index + 1}`}
                            pageNumber={index + 1}
                        />
                        ),
                    )}
                        </Document>
                            </Modal>
                    )}
                    <Grid item>
                        <Typography color='primary'>
                            Attached by {file.uploadBy} on {file.date}
                        </Typography>
                    </Grid>
                    {user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' && (
                        <Grid className="z-10" item>
                            <DeleteIcon sx={{ color: pink[500] }} className='hover:animate-bounce hover:duration-100 cursor-pointer z-10 hover:bg-sky-400'  onClick={deleteFileFunction}>
                                Delete File
                            </DeleteIcon>
                        </Grid>
                    )}
                </Item>
            )
        })}
        </Stack>
        <Grid item xs={12}>
        {user.result.securityLevel === 'Operations' || user.result.securityLevel === 'System Administrator' && (
            <>
                <FileBase className='uploadFile' type='file' style={{ marginLeft: '1em', backgroundColor: 'blue' }} placeholder="Upload File..." onDone={(fileInfo) => setUploadFiles({ ...uploadFiles, file: fileInfo.base64, fileName: fileInfo.name })} multiple={false} />
                <Button variant='contained' onClick={changeFiles}>
                    Upload
                </Button>
            </>
            )}
        </Grid>
    </Grid>
  )
}

export default Files