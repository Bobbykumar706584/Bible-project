import { useContext } from "react";
import { CommonContext } from "../../context/CommonContext";
import { VersionContext } from "../../context/VersionContext";
import CommonSnack from "../CommonSnack";

const VersionForm = () => {
    const { classes, handleClose, handleOpenSnack } = useContext(CommonContext);
    const { name, setName, setCode, revision, setRevision } =
        useContext(VersionContext);

    const handleSubmit = () => {
        const version = {
            name,
            code: name
                .split(/\s/)
                .reduce((response, word) => (response += word.slice(0, 1)), ""),
            revision,
        };
        fetch("http://localhost:8000/versions", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(version),
        });
    };

    return (
        <form className={classes.paper} onSubmit={handleSubmit}>
            <h2 className="form-title">Add Version</h2>
            <hr />
            <label className="form-label">Version name</label>
            <input
                required
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label">Version code</label>
            <input
                required
                type="text"
                className="form-control"
                value={name
                    .split(/\s/)
                    .reduce(
                        (response, word) => (response += word.slice(0, 1)),
                        ""
                    )}
                onChange={(e) => setCode(e.target.value)}
            />
            <label className="form-label">Version revision</label>
            <input
                required
                type="number"
                value={revision}
                className="form-control"
                onChange={(e) => setRevision(e.target.value)}
            />
            <div className="button-div">
                <button onClick={handleClose}>Cancel</button>
                <button onClick={() => handleOpenSnack("Form added!")}>
                    Add Version
                </button>
            </div>
            <CommonSnack />
        </form>
    );
};

export default VersionForm;
