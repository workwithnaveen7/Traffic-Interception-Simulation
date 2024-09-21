function logInterception(data, isSafe = false) {
    const logList = document.getElementById('logList');
    const listItem = document.createElement('li');
    listItem.textContent = data;


    if (isSafe) {
        listItem.style.backgroundColor = '#c8ffc8';  
        listItem.style.borderLeft = '5px solid green';  
    } else {
        listItem.style.backgroundColor = '#ffc';  
        listItem.style.borderLeft = '5px solid red';  
    }

    logList.appendChild(listItem);
}

function sendRequest() {
    const useVPN = document.getElementById('useVPN').checked;
    const useHTTPS = document.getElementById('useHTTPS').checked;
    const resultDiv = document.getElementById('result');
    const dataPacket = document.getElementById('dataPacket');
    let message = 'Request sent without any protection. ';
    dataPacket.classList.remove('safe', 'intercepted');
    let isIntercepted = false;

    if (useVPN && useHTTPS) {
        message = 'Encrypted using both VPN and HTTPS. The attacker could not read or modify the traffic.';
        dataPacket.classList.add('safe');
        logInterception('Data is safe. Both VPN and HTTPS used.', true);  
    } else if (useVPN) {
        message = 'Traffic encrypted by VPN. The attacker could not read the data, but the request itself is unencrypted (HTTP).';
        dataPacket.classList.add('intercepted');
        isIntercepted = true;
    } else if (useHTTPS) {
        message = 'HTTPS encrypted the web traffic, but non-web data remains vulnerable.';
        dataPacket.classList.add('intercepted');
        isIntercepted = true;
    } else {
        message = 'No protection. The attacker intercepted and modified your data.';
        dataPacket.classList.add('intercepted');
        isIntercepted = true;
    }

   
    if (isIntercepted) {
        setTimeout(() => {
            dataPacket.textContent = 'Altered!';
            resultDiv.textContent += ' The attacker modified your request!';
            logInterception('Attacker intercepted and altered the data packet.');
        }, 2000);
    } else {
        dataPacket.textContent = 'Data'; 
    }

    resultDiv.textContent = message;
    dataPacket.style.animation = 'none';
    setTimeout(() => {
        dataPacket.style.animation = '';
    }, 10);
}