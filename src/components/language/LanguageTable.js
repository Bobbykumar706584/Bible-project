import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

import { useContext } from "react";
import { CommonContext } from "../../context/CommonContext";
import Update from "./Update";
import CommonSnack from "../CommonSnack";
import { LanguageContext } from "../../context/LanguageContext";

const LanguageTable = () => {
    const {
        classes,
        handleOpenUpdate,
        openUpdate,
        handleClose,
        setMessage,
        setOpenSnack,
    } = useContext(CommonContext);
    const { data, isLoading, error } = useContext(LanguageContext);

    const rowDelete = (id, message) => {
        fetch("http://localhost:8000/languages/" + id, {
            method: "DELETE",
        }).then(window.location.reload());
        setMessage(message);
        setOpenSnack(true);
    };

    if (isLoading) return "Loading...";
    if (error) return "An error has occured" + error.message;

    return (
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Language Id</TableCell>
                            <TableCell>Language name</TableCell>
                            <TableCell>Language code</TableCell>
                            <TableCell>Direction</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Edit</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.direction}</TableCell>
                                <TableCell>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={() =>
                                            rowDelete(item.id, "item deleted")
                                        }
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        onClick={() =>
                                            handleOpenUpdate(item.id)
                                        }
                                        variant="contained"
                                        color="primary"
                                    >
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={openUpdate} onClose={handleClose}>
                <Update />
            </Modal>
            <CommonSnack />
        </div>
    );
};

export default LanguageTable;
