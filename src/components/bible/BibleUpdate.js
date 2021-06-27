import { useContext, useEffect } from "react";
import { BibleContext } from "../../context/BibleContext";
import { CommonContext } from "../../context/CommonContext";
import { LanguageContext } from "../../context/LanguageContext";
import { VersionContext } from "../../context/VersionContext";
import CommonSnack from "../CommonSnack";

const BibleUpdate = () => {
    const { classes, handleClose, id, handleOpenSnack } =
        useContext(CommonContext);
    const { data: languageData } = useContext(LanguageContext);
    const { data: versionData } = useContext(VersionContext);
    const { name, setName, setCode, language, setLanguage } =
        useContext(BibleContext);

    const handleUpdate = () => {
        const bible = {
            name,
            code: name
                .split(/\s/)
                .reduce((response, word) => (response += word.slice(0, 1)), ""),
            language,
        };
        fetch(`http://localhost:8000/bible/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bible),
        });
    };

    useEffect(() => {
        fetch(`http://localhost:8000/bible/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setName(data.name);
                setCode(data.code);
                setLanguage(data.language);
            });
    }, [setName, setCode, setLanguage, id]);

    return (
        <form className={classes.paper} onSubmit={handleUpdate}>
            <h2 className="form-title">Update Bible</h2>
            <hr />
            <label className="form-label">Version name</label>
            <select
                required
                value={name}
                className="form-control"
                onChange={(e) => setName(e.target.value)}
            >
                <option>Select</option>
                {versionData.map((item) => (
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
                <option>Select</option>
                {languageData.map((item) => (
                    <option value={item.name}>{item.name}</option>
                ))}
            </select>
            <div className="button-div">
                <button onClick={handleClose}>Cancel</button>
                <button onClick={() => handleOpenSnack("Form updated")}>
                    Update bible
                </button>
            </div>
            <CommonSnack />
        </form>
    );
};

export default BibleUpdate;
