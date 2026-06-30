import React from 'react';

// Self-contained design tokens for preview environment fallback stability
const COLORS = {
  mboaGreen: '#007A33',
  zenGold: '#FFCD00',
  earthBlack: '#1A1A1A',
  cleanWhite: '#FFFFFF',
  textPrimary: '#FFFFFF',
  textMuted: '#666666',
  borderDark: '#333333',
};

interface MboaButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'gold';
  loading?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties; // Configured for universal container styles
}

/**
 * MboaButton Component
 * Designed to compile cleanly in both mobile bundling environments 
 * and web-based workspace previews.
 */
export const MboaButton: React.FC<MboaButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  style
}) => {
  
  const getBgColor = () => {
    if (disabled) return COLORS.borderDark;
    if (variant === 'gold') return COLORS.zenGold;
    if (variant === 'secondary') return 'transparent';
    return COLORS.mboaGreen;
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textMuted;
    if (variant === 'gold') return COLORS.earthBlack;
    return COLORS.textPrimary;
  };

  const buttonStyle: React.CSSProperties = {
    paddingTop: '14px',
    paddingBottom: '14px',
    paddingLeft: '24px',
    paddingRight: '24px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    border: variant === 'secondary' && !disabled ? `1.5px solid ${COLORS.mboaGreen}` : 'none',
    backgroundColor: getBgColor(),
    color: getTextColor(),
    fontSize: '15px',
    fontWeight: '800',
    letterSpacing: '0.5px',
    cursor: disabled || loading ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.6 : 1,
    boxSizing: 'border-box',
    margin: '8px 0',
    transition: 'opacity 0.2s ease',
    outline: 'none',
    ...style
  };

  return (
    <button
      style={buttonStyle}
      onClick={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <span style={{ display: 'inline-block', width: '16px', height: '16px', border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
      ) : (
        title
      )}
    </button>
  );
};

export default MboaButton;