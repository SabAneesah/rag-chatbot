import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, Paper, Typography, Container } from '@mui/material';
import './Chat.css';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  const sendMessage = async () => {
    if (input.trim() === '') return;

    const userMessage = { sender: 'user', text: input };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post('http://your-backend-api/chat', { query: input });
      const botMessage = { sender: 'bot', text: response.data.answer };
      setMessages((prevMessages) => [...prevMessages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
    }
    setInput('');
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} className="chat-container">
        <Typography variant="h4" component="h1" gutterBottom>
          ChatGPT-like Chatbot
        </Typography>
        <List className="chat-list">
          {messages.map((message, index) => (
            <ListItem key={index} className={message.sender === 'user' ? 'user-message' : 'bot-message'}>
              <ListItemText primary={message.text} />
            </ListItem>
          ))}
          <div ref={messagesEndRef} />
        </List>
        <div className="input-container">
          <TextField
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message"
            fullWidth
            variant="outlined"
            className="chat-input"
          />
          <Button onClick={sendMessage} variant="contained" color="primary" className="send-button">
            Send
          </Button>
        </div>
      </Paper>
    </Container>
  );
};

export default Chat;
