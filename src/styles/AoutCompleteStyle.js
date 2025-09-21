import '../assets/scss/variable.scss'
export const commonaoutcompletestyle = {
  
    '& .MuiOutlinedInput-root': {
      
        borderColor:'1px var(--input-border-color) solid',
        boxShadow: ' 0 0 2px var(--input-border-color)',
      
        borderRadius:2,
        '&.Mui-focused fieldset': {
           // Change border color on focus
         
           borderColor:'var(--input-border-color)',
           boxShadow: '0 0 2px 2px var(--input-border-color)',
           border: 1,
           borderRadius:2,
         
        },
        '&.Mui-hover fieldset': {
            // Change border color on focus
          
            borderColor:'var(--input-border-color)',
            boxShadow: '0 0 2px 2px var(--input-border-color)',
            border: 1,
            borderRadius:2,
          
         },
      },
      
      '& .MuiInputBase-input': {
        // Custom styles for input text
        
        fontFamily:'var(--common-font)',
        
        border:0,
      
        
      },
      '& .MuiInputLabel-root': {
        fontFamily:'var(--common-font)',
      },
      '& .MuiFormHelperText-root': {
        fontFamily:'var(--common-font)',
      },
  
};