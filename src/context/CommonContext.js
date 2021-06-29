import { createContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";

export const CommonContext = createContext();

const useStyles = makeStyles((theme) => ({
    paper: {
        position: "relative",
        top: "30%",
        left: "30%",
        width: "35%",
        backgroundColor: "#becad6",
        border: "2px solid #000",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
    table: {
        minWidth: 650,
    },
}));
const CommonContextProvider = (props) => {
    const classes = useStyles();
    const history = useHistory();
    const [open, setOpen] = useState(false);
    const [openSnack, setOpenSnack] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [id, setId] = useState(null);
    const [message, setMessage] = useState("");

    const handleOpen = () => {
        setOpen(true);
    };
    const handleOpenUpdate = (id) => {
        setId(id);
        setOpenUpdate(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenSnack = (message) => {
        setMessage(message);
        setOpenSnack(true);
    };
    const handleCloseSnack = () => {
        setOpenSnack(false);
    };
    return (
        <CommonContext.Provider
            value={{
                classes,
                open,
                setOpen,
                handleOpen,
                handleClose,
                history,
                id,
                handleOpenUpdate,
                openUpdate,
                message,
                handleOpenSnack,
                handleCloseSnack,
                setMessage,
                setOpenSnack,
                openSnack,
            }}
        >
            {props.children}
        </CommonContext.Provider>
    );
};
export default CommonContextProvider;
