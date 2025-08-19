"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Code, BookOpen, Target } from "lucide-react"

interface Slide {
  type?: "intro" | "theory" | "code" | "exercise" | "content"
  title: string
  subtitle?: string
  description?: string
  content?: string[] | React.ReactNode
  code?: string
  id?: number
}

interface SlideViewerProps {
  slides: Slide[]
  moduleTitle?: string
  weekNumber?: number
}

export { SlideViewer }
export default function SlideViewer({ slides, moduleTitle, weekNumber }: SlideViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  const getSlideIcon = (type: string) => {
    switch (type) {
      case "intro":
        return <Play className="h-4 w-4" />
      case "theory":
        return <BookOpen className="h-4 w-4" />
      case "code":
        return <Code className="h-4 w-4" />
      case "exercise":
        return <Target className="h-4 w-4" />
      case "content":
        return <BookOpen className="h-4 w-4" />
      default:
        return <BookOpen className="h-4 w-4" />
    }
  }

  const getSlideColor = (type: string) => {
    switch (type) {
      case "intro":
        return "bg-blue-500"
      case "theory":
        return "bg-green-500"
      case "code":
        return "bg-purple-500"
      case "exercise":
        return "bg-orange-500"
      case "content":
        return "bg-teal-500"
      default:
        return "bg-gray-500"
    }
  }

  const renderSlideContent = (slide: Slide) => {
    // If content is React.ReactNode, render it directly
    if ((slide.content && typeof slide.content !== "object") || Array.isArray(slide.content)) {
      // Handle array content (old format)
      if (Array.isArray(slide.content)) {
        if (slide.type === "theory") {
          return (
            <div className="space-y-4">
              <ul className="space-y-3">
                {slide.content.map((item, i) => (
                  <li key={i} className="text-lg flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )
        }

        if (slide.type === "exercise") {
          return (
            <div className="space-y-4">
              <div className="bg-orange-50 dark:bg-orange-900/20 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                <ul className="space-y-3">
                  {slide.content.map((item, i) => (
                    <li key={i} className="text-lg flex items-start gap-2">
                      <span className="text-orange-500 mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )
        }
      }
    } else if (slide.content) {
      // Handle React.ReactNode content (new format)
      return <div className="space-y-4">{slide.content}</div>
    }

    // Handle intro type
    if (slide.type === "intro") {
      return (
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-blue-600">{slide.title}</h2>
          {slide.subtitle && <p className="text-xl text-muted-foreground">{slide.subtitle}</p>}
          {slide.description && <p className="text-lg text-muted-foreground">{slide.description}</p>}
        </div>
      )
    }

    // Handle code type
    if (slide.type === "code" && slide.code) {
      return (
        <div className="space-y-4">
          <pre className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg overflow-x-auto border">
            <code className="text-sm font-mono">{slide.code}</code>
          </pre>
        </div>
      )
    }

    return null
  }

  const currentSlideData = slides[currentSlide]

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          {moduleTitle && <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">{moduleTitle}</h2>}
          {weekNumber && <p className="text-gray-600 dark:text-gray-400">Semana {weekNumber}</p>}
        </div>
        <Badge variant="outline" className="text-sm">
          Diapositiva {currentSlide + 1} de {slides.length}
        </Badge>
      </div>

      {/* Slide Content */}
      <Card className="min-h-[500px] shadow-lg">
        <CardHeader className={`${getSlideColor(currentSlideData.type || "content")} text-white`}>
          <CardTitle className="flex items-center gap-2">
            {getSlideIcon(currentSlideData.type || "content")}
            {currentSlideData.title}
          </CardTitle>
          {currentSlideData.subtitle && <p className="text-white/90 text-sm mt-2">{currentSlideData.subtitle}</p>}
        </CardHeader>
        <CardContent className="p-8">{renderSlideContent(currentSlideData)}</CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-6">
        <Button
          onClick={prevSlide}
          disabled={currentSlide === 0}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          <ChevronLeft className="h-4 w-4" />
          Anterior
        </Button>

        {/* Slide Indicators */}
        <div className="flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          disabled={currentSlide === slides.length - 1}
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
        >
          Siguiente
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
