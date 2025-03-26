'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const commands = [
  { command: 'home', path: '/' },
  { command: 'blog', path: '/blog' },
  { command: 'about', path: '/about' },
  { command: 'projects', path: '/projects' },
  { command: 'tags', path: '/tags' },
  { command: 'help', path: '' },
  { command: 'clear', path: '' },
  { command: 'hide', path: '' },
]

const TerminalUI: React.FC = () => {
  const router = useRouter()
  const [input, setInput] = useState('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [output, setOutput] = useState<string[]>([])
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [cursorLeft, setCursorLeft] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const mirrorRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus()
    }
  }, [isVisible])

  useEffect(() => {
    if (input === '') {
      setSuggestions([])
    } else {
      const filtered = commands
        .filter((cmd) => cmd.command.startsWith(input.toLowerCase()))
        .map((cmd) => cmd.command)
      setSuggestions(filtered)
    }
    updateCursorPos()
  }, [input])

  // Update custom cursor position using Canvas API (or mirror approach)
  const updateCursorPos = () => {
    if (inputRef.current && mirrorRef.current) {
      const pos = inputRef.current.selectionStart || 0
      mirrorRef.current.textContent = input.substring(0, pos)
      setCursorLeft(mirrorRef.current.offsetWidth + 6)
    }
  }

  const handleCommand = (cmd: string) => {
    setHistory((prev) => [...prev, cmd])
    setHistoryIndex(null)

    if (cmd === 'help') {
      setOutput((prev) => [
        ...prev,
        'Usage Tips:',
        '- Type a command and press Enter to navigate (e.g., "blog").',
        '- Use the arrow up/down keys to recall previous commands.',
        '- Type "clear" to clear the terminal messages.',
        '- Type "hide" to hide the terminal.',
        '- Available commands: ' + commands.map((c) => c.command).join(', '),
      ])
    } else if (cmd === 'clear') {
      setOutput([])
    } else if (cmd === 'hide') {
      setOutput([])
      setOutput((prev) => [
        ...prev,
        'Terminal hidden. You can show it again by clicking the "Show Terminal" button.',
      ])
      setIsVisible(false)
    } else {
      const found = commands.find((c) => c.command === cmd)
      if (found && found.path) {
        setOutput((prev) => [...prev, `Navigating to ${found.command}...`])
        router.push(found.path)
      } else {
        setOutput((prev) => [
          ...prev,
          `Command not recognized. Type "help" for available commands.`,
        ])
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      const cmd = input.trim().toLowerCase()
      if (cmd) {
        handleCommand(cmd)
      }
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (history.length > 0) {
        const newIndex = historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
        setTimeout(updateCursorPos, 0)
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex !== null) {
        const newIndex = Math.min(historyIndex + 1, history.length - 1)
        setHistoryIndex(newIndex)
        setInput(history[newIndex])
        setTimeout(updateCursorPos, 0)
      }
    }
  }

  if (!isVisible) {
    return (
      <div className="fixed bottom-0 right-0 z-50 m-4">
        <button
          className="rounded bg-gray-100 p-2 font-mono text-green-700 dark:bg-gray-900 dark:text-green-400"
          onClick={() => {
            setOutput([])
            setIsVisible(true)
            setTimeout(updateCursorPos, 0)
          }}
        >
          Show Terminal
        </button>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gray-100 p-4 font-mono text-green-700 dark:bg-gray-900 dark:text-green-400">
      {/* Terminal Output */}
      <div className="mb-2 max-h-40 overflow-auto text-xs">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
      {/* Terminal Prompt */}
      <div className="flex items-center">
        <span className="mr-2">user@site:~$</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent font-mono outline-none"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            onKeyUp={updateCursorPos}
            onClick={updateCursorPos}
            onSelect={updateCursorPos}
            onFocus={() => {
              setIsFocused(true)
              updateCursorPos()
            }}
            onBlur={() => setIsFocused(false)}
            placeholder="Type a command..."
            style={{ caretColor: 'transparent' }}
          />
          {/* Hidden mirror element for measuring text width */}
          <span
            ref={mirrorRef}
            className="invisible absolute left-0 top-0 whitespace-pre font-mono"
          />
          {/* Custom blinking cursor */}
          {isFocused && (
            <span
              className="blinking-cursor pointer-events-none absolute top-0 flex h-full items-center"
              style={{ left: `${cursorLeft}px` }}
            >
              |
            </span>
          )}
        </div>
      </div>
      {/* Autocomplete Suggestions */}
      {suggestions.length > 0 && (
        <div className="mt-2 text-xs text-gray-500 dark:text-gray-300">
          Suggestions: {suggestions.join(', ')}
        </div>
      )}
      {/* Hide Terminal Button */}
      <div className="mt-2 text-xs">
        <button
          onClick={() => {
            setOutput([])
            setOutput((prev) => [
              ...prev,
              'Terminal hidden. Click the "Show Terminal" button to reveal it.',
            ])
            setIsVisible(false)
          }}
          className="underline"
        >
          Hide Terminal
        </button>
      </div>
      <style jsx>{`
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }
        .blinking-cursor {
          animation: blink 1s step-start infinite;
        }
      `}</style>
    </div>
  )
}

export default TerminalUI
