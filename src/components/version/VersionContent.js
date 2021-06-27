import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/Add';
import { useContext } from 'react';
import { CommonContext } from '../../context/CommonContext';
import VersionForm from './VersionForm';
import VersionTable from './VersionTable';

const VersionContent = () => {
    const { open, handleClose, handleOpen } = useContext(CommonContext);
    return (
        <div>
            <Button
                startIcon={<Add />}
                type="button"
                variant="contained"
                color="primary"
                onClick={handleOpen}
            >
                Add
            </Button>
            <Modal open={open} onClose={handleClose}>
                <VersionForm />
            </Modal>
            <VersionTable />
        </div>
    );
};

export default VersionContent;
