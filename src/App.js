import React, { useState, useCallback, useRef } from 'react';
import { Plus, Eye, Code, Download, Trash2, Move, Settings, Play, Layers, Type, Square, Grid, Image, List, FileText, Info, BookOpen } from 'lucide-react';

const FRAMEWORKS = {
  vanilla: { name: 'Vanilla CSS', icon: '🎨' },
  bootstrap: { name: 'Bootstrap', icon: '🅱️' },
  tailwind: { name: 'Tailwind CSS', icon: '🌊' },
  antd: { name: 'Ant Design', icon: '🐜' }
};

const COMPONENT_TEMPLATES = {
  container: {
    name: 'Container',
    icon: Square,
    category: 'layout',
    defaultProps: {
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      minHeight: '100px',
      display: 'flex',
      flexDirection: 'column',
      gap: '12px'
    },
    frameworks: {
      bootstrap: { className: 'container p-4 bg-white border rounded' },
      tailwind: { className: 'container p-6 bg-white border border-gray-200 rounded-lg min-h-[100px] flex flex-col gap-3' },
      antd: { component: 'Card', props: { style: { minHeight: '100px' } } }
    }
  },
  card: {
    name: 'Card',
    icon: Square,
    category: 'layout',
    defaultProps: {
      padding: '20px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb'
    },
    frameworks: {
      bootstrap: { className: 'card' },
      tailwind: { className: 'bg-white p-5 rounded-lg shadow border border-gray-200' },
      antd: { component: 'Card', props: {} }
    }
  },
  grid: {
    name: 'Grid',
    icon: Grid,
    category: 'layout',
    defaultProps: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: '16px',
      padding: '16px'
    },
    frameworks: {
      bootstrap: { className: 'row g-3' },
      tailwind: { className: 'grid grid-cols-3 gap-4 p-4' },
      antd: { component: 'Row', props: { gutter: 16 } }
    }
  },
  flexRow: {
    name: 'Flex Row',
    icon: Grid,
    category: 'layout',
    defaultProps: {
      display: 'flex',
      flexDirection: 'row',
      gap: '16px',
      alignItems: 'center',
      padding: '16px',
      backgroundColor: '#f9fafb',
      borderRadius: '6px'
    },
    frameworks: {
      bootstrap: { className: 'd-flex flex-row align-items-center gap-3 p-3 bg-light rounded' },
      tailwind: { className: 'flex flex-row gap-4 items-center p-4 bg-gray-50 rounded-md' },
      antd: { component: 'Space', props: { direction: 'horizontal', align: 'center' } }
    }
  },
  flexColumn: {
    name: 'Flex Column',
    icon: Grid,
    category: 'layout',
    defaultProps: {
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      padding: '16px'
    },
    frameworks: {
      bootstrap: { className: 'd-flex flex-column gap-2 p-3' },
      tailwind: { className: 'flex flex-col gap-3 p-4' },
      antd: { component: 'Space', props: { direction: 'vertical' } }
    }
  },
  heading: {
    name: 'Heading',
    icon: Type,
    category: 'typography',
    defaultProps: {
      text: 'Heading Text',
      fontSize: '32px',
      fontWeight: '700',
      color: '#111827',
      margin: '0'
    },
    tag: 'h1',
    frameworks: {
      bootstrap: { className: 'h1 fw-bold' },
      tailwind: { className: 'text-3xl font-bold text-gray-900' },
      antd: { component: 'Typography.Title', props: { level: 1 } }
    }
  },
  subheading: {
    name: 'Subheading',
    icon: Type,
    category: 'typography',
    defaultProps: {
      text: 'Subheading Text',
      fontSize: '24px',
      fontWeight: '600',
      color: '#374151',
      margin: '0'
    },
    tag: 'h2',
    frameworks: {
      bootstrap: { className: 'h2 fw-semibold' },
      tailwind: { className: 'text-2xl font-semibold text-gray-800' },
      antd: { component: 'Typography.Title', props: { level: 2 } }
    }
  },
  text: {
    name: 'Text',
    icon: FileText,
    category: 'typography',
    defaultProps: {
      text: 'Your text content here',
      fontSize: '16px',
      color: '#374151',
      lineHeight: '1.6'
    },
    tag: 'p',
    frameworks: {
      bootstrap: { className: 'text-muted' },
      tailwind: { className: 'text-base text-gray-700 leading-relaxed' },
      antd: { component: 'Typography.Paragraph' }
    }
  },
  link: {
    name: 'Link',
    icon: Type,
    category: 'typography',
    defaultProps: {
      text: 'Click here',
      href: '#',
      color: '#3b82f6',
      textDecoration: 'underline',
      cursor: 'pointer'
    },
    tag: 'a',
    frameworks: {
      bootstrap: { className: 'link-primary' },
      tailwind: { className: 'text-blue-500 underline hover:text-blue-700' },
      antd: { component: 'Typography.Link', props: { href: '#' } }
    }
  },
  button: {
    name: 'Button',
    icon: Square,
    category: 'components',
    defaultProps: {
      text: 'Click Me',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    tag: 'button',
    frameworks: {
      bootstrap: { className: 'btn btn-primary' },
      tailwind: { className: 'bg-blue-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-600 transition' },
      antd: { component: 'Button', props: { type: 'primary' } }
    }
  },
  buttonSecondary: {
    name: 'Button Secondary',
    icon: Square,
    category: 'components',
    defaultProps: {
      text: 'Secondary',
      backgroundColor: '#6b7280',
      color: '#ffffff',
      padding: '12px 24px',
      borderRadius: '6px',
      border: 'none',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    tag: 'button',
    frameworks: {
      bootstrap: { className: 'btn btn-secondary' },
      tailwind: { className: 'bg-gray-500 text-white px-6 py-3 rounded-md font-semibold hover:bg-gray-600 transition' },
      antd: { component: 'Button', props: { type: 'default' } }
    }
  },
  buttonOutline: {
    name: 'Button Outline',
    icon: Square,
    category: 'components',
    defaultProps: {
      text: 'Outline',
      backgroundColor: 'transparent',
      color: '#3b82f6',
      padding: '12px 24px',
      borderRadius: '6px',
      border: '2px solid #3b82f6',
      fontSize: '16px',
      fontWeight: '600',
      cursor: 'pointer'
    },
    tag: 'button',
    frameworks: {
      bootstrap: { className: 'btn btn-outline-primary' },
      tailwind: { className: 'border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-md font-semibold hover:bg-blue-50 transition' },
      antd: { component: 'Button', props: { type: 'default' } }
    }
  },
  input: {
    name: 'Input',
    icon: Type,
    category: 'components',
    defaultProps: {
      placeholder: 'Enter text...',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      width: '100%'
    },
    tag: 'input',
    frameworks: {
      bootstrap: { className: 'form-control' },
      tailwind: { className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' },
      antd: { component: 'Input', props: { placeholder: 'Enter text...' } }
    }
  },
  textarea: {
    name: 'Textarea',
    icon: FileText,
    category: 'components',
    defaultProps: {
      placeholder: 'Enter text...',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      width: '100%',
      minHeight: '100px',
      resize: 'vertical'
    },
    tag: 'textarea',
    frameworks: {
      bootstrap: { className: 'form-control' },
      tailwind: { className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]' },
      antd: { component: 'Input.TextArea', props: { placeholder: 'Enter text...', rows: 4 } }
    }
  },
  select: {
    name: 'Select',
    icon: List,
    category: 'components',
    defaultProps: {
      options: ['Option 1', 'Option 2', 'Option 3'],
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '16px',
      width: '100%'
    },
    tag: 'select',
    frameworks: {
      bootstrap: { className: 'form-select' },
      tailwind: { className: 'w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' },
      antd: { component: 'Select', props: { style: { width: '100%' } } }
    }
  },
  checkbox: {
    name: 'Checkbox',
    icon: Square,
    category: 'components',
    defaultProps: {
      label: 'Checkbox label',
      checked: false
    },
    tag: 'input',
    inputType: 'checkbox',
    frameworks: {
      bootstrap: { className: 'form-check-input' },
      tailwind: { className: 'w-4 h-4 text-blue-500 border-gray-300 rounded focus:ring-blue-500' },
      antd: { component: 'Checkbox', props: {} }
    }
  },
  radio: {
    name: 'Radio',
    icon: Square,
    category: 'components',
    defaultProps: {
      label: 'Radio option',
      name: 'radio-group'
    },
    tag: 'input',
    inputType: 'radio',
    frameworks: {
      bootstrap: { className: 'form-check-input' },
      tailwind: { className: 'w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500' },
      antd: { component: 'Radio', props: {} }
    }
  },
  badge: {
    name: 'Badge',
    icon: Square,
    category: 'components',
    defaultProps: {
      text: 'New',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      padding: '4px 12px',
      borderRadius: '12px',
      fontSize: '12px',
      fontWeight: '600',
      display: 'inline-block'
    },
    tag: 'span',
    frameworks: {
      bootstrap: { className: 'badge bg-primary' },
      tailwind: { className: 'inline-block bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold' },
      antd: { component: 'Badge', props: { count: 'New' } }
    }
  },
  alert: {
    name: 'Alert',
    icon: Square,
    category: 'components',
    defaultProps: {
      text: 'This is an alert message',
      backgroundColor: '#dbeafe',
      color: '#1e40af',
      padding: '12px 16px',
      borderRadius: '6px',
      border: '1px solid #93c5fd'
    },
    tag: 'div',
    frameworks: {
      bootstrap: { className: 'alert alert-primary' },
      tailwind: { className: 'bg-blue-50 text-blue-800 p-4 rounded-md border border-blue-200' },
      antd: { component: 'Alert', props: { message: 'This is an alert message', type: 'info' } }
    }
  },
  progress: {
    name: 'Progress Bar',
    icon: Square,
    category: 'components',
    defaultProps: {
      value: 50,
      max: 100,
      height: '20px',
      backgroundColor: '#e5e7eb',
      borderRadius: '10px'
    },
    tag: 'progress',
    frameworks: {
      bootstrap: { className: 'progress' },
      tailwind: { className: 'w-full bg-gray-200 rounded-full h-5' },
      antd: { component: 'Progress', props: { percent: 50 } }
    }
  },
  divider: {
    name: 'Divider',
    icon: Square,
    category: 'components',
    defaultProps: {
      height: '1px',
      backgroundColor: '#e5e7eb',
      margin: '16px 0'
    },
    tag: 'hr',
    frameworks: {
      bootstrap: { className: 'my-3' },
      tailwind: { className: 'border-t border-gray-200 my-4' },
      antd: { component: 'Divider', props: {} }
    }
  },
  image: {
    name: 'Image',
    icon: Image,
    category: 'media',
    defaultProps: {
      src: 'https://via.placeholder.com/400x300',
      alt: 'Placeholder image',
      width: '100%',
      maxWidth: '400px',
      borderRadius: '8px'
    },
    tag: 'img',
    frameworks: {
      bootstrap: { className: 'img-fluid rounded' },
      tailwind: { className: 'w-full max-w-md rounded-lg' },
      antd: { component: 'Image' }
    }
  },
  avatar: {
    name: 'Avatar',
    icon: Image,
    category: 'media',
    defaultProps: {
      src: 'https://via.placeholder.com/100',
      alt: 'Avatar',
      width: '64px',
      height: '64px',
      borderRadius: '50%'
    },
    tag: 'img',
    frameworks: {
      bootstrap: { className: 'rounded-circle' },
      tailwind: { className: 'w-16 h-16 rounded-full' },
      antd: { component: 'Avatar', props: { size: 64 } }
    }
  },
  list: {
    name: 'List',
    icon: List,
    category: 'data',
    defaultProps: {
      items: ['Item 1', 'Item 2', 'Item 3'],
      fontSize: '16px',
      color: '#374151',
      padding: '0',
      margin: '0',
      listStyle: 'disc',
      paddingLeft: '24px'
    },
    tag: 'ul',
    frameworks: {
      bootstrap: { className: 'list-group' },
      tailwind: { className: 'list-disc list-inside text-gray-700' },
      antd: { component: 'List', props: { bordered: true } }
    }
  },
  table: {
    name: 'Table',
    icon: Grid,
    category: 'data',
    defaultProps: {
      headers: ['Header 1', 'Header 2', 'Header 3'],
      rows: [
        ['Cell 1', 'Cell 2', 'Cell 3'],
        ['Cell 4', 'Cell 5', 'Cell 6']
      ],
      border: '1px solid #e5e7eb',
      width: '100%'
    },
    tag: 'table',
    frameworks: {
      bootstrap: { className: 'table table-striped' },
      tailwind: { className: 'w-full border border-gray-200' },
      antd: { component: 'Table', props: {} }
    }
  },
  navbar: {
    name: 'Navbar',
    icon: Grid,
    category: 'navigation',
    defaultProps: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '16px 24px',
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      borderBottom: '1px solid #e5e7eb'
    },
    frameworks: {
      bootstrap: { className: 'navbar navbar-light bg-light' },
      tailwind: { className: 'flex justify-between items-center px-6 py-4 bg-white shadow border-b border-gray-200' },
      antd: { component: 'Menu', props: { mode: 'horizontal' } }
    }
  },
  tabs: {
    name: 'Tabs',
    icon: Grid,
    category: 'navigation',
    defaultProps: {
      tabs: ['Tab 1', 'Tab 2', 'Tab 3'],
      display: 'flex',
      gap: '8px',
      borderBottom: '2px solid #e5e7eb',
      padding: '0 0 8px 0'
    },
    frameworks: {
      bootstrap: { className: 'nav nav-tabs' },
      tailwind: { className: 'flex gap-2 border-b-2 border-gray-200 pb-2' },
      antd: { component: 'Tabs', props: {} }
    }
  },
  breadcrumb: {
    name: 'Breadcrumb',
    icon: Grid,
    category: 'navigation',
    defaultProps: {
      items: ['Home', 'Products', 'Details'],
      display: 'flex',
      gap: '8px',
      fontSize: '14px',
      color: '#6b7280'
    },
    frameworks: {
      bootstrap: { className: 'breadcrumb' },
      tailwind: { className: 'flex gap-2 text-sm text-gray-600' },
      antd: { component: 'Breadcrumb', props: {} }
    }
  }
};

const ComponentRenderer = ({ component, isSelected, onSelect, onUpdate, onDelete, onDrop, level = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const template = COMPONENT_TEMPLATES[component.type];
  
  const handleClick = (e) => {
    e.stopPropagation();
    onSelect(component.id);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (onDrop) {
      onDrop(component.id);
    }
  };

  const renderChildren = () => {
    if (component.children && component.children.length > 0) {
      return component.children.map(child => (
        <ComponentRenderer
          key={child.id}
          component={child}
          isSelected={isSelected}
          onSelect={onSelect}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onDrop={onDrop}
          level={level + 1}
        />
      ));
    }
    return null;
  };

  const isContainer = ['container', 'card', 'grid', 'flexRow', 'flexColumn', 'navbar'].includes(component.type);

  const componentStyle = {
    ...component.props,
    position: 'relative',
    outline: isSelected ? '2px solid #3b82f6' : isHovered ? '2px dashed #93c5fd' : 'none',
    outlineOffset: '2px',
    transition: 'outline 0.2s ease',
    cursor: 'pointer',
    backgroundColor: isDragOver && isContainer ? '#eff6ff' : component.props.backgroundColor
  };

  const renderComponent = () => {
    const Tag = template?.tag || 'div';
    
    // List component
    if (component.type === 'list') {
      return (
        <Tag style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {component.props.items?.map((item, idx) => (
            <li key={idx} style={{ margin: '4px 0' }}>{item}</li>
          ))}
        </Tag>
      );
    }
    
    // Image/Avatar component
    if (component.type === 'image' || component.type === 'avatar') {
      return <Tag {...component.props} style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />;
    }
    
    // Select component
    if (component.type === 'select') {
      return (
        <Tag style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {component.props.options?.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </Tag>
      );
    }
    
    // Checkbox component
    if (component.type === 'checkbox') {
      return (
        <label style={{ ...componentStyle, display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <input type="checkbox" checked={component.props.checked} readOnly style={{ cursor: 'pointer' }} />
          <span>{component.props.label}</span>
        </label>
      );
    }
    
    // Radio component
    if (component.type === 'radio') {
      return (
        <label style={{ ...componentStyle, display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <input type="radio" name={component.props.name} style={{ cursor: 'pointer' }} />
          <span>{component.props.label}</span>
        </label>
      );
    }
    
    // Progress component
    if (component.type === 'progress') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <Tag value={component.props.value} max={component.props.max} style={{ width: '100%', height: component.props.height }} />
        </div>
      );
    }
    
    // Table component
    if (component.type === 'table') {
      return (
        <Tag style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          <thead>
            <tr>
              {component.props.headers?.map((header, idx) => (
                <th key={idx} style={{ padding: '8px', border: '1px solid #e5e7eb', backgroundColor: '#f9fafb' }}>{header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {component.props.rows?.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {row.map((cell, cellIdx) => (
                  <td key={cellIdx} style={{ padding: '8px', border: '1px solid #e5e7eb' }}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Tag>
      );
    }
    
    // Tabs component
    if (component.type === 'tabs') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {component.props.tabs?.map((tab, idx) => (
            <button key={idx} style={{ 
              padding: '8px 16px', 
              border: 'none', 
              backgroundColor: idx === 0 ? '#3b82f6' : 'transparent',
              color: idx === 0 ? '#ffffff' : '#6b7280',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontWeight: '600'
            }}>
              {tab}
            </button>
          ))}
        </div>
      );
    }
    
    // Breadcrumb component
    if (component.type === 'breadcrumb') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {component.props.items?.map((item, idx) => (
            <span key={idx}>
              <span style={{ color: idx === component.props.items.length - 1 ? '#111827' : '#6b7280' }}>
                {item}
              </span>
              {idx < component.props.items.length - 1 && <span style={{ margin: '0 8px', color: '#9ca3af' }}>/</span>}
            </span>
          ))}
        </div>
      );
    }
    
    // Input/Textarea
    if (component.type === 'input' || component.type === 'textarea') {
      return <Tag placeholder={component.props.placeholder} style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />;
    }
    
    // Link
    if (component.type === 'link') {
      return <Tag href={component.props.href} style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>{component.props.text}</Tag>;
    }
    
    // Divider
    if (component.type === 'divider') {
      return <Tag style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)} />;
    }

    // Container components that can accept children
    if (isContainer) {
      const children = renderChildren();
      const hasChildren = component.children && component.children.length > 0;
      
      return (
        <Tag 
          style={componentStyle} 
          onClick={handleClick} 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {component.props.text}
          {!hasChildren && isContainer && (
            <div style={{
              padding: '20px',
              border: '2px dashed #d1d5db',
              borderRadius: '6px',
              color: '#9ca3af',
              fontSize: '13px',
              textAlign: 'center',
              backgroundColor: isDragOver ? '#eff6ff' : 'transparent'
            }}>
              Drop components here
            </div>
          )}
          {children}
        </Tag>
      );
    }

    // Default text-based components
    return (
      <Tag style={componentStyle} onClick={handleClick} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        {component.props.text}
      </Tag>
    );
  };

  return renderComponent();
};

const PropertyEditor = ({ component, onUpdate, onAddChild }) => {
  if (!component) {
    return (
      <div style={{ padding: '32px', textAlign: 'center', color: '#9ca3af' }}>
        <Settings size={48} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
        <p style={{ margin: 0, fontSize: '14px' }}>Select a component to edit properties</p>
      </div>
    );
  }

  const updateProp = (key, value) => {
    onUpdate(component.id, { ...component.props, [key]: value });
  };

  const isContainer = ['container', 'card', 'grid', 'flexRow', 'flexColumn', 'navbar'].includes(component.type);

  const updateListItem = (index, value) => {
    const newItems = [...(component.props.items || [])];
    newItems[index] = value;
    updateProp('items', newItems);
  };

  const addListItem = () => {
    const newItems = [...(component.props.items || []), 'New Item'];
    updateProp('items', newItems);
  };

  const removeListItem = (index) => {
    const newItems = (component.props.items || []).filter((_, idx) => idx !== index);
    updateProp('items', newItems);
  };

  const updateArrayItem = (arrayKey, index, value) => {
    const newArray = [...(component.props[arrayKey] || [])];
    newArray[index] = value;
    updateProp(arrayKey, newArray);
  };

  const addArrayItem = (arrayKey, defaultValue) => {
    const newArray = [...(component.props[arrayKey] || []), defaultValue];
    updateProp(arrayKey, newArray);
  };

  const removeArrayItem = (arrayKey, index) => {
    const newArray = (component.props[arrayKey] || []).filter((_, idx) => idx !== index);
    updateProp(arrayKey, newArray);
  };

  const updateTableRow = (rowIndex, cellIndex, value) => {
    const newRows = [...(component.props.rows || [])];
    newRows[rowIndex][cellIndex] = value;
    updateProp('rows', newRows);
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#111827' }}>
          {COMPONENT_TEMPLATES[component.type]?.name || 'Component'}
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>ID: {component.id}</p>
      </div>

      {/* Container Info */}
      {isContainer && (
        <div style={{
          marginBottom: '20px',
          padding: '12px',
          backgroundColor: '#eff6ff',
          borderRadius: '6px',
          border: '1px solid #bfdbfe'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
            <Layers size={16} style={{ color: '#3b82f6' }} />
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e40af' }}>
              Container Component
            </span>
          </div>
          <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#1e40af', lineHeight: '1.5' }}>
            This component can contain other components. Drag and drop components into it or select it and click a component to add inside.
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#1e40af' }}>
            Children: {component.children?.length || 0}
          </p>
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {Object.entries(component.props).map(([key, value]) => {
          // Handle items array (for lists)
          if (key === 'items' && Array.isArray(value)) {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                  {key}
                </label>
                {value.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateListItem(idx, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                    />
                    <button
                      onClick={() => removeListItem(idx)}
                      style={{
                        padding: '8px',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addListItem}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Item
                </button>
              </div>
            );
          }

          // Handle options array (for select)
          if (key === 'options' && Array.isArray(value)) {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                  Options
                </label>
                {value.map((option, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateArrayItem('options', idx, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                    />
                    <button
                      onClick={() => removeArrayItem('options', idx)}
                      style={{
                        padding: '8px',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('options', 'New Option')}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Option
                </button>
              </div>
            );
          }

          // Handle tabs array
          if (key === 'tabs' && Array.isArray(value)) {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                  Tabs
                </label>
                {value.map((tab, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={tab}
                      onChange={(e) => updateArrayItem('tabs', idx, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                    />
                    <button
                      onClick={() => removeArrayItem('tabs', idx)}
                      style={{
                        padding: '8px',
                        backgroundColor: '#fef2f2',
                        color: '#dc2626',
                        border: '1px solid #fecaca',
                        borderRadius: '6px',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('tabs', 'New Tab')}
                  style={{
                    width: '100%',
                    padding: '8px',
                    backgroundColor: '#f3f4f6',
                    color: '#374151',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '13px',
                    cursor: 'pointer'
                  }}
                >
                  + Add Tab
                </button>
              </div>
            );
          }

          // Handle table headers
          if (key === 'headers' && Array.isArray(value)) {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                  Headers
                </label>
                {value.map((header, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <input
                      type="text"
                      value={header}
                      onChange={(e) => updateArrayItem('headers', idx, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '8px 12px',
                        border: '1px solid #d1d5db',
                        borderRadius: '6px',
                        fontSize: '14px',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                ))}
              </div>
            );
          }

          // Handle table rows
          if (key === 'rows' && Array.isArray(value)) {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                  Table Data
                </label>
                {value.map((row, rowIdx) => (
                  <div key={rowIdx} style={{ marginBottom: '12px', padding: '12px', backgroundColor: '#f9fafb', borderRadius: '6px' }}>
                    <div style={{ fontSize: '12px', fontWeight: '600', color: '#6b7280', marginBottom: '8px' }}>Row {rowIdx + 1}</div>
                    {row.map((cell, cellIdx) => (
                      <input
                        key={cellIdx}
                        type="text"
                        value={cell}
                        onChange={(e) => updateTableRow(rowIdx, cellIdx, e.target.value)}
                        placeholder={`Column ${cellIdx + 1}`}
                        style={{
                          width: '100%',
                          padding: '6px 10px',
                          border: '1px solid #d1d5db',
                          borderRadius: '4px',
                          fontSize: '13px',
                          marginBottom: '6px'
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
            );
          }

          // Skip non-editable properties
          if (key === 'headers' || key === 'rows') return null;

          // Handle boolean properties
          if (typeof value === 'boolean') {
            return (
              <div key={key}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={(e) => updateProp(key, e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                </label>
              </div>
            );
          }

          // Handle number properties
          if (typeof value === 'number' || key === 'value' || key === 'max') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => updateProp(key, parseFloat(e.target.value))}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontFamily: 'monospace'
                  }}
                />
              </div>
            );
          }

          // Handle color properties
          if (key.includes('color') || key.includes('Color') || key.includes('background')) {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="color"
                    value={value}
                    onChange={(e) => updateProp(key, e.target.value)}
                    style={{ width: '50px', height: '38px', border: '1px solid #d1d5db', borderRadius: '6px', cursor: 'pointer' }}
                  />
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => updateProp(key, e.target.value)}
                    style={{
                      flex: 1,
                      padding: '8px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontFamily: 'monospace'
                    }}
                  />
                </div>
              </div>
            );
          }

          // Handle text properties
          return (
            <div key={key}>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '13px', fontWeight: '600', color: '#374151', textTransform: 'capitalize' }}>
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </label>
              <input
                type="text"
                value={value}
                onChange={(e) => updateProp(key, e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  fontFamily: key.includes('font') ? 'inherit' : 'monospace'
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CodePreview = ({ components, framework }) => {
  const generateComponentCode = (component, indent = 0, framework) => {
    const spaces = '  '.repeat(indent);
    const template = COMPONENT_TEMPLATES[component.type];
    const frameworkConfig = template?.frameworks?.[framework];
    
    if (framework === 'vanilla') {
      const Tag = template?.tag || 'div';
      const styleProps = Object.entries(component.props)
        .filter(([key]) => key !== 'text' && key !== 'items' && key !== 'src' && key !== 'alt')
        .map(([key, value]) => `${key}: '${value}'`)
        .join(', ');

      const styleString = styleProps ? `style={{ ${styleProps} }}` : '';

      if (component.type === 'list') {
        const items = component.props.items || [];
        return `${spaces}<${Tag} ${styleString}>\n${items.map(item => `${spaces}  <li>${item}</li>`).join('\n')}\n${spaces}</${Tag}>`;
      }

      if (component.type === 'image') {
        return `${spaces}<${Tag} src="${component.props.src}" alt="${component.props.alt}" ${styleString} />`;
      }

      let content = '';
      if (component.props.text) {
        content = component.props.text;
      }
      
      if (component.children && component.children.length > 0) {
        const childrenCode = component.children.map(child => generateComponentCode(child, indent + 1, framework)).join('\n');
        return `${spaces}<${Tag} ${styleString}>\n${childrenCode}\n${spaces}</${Tag}>`;
      }

      return `${spaces}<${Tag} ${styleString}>${content}</${Tag}>`;
    }
    
    // Bootstrap & Tailwind
    if (framework === 'bootstrap' || framework === 'tailwind') {
      const Tag = template?.tag || 'div';
      const className = frameworkConfig?.className || '';

      if (component.type === 'list') {
        const items = component.props.items || [];
        if (framework === 'bootstrap') {
          return `${spaces}<ul className="${className}">\n${items.map(item => `${spaces}  <li className="list-group-item">${item}</li>`).join('\n')}\n${spaces}</ul>`;
        }
        return `${spaces}<${Tag} className="${className}">\n${items.map(item => `${spaces}  <li>${item}</li>`).join('\n')}\n${spaces}</${Tag}>`;
      }

      if (component.type === 'image') {
        return `${spaces}<${Tag} src="${component.props.src}" alt="${component.props.alt}" className="${className}" />`;
      }

      let content = component.props.text || '';
      
      if (component.children && component.children.length > 0) {
        const childrenCode = component.children.map(child => generateComponentCode(child, indent + 1, framework)).join('\n');
        return `${spaces}<${Tag} className="${className}">\n${childrenCode}\n${spaces}</${Tag}>`;
      }

      return `${spaces}<${Tag} className="${className}">${content}</${Tag}>`;
    }
    
    // Ant Design
    if (framework === 'antd') {
      const ComponentName = frameworkConfig?.component || 'div';
      const additionalProps = frameworkConfig?.props || {};
      
      if (component.type === 'list') {
        const items = component.props.items || [];
        const dataSource = JSON.stringify(items);
        return `${spaces}<List\n${spaces}  dataSource={${dataSource}}\n${spaces}  renderItem={(item) => <List.Item>{item}</List.Item>}\n${spaces}  bordered\n${spaces}/>`;
      }

      if (component.type === 'image') {
        return `${spaces}<Image src="${component.props.src}" alt="${component.props.alt}" />`;
      }

      if (component.type === 'heading') {
        return `${spaces}<Typography.Title level={${additionalProps.level || 1}}>${component.props.text}</Typography.Title>`;
      }

      if (component.type === 'text') {
        return `${spaces}<Typography.Paragraph>${component.props.text}</Typography.Paragraph>`;
      }

      if (component.type === 'button') {
        return `${spaces}<Button type="${additionalProps.type || 'default'}">${component.props.text}</Button>`;
      }

      let content = component.props.text || '';
      
      if (component.children && component.children.length > 0) {
        const childrenCode = component.children.map(child => generateComponentCode(child, indent + 1, framework)).join('\n');
        return `${spaces}<${ComponentName}>\n${childrenCode}\n${spaces}</${ComponentName}>`;
      }

      return `${spaces}<${ComponentName}>${content}</${ComponentName}>`;
    }
  };

  const getImports = () => {
    switch(framework) {
      case 'bootstrap':
        return `import 'bootstrap/dist/css/bootstrap.min.css';`;
      case 'tailwind':
        return `// Tailwind CSS is imported in your main CSS file or index.js`;
      case 'antd':
        return `import { Card, Button, Typography, Image, Space, List } from 'antd';\nimport 'antd/dist/reset.css';`;
      default:
        return '';
    }
  };

  const fullCode = `import React from 'react';
${getImports()}

const MyApp = () => {
  return (
    <div${framework === 'bootstrap' ? ' className="container my-4"' : framework === 'tailwind' ? ' className="container mx-auto p-5"' : ' style={{ padding: "20px" }}'}>
${components.map(comp => generateComponentCode(comp, 3, framework)).join('\n')}
    </div>
  );
};

export default MyApp;`;

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Code size={18} />
        <h3 style={{ margin: 0, fontSize: '14px', fontWeight: '600' }}>Generated Code</h3>
        <span style={{ 
          marginLeft: 'auto',
          padding: '4px 8px',
          backgroundColor: '#f3f4f6',
          borderRadius: '4px',
          fontSize: '12px',
          fontWeight: '600',
          color: '#6b7280'
        }}>
          {FRAMEWORKS[framework]?.icon} {FRAMEWORKS[framework]?.name}
        </span>
      </div>
      <pre style={{
        flex: 1,
        margin: 0,
        padding: '20px',
        backgroundColor: '#1e1e1e',
        color: '#d4d4d4',
        fontSize: '13px',
        lineHeight: '1.6',
        overflow: 'auto',
        fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
      }}>
        {fullCode}
      </pre>
    </div>
  );
};

const IntegrationGuide = ({ framework, onClose }) => {
  const guides = {
    vanilla: {
      title: 'Vanilla CSS Integration',
      steps: [
        {
          title: '1. Create Component File',
          description: 'Save your generated code as MyApp.jsx in your components folder',
          code: 'src/components/MyApp.jsx'
        },
        {
          title: '2. Import in Your App',
          description: 'Import and use the component',
          code: `import MyApp from './components/MyApp';\n\nfunction App() {\n  return <MyApp />;\n}\n\nexport default App;`
        },
        {
          title: '3. That\'s it!',
          description: 'Your component is ready to use with inline styles'
        }
      ]
    },
    bootstrap: {
      title: 'Bootstrap Integration',
      steps: [
        {
          title: '1. Install Bootstrap',
          description: 'Install Bootstrap via npm',
          code: 'npm install bootstrap'
        },
        {
          title: '2. Import Bootstrap CSS',
          description: 'Add this to your main index.js or App.js',
          code: `import 'bootstrap/dist/css/bootstrap.min.css';`
        },
        {
          title: '3. Add Your Component',
          description: 'Save generated code as MyApp.jsx and import it',
          code: `import MyApp from './components/MyApp';\n\nfunction App() {\n  return <MyApp />;\n}`
        },
        {
          title: '4. Optional: Add Bootstrap JS',
          description: 'For interactive components like modals and dropdowns',
          code: `npm install bootstrap react-bootstrap`
        }
      ]
    },
    tailwind: {
      title: 'Tailwind CSS Integration',
      steps: [
        {
          title: '1. Install Tailwind CSS',
          description: 'Install Tailwind and its peer dependencies',
          code: 'npm install -D tailwindcss postcss autoprefixer\nnpx tailwindcss init -p'
        },
        {
          title: '2. Configure Template Paths',
          description: 'Add this to tailwind.config.js',
          code: `module.exports = {\n  content: [\n    "./src/**/*.{js,jsx,ts,tsx}",\n  ],\n  theme: {\n    extend: {},\n  },\n  plugins: [],\n}`
        },
        {
          title: '3. Add Tailwind Directives',
          description: 'Add this to your main CSS file (e.g., index.css)',
          code: `@tailwind base;\n@tailwind components;\n@tailwind utilities;`
        },
        {
          title: '4. Use Your Component',
          description: 'Save generated code and import it',
          code: `import MyApp from './components/MyApp';\n\nfunction App() {\n  return <MyApp />;\n}`
        }
      ]
    },
    antd: {
      title: 'Ant Design Integration',
      steps: [
        {
          title: '1. Install Ant Design',
          description: 'Install Ant Design via npm',
          code: 'npm install antd'
        },
        {
          title: '2. Import Ant Design Styles',
          description: 'Add this to your main index.js or App.js',
          code: `import 'antd/dist/reset.css';`
        },
        {
          title: '3. Add Your Component',
          description: 'Save generated code as MyApp.jsx and import it',
          code: `import MyApp from './components/MyApp';\n\nfunction App() {\n  return <MyApp />;\n}`
        },
        {
          title: '4. Customize Theme (Optional)',
          description: 'Use ConfigProvider to customize Ant Design theme',
          code: `import { ConfigProvider } from 'antd';\n\n<ConfigProvider theme={{\n  token: {\n    colorPrimary: '#00b96b',\n  },\n}}>\n  <MyApp />\n</ConfigProvider>`
        }
      ]
    }
  };

  const guide = guides[framework];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div style={{
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        maxWidth: '700px',
        width: '100%',
        maxHeight: '80vh',
        overflow: 'auto',
        boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)'
      }}>
        <div style={{
          padding: '24px',
          borderBottom: '1px solid #e5e7eb',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <BookOpen size={24} style={{ color: '#3b82f6' }} />
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111827' }}>
              {guide.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              padding: '8px',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '24px',
              color: '#6b7280',
              lineHeight: 1
            }}
          >
            ×
          </button>
        </div>

        <div style={{ padding: '24px' }}>
          {guide.steps.map((step, idx) => (
            <div key={idx} style={{ marginBottom: idx < guide.steps.length - 1 ? '32px' : 0 }}>
              <h3 style={{
                margin: '0 0 8px 0',
                fontSize: '16px',
                fontWeight: '600',
                color: '#111827'
              }}>
                {step.title}
              </h3>
              <p style={{
                margin: '0 0 12px 0',
                fontSize: '14px',
                color: '#6b7280',
                lineHeight: '1.6'
              }}>
                {step.description}
              </p>
              {step.code && (
                <pre style={{
                  margin: 0,
                  padding: '16px',
                  backgroundColor: '#1e1e1e',
                  color: '#d4d4d4',
                  borderRadius: '8px',
                  fontSize: '13px',
                  lineHeight: '1.6',
                  overflow: 'auto',
                  fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace'
                }}>
                  {step.code}
                </pre>
              )}
            </div>
          ))}

          <div style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#eff6ff',
            borderRadius: '8px',
            border: '1px solid #dbeafe'
          }}>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <Info size={18} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#1e40af' }}>
                  Next Steps
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#1e40af', lineHeight: '1.6' }}>
                  After integration, you can customize the components further, add event handlers, 
                  connect to state management, and integrate with your application's data flow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ReactBuilder() {
  const [components, setComponents] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [view, setView] = useState('design');
  const [draggedType, setDraggedType] = useState(null);
  const [framework, setFramework] = useState('vanilla');
  const [showGuide, setShowGuide] = useState(false);

  const selectedComponent = components.find(c => c.id === selectedId);

  const addComponent = (type, parentId = null) => {
    const template = COMPONENT_TEMPLATES[type];
    const newComponent = {
      id: `${type}-${Date.now()}`,
      type,
      props: { ...template.defaultProps },
      children: []
    };

    if (parentId) {
      setComponents(prev => {
        const addToParent = (items) => {
          return items.map(item => {
            if (item.id === parentId) {
              return { ...item, children: [...(item.children || []), newComponent] };
            }
            if (item.children) {
              return { ...item, children: addToParent(item.children) };
            }
            return item;
          });
        };
        return addToParent(prev);
      });
    } else {
      setComponents(prev => [...prev, newComponent]);
    }
    
    setSelectedId(newComponent.id);
  };

  const updateComponent = (id, newProps) => {
    setComponents(prev => {
      const update = (items) => {
        return items.map(item => {
          if (item.id === id) {
            return { ...item, props: newProps };
          }
          if (item.children) {
            return { ...item, children: update(item.children) };
          }
          return item;
        });
      };
      return update(prev);
    });
  };

  const deleteComponent = (id) => {
    setComponents(prev => {
      const remove = (items) => {
        return items.filter(item => item.id !== id).map(item => {
          if (item.children) {
            return { ...item, children: remove(item.children) };
          }
          return item;
        });
      };
      return remove(prev);
    });
    setSelectedId(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (draggedType) {
      addComponent(draggedType);
      setDraggedType(null);
    }
  };

  const handleNestedDrop = (parentId) => {
    if (draggedType) {
      addComponent(draggedType, parentId);
      setDraggedType(null);
    }
  };

  const downloadCode = () => {
    const generateComponentCode = (component, indent = 0) => {
      const spaces = '  '.repeat(indent);
      const template = COMPONENT_TEMPLATES[component.type];
      const frameworkConfig = template?.frameworks?.[framework];
      
      if (framework === 'vanilla') {
        const Tag = template?.tag || 'div';
        const styleProps = Object.entries(component.props)
          .filter(([key]) => key !== 'text' && key !== 'items' && key !== 'src' && key !== 'alt')
          .map(([key, value]) => `${key}: '${value}'`)
          .join(', ');

        const styleString = styleProps ? `style={{ ${styleProps} }}` : '';

        if (component.type === 'list') {
          const items = component.props.items || [];
          return `${spaces}<${Tag} ${styleString}>\n${items.map(item => `${spaces}  <li>${item}</li>`).join('\n')}\n${spaces}</${Tag}>`;
        }

        if (component.type === 'image') {
          return `${spaces}<${Tag} src="${component.props.src}" alt="${component.props.alt}" ${styleString} />`;
        }

        let content = '';
        if (component.props.text) {
          content = component.props.text;
        }
        
        if (component.children && component.children.length > 0) {
          const childrenCode = component.children.map(child => generateComponentCode(child, indent + 1)).join('\n');
          return `${spaces}<${Tag} ${styleString}>\n${childrenCode}\n${spaces}</${Tag}>`;
        }

        return `${spaces}<${Tag} ${styleString}>${content}</${Tag}>`;
      }
      
      if (framework === 'bootstrap' || framework === 'tailwind') {
        const Tag = template?.tag || 'div';
        const className = frameworkConfig?.className || '';

        if (component.type === 'list') {
          const items = component.props.items || [];
          if (framework === 'bootstrap') {
            return `${spaces}<ul className="${className}">\n${items.map(item => `${spaces}  <li className="list-group-item">${item}</li>`).join('\n')}\n${spaces}</ul>`;
          }
          return `${spaces}<${Tag} className="${className}">\n${items.map(item => `${spaces}  <li>${item}</li>`).join('\n')}\n${spaces}</${Tag}>`;
        }

        if (component.type === 'image') {
          return `${spaces}<${Tag} src="${component.props.src}" alt="${component.props.alt}" className="${className}" />`;
        }

        let content = component.props.text || '';
        
        if (component.children && component.children.length > 0) {
          const childrenCode = component.children.map(child => generateComponentCode(child, indent + 1)).join('\n');
          return `${spaces}<${Tag} className="${className}">\n${childrenCode}\n${spaces}</${Tag}>`;
        }

        return `${spaces}<${Tag} className="${className}">${content}</${Tag}>`;
      }
      
      if (framework === 'antd') {
        const ComponentName = frameworkConfig?.component || 'div';
        const additionalProps = frameworkConfig?.props || {};
        
        if (component.type === 'list') {
          const items = component.props.items || [];
          const dataSource = JSON.stringify(items);
          return `${spaces}<List\n${spaces}  dataSource={${dataSource}}\n${spaces}  renderItem={(item) => <List.Item>{item}</List.Item>}\n${spaces}  bordered\n${spaces}/>`;
        }

        if (component.type === 'image') {
          return `${spaces}<Image src="${component.props.src}" alt="${component.props.alt}" />`;
        }

        if (component.type === 'heading') {
          return `${spaces}<Typography.Title level={${additionalProps.level || 1}}>${component.props.text}</Typography.Title>`;
        }

        if (component.type === 'text') {
          return `${spaces}<Typography.Paragraph>${component.props.text}</Typography.Paragraph>`;
        }

        if (component.type === 'button') {
          return `${spaces}<Button type="${additionalProps.type || 'default'}">${component.props.text}</Button>`;
        }

        let content = component.props.text || '';
        
        if (component.children && component.children.length > 0) {
          const childrenCode = component.children.map(child => generateComponentCode(child, indent + 1)).join('\n');
          return `${spaces}<${ComponentName}>\n${childrenCode}\n${spaces}</${ComponentName}>`;
        }

        return `${spaces}<${ComponentName}>${content}</${ComponentName}>`;
      }
    };

    const getImports = () => {
      switch(framework) {
        case 'bootstrap':
          return `import 'bootstrap/dist/css/bootstrap.min.css';`;
        case 'tailwind':
          return `// Tailwind CSS is imported in your main CSS file or index.js`;
        case 'antd':
          return `import { Card, Button, Typography, Image, Space, List } from 'antd';\nimport 'antd/dist/reset.css';`;
        default:
          return '';
      }
    };

    const fullCode = `import React from 'react';
${getImports()}

const MyApp = () => {
  return (
    <div${framework === 'bootstrap' ? ' className="container my-4"' : framework === 'tailwind' ? ' className="container mx-auto p-5"' : ' style={{ padding: "20px" }}'}>
${components.map(comp => generateComponentCode(comp, 3)).join('\n')}
    </div>
  );
};

export default MyApp;`;

    const blob = new Blob([fullCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'MyApp.jsx';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: '"DM Sans", -apple-system, BlinkMacSystemFont, sans-serif',
      backgroundColor: '#fafafa',
      overflow: 'hidden'
    }}>
      {/* Header */}
      <div style={{
        height: '64px',
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            backgroundColor: '#3b82f6',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '18px'
          }}>
            R
          </div>
          <h1 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111827', letterSpacing: '-0.02em' }}>
            React Builder
          </h1>
          
          {/* Framework Selector */}
          <div style={{ marginLeft: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: '#6b7280', fontWeight: '600' }}>Framework:</label>
            <select
              value={framework}
              onChange={(e) => setFramework(e.target.value)}
              style={{
                padding: '6px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '6px',
                fontSize: '13px',
                fontWeight: '600',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                color: '#374151'
              }}
            >
              {Object.entries(FRAMEWORKS).map(([key, { name, icon }]) => (
                <option key={key} value={key}>{icon} {name}</option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShowGuide(true)}
            style={{
              padding: '8px 16px',
              backgroundColor: '#f3f4f6',
              color: '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <BookOpen size={16} />
            Integration Guide
          </button>
          <button
            onClick={() => setView('design')}
            style={{
              padding: '8px 16px',
              backgroundColor: view === 'design' ? '#3b82f6' : '#f3f4f6',
              color: view === 'design' ? '#ffffff' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Eye size={16} />
            Design
          </button>
          <button
            onClick={() => setView('code')}
            style={{
              padding: '8px 16px',
              backgroundColor: view === 'code' ? '#3b82f6' : '#f3f4f6',
              color: view === 'code' ? '#ffffff' : '#6b7280',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Code size={16} />
            Code
          </button>
          <button
            onClick={downloadCode}
            style={{
              padding: '8px 16px',
              backgroundColor: '#10b981',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s'
            }}
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
        {/* Component Library */}
        <div style={{
          width: '260px',
          backgroundColor: '#ffffff',
          borderRight: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '700', color: '#111827' }}>Components</h2>
            <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Drag or click to add</p>
          </div>
          <div style={{ flex: 1, padding: '12px', overflow: 'auto' }}>
            {/* Layout Components */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Layout
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries(COMPONENT_TEMPLATES)
                  .filter(([_, template]) => template.category === 'layout')
                  .map(([type, template]) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={type}
                        draggable
                        onDragStart={() => setDraggedType(type)}
                        onDragEnd={() => setDraggedType(null)}
                        onClick={() => addComponent(type)}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'grab',
                          transition: 'all 0.2s',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: '#374151',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <Icon size={16} />
                        {template.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Typography Components */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Typography
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries(COMPONENT_TEMPLATES)
                  .filter(([_, template]) => template.category === 'typography')
                  .map(([type, template]) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={type}
                        draggable
                        onDragStart={() => setDraggedType(type)}
                        onDragEnd={() => setDraggedType(null)}
                        onClick={() => addComponent(type)}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'grab',
                          transition: 'all 0.2s',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: '#374151',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <Icon size={16} />
                        {template.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Form Components */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Components
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries(COMPONENT_TEMPLATES)
                  .filter(([_, template]) => template.category === 'components')
                  .map(([type, template]) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={type}
                        draggable
                        onDragStart={() => setDraggedType(type)}
                        onDragEnd={() => setDraggedType(null)}
                        onClick={() => addComponent(type)}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'grab',
                          transition: 'all 0.2s',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: '#374151',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <Icon size={16} />
                        {template.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Media Components */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Media
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries(COMPONENT_TEMPLATES)
                  .filter(([_, template]) => template.category === 'media')
                  .map(([type, template]) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={type}
                        draggable
                        onDragStart={() => setDraggedType(type)}
                        onDragEnd={() => setDraggedType(null)}
                        onClick={() => addComponent(type)}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'grab',
                          transition: 'all 0.2s',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: '#374151',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <Icon size={16} />
                        {template.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Data Components */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Data Display
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries(COMPONENT_TEMPLATES)
                  .filter(([_, template]) => template.category === 'data')
                  .map(([type, template]) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={type}
                        draggable
                        onDragStart={() => setDraggedType(type)}
                        onDragEnd={() => setDraggedType(null)}
                        onClick={() => addComponent(type)}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'grab',
                          transition: 'all 0.2s',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: '#374151',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <Icon size={16} />
                        {template.name}
                      </button>
                    );
                  })}
              </div>
            </div>

            {/* Navigation Components */}
            <div style={{ marginBottom: '16px' }}>
              <h3 style={{ margin: '0 0 8px 0', fontSize: '11px', fontWeight: '700', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Navigation
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {Object.entries(COMPONENT_TEMPLATES)
                  .filter(([_, template]) => template.category === 'navigation')
                  .map(([type, template]) => {
                    const Icon = template.icon;
                    return (
                      <button
                        key={type}
                        draggable
                        onDragStart={() => setDraggedType(type)}
                        onDragEnd={() => setDraggedType(null)}
                        onClick={() => addComponent(type)}
                        style={{
                          padding: '10px 12px',
                          backgroundColor: '#f9fafb',
                          border: '1px solid #e5e7eb',
                          borderRadius: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          cursor: 'grab',
                          transition: 'all 0.2s',
                          fontSize: '13px',
                          fontWeight: '500',
                          color: '#374151',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                          e.currentTarget.style.borderColor = '#d1d5db';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = '#f9fafb';
                          e.currentTarget.style.borderColor = '#e5e7eb';
                        }}
                      >
                        <Icon size={16} />
                        {template.name}
                      </button>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>

        {/* Canvas / Code View */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {view === 'design' ? (
            <div
              onDrop={handleDrop}
              onDragOver={(e) => e.preventDefault()}
              style={{
                flex: 1,
                padding: '32px',
                overflow: 'auto',
                backgroundColor: '#f9fafb'
              }}
            >
              {components.length === 0 ? (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af'
                }}>
                  <Layers size={64} style={{ marginBottom: '16px', opacity: 0.4 }} />
                  <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#6b7280' }}>
                    Start Building
                  </h3>
                  <p style={{ margin: 0, fontSize: '14px' }}>
                    Drag components from the left or click to add them
                  </p>
                </div>
              ) : (
                <div style={{
                  backgroundColor: '#ffffff',
                  borderRadius: '12px',
                  padding: '24px',
                  minHeight: '400px',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  {components.map(component => (
                    <ComponentRenderer
                      key={component.id}
                      component={component}
                      isSelected={selectedId === component.id}
                      onSelect={setSelectedId}
                      onUpdate={updateComponent}
                      onDelete={deleteComponent}
                      onDrop={handleNestedDrop}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <CodePreview components={components} framework={framework} />
          )}
        </div>

        {/* Properties Panel */}
        <div style={{
          width: '300px',
          backgroundColor: '#ffffff',
          borderLeft: '1px solid #e5e7eb',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}>
          <div style={{ padding: '16px', borderBottom: '1px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ margin: 0, fontSize: '14px', fontWeight: '700', color: '#111827' }}>Properties</h2>
            {selectedId && (
              <button
                onClick={() => deleteComponent(selectedId)}
                style={{
                  padding: '6px',
                  backgroundColor: '#fef2f2',
                  color: '#dc2626',
                  border: '1px solid #fecaca',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title="Delete component"
              >
                <Trash2 size={16} />
              </button>
            )}
          </div>
          <div style={{ flex: 1, overflow: 'auto' }}>
            <PropertyEditor
              component={selectedComponent}
              onUpdate={updateComponent}
            />
          </div>
        </div>
      </div>
      
      {/* Integration Guide Modal */}
      {showGuide && <IntegrationGuide framework={framework} onClose={() => setShowGuide(false)} />}
    </div>
  );
}
