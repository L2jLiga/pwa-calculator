if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/pwa-calculator/service-worker.js');
}

document.addEventListener('DOMContentLoaded', initButtons);

function byCSS(selector) {
    return document.querySelector(selector);
}

function initButtons() {
    byCSS('.button-1').addEventListener('click', () => addNumber(1));
    byCSS('.button-2').addEventListener('click', () => addNumber(2));
    byCSS('.button-3').addEventListener('click', () => addNumber(3));
    byCSS('.button-4').addEventListener('click', () => addNumber(4));
    byCSS('.button-5').addEventListener('click', () => addNumber(5));
    byCSS('.button-6').addEventListener('click', () => addNumber(6));
    byCSS('.button-7').addEventListener('click', () => addNumber(7));
    byCSS('.button-8').addEventListener('click', () => addNumber(8));
    byCSS('.button-9').addEventListener('click', () => addNumber(9));
    byCSS('.button-0').addEventListener('click', () => addNumber(0));
    byCSS('.button-p').addEventListener('click', () => addOperator(' + '));
    byCSS('.button-m').addEventListener('click', () => addOperator(' - '));
    byCSS('.button-d').addEventListener('click', () => addOperator(' / '));
    byCSS('.button-x').addEventListener('click', () => addOperator(' * '));
    byCSS('.button-s').addEventListener('click', () => calculate());
    byCSS('.button-c').addEventListener('click', () => clearResult());
    byCSS('.button-dot').addEventListener('click', () => putDot());
}

function putDot() {
    const resultField = byCSS('.result-field');

    const html = resultField.innerHTML.split(' ');

    const lastPart = html.pop();

    if (lastPart.length === 0) html.push('0.');
    else if (!/[^0-9$]/.test(lastPart)) html.push(lastPart + '.');
    else html.push(lastPart);

    resultField.innerHTML = html.join(' ');
}

function calculate() {
    const resultField = byCSS('.result-field');

    let calculation;

    try {
        calculation = (new Function(`return ${resultField.innerHTML || 'invalid'}`))();
    } catch (error) {
        calculation = 'Invalid input!';
    } finally {
        resultField.innerHTML = calculation;
    }
}

function addNumber(value) {
    if (shouldBeCleared()) clearResult();

    const resultField = byCSS('.result-field');

    if (resultField.innerHTML.length === 1) {
        if (value === 0) return;

        resultField.innerHTML = resultField.innerHTML === '0' ? '' : resultField.innerHTML;
    }

    addToResults(value);
}

function addOperator(value) {
    if (shouldBeCleared()) clearResult();

    const resultField = byCSS('.result-field');

    if (resultField.innerHTML.length === 0 || resultField.innerHTML.endsWith(' ')) return;

    addToResults(value);
}

function addToResults(value) {
    const resultField = byCSS('.result-field');

    resultField.innerHTML += value;
}

function shouldBeCleared() {
    const resultField = byCSS('.result-field');

    return resultField.innerHTML === 'Invalid input!';
}

function clearResult() {
    const resultField = byCSS('.result-field');

    resultField.innerHTML = '';
}
