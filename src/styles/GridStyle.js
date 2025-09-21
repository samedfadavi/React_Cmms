import '../assets/scss/variable.scss'
export const commongridstyle = {
  
    fontFamily: "var(--common-font)", // grid content
    
  boxShadow: 8,
    border: 2,
    borderRadius:3,
    
    borderColor:'var(--common-border-color)' ,
    '& .custom-header': {
        backgroundColor: 'var(--common-control-backcolor);',height:'40px',color:'var(--common-control-color)',
      },
    '& .MuiDataGrid-cell:hover': {
      color: 'primary.main',
    },
    '& .custom-cell': {
       
      },
      '& .MuiDataGrid-toolbarContainer': {
        justifyContent: 'flex-end', // moves toolbar to right side
      },
  
};