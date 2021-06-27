import { useContext } from "react";
import { BibleContext } from "../../context/BibleContext";
import { CommonContext } from "../../context/CommonContext";
import { LanguageContext } from "../../context/LanguageContext";
import { VersionContext } from "../../context/VersionContext";
import CommonSnack from "../CommonSnack";

const BibleForm = () => {
    const { classes, handleClose, handleOpenSnack } = useContext(CommonContext);
    const { data: languages } = useContext(LanguageContext);
    const { data: versions } = useContext(VersionContext);
    const { name, setName, language, setLanguage } = useContext(BibleContext);

    const handleSubmit = () => {
        const bible = {
            name,
            code: name
                .split(/\s/)
                .reduce((response, word) => (response += word.slice(0, 1)), ""),
            language,
        };
        fetch("http://localhost:8000/bible", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bible),
        });
    };

    return (
        <form className={classes.paper} onSubmit={handleSubmit}>
            <h2 className="form-title">Add Bible</h2>
            <hr />
            <label className="form-label">Version name</label>
            <select
                required
                value={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
            >
                <option value="" disabled>
                    Select
                </option>
                {versions.map((item) => (
                    <option value={item.name}>{item.name}</option>
                ))}
            </select>
            <label className="form-label">Language name</label>
            <select
                required
                value={language}
                className="form-control"
                onChange={(e) => setLanguage(e.target.value)}
            >
                <option value="" disabled>
                    Select
                </option>
                {languages.map((item) => (
                    <option value={item.name}>{item.name}</option>
                ))}
            </select>
            <div className="button-div">
                <button onClick={handleClose}>Cancel</button>
                <button onClick={() => handleOpenSnack("Form added!")}>
                    Add bible
                </button>
            </div>
            <CommonSnack />
        </form>
    );
};

export default BibleForm;
