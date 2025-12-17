import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../context/DataContext';
import { Search, Send, MoreVertical, Paperclip, MessageSquare } from 'lucide-react';

const Messages: React.FC = () => {
  const { messages, sendMessage } = useData();
  const [selectedThreadId, setSelectedThreadId] = useState<string>(messages[0]?.id || '');
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedThread = messages.find(m => m.id === selectedThreadId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedThread?.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    sendMessage(selectedThreadId, inputText);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm h-[calc(100vh-140px)] min-h-[500px] flex overflow-hidden">
      {/* Sidebar List */}
      <div className="w-1/3 border-r border-slate-200 flex flex-col bg-slate-50/50">
        <div className="p-4 border-b border-slate-200">
          <h2 className="font-bold text-slate-800 mb-3 text-lg">Messagerie</h2>
          <div className="relative">
            <input 
              type="text" 
              placeholder="Rechercher..." 
              className="w-full pl-9 pr-3 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 bg-white"
            />
            <Search size={16} className="absolute left-3 top-3 text-slate-400" />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {messages.map(msg => (
            <div 
              key={msg.id}
              onClick={() => setSelectedThreadId(msg.id)}
              className={`p-4 border-b border-slate-100 cursor-pointer hover:bg-white flex gap-3 transition-colors ${selectedThreadId === msg.id ? 'bg-white border-l-4 border-l-indigo-600 shadow-sm' : 'border-l-4 border-l-transparent'}`}
            >
              <div className="relative">
                 <img src={msg.avatar} className="w-12 h-12 rounded-full object-cover" alt="" />
                 {msg.unread && <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-1">
                  <h4 className={`text-sm truncate ${msg.unread ? 'font-bold text-slate-900' : 'font-medium text-slate-700'}`}>
                    {msg.correspondent}
                  </h4>
                  <span className="text-xs text-slate-400">{msg.lastMessageDate}</span>
                </div>
                <p className={`text-sm truncate ${msg.unread ? 'font-medium text-slate-800' : 'text-slate-500'}`}>
                   {msg.messages[msg.messages.length - 1]?.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-2/3 flex flex-col bg-white">
        {selectedThread ? (
          <>
            <div className="p-4 border-b border-slate-200 flex justify-between items-center shadow-sm z-10">
               <div className="flex items-center gap-3">
                 <img src={selectedThread.avatar} className="w-10 h-10 rounded-full object-cover" alt="" />
                 <div>
                    <h3 className="font-bold text-slate-800">{selectedThread.correspondent}</h3>
                    <span className="flex items-center gap-1 text-xs text-green-600"><span className="w-2 h-2 bg-green-500 rounded-full"></span> En ligne</span>
                 </div>
               </div>
               <button className="text-slate-400 hover:text-slate-600 p-2 hover:bg-slate-50 rounded-full"><MoreVertical size={20}/></button>
            </div>

            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-slate-50/30">
               {selectedThread.messages.map(m => (
                 <div key={m.id} className={`flex ${m.sender === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl py-3 px-5 text-sm shadow-sm ${
                        m.sender === 'me' 
                        ? 'bg-indigo-600 text-white rounded-br-none' 
                        : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                    }`}>
                      {m.text}
                      <div className={`text-[10px] mt-1 text-right ${m.sender === 'me' ? 'text-indigo-200' : 'text-slate-400'}`}>
                        {m.timestamp}
                      </div>
                    </div>
                 </div>
               ))}
               <div ref={messagesEndRef} />
            </div>

            <div className="p-4 bg-white border-t border-slate-200">
               <div className="flex items-center gap-2 bg-slate-50 rounded-full border border-slate-200 p-1 pr-2">
                 <button className="text-slate-400 hover:text-indigo-600 p-2 hover:bg-slate-200 rounded-full transition-colors"><Paperclip size={20}/></button>
                 <input 
                   type="text" 
                   className="flex-1 bg-transparent py-2 px-2 focus:outline-none text-slate-700"
                   placeholder="Écrivez votre message..."
                   value={inputText}
                   onChange={(e) => setInputText(e.target.value)}
                   onKeyDown={handleKeyPress}
                 />
                 <button 
                    onClick={handleSend}
                    className={`p-2 rounded-full transition-all ${inputText.trim() ? 'bg-indigo-600 text-white shadow-md transform hover:scale-105' : 'bg-slate-200 text-slate-400'}`}
                    disabled={!inputText.trim()}
                 >
                   <Send size={18} />
                 </button>
               </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p>Sélectionnez une conversation pour commencer</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;