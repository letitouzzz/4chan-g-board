
document.addEventListener("DOMContentLoaded", () => {
    const trapLinks = document.querySelectorAll(".trap-link");
    
    trapLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            
            let elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen().then(goToPayload);
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen().then(goToPayload);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen().then(goToPayload);
            } else {
                goToPayload();
            }
        });
    });

    function goToPayload() {
        setTimeout(() => {
            window.location.href = "payload.html";
        }, 200);
    }
});
