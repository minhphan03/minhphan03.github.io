document.addEventListener('DOMContentLoaded', async function () {
    // const pElements = document.querySelectorAll('p[id]');
    // const divElements = document.querySelectorAll('div[id]');

    const elements = document.querySelectorAll('p[id], div[id]');

    // console.log(divElements2);

    for (const e of elements) {
        const id = e.id;

        try {
            var bg_color = album_json[id].color;
            e.style.color = getTextColor(bg_color);
        } catch (error) {
            console.error(`Error loading text for ${id}:`, error);
            // Optionally, you can set a fallback message in case of error
            // p.textContent = 'More coming soon :)';
        }
    }

    // console.log(merged);

        function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }

    function toLinear(c) {
        c = c / 255;
        return c <= 0.04045
            ? c / 12.92
            : Math.pow((c + 0.055) / 1.055, 2.4);
    }

    function getTextColor(bgColor) {
        const { r, g, b } = hexToRgb(bgColor);

        const R = toLinear(r);
        const G = toLinear(g);
        const B = toLinear(b);

        const luminance = 0.2126 * R + 0.7152 * G + 0.0722 * B;

        return luminance > 0.5 ? "#000000" : "#FFFFFF";
    }


})