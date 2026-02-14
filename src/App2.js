import React, { useState } from 'react';
import { ChevronDown, Copy, Eye, Code, Zap } from 'lucide-react';

const ReactComponentBuilder = () => {
  const [framework, setFramework] = useState('tailwind');
  const [selectedComponent, setSelectedComponent] = useState('button');
  const [showPreview, setShowPreview] = useState(true);
  const [customization, setCustomization] = useState({
    size: 'md',
    variant: 'primary',
    disabled: false,
    text: 'Click me',
  });
  const [copied, setCopied] = useState(false);

  const components = {
    button: {
      name: 'Button',
      icon: '🔘',
    },
    card: {
      name: 'Card',
      icon: '📦',
    },
    input: {
      name: 'Input Field',
      icon: '✍️',
    },
    badge: {
      name: 'Badge',
      icon: '🏷️',
    },
    modal: {
      name: 'Modal',
      icon: '🪟',
    },
  };

  const getComponentCode = () => {
    const codes = {
      tailwind: {
        button: `<button className="px-4 py-2 rounded-lg font-semibold transition-all ${
          customization.variant === 'primary'
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
        } ${customization.size === 'lg' ? 'text-lg px-6 py-3' : 'text-sm'} ${
          customization.disabled ? 'opacity-50 cursor-not-allowed' : ''
        }">
  ${customization.text}
</button>`,
        card: `<div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
  <div className="p-6">
    <h2 className="text-2xl font-bold text-gray-900 mb-2">Card Title</h2>
    <p className="text-gray-600 mb-4">This is a beautiful card component built with Tailwind CSS.</p>
    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
      Learn More
    </button>
  </div>
</div>`,
        input: `<input 
  type="text" 
  placeholder="Enter text..." 
  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
/>`,
        badge: `<span className="inline-block px-3 py-1 rounded-full text-sm font-semibold ${
          customization.variant === 'primary'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }">
  ${customization.text}
</span>`,
        modal: `<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4">
    <div className="p-6 border-b border-gray-200">
      <h2 className="text-2xl font-bold text-gray-900">Modal Title</h2>
    </div>
    <div className="p-6">
      <p className="text-gray-600 mb-6">This is a modal dialog component.</p>
    </div>
    <div className="p-6 border-t border-gray-200 flex gap-3">
      <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
        Cancel
      </button>
      <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Confirm
      </button>
    </div>
  </div>
</div>`,
      },
      antd: {
        button: `import { Button } from 'antd';

<Button 
  type="${customization.variant === 'primary' ? 'primary' : 'default'}"
  size="${customization.size === 'lg' ? 'large' : 'middle'}"
  disabled={${customization.disabled}}
>
  ${customization.text}
</Button>`,
        card: `import { Card } from 'antd';

<Card 
  title="Card Title"
  bordered={true}
  style={{ width: '100%' }}
>
  <p>This is a beautiful card component built with Ant Design.</p>
</Card>`,
        input: `import { Input } from 'antd';

<Input 
  placeholder="Enter text..."
  size="${customization.size === 'lg' ? 'large' : 'middle'}"
/>`,
        badge: `import { Badge } from 'antd';

<Badge 
  count="NEW"
  color="${customization.variant === 'primary' ? '#1890ff' : '#999'}"
/>`,
        modal: `import { Modal, Button } from 'antd';

const [isModalVisible, setIsModalVisible] = useState(false);

<div>
  <Button type="primary" onClick={() => setIsModalVisible(true)}>
    Open Modal
  </Button>
  <Modal
    title="Modal Title"
    visible={isModalVisible}
    onOk={() => setIsModalVisible(false)}
    onCancel={() => setIsModalVisible(false)}
  >
    <p>This is a modal dialog component.</p>
  </Modal>
</div>`,
      },
      bootstrap: {
        button: `<button 
  className="btn btn-${customization.variant === 'primary' ? 'primary' : 'secondary'} ${
    customization.size === 'lg' ? 'btn-lg' : ''
  }"
  disabled={${customization.disabled}}
>
  ${customization.text}
</button>`,
        card: `<div className="card" style={{ width: '100%' }}>
  <div className="card-body">
    <h5 className="card-title">Card Title</h5>
    <p className="card-text">This is a beautiful card component built with Bootstrap.</p>
    <a href="#" className="btn btn-primary">Learn More</a>
  </div>
</div>`,
        input: `<input 
  type="text" 
  className="form-control"
  placeholder="Enter text..."
  aria-label="Text input"
/>`,
        badge: `<span className="badge bg-${customization.variant === 'primary' ? 'primary' : 'secondary'}">
  ${customization.text}
</span>`,
        modal: `<div className="modal" tabIndex="-1">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">Modal Title</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
      </div>
      <div className="modal-body">
        <p>This is a modal dialog component.</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" className="btn btn-primary">Save</button>
      </div>
    </div>
  </div>
</div>`,
      },
    };

    return codes[framework]?.[selectedComponent] || '';
  };

  const PreviewComponent = () => {
    if (selectedComponent === 'button') {
      return (
        <div className="p-8 flex items-center justify-center min-h-64">
          <button
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              customization.variant === 'primary'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-lg'
                : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
            } ${customization.size === 'lg' ? 'text-lg px-8 py-4' : ''} ${
              customization.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            disabled={customization.disabled}
          >
            {customization.text}
          </button>
        </div>
      );
    }

    if (selectedComponent === 'card') {
      return (
        <div className="p-8 flex items-center justify-center min-h-64">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 max-w-sm w-full">
            <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Card Title</h2>
              <p className="text-gray-600 mb-4">This is a beautiful card component.</p>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Learn More
              </button>
            </div>
          </div>
        </div>
      );
    }

    if (selectedComponent === 'input') {
      return (
        <div className="p-8 flex items-center justify-center min-h-64">
          <input
            type="text"
            placeholder="Enter text..."
            className="px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all w-full max-w-sm"
          />
        </div>
      );
    }

    if (selectedComponent === 'badge') {
      return (
        <div className="p-8 flex items-center justify-center min-h-64 gap-4">
          <span
            className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              customization.variant === 'primary'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-gray-100 text-gray-800'
            }`}
          >
            {customization.text}
          </span>
        </div>
      );
    }

    if (selectedComponent === 'modal') {
      return (
        <div className="p-8 flex items-center justify-center min-h-64 bg-gray-100">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">Modal Title</h2>
            </div>
            <div className="p-6">
              <p className="text-gray-600">This is a modal dialog component.</p>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button className="flex-1 px-4 py-2 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200">
                Cancel
              </button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Confirm
              </button>
            </div>
          </div>
        </div>
      );
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getComponentCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Zap className="w-8 h-8 text-amber-400" />
            <h1 className="text-4xl font-bold text-white">React Builder</h1>
          </div>
          <p className="text-slate-400">Design and generate components for your favorite framework</p>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Framework Selector */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <label className="text-slate-300 text-sm font-semibold block mb-3">Framework</label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="tailwind">Tailwind CSS</option>
              <option value="antd">Ant Design</option>
              <option value="bootstrap">Bootstrap</option>
            </select>
          </div>

          {/* Component Selector */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <label className="text-slate-300 text-sm font-semibold block mb-3">Component</label>
            <select
              value={selectedComponent}
              onChange={(e) => setSelectedComponent(e.target.value)}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {Object.entries(components).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.icon} {val.name}
                </option>
              ))}
            </select>
          </div>

          {/* View Toggle */}
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-end">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
            >
              {showPreview ? <Code className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              {showPreview ? 'Show Code' : 'Show Preview'}
            </button>
          </div>
        </div>

        {/* Customization Panel */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <label className="text-slate-300 text-sm font-semibold block mb-3">Size</label>
            <select
              value={customization.size}
              onChange={(e) => setCustomization({ ...customization, size: e.target.value })}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="sm">Small</option>
              <option value="md">Medium</option>
              <option value="lg">Large</option>
            </select>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <label className="text-slate-300 text-sm font-semibold block mb-3">Variant</label>
            <select
              value={customization.variant}
              onChange={(e) => setCustomization({ ...customization, variant: e.target.value })}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="primary">Primary</option>
              <option value="secondary">Secondary</option>
            </select>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
            <label className="text-slate-300 text-sm font-semibold block mb-3">Text</label>
            <input
              type="text"
              value={customization.text}
              onChange={(e) => setCustomization({ ...customization, text: e.target.value })}
              className="w-full bg-slate-700 text-white border border-slate-600 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 flex items-end">
            <label className="flex items-center gap-3 cursor-pointer w-full">
              <input
                type="checkbox"
                checked={customization.disabled}
                onChange={(e) => setCustomization({ ...customization, disabled: e.target.checked })}
                className="w-4 h-4 rounded"
              />
              <span className="text-slate-300 text-sm font-semibold">Disabled</span>
            </label>
          </div>
        </div>

        {/* Preview/Code Section */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">
          {showPreview ? (
            <div className="bg-gradient-to-br from-slate-50 to-gray-100">
              <PreviewComponent />
            </div>
          ) : (
            <div className="relative">
              <pre className="p-6 text-slate-300 text-sm overflow-x-auto bg-slate-900">
                <code>{getComponentCode()}</code>
              </pre>
              <button
                onClick={copyToClipboard}
                className={`absolute top-4 right-4 flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all ${
                  copied
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                <Copy className="w-4 h-4" />
                {copied ? 'Copied!' : 'Copy Code'}
              </button>
            </div>
          )}
        </div>

        {/* Framework Info */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { name: 'Tailwind CSS', desc: 'Utility-first CSS framework' },
            { name: 'Ant Design', desc: 'Enterprise-grade UI library' },
            { name: 'Bootstrap', desc: 'Popular CSS framework' },
          ].map((fw) => (
            <div
              key={fw.name}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                framework === fw.name.toLowerCase().replace(' ', '')
                  ? 'bg-blue-900 border-blue-600'
                  : 'bg-slate-800 border-slate-700 hover:border-slate-600'
              }`}
              onClick={() => setFramework(fw.name.toLowerCase().replace(' ', ''))}
            >
              <h3 className="text-white font-semibold mb-1">{fw.name}</h3>
              <p className="text-slate-400 text-sm">{fw.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReactComponentBuilder;
