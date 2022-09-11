import { Paper, TextField, Typography ,Button} from '@material-ui/core';
import React ,{useState,useEffect}from 'react';
import useStyles from './Styles';
import { useDispatch } from 'react-redux';
import {santhu,updatePost} from "../../actions/posts";
 import FileBase from 'react-file-base64'
 import { useSelector } from 'react-redux';



const Form = ({currentId,setCurrentId}) => {
  const [postData,setPostData]=useState({
    title:'',
    message:'',
    tags:'',
    selectedFile:''
  })
  const dispatch = useDispatch();
  const post = useSelector((state) => currentId ? state.posts.find((p)=> p._id == currentId):null);
  console.log("main",post)
  const {title,message,tags,selectedFile}=postData;
  const user = JSON.parse(localStorage.getItem('profile'));
  const san=(e)=>{
  setPostData({...postData,[e.target.name]:e.target.value})

  }
  useEffect(() => {
     if (post) setPostData(post);
  }, [post]);

    const classess = useStyles();
    const handleSubmit=(e)=>{
         e.preventDefault();
         if (currentId === 0) {
          dispatch(santhu({ ...postData, name: user?.result?.name }));
          clear();
        } else {
          dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
          clear();
        }
        clear()

    }
    const clear=()=>{      
      setCurrentId(null);
      setPostData({
        creator:'',
        title:'',
        message:'',
        tags:'',
        selectedFile:''
      })

    }
    if (!user?.result?.name) {
      return (
        <Paper className={classess.paper}>
          <Typography variant="h6" align="center">
            Please Sign In to create your own memories and like other's memories.
          </Typography>
        </Paper>
      );
    }
  return (
   <Paper className={classess.paper}>
    <form autoComplete='off' noValidate className={`${classess.root} ${classess.form}`} onSubmit={handleSubmit}>
      <Typography variant='h6'>{currentId ? "Editing" : "Creating"} a memory</Typography>
      <TextField name='title'  variant='outlined' label='title' fullWidth value={title} onChange={san}/>
      <TextField name='message'  variant='outlined' label='message' fullWidth value={message} onChange={san}/>

      <TextField name='tags'  variant='outlined' label='tags' fullWidth value={tags} onChange={(e) => setPostData({...postData,tags:e.target.value.split(',')})}/>
 <div className={classess.fileInput}>
  <FileBase 
     type = "file"
     multiple={false}
     onDone={({base64}) => setPostData({...postData,selectedFile : base64})} />
</div> 
<Button className={classess.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button><br/>
<Button  variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>

    </form>
   </Paper>
  );
}

export default Form;
