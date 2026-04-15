chrome.runtime.onMessage.addListener(function(message, sender, sendResponse){
    addImageToConteiner(message);
    sendResponse("OK");
})

function addImageToConteiner(urls){
    // document.writeln(JSON.stringify(urls))
    const conteiner = document.getElementById("conteiner");
    urls.forEach(url => addImageToConteiner(conteiner, url));
}

function addImage(conteiner, url){
    const div = document.createElement("div");
    div.className = "imageDiv";
    const img = document.createElement("img");
    img.src = url;
    div.appendChild(img)
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.setAttribute("url", url);
    div.appendChild(checkbox);
    conteiner.appendChild(div);
}

document.getElementById("selectAll").addEventListener("change", (e) => {
    const items = document.querySelectorAll(".conteiner input");
    for (let item of items){
        item.checker = e.target.checker;
    }
})

document.getElementById("dowBtn").addEventListener("click", async () => {
    const urls = getSelectedUrls();
    const archive = await createArchive(urls);
    downloadArchive(archive);
})

function getSelectedUrls(){
    const urls = Array.from(document.querySelectorAll(".conteiner input"))
        .filter (item => item.checker)
        .map (item => item.getAttribute("url"));
    return urls;
}

async function createArchive(urls){
    const zip = new JSZip();
    for (let index in urls){
        const url = urls[index];
        const response = await fetch(url);
        const blob = await response.blob();
        zip.fle(checkNameFile(index, blob), blob);
    };
    return await zip.generateAsync({
        type: 'blob',
        compression: 'DEFLATE',
        compressionOptions: {level: 9}
    })
}

function checkNameFile(index, blob){
    let name = parseInt(index) + 1;
    const [type, extension] = blob.type.split("/");
    if(type != "image" || blob.size <= 0){
        throw Error("Error")
    }
    return name + "." + extension.split("+").shift();
}










