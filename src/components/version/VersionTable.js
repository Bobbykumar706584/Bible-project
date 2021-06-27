import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button"
import Modal from '@material-ui/core/Modal';

import { useContext } from "react";
import { CommonContext } from "../../context/CommonContext";
import VersionUpdate from './VersionUpdate';
import CommonSnack from "../CommonSnack";
import { VersionContext } from '../../context/VersionContext';


const VersionTable = () => {
    const {classes, handleOpenUpdate, openUpdate, handleClose, setMessage,setOpenSnack} = useContext(CommonContext)
    const {data, isLoading, error} = useContext(VersionContext)

    const rowDelete = (id, message) => {
        fetch("http://localhost:8000/versions/"+id, {
            method: "DELETE"
        }).then(
            window.location.reload()
        )
        setMessage(message)
        setOpenSnack(true)
    }

    if(isLoading) return 'Loading...'
    if(error) return 'An error has occured'+ error.message

    return ( 
        <div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Version Id</TableCell>
                            <TableCell>Version name</TableCell>
                            <TableCell>Version code</TableCell>
                            <TableCell>Revision</TableCell>
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
                            <TableCell>{item.revision}</TableCell>
                            <TableCell>
                                <Button variant="contained" color="secondary" onClick={() => rowDelete(item.id, "item deleted")}>Delete</Button>
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleOpenUpdate(item.id)} variant="contained" color="primary">Edit</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal open={openUpdate} onClose={handleClose}>
                <VersionUpdate />
            </Modal>
            <CommonSnack />
        </div>
     );
}
 
export default VersionTable;