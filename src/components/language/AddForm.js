import { useContext } from "react";
import { CommonContext } from "../../context/CommonContext";
import { LanguageContext } from "../../context/LanguageContext";
import CommonSnack from "../CommonSnack";

const AddForm = () => {
    const { classes, handleClose, handleOpenSnack } = useContext(CommonContext);
    const { name, setName, setCode, direction, setDirection } =
        useContext(LanguageContext);

    const handleSubmit = () => {
        const language = { name, code: name.slice(0, 3), direction };
        fetch("http://localhost:8000/languages", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(language),
        });
    };

    return (
        <form className={classes.paper} onSubmit={handleSubmit}>
            <h2 className="form-title">Add Language</h2>
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
                <button onClick={() => handleOpenSnack("Form added!")}>
                    Add language
                </button>
            </div>
            <CommonSnack />
        </form>
    );
};

export default AddForm;
