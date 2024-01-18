document.getElementById("result").addEventListener("click", function() {
    var password = document.getElementById("result").textContent;
    if (!password || password === "CLICK GENERATE") {
        // Agar parol bo'lmasa yoki default matn bo'lsa, nusxalamaslik
        return;
    }

    // Parolni clipboard'ga nusxalash
    navigator.clipboard.writeText(password).then(function() {
        console.log('Parol clipboard\'ga nusxalandi!');
        // Bu yerda foydalanuvchiga nusxalanganligini bildiruvchi xabarni ko'rsatishingiz mumkin
    })
    .catch(function(err) {
        console.error('Xatolik yuz berdi:', err);
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var resultContainer = document.querySelector('.result');
    var copyButton = document.getElementById('copy-btn');
    var resultText = document.getElementById('result');

    // Sichqonchaning harakatiga javob beradigan funksiya
    resultContainer.addEventListener('mousemove', function(e) {
        var rect = resultContainer.getBoundingClientRect();
        var x = e.clientX - rect.left; // Sichqonchaning x koordinatasi
        var y = e.clientY - rect.top;  // Sichqonchaning y koordinatasi
        copyButton.style.setProperty('--x', `${x}px`);
        copyButton.style.setProperty('--y', `${y}px`);
    });

    // Tugmani bosganda clipboard'ga nusxalash
    copyButton.addEventListener('click', function() {
        var password = resultText.textContent;
        if (!password || password === 'CLICK GENERATE') {
            // Agar parol bo'lmasa yoki default matn bo'lsa, nusxalamaslik
            return;
        }

        // Parolni clipboard'ga nusxalash
        navigator.clipboard.writeText(password).then(function() {
            console.log('Parol clipboard\'ga nusxalandi!');
            // Bu yerda foydalanuvchiga nusxalanganligini bildiruvchi xabarni ko'rsatishingiz mumkin
        })
        .catch(function(err) {
            console.error('Xatolik yuz berdi:', err);
        });
    });
});




// Parolni generatsiya qilish uchun hodisa eshituvchisi
document.getElementById("generate").addEventListener("click", function() {
    var length = document.getElementById("slider").value;
    var uppercase = document.getElementById("uppercase").checked;
    var lowercase = document.getElementById("lowercase").checked;
    var numbers = document.getElementById("number").checked;
    var symbols = document.getElementById("symbol").checked;
		
    function getCookie(name) {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
	
    const csrftoken = getCookie('csrftoken');

    fetch('/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({
            length: length,
            uppercase: uppercase,
            lowercase: lowercase,
            numbers: numbers,
            symbols: symbols
        })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").textContent = data.password;
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
