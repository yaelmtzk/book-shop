'use strict'


function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled)
}

function makeLorem(maxWords = 100) {
    const subjects = [
        'A young woman', 'An unlikely hero', 'A troubled detective', 'A brilliant scientist',
        'A forgotten child', 'A fearless rebel', 'A quiet stranger', 'A reluctant leader'
    ]

    const verbs = [
        'discovers', 'uncovers', 'confronts', 'escapes from', 'searches for',
        'is forced to face', 'begins to question', 'tries to protect'
    ]

    const objects = [
        'a dangerous secret', 'a hidden past', 'a powerful enemy', 'a mysterious artifact',
        'the truth about their family', 'a world on the edge of collapse', 'an unexpected ally'
    ]

    const consequences = [
        'that could change everything', 'before time runs out', 'while risking everything',
        'in a race against fate', 'that threatens their future', 'that challenges everything they believe',
        'with consequences no one can escape'
    ]

    let txt = ''
    let wordCount = 0

    while (wordCount < maxWords) {
        const sentence =
            subjects[Math.floor(Math.random() * subjects.length)] + ' ' +
            verbs[Math.floor(Math.random() * verbs.length)] + ' ' +
            objects[Math.floor(Math.random() * objects.length)] + ' ' +
            consequences[Math.floor(Math.random() * consequences.length)] + '. '

        const sentenceWords = sentence.trim().split(' ').length
        if (wordCount + sentenceWords > maxWords) break

        txt += sentence
        wordCount += sentenceWords
    }

    return txt.trim()
}