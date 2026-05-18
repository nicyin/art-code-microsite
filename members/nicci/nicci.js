document.querySelectorAll('.popup-fig').forEach(popup => {
    popup.style.display = 'none';
});

document.querySelectorAll('.entry-title').forEach(title => {
    title.addEventListener('click', () => {
        document.querySelectorAll('.entry-title').forEach(word => word.classList.remove('active'));
        title.classList.add('active');

        document.querySelectorAll('.popup-fig').forEach(opened => opened.style.display = 'none');

        const matching = title.dataset.target;
        const popup = document.getElementById(matching);
        if (popup) {
            popup.style.display = 'block';
        }
    });
});

document.querySelectorAll('.fig-close').forEach(close => {
    close.addEventListener('click', () => {
        close.closest('.popup-fig').style.display = 'none';
        document.querySelectorAll('.entry-title').forEach(title => title.classList.remove('active'));
    });
})

// highlight

const highlight = document.getElementById('highlight');
let highlighting = false;

function processNode(node) {
    if (node.nodeType === 3) {
        const words = node.textContent.match(/\b\w+\b|\W+/g) || [];
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word;
            if (/\b\w+\b/.test(word)) {
                span.className = 'word';
                span.dataset.word = word.toLowerCase();
            }
            node.parentNode.insertBefore(span, node);
        });
        node.parentNode.removeChild(node);
    } else if (node.nodeType === 1 && !node.classList.contains('entry-title')) {
        Array.from(node.childNodes).forEach(processNode);
    }
}

processNode(highlight);

highlight.addEventListener('mousedown', () => highlighting = true);
highlight.addEventListener('touchstart', (e) => { e.preventDefault(); highlighting = true; }, { passive: false });
highlight.addEventListener('touchmove', (e) => { if (highlighting) e.preventDefault(); }, { passive: false });

document.addEventListener('selectionchange', function() {
    if (!highlighting) return;
    const text = window.getSelection().toString().trim();
    document.querySelectorAll('.word').forEach(el => el.classList.remove('preview'));
    if (text) {
        (text.toLowerCase().match(/\b\w+\b/g) || []).forEach(word => {
            document.querySelectorAll(`.word[data-word="${word}"]:not(.revealed)`)
                .forEach(el => el.classList.add('preview'));
        });
    }
});

function onRelease() {
    if (!highlighting) return;
    highlighting = false;
    document.querySelectorAll('.word').forEach(el => el.classList.remove('preview'));
    const selection = window.getSelection();
    const text = selection.toString().trim();
    if (text) {
        (text.toLowerCase().match(/\b\w+\b/g) || []).forEach(word => {
            document.querySelectorAll(`.word[data-word="${word}"]`)
                .forEach(el => el.classList.add('revealed'));
        });
    }
    selection.removeAllRanges();
}

document.addEventListener('mouseup', onRelease);
document.addEventListener('touchend', onRelease);