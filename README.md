# TeleBotHost Badge - Configuration Guide

## Overview
The TeleBotHost badge is a small, non-intrusive floating element that shows "Built with TeleBotHost" on your website. It automatically positions itself in a corner and includes protection mechanisms to ensure it stays visible.

## Quick Start
Simply include the TeleBotHost script on your website - the badge will automatically appear with default settings.

## Configuration Options

### Method 1: Global Configuration Object
Add this script **before** the TeleBotHost script:

```html
<script>
window.TeleBotHostConfig = {
    position: 'bottom-right', // Options: 'bottom-right', 'bottom-left', 'top-right', 'top-left'
    theme: 'default' // Options: 'default', 'dark', 'minimal'
};
</script>

```

### Method 2: URL Parameters
Configure the badge via URL parameters (useful for testing):

```
https://yoursite.com/?tbh_position=top-left
```

## Configuration Properties

### Position
Control where the badge appears:

```javascript
window.TeleBotHostConfig = {
    position: 'bottom-right' // Default
    // Other options:
    // - 'bottom-left'
    // - 'top-right' 
    // - 'top-left'
};
```

### Theme
Choose from predefined color schemes:

```javascript
window.TeleBotHostConfig = {
    theme: 'default' // Options: 'default', 'dark', 'minimal'
};
```

**Theme Examples:**
- `default`: Light background, dark text
- `dark`: Dark background, light text  
- `minimal`: Subtle light theme with reduced shadow


## Example Configurations

### Basic Setup
```html
<script>
window.TeleBotHostConfig = {
    position: 'bottom-right',
    theme: 'dark'
};
</script>
```

### Minimal Theme
```html
<script>
window.TeleBotHostConfig = {
    position: 'top-left',
    theme: 'minimal'
};
</script>
```

### All Defaults
```html
<!-- No configuration needed - uses defaults -->
```


## Troubleshooting

**Badge overlapping content?**
- Try a different position (e.g., `top-left` instead of `bottom-right`)
- The badge should auto-adjust, but manual position change may help

**Theme not applying?**
- Verify theme name spelling ('default', 'dark', 'minimal')
- Ensure configuration is set before script loads

## Support
For issues or feature requests, contact TeleBotHost support.

---

*The badge is designed to be lightweight, unobtrusive, and respectful of your website's design while properly attributing TeleBotHost.*