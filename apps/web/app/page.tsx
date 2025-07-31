"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Play, Users, Video, Zap, Globe, Shield } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [streamCode, setStreamCode] = useState("");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0iIzhCNUNGNiIgZmlsbC1vcGFjaXR5PSIwLjEiLz4KPC9zdmc+')] opacity-20"></div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
              <Video className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold text-white">FermWatch</span>
          </div>
          <div className="hidden md:flex items-center space-x-6 text-gray-300">
            <a href="#features" className="hover:text-white transition-colors">
              Features
            </a>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-300 hover:bg-purple-500 hover:text-white"
            >
              Sign In
            </Button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative z-10 container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Stream Your
            <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              {" "}
              Passion
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with your audience through high-quality streaming. Share
            your world, build your community, and create unforgettable moments
            together.
          </p>
        </div>

        {/* Action Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Start Streaming Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                Start Streaming
              </CardTitle>
              <CardDescription className="text-gray-300">
                Go live instantly and share your content with the world
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Link href="/stream?mode=create">
                <Button
                  size="lg"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Zap className="w-5 h-5 mr-2" />
                  Start Stream
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Join/Watch Stream Card */}
          <Card className="bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/15 transition-all duration-300 group">
            <CardHeader className="text-center pb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-8 h-8 text-white" />
              </div>
              <CardTitle className="text-2xl text-white mb-2">
                Join Stream
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enter a stream code to join or discover live content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                placeholder="Enter stream code"
                value={streamCode}
                onChange={(e: any) => setStreamCode(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-green-400"
              />
              <div className="grid grid-cols-2 gap-3">
                <Link href={`/stream?mode=join&code=${streamCode}`}>
                  <Button
                    variant="outline"
                    className="w-full border-green-400 text-green-300 hover:bg-green-500 hover:text-white hover:border-green-500 transition-all duration-300"
                    disabled={!streamCode.trim()}
                  >
                    Join Stream
                  </Button>
                </Link>
                <Link href="/stream?mode=watch">
                  <Button
                    variant="outline"
                    className="w-full border-blue-400 text-blue-300 hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-all duration-300"
                  >
                    Browse Live
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        className="relative z-10 container mx-auto px-4 py-20"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            Why Choose FermWatch?
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Built for creators, by creators. Experience streaming like never
            before.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-300">
              Ultra-low latency streaming with crystal clear quality for the
              best viewing experience.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Globe className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Global Reach
            </h3>
            <p className="text-gray-300">
              Stream to audiences worldwide with our global CDN infrastructure
              and optimized delivery.
            </p>
          </div>

          <div className="text-center group">
            <div className="w-20 h-20 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">
              Secure & Private
            </h3>
            <p className="text-gray-300">
              Your content is protected with end-to-end encryption and advanced
              privacy controls.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 mt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
                <Video className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-semibold">FermWatch</span>
            </div>
            <p className="text-gray-400 text-sm">
              © 2025 FermWatch. Built for creators.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
