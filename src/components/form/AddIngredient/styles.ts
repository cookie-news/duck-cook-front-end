//Material UI
import {
    TableRow,
    styled
} from "@mui/material";

import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import MenuItem, { menuItemClasses } from '@mui/material/MenuItem';

export const StyledTableThreadRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export const StyledTableThreadCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        color: 'white !important',
    }
}));

export const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    [`&.${menuItemClasses.root}:hover`]: {
        color: 'white',
    },
    [`&.${menuItemClasses.selected}:hover`]: {
        color: 'black',
    }
}));