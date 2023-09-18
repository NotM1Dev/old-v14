module.exports = (number) => {
    const abbreviations = ["", "K", "M", "B", "T"];
    let x = 0;

    while (number >= 1e3 && x < abbreviations.length - 1) {
        number /= 1e3;
        x++;
    };

    return number.toFixed(1) + abbreviations[x];
};