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
  variant?: 'primary' | 'secondary' | 'gold' | 'outline';
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: React.CSSProperties;
}

export const MboaButton: React.FC<MboaButtonProps> = ({ 
  title, 
  onPress, 
  variant = 'primary', 
  loading = false, 
  disabled = false,
  fullWidth = false,
  style
}) => {
  
  const getBgColor = () => {
    if (disabled) return COLORS.borderDark;
    if (variant === 'gold') return COLORS.zenGold;
    if (variant === 'secondary') return 'transparent';
    if (variant === 'outline') return 'transparent';
    return COLORS.mboaGreen;
  };

  const getTextColor = () => {
    if (disabled) return COLORS.textMuted;
    if (variant === 'gold') return COLORS.earthBlack;
    if (variant === 'outline') return COLORS.mboaGreen;
    if (variant === 'secondary') return COLORS.mboaGreen;
    return COLORS.textPrimary;
  };

  const getBorderBottomColor = () => {
    if (disabled) return 'transparent';
    if (variant === 'gold') return COLORS.mboaGreen;
    if (variant === 'secondary') return 'transparent';
    if (variant === 'outline') return COLORS.zenGold;
    return COLORS.zenGold;
  };

  const buttonStyle: React.CSSProperties = {
    paddingTop: '16px',
    paddingBottom: '16px',
    paddingLeft: '32px',
    paddingRight: '32px',
    borderRadius: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: fullWidth ? '100%' : 'auto',
    border: variant === 'secondary' && !disabled ? `1.5px solid ${COLORS.mboaGreen}` : 'none',
    borderBottom: `3px solid ${getBorderBottomColor()}`,
    backgroundColor: getBgColor(),
    color: getTextColor(),
    fontSize: '16px',
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