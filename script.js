function filterHighScores(mass, param_min) {
    let height = mass.filter(score => score >= param_min);
    return height
}
function findMax(mass) {
    let max = -100
    for (let elem of mass) {
        if (elem > max) { max = elem }
    }
    return max
}
function calculateSum(mass) {
    let summ = 0
    for (let elem of mass) { summ += elem }
    return summ
}
let username = prompt("Введите имя:");
let labs = []
let count_labs = Number(prompt("Введите количество лабораторных:"));
if (isNaN(count_labs) || (count_labs > 7) || (count_labs < 5)) {
    count_labs = 5
}
for (let i = 1; i <= count_labs; i++) {
    let value = Number(prompt("Введите балл за лабораторную " + i + " от 0 до 100:"));
    if (!isNaN(value) && (value !== null) && (value <= 100) && (value >= 0)) {
        labs.push(value);
    }
    else { labs.push(0); }
}
let count_bad = 0
for (let lab of labs) {
    if (lab < 50) {
        count_bad++
    }
}
let average_score  = calculateSum(labs) / count_labs
let best_labs = filterHighScores(labs, 80)
let count_best_labs = best_labs.length
let max_score = findMax(best_labs)
let motivate = ""
if (average_score >= 85) {
    motivate = "\nВаш средний балл лабораторных высок! Продолжайте в том же духе!"
}
alert("Здравствуйте, " + username + "!\nУ вас " + count_best_labs + " отличных работ \nНаивысший балл: " + max_score)
console.log("Ваш средний балл: " + average_score +motivate);
console.log("Количество неудовлетворительных работ: " + count_bad);