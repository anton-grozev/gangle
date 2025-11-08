<p align="center">
  <a href="https://anton-grozev.github.io/gangle/" target="_blank" rel="noopener">
    <img src="https://img.shields.io/badge/Live%20Demo-Click%20Here-brightgreen?style=for-the-badge&logo=google-chrome" alt="Live Demo">
  </a>
</p>

# gangle — Side Clearance Angle Calculator for Drill Sharpening

## Description

**gangle** is a web-based calculator for the side clearance angle (`αf`) in drill point geometry. Users can adjust drill geometry values through interactive sliders; calculations update live with every change, no manual Calculate button required.

---

## Main Features

- **Interactive sliders** for parameter input:
  - `l [mm]` — Axial distance from cone apex to axis offset
  - `d [mm]` — Axis offset
  - `θ [°]` — Angle between drill and cone axes (lockable)
  - `β [°]` — Angle between cone axis and generatrix (lockable)
- **Kr Mode & Angle Presets:** Choose between no adjustment or preset sum constraints. When enabled, Kr automatically maintains valid geometric dependencies between θ and β; locking θ fixes its value and recalculates β as needed.
- **Live Calculation:** All results (side clearance angle, etc.) are instantly updated as values change.
- **Calculation History:** The app saves previously calculated results, accessible for review and export.
- **Technical Terms:** All terminology (e.g., side clearance angle, drill point, Kr, etc.) follows the usage from the codebase and UI.

---

## Usage Instructions

1. Visit the [Live Demo](https://anton-grozev.github.io/gangle/) or open `index.html` from a local clone.
2. Adjust parameters with the sliders and numeric inputs. Optionally, use the lock feature for θ or β, and select an angle preset for Kr functionality.
3. View instant results and access the history for previous calculations.

#### Local Usage

```sh
git clone https://github.com/anton-grozev/gangle.git
cd gangle
open index.html
```

---

## File Structure

- `index.html` — Main UI; contains sliders and app controls.
- JavaScript — Embedded in HTML (or in linked `.js`), handles all logic for calculation, Kr adjustment, history, and updates.
- CSS — Styling for sliders, layout, and responsive controls (inline or separate).

---

## License

MIT License — see [LICENSE](LICENSE).

---

## Author

Anton Grozev  
[GitHub](https://github.com/anton-grozev)

Issues, feedback, and questions are welcome in the repository's Issue section.
