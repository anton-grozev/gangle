/**
 * GAngle_SW.js - Библиотека за изчисляване на работен заден ъгъл
 */

class DrillSharpeningTransform {
    // Трансформационна матрица за преобразуване от SW координати
    static M11 = -0.1747159967;
    static M12 = 0.6235799837;
    static M13 = -0.1867561927;
    
    static M21 = 0.3122687596;
    static M22 = -0.1413437982;
    static M23 = 0.8581431812;
    
    static M31 = 0.8697589148;
    static M32 = -0.1087945740;
    static M33 = -0.4267759731;

    static rad2deg(rad) {
        return rad * 180 / Math.PI;
    }

    static deg2rad(deg) {
        return deg * Math.PI / 180;
    }

    /**
     * Трансформация от SW към оригинална координатна система
     */
    static transformSWCoordinates(xM_SW, yM_SW, zM_SW) {
        const xM = this.M11 * xM_SW + this.M12 * yM_SW + this.M13 * zM_SW;
        const yM = this.M21 * xM_SW + this.M22 * yM_SW + this.M23 * zM_SW;
        const zM = this.M31 * xM_SW + this.M32 * yM_SW + this.M33 * zM_SW;
        
        return { xM, yM, zM };
    }

    /**
     * Основна функция за изчисляване на ъглите на заточване
     */
    static GAngle(l, d, theta, beta, xM_SW, yM_SW, zM_SW) {
        // Преобразуване на входни данни в масиви
        const xM_SW_array = Array.isArray(xM_SW) ? xM_SW : [xM_SW];
        const yM_SW_array = Array.isArray(yM_SW) ? yM_SW : [yM_SW];
        const zM_SW_array = Array.isArray(zM_SW) ? zM_SW : [zM_SW];
        
        const isArrayInput = Array.isArray(xM_SW) || Array.isArray(yM_SW) || Array.isArray(zM_SW);
        const numPoints = Math.max(xM_SW_array.length, yM_SW_array.length, zM_SW_array.length);

        // Трансформация към оригинална система
        const xM = [];
        const yM = [];
        const zM = [];
        
        for (let i = 0; i < numPoints; i++) {
            const x_sw = xM_SW_array[i % xM_SW_array.length];
            const y_sw = yM_SW_array[i % yM_SW_array.length];
            const z_sw = zM_SW_array[i % zM_SW_array.length];
            
            const transformed = this.transformSWCoordinates(x_sw, y_sw, z_sw);
            xM.push(transformed.xM);
            yM.push(transformed.yM);
            zM.push(transformed.zM);
        }
        
        if (yM.length !== zM.length) {
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

        // Обработка на всяка точка
        const results = {
            alphaRAD: [],
            h: h,
            xM: []
        };
        
        for (let i = 0; i < yM.length; i++) {
            const yM_i = yM[i];
            const zM_i = zM[i];

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

// Експорт за браузър
if (typeof window !== 'undefined') {
    window.DrillSharpeningTransform = DrillSharpeningTransform;
}
