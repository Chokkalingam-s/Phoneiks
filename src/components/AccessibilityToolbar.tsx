import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { 
  Accessibility, 
  Type, 
  Volume2, 
  VolumeX, 
  Contrast, 
  Languages,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from 'lucide-react';

interface AccessibilityToolbarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export function AccessibilityToolbar({ isOpen, onToggle }: AccessibilityToolbarProps) {
  const [settings, setSettings] = useState({
    fontSize: 100,
    highContrast: false,
    textToSpeech: false,
    language: 'en'
  });

  const adjustFontSize = (delta: number) => {
    const newSize = Math.max(75, Math.min(150, settings.fontSize + delta));
    setSettings(prev => ({ ...prev, fontSize: newSize }));
    document.documentElement.style.fontSize = `${newSize}%`;
  };

  const toggleHighContrast = () => {
    const newContrast = !settings.highContrast;
    setSettings(prev => ({ ...prev, highContrast: newContrast }));
    if (newContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  const toggleTextToSpeech = () => {
    setSettings(prev => ({ ...prev, textToSpeech: !prev.textToSpeech }));
    // In a real implementation, this would integrate with speech synthesis API
  };

  const resetSettings = () => {
    setSettings({
      fontSize: 100,
      highContrast: false,
      textToSpeech: false,
      language: 'en'
    });
    document.documentElement.style.fontSize = '100%';
    document.documentElement.classList.remove('high-contrast');
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Toggle Button */}
      <Button
        onClick={onToggle}
        className="mb-2 bg-[#F77F00] hover:bg-[#E67000] text-white rounded-full w-12 h-12 shadow-lg"
        aria-label="Toggle accessibility toolbar"
      >
        <Accessibility className="h-6 w-6" />
      </Button>

      {/* Toolbar Panel */}
      {isOpen && (
        <Card className="w-80 shadow-xl border-0">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg text-gray-900">Accessibility Options</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={resetSettings}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Reset all settings"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {/* Font Size Controls */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 flex items-center">
                  <Type className="h-4 w-4 mr-2" />
                  Font Size
                </label>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustFontSize(-10)}
                    disabled={settings.fontSize <= 75}
                    aria-label="Decrease font size"
                  >
                    <ZoomOut className="h-3 w-3" />
                  </Button>
                  <span className="text-sm text-gray-600 w-12 text-center">
                    {settings.fontSize}%
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => adjustFontSize(10)}
                    disabled={settings.fontSize >= 150}
                    aria-label="Increase font size"
                  >
                    <ZoomIn className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* High Contrast Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 flex items-center">
                  <Contrast className="h-4 w-4 mr-2" />
                  High Contrast
                </label>
                <Button
                  variant={settings.highContrast ? "default" : "outline"}
                  size="sm"
                  onClick={toggleHighContrast}
                  className={settings.highContrast ? "bg-[#F77F00] text-white" : ""}
                >
                  {settings.highContrast ? "On" : "Off"}
                </Button>
              </div>

              {/* Text to Speech Toggle */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 flex items-center">
                  {settings.textToSpeech ? (
                    <Volume2 className="h-4 w-4 mr-2" />
                  ) : (
                    <VolumeX className="h-4 w-4 mr-2" />
                  )}
                  Text to Speech
                </label>
                <Button
                  variant={settings.textToSpeech ? "default" : "outline"}
                  size="sm"
                  onClick={toggleTextToSpeech}
                  className={settings.textToSpeech ? "bg-[#F77F00] text-white" : ""}
                >
                  {settings.textToSpeech ? "On" : "Off"}
                </Button>
              </div>

              {/* Language Selection */}
              <div className="flex items-center justify-between">
                <label className="text-sm text-gray-700 flex items-center">
                  <Languages className="h-4 w-4 mr-2" />
                  Language
                </label>
                <select
                  value={settings.language}
                  onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
                  className="text-sm border border-gray-200 rounded px-2 py-1 focus:border-[#F77F00] focus:ring-1 focus:ring-[#F77F00]"
                >
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="bn">Bengali</option>
                  <option value="te">Telugu</option>
                  <option value="ta">Tamil</option>
                </select>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500 text-center">
                Press Alt + A to toggle this toolbar
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}