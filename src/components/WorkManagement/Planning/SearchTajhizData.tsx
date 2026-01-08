import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  TextField,
  Checkbox,
  IconButton,
  Slide,
} from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CloseIcon from '@mui/icons-material/Close';

import { commondialogstyle } from '@/styles/DialogStyle';
import { commonaoutcompletestyle } from '@/styles/AoutCompleteStyle';
import '@/assets/scss/SabteSorathesab.scss';

import type { TransitionProps } from '@mui/material/transitions';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

/* ----------------------------------
   Types
-----------------------------------*/

type TajhizItem = {
  [key: string]: any;
};

type SearchTajhizDataProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: TajhizItem[] | null) => void;
  listTajhiz: TajhizItem[];
  title: string;
  onvantajhiz: string;
  defaultitems: string;
  keyfiled: string;
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

const SearchTajhizData = ({
  open,
  onClose,
  onSubmit,
  listTajhiz,
  title,
  onvantajhiz,
  defaultitems,
  keyfiled,
}: SearchTajhizDataProps) => {
  const [selectedValue, setSelectedValue] = useState<TajhizItem[] | null>(null);

  const handleValueChange = (
    _: React.SyntheticEvent,
    value: TajhizItem[]
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
            options={listTajhiz}
            disableCloseOnSelect
            onChange={handleValueChange}
            onClose={handleSubmit}
            defaultValue={listTajhiz.filter((item) =>
              defaultitems
                .split(',')
                .includes(String(item[keyfiled]))
            )}
            getOptionLabel={(option) => String(option[title])}
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
                  {option[title]}
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

export default SearchTajhizData;
