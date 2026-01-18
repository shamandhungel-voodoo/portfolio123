import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, X, Send, Bot, User, 
  Loader2, Sparkles, Minimize2, Maximize2 
} from 'lucide-react';
import { Textarea } from './ui/textarea';
import { Button } from './ui/button';
import { chatbotAPI } from '../utils/api';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm Shaman's AI assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await chatbotAPI.sendMessage(inputMessage);
      
      setTimeout(() => {
        const botMessage = {
          id: messages.length + 2,
          text: response.data.response,
          sender: 'bot',
          timestamp: response.data.timestamp
        };

        setMessages(prev => [...prev, botMessage]);
        setIsTyping(false);
      }, 1000);
    } catch (error) {
      console.error('Error sending message:', error);
      
      setTimeout(() => {
        const errorMessage = {
          id: messages.length + 2,
          text: "I apologize, but I'm having trouble connecting right now. Please try again in a moment.",
          sender: 'bot',
          timestamp: new Date().toISOString()
        };

        setMessages(prev => [...prev, errorMessage]);
        setIsTyping(false);
      }, 1000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "What are your skills?",
    "Tell me about your projects",
    "How can I contact you?",
    "What technologies do you use?"
  ];

  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm Shaman's AI assistant. How can I help you today?",
        sender: 'bot',
        timestamp: new Date().toISOString()
      }
    ]);
  };

  return (
    <>
      {/* Chat Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r 
                   from-cyberpunk-pink to-cyberpunk-blue text-white shadow-2xl 
                   shadow-cyberpunk-pink/30 flex items-center justify-center"
      >
        <MessageCircle className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-4 w-4 bg-cyberpunk-blue rounded-full 
                        border-2 border-background animate-pulse"></span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            transition={{ type: 'spring', damping: 25 }}
            className={`fixed z-50 ${isMinimized ? 'bottom-24 right-6' : 'bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)]'} 
                      max-h-[calc(100vh-12rem)] flex flex-col bg-background border border-cyberpunk-pink/30 
                      rounded-2xl shadow-2xl shadow-cyberpunk-pink/20 overflow-hidden`}
            style={{ height: isMinimized ? 'auto' : '600px' }}
          >
            {/* Header */}
            <div className="p-4 border-b border-cyberpunk-pink/20 bg-gradient-to-r 
                          from-cyberpunk-dark/50 to-background/50 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyberpunk-pink 
                                to-cyberpunk-blue flex items-center justify-center">
                    <Bot className="h-6 w-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 h-4 w-4 bg-green-500 rounded-full 
                                border-2 border-background animate-pulse"></div>
                </div>
                <div>
                  <h3 className="font-orbitron font-bold">AI Assistant</h3>
                  <p className="font-space text-xs text-cyberpunk-blue">Online • Ready to help</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="h-8 w-8"
                >
                  {isMinimized ? (
                    <Maximize2 className="h-4 w-4" />
                  ) : (
                    <Minimize2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Messages Container */}
            {!isMinimized && (
              <>
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[80%] rounded-2xl p-4 ${
                        message.sender === 'user'
                          ? 'bg-gradient-to-r from-cyberpunk-pink/20 to-cyberpunk-blue/20 rounded-br-none'
                          : 'bg-cyberpunk-dark/30 border border-cyberpunk-blue/20 rounded-bl-none'
                      }`}>
                        <div className="flex items-start space-x-3">
                          {message.sender === 'bot' && (
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyberpunk-pink 
                                          to-cyberpunk-blue flex items-center justify-center flex-shrink-0">
                              <Bot className="h-4 w-4 text-white" />
                            </div>
                          )}
                          <div>
                            <p className="font-rajdhani text-sm">{message.text}</p>
                            <p className="text-xs text-muted-foreground mt-2">
                              {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </p>
                          </div>
                          {message.sender === 'user' && (
                            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyberpunk-blue 
                                          to-cyan-500 flex items-center justify-center flex-shrink-0">
                              <User className="h-4 w-4 text-white" />
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-cyberpunk-dark/30 border border-cyberpunk-blue/20 
                                    rounded-2xl rounded-bl-none p-4">
                        <div className="flex items-center space-x-3">
                          <div className="h-8 w-8 rounded-full bg-gradient-to-r from-cyberpunk-pink 
                                        to-cyberpunk-blue flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="flex space-x-2">
                            <div className="h-2 w-2 rounded-full bg-cyberpunk-pink animate-pulse"></div>
                            <div className="h-2 w-2 rounded-full bg-cyberpunk-pink animate-pulse delay-150"></div>
                            <div className="h-2 w-2 rounded-full bg-cyberpunk-pink animate-pulse delay-300"></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Questions */}
                {messages.length <= 2 && (
                  <div className="px-4 pb-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Sparkles className="h-4 w-4 text-cyberpunk-yellow" />
                      <p className="font-space text-xs text-muted-foreground">QUICK QUESTIONS</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickQuestions.map((question) => (
                        <button
                          key={question}
                          onClick={() => {
                            setInputMessage(question);
                            setTimeout(() => {
                              handleSendMessage();
                            }, 100);
                          }}
                          className="px-3 py-2 text-xs rounded-full border border-cyberpunk-blue/30 
                                   hover:border-cyberpunk-pink hover:bg-cyberpunk-pink/10 
                                   transition-all duration-300 font-rajdhani"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-cyberpunk-pink/20 bg-background/50">
                  <div className="flex space-x-2">
                    <Textarea
                      ref={inputRef}
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Type your message..."
                      className="min-h-[60px] max-h-[120px] resize-none border-cyberpunk-blue/30 
                               focus:border-cyberpunk-pink"
                      disabled={isTyping}
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputMessage.trim() || isTyping}
                      className="self-end bg-gradient-to-r from-cyberpunk-pink to-cyberpunk-blue 
                               hover:from-cyberpunk-blue hover:to-cyberpunk-pink"
                    >
                      {isTyping ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  
                  {/* Clear Chat Button */}
                  {messages.length > 2 && (
                    <div className="mt-3 flex justify-end">
                      <button
                        onClick={clearChat}
                        className="text-xs text-muted-foreground hover:text-cyberpunk-pink 
                                 transition-colors font-space"
                      >
                        Clear chat
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;