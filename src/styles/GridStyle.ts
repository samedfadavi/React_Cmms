import "../assets/scss/variable.scss";

export const commongridstyle = {
  fontFamily: "var(--common-font)", // Grid content font
  boxShadow: 8,
  border: 2,
  borderRadius: 3,
  borderColor: "var(--common-border-color)",

  "& .custom-header": {
    backgroundColor: "var(--common-control-backcolor)",
    height: "40px",
    color: "var(--common-control-color)",
  },

  "& .MuiDataGrid-cell:hover": {
    color: "primary.main",
  },

  "& .custom-cell": {
    // Add custom cell styles if needed
  },

  "& .MuiDataGrid-toolbarContainer": {
    backgroundColor: "red",
    alignContent: "flex-start",
    justifyContent: "flex-end", // Moves toolbar to right side
  },
  "& .MuiDataGrid-columnHeaders": {
    height: "40px",
    backgroundColor: "var(--common-control-backcolor)", // outer wrapper
    color: "var(--common-control-color)",
  },
  
  "& .MuiDataGrid-columnHeader, .MuiDataGrid-columnHeadersInner": {
    height: "40px",
    backgroundColor: "var(--common-control-backcolor)", // inner headers
    color: "var(--common-control-color)",
  }
} as const; // Keep TypeScript aware of literal types
