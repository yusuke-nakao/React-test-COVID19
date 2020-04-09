import React  from 'react';
import Paper from '@material-ui/core/Paper';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    height: 'auto',
  },
  wrapper: {
    width: 300 + theme.spacing(2),
  },
  paper: {
    zIndex: 1,
    position: 'relative',
    margin: theme.spacing(1),
  },
  svg: {
    width: 100,
    height: 100,
  },
  polygon: {
    fill: theme.palette.common.white,
    stroke: theme.palette.divider,
    strokeWidth: 1,
  },
}));

//messageコンポーネント
function Message(props){
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.wrapper}>
                <Slide direction="up" in={props.visible} mountOnEnter unmountOnExit>
                    <Paper elevation={4} className={classes.paper}>
                        {/* <svg className={classes.svg}>
                        <polygon points="0,100 50,00, 100,100" className={classes.polygon} />
                        </svg> */}
                        {props.name}
                    </Paper>
                </Slide>
            </div>
        </div>
    );
}

export default Message;