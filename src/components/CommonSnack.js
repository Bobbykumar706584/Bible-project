import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { useContext } from 'react';
import { CommonContext } from '../context/CommonContext';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

const CommonSnack = () => {
    const{openSnack, handleCloseSnack, message} = useContext(CommonContext)
    return ( 
        <div>
            <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnack}>
                <Alert onClose={handleCloseSnack} severity="success">
                    {message}
                </Alert>
            </Snackbar>
        </div>
     );
}
 
export default CommonSnack;