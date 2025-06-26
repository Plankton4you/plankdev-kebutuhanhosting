import React, { useEffect, useState, useRef } from 'react';
import { Menu, X, Download, Search, Code2, FileCode, Terminal, Coffee, Gem, Send } from 'lucide-react';
import Typewriter from 'typewriter-effect';
import { motion } from 'framer-motion';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [audio] = useState(new Audio('https://files.catbox.moe/fw4txr.mp3'));
  const [currentSection, setCurrentSection] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [chatMessages, setChatMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef(null);

    useEffect(() => {
    // Configure audio
    audio.loop = true;
    
    // Add click event listener to document
    const handleClick = () => {
      audio.play().catch(error => console.log('Audio playback failed:', error));
    };

    document.addEventListener('click', handleClick);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessage = { role: 'user', content: userInput };
    setChatMessages(prev => [...prev, newMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const boltResponse = {
        role: 'assistant',
        content: `I am PlankDev, your AI coding assistant. I'll help you with your programming questions and provide guidance on best practices. How can I assist you with your code today?

For example, I can help you with:
- Code explanations
- Debugging assistance
- Best practices
- Design patterns
- Performance optimization
- And much more!

Just let me know what you'd like help with.`
      };

      setTimeout(() => {
        setChatMessages(prev => [...prev, boltResponse]);
        setIsLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error:', error);
      setIsLoading(false);
    }
  };

  const roles = ['DEVELOPER', 'PROGRAMMERS', 'ETHICAL HACKING', 'ENGINEER', 'DESIGNER'];

  const products = [
    { name: 'VPS / SERVER', price: 'Rp 25-125' },
    { name: 'ALL SCRIPT BOT', price: 'Rp 5-300' },
    { name: 'DOMAIN', price: 'Rp 20-70' },
    { name: 'PANEL', price: 'Rp 1-10' },
    { name: 'APK SADAP', price: 'Rp 15-50' },
    { name: 'APK RANSOM', price: 'Rp 25-150' },
    { name: 'FILE BASE WA SUPPORT', price: 'Rp 60' },
    { name: 'APK DDOS', price: 'Rp 20' },
    { name: 'FILE RANSOM', price: 'Rp 15-30' },
    { name: 'MURBUG', price: 'Rp 10-25' },
    { name: 'ALL API', price: 'Contact for pricing' },
    { name: 'ORKUT', price: 'Contact for pricing' },
    { name: 'AKUN ALL GAME', price: 'Contact for pricing' },
    { name: 'NOKOS', price: 'Contact for pricing' }
  ];

  const scripts = [
    { name: 'SCRIPT BOT MD WA NO ENC', url: 'https://www.mediafire.com/file/je75s7i787inh2f/Sc-Md-ByMalzhost-NoEnc.zip/file' },
    { name: 'SCRIPT BASE MD BOT WA NO ENC', url: 'https://www.mediafire.com/file/jm2hjtrub85fpmh/Base-BotWA-NoENC.zip/file' },
    { name: 'SC CPANEL SIMPLE', url: 'https://www.mediafire.com/file/mis6m62tjettnlx/CPANEL+SIMPEL.zip/file' },
    { name: 'KUMPULAN SC DDOS', url: 'https://www.mediafire.com/file/lmk6e0cpd5bnmcs/DDOS+ARCHIVE.zip/file' },
    { name: 'SC BUG NIKA V9', url: 'https://www.mediafire.com/file/95m0rr0sbjsedpe/NIKA+V9.2+NEW+[+NO+ENC+BY+ANONIM].zip/file' },
    { name: 'KYOKI MD [NO ENC]', url: 'https://www.mediafire.com/file/fu33zksqzcop4ei/KYOKI+MD+NO+ENC.zip/file' },
    { name: 'SC REXUZ11', url: 'https://www.mediafire.com/file/kgyw7yrp1y8pwt2/Rayzz_Need_Cewe_%2540Rexxuz11.zip/file' },
    { name: 'NAKANO ITSUKI - AI V2', url: 'https://www.mediafire.com/file/gxk7wd9vglfbuhe/Itsuki_-_AI_V2_.zip/file' },
    { name: 'APK TOOLS ALL FITUR', url: 'https://ewww.mediafire.com/file/51sgk0s2jgrybyv/Tools+X+PlankDev+V1.apk/file' },
    { name: 'SC CPANEL & PUSHKONT', url: 'https://www.mediafire.com/file/1m2kzcz7gndhrwq/Levi_Botz_New_Version.zip/file' },
    { name: 'SC FURINA MD V2 NO ENC', url: 'https://www.mediafire.com/file/8bgofihs8du3n82/FURINA_MD_V2_%255B_FIX_%255D.gz/file' },
    { name: 'KORPS GOZZ CRASH', url: 'https://www.mediafire.com/file/5bxgxultabq7m9o/西𝙎𝘾𝙍𝙄𝙋𝙏+𝙆𝙊𝙍𝙋𝙎+𝙂𝙊𝙕𝙕起.zip/file' },
    { name: 'KUROGANE CRASHER', url: 'https://www.mediafire.com/file/n1ep4oh8oyyatnp/KuroganeCrasher.zip/file' },
    { name: 'PARK INVISION V1.0', url: 'https://www.mediafire.com/file/qzhi3qbeezgj9je/PARK_INVISION_V1.0.zip/file' },
    { name: 'QUANTUM X V1.0.0', url: 'https://www.mediafire.com/file/lmgee9n4gw4lnoo/QuantumX_V1.0.0.zip/file' },
    { name: 'TOOLS ALL FITUR UP PLANKDEV', url: 'https://www.mediafire.com/file/51sgk0s2jgrybyv/Tools+X+PlankDev+V1.apk/file' },
    { name: 'ZORO 6.1 PRO [NO ENC]', url: 'https://www.mediafire.com/file/o3ov9hdhn1c4tc2/ZORO_6.1%25E2%2580%2594PRO_%255B_NO_ENC_%255D.zip/file' },
    { name: 'TRCRSHER V1 MIKA', url: 'https://www.mediafire.com/file/05exo2mlkrs97ys/trcrsher+V1+Mika.zip/file' },
    { name: 'X-WZXTEAM V2 GEN 1 ENC', url: 'https://www.mediafire.com/file/aa2ttx8cpcb1r26/𝐗-𝐖𝐙𝐗𝐓𝐄𝐀𝐌+𝐕𝟐+𝐆𝐄𝐍+𝟏++𝐄𝐍𝐂.zip/file' },
    { name: 'Base-botwa-new', url: 'https://www.mediafire.com/file/rpor0xh5vkqlwop/Base-botwa-new.zip/file' },
    { name: 'DeftonesX V1 ENC', url: 'https://www.mediafire.com/file/b72gyak13jakcgw/𝙳𝚎𝚏𝚝𝚘𝚗𝚎𝚜𝚇+𝚅𝟷+𝙴𝙽𝙲.zip/file' }
  ];

  const videos = [
    'https://files.catbox.moe/lu1je3.mp4',
    'https://files.catbox.moe/bxezej.mp4',
    'https://files.catbox.moe/9bugyh.mp4',
    'https://files.catbox.moe/dam57o.mp4',
    'https://files.catbox.moe/61yf64.mp4',
    'https://files.catbox.moe/o489jb.mp4',
    'https://files.catbox.moe/19b51l.mp4',
    'https://files.catbox.moe/vk08su.mp4'
  ];

  const apis = [
    { name: 'OpenAI GPT-3.5', token: 'sk-...', description: 'AI language model API' },
    { name: 'Google Cloud Vision', token: 'AIza...', description: 'Image recognition API' },
    { name: 'OpenWeatherMap', token: 'b1b15e88fa797225412429c1c50c122a1', description: 'Weather data API' },
    { name: 'NASA API', token: 'DEMO_KEY', description: 'Space and astronomy data' },
    { name: 'News API', token: '38a6a52b3d414c45a11f4a187e6be67d', description: 'Global news articles' },
    { name: 'MovieDB', token: '3e7751f0c8c247c6ac4f180439098c06', description: 'Movie and TV show data' },
    { name: 'Giphy', token: 'dc6zaTOxFJmzC', description: 'GIF search and upload' },
    { name: 'PixaBay', token: '15039616-d79d4aaa8890e9898a5b6d5e7', description: 'Free stock images' },
    { name: 'CoinGecko', token: 'free', description: 'Cryptocurrency data' },
    { name: 'Football-Data', token: '9c4548ad43d644d6a152d6c0f2c7ade7', description: 'Soccer statistics' }
  ];

  const skills = [
    { name: 'HTML', percentage: 90, icon: Code2, color: 'from-orange-500 to-red-500' },
    { name: 'CSS', percentage: 85, icon: FileCode, color: 'from-blue-500 to-cyan-500' },
    { name: 'JAVASCRIPT', percentage: 80, icon: Terminal, color: 'from-yellow-500 to-amber-500' },
    { name: 'PYTHON', percentage: 72, icon: Coffee, color: 'from-blue-600 to-green-500' },
    { name: 'RUBY', percentage: 30, icon: Gem, color: 'from-red-600 to-red-700' }
  ];

  const sourceCode = {
    HTML: [
      {
        title: 'Responsive Landing Page',
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
        <audio id="backsound" loop="">
  <source src="https://files.catbox.moe/fw4txr.mp3" type="audio/mpeg">
  Browser Anda tidak mendukung elemen audio.
</audio>
    </main>
</body>
</html>`
      },
      {
        title: 'Portfolio Template',
        code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <link href="portfolio.css" rel="stylesheet">
</head>
<body>
    <div class="portfolio">
        <header>
            <h1>John Doe</h1>
            <p>Web Developer & Designer</p>
        </header>
        <section class="projects">
            <h2>My Projects</h2>
            <div class="project-grid">
                <!-- Project cards go here -->
            </div>
        </section>
    </div>
    </body>
</html>`
      }
    ],
    CSS: [
      {
        title: 'Modern Button Styles',
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
}`
      },
      {
        title: 'Responsive Grid Layout',
        code: `.grid-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
    padding: 20px;
}

.grid-item {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

@media (max-width: 768px) {
    .grid-container {
        grid-template-columns: 1fr;
    }
}`
      }
    ],
    JAVASCRIPT: [
      {
        title: 'Interactive Todo List',
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

    deleteTodo(id) {
        this.todos = this.todos.filter(t => t.id !== id);
    }
}

const todoList = new TodoList();`
      },
      {
        title: 'Fetch API Example',
        code: `async function fetchData() {
    try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}`
      }
    ],
    PYTHON: [
      {
        title: 'Web Scraper',
        code: `import requests
from bs4 import BeautifulSoup

def scrape_website(url):
    try:
        response = requests.get(url)
        response.raise_for_status()
        
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find all article titles
        titles = soup.find_all('h2', class_='article-title')
        
        return [title.text.strip() for title in titles]
        
    except Exception as e:
        print(f"Error scraping {url}: {e}")
        return []

# Example usage
articles = scrape_website('https://example.com/blog')`
      },
      {
        title: 'Data Analysis',
        code: `import pandas as pd
import matplotlib.pyplot as plt

def analyze_data(csv_file):
    # Read the CSV file
    df = pd.read_csv(csv_file)
    
    # Basic statistics
    stats = df.describe()
    
    # Create a visualization
    plt.figure(figsize=(10, 6))
    df['column_name'].hist()
    plt.title('Data Distribution')
    plt.xlabel('Values')
    plt.ylabel('Frequency')
    plt.show()
    
    return stats`
      }
    ],
    RUBY: [
      {
        title: 'Simple CLI Application',
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
    
    def list_tasks
        if @tasks.empty?
            puts "No tasks found."
        else
            @tasks.each do |task|
                status = task[:completed] ? "[X]" : "[ ]"
                puts "#{task[:id]}. #{status} #{task[:description]}"
            end
        end
    end
end

cli = CLI.new`
      },
      {
        title: 'File Processing',
        code: `def process_file(filename)
    begin
        File.open(filename, 'r') do |file|
            file.each_line.with_index do |line, index|
                processed_line = line.strip.upcase
                puts "Line #{index + 1}: #{processed_line}"
            end
        end
    rescue Errno::ENOENT
        puts "File not found: #{filename}"
    rescue => e
        puts "Error processing file: #{e.message}"
    end
end`
      }
    ]
  };

  const filteredApis = apis.filter(api => 
    api.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    api.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContent = () => {
    switch(currentSection) {
      case 'chat':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Chat with Bolt AI
            </h2>
            <div className="bg-gray-800 rounded-lg p-4">
              <div className="h-[500px] overflow-y-auto mb-4 space-y-4">
                {chatMessages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.role === 'user'
                          ? 'bg-purple-600'
                          : 'bg-gray-700'
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
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
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
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask Bolt anything about coding..."
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
        );
      case 'skills':
        return (
          <div className="p-8">
            <h2 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Skills & Expertise
            </h2>
            <div className="space-y-6">
              {skills.map((skill, index) => {
                const Icon = skill.icon;
                const barColor = skill.percentage < 31 ? 'bg-red-600' : `bg-gradient-to-r ${skill.color}`;
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
                );
              })}
            </div>
          </div>
        );
      case 'source':
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
                      ? 'bg-purple-600 hover:bg-purple-700'
                      : 'bg-gray-800 hover:bg-gray-700'
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
        );
      case 'scripts':
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
        );
      case 'api':
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
        );
      case 'content':
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
                  <video
                    controls
                    className="w-full"
                    preload="metadata"
                  >
                    <source src={video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </motion.div>
              ))}
            </div>
          </div>
        );
      case 'guide':
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
                <p className="text-gray-300 mb-4">
                  To use any of our APIs, follow these simple steps:
                </p>
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
        );
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
                    <p className="text-gray-400">{product.price}</p>
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="mb-16 text-center">
              <div className="text-2xl font-bold mb-8">
                <Typewriter
                  options={{
                    strings: ['MENERIMA JASA APAPUN DENGAN CODING DAN EDITING ATAU DESAIN'],
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
                <a
                  href="https://plankton4you.vercel.app/"
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Website 2
                </a>
                <a
                  href="https://chat.whatsapp.com/BwsDyzx9rHg7tImj1hv1bw"
                  className="block p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Marga PlankDev
                </a>
              </div>
            </section>
          </>
        );
    }
  };

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
        initial={{ x: '100%' }}
        animate={{ x: isSidebarOpen ? 0 : '100%' }}
        transition={{ type: 'spring', stiffness: 100 }}
        className="fixed top-0 right-0 h-full w-64 bg-gray-900 p-4 shadow-lg z-50"
      >
        <div className="flex justify-end">
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="p-2 hover:bg-gray-800 rounded-lg"
          >
            <X />
          </button>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => {
                  setCurrentSection('home');
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Home
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection('skills');
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Skills
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection('source');
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Source Code
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection('scripts');
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Script Bot
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection('api');
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                API
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection('content');
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Content
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection('guide');
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                API Guide
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setCurrentSection('chat');
                  setIsSidebarOpen(false);
                }}
                className="w-full text-left p-2 hover:bg-gray-800 rounded-lg"
              >
                Chat with AI PlankDev
              </button>
            </li>
          </ul>
        </nav>
      </motion.div>

      <main className="container mx-auto px-4 py-16">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;
