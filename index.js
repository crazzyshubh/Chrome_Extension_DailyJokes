const getUserName = () => {
    chrome.storage.sync.get('userName', (data) => {
        if (data.userName) {
            document.getElementById('pop').textContent = data.userName;
        } else {
            const userName = prompt("Please enter your name:");
            if (userName) {
                chrome.storage.sync.set({ userName: userName }, () => {
                    document.getElementById('pop').textContent = userName;
                });
            }
        }
    });
};

const getjokes = async () => {
    try {
        const response = await fetch("https://api.chucknorris.io/jokes/random"); // Await the fetch request

        const data = await response.json();
        const myjoke = document.querySelector("#myjoke");
        myjoke.innerHTML = data.value;
    } catch (error) {
        console.error("Failed to fetch the joke", error); // Log the error to help with debugging
    }
};

window.addEventListener("load", () => {
    getjokes();
    getUserName();
});
