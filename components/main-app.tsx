"use client"

import { useEffect, useState, useRef } from "react"
import {
  Menu,
  X,
  Download,
  Search,
  Code2,
  FileCode,
  Terminal,
  Coffee,
  Gem,
  Send,
  ShoppingCart,
  CreditCard,
} from "lucide-react"
import Typewriter from "typewriter-effect"
import { motion } from "framer-motion"
import PurchaseModal from "./purchase-modal"
import PaymentModal from "./payment-modal"
import SuccessModal from "./success-modal"

export default function MainApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [audio] = useState(typeof window !== "undefined" ? new Audio("https://files.catbox.moe/fw4txr.mp3") : null)
  const [currentSection, setCurrentSection] = useState("home")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedLanguage, setSelectedLanguage] = useState("")
  const [chatMessages, setChatMessages] = useState([])
  const [userInput, setUserInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [showPaymentModal, setShowPaymentModal] = useState(false)
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [purchaseData, setPurchaseData] = useState(null)
  const [transactionData, setTransactionData] = useState(null)
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (audio) {
      audio.loop = true

      const handleClick = () => {
        audio.play().catch((error) => console.log("Audio playback failed:", error))
      }

      document.addEventListener("click", handleClick)

      return () => {
        document.removeEventListener("click", handleClick)
        audio.pause()
        audio.currentTime = 0
      }
    }
  }, [audio])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [chatMessages])

  const handleSendMessage = async () => {
    if (!userInput.trim()) return

    const newMessage = { role: "user", content: userInput }
    setChatMessages((prev) => [...prev, newMessage])
    setUserInput("")
    setIsLoading(true)

    try {
      const boltResponse = {
        role: "assistant",
        content: `I am PlankDev, your AI coding assistant. I'll help you with your programming questions and provide guidance on best practices. How can I assist you with your code today?

For example, I can help you with:
- Code explanations
- Debugging assistance
- Best practices
- Design patterns
- Performance optimization
- And much more!

Just let me know what you'd like help with.`,
      }

      setTimeout(() => {
        setChatMessages((prev) => [...prev, boltResponse])
        setIsLoading(false)
      }, 1000)
    } catch (error) {
      console.error("Error:", error)
      setIsLoading(false)
    }
  }

  const roles = ["DEVELOPER", "PROGRAMMERS", "ETHICAL HACKING", "ENGINEER", "DESIGNER"]

  const products = [
    {
      id: "panel-1gb",
      name: "PANEL 1GB",
      price: "Rp 2.000",
      priceNum: 2000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012012024111138189917",
      specs: {
        ram: "1GB",
        cpu: "50%",
        disk: "5GB",
        databases: 2,
        backups: 1,
      },
    },
    {
      id: "panel-2gb",
      name: "PANEL 2GB",
      price: "Rp 4.000",
      priceNum: 4000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062422552112",
      specs: {
        ram: "2GB",
        cpu: "75%",
        disk: "10GB",
        databases: 3,
        backups: 2,
      },
    },
    {
      id: "panel-3gb",
      name: "PANEL 3GB",
      price: "Rp 6.000",
      priceNum: 6000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062420906622",
      specs: {
        ram: "3GB",
        cpu: "100%",
        disk: "15GB",
        databases: 4,
        backups: 3,
      },
    },
    {
      id: "panel-4gb",
      name: "PANEL 4GB",
      price: "Rp 8.000",
      priceNum: 8000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062491815006",
      specs: {
        ram: "4GB",
        cpu: "125%",
        disk: "20GB",
        databases: 5,
        backups: 4,
      },
    },
    {
      id: "panel-5gb",
      name: "PANEL 5GB",
      price: "Rp 10.000",
      priceNum: 10000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062447765126",
      specs: {
        ram: "5GB",
        cpu: "150%",
        disk: "25GB",
        databases: 6,
        backups: 5,
      },
    },
    {
      id: "panel-6gb",
      name: "PANEL 6GB",
      price: "Rp 12.000",
      priceNum: 12000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062499264915",
      specs: {
        ram: "6GB",
        cpu: "175%",
        disk: "30GB",
        databases: 7,
        backups: 6,
      },
    },
    {
      id: "panel-7gb",
      name: "PANEL 7GB",
      price: "Rp 14.000",
      priceNum: 14000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062448920958",
      specs: {
        ram: "7GB",
        cpu: "200%",
        disk: "35GB",
        databases: 8,
        backups: 7,
      },
    },
    {
      id: "panel-8gb",
      name: "PANEL 8GB",
      price: "Rp 16.000",
      priceNum: 16000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062446746601",
      specs: {
        ram: "8GB",
        cpu: "225%",
        disk: "40GB",
        databases: 9,
        backups: 8,
      },
    },
    {
      id: "panel-9gb",
      name: "PANEL 9GB",
      price: "Rp 18.000",
      priceNum: 18000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062407665457",
      specs: {
        ram: "9GB",
        cpu: "250%",
        disk: "45GB",
        databases: 10,
        backups: 9,
      },
    },
    {
      id: "panel-10gb",
      name: "PANEL 10GB",
      price: "Rp 20.000",
      priceNum: 20000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062449114334",
      specs: {
        ram: "10GB",
        cpu: "275%",
        disk: "50GB",
        databases: 11,
        backups: 10,
      },
    },
    {
      id: "panel-unlimited",
      name: "PANEL UNLIMITED",
      price: "Rp 22.000",
      priceNum: 22000,
      type: "panel",
      danaLink: "https://link.dana.id/minta?full_url=https://qr.dana.id/v1/281012092025062490962379",
      specs: {
        ram: "Unlimited",
        cpu: "Unlimited",
        disk: "Unlimited",
        databases: "Unlimited",
        backups: "Unlimited",
      },
    },
    { id: "vps", name: "VPS / SERVER", price: "Rp 25-125", type: "other" },
    { id: "script", name: "ALL SCRIPT BOT", price: "Rp 5-300", type: "other" },
    { id: "domain", name: "DOMAIN", price: "Rp 20-70", type: "other" },
    { id: "apk-sadap", name: "APK SADAP", price: "Rp 15-50", type: "other" },
    { id: "apk-ransom", name: "APK RANSOM", price: "Rp 25-150", type: "other" },
    { id: "file-base", name: "FILE BASE WA SUPPORT", price: "Rp 60", type: "other" },
    { id: "apk-ddos", name: "APK DDOS", price: "Rp 20", type: "other" },
    { id: "file-ransom", name: "FILE RANSOM", price: "Rp 15-30", type: "other" },
  ]

  const scripts = [
    {
      name: "SCRIPT BOT MD WA NO ENC",
      url: "https://www.mediafire.com/file/je75s7i787inh2f/Sc-Md-ByMalzhost-NoEnc.zip/file",
    },
    {
      name: "SCRIPT BASE MD BOT WA NO ENC",
      url: "https://www.mediafire.com/file/jm2hjtrub85fpmh/Base-BotWA-NoENC.zip/file",
    },
    { name: "SC CPANEL SIMPLE", url: "https://www.mediafire.com/file/mis6m62tjettnlx/CPANEL+SIMPEL.zip/file" },
    { name: "KUMPULAN SC DDOS", url: "https://www.mediafire.com/file/lmk6e0cpd5bnmcs/DDOS+ARCHIVE.zip/file" },
    {
      name: "SC BUG NIKA V9",
      url: "https://www.mediafire.com/file/95m0rr0sbjsedpe/NIKA+V9.2+NEW+[+NO+ENC+BY+ANONIM].zip/file",
    },
    { name: "KYOKI MD [NO ENC]", url: "https://www.mediafire.com/file/fu33zksqzcop4ei/KYOKI+MD+NO+ENC.zip/file" },
  ]

  const videos = [
    'https://files.catbox.moe/73h8it.mp4',
    'https://files.catbox.moe/oxbv6r.mp4',
    'https://files.catbox.moe/30l3mw.mp4',
    'https://files.catbox.moe/eompwc.mp4',
    'https://files.catbox.moe/hk54iu.mp4',
    'https://files.catbox.moe/n0zh60.mp4',
    'https://files.catbox.moe/fk0jnq.mp4',
    'https://files.catbox.moe/lu1je3.mp4',
    'https://files.catbox.moe/bxezej.mp4',
    'https://files.catbox.moe/9bugyh.mp4',
    'https://files.catbox.moe/dam57o.mp4',
    'https://files.catbox.moe/61yf64.mp4',
    'https://files.catbox.moe/o489jb.mp4',
    'https://files.catbox.moe/19b51l.mp4',
    'https://files.catbox.moe/vk08su.mp4'
  ]

  const apis = [
    { name: "OpenAI GPT-3.5", token: "sk-...", description: "AI language model API" },
    { name: "Google Cloud Vision", token: "AIza...", description: "Image recognition API" },
    { name: "OpenWeatherMap", token: "b1b15e88fa797225412429c1c50c122a1", description: "Weather data API" },
    { name: "NASA API", token: "DEMO_KEY", description: "Space and astronomy data" },
  ]

  const skills = [
    { name: "HTML", percentage: 90, icon: Code2, color: "from-orange-500 to-red-500" },
    { name: "CSS", percentage: 85, icon: FileCode, color: "from-blue-500 to-cyan-500" },
    { name: "JAVASCRIPT", percentage: 80, icon: Terminal, color: "from-yellow-500 to-amber-500" },
    { name: "PYTHON", percentage: 72, icon: Coffee, color: "from-blue-600 to-green-500" },
    { name: "RUBY", percentage: 30, icon: Gem, color: "from-red-600 to-red-700" },
  ]

  const sourceCode = {
    HTML: [
      {
        title: "Responsive Landing Page",
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Landing Page</title>
    <link href="styles.css" rel="stylesheet">
</head>
<body>
    <header>
        <nav>
            <div class="logo">Brand</div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#about">About</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    <main>
        <section class="hero">
            <h1>Welcome to Our Site</h1>
            <p>Discover amazing features and services</p>
            <button>Get Started</button>
        </section>
    </main>
</body>
</html>`,
      },
    ],
    CSS: [
      {
        title: "Modern Button Styles",
        code: `.button {
    padding: 12px 24px;
    border: none;
    border-radius: 6px;
    background: linear-gradient(45deg, #4F46E5, #7C3AED);
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.2s;
}

.button:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}`,
      },
    ],
    JAVASCRIPT: [
      {
        title: "Interactive Todo List",
        code: `class TodoList {
    constructor() {
        this.todos = [];
    }

    addTodo(text) {
        this.todos.push({
            id: Date.now(),
            text,
            completed: false
        });
    }

    toggleTodo(id) {
        const todo = this.todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
        }
    }
}

const todoList = new TodoList();`,
      },
    ],
    PYTHON: [
      {
        title: "Web Scraper",
        code: `import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        titles = soup.find_all('h2', class_='article-title')
        
        return [title.text.strip() for title in titles]
        
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return []`,
      },
    ],
    RUBY: [
      {
        title: "Simple CLI Application",
        code: `class CLI
    def initialize
        @tasks = []
    end
    
    def add_task(description)
        @tasks << {
            id: @tasks.length + 1,
            description: description,
            completed: false
        }
        puts "Task added successfully!"
    end
end

cli = CLI.new`,
      },
    ],
  }

  const handleProductPurchase = (product) => {
    if (product.type === "panel") {
      setSelectedProduct(product)
      setShowPurchaseModal(true)
    } else {
      // For other products, redirect to WhatsApp
      window.open("https://wa.me/628881382817", "_blank")
    }
  }

  const handlePurchaseSubmit = (data) => {
    setPurchaseData(data)
    setShowPurchaseModal(false)
    setShowPaymentModal(true)
  }

  const handlePaymentComplete = (transaction) => {
    setTransactionData(transaction)
    setShowPaymentModal(false)
    setShowSuccessModal(true)
  }

  const filteredApis = apis.filter(
    (api) =>
      api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      api.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const renderContent = () => {
    switch (currentSection) {
      case "chat":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Chat with PlankDev AI
            </h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === "user" ? "bg-purple-600" : "bg-gray-700"
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                    </div>
                  </motion.div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-700 rounded-lg p-4">
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask PlankDev anything about coding..."
                  className="flex-1 bg-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-purple-600 hover:bg-purple-700 rounded-lg px-4 py-2 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )

      case "skills":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Skills & Expertise
            </h2>
            <div className="space-y-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon
                const barColor = skill.percentage < 31 ? "bg-red-600" : `bg-gradient-to-r ${skill.color}`
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 p-6 rounded-lg"
                  >
                    <div className="flex items-center mb-3">
                      <Icon className="w-6 h-6 mr-3" />
                      <span className="text-lg font-semibold">{skill.name}</span>
                    </div>
                    <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.percentage}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className={`h-full ${barColor}`}
                      />
                    </div>
                    <span className="text-sm text-gray-400 mt-2 block">{skill.percentage}%</span>
                  </motion.div>
                )
              })}
            </div>
          </div>
        )

      case "source":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Source Code Examples
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {Object.keys(sourceCode).map((language, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedLanguage(language)}
                  className={`p-6 rounded-lg transition-all duration-300 ${
                    selectedLanguage === language
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "bg-gray-800 hover:bg-gray-700"
                  }`}
                >
                  <h3 className="text-xl font-bold">{language}</h3>
                </motion.button>
              ))}
            </div>
            {selectedLanguage && (
              <div className="space-y-8">
                {sourceCode[selectedLanguage].map((example, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="bg-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 bg-gray-700">
                      <h3 className="text-xl font-bold">{example.title}</h3>
                    </div>
                    <pre className="p-4 overflow-x-auto">
                      <code className="text-sm">{example.code}</code>
                    </pre>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )

      case "scripts":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Script Bot Collection
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {scripts.map((script, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    {script.name}
                  </h3>
                  <a
                    href={script.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "api":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Free API Collection
            </h2>
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search APIs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg pl-10 focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApis.map((api, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300"
                >
                  <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                    {api.name}
                  </h3>
                  <p className="text-gray-400 mb-4">{api.description}</p>
                  <div className="bg-gray-900 p-2 rounded-md">
                    <code className="text-green-400">{api.token}</code>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "content":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Content Gallery
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-lg overflow-hidden"
                >
                  <video controls className="w-full" preload="metadata">
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              ))}
            </div>
          </div>
        )

      case "guide":
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              API Usage Guide
            </h2>
            <div className="space-y-8">
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Getting Started
                </h3>
                <p className="text-gray-300 mb-4">To use any of our APIs, follow these simple steps:</p>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Choose an API from our collection</li>
                  <li>Copy the API token</li>
                  <li>Include the token in your API request header</li>
                  <li>Make your API request using fetch or axios</li>
                </ol>
              </div>
              <div className="bg-gray-800 rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  Example Usage
                </h3>
                <pre className="bg-gray-900 p-4 rounded-md overflow-x-auto">
                  <code className="text-green-400">
                    {`fetch('https://api.example.com/data', {
  headers: {
    'Authorization': 'Bearer YOUR_API_TOKEN'
  }
})
.then(response => response.json())
.then(data => console.log(data));`}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        )

      default:
        return (
          <>
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Welcome to Plankton4You.Dev
              </h1>
              <div className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                <Typewriter
                  options={{
                    strings: roles,
                    autoStart: true,
                    loop: true,
                  }}
                />
              </div>
            </div>

            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Our Products
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-800 rounded-lg p-6 hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <h3 className="text-xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                      {product.name}
                    </h3>
                    <p className="text-gray-400 mb-4">{product.price}</p>

                    {product.type === "panel" && product.specs && (
                      <div className="mb-4 text-sm text-gray-300">
                        <div>RAM: {product.specs.ram}</div>
                        <div>CPU: {product.specs.cpu}</div>
                        <div>Disk: {product.specs.disk}</div>
                        <div>Databases: {product.specs.databases}</div>
                        <div>Backups: {product.specs.backups}</div>
                      </div>
                    )}

                    <button
                      onClick={() => handleProductPurchase(product)}
                      className="w-full flex items-center justify-center px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      {product.type === "panel" ? (
                        <>
                          <ShoppingCart className="w-4 h-4 mr-2" />
                          Buy Now
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Contact
                        </>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-16 text-center">
              <div className="text-2xl font-bold mb-8">
                <Typewriter
                  options={{
                    strings: ["MENERIMA JASA APAPUN DENGAN CODING DAN EDITING ATAU DESAIN"],
                    autoStart: true,
                    loop: true,
                    delay: 50,
                  }}
                />
              </div>
            </section>

            <section id="contact" className="text-center">
              <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Contact Me
              </h2>
              <div className="space-y-4">
                <a
                  href="https://wa.me/628881382817"
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp 1
                </a>
                <a
                  href="https://wa.me/6283824299082"
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp 2
                </a>
                <a
                  href="https://whatsapp.com/channel/0029Vay9jnG65yDFJDN6tG1j"
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp Channel
                </a>
                <a
                  href="https://www.instagram.com/plankton4you.dev"
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </div>
            </section>
          </>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      <div className="bg-black py-2 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap">
          <span className="text-2xl font-bold mx-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
            KEBUTUHAN HOSTING
          </span>
        </div>
      </div>

      <header className="flex justify-between items-center p-4 bg-black/50 backdrop-blur-sm">
        <div className="flex items-center">
          <img src="https://files.catbox.moe/98ma2n.jpg" alt="Logo" className="h-12 w-12 rounded-full" />
        </div>
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white p-2 hover:bg-gray-800 rounded-lg"
        >
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </header>

      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: isSidebarOpen ? 0 : "100%" }}
        transition={{ type: "spring", stiffness: 100 }}
        className="fixed top-0 right-0 h-full w-64 bg-gray-900 p-4 shadow-lg z-50"
      >
        <div className="flex justify-end">
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 hover:bg-gray-800 rounded-lg">
            <X />
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => {
                  setCurrentSection("home")
                  setIsSidebarOpen(false)
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection("skills")
                  setIsSidebarOpen(false)
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Skills
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection("source")
                  setIsSidebarOpen(false)
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Source Code
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection("scripts")
                  setIsSidebarOpen(false)
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Script Bot
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection("api")
                  setIsSidebarOpen(false)
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                API
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection("content")
                  setIsSidebarOpen(false)
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Content
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection("guide")
                  setIsSidebarOpen(false)
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                API Guide
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection("chat")
                  setIsSidebarOpen(false)
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Chat with AI PlankDev
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>

      <main className="container mx-auto px-4 py-16">{renderContent()}</main>

      {/* Modals */}
      {showPurchaseModal && (
        <PurchaseModal
          product={selectedProduct}
          onClose={() => setShowPurchaseModal(false)}
          onSubmit={handlePurchaseSubmit}
        />
      )}

      {showPaymentModal && (
        <PaymentModal
          product={selectedProduct}
          purchaseData={purchaseData}
          onClose={() => setShowPaymentModal(false)}
          onComplete={handlePaymentComplete}
        />
      )}

      {showSuccessModal && (
        <SuccessModal transactionData={transactionData} onClose={() => setShowSuccessModal(false)} />
      )}
    </div>
  )
}
