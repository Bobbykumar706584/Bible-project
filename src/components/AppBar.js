import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import VerticalTabs from "./VerticalTabs"
import { QueryClient,QueryClientProvider } from 'react-query';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

const queryClient = new QueryClient()

export default function ButtonAppBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            Bible
          </Typography>
        </Toolbar>
      </AppBar>
      <QueryClientProvider client={queryClient}>
         <VerticalTabs />
      </QueryClientProvider>
    </div>
  );
}
