import { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import { ProjectContext } from "../../context/ProjectContext";
import CommonSnack from "../CommonSnack";
import { bibleBooks } from "../BibleBooks";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

const ProjectUpdate = () => {
    const { classes, handleClose, id, handleOpenSnack } =
        useContext(CommonContext);
    const {
        sourceLang,
        setSourceLang,
        targetLang,
        setTargetLang,
        projectName,
        setProjectName,
    } = useContext(ProjectContext);
    const [books, setBooks] = useState(bibleBooks);

    const handleUpdate = () => {
        const checkedBox = { sourceLang, targetLang, projectName, books };
        fetch(`http://localhost:8000/projects/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(checkedBox),
        });
    };

    const onCheck = (e) => {
        let tempBooks = books.map((item) => {
            if (item.book === e.target.name) {
                item.isChecked = e.target.checked;
            }
            return item;
        });
        return setBooks(tempBooks);
    };

    useEffect(() => {
        fetch(`http://localhost:8000/projects/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSourceLang(data.sourceLang);
                setTargetLang(data.targetLang);
                setProjectName(data.projectName);
                setBooks(data.books ? data.books : bibleBooks);
            });
    }, [setSourceLang, setTargetLang, setProjectName, setBooks, id]);

    return (
        <form className={classes.paper} onSubmit={handleUpdate}>
            <h2 className="form-title">Update project</h2>
            <hr />
            <label className="form-label">Source language</label>
            <input
                disabled
                required
                value={sourceLang}
                className="form-control"
                onChange={(e) => setSourceLang(e.target.value)}
            />
            <label className="form-label">Target language</label>
            <input
                disabled
                required
                value={targetLang}
                className="form-control"
                onChange={(e) => setTargetLang(e.target.value)}
            />
            <label className="form-label">Project name</label>
            <input
                disabled
                required
                value={projectName}
                className="form-control"
                onChange={(e) => setProjectName(e.target.value)}
            />
            <br></br>
            <hr />
            <Grid container className="checkbox-main-div">
                {books.map((element) => (
                    <Grid item xs={2}>
                        <FormGroup row>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={element.isChecked}
                                        onChange={onCheck}
                                        name={element.book}
                                        value={element.isChecked}
                                        color="primary"
                                    />
                                }
                                label={element.abbreviation}
                            />
                        </FormGroup>
                    </Grid>
                ))}
            </Grid>
            <div className="button-div">
                <button onClick={handleClose}>Cancel</button>
                <button onClick={() => handleOpenSnack("Form added!")}>
                    Update project
                </button>
            </div>
            <CommonSnack />
        </form>
    );
};

export default ProjectUpdate;
