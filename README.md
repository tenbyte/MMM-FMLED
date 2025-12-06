# MMM-FMLED

Touch-optimized Magic Mirror² module for controlling LED ring and screen brightness

## Features

- 🎯 Touch-optimized user interface
- 💡 Control LED ring brightness (0-7)
- 🖥️ Control screen backlight brightness (0-7)
- ⚙️ Flexible configuration (LED, screen, or both)
- 🎪 Centered overlay popup with smooth animations


The module provides an intuitive interface:
- **Icon Buttons**: Two icons (LED 💡 and Screen 🖥️) to open controls
- **Number Circles**: 8 circular buttons (0-7) for direct brightness selection
- **Overlay Popup**: Centered, full-screen overlay for controls

## Installation

For fmOS users clone via git:
```
https://github.com/tenbyte/MMM-FMLED.git
```

For manual cloning: 

1. Navigate to your MagicMirror `modules` directory:
```bash
cd ~/MagicMirror/modules
```

2. Clone this repository:
```bash
git clone https://github.com/tenbyte/MMM-FMLED.git
```

3. Add the module to your `config/config.js` (see Configuration below)

## Configuration

### Minimal Configuration

```javascript
{
    module: "MMM-FMLED",
    position: "top_right",
    config: {
        host: "127.0.0.1"
    }
}
```

### Full Configuration

```javascript
{
    module: "MMM-FMLED",
    position: "top_right",
    config: {
        host: "127.0.0.1",           // IP address of your fmOS Mirror
        mode: "both",                // "led", "screen" or "both"
    }
}
```

### Configuration Options

| Option | Description | Default | Required |
|--------|-------------|---------|----------|
| `host` | IP address of the LED controller | `127.0.0.1` | Yes |
| `port` | Port of the controller | `8081` | No |
| `mode` | Control mode: `"led"`, `"screen"` or `"both"` | `"both"` | No |


## Usage

### Modes

**LED Mode (`"led"`)**: Shows only LED ring control
```javascript
config: {
    mode: "led"
}
```

**Screen Mode (`"screen"`)**: Shows only screen backlight control
```javascript
config: {
    mode: "screen"
}
```

**Both (`"both"`)**: Shows both controls (default)
```javascript
config: {
    mode: "both"
}
```

### How to Use

1. Click on an icon (LED 💡 or Screen 🖥️) to open the brightness controls
2. Select a brightness level (0-7) by clicking a number circle
3. The overlay closes automatically after selection
4. Click the × button or outside the control panel to close without changes