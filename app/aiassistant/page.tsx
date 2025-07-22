"use client"

import { useRef, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';


const firstMessage = "Hello, \n I am an ai resume assistant. Ask me questions about James Cooper and find if he would be a good fit for your role." 

export default function AiAssistant() {
    const chatRef = useRef<HTMLDivElement | null>(null);
    const chatWrapperRef = useRef<HTMLDivElement | null>(null);
    const formRef = useRef<HTMLFormElement | null>(null);
    const { messages, input, handleInputChange, handleSubmit, status } =
        useChat({ api: '/api/chat' });

    const [kbOffset, setKbOffset] = useState(0);
    const [keyboardOpen, setKeyboardOpen ]= useState(false);
    const [wrapperKeyboardHeight, setWrapperKeyboardHeight] = useState("0");
    const initialHeight = useRef(0);
    const mobile = useRef(false);
    const textFocused = useRef(false);

    useEffect(() => {
        scrollDown();
    }, [messages, chatRef])

    useEffect(() => {
        mobile.current = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
        initialHeight.current = window.innerHeight;
    }, []);

    useEffect(() => {
        const newWrapperHeight = (chatWrapperRef.current ? chatWrapperRef.current.getBoundingClientRect().height - kbOffset : 0).toString();
        setWrapperKeyboardHeight(newWrapperHeight);
    }, [kbOffset])

    const updateKbOffset = () => {
        if (textFocused.current) {
            window.scrollTo({
                top: 0
              });
            if (window.innerHeight  <= initialHeight.current) {
                setKbOffset(initialHeight.current - window.innerHeight + 50 );
            } else {
                setKbOffset(0);
            }
        }
        else {
            initialHeight.current = window.innerHeight; 
        }
    };


    const scrollDown = () => {
        chatRef.current?.scrollTo({
            top: chatRef.current.scrollHeight,
            behavior: 'smooth'
        })
    }



    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !submitDisabled()) {
            e.preventDefault();
            handleSubmit();
        }
    };

    const submitDisabled = () => {
        return status !== 'ready' || !input
    }
    
    const focusText = () => {
        if (mobile.current){
            setKeyboardOpen(true);
            textFocused.current = true
            setTimeout(updateKbOffset, 100)
        }
    }

    const blurText = () => {
        if (mobile.current){
            setKeyboardOpen(false);
            textFocused.current = false
            setTimeout(updateKbOffset, 100)
        }
    }

    //<div ref={chatWrapperRef} className={`flex flex-col h-full`}>
    return (
        <div ref={chatWrapperRef} className={`flex flex-col ${!keyboardOpen ? "h-full" : `h-[${wrapperKeyboardHeight}px]`}`}>
            <div ref={chatRef} className="flex-1 flex-grow overflow-y-auto mb-4 rounded-lg p-4 border-x border-1px border-x-primary">
                <div className={!keyboardOpen ? "space-y-4": `max-h-px`}>
                    <div
                        key="fistMessage"
                        className={`flex 'justify-start'}`}
                    >
                        <div
                            className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg bg-primary shadow-sm"
                        >
                            <p className="text-sm m-2 indent-0">{firstMessage}</p>
                        </div>
                    </div>
                    {messages.map((message) => (
                        <div
                            key={message.id}
                            className={`flex ${message.role == "user" ? 'justify-end' : 'justify-start'}`}
                        >
                            <div
                                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${message.role == "user"
                                    ? 'bg-accent text-white'
                                    : 'bg-primary shadow-sm'
                                    }`}
                            >
                                <p className="text-sm m-2 indent-0">{message.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="p-10">
                <div>
                    <form className="flex gap-2" ref={formRef} onSubmit={handleSubmit}>
                        <textarea
                            value={input}
                            onFocus={focusText}
                            onBlur={blurText}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Type your message here..."
                            className="flex-1 p-3 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600"
                            rows={3}
                        />
                        <button
                            type="submit"
                            disabled={submitDisabled()}
                            className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent_hover transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            send
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}