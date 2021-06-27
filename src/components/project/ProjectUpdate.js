import { useContext, useEffect, useState } from "react";
import { CommonContext } from "../../context/CommonContext";
import { ProjectContext } from "../../context/ProjectContext";
import CommonSnack from "../CommonSnack";

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
    const [checked, setChecked] = useState(false);
    const [book, setBook] = useState([]);

    const handleUpdate = () => {
        const projects = { checked };
        fetch(`http://localhost:8000/bibleBooks/${id}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(projects),
        });
    };

    useEffect(() => {
        fetch(`http://localhost:8000/projects/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setSourceLang(data.sourceLang);
                setTargetLang(data.targetLang);
                setProjectName(data.projectName);
            });

        fetch(`http://localhost:8000/bibleBooks`)
            .then((response) => response.json())
            .then((data) => {
                setBook(data);
            });
    }, [setSourceLang, setTargetLang, setProjectName, id]);

    console.log(checked);

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
            <div className="checkbox-main-div">
                {book.map((item) => (
                    <div className="checkbpx-div">
                        <input
                            type="checkbox"
                            value={item.checked}
                            onChange={() => setChecked(!checked)}
                        />
                        {item.abbreviation}
                    </div>
                ))}
            </div>
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
