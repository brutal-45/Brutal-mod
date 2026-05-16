'use client'

import { useState } from 'react' 
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  Download, 
  Volume2, 
  Zap, 
  Shield, 
  Cpu, 
  HardDrive,
  Play,
  Mic,
  Keyboard,
  Monitor,
  CheckCircle2,
  ArrowRight,
  Github,
  Star,
  Flame,
  Gamepad2,
  Crown,
  Sparkles,
  Wand2,
  Headphones,
  Music,
  Settings,
  ExternalLink,
  Heart,
  Terminal,
  Layers,
  Zap as Lightning,
  FileCode
} from 'lucide-react'

export default function Home() {
  const [isDownloading, setIsDownloading] = useState(false)

  const handleDownload = async () => {
    setIsDownloading(true)
    try {
      const response = await fetch('/api/download')
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'BrutalMod-v1.0.zip'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error('Download failed:', error)
    } finally {
      setIsDownloading(false)
    }
  }

  const features = [
    {
      icon: <Mic className="w-6 h-6" />,
      title: "Play Through Mic",
      description: "Route audio directly to your microphone input for seamless voice chat integration",
      color: "from-red-500 to-orange-500"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Ultra Lightweight",
      description: "Only ~50MB for EXE, runs smoothly on any PC with minimal resources",
      color: "from-orange-500 to-yellow-500"
    },
    {
      icon: <Keyboard className="w-6 h-6" />,
      title: "Global Hotkeys",
      description: "Assign keyboard shortcuts to play sounds instantly from any application",
      color: "from-yellow-500 to-green-500"
    },
    {
      icon: <Volume2 className="w-6 h-6" />,
      title: "Volume Control",
      description: "Individual volume sliders for each sound with master volume control",
      color: "from-green-500 to-teal-500"
    },
    {
      icon: <Wand2 className="w-6 h-6" />,
      title: "Beautiful UI",
      description: "Modern glassmorphism design with smooth animations and dark gaming aesthetic",
      color: "from-teal-500 to-blue-500"
    },
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Windows EXE",
      description: "Standalone Windows application with native controls and global hotkeys",
      color: "from-blue-500 to-purple-500"
    }
  ]

  const systemRequirements = [
    { icon: <Cpu className="w-5 h-5" />, label: "CPU", value: "Any processor" },
    { icon: <HardDrive className="w-5 h-5" />, label: "Storage", value: "~50 MB" },
    { icon: <Shield className="w-5 h-5" />, label: "RAM", value: "~50 MB" },
    { icon: <Play className="w-5 h-5" />, label: "OS", value: "Windows 7+" }
  ]

  const howItWorks = [
    {
      step: 1,
      title: "Download & Install",
      description: "Get the EXE file and run the installer",
      icon: <Download className="w-5 h-5" />
    },
    {
      step: 2,
      title: "Add Your Sounds",
      description: "Drag audio files or use the Add Sound button",
      icon: <Music className="w-5 h-5" />
    },
    {
      step: 3,
      title: "Configure VB-Cable",
      description: "Install free virtual audio cable for mic output",
      icon: <Settings className="w-5 h-5" />
    },
    {
      step: 4,
      title: "Dominate Voice Chats",
      description: "Play sounds with hotkeys and rule the chat!",
      icon: <Flame className="w-5 h-5" />
    }
  ]

  const techStack = [
    { name: "Electron", desc: "Desktop App", icon: <Layers className="w-4 h-4" /> },
    { name: "Web Audio API", desc: "Sound Engine", icon: <Headphones className="w-4 h-4" /> },
    { name: "VB-Cable", desc: "Audio Routing", icon: <Terminal className="w-4 h-4" /> },
    { name: "LocalStorage", desc: "Save Config", icon: <HardDrive className="w-4 h-4" /> }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/30 via-black to-black" />
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-red-600/10 rounded-full blur-[200px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[180px] animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-yellow-600/5 rounded-full blur-[150px] animate-pulse" style={{ animationDelay: '2s' }} />
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }} />
        
        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-red-500/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-black/80 border-b border-red-900/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <img 
                  src="/brutalmod-logo.png" 
                  alt="BrutalMod Logo"
                  className="w-12 h-12 rounded-xl shadow-lg shadow-red-500/20 group-hover:shadow-red-500/40 transition-all duration-300"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center animate-pulse">
                  <Flame className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight">
                  <span className="text-white">BRUTAL</span>
                  <span className="text-red-500">MOD</span>
                </h1>
                <p className="text-xs text-red-500/80 font-medium tracking-widest uppercase">Professional Soundboard</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-zinc-400 hover:text-red-500 transition-colors font-medium">Features</a>
              <a href="#how-it-works" className="text-sm text-zinc-400 hover:text-red-500 transition-colors font-medium">How It Works</a>
              <a href="#docs" className="text-sm text-zinc-400 hover:text-red-500 transition-colors font-medium">Docs</a>
              <a 
                href="https://github.com/brutal-45/Brutal-mod" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-zinc-400 hover:text-white transition-colors font-medium flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <Button 
                onClick={handleDownload}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold shadow-lg shadow-red-600/30 hover:shadow-red-600/50 transition-all hover:scale-105"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="container mx-auto px-4 py-20 md:py-32">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Left content */}
              <div className="space-y-10">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-600/30 backdrop-blur-sm">
                  <Sparkles className="w-4 h-4 text-red-500" />
                  <span className="text-sm text-red-400 font-bold tracking-wide">VERSION 1.0 RELEASED</span>
                  <Crown className="w-4 h-4 text-yellow-500" />
                </div>
                
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight">
                  <span className="text-white">THE ULTIMATE</span>
                  <br />
                  <span className="bg-gradient-to-r from-red-500 via-orange-400 to-yellow-500 bg-clip-text text-transparent animate-gradient">
                    SOUNDBOARD
                  </span>
                </h1>
                
                <p className="text-xl text-zinc-300 max-w-xl leading-relaxed">
                  A professional soundboard for <span className="text-red-400 font-semibold">gamers</span>, 
                  <span className="text-orange-400 font-semibold"> streamers</span>, and 
                  <span className="text-yellow-400 font-semibold"> creators</span>. Drop epic sounds directly into your microphone.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button 
                    size="lg"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-black text-lg shadow-2xl shadow-red-600/40 px-12 py-8 transition-all hover:scale-105 border border-red-500/50 group"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-6 h-6 mr-2 group-hover:animate-bounce" />
                        DOWNLOAD FOR WINDOWS
                      </>
                    )}
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-zinc-700 text-zinc-300 hover:bg-zinc-900 hover:border-red-600/50 px-10 py-8 font-bold"
                  >
                    <a href="https://github.com/brutal-45/Brutal-mod" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      View Source
                      <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>
                
                <div className="flex flex-wrap items-center gap-6 pt-4">
                  {[
                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "100% Free & Open Source" },
                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "Windows 7, 8, 10, 11" },
                    { icon: <CheckCircle2 className="w-4 h-4" />, text: "Global Hotkeys" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm">
                      <span className="text-green-500">{item.icon}</span>
                      <span className="text-zinc-400">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Right - App Preview */}
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-red-900/40 border border-red-900/30 group">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
                  <img 
                    src="/brutalmod-hero.png" 
                    alt="BrutalMod Interface"
                    className="w-full h-auto transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating badges */}
                  <div className="absolute -bottom-4 -left-4 bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-5 border border-red-900/50 shadow-2xl z-20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-600/20 to-orange-600/20 flex items-center justify-center border border-red-600/30">
                        <HardDrive className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide">Size</p>
                        <p className="text-2xl font-bold text-white">~50 MB</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -top-4 -right-4 bg-zinc-900/95 backdrop-blur-xl rounded-2xl p-5 border border-orange-900/50 shadow-2xl z-20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-600/20 to-yellow-600/20 flex items-center justify-center border border-orange-600/30">
                        <Cpu className="w-6 h-6 text-orange-500" />
                      </div>
                      <div>
                        <p className="text-xs text-zinc-500 uppercase tracking-wide">RAM</p>
                        <p className="text-2xl font-bold text-white">~50 MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-1/2 -translate-y-1/2 -right-6 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl px-4 py-2 shadow-xl z-20 transform rotate-12">
                    <span className="text-sm font-bold text-white flex items-center gap-1">
                      <Sparkles className="w-4 h-4" /> GLASS UI
                    </span>
                  </div>
                </div>

                {/* Glow effect */}
                <div className="absolute -inset-8 bg-gradient-to-r from-red-600/20 via-orange-600/20 to-yellow-600/20 rounded-[40px] blur-3xl -z-10 animate-pulse" />
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack Bar */}
        <section className="border-y border-red-900/20 bg-zinc-950/80 backdrop-blur-sm py-6">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16">
              {techStack.map((tech, index) => (
                <div key={index} className="flex items-center gap-3 text-zinc-400 hover:text-white transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-red-900/30 flex items-center justify-center text-red-500 group-hover:bg-red-600 group-hover:text-white transition-all">
                    {tech.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{tech.name}</p>
                    <p className="text-xs text-zinc-600">{tech.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-32">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 border-red-600/50 text-red-500 bg-red-600/10 px-4 py-1">
                <Gamepad2 className="w-4 h-4 mr-2" />
                POWERFUL FEATURES
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                BUILT FOR
                <span className="block bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">GAMERS</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-xl">
                Beautiful glassmorphism UI, smooth animations, and everything you need to dominate voice chats.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card 
                  key={index}
                  className="bg-zinc-900/50 border-red-900/20 hover:border-red-600/50 transition-all duration-500 hover:shadow-2xl hover:shadow-red-600/20 group backdrop-blur-sm hover:-translate-y-2"
                >
                  <CardContent className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} bg-opacity-10 border border-red-600/20 flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-all duration-300 shadow-lg`}>
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-32 bg-gradient-to-b from-zinc-950/80 to-black border-y border-red-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 border-orange-600/50 text-orange-500 bg-orange-600/10 px-4 py-1">
                <Lightning className="w-4 h-4 mr-2" />
                QUICK START
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                GET STARTED IN
                <span className="text-orange-500"> 4 STEPS</span>
              </h2>
              <p className="text-zinc-400 max-w-xl mx-auto text-lg">
                Setup is fast and simple. You&apos;ll be playing sounds in minutes.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <div key={index} className="relative group">
                  <div className="bg-zinc-900/80 border border-red-900/20 rounded-3xl p-8 h-full hover:border-orange-500/50 transition-all duration-500 backdrop-blur-sm hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-600/10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600 to-orange-600 flex items-center justify-center text-white font-black text-xl mb-6 shadow-lg shadow-red-600/30 group-hover:scale-110 transition-transform">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                    <p className="text-zinc-400 leading-relaxed">{item.description}</p>
                  </div>
                  {index < 3 && (
                    <ArrowRight className="hidden lg:block absolute top-1/2 -right-4 w-8 h-8 text-red-600/50" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Build From Source Section */}
        <section className="py-32 bg-zinc-950/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-6 border-purple-600/50 text-purple-500 bg-purple-600/10 px-4 py-1">
                <FileCode className="w-4 h-4 mr-2" />
                OPEN SOURCE
              </Badge>
              <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight">
                BUILD FROM
                <span className="text-purple-500"> SOURCE</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                Clone the repository and build your own version. It&apos;s open source and free!
              </p>
            </div>
            
            <div className="max-w-3xl mx-auto">
              <Card className="bg-zinc-900/80 border-zinc-800 backdrop-blur-sm">
                <CardContent className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-purple-600/20 flex items-center justify-center">
                      <Terminal className="w-5 h-5 text-purple-500" />
                    </div>
                    <h3 className="text-lg font-bold text-white">Quick Build Commands</h3>
                  </div>
                  
                  <div className="space-y-4 font-mono text-sm">
                    <div className="bg-black/50 rounded-lg p-4 border border-zinc-800">
                      <p className="text-zinc-500 mb-1"># Clone the repository</p>
                      <p className="text-green-400">git clone https://github.com/brutal-45/Brutal-mod.git</p>
                    </div>
                    <div className="bg-black/50 rounded-lg p-4 border border-zinc-800">
                      <p className="text-zinc-500 mb-1"># Navigate to project</p>
                      <p className="text-green-400">cd Brutal-mod/public/soundboard</p>
                    </div>
                    <div className="bg-black/50 rounded-lg p-4 border border-zinc-800">
                      <p className="text-zinc-500 mb-1"># Install dependencies & build</p>
                      <p className="text-green-400">npm install && npm run build:win</p>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex items-center gap-4">
                    <Button asChild className="bg-purple-600 hover:bg-purple-700">
                      <a href="https://github.com/brutal-45/Brutal-mod" target="_blank" rel="noopener noreferrer">
                        <Github className="w-4 h-4 mr-2" />
                        View Repository
                      </a>
                    </Button>
                    <Button variant="outline" asChild className="border-zinc-700 text-zinc-400 hover:text-white">
                      <a href="https://github.com/brutal-45/Brutal-mod/stargazers" target="_blank" rel="noopener noreferrer">
                        <Star className="w-4 h-4 mr-2" />
                        Star Project
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Documentation Section */}
        <section id="docs" className="py-32 bg-zinc-950/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 border-cyan-600/50 text-cyan-500 bg-cyan-600/10 px-4 py-1">
                <FileCode className="w-4 h-4 mr-2" />
                DOCUMENTATION
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                COMPLETE
                <span className="text-cyan-500"> GUIDE</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-xl">
                Everything you need to know about using BrutalMod. From installation to advanced features.
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Installation Guide */}
              <Card className="bg-zinc-900/80 border-zinc-800 hover:border-cyan-600/50 transition-all duration-500 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-600/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-600/30 flex items-center justify-center mb-6 text-cyan-500 group-hover:scale-110 transition-transform">
                    <Download className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Installation Guide</h3>
                  <p className="text-zinc-400 mb-6">Step-by-step instructions to download, install, and set up BrutalMod on your Windows PC.</p>
                  <Button asChild variant="outline" className="border-cyan-600/50 text-cyan-500 hover:bg-cyan-600/10">
                    <a href="https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/GUIDE.md#installation" target="_blank" rel="noopener noreferrer">
                      Read Guide <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Hotkeys Setup */}
              <Card className="bg-zinc-900/80 border-zinc-800 hover:border-orange-600/50 transition-all duration-500 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-xl hover:shadow-orange-600/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-orange-600/20 to-yellow-600/20 border border-orange-600/30 flex items-center justify-center mb-6 text-orange-500 group-hover:scale-110 transition-transform">
                    <Keyboard className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Hotkeys Setup</h3>
                  <p className="text-zinc-400 mb-6">Learn how to assign and manage global hotkeys to play sounds instantly from any app.</p>
                  <Button asChild variant="outline" className="border-orange-600/50 text-orange-500 hover:bg-orange-600/10">
                    <a href="https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/GUIDE.md#setting-up-hotkeys" target="_blank" rel="noopener noreferrer">
                      Read Guide <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Mic Output Setup */}
              <Card className="bg-zinc-900/80 border-zinc-800 hover:border-red-600/50 transition-all duration-500 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-xl hover:shadow-red-600/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-red-600/20 to-pink-600/20 border border-red-600/30 flex items-center justify-center mb-6 text-red-500 group-hover:scale-110 transition-transform">
                    <Mic className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Mic Output Setup</h3>
                  <p className="text-zinc-400 mb-6">Configure VB-Cable to play sounds through your microphone in Discord, games, and more.</p>
                  <Button asChild variant="outline" className="border-red-600/50 text-red-500 hover:bg-red-600/10">
                    <a href="https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/GUIDE.md#microphone-output-setup" target="_blank" rel="noopener noreferrer">
                      Read Guide <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Managing Sounds */}
              <Card className="bg-zinc-900/80 border-zinc-800 hover:border-green-600/50 transition-all duration-500 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-xl hover:shadow-green-600/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-600/20 to-teal-600/20 border border-green-600/30 flex items-center justify-center mb-6 text-green-500 group-hover:scale-110 transition-transform">
                    <Music className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Managing Sounds</h3>
                  <p className="text-zinc-400 mb-6">Add, organize, categorize, and manage your sound library like a pro.</p>
                  <Button asChild variant="outline" className="border-green-600/50 text-green-500 hover:bg-green-600/10">
                    <a href="https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/GUIDE.md#adding-sounds" target="_blank" rel="noopener noreferrer">
                      Read Guide <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              {/* Troubleshooting */}
              <Card className="bg-zinc-900/80 border-zinc-800 hover:border-purple-600/50 transition-all duration-500 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-xl hover:shadow-purple-600/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-600/20 to-violet-600/20 border border-purple-600/30 flex items-center justify-center mb-6 text-purple-500 group-hover:scale-110 transition-transform">
                    <Settings className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Troubleshooting</h3>
                  <p className="text-zinc-400 mb-6">Fix common issues with sounds, hotkeys, microphone output, and more.</p>
                  <Button asChild variant="outline" className="border-purple-600/50 text-purple-500 hover:bg-purple-600/10">
                    <a href="https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/GUIDE.md#troubleshooting" target="_blank" rel="noopener noreferrer">
                      Read Guide <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
              
              {/* FAQ */}
              <Card className="bg-zinc-900/80 border-zinc-800 hover:border-yellow-600/50 transition-all duration-500 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-xl hover:shadow-yellow-600/10">
                <CardContent className="p-8">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-yellow-600/20 to-amber-600/20 border border-yellow-600/30 flex items-center justify-center mb-6 text-yellow-500 group-hover:scale-110 transition-transform">
                    <Sparkles className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">FAQ</h3>
                  <p className="text-zinc-400 mb-6">Frequently asked questions about BrutalMod features, safety, and compatibility.</p>
                  <Button asChild variant="outline" className="border-yellow-600/50 text-yellow-500 hover:bg-yellow-600/10">
                    <a href="https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/GUIDE.md#faq" target="_blank" rel="noopener noreferrer">
                      Read FAQ <ExternalLink className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </div>
            
            {/* Full Guide Button */}
            <div className="text-center mt-12">
              <Button asChild size="lg" className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-bold px-10 py-6 shadow-lg shadow-cyan-600/30">
                <a href="https://github.com/brutal-45/Brutal-mod/blob/main/public/soundboard/GUIDE.md" target="_blank" rel="noopener noreferrer">
                  <FileCode className="w-5 h-5 mr-2" />
                  Read Complete Guide (A-Z)
                  <ExternalLink className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* System Requirements */}
        <section id="requirements" className="py-32 bg-gradient-to-b from-black to-zinc-950 border-y border-red-900/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-6 border-red-600/50 text-red-500 bg-red-600/10 px-4 py-1">
                <Cpu className="w-4 h-4 mr-2" />
                REQUIREMENTS
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black mb-6 tracking-tight">
                RUNS ON
                <span className="text-red-500"> ANYTHING</span>
              </h2>
              <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
                If your PC runs Windows, it can run BrutalMod. That&apos;s how lightweight it is.
              </p>
            </div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {systemRequirements.map((req, index) => (
                <Card 
                  key={index}
                  className="bg-zinc-900/50 border-red-900/20 text-center hover:border-red-600/50 transition-all duration-300 backdrop-blur-sm group hover:-translate-y-2 hover:shadow-xl hover:shadow-red-600/10"
                >
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600/20 to-orange-600/20 border border-red-600/20 flex items-center justify-center mx-auto mb-6 text-red-500 group-hover:scale-110 transition-transform">
                      {req.icon}
                    </div>
                    <p className="text-sm text-zinc-500 mb-2 uppercase tracking-wide">{req.label}</p>
                    <p className="text-2xl font-bold text-white">{req.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32">
          <div className="container mx-auto px-4">
            <div className="relative overflow-hidden rounded-[40px] bg-gradient-to-br from-red-950 via-red-900/80 to-zinc-900 p-16 text-center border border-red-600/30">
              {/* Decorative elements */}
              <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/20 rounded-full blur-[150px]" />
              <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[150px]" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-[200px]" />
              
              <div className="relative z-10">
                <img 
                  src="/brutalmod-logo.png" 
                  alt="BrutalMod Logo"
                  className="w-32 h-32 mx-auto mb-8 rounded-3xl shadow-2xl shadow-red-600/40"
                />
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight">
                  READY TO
                  <span className="block text-red-300">DOMINATE?</span>
                </h2>
                <p className="text-white/70 max-w-2xl mx-auto mb-10 text-xl">
                  Download BrutalMod now and start dropping epic sounds in Discord, games, and any voice app.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    size="lg"
                    onClick={handleDownload}
                    disabled={isDownloading}
                    className="bg-white text-red-600 hover:bg-zinc-100 font-black text-xl px-16 py-8 shadow-2xl hover:scale-105 transition-all rounded-xl"
                  >
                    {isDownloading ? (
                      <>
                        <div className="w-6 h-6 border-2 border-red-600/30 border-t-red-600 rounded-full animate-spin mr-2" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <Download className="w-6 h-6 mr-2" />
                        DOWNLOAD BRUTALMOD v1.0
                      </>
                    )}
                  </Button>
                  <Button 
                    size="lg"
                    variant="outline"
                    asChild
                    className="border-white/30 text-white hover:bg-white/10 py-8 px-10 font-bold rounded-xl"
                  >
                    <a href="https://github.com/brutal-45/Brutal-mod" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      Star on GitHub
                      <Star className="w-4 h-4 ml-2 text-yellow-500" />
                    </a>
                  </Button>
                </div>
                <p className="text-white/50 text-sm mt-8">
                  Windows 7, 8, 10, 11 • ~50 MB • 100% Free & Open Source
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-red-900/20 bg-zinc-950 mt-auto">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src="/brutalmod-logo.png" 
                alt="BrutalMod Logo"
                className="w-10 h-10 rounded-xl"
              />
              <div>
                <span className="text-white font-bold">BrutalMod</span>
                <p className="text-xs text-zinc-500">© 2024 All rights reserved</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-sm text-zinc-400">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>by</span>
              <a 
                href="https://github.com/brutal-45" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-red-500 hover:text-red-400 font-bold transition-colors"
              >
                brutal-45
              </a>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-zinc-500">
              <a 
                href="https://github.com/brutal-45/Brutal-mod" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
              <a 
                href="https://github.com/brutal-45/Brutal-mod/stargazers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-yellow-500 transition-colors flex items-center gap-1"
              >
                <Star className="w-4 h-4" />
                Star
              </a>
            </div>
          </div>
          
          {/* BRUTALTOOLS Banner */}
          <div className="mt-6 pt-6 border-t border-red-900/20 text-center">
            <p className="text-xs text-zinc-600 uppercase tracking-widest">
              🏴 <span className="text-red-500 font-bold">DEVELOPED UNDER BRUTALTOOLS</span> 🏴
            </p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); opacity: 0.3; }
          50% { transform: translateY(-20px); opacity: 0.6; }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  )
}
