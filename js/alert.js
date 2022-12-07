
function mostrarAlerta(){
    const RSS_URL = 'https://ssl.smn.gob.ar/feeds/CAP/avisocortoplazo/rss_acpCAP.xml';


    fetch(RSS_URL)
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
        const items = data.querySelectorAll("item");
        let html = ``;
        items.forEach(el => {
        html += `
            <article>

                ${el.querySelector("description").innerHTML}

            </article>
        `;
        });
        document.body.insertAdjacentHTML("beforeend", html);
    });
}