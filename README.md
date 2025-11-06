# Gangle

Gangle is a web application for calculating the side clearance angle αf in the working tool plane Pf.

Live demo: https://anton-grozev.github.io/gangle/

---

Contents
- Brief Description
- Quick Start Guide (online and local)
- Input Parameters
- Technical Details

---

Brief Description
The application calculates the side clearance angle αf in the working tool plane Pf given the geometric parameters of the drill and conical surface. The algorithms use analytical geometry for the calculations.

Key Features (precisely described)
- Real-time calculations when input values change in the UI.
- Calculations are performed directly in the target (drill / M) coordinate system; for backward compatibility there is a wrapper function (calculateAngleFromSW) that transforms SW-input coordinates to drill/M and then performs the same calculations.
- The library accepts both single coordinates and arrays (multi-point) — when arrays are passed to calculateAngle(...), the function returns an array of results.

---

Quick Start Guide

Online
- Visit the live demo: https://anton-grozev.github.io/gangle/

Local
1. Clone the repository:
   git clone https://github.com/anton-grozev/gangle.git
2. Enter the project directory:
   cd gangle
3. Open index.html in a browser or use a local server (e.g., Live Server for VS Code).

Input Parameters
- l [mm] — axial distance from cone apex to the axis offset d
- d [mm] — axis offset (distance between the two axes)
- θ [°] — angle between drill and cone axes
- β [°] — angle between cone axis and generatrix (2β is the apex angle)
- Point coordinates — X, Y, Z (relative to drill tip)

---

Technical Details
- Technologies: HTML5, CSS3, JavaScript (ES6)
- Architecture: client-side (front-end) logic for calculations; the core library returns numerical results, UI handles the presentation.
- Coordinate systems and transformations: calculations in the core function are performed in drill/M coordinates for better performance and simplification; if input data is in another system (SW), use calculateAngleFromSW(), which transforms the coordinates and then calls calculateAngle(...).
- Array support: calculateAngle(...) supports array inputs (xM, yM, zM arrays) and returns an array of αf values for multi-point cases.

---

Made with ❤️ for the engineering community
