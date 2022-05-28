import { TableRow, TableHead as MuiTableHead, TableCell, alpha } from '@mui/material';

const TableHead = () => {
    const TABLE_CELLS = ['Character', 'Alive', 'Gender', 'Culture', 'Allegiances'];

    return (
        <MuiTableHead>
            <TableRow>
                {TABLE_CELLS.map((cell) => (
                    <TableCell
                        sx={(theme) => ({
                            color: theme.palette.primary.main,
                            fontSize: 16,
                            background: alpha(theme.palette.primary.main, 0.3),
                        })}
                    >
                        {cell}
                    </TableCell>
                ))}
            </TableRow>
        </MuiTableHead>
    );
};

export default TableHead;
