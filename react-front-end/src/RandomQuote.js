
function randomQuote() {
    const quotes = [
        "\"The body achieves what the mind believes.\"",
        "\"Your body can stand almost anything.  It's your mind that you have to convince.\"",
        "\"What seems impossible today will one day become your warm-up.\"",
        "\"You did not wake up today to be mediocre.\"",
        "\"There are two types of pain in this world: pain that hurts you, and pain that changes you.\"",
        "\"It never gets easier, you just get better.\""
    ]

    return quotes[Math.floor(Math.random()*quotes.length)];
}

export default randomQuote;