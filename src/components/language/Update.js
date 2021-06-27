import { useContext, useEffect } from "react";
import { CommonContext } from "../../context/CommonContext";
import { LanguageContext } from "../../context/LanguageContext";
import CommonSnack from "../CommonSnack";

const Update = () => {
    const { classes, handleClose, id, handleOpenSnack } =
        useContext(CommonContext);
    const { name, setName, setCode, direction, setDirection } =
        useContext(LanguageContext);

    const handleUpdate = () => {
        const langauge = { name, code: name.slice(0, 3), direction };
        fetch(`http://localhost:8000/languages/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(langauge),
        });
    };

    useEffect(() => {
        fetch(`http://localhost:8000/languages/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setCode(data.code);
                setDirection(data.direction);
            });
    }, [setName, setCode, setDirection, id]);

    return (
        <form className={classes.paper} onSubmit={handleUpdate}>
            <h2 className="form-title">Update Language</h2>
            <hr />
            <label className="form-label">Language name</label>
            <input
                required
                type="text"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label className="form-label">Language code</label>
            <input
                required
                type="text"
                className="form-control"
                value={name.slice(0, 3)}
                onChange={(e) => setCode(e.target.value)}
            />
            <label className="form-label">Language direction</label>
            <select
                required
                value={direction}
                className="form-control"
                onChange={(e) => setDirection(e.target.value)}
            >
                <option value="" disabled>
                    Select
                </option>
                <option value="rtl">Right to left</option>
                <option value="ltr">Left to Right</option>
            </select>
            <div className="button-div">
                <button onClick={handleClose}>Cancel</button>
                <button onClick={() => handleOpenSnack("Form updated")}>
                    Update language
                </button>
            </div>
            <CommonSnack />
        </form>
    );
};

export default Update;
