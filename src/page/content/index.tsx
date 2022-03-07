import React, { ReactElement, useEffect, useState } from 'react'
import styles from './index.scss';

import { GetFieldByID } from '../../api/api';
import MarkDownView from './markdown/markdown';
import { AppBar, IconButton, Skeleton, Slide, Toolbar, Typography, useScrollTrigger } from '@mui/material';
import { NightsStay, WbSunny } from '@mui/icons-material';
import { useParams } from 'react-router-dom';

interface Props {

}

interface BarProps {
    window?: () => Window;
    children: React.ReactElement;
}

function HideOnScroll(props: BarProps) {
    const { children, window } = props;
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
}

function MarkdownContent(props: Props): ReactElement {

    const params = useParams();

    const [theme, setTheme] = useState("light");
    const [loading, setLoading] = useState(true);
    const [content, setcontent] = useState('');
    const [title, settitle] = useState("加载中...");
    useEffect(() => {
        GetFieldByID(params.id ?? "").then((res: any) => {
            setcontent(res.field.content);
            settitle(res.field.title)
            setLoading(false);
            document.title = `Mr.Chen! - ${res.field.title}`;
        })
    }, [])

    function themeButton() {
        if (theme === "light") {
            document.getElementsByTagName('body')[0].style.setProperty('--Background', '#191919');
            document.getElementsByTagName('body')[0].style.setProperty('--FontColor', '#fff');
            setTheme("dark");
        }
        else {
            document.getElementsByTagName('body')[0].style.setProperty('--Background', '#fff');
            document.getElementsByTagName('body')[0].style.setProperty('--FontColor', '#000');
            setTheme("light");
        }
    }

    return (
        <div>
            <HideOnScroll {...props}>
                <AppBar className={styles.AppBar_Background}>
                    <Toolbar>
                        <div className={styles.AppBar}>
                            <Typography variant="h6">{title}</Typography>
                            <IconButton edge="start" className={styles.ThemeButton} onClick={themeButton}>
                                {theme === "light" && <NightsStay />}
                                {theme === "dark" && <WbSunny />}
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>
            </HideOnScroll>
            <div className={styles.markdown_content}>
                {loading &&
                    <div>
                        <Skeleton style={{ width: "30vw", height: "60px" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", marginTop: "2vh" }} animation="wave" />
                        <Skeleton style={{ width: "100%", height: "50vh" }} animation="wave" />
                    </div>
                }
                {!loading &&
                    <div style={{ color: "#fff" }}>
                        <MarkDownView content={content} theme={theme} />
                        <div className={styles.footer}>页面由mrmd.xyz提供</div>
                    </div>}
            </div>
        </div>
    )
}

export default MarkdownContent
