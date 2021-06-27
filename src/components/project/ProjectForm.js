import { useContext } from "react";
import { CommonContext } from "../../context/CommonContext";
import { LanguageContext } from "../../context/LanguageContext";
import { ProjectContext } from "../../context/ProjectContext";
import CommonSnack from "../CommonSnack";

const ProjectForm = () => {
    const { classes, handleClose, handleOpenSnack } = useContext(CommonContext);
    const { data: languages } = useContext(LanguageContext);
    const {
        sourceLang,
        setSourceLang,
        targetLang,
        setTargetLang,
        projectName,
        setProjectName,
    } = useContext(ProjectContext);

    const handleSubmit = () => {
        const bible = { sourceLang, targetLang, projectName };
        fetch("http://localhost:8000/projects", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bible),
        });
    };

    return (
        <form className={classes.paper} onSubmit={handleSubmit}>
            <h2 className="form-title">Add project</h2>
            <hr />
            <label className="form-label">Source language</label>
            <select
                required
                value={sourceLang}
                className="form-control"
                onChange={(e) => setSourceLang(e.target.value)}
            >
                <option value="" disabled>
                    Select
                </option>
                {languages.map((item) => (
                    <option key={item.name}>{item.name}</option>
                ))}
            </select>
            <label className="form-label">Target language</label>
            <select
                required
                value={targetLang}
                className="form-control"
                onChange={(e) => setTargetLang(e.target.value)}
            >
                <option value="" disabled>
                    Select
                </option>
                {languages.map((item) => (
                    <option key={item.name} value={item.name}>
                        {item.name}
                    </option>
                ))}
            </select>
            <label className="form-label">Project name</label>
            <input
                required
                value={projectName}
                className="form-control"
                onChange={(e) => setProjectName(e.target.value)}
            />
            <div className="button-div">
                <button onClick={handleClose}>Cancel</button>
                <button onClick={() => handleOpenSnack("Form added!")}>
                    Add project
                </button>
            </div>
            <CommonSnack />
        </form>
    );
};

export default ProjectForm;
