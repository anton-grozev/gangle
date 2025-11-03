/**
 * GAngle.js - Библиотека за изчисляване на работен заден ъгъл с директни координати
 *
 * Added wrapper: DrillAngleCalculator.calculateAngleFromSW(l,d,theta,beta,x_sw,y_sw,z_sw)
 * which accepts SW coordinates, transforms internally and calls calculateAngle(...).
 */
class DrillAngleCalculator {
    static rad2deg(rad) { return rad * 180 / Math.PI; }
    static deg2rad(deg) { return deg * Math.PI / 180; }

    static calculateAngle(l, d, theta, beta, xM, yM, zM) {
        const xM_array = Array.isArray(xM) ? xM : [xM];
        const yM_array = Array.isArray(yM) ? yM : [yM];
        const zM_array = Array.isArray(zM) ? zM : [zM];

        const isArrayInput = Array.isArray(xM) || Array.isArray(yM) || Array.isArray(zM);
        const numPoints = Math.max(xM_array.length, yM_array.length, zM_array.length);

        if (yM_array.length !== zM_array.length) {
            throw new Error('yM и zM координатите трябва да имат еднаква дължина');
        }

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

        const cosTheta = Math.cos(theta);
        const cosBeta = Math.cos(beta);
        const sinTheta = Math.sin(theta);

        const results = { alphaRAD: [], h: h, xM: [] };

        for (let i = 0; i < yM_array.length; i++) {
            const yM_i = yM_array[i];
            const zM_i = zM_array[i];

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

            const sqrt_yM2_zM2 = Math.sqrt(yM_i * yM_i + zM_i * zM_i);
            const A_term1 = (xM_i - yM_i * sinTheta + h) * cosTheta * cosTheta;
            const A_term2 = (xM_i - l * sinTheta * sinTheta + h) * cosBeta * cosBeta;
            const A = sqrt_yM2_zM2 * (A_term1 - A_term2) / cosTheta;

            const B_term1 = (yM_i * d - zM_i * l * sinTheta) * cosBeta * cosBeta;
            const B_term2 = zM_i * (xM_i - yM_i * sinTheta + h) * sinTheta;
            const B = B_term1 + B_term2;

            xM_i = xM_i / cosTheta;
            const alphaRAD_radians = Math.atan(-B / A);
            const alphaRAD_degrees = this.rad2deg(alphaRAD_radians);

            results.alphaRAD.push(alphaRAD_degrees);
            results.xM.push(xM_i);
        }

        if (!isArrayInput) {
            return { alphaRAD: results.alphaRAD[0], h: results.h, xM: results.xM[0] };
        }
        return results;
    }

    static calculateAngleFromSW(l, d, theta, beta, x_sw, y_sw, z_sw) {
        function transformSWtoM(x_sw, y_sw, z_sw) {
            const M11 = -0.1747159967, M12 = 0.6235799837, M13 = -0.1867561927;
            const M21 = 0.3122687596, M22 = -0.1413437982, M23 = 0.8581431812;
            const M31 = 0.8697589148, M32 = -0.1087945740, M33 = -0.4267759731;
            const xM = M11 * x_sw + M12 * y_sw + M13 * z_sw;
            const yM = M21 * x_sw + M22 * y_sw + M23 * z_sw;
            const zM = M31 * x_sw + M32 * y_sw + M33 * z_sw;
            return [xM, yM, zM];
        }
        if (Array.isArray(x_sw) || Array.isArray(y_sw) || Array.isArray(z_sw)) {
            const xs = Array.isArray(x_sw) ? x_sw : [x_sw];
            const ys = Array.isArray(y_sw) ? y_sw : [y_sw];
            const zs = Array.isArray(z_sw) ? z_sw : [z_sw];
            const n = Math.max(xs.length, ys.length, zs.length);
            const xM_arr = new Array(n), yM_arr = new Array(n), zM_arr = new Array(n);
            for (let i = 0; i < n; i++) {
                const [xm, ym, zm] = transformSWtoM(xs[i % xs.length], ys[i % ys.length], zs[i % zs.length]);
                xM_arr[i] = xm; yM_arr[i] = ym; zM_arr[i] = zm;
            }
            return DrillAngleCalculator.calculateAngle(l, d, theta, beta, xM_arr, yM_arr, zM_arr);
        } else {
            const [xM, yM, zM] = transformSWtoM(x_sw, y_sw, z_sw);
            return DrillAngleCalculator.calculateAngle(l, d, theta, beta, xM, yM, zM);
        }
    }
}

if (typeof module !== 'undefined' && module.exports) { module.exports = DrillAngleCalculator; }
if (typeof window !== 'undefined') { window.DrillAngleCalculator = DrillAngleCalculator; }
