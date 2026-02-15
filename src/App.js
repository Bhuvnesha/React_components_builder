import React, { useState, useCallback, useRef } from 'react';
import { Plus, Eye, Code, Download, Trash2, Move, Settings, Play, Layers, Type, Square, Grid, Image, List, FileText, Info, BookOpen } from 'lucide-react';

const FRAMEWORKS = {
  vanilla: { name: 'Vanilla CSS', icon: '🎨' },
  bootstrap: { name: 'Bootstrap', icon: '🅱️' },
  tailwind: { name: 'Tailwind CSS', icon: '🌊' },
  antd: { name: 'Ant Design', icon: '🐜' }
};

const TEMPLATES = {
  loginForm: {
    name: 'Login Form',
    category: 'Forms',
    description: 'Login form with email and password',
    icon: '🔐',
    components: [
      {
        id: 'login-container',
        type: 'container',
        props: {
          padding: '40px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '400px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        },
        children: [
          {
            id: 'login-heading',
            type: 'heading',
            props: {
              text: 'Welcome Back',
              fontSize: '28px',
              fontWeight: '700',
              color: '#111827',
              textAlign: 'center',
              margin: '0 0 8px 0'
            },
            children: []
          },
          {
            id: 'login-subtext',
            type: 'text',
            props: {
              text: 'Sign in to your account',
              fontSize: '14px',
              color: '#6b7280',
              textAlign: 'center',
              margin: '0 0 20px 0'
            },
            children: []
          },
          {
            id: 'email-label',
            type: 'label',
            props: {
              text: 'Email Address',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px',
              display: 'block'
            },
            children: []
          },
          {
            id: 'email-input',
            type: 'input',
            props: {
              placeholder: 'you@example.com',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px',
              width: '100%'
            },
            children: []
          },
          {
            id: 'password-label',
            type: 'label',
            props: {
              text: 'Password',
              fontSize: '14px',
              fontWeight: '600',
              color: '#374151',
              marginBottom: '6px',
              display: 'block'
            },
            children: []
          },
          {
            id: 'password-input',
            type: 'input',
            props: {
              placeholder: '••••••••',
              padding: '10px 12px',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '16px',
              width: '100%'
            },
            children: []
          },
          {
            id: 'remember-checkbox',
            type: 'checkbox',
            props: {
              label: 'Remember me',
              checked: false
            },
            children: []
          },
          {
            id: 'login-button',
            type: 'button',
            props: {
              text: 'Sign In',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              padding: '12px 24px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              width: '100%'
            },
            children: []
          },
          {
            id: 'forgot-link',
            type: 'link',
            props: {
              text: 'Forgot password?',
              href: '#',
              color: '#3b82f6',
              textDecoration: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              textAlign: 'center',
              display: 'block'
            },
            children: []
          }
        ]
      }
    ]
  },
  signupForm: {
    name: 'Signup Form',
    category: 'Forms',
    description: 'Registration form with multiple fields',
    icon: '📝',
    components: [
      {
        id: 'signup-container',
        type: 'container',
        props: {
          padding: '40px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '500px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        },
        children: [
          {
            id: 'signup-heading',
            type: 'heading',
            props: {
              text: 'Create Account',
              fontSize: '28px',
              fontWeight: '700',
              color: '#111827',
              textAlign: 'center',
              margin: '0 0 20px 0'
            },
            children: []
          },
          {
            id: 'name-label',
            type: 'label',
            props: { text: 'Full Name', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' },
            children: []
          },
          {
            id: 'name-input',
            type: 'input',
            props: { placeholder: 'John Doe', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', width: '100%' },
            children: []
          },
          {
            id: 'email-label',
            type: 'label',
            props: { text: 'Email Address', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' },
            children: []
          },
          {
            id: 'email-input',
            type: 'input',
            props: { placeholder: 'you@example.com', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', width: '100%' },
            children: []
          },
          {
            id: 'password-label',
            type: 'label',
            props: { text: 'Password', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' },
            children: []
          },
          {
            id: 'password-input',
            type: 'input',
            props: { placeholder: '••••••••', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', width: '100%' },
            children: []
          },
          {
            id: 'terms-checkbox',
            type: 'checkbox',
            props: { label: 'I agree to the Terms and Conditions', checked: false },
            children: []
          },
          {
            id: 'signup-button',
            type: 'button',
            props: { text: 'Create Account', backgroundColor: '#10b981', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' },
            children: []
          }
        ]
      }
    ]
  },
  dashboardSidebar: {
    name: 'Dashboard with Sidebar',
    category: 'Layouts',
    description: 'Full dashboard layout with sidebar navigation',
    icon: '📊',
    components: [
      {
        id: 'dashboard-wrapper',
        type: 'flexRow',
        props: {
          display: 'flex',
          flexDirection: 'row',
          gap: '0',
          padding: '0',
          backgroundColor: '#f9fafb',
          minHeight: '100vh'
        },
        children: [
          {
            id: 'sidebar',
            type: 'container',
            props: {
              width: '250px',
              backgroundColor: '#1f2937',
              padding: '24px 16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              minHeight: '100vh'
            },
            children: [
              {
                id: 'sidebar-heading',
                type: 'heading',
                props: { text: 'Dashboard', fontSize: '24px', fontWeight: '700', color: '#ffffff', margin: '0 0 24px 0' },
                children: []
              },
              {
                id: 'nav-item-1',
                type: 'button',
                props: { text: '📊 Overview', backgroundColor: '#3b82f6', color: '#ffffff', padding: '10px 16px', borderRadius: '6px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', textAlign: 'left' },
                children: []
              },
              {
                id: 'nav-item-2',
                type: 'button',
                props: { text: '📈 Analytics', backgroundColor: 'transparent', color: '#d1d5db', padding: '10px 16px', borderRadius: '6px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', textAlign: 'left' },
                children: []
              },
              {
                id: 'nav-item-3',
                type: 'button',
                props: { text: '👥 Users', backgroundColor: 'transparent', color: '#d1d5db', padding: '10px 16px', borderRadius: '6px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', textAlign: 'left' },
                children: []
              },
              {
                id: 'nav-item-4',
                type: 'button',
                props: { text: '⚙️ Settings', backgroundColor: 'transparent', color: '#d1d5db', padding: '10px 16px', borderRadius: '6px', border: 'none', fontSize: '14px', fontWeight: '500', cursor: 'pointer', width: '100%', textAlign: 'left' },
                children: []
              }
            ]
          },
          {
            id: 'main-content',
            type: 'container',
            props: {
              flex: '1',
              padding: '32px',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            },
            children: [
              {
                id: 'header',
                type: 'flexRow',
                props: { display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: '0', gap: '16px', backgroundColor: 'transparent' },
                children: [
                  {
                    id: 'page-title',
                    type: 'heading',
                    props: { text: 'Overview', fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0' },
                    children: []
                  },
                  {
                    id: 'avatar',
                    type: 'avatar',
                    props: { src: 'https://via.placeholder.com/40', alt: 'User Avatar', width: '40px', height: '40px', borderRadius: '50%' },
                    children: []
                  }
                ]
              },
              {
                id: 'stats-grid',
                type: 'grid',
                props: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', padding: '0' },
                children: [
                  {
                    id: 'stat-card-1',
                    type: 'card',
                    props: { padding: '24px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' },
                    children: [
                      {
                        id: 'stat-label-1',
                        type: 'text',
                        props: { text: 'Total Users', fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' },
                        children: []
                      },
                      {
                        id: 'stat-value-1',
                        type: 'heading',
                        props: { text: '1,234', fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0' },
                        children: []
                      }
                    ]
                  },
                  {
                    id: 'stat-card-2',
                    type: 'card',
                    props: { padding: '24px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' },
                    children: [
                      {
                        id: 'stat-label-2',
                        type: 'text',
                        props: { text: 'Revenue', fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' },
                        children: []
                      },
                      {
                        id: 'stat-value-2',
                        type: 'heading',
                        props: { text: '$45.2K', fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0' },
                        children: []
                      }
                    ]
                  },
                  {
                    id: 'stat-card-3',
                    type: 'card',
                    props: { padding: '24px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' },
                    children: [
                      {
                        id: 'stat-label-3',
                        type: 'text',
                        props: { text: 'Active Now', fontSize: '14px', color: '#6b7280', margin: '0 0 8px 0' },
                        children: []
                      },
                      {
                        id: 'stat-value-3',
                        type: 'heading',
                        props: { text: '89', fontSize: '32px', fontWeight: '700', color: '#111827', margin: '0' },
                        children: []
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  dashboardNavbar: {
    name: 'Dashboard with Navbar',
    category: 'Layouts',
    description: 'Dashboard with top navigation bar',
    icon: '🎯',
    components: [
      {
        id: 'navbar-wrapper',
        type: 'container',
        props: {
          padding: '0',
          backgroundColor: '#ffffff',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
          minHeight: '100vh'
        },
        children: [
          {
            id: 'navbar',
            type: 'navbar',
            props: {
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '16px 32px',
              backgroundColor: '#ffffff',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              borderBottom: '1px solid #e5e7eb'
            },
            children: [
              {
                id: 'brand',
                type: 'heading',
                props: { text: 'MyApp', fontSize: '24px', fontWeight: '700', color: '#111827', margin: '0' },
                children: []
              },
              {
                id: 'nav-links',
                type: 'flexRow',
                props: { display: 'flex', gap: '24px', padding: '0', backgroundColor: 'transparent', alignItems: 'center' },
                children: [
                  {
                    id: 'nav-link-1',
                    type: 'link',
                    props: { text: 'Dashboard', href: '#', color: '#3b82f6', textDecoration: 'none', fontSize: '14px', fontWeight: '600' },
                    children: []
                  },
                  {
                    id: 'nav-link-2',
                    type: 'link',
                    props: { text: 'Projects', href: '#', color: '#6b7280', textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
                    children: []
                  },
                  {
                    id: 'nav-link-3',
                    type: 'link',
                    props: { text: 'Team', href: '#', color: '#6b7280', textDecoration: 'none', fontSize: '14px', fontWeight: '500' },
                    children: []
                  },
                  {
                    id: 'profile-avatar',
                    type: 'avatar',
                    props: { src: 'https://via.placeholder.com/36', alt: 'Profile', width: '36px', height: '36px', borderRadius: '50%' },
                    children: []
                  }
                ]
              }
            ]
          },
          {
            id: 'content-area',
            type: 'container',
            props: {
              padding: '32px',
              backgroundColor: '#f9fafb',
              flex: '1',
              display: 'flex',
              flexDirection: 'column',
              gap: '24px'
            },
            children: [
              {
                id: 'welcome-card',
                type: 'card',
                props: { padding: '32px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' },
                children: [
                  {
                    id: 'welcome-heading',
                    type: 'heading',
                    props: { text: 'Welcome back!', fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' },
                    children: []
                  },
                  {
                    id: 'welcome-text',
                    type: 'text',
                    props: { text: 'Here\'s what\'s happening with your projects today.', fontSize: '16px', color: '#6b7280', margin: '0' },
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  pricingCards: {
    name: 'Pricing Cards',
    category: 'Marketing',
    description: 'Three-tier pricing table',
    icon: '💰',
    components: [
      {
        id: 'pricing-wrapper',
        type: 'container',
        props: {
          padding: '48px 32px',
          backgroundColor: '#f9fafb',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          alignItems: 'center'
        },
        children: [
          {
            id: 'pricing-header',
            type: 'heading',
            props: { text: 'Choose Your Plan', fontSize: '36px', fontWeight: '700', color: '#111827', textAlign: 'center', margin: '0' },
            children: []
          },
          {
            id: 'pricing-grid',
            type: 'grid',
            props: { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', padding: '0', maxWidth: '1200px' },
            children: [
              {
                id: 'basic-card',
                type: 'card',
                props: { padding: '32px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' },
                children: [
                  {
                    id: 'basic-name',
                    type: 'subheading',
                    props: { text: 'Basic', fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' },
                    children: []
                  },
                  {
                    id: 'basic-price',
                    type: 'heading',
                    props: { text: '$9', fontSize: '48px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' },
                    children: []
                  },
                  {
                    id: 'basic-period',
                    type: 'text',
                    props: { text: 'per month', fontSize: '14px', color: '#6b7280', margin: '0 0 24px 0' },
                    children: []
                  },
                  {
                    id: 'basic-button',
                    type: 'buttonOutline',
                    props: { text: 'Get Started', backgroundColor: 'transparent', color: '#3b82f6', padding: '12px 24px', borderRadius: '6px', border: '2px solid #3b82f6', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' },
                    children: []
                  }
                ]
              },
              {
                id: 'pro-card',
                type: 'card',
                props: { padding: '32px', backgroundColor: '#3b82f6', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', border: '2px solid #3b82f6' },
                children: [
                  {
                    id: 'pro-badge',
                    type: 'badge',
                    props: { text: 'Popular', backgroundColor: '#1e40af', color: '#ffffff', padding: '4px 12px', borderRadius: '12px', fontSize: '12px', fontWeight: '600', display: 'inline-block', marginBottom: '8px' },
                    children: []
                  },
                  {
                    id: 'pro-name',
                    type: 'subheading',
                    props: { text: 'Pro', fontSize: '20px', fontWeight: '600', color: '#ffffff', margin: '0 0 8px 0' },
                    children: []
                  },
                  {
                    id: 'pro-price',
                    type: 'heading',
                    props: { text: '$29', fontSize: '48px', fontWeight: '700', color: '#ffffff', margin: '0 0 4px 0' },
                    children: []
                  },
                  {
                    id: 'pro-period',
                    type: 'text',
                    props: { text: 'per month', fontSize: '14px', color: '#dbeafe', margin: '0 0 24px 0' },
                    children: []
                  },
                  {
                    id: 'pro-button',
                    type: 'button',
                    props: { text: 'Get Started', backgroundColor: '#ffffff', color: '#3b82f6', padding: '12px 24px', borderRadius: '6px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' },
                    children: []
                  }
                ]
              },
              {
                id: 'enterprise-card',
                type: 'card',
                props: { padding: '32px', backgroundColor: '#ffffff', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' },
                children: [
                  {
                    id: 'enterprise-name',
                    type: 'subheading',
                    props: { text: 'Enterprise', fontSize: '20px', fontWeight: '600', color: '#111827', margin: '0 0 8px 0' },
                    children: []
                  },
                  {
                    id: 'enterprise-price',
                    type: 'heading',
                    props: { text: '$99', fontSize: '48px', fontWeight: '700', color: '#111827', margin: '0 0 4px 0' },
                    children: []
                  },
                  {
                    id: 'enterprise-period',
                    type: 'text',
                    props: { text: 'per month', fontSize: '14px', color: '#6b7280', margin: '0 0 24px 0' },
                    children: []
                  },
                  {
                    id: 'enterprise-button',
                    type: 'buttonOutline',
                    props: { text: 'Contact Sales', backgroundColor: 'transparent', color: '#3b82f6', padding: '12px 24px', borderRadius: '6px', border: '2px solid #3b82f6', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' },
                    children: []
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  contactForm: {
    name: 'Contact Form',
    category: 'Forms',
    description: 'Contact form with message field',
    icon: '📧',
    components: [
      {
        id: 'contact-container',
        type: 'container',
        props: {
          padding: '40px',
          backgroundColor: '#ffffff',
          borderRadius: '12px',
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          maxWidth: '600px',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        },
        children: [
          {
            id: 'contact-heading',
            type: 'heading',
            props: { text: 'Get In Touch', fontSize: '28px', fontWeight: '700', color: '#111827', margin: '0 0 8px 0' },
            children: []
          },
          {
            id: 'contact-desc',
            type: 'text',
            props: { text: 'Have a question? We\'d love to hear from you.', fontSize: '14px', color: '#6b7280', margin: '0 0 20px 0' },
            children: []
          },
          {
            id: 'name-label',
            type: 'label',
            props: { text: 'Your Name', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' },
            children: []
          },
          {
            id: 'name-input',
            type: 'input',
            props: { placeholder: 'John Doe', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', width: '100%' },
            children: []
          },
          {
            id: 'email-label',
            type: 'label',
            props: { text: 'Email Address', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' },
            children: []
          },
          {
            id: 'email-input',
            type: 'input',
            props: { placeholder: 'you@example.com', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', width: '100%' },
            children: []
          },
          {
            id: 'message-label',
            type: 'label',
            props: { text: 'Message', fontSize: '14px', fontWeight: '600', color: '#374151', marginBottom: '6px', display: 'block' },
            children: []
          },
          {
            id: 'message-textarea',
            type: 'textarea',
            props: { placeholder: 'Your message...', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '16px', width: '100%', minHeight: '120px', resize: 'vertical' },
            children: []
          },
          {
            id: 'submit-button',
            type: 'button',
            props: { text: 'Send Message', backgroundColor: '#3b82f6', color: '#ffffff', padding: '12px 24px', borderRadius: '6px', border: 'none', fontSize: '16px', fontWeight: '600', cursor: 'pointer', width: '100%' },
            children: []
          }
        ]
      }
    ]
  }
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
  },
  form: {
    name: 'Form',
    icon: FileText,
    category: 'components',
    defaultProps: {
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      border: '1px solid #e5e7eb',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    tag: 'form',
    frameworks: {
      bootstrap: { className: 'form p-4 border rounded' },
      tailwind: { className: 'p-6 bg-white border border-gray-200 rounded-lg flex flex-col gap-4' },
      antd: { component: 'Form', props: { layout: 'vertical' } }
    }
  },
  label: {
    name: 'Label',
    icon: Type,
    category: 'components',
    defaultProps: {
      text: 'Label Text',
      fontSize: '14px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '6px',
      display: 'block'
    },
    tag: 'label',
    frameworks: {
      bootstrap: { className: 'form-label fw-semibold' },
      tailwind: { className: 'block text-sm font-semibold text-gray-700 mb-1' },
      antd: { component: 'Typography.Text', props: { strong: true } }
    }
  },
  switch: {
    name: 'Switch',
    icon: Square,
    category: 'components',
    defaultProps: {
      checked: false,
      label: 'Toggle switch'
    },
    tag: 'input',
    inputType: 'checkbox',
    frameworks: {
      bootstrap: { className: 'form-check form-switch' },
      tailwind: { className: 'relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200' },
      antd: { component: 'Switch', props: {} }
    }
  },
  slider: {
    name: 'Slider',
    icon: Square,
    category: 'components',
    defaultProps: {
      min: 0,
      max: 100,
      value: 50,
      width: '100%'
    },
    tag: 'input',
    inputType: 'range',
    frameworks: {
      bootstrap: { className: 'form-range' },
      tailwind: { className: 'w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer' },
      antd: { component: 'Slider', props: {} }
    }
  },
  spinner: {
    name: 'Spinner',
    icon: Play,
    category: 'components',
    defaultProps: {
      size: '40px',
      color: '#3b82f6',
      borderWidth: '4px'
    },
    frameworks: {
      bootstrap: { className: 'spinner-border text-primary' },
      tailwind: { className: 'animate-spin rounded-full border-4 border-blue-500 border-t-transparent w-10 h-10' },
      antd: { component: 'Spin', props: {} }
    }
  },
  tooltip: {
    name: 'Tooltip',
    icon: Info,
    category: 'components',
    defaultProps: {
      text: 'Hover me',
      tooltipText: 'Tooltip content',
      position: 'top'
    },
    frameworks: {
      bootstrap: { className: 'btn btn-secondary', dataToggle: 'tooltip' },
      tailwind: { className: 'relative group inline-block' },
      antd: { component: 'Tooltip', props: { title: 'Tooltip content' } }
    }
  },
  modal: {
    name: 'Modal',
    icon: Square,
    category: 'components',
    defaultProps: {
      title: 'Modal Title',
      content: 'Modal content goes here',
      width: '500px',
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '12px'
    },
    frameworks: {
      bootstrap: { className: 'modal-dialog' },
      tailwind: { className: 'bg-white rounded-xl p-6 max-w-lg mx-auto' },
      antd: { component: 'Modal', props: { title: 'Modal Title' } }
    }
  },
  accordion: {
    name: 'Accordion',
    icon: List,
    category: 'components',
    defaultProps: {
      items: ['Section 1', 'Section 2', 'Section 3'],
      borderRadius: '6px',
      border: '1px solid #e5e7eb'
    },
    frameworks: {
      bootstrap: { className: 'accordion' },
      tailwind: { className: 'border border-gray-200 rounded-md' },
      antd: { component: 'Collapse', props: {} }
    }
  },
  pagination: {
    name: 'Pagination',
    icon: Grid,
    category: 'navigation',
    defaultProps: {
      currentPage: 1,
      totalPages: 5,
      display: 'flex',
      gap: '4px'
    },
    frameworks: {
      bootstrap: { className: 'pagination' },
      tailwind: { className: 'flex gap-1' },
      antd: { component: 'Pagination', props: { total: 50 } }
    }
  },
  dropdown: {
    name: 'Dropdown',
    icon: List,
    category: 'components',
    defaultProps: {
      buttonText: 'Dropdown',
      items: ['Action 1', 'Action 2', 'Action 3']
    },
    frameworks: {
      bootstrap: { className: 'dropdown' },
      tailwind: { className: 'relative inline-block' },
      antd: { component: 'Dropdown', props: {} }
    }
  },
  tag: {
    name: 'Tag',
    icon: Square,
    category: 'components',
    defaultProps: {
      text: 'Tag',
      backgroundColor: '#eff6ff',
      color: '#1e40af',
      padding: '4px 10px',
      borderRadius: '4px',
      fontSize: '12px',
      fontWeight: '500',
      display: 'inline-block',
      border: '1px solid #bfdbfe'
    },
    tag: 'span',
    frameworks: {
      bootstrap: { className: 'badge bg-primary-subtle text-primary-emphasis border border-primary-subtle' },
      tailwind: { className: 'inline-block bg-blue-50 text-blue-800 px-2.5 py-1 rounded text-xs font-medium border border-blue-200' },
      antd: { component: 'Tag', props: {} }
    }
  },
  skeleton: {
    name: 'Skeleton',
    icon: Square,
    category: 'components',
    defaultProps: {
      height: '20px',
      width: '100%',
      backgroundColor: '#e5e7eb',
      borderRadius: '4px'
    },
    frameworks: {
      bootstrap: { className: 'placeholder' },
      tailwind: { className: 'animate-pulse bg-gray-200 rounded' },
      antd: { component: 'Skeleton', props: { active: true } }
    }
  },
  stepper: {
    name: 'Stepper',
    icon: Grid,
    category: 'navigation',
    defaultProps: {
      steps: ['Step 1', 'Step 2', 'Step 3'],
      currentStep: 1,
      display: 'flex',
      gap: '16px',
      alignItems: 'center'
    },
    frameworks: {
      bootstrap: { className: 'd-flex align-items-center gap-3' },
      tailwind: { className: 'flex items-center gap-4' },
      antd: { component: 'Steps', props: { current: 0 } }
    }
  },
  rating: {
    name: 'Rating',
    icon: Square,
    category: 'components',
    defaultProps: {
      stars: 5,
      value: 3,
      color: '#fbbf24',
      size: '24px'
    },
    frameworks: {
      bootstrap: { className: 'd-flex gap-1' },
      tailwind: { className: 'flex gap-1 text-yellow-400' },
      antd: { component: 'Rate', props: { defaultValue: 3 } }
    }
  },
  empty: {
    name: 'Empty State',
    icon: Square,
    category: 'components',
    defaultProps: {
      text: 'No data available',
      padding: '48px 24px',
      textAlign: 'center',
      color: '#9ca3af',
      backgroundColor: '#f9fafb',
      borderRadius: '8px'
    },
    frameworks: {
      bootstrap: { className: 'text-center p-5 bg-light rounded' },
      tailwind: { className: 'text-center py-12 px-6 bg-gray-50 rounded-lg text-gray-400' },
      antd: { component: 'Empty', props: {} }
    }
  },
  code: {
    name: 'Code Block',
    icon: Code,
    category: 'typography',
    defaultProps: {
      text: 'const example = "code";',
      backgroundColor: '#1e1e1e',
      color: '#d4d4d4',
      padding: '16px',
      borderRadius: '6px',
      fontSize: '14px',
      fontFamily: 'monospace',
      overflow: 'auto'
    },
    tag: 'pre',
    frameworks: {
      bootstrap: { className: 'bg-dark text-light p-3 rounded' },
      tailwind: { className: 'bg-gray-900 text-gray-100 p-4 rounded-md text-sm font-mono overflow-auto' },
      antd: { component: 'Typography.Text', props: { code: true } }
    }
  },
  timeline: {
    name: 'Timeline',
    icon: List,
    category: 'data',
    defaultProps: {
      items: ['Event 1', 'Event 2', 'Event 3'],
      padding: '16px',
      borderLeft: '2px solid #e5e7eb'
    },
    frameworks: {
      bootstrap: { className: 'list-group' },
      tailwind: { className: 'border-l-2 border-gray-200 pl-4' },
      antd: { component: 'Timeline', props: {} }
    }
  },
  statistic: {
    name: 'Statistic',
    icon: Type,
    category: 'data',
    defaultProps: {
      label: 'Total Users',
      value: '1,234',
      fontSize: '32px',
      fontWeight: '700',
      color: '#111827',
      labelColor: '#6b7280',
      labelSize: '14px'
    },
    frameworks: {
      bootstrap: { className: 'text-center' },
      tailwind: { className: 'text-center' },
      antd: { component: 'Statistic', props: { title: 'Total Users', value: 1234 } }
    }
  },
  iconButton: {
    name: 'Icon Button',
    icon: Square,
    category: 'components',
    defaultProps: {
      text: '✓',
      width: '40px',
      height: '40px',
      backgroundColor: '#3b82f6',
      color: '#ffffff',
      borderRadius: '8px',
      border: 'none',
      fontSize: '18px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    tag: 'button',
    frameworks: {
      bootstrap: { className: 'btn btn-primary btn-sm' },
      tailwind: { className: 'w-10 h-10 bg-blue-500 text-white rounded-lg flex items-center justify-center hover:bg-blue-600' },
      antd: { component: 'Button', props: { shape: 'circle', icon: true } }
    }
  },
  buttonGroup: {
    name: 'Button Group',
    icon: Grid,
    category: 'components',
    defaultProps: {
      buttons: ['Button 1', 'Button 2', 'Button 3'],
      display: 'flex',
      gap: '0'
    },
    frameworks: {
      bootstrap: { className: 'btn-group' },
      tailwind: { className: 'inline-flex rounded-lg shadow-sm' },
      antd: { component: 'Button.Group', props: {} }
    }
  }
};

// Preview-only component renderer (no editing, selection, or outlines)
const PreviewRenderer = ({ component }) => {
  const template = COMPONENT_TEMPLATES[component.type];
  
  const renderChildren = () => {
    if (component.children && component.children.length > 0) {
      return component.children.map(child => (
        <PreviewRenderer key={child.id} component={child} />
      ));
    }
    return null;
  };

  const componentStyle = {
    ...component.props,
    position: component.props.position || 'relative'
  };

  const renderComponent = () => {
    const Tag = template?.tag || 'div';
    
    // List component
    if (component.type === 'list') {
      return (
        <Tag style={componentStyle}>
          {component.props.items?.map((item, idx) => (
            <li key={idx} style={{ margin: '4px 0' }}>{item}</li>
          ))}
        </Tag>
      );
    }
    
    // Image/Avatar component
    if (component.type === 'image' || component.type === 'avatar') {
      return <Tag {...component.props} style={componentStyle} />;
    }
    
    // Select component
    if (component.type === 'select') {
      return (
        <Tag style={componentStyle}>
          {component.props.options?.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </Tag>
      );
    }
    
    // Checkbox component
    if (component.type === 'checkbox') {
      return (
        <label style={{ ...componentStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={component.props.checked} onChange={() => {}} />
          <span>{component.props.label}</span>
        </label>
      );
    }
    
    // Radio component
    if (component.type === 'radio') {
      return (
        <label style={{ ...componentStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="radio" name={component.props.name} />
          <span>{component.props.label}</span>
        </label>
      );
    }
    
    // Progress component
    if (component.type === 'progress') {
      return (
        <div style={componentStyle}>
          <Tag value={component.props.value} max={component.props.max} style={{ width: '100%', height: component.props.height }} />
        </div>
      );
    }
    
    // Table component
    if (component.type === 'table') {
      return (
        <Tag style={componentStyle}>
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
        <div style={componentStyle}>
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
        <div style={componentStyle}>
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
      return <Tag placeholder={component.props.placeholder} style={componentStyle} />;
    }
    
    // Link
    if (component.type === 'link') {
      return <Tag href={component.props.href} style={componentStyle}>{component.props.text}</Tag>;
    }
    
    // Divider
    if (component.type === 'divider') {
      return <Tag style={componentStyle} />;
    }
    
    // Switch
    if (component.type === 'switch') {
      return (
        <label style={{ ...componentStyle, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <input type="checkbox" checked={component.props.checked} onChange={() => {}} />
          <span>{component.props.label}</span>
        </label>
      );
    }
    
    // Slider
    if (component.type === 'slider') {
      return (
        <input 
          type="range" 
          min={component.props.min} 
          max={component.props.max} 
          value={component.props.value} 
          style={componentStyle}
          onChange={() => {}}
        />
      );
    }
    
    // Spinner
    if (component.type === 'spinner') {
      return (
        <div 
          style={{
            ...componentStyle,
            width: component.props.size,
            height: component.props.size,
            border: `${component.props.borderWidth} solid ${component.props.color}`,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}
        />
      );
    }
    
    // Skeleton
    if (component.type === 'skeleton') {
      return (
        <div 
          style={{
            ...componentStyle,
            animation: 'pulse 2s infinite'
          }}
        />
      );
    }
    
    // Modal
    if (component.type === 'modal') {
      return (
        <div style={{
          ...componentStyle,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>{component.props.title}</h3>
          <p style={{ margin: 0 }}>{component.props.content}</p>
        </div>
      );
    }
    
    // Accordion
    if (component.type === 'accordion') {
      return (
        <div style={componentStyle}>
          {component.props.items?.map((item, idx) => (
            <div key={idx} style={{ padding: '12px', borderBottom: idx < component.props.items.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
              {item}
            </div>
          ))}
        </div>
      );
    }
    
    // Dropdown
    if (component.type === 'dropdown') {
      return (
        <div style={componentStyle}>
          <button style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#ffffff', cursor: 'pointer' }}>
            {component.props.buttonText} ▼
          </button>
        </div>
      );
    }
    
    // Pagination
    if (component.type === 'pagination') {
      return (
        <div style={componentStyle}>
          {Array.from({ length: component.props.totalPages }, (_, i) => (
            <button 
              key={i} 
              style={{ 
                padding: '6px 12px', 
                border: '1px solid #d1d5db', 
                backgroundColor: i + 1 === component.props.currentPage ? '#3b82f6' : '#ffffff',
                color: i + 1 === component.props.currentPage ? '#ffffff' : '#374151',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    }
    
    // Stepper
    if (component.type === 'stepper') {
      return (
        <div style={componentStyle}>
          {component.props.steps?.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: idx + 1 <= component.props.currentStep ? '#3b82f6' : '#e5e7eb',
                color: idx + 1 <= component.props.currentStep ? '#ffffff' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {idx + 1}
              </div>
              <span style={{ color: idx + 1 <= component.props.currentStep ? '#111827' : '#6b7280' }}>{step}</span>
              {idx < component.props.steps.length - 1 && (
                <div style={{ width: '40px', height: '2px', backgroundColor: '#e5e7eb', margin: '0 8px' }} />
              )}
            </div>
          ))}
        </div>
      );
    }
    
    // Rating
    if (component.type === 'rating') {
      return (
        <div style={componentStyle}>
          {Array.from({ length: component.props.stars }, (_, i) => (
            <span key={i} style={{ fontSize: component.props.size, color: i < component.props.value ? component.props.color : '#d1d5db' }}>
              ★
            </span>
          ))}
        </div>
      );
    }
    
    // Timeline
    if (component.type === 'timeline') {
      return (
        <div style={componentStyle}>
          {component.props.items?.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '16px', paddingLeft: '16px', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-5px',
                top: '4px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6'
              }} />
              {item}
            </div>
          ))}
        </div>
      );
    }
    
    // Statistic
    if (component.type === 'statistic') {
      return (
        <div style={componentStyle}>
          <div style={{ fontSize: component.props.labelSize, color: component.props.labelColor, marginBottom: '8px' }}>
            {component.props.label}
          </div>
          <div style={{ fontSize: component.props.fontSize, fontWeight: component.props.fontWeight, color: component.props.color }}>
            {component.props.value}
          </div>
        </div>
      );
    }
    
    // Button Group
    if (component.type === 'buttonGroup') {
      return (
        <div style={componentStyle}>
          {component.props.buttons?.map((btn, idx) => (
            <button 
              key={idx} 
              style={{ 
                padding: '8px 16px', 
                border: '1px solid #d1d5db',
                borderRight: idx < component.props.buttons.length - 1 ? 'none' : '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                borderRadius: idx === 0 ? '6px 0 0 6px' : idx === component.props.buttons.length - 1 ? '0 6px 6px 0' : '0'
              }}
            >
              {btn}
            </button>
          ))}
        </div>
      );
    }
    
    // Tooltip
    if (component.type === 'tooltip') {
      return (
        <div style={{ position: 'relative', display: 'inline-block', ...componentStyle }}>
          <span>{component.props.text}</span>
        </div>
      );
    }
    
    // Code block
    if (component.type === 'code') {
      return (
        <Tag style={componentStyle}>
          <code>{component.props.text}</code>
        </Tag>
      );
    }
    
    // Form (container)
    if (component.type === 'form') {
      return (
        <Tag style={componentStyle} onSubmit={(e) => e.preventDefault()}>
          {renderChildren()}
        </Tag>
      );
    }

    // Container components that can accept children
    const isContainer = ['container', 'card', 'grid', 'flexRow', 'flexColumn', 'navbar', 'form'].includes(component.type);
    if (isContainer) {
      return (
        <Tag style={componentStyle}>
          {component.props.text}
          {renderChildren()}
        </Tag>
      );
    }

    // Default text-based components
    return (
      <Tag style={componentStyle}>
        {component.props.text}
      </Tag>
    );
  };

  return renderComponent();
};

const ComponentRenderer = ({ component, selectedId, onSelect, onUpdate, onDelete, onDrop, level = 0 }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const template = COMPONENT_TEMPLATES[component.type];
  const isSelected = component.id === selectedId;
  
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

  const handleMouseEnter = (e) => {
    e.stopPropagation();
    setIsHovered(true);
  };

  const handleMouseLeave = (e) => {
    e.stopPropagation();
    setIsHovered(false);
  };

  const renderChildren = () => {
    if (component.children && component.children.length > 0) {
      return component.children.map(child => (
        <ComponentRenderer
          key={child.id}
          component={child}
          selectedId={selectedId}
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

  const isContainer = ['container', 'card', 'grid', 'flexRow', 'flexColumn', 'navbar', 'form'].includes(component.type);

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
        <Tag style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {component.props.items?.map((item, idx) => (
            <li key={idx} style={{ margin: '4px 0' }}>{item}</li>
          ))}
        </Tag>
      );
    }
    
    // Image/Avatar component
    if (component.type === 'image' || component.type === 'avatar') {
      return <Tag {...component.props} style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
    }
    
    // Select component
    if (component.type === 'select') {
      return (
        <Tag style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {component.props.options?.map((option, idx) => (
            <option key={idx}>{option}</option>
          ))}
        </Tag>
      );
    }
    
    // Checkbox component
    if (component.type === 'checkbox') {
      return (
        <label style={{ ...componentStyle, display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <input type="checkbox" checked={component.props.checked} readOnly style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()} />
          <span>{component.props.label}</span>
        </label>
      );
    }
    
    // Radio component
    if (component.type === 'radio') {
      return (
        <label style={{ ...componentStyle, display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <input type="radio" name={component.props.name} style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()} />
          <span>{component.props.label}</span>
        </label>
      );
    }
    
    // Progress component
    if (component.type === 'progress') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <Tag value={component.props.value} max={component.props.max} style={{ width: '100%', height: component.props.height }} />
        </div>
      );
    }
    
    // Table component
    if (component.type === 'table') {
      return (
        <Tag style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {component.props.tabs?.map((tab, idx) => (
            <button key={idx} style={{ 
              padding: '8px 16px', 
              border: 'none', 
              backgroundColor: idx === 0 ? '#3b82f6' : 'transparent',
              color: idx === 0 ? '#ffffff' : '#6b7280',
              borderRadius: '6px 6px 0 0',
              cursor: 'pointer',
              fontWeight: '600'
            }} onClick={(e) => e.preventDefault()}>
              {tab}
            </button>
          ))}
        </div>
      );
    }
    
    // Breadcrumb component
    if (component.type === 'breadcrumb') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
      return <Tag placeholder={component.props.placeholder} style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} readOnly />;
    }
    
    // Link
    if (component.type === 'link') {
      return <Tag href={component.props.href} style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>{component.props.text}</Tag>;
    }
    
    // Divider
    if (component.type === 'divider') {
      return <Tag style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} />;
    }
    
    // Switch
    if (component.type === 'switch') {
      return (
        <label style={{ ...componentStyle, display: 'flex', alignItems: 'center', gap: '8px' }} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <input type="checkbox" checked={component.props.checked} readOnly style={{ cursor: 'pointer' }} onClick={(e) => e.preventDefault()} />
          <span>{component.props.label}</span>
        </label>
      );
    }
    
    // Slider
    if (component.type === 'slider') {
      return (
        <input 
          type="range" 
          min={component.props.min} 
          max={component.props.max} 
          value={component.props.value} 
          style={componentStyle} 
          onClick={handleClick} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
          readOnly 
        />
      );
    }
    
    // Spinner
    if (component.type === 'spinner') {
      return (
        <div 
          style={{
            ...componentStyle,
            width: component.props.size,
            height: component.props.size,
            border: `${component.props.borderWidth} solid ${component.props.color}`,
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }} 
          onClick={handleClick} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
        />
      );
    }
    
    // Skeleton
    if (component.type === 'skeleton') {
      return (
        <div 
          style={{
            ...componentStyle,
            animation: 'pulse 2s infinite'
          }} 
          onClick={handleClick} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave} 
        />
      );
    }
    
    // Modal
    if (component.type === 'modal') {
      return (
        <div style={{
          ...componentStyle,
          boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)'
        }} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <h3 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600' }}>{component.props.title}</h3>
          <p style={{ margin: 0 }}>{component.props.content}</p>
        </div>
      );
    }
    
    // Accordion
    if (component.type === 'accordion') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {component.props.items?.map((item, idx) => (
            <div key={idx} style={{ padding: '12px', borderBottom: idx < component.props.items.length - 1 ? '1px solid #e5e7eb' : 'none' }}>
              {item}
            </div>
          ))}
        </div>
      );
    }
    
    // Dropdown
    if (component.type === 'dropdown') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <button style={{ padding: '8px 16px', border: '1px solid #d1d5db', borderRadius: '6px', backgroundColor: '#ffffff', cursor: 'pointer' }}>
            {component.props.buttonText} ▼
          </button>
        </div>
      );
    }
    
    // Pagination
    if (component.type === 'pagination') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {Array.from({ length: component.props.totalPages }, (_, i) => (
            <button 
              key={i} 
              style={{ 
                padding: '6px 12px', 
                border: '1px solid #d1d5db', 
                backgroundColor: i + 1 === component.props.currentPage ? '#3b82f6' : '#ffffff',
                color: i + 1 === component.props.currentPage ? '#ffffff' : '#374151',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
              onClick={(e) => e.preventDefault()}
            >
              {i + 1}
            </button>
          ))}
        </div>
      );
    }
    
    // Stepper
    if (component.type === 'stepper') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {component.props.steps?.map((step, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: idx + 1 <= component.props.currentStep ? '#3b82f6' : '#e5e7eb',
                color: idx + 1 <= component.props.currentStep ? '#ffffff' : '#6b7280',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600',
                fontSize: '14px'
              }}>
                {idx + 1}
              </div>
              <span style={{ color: idx + 1 <= component.props.currentStep ? '#111827' : '#6b7280' }}>{step}</span>
              {idx < component.props.steps.length - 1 && (
                <div style={{ width: '40px', height: '2px', backgroundColor: '#e5e7eb', margin: '0 8px' }} />
              )}
            </div>
          ))}
        </div>
      );
    }
    
    // Rating
    if (component.type === 'rating') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {Array.from({ length: component.props.stars }, (_, i) => (
            <span key={i} style={{ fontSize: component.props.size, color: i < component.props.value ? component.props.color : '#d1d5db' }}>
              ★
            </span>
          ))}
        </div>
      );
    }
    
    // Timeline
    if (component.type === 'timeline') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {component.props.items?.map((item, idx) => (
            <div key={idx} style={{ marginBottom: '16px', paddingLeft: '16px', position: 'relative' }}>
              <div style={{
                position: 'absolute',
                left: '-5px',
                top: '4px',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: '#3b82f6'
              }} />
              {item}
            </div>
          ))}
        </div>
      );
    }
    
    // Statistic
    if (component.type === 'statistic') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <div style={{ fontSize: component.props.labelSize, color: component.props.labelColor, marginBottom: '8px' }}>
            {component.props.label}
          </div>
          <div style={{ fontSize: component.props.fontSize, fontWeight: component.props.fontWeight, color: component.props.color }}>
            {component.props.value}
          </div>
        </div>
      );
    }
    
    // Button Group
    if (component.type === 'buttonGroup') {
      return (
        <div style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {component.props.buttons?.map((btn, idx) => (
            <button 
              key={idx} 
              style={{ 
                padding: '8px 16px', 
                border: '1px solid #d1d5db',
                borderRight: idx < component.props.buttons.length - 1 ? 'none' : '1px solid #d1d5db',
                backgroundColor: '#ffffff',
                cursor: 'pointer',
                borderRadius: idx === 0 ? '6px 0 0 6px' : idx === component.props.buttons.length - 1 ? '0 6px 6px 0' : '0'
              }}
              onClick={(e) => e.preventDefault()}
            >
              {btn}
            </button>
          ))}
        </div>
      );
    }
    
    // Tooltip
    if (component.type === 'tooltip') {
      return (
        <div style={{ position: 'relative', display: 'inline-block', ...componentStyle }} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <span>{component.props.text}</span>
          <div style={{
            position: 'absolute',
            bottom: '100%',
            left: '50%',
            transform: 'translateX(-50%)',
            marginBottom: '8px',
            padding: '6px 12px',
            backgroundColor: '#1f2937',
            color: '#ffffff',
            fontSize: '12px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            opacity: 0.9
          }}>
            {component.props.tooltipText}
          </div>
        </div>
      );
    }
    
    // Code block
    if (component.type === 'code') {
      return (
        <Tag style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          <code>{component.props.text}</code>
        </Tag>
      );
    }
    
    // Form (container)
    if (component.type === 'form') {
      const children = renderChildren();
      const hasChildren = component.children && component.children.length > 0;
      
      return (
        <Tag 
          style={componentStyle} 
          onClick={handleClick} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onSubmit={(e) => e.preventDefault()}
        >
          {!hasChildren && (
            <div 
              style={{
                padding: '20px',
                border: '2px dashed #d1d5db',
                borderRadius: '6px',
                color: '#9ca3af',
                fontSize: '13px',
                textAlign: 'center',
                backgroundColor: isDragOver ? '#eff6ff' : 'transparent',
                pointerEvents: 'none'
              }}
            >
              Drop form elements here
            </div>
          )}
          {children}
        </Tag>
      );
    }

    // Container components that can accept children
    if (isContainer) {
      const children = renderChildren();
      const hasChildren = component.children && component.children.length > 0;
      
      return (
        <Tag 
          style={componentStyle} 
          onClick={handleClick} 
          onMouseEnter={handleMouseEnter} 
          onMouseLeave={handleMouseLeave}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {component.props.text}
          {!hasChildren && isContainer && (
            <div 
              style={{
                padding: '20px',
                border: '2px dashed #d1d5db',
                borderRadius: '6px',
                color: '#9ca3af',
                fontSize: '13px',
                textAlign: 'center',
                backgroundColor: isDragOver ? '#eff6ff' : 'transparent',
                pointerEvents: 'none'
              }}
            >
              Drop components here
            </div>
          )}
          {children}
        </Tag>
      );
    }

    // Default text-based components
    return (
      <Tag style={componentStyle} onClick={handleClick} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {component.props.text}
      </Tag>
    );
  };

  return renderComponent();
};

const PropertyEditor = ({ component, onUpdate, onAddChild, components, onSelect }) => {
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

  const isContainer = ['container', 'card', 'grid', 'flexRow', 'flexColumn', 'navbar', 'form'].includes(component.type);

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

  const renderChildTree = (children, depth = 0) => {
    if (!children || children.length === 0) return null;
    
    return children.map((child) => (
      <div key={child.id} style={{ marginLeft: `${depth * 12}px` }}>
        <button
          onClick={() => onSelect(child.id)}
          style={{
            width: '100%',
            padding: '6px 8px',
            backgroundColor: 'transparent',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            color: '#374151',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '2px'
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f3f4f6'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <div style={{ width: '4px', height: '4px', backgroundColor: '#9ca3af', borderRadius: '50%' }} />
          {COMPONENT_TEMPLATES[child.type]?.name || child.type}
        </button>
        {child.children && child.children.length > 0 && renderChildTree(child.children, depth + 1)}
      </div>
    ));
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#111827' }}>
          {COMPONENT_TEMPLATES[component.type]?.name || 'Component'}
        </h3>
        <p style={{ margin: 0, fontSize: '13px', color: '#6b7280' }}>ID: {component.id}</p>
      </div>

      {/* Container Info with Children Tree */}
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
            Drag and drop components into this container or click it and add components from the sidebar.
          </p>
          <p style={{ margin: '8px 0 0 0', fontSize: '12px', fontWeight: '600', color: '#1e40af' }}>
            Children: {component.children?.length || 0}
          </p>
          
          {/* Children Tree */}
          {component.children && component.children.length > 0 && (
            <div style={{ 
              marginTop: '12px', 
              paddingTop: '12px', 
              borderTop: '1px solid #bfdbfe' 
            }}>
              <div style={{ fontSize: '11px', fontWeight: '600', color: '#1e40af', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Child Components
              </div>
              {renderChildTree(component.children)}
            </div>
          )}
        </div>
      )}

      {/* Quick Add Properties */}
      <div style={{ 
        marginBottom: '20px', 
        padding: '12px', 
        backgroundColor: '#f9fafb', 
        borderRadius: '6px',
        border: '1px solid #e5e7eb'
      }}>
        <div style={{ fontSize: '11px', fontWeight: '600', color: '#6b7280', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Quick Add Properties
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {[
            { key: 'textAlign', value: 'center', label: 'Text Align' },
            { key: 'alignItems', value: 'center', label: 'Align Items' },
            { key: 'justifyContent', value: 'center', label: 'Justify Content' },
            { key: 'boxShadow', value: '0 4px 6px rgba(0,0,0,0.1)', label: 'Box Shadow' },
            { key: 'opacity', value: '1', label: 'Opacity' },
            { key: 'transform', value: 'scale(1)', label: 'Transform' },
            { key: 'transition', value: 'all 0.3s ease', label: 'Transition' },
            { key: 'overflow', value: 'hidden', label: 'Overflow' },
            { key: 'position', value: 'relative', label: 'Position' },
            { key: 'zIndex', value: '1', label: 'Z-Index' }
          ].filter(prop => !(prop.key in component.props)).map(prop => (
            <button
              key={prop.key}
              onClick={() => updateProp(prop.key, prop.value)}
              style={{
                padding: '4px 8px',
                backgroundColor: '#ffffff',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '11px',
                cursor: 'pointer',
                color: '#374151',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#3b82f6';
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.borderColor = '#3b82f6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#374151';
                e.currentTarget.style.borderColor = '#d1d5db';
              }}
            >
              + {prop.label}
            </button>
          ))}
        </div>
      </div>

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

          // Handle text alignment
          if (key === 'textAlign') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Text Align
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '4px' }}>
                  {['left', 'center', 'right', 'justify'].map(align => (
                    <button
                      key={align}
                      onClick={() => updateProp(key, align)}
                      style={{
                        padding: '8px',
                        backgroundColor: value === align ? '#3b82f6' : '#f9fafb',
                        color: value === align ? '#ffffff' : '#374151',
                        border: '1px solid',
                        borderColor: value === align ? '#3b82f6' : '#e5e7eb',
                        borderRadius: '6px',
                        fontSize: '12px',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {align}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // Handle align items (flexbox)
          if (key === 'alignItems') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Align Items
                </label>
                <select
                  value={value}
                  onChange={(e) => updateProp(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="flex-start">Flex Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">Flex End</option>
                  <option value="stretch">Stretch</option>
                  <option value="baseline">Baseline</option>
                </select>
              </div>
            );
          }

          // Handle justify content (flexbox)
          if (key === 'justifyContent') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Justify Content
                </label>
                <select
                  value={value}
                  onChange={(e) => updateProp(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="flex-start">Flex Start</option>
                  <option value="center">Center</option>
                  <option value="flex-end">Flex End</option>
                  <option value="space-between">Space Between</option>
                  <option value="space-around">Space Around</option>
                  <option value="space-evenly">Space Evenly</option>
                </select>
              </div>
            );
          }

          // Handle flex direction
          if (key === 'flexDirection') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Flex Direction
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '4px' }}>
                  {['row', 'column', 'row-reverse', 'column-reverse'].map(dir => (
                    <button
                      key={dir}
                      onClick={() => updateProp(key, dir)}
                      style={{
                        padding: '8px',
                        backgroundColor: value === dir ? '#3b82f6' : '#f9fafb',
                        color: value === dir ? '#ffffff' : '#374151',
                        border: '1px solid',
                        borderColor: value === dir ? '#3b82f6' : '#e5e7eb',
                        borderRadius: '6px',
                        fontSize: '11px',
                        cursor: 'pointer',
                        textTransform: 'capitalize'
                      }}
                    >
                      {dir.replace('-', ' ')}
                    </button>
                  ))}
                </div>
              </div>
            );
          }

          // Handle display property
          if (key === 'display') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Display
                </label>
                <select
                  value={value}
                  onChange={(e) => updateProp(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="block">Block</option>
                  <option value="inline">Inline</option>
                  <option value="inline-block">Inline Block</option>
                  <option value="flex">Flex</option>
                  <option value="inline-flex">Inline Flex</option>
                  <option value="grid">Grid</option>
                  <option value="none">None</option>
                </select>
              </div>
            );
          }

          // Handle position property
          if (key === 'position') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Position
                </label>
                <select
                  value={value}
                  onChange={(e) => updateProp(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="static">Static</option>
                  <option value="relative">Relative</option>
                  <option value="absolute">Absolute</option>
                  <option value="fixed">Fixed</option>
                  <option value="sticky">Sticky</option>
                </select>
              </div>
            );
          }

          // Handle overflow property
          if (key === 'overflow') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Overflow
                </label>
                <select
                  value={value}
                  onChange={(e) => updateProp(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="visible">Visible</option>
                  <option value="hidden">Hidden</option>
                  <option value="scroll">Scroll</option>
                  <option value="auto">Auto</option>
                </select>
              </div>
            );
          }

          // Handle font weight
          if (key === 'fontWeight') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Font Weight
                </label>
                <select
                  value={value}
                  onChange={(e) => updateProp(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="100">Thin (100)</option>
                  <option value="200">Extra Light (200)</option>
                  <option value="300">Light (300)</option>
                  <option value="400">Normal (400)</option>
                  <option value="500">Medium (500)</option>
                  <option value="600">Semi Bold (600)</option>
                  <option value="700">Bold (700)</option>
                  <option value="800">Extra Bold (800)</option>
                  <option value="900">Black (900)</option>
                </select>
              </div>
            );
          }

          // Handle cursor property
          if (key === 'cursor') {
            return (
              <div key={key}>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Cursor
                </label>
                <select
                  value={value}
                  onChange={(e) => updateProp(key, e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    backgroundColor: '#ffffff'
                  }}
                >
                  <option value="auto">Auto</option>
                  <option value="default">Default</option>
                  <option value="pointer">Pointer</option>
                  <option value="text">Text</option>
                  <option value="move">Move</option>
                  <option value="not-allowed">Not Allowed</option>
                  <option value="grab">Grab</option>
                  <option value="grabbing">Grabbing</option>
                </select>
              </div>
            );
          }

          // Boolean properties
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

const TemplatesModal = ({ onClose, onSelectTemplate }) => {
  const categories = [...new Set(Object.values(TEMPLATES).map(t => t.category))];
  
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
        maxWidth: '900px',
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
          justifyContent: 'space-between',
          position: 'sticky',
          top: 0,
          backgroundColor: '#ffffff',
          zIndex: 1
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Layers size={24} style={{ color: '#10b981' }} />
            <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#111827' }}>
              Choose a Template
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
          {categories.map(category => (
            <div key={category} style={{ marginBottom: '32px' }}>
              <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', fontWeight: '600', color: '#111827' }}>
                {category}
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '16px' }}>
                {Object.entries(TEMPLATES)
                  .filter(([_, template]) => template.category === category)
                  .map(([key, template]) => (
                    <button
                      key={key}
                      onClick={() => onSelectTemplate(key)}
                      style={{
                        padding: '20px',
                        backgroundColor: '#f9fafb',
                        border: '2px solid #e5e7eb',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#ffffff';
                        e.currentTarget.style.borderColor = '#10b981';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = '#f9fafb';
                        e.currentTarget.style.borderColor = '#e5e7eb';
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
                    >
                      <div style={{ fontSize: '32px', marginBottom: '12px' }}>{template.icon}</div>
                      <div style={{ fontSize: '16px', fontWeight: '600', color: '#111827', marginBottom: '4px' }}>
                        {template.name}
                      </div>
                      <div style={{ fontSize: '13px', color: '#6b7280', lineHeight: '1.5' }}>
                        {template.description}
                      </div>
                    </button>
                  ))}
              </div>
            </div>
          ))}

          <div style={{
            marginTop: '32px',
            padding: '16px',
            backgroundColor: '#eff6ff',
            borderRadius: '8px',
            border: '1px solid #dbeafe'
          }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <Info size={18} style={{ color: '#3b82f6', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#1e40af' }}>
                  Start with a Template
                </h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#1e40af', lineHeight: '1.6' }}>
                  Templates provide ready-made layouts you can customize. Select one to replace your current canvas,
                  or start from scratch and add individual components.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showTemplates, setShowTemplates] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // Recursively find component by ID in nested structure
  const findComponentById = (items, id) => {
    for (const item of items) {
      if (item.id === id) {
        console.log('Found component:', item);
        return item;
      }
      if (item.children) {
        const found = findComponentById(item.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const selectedComponent = selectedId ? findComponentById(components, selectedId) : null;
  console.log('selectedId:', selectedId, 'selectedComponent:', selectedComponent);

  // Load template
  const loadTemplate = (templateKey) => {
    const template = TEMPLATES[templateKey];
    if (template) {
      setComponents(template.components);
      setSelectedId(null);
      setShowTemplates(false);
    }
  };

  // Filter components by search query
  const filterComponents = (componentsObj) => {
    if (!searchQuery.trim()) return componentsObj;
    
    return Object.entries(componentsObj).filter(([type, template]) => {
      const searchLower = searchQuery.toLowerCase();
      return template.name.toLowerCase().includes(searchLower) || 
             type.toLowerCase().includes(searchLower) ||
             template.category.toLowerCase().includes(searchLower);
    });
  };

  const filteredComponents = filterComponents(COMPONENT_TEMPLATES);

  // Add CSS animations
  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

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
    console.log('updateComponent called with id:', id, 'newProps:', newProps);
    setComponents(prev => {
      const update = (items) => {
        return items.map(item => {
          if (item.id === id) {
            console.log('Found component to update:', item.id);
            return { ...item, props: newProps };
          }
          if (item.children) {
            return { ...item, children: update(item.children) };
          }
          return item;
        });
      };
      const result = update(prev);
      console.log('Updated components:', result);
      return result;
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
            onClick={() => setShowTemplates(true)}
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
            <Layers size={16} />
            Templates
          </button>
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
            onClick={() => {
              setView('design');
              setIsPreviewMode(false);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: view === 'design' && !isPreviewMode ? '#3b82f6' : '#f3f4f6',
              color: view === 'design' && !isPreviewMode ? '#ffffff' : '#6b7280',
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
            onClick={() => {
              setView('design');
              setIsPreviewMode(true);
            }}
            style={{
              padding: '8px 16px',
              backgroundColor: isPreviewMode ? '#3b82f6' : '#f3f4f6',
              color: isPreviewMode ? '#ffffff' : '#6b7280',
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
            <Play size={16} />
            Preview
          </button>
          <button
            onClick={() => {
              setView('code');
              setIsPreviewMode(false);
            }}
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
            <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#6b7280' }}>Drag or click to add</p>
            
            {/* Search Bar */}
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                placeholder="Search components..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  paddingLeft: '32px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '13px',
                  outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={(e) => e.target.style.borderColor = '#3b82f6'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
              />
              <svg
                style={{
                  position: 'absolute',
                  left: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af',
                  pointerEvents: 'none'
                }}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{
                    position: 'absolute',
                    right: '8px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#6b7280',
                    padding: '2px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
          
          <div style={{ flex: 1, padding: '12px', overflow: 'auto' }}>
            {searchQuery ? (
              // Show search results
              <div>
                {filteredComponents.length > 0 ? (
                  <>
                    <div style={{ marginBottom: '8px', fontSize: '11px', fontWeight: '600', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {filteredComponents.length} result{filteredComponents.length !== 1 ? 's' : ''}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {filteredComponents.map(([type, template]) => {
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
                            <div style={{ flex: 1 }}>
                              <div>{template.name}</div>
                              <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px', textTransform: 'capitalize' }}>
                                {template.category}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center', padding: '32px 16px', color: '#9ca3af' }}>
                    <svg style={{ width: '48px', height: '48px', margin: '0 auto 12px', opacity: 0.5 }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 12h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p style={{ margin: 0, fontSize: '13px' }}>No components found</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '12px' }}>Try a different search</p>
                  </div>
                )}
              </div>
            ) : (
              // Show categorized components
              <>
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
            </>
            )}
          </div>
        </div>

        {/* Canvas / Code View */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          {view === 'design' ? (
            isPreviewMode ? (
              // Preview Mode - Full interactive preview
              <div style={{
                flex: 1,
                overflow: 'auto',
                backgroundColor: '#ffffff',
                position: 'relative'
              }}>
                {components.length === 0 ? (
                  <div style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#9ca3af',
                    padding: '32px'
                  }}>
                    <Play size={64} style={{ marginBottom: '16px', opacity: 0.4 }} />
                    <h3 style={{ margin: '0 0 8px 0', fontSize: '18px', fontWeight: '600', color: '#6b7280' }}>
                      Preview Mode
                    </h3>
                    <p style={{ margin: 0, fontSize: '14px', textAlign: 'center' }}>
                      Add components to see them in preview mode
                    </p>
                  </div>
                ) : (
                  <div style={{ minHeight: '100%', backgroundColor: '#ffffff' }}>
                    {components.map(component => (
                      <PreviewRenderer key={component.id} component={component} />
                    ))}
                  </div>
                )}
                {/* Preview Mode Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '8px 16px',
                  backgroundColor: '#3b82f6',
                  color: '#ffffff',
                  borderRadius: '6px',
                  fontSize: '13px',
                  fontWeight: '600',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Play size={14} />
                  Live Preview
                </div>
              </div>
            ) : (
              // Design Mode - Editable with outlines
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
                      selectedId={selectedId}
                      onSelect={setSelectedId}
                      onUpdate={updateComponent}
                      onDelete={deleteComponent}
                      onDrop={handleNestedDrop}
                    />
                  ))}
                </div>
              )}
            </div>
            )
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
              components={components}
              onSelect={setSelectedId}
            />
          </div>
        </div>
      </div>
      
      {/* Templates Modal */}
      {showTemplates && <TemplatesModal onClose={() => setShowTemplates(false)} onSelectTemplate={loadTemplate} />}
      
      {/* Integration Guide Modal */}
      {showGuide && <IntegrationGuide framework={framework} onClose={() => setShowGuide(false)} />}
    </div>
  );
}
