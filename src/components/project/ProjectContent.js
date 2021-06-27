import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Add from "@material-ui/icons/Add";
import { useContext } from "react";
import { CommonContext } from "../../context/CommonContext";
import ProjectForm from "./ProjectForm";
import ProjectTable from "./ProjectTable";

const ProjectContent = () => {
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
                <ProjectForm />
            </Modal>
            <ProjectTable />
        </div>
    );
};

export default ProjectContent;
