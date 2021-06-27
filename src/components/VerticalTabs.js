import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";

import CommonContextProvider from "../context/CommonContext";
import LanguageContextProvider from "../context/LanguageContext";
import VersionContextProvider from "../context/VersionContext";
import BibleContextProvider from "../context/BibleContext";
import ProjectContextProvider from "../context/ProjectContext";
import BibleContent from "./bible/BibleContent";
import LanguageContent from "./language/LanguageContent";
import VersionContent from "./version/VersionContent";
import ProjectContent from "./project/ProjectContent";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        "aria-controls": `vertical-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: "flex",
        position: "absolute",
        top: "64px",
        height: "auto",
        fontWeight: "bold",
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
        backgroundColor: "#3f51b5",
        color: "#fff",
    },
}));

export default function VerticalTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <CommonContextProvider>
                <Tabs
                    orientation="vertical"
                    value={value}
                    onChange={handleChange}
                    className={classes.tabs}
                >
                    <Tab label="language" {...a11yProps(0)} />
                    <Tab label="version" {...a11yProps(1)} />
                    <Tab label="bible" {...a11yProps(2)} />
                    <Tab label="project" {...a11yProps(3)} />
                </Tabs>
                <TabPanel value={value} index={0}>
                    <LanguageContextProvider>
                        <LanguageContent />
                    </LanguageContextProvider>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <VersionContextProvider>
                        <VersionContent />
                    </VersionContextProvider>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <BibleContextProvider>
                        <LanguageContextProvider>
                            <VersionContextProvider>
                                <BibleContent />
                            </VersionContextProvider>
                        </LanguageContextProvider>
                    </BibleContextProvider>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <ProjectContextProvider>
                        <LanguageContextProvider>
                            <VersionContextProvider>
                                <ProjectContent />
                            </VersionContextProvider>
                        </LanguageContextProvider>
                    </ProjectContextProvider>
                </TabPanel>
            </CommonContextProvider>
        </div>
    );
}
