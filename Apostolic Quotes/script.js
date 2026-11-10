/**
 * SACRED TESTIMONIES — SCRIPTURE INTERACTION
 * Handles scripture inscription (copy), keyboard pilgrimage navigation,
 * and reverent interactive states.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Toast Notification Setup
    let toast = document.getElementById('sacred-toast');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'sacred-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        document.body.appendChild(toast);
    }

    let toastTimer = null;
    function showToast(message) {
        if (toastTimer) clearTimeout(toastTimer);
        toast.innerHTML = `<span style="font-size: 1.1rem; filter: drop-shadow(0 0 5px #fff);">†</span> <span>${message}</span>`;
        toast.classList.add('show');
        toastTimer = setTimeout(() => {
            toast.classList.remove('show');
        }, 3200);
    }

    // 2. Scripture Card Inscription (Click to Copy Verse)
    const scriptureCards = document.querySelectorAll('.scripture-card');
    scriptureCards.forEach(card => {
        card.setAttribute('tabindex', '0');
        card.setAttribute('title', 'Click to inscribe verse into memory & clipboard');

        const copyVerse = () => {
            const refElem = card.querySelector('.verse-reference');
            const quoteElem = card.querySelector('.scripture-quote');
            const noteElem = card.querySelector('.theological-note');

            const refText = refElem ? refElem.innerText.trim() : '';
            const quoteText = quoteElem ? quoteElem.innerText.trim() : '';
            const noteText = noteElem ? ' — ' + noteElem.innerText.replace('†', '').trim() : '';

            const fullText = `"${quoteText}" (${refText})${noteText}`;

            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(fullText).then(() => {
                    showToast(`Inscribed to Clipboard: ${refText}`);
                }).catch(() => {
                    fallbackCopy(fullText, refText);
                });
            } else {
                fallbackCopy(fullText, refText);
            }
        };

        function fallbackCopy(text, ref) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                showToast(`Inscribed to Clipboard: ${ref}`);
            } catch (err) {
                showToast(`Contemplating: ${ref}`);
            }
            document.body.removeChild(textarea);
        }

        card.addEventListener('click', copyVerse);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                copyVerse();
            }
        });
    });

    // 3. Apostle Pilgrimage Keyboard Navigation (Arrow Keys: Left/Right)
    const apostleSequence = [
        { path: 'index.html', title: 'Apostle John' },
        { path: 'bartholomew.html', title: 'Apostle Bartholomew' },
        { path: 'peter.html', title: 'Apostle Peter' },
        { path: 'james.html', title: 'Apostle James' },
        { path: 'matthew.html', title: 'Apostle Matthew' },
        { path: 'andrew.html', title: 'Apostle Andrew' },
        { path: 'philip.html', title: 'Apostle Philip' },
        { path: 'thomas.html', title: 'Apostle Thomas' },
        { path: 'james-alphaeus.html', title: 'Apostle James Alphaeus' },
        { path: 'jude.html', title: 'Apostle Jude Thaddaeus' },
        { path: 'simon.html', title: 'Apostle Simon the Zealot' },
        { path: 'matthias.html', title: 'Apostle Matthias' }
    ];

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let currentIndex = apostleSequence.findIndex(item => item.path === currentPath);
    if (currentIndex === -1) {
        // Check link-one etc
        if (currentPath === 'link-one.html') currentIndex = 1;
        else if (currentPath === 'link-two.html') currentIndex = 2;
        else if (currentPath === 'link-three.html') currentIndex = 3;
        else if (currentPath === 'link-four.html') currentIndex = 4;
        else currentIndex = 0;
    }

    document.addEventListener('keydown', (e) => {
        // Only trigger if not focusing an input or textarea
        if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

        if (e.key === 'ArrowRight') {
            const nextIndex = (currentIndex + 1) % apostleSequence.length;
            window.location.href = apostleSequence[nextIndex].path;
        } else if (e.key === 'ArrowLeft') {
            const prevIndex = (currentIndex - 1 + apostleSequence.length) % apostleSequence.length;
            window.location.href = apostleSequence[prevIndex].path;
        }
    });
});
