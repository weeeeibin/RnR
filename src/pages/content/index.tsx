import React, { ReactElement, useEffect, useState } from 'react'
import './index.scss';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import Slide from '@material-ui/core/Slide';
import { RouteComponentProps } from 'react-router-dom';
import NightsStay from '@material-ui/icons/NightsStay';
import IconButton from '@material-ui/core/IconButton';
import WbSunny from '@material-ui/icons/WbSunny';
import Skeleton from '@material-ui/lab/Skeleton/Skeleton';
import { GetFieldByID } from '../../api/api';
import MarkDownView from './markdown/markdown';

interface Props {
  id: string;
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

function MarkdownContent(props: RouteComponentProps<Props>): ReactElement {

  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [content, setcontent] = useState(null);
  const [title, settitle] = useState("加载中...");
  useEffect(() => {
    GetFieldByID(props.match.params.id).then((res: any) => {
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
        <AppBar className="AppBar-Background">
          <Toolbar>
            <div className="AppBar">
              <Typography variant="h6">{title}</Typography>
              <IconButton edge="start" className="ThemeButton" onClick={themeButton}>
                {theme === "light" && <NightsStay />}
                {theme === "dark" && <WbSunny />}
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <div className='markdown-content'>
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
            <MarkDownView content={content}/>
            <div className="footer">页面由mrmd.xyz提供</div>
          </div>}
      </div>
    </div>
  )
}

export default MarkdownContent
