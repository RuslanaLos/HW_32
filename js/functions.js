const sendButton = document.getElementById('send-button');
const chatField = document.getElementById('chat-field');
const usersInput = document.getElementById('user-input');

let buttonBlocked = false;

function getUserMessage() {
    return usersInput.value;
}

async function showUserMessage() {
    if (buttonBlocked) {
        return;
    }

    const userMessage = getUserMessage();
    showMessage(`${userMessage}`, "userMessage");
    usersInput.value = "";

    await thinkAndRespond(userMessage);
}

function showMessage(message, className) {
    const messageDiv = createElement('div', chatField, '', {className: `${className}`});
    const messageContent = createElement('p', messageDiv, message);
}

async function thinkAndRespond(message) {
    if (buttonBlocked) {
        return;
    }

    const randomTime = Math.floor(Math.random() * 10 + 1) * 1000;
    await new Promise(resolve => setTimeout(resolve, randomTime));

    if (message === usersFinishingMessage) {
        showMessage(`${finishingMessage}`, "botMessage");
        deactivateBtn();
    }

    if (!buttonBlocked) {
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        showMessage(`${randomResponse}`, "botMessage");

        if (randomResponse === responses[0]) {
            deactivateBtn();
        }
    }
}

function deactivateBtn() {
    buttonBlocked = true;
    sendButton.disabled = true;
}