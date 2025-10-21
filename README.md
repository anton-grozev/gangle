# GAngle Calculator ⚙️

**Side Clearance Angle Calculator for Drill Sharpening**

A professional web-based calculator for computing the side clearance angle (α<sub>f</sub>) for drill sharpening operations. This tool provides precise calculations using advanced mathematical algorithms for manufacturing and engineering applications.

[![Live Demo](https://img.shields.io/badge/Live-Demo-blue?style=for-the-badge)](https://anton-grozev.github.io/gangle/)
[![Academic](https://img.shields.io/badge/Academic-Research-green?style=for-the-badge)](#)

---

## 🎯 Features

- **Dual Mode Operation**: Support for both standard and SolidWorks coordinate systems
- **Real-time Calculations**: Instant results as you input parameters
- **Multi-point Analysis**: Calculate angles for multiple points simultaneously
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Bilingual Interface**: Bulgarian and English language support
- **Dark/Light Mode**: User-preferred theme switching
- **Professional UI**: Modern, technical interface designed for engineering workflows

---

## 🔧 Technical Specifications

### Input Parameters
- **l [mm]**: Axial distance from cone apex to the axis offset
- **d [mm]**: Axis offset (diameter section)
- **θ [°]**: Angle between drill and cone axes
- **β [°]**: Angle between cone axis and generatrix (2β is the apex angle)
- **Point Coordinates**: X, Y, Z coordinates relative to drill tip

### Mathematical Engine
- Advanced coordinate transformation algorithms
- Quadratic equation solving for geometric calculations
- Trigonometric optimization for angle computations
- SolidWorks coordinate system integration

### Browser Compatibility
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

---

## 🚀 Quick Start

### Online Usage
Visit the [live demo](https://anton-grozev.github.io/gangle/) to use the calculator immediately.

### Local Development
```bash
# Clone the repository
git clone https://github.com/anton-grozev/gangle.git

# Navigate to project directory
cd gangle

# Open with a local server (e.g., Live Server)
# Or simply open index.html in your browser
```

### File Structure
```
gangle/
├── index.html          # Main application
├── GAngle_SW.js        # Core calculation engine
├── README.md           # Documentation
└── LICENSE             # License file
```

---

## 📊 Usage Guide

### 1. Select Mode
Choose between **Standard** or **SolidWorks** coordinate system modes.

### 2. Input Parameters
- Enter the four main parameters (l, d, θ, β)
- Add point coordinates using the "+" button
- Remove points with the "Remove" button if needed

### 3. Calculate Results
Click the **"Calculate"** button to compute the side clearance angles.

### 4. Interpret Results
Results show α<sub>f</sub> values for each point with precision to 2 decimal places.

---

## 🔬 Mathematical Background

The calculator implements advanced analytical geometry for drill sharpening calculations:

- **Coordinate Transformation**: Converts between coordinate systems
- **Conical Surface Analysis**: Determines points on drill cone surfaces
- **Angle Computation**: Uses arctangent formulations for precise angle calculation
- **Multi-point Processing**: Handles arrays of coordinate points efficiently

---

## 🛠 Development

### Technologies Used
- **Frontend**: Pure HTML5, CSS3, JavaScript (ES6+)
- **Styling**: Modern CSS with Flexbox/Grid layouts
- **Mathematics**: Native JavaScript mathematical functions
- **Responsiveness**: CSS Media Queries and Viewport Meta Tag

### Code Quality
- Modern ES6+ JavaScript syntax
- Modular class-based architecture
- Clean, semantic HTML structure
- Optimized CSS with consistent naming conventions
- Cross-browser compatibility ensured

---

## 📈 История на разработката

### Текуща версия
- ✅ Техническо оформление на потребителския интерфейс
- ✅ Подобрена мобилна съвместимост
- ✅ Оптимизирани шрифтове за инженерно приложение
- ✅ Стандартизирани стъпки за въвеждане (0.1 единици)
- ✅ Оптимизация и почистване на кода

### Предишни версии
- ✅ Двуезична поддръжка (български/английски)
- ✅ Светъл/тъмен режим
- ✅ Поддръжка на SolidWorks координатна система
- ✅ Отзивчив дизайн
- ✅ Основна функционалност за изчисления

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍🎓 Author

**Anton Grozev**  
PhD Candidate in Manufacturing Engineering  
*Ruse University, Bulgaria*

- 📧 Email: [your.email@domain.com](mailto:your.email@domain.com)
- 🔗 LinkedIn: [Your LinkedIn Profile](#)
- 🌐 Website: [Your Website](#)

---

##  Acknowledgments

- Ruse University Engineering Faculty
- Manufacturing Engineering Research Group
- Open Source Community

---

<div align="center">

**Made with ❤️ for the Engineering Community**

[⭐ Star this repository](https://github.com/anton-grozev/gangle) if you find it useful!

</div>
