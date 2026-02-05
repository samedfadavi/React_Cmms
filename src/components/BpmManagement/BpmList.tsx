import { useState, useMemo, useCallback } from "react";
import { Box, Checkbox, CircularProgress, Grid, Icon, Snackbar, Alert, Stack } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useBpmList } from "@/hooks/useBpmList";
import { useBpmMutations } from "@/hooks/useBpmMutations";
import { GridRow } from "@/services/bpm.service";
import { CustomButton } from "@/CustomControls/CustomButton";
import { CustomTooltip } from "@/CustomControls/CustomTooltip";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import SabteMoshtari from "@/components/Moshtari/SabteMoshtari";
import QuestionForm from "@/components/ConstForms/QuestionForm";
import Moshtari from "@/models/moshtari";
import { commongridstyle } from "@/styles/GridStyle";

interface BpmListProps {
  getSelectedRows: (rows: GridRow[]) => void;
}

const BpmList: React.FC<BpmListProps> = ({ getSelectedRows }) => {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [selectedRows, setSelectedRows] = useState<GridRow[]>([]);
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [moshtariData] = useState(new Moshtari());
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [snackError, setSnackError] = useState(false);

  const { data, isLoading, isFetching, isError, error, refetch } = useBpmList(page, pageSize);
  const { addMutation, updateMutation, deleteMutation } = useBpmMutations();

  const rows = data?.rows ?? [];
  const total = data?.total ?? 0;

  const convertToPersianNumerals = (value?: string | number) => {
    if (value == null) return "";
    const map = ["۰","۱","۲","۳","۴","۵","۶","۷","۸","۹"];
    return value.toString().split("").map(c => /\d/.test(c) ? map[Number(c)] : c).join("");
  };

  const handleRefresh = useCallback(() => refetch(), [refetch]);
  const handleReturnSelectedRows = useCallback(() => {
    getSelectedRows(selectedRows);
    setSelectedRows([]);
  }, [getSelectedRows, selectedRows]);

  const handleDeleteRow = useCallback((id: number) => {
    deleteMutation.mutate(id, {
      onSuccess: () => setSnackSuccess(true),
      onError: () => setSnackError(true)
    });
  }, [deleteMutation]);

  const columns: GridColDef<GridRow>[] = useMemo(() => [
    {
      field: "checkbox",
      width: 70,
      sortable: false,
      renderHeader: () => (
        <Checkbox
          checked={rows.length > 0 && rows.length === selectedRows.length}
          onChange={e => setSelectedRows(e.target.checked ? rows : [])}
        />
      ),
      renderCell: (params: GridRenderCellParams<any, GridRow>) => (
        <Checkbox
          checked={selectedRows.some(r => r.id === params.row.id)}
          onChange={() =>
            setSelectedRows(prev =>
              prev.some(r => r.id === params.row.id)
                ? prev.filter(r => r.id !== params.row.id)
                : [...prev, params.row]
            )
          }
        />
      ),
    },
    {
      field: "onvan",
      headerName: "عنوان",
      width: 260,
      renderCell: params => convertToPersianNumerals(params.value),
    },
    {
      field: "nameSabtKonande",
      headerName: "ثبت کننده",
      width: 390,
      renderCell: params => convertToPersianNumerals(params.value),
    },
    {
      field: "tarikhSabt",
      headerName: "تاریخ",
      width: 160,
      renderCell: params => convertToPersianNumerals(params.value),
    },
    {
      field: "actions",
      headerName: "عملیات",
      width: 100,
      renderCell: params => (
        <CustomButton onClick={() => handleDeleteRow(params.row.id)}>
          <Icon className="fa-solid fa-trash" />
        </CustomButton>
      ),
    }
  ], [rows, selectedRows, handleDeleteRow]);

  if (isLoading) return <Grid container justifyContent="center" alignItems="center" height="100vh"><CircularProgress /></Grid>;
  if (isError) return <Alert severity="error">{error?.message}</Alert>;

  return (
    <Box sx={{ height: "65vh", width: "100%" }}>
      <Stack direction="row" spacing={2} mb={1}>
        <CustomTooltip title="بروزرسانی">
          <CustomButton onClick={handleRefresh}><Icon className="fa-solid fa-rotate" /></CustomButton>
        </CustomTooltip>
        <CustomTooltip title="افزودن">
          <CustomButton onClick={handleReturnSelectedRows}><Icon className="fa-solid fa-check-double" /></CustomButton>
        </CustomTooltip>
      </Stack>

      <DataGrid
        sx={{ ...commongridstyle, height: "95%" }}
        rows={rows}
        columns={columns}
        rowHeight={35}
        pageSizeOptions={[10,20,50]}
        paginationMode="server"
        rowCount={total}
        page={page}
        onPageChange={setPage}
        onPageSizeChange={setPageSize}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
      />

      <CustomCircularProgress open={isFetching} />

      <SabteMoshtari open={open} moshtari={moshtariData} onClose={() => setOpen(false)} onSubmit={() => setSnackSuccess(true)} />
      <QuestionForm open={openDelete} onClose={() => setOpenDelete(false)} onConfirm={() => {}} message="اطلاعات مشتری حذف شود؟" />

      <Snackbar open={snackSuccess} autoHideDuration={4000}><Alert severity="success">عملیات با موفقیت انجام شد</Alert></Snackbar>
      <Snackbar open={snackError} autoHideDuration={4000}><Alert severity="error">خطا رخ داد</Alert></Snackbar>
    </Box>
  );
};

export default BpmList;
