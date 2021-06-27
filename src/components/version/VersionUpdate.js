import { useContext, useEffect } from "react";
import { CommonContext } from "../../context/CommonContext";
import { VersionContext } from "../../context/VersionContext";
import CommonSnack from "../CommonSnack";

const VersionUpdate = () => {
    const { classes, handleClose, id, handleOpenSnack } =
        useContext(CommonContext);
    const { name, setName, setCode, revision, setRevision } =
        useContext(VersionContext);

    const handleUpdate = () => {
        const version = {
            name,
            code: name
                .split(/\s/)
                .reduce((response, word) => (response += word.slice(0, 1)), ""),
            revision,
        };
        fetch(`http://localhost:8000/versions/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(version),
        });
    };

    useEffect(() => {
        fetch(`http://localhost:8000/versions/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setCode(data.code);
                setRevision(data.revision);
            });
    }, [setName, setCode, setRevision, id]);

    return (
        <form className={classes.paper} onSubmit={handleUpdate}>
            <h2 className="form-title">Update Version</h2>
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
                <button onClick={() => handleOpenSnack("Form updated")}>
                    Update Version
                </button>
            </div>
            <CommonSnack />
        </form>
    );
};

export default VersionUpdate;
