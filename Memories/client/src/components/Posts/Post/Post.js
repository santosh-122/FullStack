import { Button, Card, CardActions, CardContent, CardMedia, MenuList, Typography } from '@material-ui/core';
import React,{useState} from 'react';
import useStyles from "./styles";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from  "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from 'react-redux';
import { deletePost ,likePost} from '../../../actions/posts';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { ReactFragment } from 'react';
// import 

const Post = ({post,setCurrentId}) => {

  
  const [anchorEl,setAnchoEl] = useState(null);
  const handleOpenMenu = (event) => {
    setAnchoEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchoEl(null);
  };

  

  function Edit(){ setCurrentId(post._id)}
  function Delete(){
   dispatch(deletePost(post._id))
  }
  
  const user = JSON.parse(localStorage.getItem('profile'));
  const Likes = () => {
    if (post.likes.length > 0) {
      console.log(post)
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpAltOutlined fontSize="small" />&nbsp;Like</>;
    console.log()
  };
    // console.log(post)
    const classess = useStyles();
    const dispatch = useDispatch();
    // console.log("default",same())
    // console.log(same)
  return (
    <Card className={classess.card}>
      <CardMedia className={classess.media} image={post.selectedFile} title={post.title}/>
      <div className={classess.overlay}>
        <Typography variant='h6'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography> 
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
      <div className={classess.overlay2}>
        <React.Fragment>
      <Button 
     
      aria-controls='menu'
      style={{ color: 'white' }} 
      size="small" 
      onClick={handleOpenMenu}
      ><MoreHorizIcon fontSize="default" /></Button>
      <Menu style={{marginTop:'50px' }} id="menu" anchorEl={anchorEl} onClose={handleClose} open={Boolean(anchorEl)}>
        <MenuList  style={{ cursor:"pointer", padding:"10px"}} onClick={()=>{Edit();handleClose()}}>EDIT</MenuList>
        <MenuList style={{ cursor:"pointer", padding:"10px"}} onClick={()=>{Delete();handleClose()}}>DELETE</MenuList>
      </Menu>
      </React.Fragment>
      </div>
       )} 
      <div className={classess.details}>
      <Typography variant='body2' color="textSecondary">{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classess.title} variant='h5' gutterBottom>{post.title}</Typography>
      <CardContent>
      <Typography className={classess.title} variant='body2' color='textSecondary' component='p'  gutterBottom>{post.message}</Typography>
      </CardContent>
      <CardActions className={classess.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={()=>dispatch(likePost(post._id))}>
          <Likes />
        </Button>
        {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
          <DeleteIcon fontSize="small" /> Delete
        </Button>
        )}
         */}
      </CardActions>
    </Card>
  );
}

export default Post;
