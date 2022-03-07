import React from 'react'

import CopyToClipboard from 'react-copy-to-clipboard';
import styles from "./card.module.scss";
import { useSnackbar } from 'notistack';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { pink, yellow, red } from '@mui/material/colors';
import { Favorite } from '../api/api';
import "./card.css"

interface Props {
    json: any;
}

const card = (props: Props) => {
    const { enqueueSnackbar } = useSnackbar();

    const [favorite, setFavorite] = React.useState<boolean>(false);
    const [share, setShare] = React.useState<boolean>(false);

    return (
        <Card className={styles.card} onClick={() => { window.open("/MarkdownContent/" + props.json.id); }}>
            <CardHeader
                className={styles.MuiCardHeaderTitle}
                avatar={
                    <Avatar aria-label="recipe" src={props.json.userInfo.imgUrl} className={styles.avatar}>
                        {props.json.userInfo.name}
                    </Avatar>
                }
                action={
                    <IconButton aria-label="settings" onClick={(e) => { e.stopPropagation(); }}>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={props.json.title}
                subheader={props.json.time}
            />
            <CardMedia
                className={styles.media}
                image={props.json.imgurl}
            />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p" className={styles.card_content}>
                    {props.json.sketch}
                </Typography>
            </CardContent>
            <CardActions disableSpacing style={{ marginTop: "1rem" }}>
                <CopyToClipboard text={window.location.href + "MarkdownContent/" + props.json.id} onCopy={() => { setShare(true); enqueueSnackbar('文章链接已复制到剪切板！', { variant: "success", anchorOrigin: { vertical: "top", horizontal: "right" } }) }}>
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
