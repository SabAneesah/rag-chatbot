import React, { useState } from 'react';
import { Grid, Button, Box, TextField, IconButton, Paper, Typography } from '@mui/material';
import SendIcon from './Assets/Images/send_icon.png';
import PlusIcon from './Assets/Images/plus_icon.png';

const Chat = () => {
  const [input, setInput] = useState('');

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      console.log('Selected file:', file.name);
      // Handle the selected file (e.g., upload to server, process locally, etc.)
      // Example:
      // const formData = new FormData();
      // formData.append('file', file);
      // fetch('/upload', {
      //   method: 'POST',
      //   body: formData,
      // })
      // .then(response => response.json())
      // .then(data => console.log('Upload successful:', data))
      // .catch(error => console.error('Error uploading file:', error));
    } else {
      alert('Please select a PDF file.');
    }
  };

  const handlePlusButtonClick = () => {
    const fileInput = document.getElementById('pdf-upload-input');
    fileInput.click(); // Trigger the file input dialog
  };

  const sendMessage = () => {
    // Handle sending the message
  };

  return (
    <Box sx={{ flexGrow: 1, height: '100vh' }}>
      <Grid container spacing={0} sx={{ height: '100%' }}>
        <Grid item xs={3}>
          <Paper 
            sx={{ 
              height: '100%', 
              backgroundColor:'#121B2F' ,
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'flex-start',
              alignItems: 'center',
              borderRadius: 0 
            }}
          >
            <Button 
              variant="contained" 
              sx={{ 
                backgroundColor: '#67AFBA', 
                width: '80%',
                height: 58,
                mt: 3,
                borderRadius: 3,
                textTransform: 'none'
              }} 
            >
              + New Conversation
            </Button>
          </Paper>
        </Grid>
        
        <Grid item xs={9}>
          <Paper 
            sx={{ 
              height: '100%', 
              backgroundColor:'#22303E' , 
              textAlign: 'center', 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',  // Align items at the bottom
              alignItems: 'center', 
              borderRadius: 0,
              position: 'relative'  // Position relative for absolute positioning of text
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', width: '80%', justifyContent: 'space-between', marginTop: 'auto', marginBottom: 3 }}>
              <IconButton onClick={handlePlusButtonClick}>
                <img src={PlusIcon} alt="add" 
                  style={{ width: 50, 
                           height: 50, 
                           backgroundColor: '#D9D9D9',
                           borderRadius: '50%',
                           marginRight: 40 }} />
              </IconButton>
              <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                fullWidth
                variant="outlined"
                placeholder="Send a message!"
                InputProps={{
                  style: { 
                    backgroundColor: '#5B9EA8', 
                    borderRadius: 25, 
                    paddingLeft: 10,
                    color: 'white'  // Set background color here
                  },
                  endAdornment: (
                    <IconButton onClick={sendMessage} style={{ backgroundColor: '#5B9EA8', borderRadius: '50%' }}>
                      <img src={SendIcon} alt="send" style={{ width: 35, height: 35 }} />
                    </IconButton>
                  ),
                  sx: { height: '100%' }
                }}
              />
            </Box>
            <Typography variant="h2" sx={{ 
              position: 'absolute', 
              bottom: '60%', 
              transform: 'translateY(50%)', 
              backgroundImage: 'linear-gradient(to left, #FC5C7D, #6A82FB)', 
              WebkitBackgroundClip: 'text', 
              color: 'transparent',
              fontWeight: 'bold' 
            }}>
              Welcome to RAG-Bot
            </Typography>

            <Typography variant="h6" sx={{ 
              position: 'absolute', 
              bottom: '50%', 
              //transform: 'translateY(50%)', 
              //backgroundImage: 'linear-gradient(to right, #FC5C7D, #6A82FB)', 
              WebkitBackgroundClip: 'text', 
              color: '#565A63' 
            }}>
              Upload a pdf to get started..
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <input 
        type="file" 
        id="pdf-upload-input" 
        accept="application/pdf" 
        onChange={handleFileSelect} 
        style={{ display: 'none' }} 
      />
    </Box>
  );
}

export default Chat;
