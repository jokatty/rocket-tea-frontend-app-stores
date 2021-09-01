/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { useHistory } from 'react-router-dom';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ItemCard from './ItemCard.jsx';
import { getCookie } from '../../utils/cookie.mjs';
import { getIncomingOrders, getAcceptedOrders, markOrderAccepted, markOrderComplete } from '../../utils/dbQuery.mjs';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const useStyles = makeStyles({
  totalAmount: {
    marginTop: '2rem',
  },
  price: {
    color: '#FA275A',
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function SingleAcceptedOrder({ orderData, setOpenModel, setTriggerRender }) {
  const history = useHistory();
  const classes = useStyles();
  const { orderItemsTableData, orderTableData } = orderData;
  const [open, setOpen] = React.useState(true);

  console.log(orderItemsTableData);

  const handleClose = () => {
    const doLater = () => {
      setOpenModel(() => false);
      setTriggerRender(() => Math.random());
    };
    setTimeout(doLater, 0);
    setOpen(() => false);
  };

  const handleCompleteClick = async () => {
    await markOrderComplete(orderTableData.id);
    setOpen(() => false);
    setOpenModel(() => false);
    setTriggerRender(() => Math.random());
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Order : #
        {orderTableData.receiptNum}
      </DialogTitle>
      <DialogContent dividers>
        <Typography variant="body1" className={classes.categoryHeader} gutterBottom>
          ORDER SUMMARY
        </Typography>
        {
          orderItemsTableData.map((item) => <ItemCard key={item.id} itemInfo={item} />)
        }

        <Grid container direction="row" spacing={4} className={classes.totalAmount}>
          <Grid item xs={10}>
            <Typography variant="h6" gutterBottom>
              Total Amount
            </Typography>
          </Grid>

          <Grid item xs={2}>
            <Typography variant="h6" gutterBottom className={classes.price}>
              {`S$${orderTableData.totalAmount}`}
            </Typography>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCompleteClick} color="primary">
          Mark Order Complete
        </Button>
      </DialogActions>
    </Dialog>
  );
}
