'use strict';


const login = () => {
    chrome.runtime.sendMessage({ login: "true" });
}

document.getElementById('login').addEventListener('click', login);