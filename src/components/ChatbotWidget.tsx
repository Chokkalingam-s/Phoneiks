import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI assistant. I can help you navigate Phoeniks, find schemes, answer questions about accessibility features, and more. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');

  const quickActions = [
    "Find schemes for me",
    "How to apply for scholarships?",
    "Employment opportunities",
    "Accessibility help"
  ];

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(inputValue);
      const botMessage: Message = {
        id: messages.length + 2,
        text: botResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('scheme') || input.includes('scholarship')) {
      return "I can help you find relevant schemes! Based on your profile, I recommend checking the National Scholarship for Persons with Disabilities and the State Special Education Support program. Would you like me to show you the eligibility criteria?";
    }
    
    if (input.includes('job') || input.includes('employment')) {
      return "Great! I see several job opportunities that match your profile. There are remote positions available in customer support, data entry, and content writing. Would you like me to filter these based on your specific needs?";
    }
    
    if (input.includes('accessibility') || input.includes('help')) {
      return "I can help with accessibility features! You can press Alt+A to open the accessibility toolbar, adjust font sizes, enable high contrast mode, or turn on text-to-speech. What specific accessibility feature would you like to know about?";
    }
    
    if (input.includes('apply') || input.includes('application')) {
      return "To apply for schemes or jobs, simply click the 'Apply Now' button on any opportunity card. Make sure your profile is complete and your documents are uploaded. I can guide you through the application process if needed.";
    }
    
    return "Thank you for your question! I'm here to help you navigate Phoeniks and make the most of the opportunities available. Could you please provide more details about what you're looking for?";
  };

  const handleQuickAction = (action: string) => {
    setInputValue(action);
    handleSendMessage();
  };

  return (
    <div className="fixed bottom-20 left-4 z-40">
      {/* Chat Widget Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-[#F77F00] hover:bg-[#E67000] text-white shadow-lg"
              aria-label="Open chat assistant"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="mb-4"
          >
            <Card className="w-80 h-96 shadow-2xl border-0">
              <CardHeader className="bg-[#F77F00] text-white p-4 rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Bot className="h-5 w-5" />
                    <CardTitle className="text-lg">AI Assistant</CardTitle>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              <CardContent className="p-0 flex flex-col h-80">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                          message.sender === 'user'
                            ? 'bg-[#F77F00] text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}
                      >
                        <div className="flex items-start space-x-2">
                          {message.sender === 'bot' && (
                            <Bot className="h-4 w-4 mt-0.5 text-[#F77F00]" />
                          )}
                          <span>{message.text}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Quick Actions */}
                {messages.length === 1 && (
                  <div className="px-4 py-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500 mb-2">Quick actions:</div>
                    <div className="flex flex-wrap gap-1">
                      {quickActions.map((action) => (
                        <Button
                          key={action}
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuickAction(action)}
                          className="text-xs px-2 py-1 h-auto border-[#F77F00] text-[#F77F00] hover:bg-[#F77F00] hover:text-white"
                        >
                          {action}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <div className="p-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Type your message..."
                      className="flex-1 border-gray-200 focus:border-[#F77F00] focus:ring-[#F77F00]"
                    />
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim()}
                      className="bg-[#F77F00] hover:bg-[#E67000] text-white"
                      size="sm"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}