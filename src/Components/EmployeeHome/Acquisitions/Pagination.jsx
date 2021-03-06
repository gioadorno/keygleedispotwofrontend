import { Pagination, PaginationItem } from '@material-ui/lab';
import { Page } from './styles';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProps } from '../../../actions/properties';
import Stack from '@mui/material/Stack';
import { number } from 'prop-types';

const Paginate = ({ page }) => {

    const dispatch = useDispatch();

    const { numberOfPages } = useSelector((state) => state.posts)

    useEffect(() => {
        if(page) dispatch(getProps(page));
    }, [page])

    return (
        <Stack>
            <Pagination count={numberOfPages} page={Number(page) || 1} renderItem={(item) => (
                <Page color='primary' {...item} component={Link} to={`/acquisitions?page=${item.page}`} />
            )}>
                
            </Pagination>
        </Stack>
    )
}

export default Paginate
