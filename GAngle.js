/**
 * GAngle.js - Библиотека за изчисляване на работен заден ъгъл с директни координати
 */

class DrillAngleCalculator {
    static rad2deg(rad) {
        return rad * 180 / Math.PI;
    }

    static deg2rad(deg) {
        return deg * Math.PI / 180;
    }

    /**
     * Функция за изчисляване на работен заден ъгъл с директни drill координати
     * @param {number} l - дължина на свредлото
     * @param {number} d - диаметър на свредлото  
     * @param {number} theta - ъгъл theta в радиани
     * @param {number} beta - ъгъл beta в радиани
     * @param {number|Array} xM - x координата/координати
     * @param {number|Array} yM - y координата/координати
     * @param {number|Array} zM - z координата/координати
     */
    static calculateAngle(l, d, theta, beta, xM, yM, zM) {
        // Преобразуване на входни данни в масиви
        const xM_array = Array.isArray(xM) ? xM : [xM];
        const yM_array = Array.isArray(yM) ? yM : [yM];
        const zM_array = Array.isArray(zM) ? zM : [zM];
        
        const isArrayInput = Array.isArray(xM) || Array.isArray(yM) || Array.isArray(zM);
        const numPoints = Math.max(xM_array.length, yM_array.length, zM_array.length);

        if (yM_array.length !== zM_array.length) {
            throw new Error('yM и zM координатите трябва да имат еднаква дължина');
        }

        // Изчисляване на h параметъра
        const tanTheta = Math.tan(theta);
        const tanBeta = Math.tan(beta);
        
        const ah = tanTheta * tanTheta - tanBeta * tanBeta;
        const bh = tanTheta * tanTheta * l;
        const ch = l * l * tanTheta * tanTheta + d * d;

        let h;
        if (Math.abs(ah) < 1e-10) {
            h = 0.5 * ch / bh;
        } else if (ah < 0) {
            const discriminant = bh * bh - ah * ch;
            h = (bh - Math.sqrt(discriminant)) / ah;
        } else if (Math.abs(theta) < Math.PI / 2) {
            const discriminant = bh * bh - ah * ch;
            h = (bh - Math.sqrt(discriminant)) / ah;
        } else if (Math.abs(theta) === Math.PI / 2) {
            h = l;
        } else {
            const discriminant = bh * bh - ah * ch;
            h = (bh + Math.sqrt(discriminant)) / ah;
        }

        // Предварително изчисляване на тригонометрични стойности
        const cosTheta = Math.cos(theta);
        const cosBeta = Math.cos(beta);
        const sinTheta = Math.sin(theta);

        // Резултати за всяка точка
        const results = {
            alphaRAD: [],
            h: h,
            xM: []
        };

        for (let i = 0; i < yM_array.length; i++) {
            const yM_i = yM_array[i];
            const zM_i = zM_array[i];

            // Решаване на квадратно уравнение за xM координатата
            const axc = cosTheta * cosTheta - cosBeta * cosBeta;
            const bxc = cosTheta * cosTheta * (yM_i * sinTheta - h) - 
                       cosBeta * cosBeta * (l * sinTheta * sinTheta - h);
            
            const term1 = cosTheta * cosTheta * Math.pow(yM_i * sinTheta - h, 2);
            const term2 = cosBeta * cosBeta * (Math.pow(l * sinTheta * sinTheta - h, 2) + 
                         cosTheta * cosTheta * (Math.pow(yM_i - l * sinTheta, 2) + Math.pow(zM_i - d, 2)));
            const cxc = term1 - term2;

            let xM_i;
            if (Math.abs(axc) < 1e-10) {
                xM_i = 0.5 * cxc / bxc;
            } else if (Math.abs(theta) === Math.PI / 2) {
                xM_i = 0;
            } else {
                const discriminant = bxc * bxc - axc * cxc;
                const sign_bxc = bxc >= 0 ? 1 : -1;
                xM_i = (bxc - sign_bxc * Math.sqrt(discriminant)) / axc;
            }

            // Изчисляване на ъгъла на заточване α = arctan(B/A)
            const sqrt_yM2_zM2 = Math.sqrt(yM_i * yM_i + zM_i * zM_i);
            const A_term1 = (xM_i - yM_i * sinTheta + h) * cosTheta * cosTheta;
            const A_term2 = (xM_i - l * sinTheta * sinTheta + h) * cosBeta * cosBeta;
            const A = sqrt_yM2_zM2 * (A_term1 - A_term2) / cosTheta;

            const B_term1 = (yM_i * d - zM_i * l * sinTheta) * cosBeta * cosBeta;
            const B_term2 = zM_i * (xM_i - yM_i * sinTheta + h) * sinTheta;
            const B = B_term1 + B_term2;

            // Финални изчисления
            xM_i = xM_i / cosTheta;
            const alphaRAD_radians = Math.atan(-B / A);
            const alphaRAD_degrees = this.rad2deg(alphaRAD_radians);

            results.alphaRAD.push(alphaRAD_degrees);
            results.xM.push(xM_i);
        }

        // Връщане на скаларни стойности ако входът е скалар
        if (!isArrayInput) {
            return {
                alphaRAD: results.alphaRAD[0],
                h: results.h,
                xM: results.xM[0]
            };
        }

        return results;
    }
}

// Експорт за браузър и Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = DrillAngleCalculator;
}
if (typeof window !== 'undefined') {
    window.DrillAngleCalculator = DrillAngleCalculator;
}