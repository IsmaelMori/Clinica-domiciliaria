import { createTheme } from "@mui/material/styles";

const theme = createTheme({

    typography:{

        fontFamily:"Poppins"

    },

    palette:{

        primary:{

            main:"#2563EB"

        },

        background:{

            default:"#F8FAFC"

        }

    },

    shape:{

        borderRadius:18

    },

    components:{

        MuiPaper:{

            styleOverrides:{

                root:{

                    borderRadius:20,

                    backdropFilter:"blur(20px)",

                    background:"rgba(255,255,255,.72)",

                    border:"1px solid rgba(255,255,255,.4)",

                    boxShadow:"0 15px 35px rgba(0,0,0,.08)"

                }

            }

        },

        MuiButton:{

            styleOverrides:{

                root:{

                    borderRadius:14,

                    textTransform:"none",

                    fontWeight:600

                }

            }

        }

    }

});

export default theme;