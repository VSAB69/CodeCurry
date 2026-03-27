import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Loader2, Sparkles, Bot } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { collegeContext } from '../data/collegeContext';

// Initialize Gemini API
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: "Hi! I'm the BMSCE AI Assistant. Ask me anything about the college, admissions, placements, or campus life!",
      sender: 'ai',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || !genAI) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const prompt = `
You are an official, helpful, and friendly AI assistant for BMS College of Engineering (BMSCE).

STRICT RULES:

1. Answer primarily using the provided website/context information.

2. If the answer is not found in the website:

   * Use general, accurate, and up-to-date knowledge about BMSCE.
   * If still unavailable, respond with:
     "I don't have that specific information, but I can help with other BMSCE-related queries."

3. Keep answers concise, clear, and well-structured.

4. Maintain a smart college assistant tone:

   * Confident, informative, and professional
   * Avoid sounding robotic or generic

5. Greeting behavior:

   * Greet the user ONLY if they greet first
   * Otherwise, directly answer the question

6. Stay relevant:

   * Answer ONLY what is asked
   * Avoid unnecessary details unless requested

7. Context flexibility:

   * Prefer website data first
   * If missing, use reliable general knowledge about BMSCE
   * Do NOT fabricate unknown details

8. Faculty-related queries:

   * Provide details from the website if available
   * If not, use generally available updated information
   * If unsure, clearly state uncertainty

9. Answer depth control:

   * Default → short answers
   * If asked for detail → provide detailed explanation

10. Follow-up support:

   * End with: "Let me know if you need more details."

11. Clarity:

   * Use bullet points or short paragraphs where needed

12. Consistency:

   * Do not contradict known information

13. Professional behavior:

   * No emojis, slang, or filler phrases

14. Handling disrespect:

   * If user is respectful → remain fully professional
   * If user is disrespectful → respond firmly but professionally without insults
   * Do NOT use abusive language, profanity, or personal attacks

   Example response:
   "I'm here to help with accurate information about BMSCE. Please keep the conversation respectful so I can assist you effectively."

   * After this, continue assisting the user normally

15. Error handling:

   * Ask for clarification if the query is unclear

16. Scope:

   * Answer ALL questions strictly related to BMSCE based on available information
   * Politely refuse anything outside scope using:
     "I can assist with queries related to BMSCE. Please let me know your question in that area."

CONTEXT:
${collegeContext}

USER QUESTION:
${userMessage.text}
`;

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
      });

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: text || "I'm sorry, I couldn't generate a response.",
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error('🔥 Gemini Error:', error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "⚠️ AI is currently unavailable. Please try again in a moment.",
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 z-50 px-6 py-4 rounded-full shadow-2xl bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-blue-500/25 transition-all duration-300 items-center justify-center gap-2 ${isOpen ? 'hidden' : 'flex'}`}
      >
        <Sparkles className="w-5 h-5 absolute -top-1 -left-1 text-yellow-300 animate-pulse" />
        <MessageSquare className="w-5 h-5 shrink-0" />
        <span className="font-bold tracking-wide">Here to Help</span>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] flex flex-col bg-[#111111] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">BMSCE Assistant</h3>
                  <p className="text-xs text-blue-400 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {!apiKey && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm mb-4">
                  Gemini API key is missing. Please set VITE_GEMINI_API_KEY.
                </div>
              )}

              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-tr-sm'
                      : 'bg-white/10 text-gray-200 rounded-tl-sm'
                      }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                    <span className="text-[10px] opacity-50 mt-1 block">
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex">
                  <div className="bg-white/10 p-4 rounded-2xl flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span className="text-sm text-gray-400">Thinking...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/10">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about BMSCE..."
                  disabled={isLoading || !apiKey}
                  className="flex-1 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-sm text-white"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isLoading || !apiKey}
                  className="p-2 rounded-full bg-blue-600 text-white"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}