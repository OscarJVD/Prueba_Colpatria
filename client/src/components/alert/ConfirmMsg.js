import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { putDataAPI } from '../../utils/fetchData';
import { deleteTask } from '../../redux/actions/taskAction';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const ConfirmMsg = ({
  isOpen,
  handleClose,
  title,
  subtitle = '¿Quieres quitar este articulo del carrito?',
}) => {
  const { confirm, auth } = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log('confirm', confirm)

  const handleSubmit = () => {
    handleClose();

    if (confirm.length !== 0) {
      for (const item of confirm) {
        if (item.type === 'ADD_TASKS')
          dispatch(deleteTask(item.data, item.id, item.type));
        else
          dispatch({ type: 'ADD_CONFIRM', payload: [] });
      }
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'>
      <DialogTitle id='alert-dialog-title text-capitalize'>
        {subtitle}
      </DialogTitle>

      <DialogContent>
        <DialogContentText id='alert-dialog-description'>
          {/* {confirm[0].title ? confirm[0].title : ''} */}
          {confirm.length !== 0 &&
           console.log(confirm)
           // confirm.map((cf) => (
            //   <span key={cf.id} className='d-block'>
            //     - {cf.title}
            //   </span>
            // ))
            }
        </DialogContentText>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          Cancelar
        </Button>
        <Button onClick={handleSubmit} color='primary' autoFocus>
          Aceptar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmMsg;
