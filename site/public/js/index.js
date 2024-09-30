function limitDescriptionLength() {
    const descriptions = document.querySelectorAll('.description');

    descriptions.forEach(desc => {
        const maxChars = 100;
        const text = desc.textContent;

        if (text.length > maxChars) {
            desc.textContent = text.slice(0, maxChars) + '...';

            desc.setAttribute('title', text);
        }
    });
}

limitDescriptionLength();