$(document).ready(function() {
    $("#theme").on("change", function() {
        let currTheme = $("#theme").val()
        let expiry = new Date()
        let numberOfMlSeconds = expiry.getTime();
        let addMlSeconds = 30 * 24 * 60 * 60 * 1000;
        expiry = new Date(numberOfMlSeconds + addMlSeconds);
        document.cookie = "theme="+currTheme+"; expires="+expiry+"; path=/;";
        let r = document.querySelector(':root');
        if (currTheme=="blue-dark") {
            r.style.setProperty('--colour-primary', '#56c0e3');
            r.style.setProperty('--colour-secondary', '#add8e6');
        }
        else if (currTheme=="purple-dark") {
            r.style.setProperty('--colour-primary', '#b10dfd');
            r.style.setProperty('--colour-secondary', '#d885ff');
        }
    })
    let cookies = document.cookie;
    cookies = cookies.split(";")
    let cookiePairs = {}
    for (let i in cookies) {
        let pair = cookies[i].split('=')
        cookiePairs[pair[0]] = pair[1];
    }
    let currTheme = cookiePairs[theme]
    let expiry = new Date()
    let numberOfMlSeconds = expiry.getTime();
    let addMlSeconds = 30 * 24 * 60 * 60 * 1000;
    expiry = new Date(numberOfMlSeconds + addMlSeconds);
    document.cookie = "theme="+currTheme+"; expires="+expiry+"; path=/;";

    if (currTheme=="blue-dark") {
        var r = document.querySelector(':root');
        r.style.setProperty('--colour-primary', '#56c0e3');
        r.style.setProperty('--colour-secondary', '#add8e6');
    }
})