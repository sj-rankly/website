"use client"

import { useState } from "react"
import { 
  ColorPicker, 
  ColorPickerSelection, 
  ColorPickerHue, 
  ColorPickerAlpha, 
  ColorPickerEyeDropper, 
  ColorPickerOutput, 
  ColorPickerFormat 
} from "@/components/ui/color-picker"

export default function ColorPickerDemo() {
  const [selectedColor, setSelectedColor] = useState<string>('#3b82f6')

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Color Picker Demo</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Color Picker Component */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Interactive Color Picker</h2>
            <div className="border rounded-lg p-6 bg-card">
              <ColorPicker
                value={selectedColor}
                onChange={(color) => {
                  const [r, g, b, a] = color
                  setSelectedColor(`rgba(${r}, ${g}, ${b}, ${a})`)
                }}
                className="h-80"
              >
                <div className="space-y-4">
                  {/* Color Selection Area */}
                  <div className="h-48 w-full">
                    <ColorPickerSelection />
                  </div>
                  
                  {/* Hue Slider */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Hue</label>
                    <ColorPickerHue />
                  </div>
                  
                  {/* Alpha Slider */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Alpha</label>
                    <ColorPickerAlpha />
                  </div>
                  
                  {/* Eye Dropper and Output Format */}
                  <div className="flex items-center gap-2">
                    <ColorPickerEyeDropper />
                    <ColorPickerOutput />
                  </div>
                  
                  {/* Color Format Display */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Color Value</label>
                    <ColorPickerFormat />
                  </div>
                </div>
              </ColorPicker>
            </div>
          </div>
          
          {/* Preview and Information */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="border rounded-lg p-6 bg-card space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Selected Color</label>
                <div 
                  className="w-full h-16 rounded-lg border"
                  style={{ backgroundColor: selectedColor }}
                />
                <p className="text-sm text-muted-foreground font-mono">
                  {selectedColor}
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Usage Examples</label>
                <div className="space-y-2 text-sm">
                  <div className="p-2 bg-muted rounded">
                    <code className="text-xs">
                      &lt;div style=&#123;&#123;backgroundColor: '{selectedColor}'&#125;&#125; /&gt;
                    </code>
                  </div>
                  <div className="p-2 bg-muted rounded">
                    <code className="text-xs">
                      background-color: {selectedColor};
                    </code>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border rounded-lg p-6 bg-card">
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Interactive color selection with mouse/touch</li>
                <li>• Hue slider for color wheel navigation</li>
                <li>• Alpha channel support for transparency</li>
                <li>• Eye dropper tool (browser support required)</li>
                <li>• Multiple output formats (HEX, RGB, HSL, CSS)</li>
                <li>• Real-time color preview</li>
                <li>• Accessible keyboard navigation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
