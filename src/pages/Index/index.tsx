import React, { Component, createRef, useState } from 'react'
import * as style from './index.scss'
import { makeStyles,withStyles } from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import Paper from '@material-ui/core/Paper';
import SearchIcon from '@material-ui/icons/Search';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '../../component/card';
import Grid from '@material-ui/core/Grid';
import { SnackbarProvider } from 'notistack';
import { GetMarkdown, Search } from '../../api/api'

const styles = {
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: "17vw",
    minWidth: "15rem",
    height: "3vh",
    background: "rgba(0,0,0,0.4)",
    border: "none"
  },
  input: {
    flex: 1,
    color: "#fff",
    fontSize: ".7rem",
    display: "flex",
    alignItems: "center",
    paddingRight: "10px",
    width:"12.7rem"
  },
  iconSearch: {
    padding: "0 10px",
    color: "#fff",
  }
};

interface Props {
  classes:any;
}
interface State {
  loading: boolean;
  device: string;
  markdownList: any;
  page: number;
  end: boolean;
  search:string;
}

class Index extends Component<Props, State> {
  searchInput: React.RefObject<HTMLInputElement>;
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      device: null,
      markdownList: [],
      page: 1,
      end: false,
      search:""
    }
    this.loadPage = this.loadPage.bind(this);
    this.searchInput = createRef<HTMLInputElement>();
  }

  loadPage() {
    this.setState({ loading: true });
    GetMarkdown(this.state.page).then((res: any) => {
      this.setState({
        markdownList: this.state.markdownList.concat(res.field),
        page: this.state.page + 1,
        loading: false,
        end: (res.field.length < 8 || res.field == null) ? true : false,
      })
    });
  }

  componentDidMount() {
    let userAgentInfo = navigator.userAgent;
    let mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod", "Mac OS"];

    for (let v = 0; v < mobileAgents.length; v++) {
      if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
        if (v === mobileAgents.length - 1) {
          if ("ontouchstart" in window) {
            this.setState({ device: "iPad" });
            document.getElementsByTagName('body')[0].style.setProperty('--backgroundPosition', 'absolute');
            document.getElementsByTagName('body')[0].style.setProperty('--logoFontSize', '1.2rem');
          }
        } else {
          this.setState({ device: "Mobile" });
          document.getElementsByTagName('body')[0].style.setProperty('--backgroundPosition', 'absolute');
          document.getElementsByTagName('body')[0].style.setProperty('--logoFontSize', '1.2rem');
        }
        break;
      } else {
        this.setState({ device: "PC" });
      }
    }
    this.loadPage();
    let scroll = null;
    window.addEventListener('scroll', e => {
      scroll = document.documentElement;
      if (scroll.scrollTop >= (scroll.scrollHeight - scroll.clientHeight) - scroll.scrollHeight / 4 && !this.state.loading && !this.state.end) {
        this.loadPage();
      }
    })
  }

  render() {
    const {classes} = this.props;

    return (
      <div style={{ position: "relative" }}>

        <div className={style.background} style={{ background: this.state.device === "PC" ? "url(https://orionblog.mrmd.xyz/config/background.png) center top / cover fixed rgb(25, 25, 25)" : "" }}></div>
        <div className={style.main}>
          <div className={style.header}>
            <div className={style.header_tab}>
              <div className={style.logo}>
                <span>Mr.Chen!</span>
                {this.state.loading && <CircularProgress className={style.loading} />}
              </div>
              <Paper className={classes.root}>
                <SearchIcon className={classes.iconSearch} />
                <form action="javascript:;">
                <InputBase
                  inputRef={this.searchInput}
                  className={classes.input}
                  placeholder="比百度还强大的搜索引擎入口！"
                  type="search"
                  onChange={(e: any) => {
                    if (e.target.value === "" && this.state.search !== "") {
                      this.setState({page:1,markdownList:[],end:false,search:""},()=>{this.loadPage();});
                    }else{
                      this.setState({search:e.target.value});
                    }
                  }}
                  onKeyDown={(e:any)=>{
                    if(e.keyCode === 13 && this.state.search !== ""){
                      this.setState({end:true},()=>{
                        Search(this.state.search).then((res:any) => {
                          this.setState({markdownList:res.field?res.field:[]});
                          this.searchInput.current.blur();
                        }) 
                      })
                    }
                  }}
                />
                </form>
              </Paper>
            </div>
            <div className={style.header_text}>
              {this.state.device === "PC" &&
                <>
                  <p>这个地方不太能教你什么</p>
                  <p>
                    当然啦 我们还是可以教你如何成为一个比较厉害的程序员(不要问我大概有多厉害 很厉害的那种！！)<br />
                  叮～ 让我们来写一个比较厉害的程序吧 学会了他你就会了世界上的所有语言<br />
                  它大概长成这个样子 可要好好看呀<br />
                  哈喽 沃德:)<br />
                  </p>
                </>
              }
              {this.state.device === "Mobile" &&
                <>
                  <p>移动端</p>
                  <p>
                    移动端就是手机版本啦！<br />
                    {navigator.userAgent}
                  </p>
                </>
              }
              {this.state.device === "iPad" &&
                <>
                  <p>MacOS 嗯？有触屏？</p>
                  <p>
                    这应该不是一台MacBook，也不会是iPhone！<br />
                  iPad？更像一台iPad！<br />
                  怎么样，我猜对了没有？<br />
                    {navigator.userAgent}
                  </p>
                </>
              }
            </div>
          </div>

          <div className={style.content}>
            <SnackbarProvider maxSnack={3}>
              <Grid container spacing={3}>
                {
                  this.state.markdownList.map((item: any, index: number) => {
                    return (
                      <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                        <Card json={item} />
                      </Grid>
                    )
                  })
                }
              </Grid>
            </SnackbarProvider>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Index)