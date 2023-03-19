import { Box, Pagination, Typography } from "@mui/material";
import { MetaData } from "../models/pagination";

interface Props {

    metaData: MetaData;
    onPageChange: (page: number) => void;
}
export default function AddPagination({ metaData, onPageChange }: Props) {
    const { currentPage, totalCount, totalPages, pageSize } = metaData;
    return (
        <Box display='flex' sx={{ mb: 2 }} justifyContent='space-between' alignItems='center'>
            <Typography>
                {totalPages} ogeden {(currentPage - 1) * pageSize + 1}-
                            {currentPage * pageSize > totalCount
                              ? totalCount
                              : currentPage * pageSize} arası goruntuleniyor
            </Typography>
            <Pagination
                color='secondary'
                size='large'
                count={totalPages}
                page={currentPage}
                onChange={(e,page)=>onPageChange(page)}

            />
        </Box>
    )
}