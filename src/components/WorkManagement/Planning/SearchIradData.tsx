import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Checkbox,
  IconButton,
  Slide,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CloseIcon from '@mui/icons-material/Close';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import axios from 'axios';

import config from '@/config';
import { commondialogstyle } from '@/styles/DialogStyle';
import { commonaoutcompletestyle } from '@/styles/AoutCompleteStyle';
import '@/assets/scss/SabteSorathesab.scss';

import type { TransitionProps } from '@mui/material/transitions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/* ----------------------------------
   Types
-----------------------------------*/

type IradItem = {
  [key: string]: any;
  onvan_irad: string;
};

type SearchIradDataProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: IradItem[] | null) => void;
  title?: string;
  onvantajhiz: string;
  defaultitems: string;
  keyfiled: string;
  ID: number | string;
};

/* ----------------------------------
   Transition
-----------------------------------*/

const Transition = React.forwardRef<HTMLDivElement, TransitionProps>(
  function Transition(props, ref) {
    return <Slide direction="down" ref={ref} {...props} />;
  }
);

/* ----------------------------------
   Component
-----------------------------------*/

const SearchIradData = ({
  open,
  onClose,
  onSubmit,
  onvantajhiz,
  defaultitems,
  keyfiled,
  ID,
}: SearchIradDataProps) => {
  const [iraddata, setIradData] = useState<IradItem[]>([]);
  const [selectedValue, setSelectedValue] = useState<IradItem[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<IradItem[]>(
          `${config.API_URL}/Derakht_Tajhizat/List_Iradat_Noe_Tajhiz?ID_Tajhiz=${ID}`
        );
        setIradData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [ID]);

  const handleValueChange = (
    _: React.SyntheticEvent,
    value: IradItem[]
  ) => {
    setSelectedValue(value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(selectedValue);
  };

  return (
    <Dialog
      className="form-box"
      open={open}
      onClose={onClose}
      fullWidth
      slotProps={commondialogstyle}
      sx={{ backdropFilter: 'none', backgroundColor: 'transparent' }}
      slots={{ transition: Transition }}
    >
      <IconButton
        aria-label="close"
        onClick={handleSubmit}
        sx={(theme) => ({
          position: 'absolute',
          right: 8,
          top: 8,
          color: theme.palette.warning[500],
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <form onSubmit={handleSubmit} className="form-grid">
          <Autocomplete
            multiple
            options={iraddata}
            disableCloseOnSelect
            onChange={handleValueChange}
            onClose={handleSubmit}
            defaultValue={iraddata.filter((item) =>
              defaultitems
                .split(',')
                .includes(String(item[keyfiled]))
            )}
            getOptionLabel={(option) => option.onvan_irad}
            renderOption={(props, option, { selected }) => {
              const { key, ...optionProps } = props;
              return (
                <li
                  key={key}
                  {...optionProps}
                  style={{ fontFamily: 'IRANSans' }}
                >
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />
                  {option.onvan_irad}
                </li>
              );
            }}
            style={{ width: 500 }}
            renderInput={(params) => (
              <TextField
                {...params}
                sx={commonaoutcompletestyle}
                label={onvantajhiz}
                placeholder="انتخاب کنید"
              />
            )}
          />
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SearchIradData;
