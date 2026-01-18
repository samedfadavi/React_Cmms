import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import {
  Box,
  Checkbox,
  CircularProgress,
  Grid,
  Icon,
  Snackbar,
  Alert,
  Stack,
} from "@mui/material";
import { DataGrid , GridColumnMenu ,useGridApiContext } from '@mui/x-data-grid';
import MenuItem from "@mui/material/MenuItem";

import config from "@/config";
import SabteMoshtari from "@/components/Moshtari/SabteMoshtari";
import Moshtari from "@/models/moshtari";
import QuestionForm from "@/components/ConstForms/QuestionForm";
import { commongridstyle } from "@/styles/GridStyle"
import { findNodeById, findParentById } from "@/jeneralscripts";
import CustomCircularProgress from "@/components/CustomCircularProgress";
import { CustomButton } from "@/CustomControls/CustomButton";
import { CustomTooltip } from "@/CustomControls/CustomTooltip";

import "@/assets/scss/variable.scss";
import React from "react";

/* =====================
   Types
===================== */

interface TajhizNode {
  ID: number;
  Parent_tajhiz: number;
  Bazdid: number;
  Field_Rabet: string;
  Code_Pm: string;
  Name_Jadval_Pm: string;
  Code_No_DerakhtTajhizat: number;
  where: string;
}

interface GridRow {
  pk_id: number;
  name_tajhiz: string;
  Tarikh: string;
  onvane_irad: string;
}

interface BpmListProps {
  nodesData: TajhizNode[];
  checkedNodes: number[];
  getSelectedRows: (rows: GridRow[]) => void;
}

/* =====================
   Column Menu
===================== */

function CustomFilterItem(props: any) {
  const { onClick, colDef } = props;
  const apiRef = useGridApiContext();

  const handleClick = useCallback(
    (event: React.MouseEvent) => {
      apiRef.current.showFilterPanel(colDef.field);
      onClick(event);
    },
    [apiRef, colDef.field, onClick]
  );

  return <MenuItem onClick={handleClick}>فیلتر</MenuItem>;
}

function CustomColumnMenu(props: any) {
  return (
    <GridColumnMenu
      {...props}
      slots={{ columnMenuFilterItem: CustomFilterItem }}
    />
  );
}

/* =====================
   Component
===================== */

const BpmList = ({ nodesData, checkedNodes, getSelectedRows }: BpmListProps) => {
  const idKey = "ID";

  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [rows, setRows] = useState<GridRow[]>([]);
  const [selectedRows, setSelectedRows] = useState<GridRow[]>([]);
  const [selectedTajhiz, setSelectedTajhiz] = useState<TajhizNode[]>([]);
  const [moshtariData, setMoshtariData] = useState<Moshtari>(new Moshtari());

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openProgress, setOpenProgress] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [snackSuccess, setSnackSuccess] = useState(false);
  const [snackError, setSnackError] = useState(false);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /* =====================
     Helpers
  ===================== */

  const convertToPersianNumerals = (value?: string | number): string => {
    if (value == null ) return "";
    const map = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return value
      .toString()
      .split("")
      .map((c) => (/\d/.test(c) ? map[Number(c)] : c)) // <-- only digits
      .join("");
  };

  const setSearchExpression = (tajhiz: TajhizNode): string => {
    let query = `where ${tajhiz.Field_Rabet} in (`;
    let parentId = tajhiz[idKey];
    let where = "";
    let closing = "";

    do {
      parentId = findParentById(nodesData, String(parentId), 0, idKey);
      const parent = findNodeById(nodesData, String(parentId), idKey);

      where = parent.where;

      if (
        parent.Code_No_DerakhtTajhizat > 1 ||
        parent.Name_Jadval_Pm === "tbl_Omoor"
      ) {
        query += `select ${parent.Code_Pm} from ${parent.Name_Jadval_Pm}`;
        query += where ? ` ${where}` : ` where ${parent.Field_Rabet} in (`;
        closing += ")";
      }
    } while (parentId > 0 && where === "");

    return query + closing;
  };

  /* =====================
     Actions
  ===================== */
  useEffect(() => {
    const fetchData = async () => {
      setOpenProgress(true);
        const response = axios.get(`${config.API_URL}/farayand`)
        .then((response) => {
          setRows(response.data);  // Set data from response
  
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
      })
      .finally(() => {
        setOpenProgress(false);
      });
       
    };

    fetchData();
  }, []); 
  const searchAndDisplay = async (): Promise<void> => {
  
  };

  const returnSelectedRows = (): void => {
    getSelectedRows(selectedRows);
    setRows((prev) => prev.filter((r) => !selectedRows.includes(r)));
    setSelectedRows([]);
  };

  /* =====================
     Columns
  ===================== */

  const columns: GridColDef<GridRow>[] = useMemo(
    () => [
      {
        field: "checkbox",
        width: 70,
        sortable: false,
        renderHeader: () => (
          <Checkbox
            checked={rows.length > 0 && rows.length === selectedRows.length}
            onChange={(e) =>
              setSelectedRows(e.target.checked ? rows : [])
            }
          />
        ),
        renderCell: ({ row }) => (
          <Checkbox
            checked={selectedRows.some((r) => r.id === row.id)}
            onChange={() =>
              setSelectedRows((prev) =>
                prev.some((r) => r.id === row.id)
                  ? prev.filter((r) => r.id !== row.id)
                  : [...prev, row]
              )
            }
          />
        ),
      },
      {
        field: "onvan",
        headerName: "عنوان",
        width: 260,
        renderCell: (p) => convertToPersianNumerals(p.value),
      },
      {
        field: "nameSabtKonande",
        headerName: "ثبت کننده",
        width: 390,
        renderCell: (p) => convertToPersianNumerals(p.value),
      },
      {
        field: "tarikhSabt",
        headerName: "تاریخ",
        width: 160,
        renderCell: (p) => convertToPersianNumerals(p.value),
      },
    ],
    [rows, selectedRows]
  );

  /* =====================
     Effects
  ===================== */

  useEffect(() => {
    setLoading(false);
  }, [submitted]);

  /* =====================
     Render
  ===================== */

  if (loading) {
    return (
      <Grid container justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Grid>
    );
  }

  if (error) return <div>Error: {error}</div>;

  return (
    <Box sx={{ height: "65vh", width: "100%" }}>
      <Stack direction="row" spacing={2} mb={1}>
        <CustomTooltip title="جستجو">
          <CustomButton onClick={searchAndDisplay}>
            <Icon className="fa-solid fa-rotate" />
          </CustomButton>
        </CustomTooltip>

        <CustomTooltip title="افزودن">
          <CustomButton onClick={returnSelectedRows}>
            <Icon className="fa-solid fa-check-double" />
          </CustomButton>
        </CustomTooltip>
      </Stack>

      <DataGrid sx={{...commongridstyle ,height:'95%'} }  rowHeight={35}   rows={rows}  style={{fontFamily:'IRANSans', textAlign:'center'} }   initialState={{
    columns: {
      columnVisibilityModel: {
        // Hide columns id  the other columns will remain visible
        id: false,
       
      },
    },
  }}

  
       getRowId={(row) => row.id} columns={columns} pageSize={10} rowsPerPageOptions={[10]} />

      <CustomCircularProgress open={openProgress} />

      <SabteMoshtari
        open={open}
        moshtari={moshtariData}
        onClose={() => setOpen(false)}
        onSubmit={() => setSubmitted((s) => !s)}
      />

      <QuestionForm
        open={openDelete}
        onClose={() => setOpenDelete(false)}
        onConfirm={() => {}}
        message="اطلاعات مشتری حذف شود؟"
      />

      <Snackbar open={snackSuccess} autoHideDuration={4000}>
        <Alert severity="success">تغییرات با موفقیت انجام شد</Alert>
      </Snackbar>

      <Snackbar open={snackError} autoHideDuration={4000}>
        <Alert severity="error">{errorText}</Alert>
      </Snackbar>
    </Box>
  );
};

export default BpmList