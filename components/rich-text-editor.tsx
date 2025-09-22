"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Bold, 
  Italic, 
  List, 
  ListOrdered, 
  Quote, 
  Heading1, 
  Heading2, 
  Eye,
  Type,
  Code
} from 'lucide-react'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function RichTextEditor({ value, onChange, placeholder = "Start writing your blog post...", className = "" }: RichTextEditorProps) {
  const [showPreview, setShowPreview] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const insertText = (before: string, after: string = '') => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const selectedText = value.substring(start, end)
    const newText = value.substring(0, start) + before + selectedText + after + value.substring(end)
    
    onChange(newText)
    
    // Focus back to textarea and set cursor position
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length)
    }, 0)
  }

  const insertAtCursor = (text: string) => {
    const textarea = textareaRef.current
    if (!textarea) return

    const start = textarea.selectionStart
    const end = textarea.selectionEnd
    const newText = value.substring(0, start) + text + value.substring(end)
    
    onChange(newText)
    
    // Focus back to textarea
    setTimeout(() => {
      textarea.focus()
      textarea.setSelectionRange(start + text.length, start + text.length)
    }, 0)
  }

  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map(paragraph => paragraph.trim())
      .filter(paragraph => paragraph.length > 0)
      .map(paragraph => {
        // Check if paragraph looks like a heading
        const isHeading = paragraph.length < 100 && (
          paragraph.endsWith(':') || 
          paragraph.match(/^\d+\./) || 
          paragraph.match(/^[A-Z][^.!?]*$/) ||
          paragraph.match(/^(Introduction|Overview|Background|Conclusion|Summary|Key Points|Benefits|Challenges|Results|Impact|Next Steps|Call to Action)/i)
        )
        
        if (isHeading) {
          return `<h3 class="text-2xl font-bold text-foreground mb-4 mt-8 first:mt-0">${paragraph}</h3>`
        }
        
        // Check if paragraph looks like a subheading
        const isSubHeading = paragraph.length < 150 && (
          paragraph.match(/^[A-Z][^.!?]*:$/) ||
          paragraph.match(/^(What|How|Why|When|Where|Who|The|Our|This|These|That|Those)/i) && paragraph.length < 100
        )
        
        if (isSubHeading) {
          return `<h4 class="text-xl font-semibold text-foreground mb-3 mt-6">${paragraph}</h4>`
        }
        
        // Check if paragraph looks like a list
        const isList = paragraph.includes('\n-') || paragraph.includes('\n•') || paragraph.match(/^\d+\./)
        
        if (isList) {
          const listItems = paragraph.split('\n').filter(item => item.trim().length > 0)
          const listType = paragraph.match(/^\d+\./) ? 'ol' : 'ul'
          const listClass = listType === 'ol' ? 'list-decimal list-inside' : 'list-disc list-inside'
          
          const items = listItems.map(item => {
            const cleanItem = item.replace(/^[-•\d+\.]\s*/, '').trim()
            return `<li class="text-muted-foreground leading-relaxed mb-2">${cleanItem}</li>`
          }).join('')
          
          return `<${listType} class="${listClass} text-muted-foreground leading-relaxed mb-4 space-y-2">${items}</${listType}>`
        }
        
        // Check if paragraph looks like a quote
        const isQuote = paragraph.startsWith('"') && paragraph.endsWith('"') && paragraph.length > 50
        
        if (isQuote) {
          return `<blockquote class="border-l-4 border-primary pl-6 py-4 my-6 bg-primary/5 italic text-lg text-foreground">${paragraph.slice(1, -1)}</blockquote>`
        }
        
        // Check if paragraph contains emphasis
        let formattedParagraph = paragraph
          .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-foreground">$1</strong>')
          .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
          .replace(/`(.*?)`/g, '<code class="bg-secondary px-2 py-1 rounded text-sm font-mono">$1</code>')
        
        // Regular paragraph
        return `<p class="text-muted-foreground leading-relaxed mb-4">${formattedParagraph.replace(/\n/g, '<br>')}</p>`
      })
      .join('')
  }

  const toolbarButtons = [
    {
      icon: Heading1,
      label: 'Main Heading',
      action: () => insertAtCursor('Main Heading:\n\n')
    },
    {
      icon: Heading2,
      label: 'Subheading',
      action: () => insertAtCursor('Subheading:\n\n')
    },
    {
      icon: Bold,
      label: 'Bold',
      action: () => insertText('**', '**')
    },
    {
      icon: Italic,
      label: 'Italic',
      action: () => insertText('*', '*')
    },
    {
      icon: List,
      label: 'Bullet List',
      action: () => insertAtCursor('- First item\n- Second item\n- Third item\n\n')
    },
    {
      icon: ListOrdered,
      label: 'Numbered List',
      action: () => insertAtCursor('1. First item\n2. Second item\n3. Third item\n\n')
    },
    {
      icon: Quote,
      label: 'Quote',
      action: () => insertAtCursor('"This is an important quote that will stand out."\n\n')
    },
    {
      icon: Code,
      label: 'Code',
      action: () => insertText('`', '`')
    }
  ]

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            {toolbarButtons.map((button, index) => (
              <Button
                key={index}
                type="button"
                variant="outline"
                size="sm"
                onClick={button.action}
                className="flex items-center gap-1"
                title={button.label}
              >
                <button.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{button.label}</span>
              </Button>
            ))}
            
            <div className="ml-auto">
              <Button
                type="button"
                variant={showPreview ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-1"
              >
                <Eye className="h-4 w-4" />
                <span className="hidden sm:inline">{showPreview ? 'Edit' : 'Preview'}</span>
              </Button>
            </div>
          </div>
          
          {/* Help Text */}
          <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded">
            <p className="font-medium mb-1">Quick Formatting Guide:</p>
            <ul className="space-y-1 text-xs">
              <li>• <strong>Headings:</strong> Type "Heading:" at the start of a line</li>
              <li>• <strong>Bold:</strong> Select text and click Bold, or type **text**</li>
              <li>• <strong>Lists:</strong> Use the list buttons or type - for bullets, 1. for numbers</li>
              <li>• <strong>Quotes:</strong> Wrap text in quotes "like this"</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      {/* Editor/Preview */}
      <Card>
        <CardContent className="p-0">
          {showPreview ? (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Eye className="h-4 w-4" />
                Preview
              </div>
              <div 
                className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-a:text-primary prose-strong:text-foreground prose-ul:text-muted-foreground prose-ol:text-muted-foreground prose-li:text-muted-foreground prose-h3:text-2xl prose-h3:font-bold prose-h3:text-foreground prose-h3:mb-4 prose-h3:mt-8 prose-h4:text-xl prose-h4:font-semibold prose-h4:text-foreground prose-h4:mb-3 prose-h4:mt-6 prose-p:leading-relaxed prose-p:mb-4 prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-6 prose-blockquote:bg-primary/5 prose-blockquote:italic prose-blockquote:text-lg prose-blockquote:text-foreground prose-code:bg-secondary prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm prose-code:font-mono"
                dangerouslySetInnerHTML={{ 
                  __html: value ? formatContent(value) : '<p class="text-muted-foreground italic">No content to preview</p>'
                }}
              />
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
                <Type className="h-4 w-4" />
                Editor
              </div>
              <textarea
                ref={textareaRef}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full min-h-[400px] p-4 border border-input rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                style={{ fontFamily: 'monospace' }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
