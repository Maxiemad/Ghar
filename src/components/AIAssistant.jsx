
import { useState } from 'react';
import { Send, ArrowRight, Sparkles, Bot } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

const AIAssistant = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([
    { 
      role: 'assistant', 
      content: 'Hello! I\'m the GHAR AI Design Assistant. I can help with home design, answer general questions, provide recommendations, or just chat about anything you\'d like to discuss. How can I assist you today?' 
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Add user message to conversation
    setConversation([
      ...conversation, 
      { role: 'user', content: message }
    ]);
    
    // Start typing animation
    setIsTyping(true);
    const userMessage = message;
    setMessage('');
    
    // Simulate AI response with a more intelligent response system
    setTimeout(() => {
      let response;
      const lowerCaseMessage = userMessage.toLowerCase();
      
      // Home design related responses
      if (lowerCaseMessage.includes('interior') || lowerCaseMessage.includes('inside') || lowerCaseMessage.includes('room')) {
        response = "For interior design, we offer a range of tools including our drag-and-drop room designer, AI style generator, and furniture matching. Would you like me to guide you through our interior design tools or suggest some popular interior styles for 2025?";
      } 
      else if (lowerCaseMessage.includes('exterior') || lowerCaseMessage.includes('outside') || lowerCaseMessage.includes('facade')) {
        response = "Our exterior design tools let you explore different architectural styles, customize roofs and facades, and even simulate sunlight patterns throughout the day. Would you like to see examples of modern exterior designs or learn about sustainable building materials?";
      } 
      else if (lowerCaseMessage.includes('color') || lowerCaseMessage.includes('palette')) {
        response = "Color is a crucial element in design! For 2025, we're seeing a trend toward earthy tones with strategic accent colors. Our AI can generate personalized color palettes based on your preferences or existing furniture. Would you like me to suggest a palette based on a particular mood?";
      }
      else if (lowerCaseMessage.includes('furniture') || lowerCaseMessage.includes('sofa') || lowerCaseMessage.includes('table') || lowerCaseMessage.includes('chair')) {
        response = "Selecting the right furniture is essential for both functionality and aesthetics. Our Smart Match feature can help you find pieces that complement your existing décor. What kind of furniture are you looking for, and do you have any specific style preferences?";
      }
      else if (lowerCaseMessage.includes('budget') || lowerCaseMessage.includes('cost') || lowerCaseMessage.includes('price') || lowerCaseMessage.includes('expensive')) {
        response = "Our Budget Tracker helps you manage costs while creating your dream space. You can set budget limits and see real-time estimates as you add items. We also offer recommendations at different price points. What's your approximate budget for this project?";
      }
      // General knowledge responses
      else if (lowerCaseMessage.includes('who are you') || lowerCaseMessage.includes('what can you do')) {
        response = "I'm GHAR AI, a design assistant specialized in home interior and exterior design. I can help you plan spaces, suggest styles, match furniture, estimate costs, and answer questions about home design trends and techniques. I'm here to make your design journey easier and more enjoyable!";
      }
      else if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi ') || lowerCaseMessage === 'hi') {
        response = "Hello there! Welcome to GHAR Design Lab. How can I help with your home design project today? Whether you need inspiration, practical advice, or technical assistance with our tools, I'm here to help.";
      }
      // Personality responses
      else if (lowerCaseMessage.includes('joke') || lowerCaseMessage.includes('funny')) {
        response = "Why don't scientists trust atoms? Because they make up everything! Including your furniture. Speaking of which, would you like some non-atomic design advice today?";
      }
      else if (lowerCaseMessage.includes('thank')) {
        response = "You're very welcome! It's my pleasure to help with your design journey. Is there anything else you'd like to know or discuss about your project?";
      }
      // Default responses for unknown queries
      else {
        const generalResponses = [
          "That's an interesting question! From a design perspective, I'd approach this by considering how it affects the overall aesthetic and functionality of your space. Would you like me to elaborate on any specific aspect?",
          "I understand you're asking about that. While I focus primarily on home design, I'd be happy to share my thoughts on how this relates to creating your ideal living space. What specific information would be most helpful?",
          "Great question! This has several interesting implications for home design. Would you like me to explore how this connects with interior design principles, exterior architecture, or perhaps something else?",
          "I appreciate your curiosity! This topic has fascinating connections to spatial design and home aesthetics. Would you like to know more about how it might influence your design choices?",
          "Thanks for bringing this up! While I specialize in home design, I can certainly share some perspectives on how this might relate to creating beautiful and functional spaces. What aspect interests you most?"
        ];
        
        // Select a random general response
        response = generalResponses[Math.floor(Math.random() * generalResponses.length)];
      }
      
      setConversation(prev => [
        ...prev, 
        { role: 'assistant', content: response }
      ]);
      
      setIsTyping(false);
      
      // Auto-scroll to the bottom of the chat
      const chatContainer = document.querySelector('.chat-container');
      if (chatContainer) {
        chatContainer.scrollTop = chatContainer.scrollHeight;
      }
    }, 1000 + Math.random() * 1000); // Random delay between 1-2s for realism
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const clearConversation = () => {
    setConversation([
      { 
        role: 'assistant', 
        content: 'Hello! I\'m the GHAR AI Design Assistant. How can I help with your home design project today?' 
      }
    ]);
    toast.success("Conversation cleared!");
  };

  return (
    <section id="ai-assistant" className="py-20 bg-background relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 order-2 lg:order-1">
            <div className="bg-white dark:bg-ghar-dark/50 rounded-2xl shadow-xl overflow-hidden border border-border h-[600px] flex flex-col">
              <div className="bg-gradient-to-r from-ghar-primary to-ghar-secondary p-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bot size={24} />
                  <h3 className="text-lg font-medium">GHAR AI Design Assistant</h3>
                </div>
                <button 
                  onClick={clearConversation}
                  className="text-xs bg-white/20 hover:bg-white/30 rounded-full px-3 py-1 transition-colors"
                >
                  New Chat
                </button>
              </div>
              
              <div className="h-full p-4 overflow-y-auto flex flex-col gap-4 chat-container">
                {conversation.map((msg, index) => (
                  <div 
                    key={index} 
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        msg.role === 'user' 
                          ? 'bg-ghar-primary text-white rounded-tr-none' 
                          : 'bg-muted rounded-tl-none'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 rounded-full bg-ghar-primary/60 animate-pulse"></div>
                        <div className="w-2 h-2 rounded-full bg-ghar-primary/60 animate-pulse delay-150"></div>
                        <div className="w-2 h-2 rounded-full bg-ghar-primary/60 animate-pulse delay-300"></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <form onSubmit={handleSendMessage} className="border-t border-border p-4">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Ask me anything about home design..." 
                    className="flex-1 bg-muted rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-ghar-primary"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <button 
                    type="submit" 
                    className="bg-ghar-primary text-white rounded-full p-2 hover:bg-ghar-primary/90 transition-colors"
                    disabled={isTyping}
                  >
                    <Send size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
          
          <div className="lg:w-1/2 order-1 lg:order-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="text-ghar-primary" size={20} />
                <span className="text-sm font-medium text-ghar-primary">INTELLIGENT ASSISTANCE</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Your Personal <span className="text-gradient">AI Design</span> Assistant
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                Get expert guidance throughout your design journey with our advanced AI assistant that understands your preferences and provides personalized recommendations.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-ghar-primary/10 flex items-center justify-center text-ghar-primary">
                  01
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Smart Conversations</h3>
                  <p className="text-muted-foreground">
                    Ask any design questions and get intelligent, context-aware responses to help with your project decisions.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-ghar-secondary/10 flex items-center justify-center text-ghar-secondary">
                  02
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Design Knowledge</h3>
                  <p className="text-muted-foreground">
                    Access an extensive knowledge base of design principles, trends, and practical advice for your home.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="shrink-0 w-12 h-12 rounded-full bg-ghar-accent/10 flex items-center justify-center text-ghar-accent">
                  03
                </div>
                <div>
                  <h3 className="text-xl font-medium mb-1">Personalized Help</h3>
                  <p className="text-muted-foreground">
                    Get assistance tailored to your specific project needs, style preferences, and budget considerations.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <a href="#" className="inline-flex items-center text-ghar-primary hover:underline gap-2 group">
                Learn more about AI capabilities
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIAssistant;
