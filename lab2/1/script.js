function task1() {
    const raw   = localStorage.getItem("visit_count");
    const count = (raw === null ? 0 : parseInt(raw, 10)) + 1;
    localStorage.setItem("visit_count", count);
    document.getElementById('t1-result').textContent = `Счетчик загрузок страницы: ${count}`;
}

task1();

function loadImg(url) {
    return new Promise((resolve, reject) => {
      let img = new Image();
      img.src = url;
      img.onload  = () => resolve(img);
      img.onerror = () => reject(new Error("Can't load image"));
    });
}

function makeError() {
    const p = document.createElement('p');
    p.textContent = "Can't load image";
    return p;
}

function makeURLs() {
    const urls = [];
    for (let i = 0; i < 5; i++) {
        const url = prompt(`Введите URL картинки ${i+1} из 5:`);
        if (url === null) return;
        urls.push(url.trim());
    }
    return urls;
}

function task2() {
    const urls = makeURLs();
    if (!urls) return;

    const container = document.getElementById("t2-pics");
    container.innerHTML = '';
    return urls.reduce((chain, url) => {
        return chain.then(() => 
            loadImg(url)
            .then(img => container.appendChild(img))
            .catch(() => container.appendChild(makeError()))
        );
    }, Promise.resolve(null));
}

function task3() {
    const urls = makeURLs();
    if (!urls) return;

    const container = document.getElementById("t3-pics");
    container.innerHTML = '';
    urls.forEach(url => {
        loadImg(url)
        .then(img => container.appendChild(img))
        .catch(() => container.appendChild(makeError()))
    });
}

async function task41() {
    const urls = makeURLs();
    if (!urls) return;

    const container = document.getElementById("t41-pics");
    container.innerHTML = '';
    for (const url of urls) {
        try {
            const img = await loadImg(url);
            container.appendChild(img);
        } catch (err) {
            container.appendChild(makeError());
        }
    }
}

async function task42() {
    const urls = makeURLs();
    if (!urls) return;

    const container = document.getElementById("t42-pics");
    container.innerHTML = '';
    const promises = urls.map(url => loadImg(url));
    const results  = await Promise.allSettled(promises);
    for (const result of results) {
        if (result.status === 'fulfilled') {
            container.appendChild(result.value);
        } else {
            container.appendChild(makeError());
        }
    }
}

function makeIPs() {
    const ips = [];
    for (let i = 0; i < 5; i++) {
        const ip = prompt(`Введите IP-адрес ${i+1} из 5`);
        if (ip === null) return;
        ips.push(ip.trim());
    }
    return ips;
}

async function checkIP(ip) {
    try {
        const response = await fetch(`https://json.geoiplookup.io/${ip}`);
        if (!response.ok) throw new Error(response.status);
        const data = await response.json();
        return data.country_name;
    } catch (err) {
        alert(`Ошибка проверки IP ${ip}: ${err}`);
        return null;
    }
}

async function task5() {
    const blocked = [
        "Russia",
        "Belarus",
        "Afghanistan",
        "China",
        "Venezuela",
        "Iran"
    ];
    const ips = makeIPs();
    if (!ips) return;

    const countries = await Promise.all(ips.map(ip => checkIP(ip)));
    if (countries.some(c => !c)) return;
    const is_blocked = countries.some(country => blocked.includes(country));
    if (is_blocked) {
        alert("Our services are not available in your country");
    } else {
        alert("Welcome to our website!");
    }
}