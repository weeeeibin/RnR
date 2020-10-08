import React from 'react'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red, yellow, pink } from '@material-ui/core/colors';
import ShareIcon from '@material-ui/icons/Share';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import makeStyles from '@material-ui/core/styles/makeStyles';
import CopyToClipboard from 'react-copy-to-clipboard';
import * as style from "./card.scss"
import { useSnackbar } from 'notistack';
import { Favorite } from '../api/api';

const useStyles = makeStyles(theme => ({
  card: {
    cursor: "pointer",
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


interface Props {
  json: any
}

const card = (props: Props) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  const [favorite, setFavorite] = React.useState<boolean>(false);
  const [share, setShare] = React.useState<boolean>(false);

  return (
    <Card className={classes.card} onClick={() => { window.open("/view?id=" + 123); }}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={props.json.userInfo.imgUrl} className={classes.avatar}>
            {props.json.userInfo.name}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" onClick={(e) => { e.stopPropagation(); }}>
            <MoreVertIcon />
          </IconButton>
        }
        title={props.json.userInfo.name}
        subheader={props.json.time}
      />
      <CardMedia
        className={classes.media}
        image={props.json.imgurl}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" className={style.card_content}>
          {props.json.sketch}
        </Typography>
      </CardContent>
      <CardActions disableSpacing style={{ marginTop: "1rem" }}>
        <CopyToClipboard text={window.location.href + "view?id=" + 123} onCopy={(e) => { setShare(true);enqueueSnackbar('文章链接已复制到剪切板！',{variant:"success",anchorOrigin:{vertical:"top",horizontal:"right"}}) }}>
          <IconButton onClick={(e) => {
            e.stopPropagation();
          }} >
            <ShareIcon style={{ color: share ? yellow[800] : "" }} />
          </IconButton>
        </CopyToClipboard>
        <IconButton onClick={e => {
          Favorite();
          setFavorite(true);
          e.stopPropagation();
        }}>
          <FavoriteIcon style={{ color: favorite ? pink[500] : "" }} />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default card
