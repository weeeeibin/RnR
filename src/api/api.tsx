import { axios } from './axios';

const GetMarkdown = async(page:number) => {
  let res = await axios({
    url:"/api/content/getLimitField",
    method:"POST",
    data:{page:page}
  });
  if(res.data.code === 200){
    return(res.data);
  }
}

const Favorite = async() => {
  axios({
    url:"/api/statistics/favorite",
    method:"POST",
  });
}

const Search = async(key:string) => {
  let res = await axios({
    url:"/api/content/search",
    method:"POST",
    data:{key:key}
  });
  if(res.data.code === 200){
    return(res.data);
  }
}

const GetFieldByID = async(id:string) => {
  let res = await axios({
    url:"/api/content/getFieldByID",
    method:"POST",
    data:{id:id}
  });
  if(res.data.code === 200){
    return(res.data);
  }
}

export {
  GetMarkdown,
  Favorite,
  Search,
  GetFieldByID
}