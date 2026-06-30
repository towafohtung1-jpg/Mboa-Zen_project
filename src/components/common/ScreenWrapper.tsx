import React from 'react';

// Self-contained design tokens to prevent resolution errors in the preview environment
const COLORS = {
  darkBg: '#0D0D0D',
  cleanWhite: '#FFFFFF',
};

interface ScreenWrapperProps {
  children: React.ReactNode;
  scrollable?: boolean;
}

/**
 * ScreenWrapper component designed to compile successfully in both web preview 
 * and local environments by utilizing standard layout primitives.
 * This component is exported as both a named export and the default export 
 * to handle any mixed import structures seamlessly.
 */
export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({ children, scrollable = true }) => {
  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    backgroundColor: COLORS.darkBg,
    minHeight: '100vh',
    width: '100%',
    boxSizing: 'border-box',
    color: COLORS.cleanWhite,
  };

  const contentStyle: React.CSSProperties = {
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '12px',
    paddingBottom: '120px',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflowY: scrollable ? 'auto' : 'hidden',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default ScreenWrapper;