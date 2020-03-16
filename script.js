let chessFields = document.querySelectorAll('.chessField');
let whiteFigures = document.querySelectorAll('.white');
let whitePawns = document.querySelectorAll('.white.pawn');
let whiteRooks = document.querySelectorAll('.white.rook');
let whiteBishops = document.querySelectorAll('.white.bishop');
let whiteKnights = document.querySelectorAll('.white.knight');
let whiteQueens = document.querySelectorAll('.white.queen');
let whiteKings = document.querySelectorAll('.white.king');
let blackPawns = document.querySelectorAll('.black.pawn');
let blackRooks = document.querySelectorAll('.black.rook');
let blackBishops = document.querySelectorAll('.black.bishop');
let blackKnights = document.querySelectorAll('.black.knight');
let blackQueens = document.querySelectorAll('.black.queen');
let blackKings = document.querySelectorAll('.black.king');
let kingMayCastleWhite = true;
let kingMayCastleBlack = true;
let kingIsCheckedWhite = false;
let kingIsCheckedBlack = false;

let isMated = false;
let whitesPlay = true;
let moveListeners = [];
let areActiveFields = false;

function removeClickers(elem) {
    let removedClicker = null;

    if (elem.classList.contains('pawn') && elem.classList.contains('white')) {
        elem.removeEventListener('click', pawnClickWhite);
        removedClicker = pawnClickWhite;
    }
    if (elem.classList.contains('pawn') && elem.classList.contains('black')) {
        elem.removeEventListener('click', pawnClickBlack);
        removedClicker = pawnClickBlack;
    }
    if (elem.classList.contains('rook') && elem.classList.contains('white')) {
        elem.removeEventListener('click', rookClickWhite);
        removedClicker = rookClickWhite;
    }
    if (elem.classList.contains('rook') && elem.classList.contains('black')) {
        elem.removeEventListener('click', rookClickBlack);
        removedClicker = rookClickBlack;
    }
    if (elem.classList.contains('bishop') && elem.classList.contains('white')) {
        elem.removeEventListener('click', bishopClickWhite);
        removedClicker = bishopClickWhite;
    }
    if (elem.classList.contains('bishop') && elem.classList.contains('black')) {
        elem.removeEventListener('click', bishopClickBlack);
        removedClicker = bishopClickBlack;
    }
    if (elem.classList.contains('knight') && elem.classList.contains('white')) {
        elem.removeEventListener('click', knightClickWhite);
        removedClicker = knightClickWhite;
    }
    if (elem.classList.contains('knight') && elem.classList.contains('black')) {
        elem.removeEventListener('click', knightClickBlack);
        removedClicker = knightClickBlack;
    }
    if (elem.classList.contains('queen') && elem.classList.contains('white')) {
        elem.removeEventListener('click', queenClickWhite);
        removedClicker = queenClickWhite;
    }
    if (elem.classList.contains('queen') && elem.classList.contains('black')) {
        elem.removeEventListener('click', queenClickBlack);
        removedClicker = queenClickBlack;
    }
    if (elem.classList.contains('king') && elem.classList.contains('white')) {
        elem.removeEventListener('click', kingClickWhite);
        removedClicker = kingClickWhite;
    }
    if (elem.classList.contains('king') && elem.classList.contains('black')) {
        elem.removeEventListener('click', kingClickBlack);
        removedClicker = kingClickBlack;
    }

    return removedClicker;
}

whitePawns.forEach(elem => {
    elem.addEventListener('click', pawnClickWhite)
})

blackPawns.forEach(elem => {
    elem.addEventListener('click', pawnClickBlack)
})

whiteRooks.forEach(elem => {
    elem.addEventListener('click', rookClickWhite)
})

blackRooks.forEach(elem => {
    elem.addEventListener('click', rookClickBlack)
})

whiteBishops.forEach(elem => {
    elem.addEventListener('click', bishopClickWhite);
})

blackBishops.forEach(elem => {
    elem.addEventListener('click', bishopClickBlack);
})

whiteKnights.forEach(elem => {
    elem.addEventListener('click', knightClickWhite);
})

blackKnights.forEach(elem => {
    elem.addEventListener('click', knightClickBlack);
})

whiteQueens.forEach(elem => {
    elem.addEventListener('click', queenClickWhite);
})

blackQueens.forEach(elem => {
    elem.addEventListener('click', queenClickBlack)
})

whiteKings.forEach(elem => {
    elem.addEventListener('click', kingClickWhite);
})

blackKings.forEach(elem => {
    elem.addEventListener('click', kingClickBlack);
})

function isCheckForKingWhite() {
    let index;

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('king') && chessFields[i].classList.contains('white')) {
            index = i;
        }
    }

    if (index % 8 < 7) {
        if (index > 15 && chessFields[index - 15].classList.contains('black') && chessFields[index - 15].classList.contains('knight')) {
            return true;
        }

        if (index < 47 && chessFields[index + 17].classList.contains('black') && chessFields[index + 17].classList.contains('knight')) {
            return true;
        }

        if (index % 8 < 6) {
            if (index > 7 && chessFields[index - 6].classList.contains('black') && chessFields[index - 6].classList.contains('knight')) {
                return true;
            }
            if (index < 54 && chessFields[index + 10].classList.contains('black') && chessFields[index + 10].classList.contains('knight')) {
                return true;
            }
        }
    }

    if (index % 8 > 0) {
        if (index > 16 && chessFields[index - 17].classList.contains('black') && chessFields[index - 17].classList.contains('knight')) {
            return true;
        }

        if (index < 48 && chessFields[index + 15].classList.contains('black') && chessFields[index + 15].classList.contains('knight')) {
            return true;
        }

        if (index % 8 > 1) {
            if (index > 9 && chessFields[index - 10].classList.contains('black') && chessFields[index - 10].classList.contains('knight')) {
                return true;
            }

            if (index < 56 && chessFields[index + 6].classList.contains('black') && chessFields[index + 6].classList.contains('knight')) {
                return true;
            }
        }
    }

    for (let i = index; i <= 63; i += 7) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].classList.contains('black') && (chessFields[i].classList.contains('bishop')
            || chessFields[i].classList.contains('queen')(i == index + 7 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i <= 63; i += 9) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].classList.contains('black') && (chessFields[i].classList.contains('bishop')
            || chessFields[i].classList.contains('queen') || (i == index + 9 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || (i + 1) % 8 == 0) {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 7) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].classList.contains('black') && (chessFields[i].classList.contains('bishop')
            || chessFields[i].classList.contains('queen') || (i == index - 7 && (chessFields[i].classList.contains('pawn') || chessFields[i].classList.contains('king'))))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || (i + 1) % 8 == 0) {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 9) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].classList.contains('black') && (chessFields[i].classList.contains('bishop')
            || chessFields[i].classList.contains('queen') || (i == index - 9 && (chessFields[i].classList.contains('pawn') || chessFields[i].classList.contains('king'))))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i < Math.floor((index / 8) + 1) * 8; i++) {
        if (i == index) continue;
        if (chessFields[i].classList.contains('black') && (chessFields[i].classList.contains('rook')
            || chessFields[i].classList.contains('queen') || (i == index + 1 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i >= Math.floor(index / 8) * 8; i--) {
        if (i == index) continue;
        if (chessFields[i].classList.contains('black') && (chessFields[i].classList.contains('rook')
            || chessFields[i].classList.contains('queen') || (i == index - 1 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i <= 63; i += 8) {
        if (i == index) continue;
        if (chessFields[i].classList.contains('black') && (chessFields[i].classList.contains('rook')
            || chessFields[i].classList.contains('queen') || (i == index + 8 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 8) {
        if (i == index) continue;
        if (chessFields[i].classList.contains('black') && (chessFields[i].classList.contains('rook')
            || chessFields[i].classList.contains('queen') || (i == index - 8 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    return false;
}

function isCheckForKingBlack() {
    let index;

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('king') && chessFields[i].classList.contains('black')) {
            index = i;
        }
    }

    if (index % 8 < 7) {
        if (index > 15 && chessFields[index - 15].classList.contains('white') && chessFields[index - 15].classList.contains('knight')) {
            return true;
        }

        if (index < 47 && chessFields[index + 17].classList.contains('white') && chessFields[index + 17].classList.contains('knight')) {
            return true;
        }

        if (index % 8 < 6) {
            if (index > 7 && chessFields[index - 6].classList.contains('white') && chessFields[index - 6].classList.contains('knight')) {
                return true;
            }
            if (index < 54 && chessFields[index + 10].classList.contains('white') && chessFields[index + 10].classList.contains('knight')) {
                return true;
            }
        }
    }

    if (index % 8 > 0) {
        if (index > 16 && chessFields[index - 17].classList.contains('white') && chessFields[index - 17].classList.contains('knight')) {
            return true;
        }

        if (index < 48 && chessFields[index + 15].classList.contains('white') && chessFields[index + 15].classList.contains('knight')) {
            return true;
        }

        if (index % 8 > 1) {
            if (index > 9 && chessFields[index - 10].classList.contains('white') && chessFields[index - 10].classList.contains('knight')) {
                return true;
            }

            if (index < 56 && chessFields[index + 6].classList.contains('white') && chessFields[index + 6].classList.contains('knight')) {
                return true;
            }
        }
    }

    for (let i = index; i <= 63; i += 7) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].classList.contains('white') && (chessFields[i].classList.contains('bishop')
            || chessFields[i].classList.contains('queen') || (i == index + 7 && (chessFields[i].classList.contains('pawn') || chessFields[i].classList.contains('king'))))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i <= 63; i += 9) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].classList.contains('white') && (chessFields[i].classList.contains('bishop')
            || chessFields[i].classList.contains('queen') || (i == index + 9 && (chessFields[i].classList.contains('pawn') || chessFields[i].classList.contains('king'))))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || (i + 1) % 8 == 0) {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 7) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].classList.contains('white') && (chessFields[i].classList.contains('bishop')
            || chessFields[i].classList.contains('queen') || (i == index - 7 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || (i + 1) % 8 == 0) {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 9) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].classList.contains('white') && (chessFields[i].classList.contains('bishop')
            || chessFields[i].classList.contains('queen') || (i == index - 9 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i < Math.floor((index / 8) + 1) * 8; i++) {
        if (i == index) continue;
        if (chessFields[i].classList.contains('white') && (chessFields[i].classList.contains('rook')
            || chessFields[i].classList.contains('queen') || (i == index + 1 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i >= Math.floor(index / 8) * 8; i--) {
        if (i == index) continue;
        if (chessFields[i].classList.contains('white') && (chessFields[i].classList.contains('rook')
            || chessFields[i].classList.contains('queen') || (i == index - 1 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i <= 63; i += 8) {
        if (i == index) continue;
        if (chessFields[i].classList.contains('white') && (chessFields[i].classList.contains('rook')
            || chessFields[i].classList.contains('queen') || (i == index + 8 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 8) {
        if (i == index) continue;
        if (chessFields[i].classList.contains('white') && (chessFields[i].classList.contains('rook')
            || chessFields[i].classList.contains('queen') || (i == index - 8 && chessFields[i].classList.contains('king')))) {
            return true;
        } else if (!(chessFields[i].className == 'chessField' || chessFields[i].className == 'chessField active') || i % 8 == 0) {
            break;
        }
    }

    return false;
}


function isMatedWhiteKing() {
    if (!isCheckForKingWhite()) return;
    let indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('king') && chessFields[i].classList.contains('white')) {
            indexes[0] = i;
        }
    }

    let event = {
        target: chessFields[indexes[0]]
    }

    let possibleSteps = []

    let testSteps = kingClickWhite(event, true, possibleSteps);
    if (testSteps == undefined) return;

    for (let i = 0; i < testSteps.length; i++) {
        chessFields[testSteps[i]].click();
        if (possibleSteps.length != 0) {
            for (let j = i + 1; j < testSteps.length; j++) {
                chessFields[testSteps[j]].onclick = null;
                chessFields[testSteps[j]].classList.remove('active');
            }
            isMated = false;
            return false;
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('knight') && chessFields[i].classList.contains('white')) {
            indexes.push(i);
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        event = {
            target: chessFields[indexes[i]]
        }
        testSteps = knightClickWhite(event, true, possibleSteps);
        if (testSteps == undefined) return;
        for (let i = 0; i < testSteps.length; i++) {
            chessFields[testSteps[i]].click();
            if (possibleSteps.length != 0) {
                for (let j = i + 1; j < testSteps.length; j++) {
                    chessFields[testSteps[j]].onclick = null;
                    chessFields[testSteps[j]].classList.remove('active');
                }
                isMated = false;
                return false;
            }
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('queen') && chessFields[i].classList.contains('white')) {
            indexes.push(i);
        }
    }

    event = {
        target: chessFields[indexes[0]]
    }

    testSteps = queenClickWhite(event, true, possibleSteps);
    if (testSteps == undefined) return;
    for (let i = 0; i < testSteps.length; i++) {
        chessFields[testSteps[i]].click();
        if (possibleSteps.length != 0) {
            for (let j = i + 1; j < testSteps.length; j++) {
                chessFields[testSteps[j]].onclick = null;
                chessFields[testSteps[j]].classList.remove('active');
            }
            isMated = false;
            return false;
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('bishop') && chessFields[i].classList.contains('white')) {
            indexes.push(i);
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        event = {
            target: chessFields[indexes[i]]
        }
        testSteps = bishopClickWhite(event, true, possibleSteps);
        if (testSteps == undefined) return;
        for (let i = 0; i < testSteps.length; i++) {
            chessFields[testSteps[i]].click();
            if (possibleSteps.length != 0) {
                for (let j = i + 1; j < testSteps.length; j++) {
                    chessFields[testSteps[j]].onclick = null;
                    chessFields[testSteps[j]].classList.remove('active');
                }
                isMated = false;
                return false;
            }
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('pawn') && chessFields[i].classList.contains('white')) {
            indexes.push(i);
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        event = {
            target: chessFields[indexes[i]]
        }
        testSteps = pawnClickWhite(event, true, possibleSteps);
        if (testSteps == undefined) return;
        for (let i = 0; i < testSteps.length; i++) {
            chessFields[testSteps[i]].click();
            if (possibleSteps.length != 0) {
                for (let j = i + 1; j < testSteps.length; j++) {
                    chessFields[testSteps[j]].onclick = null;
                    chessFields[testSteps[j]].classList.remove('active');
                }
                isMated = false;
                return false;
            }
        }
    }

    indexes = [];

    for (let i = 0; i < indexes.length; i++) {
        event = {
            target: chessFields[indexes[i]]
        }
        testSteps = rookClickWhite(event, true, possibleSteps);
        if (testSteps == undefined) return;
        for (let i = 0; i < testSteps.length; i++) {
            chessFields[testSteps[i]].click();
            if (possibleSteps.length != 0) {
                for (let j = i + 1; j < testSteps.length; j++) {
                    chessFields[testSteps[j]].onclick = null;
                    chessFields[testSteps[j]].classList.remove('active');
                }
                isMated = false;
                return false;
            }
        }
    }

    isMated = true;
    return true;
}

function isMatedBlackKing() {
    if (!isCheckForKingBlack()) return 'no check';
    let indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('king') && chessFields[i].classList.contains('black')) {
            indexes[0] = i;
        }
    }

    let event = {
        target: chessFields[indexes[0]]
    }

    let possibleSteps = []

    let testSteps = kingClickBlack(event, true, possibleSteps);
    if (testSteps == undefined) return 'king';

    for (let i = 0; i < testSteps.length; i++) {
        chessFields[testSteps[i]].click();
        if (possibleSteps.length != 0) {
            for (let j = i + 1; j < testSteps.length; j++) {
                chessFields[testSteps[j]].onclick = null;
                chessFields[testSteps[j]].classList.remove('active');
            }
            isMated = false;
            return false;
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('knight') && chessFields[i].classList.contains('black')) {
            indexes.push(i);
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        event = {
            target: chessFields[indexes[i]]
        }
        testSteps = knightClickBlack(event, true, possibleSteps);
        if (testSteps == undefined) return 'knight';
        for (let i = 0; i < testSteps.length; i++) {
            chessFields[testSteps[i]].click();
            if (possibleSteps.length != 0) {
                for (let j = i + 1; j < testSteps.length; j++) {
                    chessFields[testSteps[j]].onclick = null;
                    chessFields[testSteps[j]].classList.remove('active');
                }
                isMated = false;
                console.log('knight is false')
                return false;
            }
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('queen') && chessFields[i].classList.contains('black')) {
            indexes.push(i);
        }
    }

    event = {
        target: chessFields[indexes[0]]
    }

    testSteps = queenClickBlack(event, true, possibleSteps);
    if (testSteps == undefined) return 'queen';
    for (let i = 0; i < testSteps.length; i++) {
        chessFields[testSteps[i]].click();
        if (possibleSteps.length != 0) {
            for (let j = i + 1; j < testSteps.length; j++) {
                chessFields[testSteps[j]].onclick = null;
                chessFields[testSteps[j]].classList.remove('active');
            }
            isMated = false;
            console.log('queen is false')
            return false;
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('bishop') && chessFields[i].classList.contains('black')) {
            indexes.push(i);
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        event = {
            target: chessFields[indexes[i]]
        }
        testSteps = bishopClickBlack(event, true, possibleSteps);
        if (testSteps == undefined) return 'bishop';
        for (let i = 0; i < testSteps.length; i++) {
            chessFields[testSteps[i]].click();
            if (possibleSteps.length != 0) {
                for (let j = i + 1; j < testSteps.length; j++) {
                    chessFields[testSteps[j]].onclick = null;
                    chessFields[testSteps[j]].classList.remove('active');
                }
                isMated = false;
                console.log('bishop is false')
                return false;
            }
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('pawn') && chessFields[i].classList.contains('black')) {
            indexes.push(i);
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        event = {
            target: chessFields[indexes[i]]
        }
        testSteps = pawnClickBlack(event, true, possibleSteps);
        if (testSteps == undefined) return 'pawn';
        for (let i = 0; i < testSteps.length; i++) {
            chessFields[testSteps[i]].click();
            if (possibleSteps.length != 0) {
                for (let j = i + 1; j < testSteps.length; j++) {
                    chessFields[testSteps[j]].onclick = null;
                    chessFields[testSteps[j]].classList.remove('active');
                }
                isMated = false;
                console.log('pawn is false')
                return false;
            }
        }
    }

    indexes = [];

    for (let i = 0; i < chessFields.length; i++) {
        if (chessFields[i].classList.contains('rook') && chessFields[i].classList.contains('black')) {
            indexes.push(i);
        }
    }

    for (let i = 0; i < indexes.length; i++) {
        event = {
            target: chessFields[indexes[i]]
        }
        testSteps = rookClickBlack(event, true, possibleSteps);
        if (testSteps == undefined) return 'rook';
        for (let i = 0; i < testSteps.length; i++) {
            chessFields[testSteps[i]].click();
            if (possibleSteps.length != 0) {
                for (let j = i + 1; j < testSteps.length; j++) {
                    chessFields[testSteps[j]].onclick = null;
                    chessFields[testSteps[j]].classList.remove('active');
                }
                isMated = false;
                console.log('rook is false')
                return false;
            }
        }
    }

    isMated = true;
    return true;
}

function knightClickWhite(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (!whitesPlay) return;

    function knightMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', knightClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'knight');
        chessFields[indexOfTarget].addEventListener('click', knightClickWhite);

        if (!mateCheck) {
            if (index % 8 < 7) {
                if (index > 15) {
                    chessFields[index - 15].classList.remove('active');
                    chessFields[index - 15].onclick = null;
                }

                if (index < 47) {
                    chessFields[index + 17].classList.remove('active');
                    chessFields[index + 17].onclick = null;
                }

                if (index % 8 < 6) {
                    if (index > 7) {
                        chessFields[index - 6].classList.remove('active');
                        chessFields[index - 6].onclick = null;
                    }

                    if (index < 54) {
                        chessFields[index + 10].classList.remove('active');
                        chessFields[index + 10].onclick = null;
                    }
                }
            }

            if (index % 8 > 0) {
                if (index > 16) {
                    chessFields[index - 17].classList.remove('active');
                    chessFields[index - 17].onclick = null;
                }

                if (index < 48) {
                    chessFields[index + 15].classList.remove('active');
                    chessFields[index + 15].onclick = null;
                }

                if (index % 8 > 1) {
                    if (index > 9) {
                        chessFields[index - 10].classList.remove('active');
                        chessFields[index - 10].onclick = null;
                    }

                    if (index < 56) {
                        chessFields[index + 6].classList.remove('active');
                        chessFields[index + 6].onclick = null;
                    }
                }
            }

        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', knightClickWhite)
            chessFields[index].className = "chessField white knight";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].removeEventListener('click', knightClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    function knightEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        let initialClassName = chessFields[indexOfTarget].className;
        chessFields[index].removeEventListener('click', knightClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'knight');
        chessFields[indexOfTarget].addEventListener('click', knightClickWhite);

        if (!mateCheck) {
            if (index % 8 < 7) {
                if (index > 15) {
                    chessFields[index - 15].classList.remove('active');
                    chessFields[index - 15].onclick = null;
                }

                if (index < 47) {
                    chessFields[index + 17].classList.remove('active');
                    chessFields[index + 17].onclick = null;
                }

                if (index % 8 < 6) {
                    if (index > 7) {
                        chessFields[index - 6].classList.remove('active');
                        chessFields[index - 6].onclick = null;
                    }

                    if (index < 54) {
                        chessFields[index + 10].classList.remove('active');
                        chessFields[index + 10].onclick = null;
                    }
                }
            }

            if (index % 8 > 0) {
                if (index > 16) {
                    chessFields[index - 17].classList.remove('active');
                    chessFields[index - 17].onclick = null;
                }

                if (index < 48) {
                    chessFields[index + 15].classList.remove('active');
                    chessFields[index + 15].onclick = null;
                }

                if (index % 8 > 1) {
                    if (index > 9) {
                        chessFields[index - 10].classList.remove('active');
                        chessFields[index - 10].onclick = null;
                    }

                    if (index < 56) {
                        chessFields[index + 6].classList.remove('active');
                        chessFields[index + 6].onclick = null;
                    }
                }
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', knightClickWhite)
            chessFields[index].className = "chessField white knight";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', knightClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    if (index % 8 < 7) {
        if (index > 15 && chessFields[index - 15].className == 'chessField') {
            chessFields[index - 15].classList.add('active');
            chessFields[index - 15].onclick = knightMove;
            possibleMovements.push(index - 15);
        } else if (index > 15 && chessFields[index - 15].classList.contains('black') && !chessFields[index - 15].classList.contains('king')) {
            chessFields[index - 15].classList.add('active');
            chessFields[index - 15].onclick = knightEats;
            possibleMovements.push(index - 15);
        }

        if (index < 47 && chessFields[index + 17].className == 'chessField') {
            chessFields[index + 17].classList.add('active');
            chessFields[index + 17].onclick = knightMove;
            possibleMovements.push(index + 17);
        } else if (index < 47 && chessFields[index + 17].classList.contains('black') && !chessFields[index + 17].classList.contains('king')) {
            chessFields[index + 17].classList.add('active');
            chessFields[index + 17].onclick = knightEats;
            possibleMovements.push(index + 17);
        }

        if (index % 8 < 6) {
            if (index > 7 && chessFields[index - 6].className == 'chessField') {
                chessFields[index - 6].classList.add('active');
                chessFields[index - 6].onclick = knightMove;
                possibleMovements.push(index - 6);
            } else if (index > 7 && chessFields[index - 6].classList.contains('black') && !chessFields[index - 6].classList.contains('king')) {
                chessFields[index - 6].classList.add('active');
                chessFields[index - 6].onclick = knightEats;
                possibleMovements.push(index - 6);
            }

            if (index < 54 && chessFields[index + 10].className == 'chessField') {
                chessFields[index + 10].classList.add('active');
                chessFields[index + 10].onclick = knightMove;
                possibleMovements.push(index + 10);
            } else if (index < 54 && chessFields[index + 10].classList.contains('black') && !chessFields[index + 10].classList.contains('king')) {
                chessFields[index + 10].classList.add('active');
                chessFields[index + 10].onclick = knightEats;
                possibleMovements.push(index + 10);
            }
        }
    }

    if (index % 8 > 0) {
        if (index > 16 && chessFields[index - 17].className == 'chessField') {
            chessFields[index - 17].classList.add('active');
            chessFields[index - 17].onclick = knightMove;
            possibleMovements.push(index - 17);
        } else if (index > 16 && chessFields[index - 17].classList.contains('black') && !chessFields[index - 17].classList.contains('king')) {
            chessFields[index - 17].classList.add('active');
            chessFields[index - 17].onclick = knightEats;
            possibleMovements.push(index - 17);
        }

        if (index < 48 && chessFields[index + 15].className == 'chessField') {
            chessFields[index + 15].classList.add('active');
            chessFields[index + 15].onclick = knightMove;
            possibleMovements.push(index + 15);
        } else if (index < 48 && chessFields[index + 15].classList.contains('black') && !chessFields[index + 15].classList.contains('king')) {
            chessFields[index + 15].classList.add('active');
            chessFields[index + 15].onclick = knightEats;
            possibleMovements.push(index + 15);
        }

        if (index % 8 > 1) {
            if (index > 9 && chessFields[index - 10].className == 'chessField') {
                chessFields[index - 10].classList.add('active');
                chessFields[index - 10].onclick = knightMove;
                possibleMovements.push(index - 10);
            } else if (index > 9 && chessFields[index - 10].classList.contains('black') && !chessFields[index - 10].classList.contains('king')) {
                chessFields[index - 10].classList.add('active');
                chessFields[index - 10].onclick = knightEats;
                possibleMovements.push(index - 10);
            }

            if (index < 56 && chessFields[index + 6].className == 'chessField') {
                chessFields[index + 6].classList.add('active');
                chessFields[index + 6].onclick = knightMove;
                possibleMovements.push(index + 6);
            } else if (index < 56 && chessFields[index + 6].classList.contains('black') && !chessFields[index + 6].classList.contains('king')) {
                chessFields[index + 6].classList.add('active');
                chessFields[index + 6].onclick = knightEats;
                possibleMovements.push(index + 6);
            }
        }
    }

    areActiveFields = true;

    return possibleMovements;
}

function knightClickBlack(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (whitesPlay) return;

    function knightMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', knightClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('black', 'knight');
        chessFields[indexOfTarget].addEventListener('click', knightClickBlack);

        if (!mateCheck) {
            if (index % 8 < 7) {
                if (index > 15) {
                    chessFields[index - 15].classList.remove('active');
                    chessFields[index - 15].onclick = null;
                }

                if (index < 47) {
                    chessFields[index + 17].classList.remove('active');
                    chessFields[index + 17].onclick = null;
                }

                if (index % 8 < 6) {
                    if (index > 7) {
                        chessFields[index - 6].classList.remove('active');
                        chessFields[index - 6].onclick = null;
                    }

                    if (index < 54) {
                        chessFields[index + 10].classList.remove('active');
                        chessFields[index + 10].onclick = null;
                    }
                }
            }

            if (index % 8 > 0) {
                if (index > 16) {
                    chessFields[index - 17].classList.remove('active');
                    chessFields[index - 17].onclick = null;
                }

                if (index < 48) {
                    chessFields[index + 15].classList.remove('active');
                    chessFields[index + 15].onclick = null;
                }

                if (index % 8 > 1) {
                    if (index > 9) {
                        chessFields[index - 10].classList.remove('active');
                        chessFields[index - 10].onclick = null;
                    }

                    if (index < 56) {
                        chessFields[index + 6].classList.remove('active');
                        chessFields[index + 6].onclick = null;
                    }
                }
            }

        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', knightClickBlack)
            chessFields[index].className = "chessField black knight";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].removeEventListener('click', knightClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    function knightEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        let initialClassName = chessFields[indexOfTarget].className;
        chessFields[index].removeEventListener('click', knightClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField";
        chessFields[indexOfTarget].classList.add('black', 'knight');
        chessFields[indexOfTarget].addEventListener('click', knightClickBlack);

        if (!mateCheck) {
            if (index % 8 < 7) {
                if (index > 15) {
                    chessFields[index - 15].classList.remove('active');
                    chessFields[index - 15].onclick = null;
                }

                if (index < 47) {
                    chessFields[index + 17].classList.remove('active');
                    chessFields[index + 17].onclick = null;
                }

                if (index % 8 < 6) {
                    if (index > 7) {
                        chessFields[index - 6].classList.remove('active');
                        chessFields[index - 6].onclick = null;
                    }

                    if (index < 54) {
                        chessFields[index + 10].classList.remove('active');
                        chessFields[index + 10].onclick = null;
                    }
                }
            }

            if (index % 8 > 0) {
                if (index > 16) {
                    chessFields[index - 17].classList.remove('active');
                    chessFields[index - 17].onclick = null;
                }

                if (index < 48) {
                    chessFields[index + 15].classList.remove('active');
                    chessFields[index + 15].onclick = null;
                }

                if (index % 8 > 1) {
                    if (index > 9) {
                        chessFields[index - 10].classList.remove('active');
                        chessFields[index - 10].onclick = null;
                    }

                    if (index < 56) {
                        chessFields[index + 6].classList.remove('active');
                        chessFields[index + 6].onclick = null;
                    }
                }
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', knightClickBlack)
            chessFields[index].className = "chessField black knight";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', knightClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }
        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    if (index % 8 < 7) {
        if (index > 15 && chessFields[index - 15].className == 'chessField') {
            chessFields[index - 15].classList.add('active');
            chessFields[index - 15].onclick = knightMove;
            possibleMovements.push(index - 15);
        } else if (index > 15 && chessFields[index - 15].classList.contains('white') && !chessFields[index - 15].classList.contains('king')) {
            chessFields[index - 15].classList.add('active');
            chessFields[index - 15].onclick = knightEats;
            possibleMovements.push(index - 15);
        }

        if (index < 47 && chessFields[index + 17].className == 'chessField') {
            chessFields[index + 17].classList.add('active');
            chessFields[index + 17].onclick = knightMove;
            possibleMovements.push(index + 17);
        } else if (index < 47 && chessFields[index + 17].classList.contains('white') && !chessFields[index + 17].classList.contains('king')) {
            chessFields[index + 17].classList.add('active');
            chessFields[index + 17].onclick = knightEats;
            possibleMovements.push(index + 17);
        }

        if (index % 8 < 6) {
            if (index > 7 && chessFields[index - 6].className == 'chessField') {
                chessFields[index - 6].classList.add('active');
                chessFields[index - 6].onclick = knightMove;
                possibleMovements.push(index - 6);
            } else if (index > 7 && chessFields[index - 6].classList.contains('white') && !chessFields[index - 6].classList.contains('king')) {
                chessFields[index - 6].classList.add('active');
                chessFields[index - 6].onclick = knightEats;
                possibleMovements.push(index - 6);
            }

            if (index < 54 && chessFields[index + 10].className == 'chessField') {
                chessFields[index + 10].classList.add('active');
                chessFields[index + 10].onclick = knightMove;
                possibleMovements.push(index + 10);
            } else if (index < 54 && chessFields[index + 10].classList.contains('white') && !chessFields[index + 10].classList.contains('king')) {
                chessFields[index + 10].classList.add('active');
                chessFields[index + 10].onclick = knightEats;
                possibleMovements.push(index + 10);
            }
        }
    }

    if (index % 8 > 0) {
        if (index > 16 && chessFields[index - 17].className == 'chessField') {
            chessFields[index - 17].classList.add('active');
            chessFields[index - 17].onclick = knightMove;
            possibleMovements.push(index - 17);
        } else if (index > 16 && chessFields[index - 17].classList.contains('white') && !chessFields[index - 17].classList.contains('king')) {
            chessFields[index - 17].classList.add('active');
            chessFields[index - 17].onclick = knightEats;
            possibleMovements.push(index - 17);
        }

        if (index < 48 && chessFields[index + 15].className == 'chessField') {
            chessFields[index + 15].classList.add('active');
            chessFields[index + 15].onclick = knightMove;
            possibleMovements.push(index + 15);
        } else if (index < 48 && chessFields[index + 15].classList.contains('white') && !chessFields[index + 15].classList.contains('king')) {
            chessFields[index + 15].classList.add('active');
            chessFields[index + 15].onclick = knightEats;
            possibleMovements.push(index + 15);
        }

        if (index % 8 > 1) {
            if (index > 9 && chessFields[index - 10].className == 'chessField') {
                chessFields[index - 10].classList.add('active');
                chessFields[index - 10].onclick = knightMove;
                possibleMovements.push(index - 10);
            } else if (index > 9 && chessFields[index - 10].classList.contains('white') && !chessFields[index - 10].classList.contains('king')) {
                chessFields[index - 10].classList.add('active');
                chessFields[index - 10].onclick = knightEats;
                possibleMovements.push(index - 10);
            }

            if (index < 56 && chessFields[index + 6].className == 'chessField') {
                chessFields[index + 6].classList.add('active');
                chessFields[index + 6].onclick = knightMove;
                possibleMovements.push(index + 6);
            } else if (index < 56 && chessFields[index + 6].classList.contains('white') && !chessFields[index + 6].classList.contains('king')) {
                chessFields[index + 6].classList.add('active');
                chessFields[index + 6].onclick = knightEats;
                possibleMovements.push(index + 6);
            }
        }
    }

    areActiveFields = true;

    return possibleMovements;
}

function kingClickWhite(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (!whitesPlay) return;

    function kingMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', kingClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'king');
        chessFields[indexOfTarget].addEventListener('click', kingClickWhite);

        if (!mateCheck) {
            if (index >= 1) {
                chessFields[index - 1].onclick = null;
                chessFields[index - 1].classList.remove('active');
                if (index >= 7) {
                    chessFields[index - 7].onclick = null;
                    chessFields[index - 7].classList.remove('active');
                    if (index >= 8) {
                        chessFields[index - 8].onclick = null;
                        chessFields[index - 8].classList.remove('active');
                        if (index >= 9) {
                            chessFields[index - 9].onclick = null;
                            chessFields[index - 9].classList.remove('active');
                        }
                    }
                }
            }

            if (index <= 62) {
                chessFields[index + 1].onclick = null;
                chessFields[index + 1].classList.remove('active');
                if (index <= 56) {
                    chessFields[index + 7].onclick = null;
                    chessFields[index + 7].classList.remove('active');
                    if (index <= 55) {
                        chessFields[index + 8].onclick = null;
                        chessFields[index + 8].classList.remove('active');
                        if (index <= 54) {
                            chessFields[index + 9].onclick = null;
                            chessFields[index + 9].classList.remove('active');
                        }
                    }
                }
            }

            chessFields[62].onclick = null;
            chessFields[62].classList.remove('active');
            chessFields[58].onclick = null;
            chessFields[58].classList.remove('active');
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', kingClickWhite)
            chessFields[index].className = "chessField white king";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].removeEventListener('click', kingClickWhite);
            areActiveFields = false;
            return false;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
        kingMayCastleWhite = false;
    }

    function kingEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        let initialClassName = chessFields[indexOfTarget].className;
        chessFields[index].removeEventListener('click', kingClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'king');
        chessFields[indexOfTarget].addEventListener('click', kingClickWhite);

        if (!mateCheck) {
            if (index >= 1) {
                chessFields[index - 1].onclick = null;
                chessFields[index - 1].classList.remove('active');
                if (index >= 7) {
                    chessFields[index - 7].onclick = null;
                    chessFields[index - 7].classList.remove('active');
                    if (index >= 8) {
                        chessFields[index - 8].onclick = null;
                        chessFields[index - 8].classList.remove('active');
                        if (index >= 9) {
                            chessFields[index - 9].onclick = null;
                            chessFields[index - 9].classList.remove('active');
                        }
                    }
                }
            }

            if (index <= 62) {
                chessFields[index + 1].onclick = null;
                chessFields[index + 1].classList.remove('active');
                if (index <= 56) {
                    chessFields[index + 7].onclick = null;
                    chessFields[index + 7].classList.remove('active');
                    if (index <= 55) {
                        chessFields[index + 8].onclick = null;
                        chessFields[index + 8].classList.remove('active');
                        if (index <= 54) {
                            chessFields[index + 9].onclick = null;
                            chessFields[index + 9].classList.remove('active');
                        }
                    }
                }
            }

            chessFields[62].onclick = null;
            chessFields[62].classList.remove('active');
            chessFields[57].onclick = null;
            chessFields[57].classList.remove('active');

        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', kingClickWhite)
            chessFields[index].className = "chessField white king";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].classList.remove('active')
            chessFields[indexOfTarget].removeEventListener('click', kingClickWhite)
            chessFields[indexOfTarget].addEventListener('click', removedClicker)
            areActiveFields = false;
            return false;
        }


        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
        kingMayCastleWhite = false;
    }

    function kingCastlesShort(event) {
        console.log(isCheckForKingWhite());
        if (isCheckForKingWhite()) {
            chessFields[51].onclick = null;
            chessFields[52].onclick = null;
            chessFields[53].onclick = null;
            chessFields[61].onclick = null;
            chessFields[59].onclick = null;
            chessFields[58].onclick = null;
            chessFields[62].onclick = null;
            chessFields[51].classList.remove('active');
            chessFields[52].classList.remove('active');
            chessFields[53].classList.remove('active');
            chessFields[61].classList.remove('active');
            chessFields[59].classList.remove('active');
            chessFields[58].classList.remove('active');
            chessFields[62].classList.remove('active');
            return;
        }

        for (let i = 61; i <= 62; i++) {
            chessFields[60].className = 'chessField';
            chessFields[60].removeEventListener('click', kingClickWhite);
            chessFields[i].classList.remove('active');
            chessFields[i].onclick = null;
            chessFields[i].className = 'chessField white king';
            chessFields[i].addEventListener('click', kingClickWhite);
            if (isCheckForKingWhite()) {
                chessFields[i].className = 'chessField';
                chessFields[i].removeEventListener('click', kingClickWhite);
                chessFields[60].className = 'chessField white king';
                chessFields[60].addEventListener('click', kingClickWhite);
                break
            } else if (!isCheckForKingWhite() && i == 62) {
                chessFields[63].className = 'chessField';
                chessFields[63].removeEventListener('click', rookClickWhite);
                chessFields[61].className = 'chessField white rook';
                chessFields[61].addEventListener('click', rookClickWhite);
                kingMayCastleWhite = false;
                whitesPlay = false;
            }
        }

        chessFields[51].onclick = null;
        chessFields[52].onclick = null;
        chessFields[53].onclick = null;
        chessFields[61].onclick = null;
        chessFields[59].onclick = null;
        chessFields[58].onclick = null;
        chessFields[62].onclick = null;
        chessFields[51].classList.remove('active');
        chessFields[52].classList.remove('active');
        chessFields[53].classList.remove('active');
        chessFields[61].classList.remove('active');
        chessFields[59].classList.remove('active');
        chessFields[58].classList.remove('active');
        chessFields[62].classList.remove('active');
    }

    function kingCastlesLong(event) {
        if (isCheckForKingWhite()) {
            chessFields[51].onclick = null;
            chessFields[52].onclick = null;
            chessFields[53].onclick = null;
            chessFields[61].onclick = null;
            chessFields[59].onclick = null;
            chessFields[62].onclick = null;
            chessFields[58].onclick = null;
            chessFields[51].classList.remove('active');
            chessFields[52].classList.remove('active');
            chessFields[53].classList.remove('active');
            chessFields[61].classList.remove('active');
            chessFields[59].classList.remove('active');
            chessFields[62].classList.remove('active');
            chessFields[52].classList.remove('active');
            chessFields[58].classList.remove('active');
            return;
        }

        for (let i = 59; i >= 58; i--) {
            chessFields[60].className = 'chessField';
            chessFields[60].removeEventListener('click', kingClickWhite);
            chessFields[i].classList.remove('active');
            chessFields[i].onclick = null;
            chessFields[i].className = 'chessField white king';
            chessFields[i].addEventListener('click', kingClickWhite);
            if (isCheckForKingWhite()) {
                chessFields[i].className = 'chessField';
                chessFields[i].removeEventListener('click', kingClickWhite);
                chessFields[60].className = 'chessField white king';
                chessFields[60].addEventListener('click', kingClickWhite);
                break
            } else if (!isCheckForKingWhite() && i == 6) {
                chessFields[56].className = 'chessField';
                chessFields[56].removeEventListener('click', rookClickWhite);
                chessFields[59].className = 'chessField white rook';
                chessFields[59].addEventListener('click', rookClickWhite);
                kingMayCastleWhite = false;
                whitesPlay = false;
            }
        }

        chessFields[51].onclick = null;
        chessFields[52].onclick = null;
        chessFields[53].onclick = null;
        chessFields[61].onclick = null;
        chessFields[59].onclick = null;
        chessFields[62].onclick = null;
        chessFields[57].onclick = null;
        chessFields[51].classList.remove('active');
        chessFields[52].classList.remove('active');
        chessFields[53].classList.remove('active');
        chessFields[61].classList.remove('active');
        chessFields[59].classList.remove('active');
        chessFields[62].classList.remove('active');
        chessFields[52].classList.remove('active');
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    if (kingMayCastleWhite && chessFields[63].className == 'chessField white rook'
        && chessFields[61].className == 'chessField' && chessFields[62].className == 'chessField') {
        chessFields[62].classList.add('active');
        chessFields[62].onclick = kingCastlesShort;
    }

    if (kingMayCastleWhite && chessFields[56].className == 'chessField white rook'
        && chessFields[59].className == 'chessField' && chessFields[58].className == 'chessField'
        && chessFields[57].className == 'chessField') {
        chessFields[58].classList.add('active');
        chessFields[58].onclick = kingCastlesLong;
    }

    if (index % 8 != 0 && chessFields[index - 1].className == 'chessField') {
        chessFields[index - 1].onclick = kingMove;
        chessFields[index - 1].classList.add('active');
        possibleMovements.push(index - 1)
    } else if (index % 8 != 0 && chessFields[index - 1].classList.contains('black') && !chessFields[index - 1].classList.contains('king')) {
        chessFields[index - 1].onclick = kingEats;
        possibleMovements.push(index - 1);
        chessFields[index - 1].classList.add('active');
    }

    if ((index + 1) % 8 != 0 && chessFields[index + 1].className == 'chessField') {
        chessFields[index + 1].onclick = kingMove;
        possibleMovements.push(index + 1)
        chessFields[index + 1].classList.add('active');
    } else if ((index + 1) % 8 != 0 && chessFields[index + 1].classList.contains('black') && !chessFields[index + 1].classList.contains('king')) {
        chessFields[index + 1].onclick = kingEats;
        possibleMovements.push(index + 1);
        chessFields[index + 1].classList.add('active');
    }

    if (index > 7) {
        if (chessFields[index - 8].className == 'chessField') {
            chessFields[index - 8].onclick = kingMove;
            possibleMovements.push(index - 8)
            chessFields[index - 8].classList.add('active')
        } else if (chessFields[index - 8].classList.contains('black') && !chessFields[index - 8].classList.contains('king')) {
            chessFields[index - 8].onclick = kingEats;
            possibleMovements.push(index - 8);
            chessFields[index - 8].classList.add('active')
        }
        if (index % 8 != 0 && chessFields[index - 9].className == 'chessField') {
            chessFields[index - 9].onclick = kingMove;
            possibleMovements.push(index - 9)
            chessFields[index - 9].classList.add('active')
        } else if (index % 8 != 0 && chessFields[index - 9].classList.contains('black') && !chessFields[index - 9].classList.contains('king')) {
            chessFields[index - 9].onclick = kingEats;
            possibleMovements.push(index - 9);
            chessFields[index - 9].classList.add('active')
        }
        if ((index + 1) % 8 != 0 && chessFields[index - 7].className == 'chessField') {
            chessFields[index - 7].onclick = kingMove;
            possibleMovements.push(index - 7)
            chessFields[index - 7].classList.add('active')
        } else if ((index + 1) % 8 != 0 && chessFields[index - 7].classList.contains('black') && !chessFields[index - 7].classList.contains('king')) {
            chessFields[index - 7].onclick = kingEats;
            possibleMovements.push(index - 7);
            chessFields[index - 7].classList.add('active')
        }
    }

    if (index < 56) {
        if (chessFields[index + 8].className == 'chessField') {
            chessFields[index + 8].onclick = kingMove;
            possibleMovements.push(index + 8)
            chessFields[index + 8].classList.add('active')
        } else if (chessFields[index + 8].classList.contains('black') && !chessFields[index + 8].classList.contains('king')) {
            chessFields[index + 8].onclick = kingEats;
            possibleMovements.push(index + 8);
            chessFields[index + 8].classList.add('active')
        }
        if ((index + 1) % 8 != 0 && chessFields[index + 9].className == 'chessField') {
            chessFields[index + 9].onclick = kingMove;
            possibleMovements.push(index + 9)
            chessFields[index + 9].classList.add('active')
        } else if ((index + 1) % 8 != 0 && chessFields[index + 9].classList.contains('black') && !chessFields[index + 9].classList.contains('king')) {
            chessFields[index + 9].onclick = kingEats;
            possibleMovements.push(index + 9);
            chessFields[index + 9].classList.add('active')
        }
        if (index % 8 != 0 && chessFields[index + 7].className == 'chessField') {
            chessFields[index + 7].onclick = kingMove;
            possibleMovements.push(index + 7)
            chessFields[index + 7].classList.add('active')
        } else if (index % 8 != 0 && chessFields[index + 7].classList.contains('black') && !chessFields[index + 7].classList.contains('king')) {
            chessFields[index + 7].onclick = kingEats;
            possibleMovements.push(index + 7);
            chessFields[index + 7].classList.add('active')
        }
    }

    areActiveFields = true;

    return possibleMovements
}

function kingClickBlack(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (whitesPlay) return;

    function kingMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', kingClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('black', 'king');
        chessFields[indexOfTarget].addEventListener('click', kingClickBlack);

        if (!mateCheck) {
            if (index >= 1) {
                chessFields[index - 1].onclick = null;
                chessFields[index - 1].classList.remove('active');
                if (index >= 7) {
                    chessFields[index - 7].onclick = null;
                    chessFields[index - 7].classList.remove('active');
                    if (index >= 8) {
                        chessFields[index - 8].onclick = null;
                        chessFields[index - 8].classList.remove('active');
                        if (index >= 9) {
                            chessFields[index - 9].onclick = null;
                            chessFields[index - 9].classList.remove('active');
                        }
                    }
                }
            }

            if (index <= 54) {
                chessFields[index + 9].onclick = null;
                chessFields[index + 9].classList.remove('active');
                if (index <= 55) {
                    chessFields[index + 8].onclick = null;
                    chessFields[index + 8].classList.remove('active');
                    if (index <= 56) {
                        chessFields[index + 7].onclick = null;
                        chessFields[index + 7].classList.remove('active');
                        if (index <= 62) {
                            chessFields[index + 1].onclick = null;
                            chessFields[index + 1].classList.remove('active');
                        }
                    }
                }
            }

            chessFields[2].onclick = null;
            chessFields[2].classList.remove('active');
            chessFields[6].onclick = null;
            chessFields[6].classList.remove('active');

        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', kingClickBlack)
            chessFields[index].className = "chessField black king";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].removeEventListener('click', kingClickBlack);
            areActiveFields = false;
            return false;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
        kingMayCastleBlack = false;
    }

    function kingEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        let initialClassName = chessFields[indexOfTarget].className;
        chessFields[index].removeEventListener('click', kingClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField black king";
        chessFields[indexOfTarget].addEventListener('click', kingClickBlack);

        if (!mateCheck) {
            if (index >= 1) {
                chessFields[index - 1].onclick = null;
                chessFields[index - 1].classList.remove('active');
                if (index >= 7) {
                    chessFields[index - 7].onclick = null;
                    chessFields[index - 7].classList.remove('active');
                    if (index >= 8) {
                        chessFields[index - 8].onclick = null;
                        chessFields[index - 8].classList.remove('active');
                        if (index >= 9) {
                            chessFields[index - 9].onclick = null;
                            chessFields[index - 9].classList.remove('active');
                        }
                    }
                }
            }

            if (index <= 54) {
                chessFields[index + 9].onclick = null;
                chessFields[index + 9].classList.remove('active');
                if (index <= 55) {
                    chessFields[index + 8].onclick = null;
                    chessFields[index + 8].classList.remove('active');
                    if (index <= 56) {
                        chessFields[index + 7].onclick = null;
                        chessFields[index + 7].classList.remove('active');
                        if (index <= 62) {
                            chessFields[index + 1].onclick = null;
                            chessFields[index + 1].classList.remove('active');
                        }
                    }
                }
            }

            chessFields[1].onclick = null;
            chessFields[1].classList.remove('active');
            chessFields[6].onclick = null;
            chessFields[6].classList.remove('active');
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', kingClickBlack)
            chessFields[index].className = "chessField black king";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].classList.remove('active')
            chessFields[indexOfTarget].removeEventListener('click', kingClickBlack)
            chessFields[indexOfTarget].addEventListener('click', removedClicker)
            areActiveFields = false;
            return false;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
        kingMayCastleBlack = false;
    }

    function kingCastlesShort(event) {
        if (isCheckForKingBlack()) {
            chessFields[6].classList.remove('active');
            chessFields[6].onclick = null;
            chessFields[11].onclick = null;
            chessFields[12].onclick = null;
            chessFields[13].onclick = null;
            chessFields[5].onclick = null;
            chessFields[3].onclick = null;
            chessFields[1].onclick = null;
            chessFields[11].classList.remove('active');
            chessFields[12].classList.remove('active');
            chessFields[13].classList.remove('active');
            chessFields[5].classList.remove('active');
            chessFields[3].classList.remove('active');
            chessFields[1].classList.remove('active');
            return;
        }

        for (let i = 5; i <= 6; i++) {
            chessFields[4].className = 'chessField';
            chessFields[4].removeEventListener('click', kingClickBlack);
            chessFields[i].classList.remove('active');
            chessFields[i].onclick = null;
            chessFields[i].className = 'chessField black king';
            chessFields[i].addEventListener('click', kingClickBlack);
            if (isCheckForKingBlack()) {
                chessFields[i].className = 'chessField';
                chessFields[i].removeEventListener('click', kingClickBlack);
                chessFields[4].className = 'chessField black king';
                chessFields[4].addEventListener('click', kingClickBlack);
                break
            } else if (!isCheckForKingBlack() && i == 6) {
                chessFields[7].className = 'chessField';
                chessFields[7].removeEventListener('click', rookClickBlack);
                chessFields[5].className = 'chessField black rook';
                chessFields[5].addEventListener('click', rookClickBlack);
                kingMayCastleBlack = false;
                whitesPlay = true;
            }
        }

        chessFields[11].onclick = null;
        chessFields[6].onclick = null;
        chessFields[12].onclick = null;
        chessFields[13].onclick = null;
        chessFields[5].onclick = null;
        chessFields[3].onclick = null;
        chessFields[1].onclick = null;
        chessFields[11].classList.remove('active');
        chessFields[6].classList.remove('active');
        chessFields[12].classList.remove('active');
        chessFields[13].classList.remove('active');
        chessFields[5].classList.remove('active');
        chessFields[3].classList.remove('active');
        chessFields[1].classList.remove('active');
    }

    function kingCastlesLong(event) {
        if (isCheckForKingBlack) {
            chessFields[11].onclick = null;
            chessFields[12].onclick = null;
            chessFields[13].onclick = null;
            chessFields[5].onclick = null;
            chessFields[3].onclick = null;
            chessFields[6].onclick = null;
            chessFields[2].onclick = null;
            chessFields[11].classList.remove('active');
            chessFields[12].classList.remove('active');
            chessFields[13].classList.remove('active');
            chessFields[5].classList.remove('active');
            chessFields[3].classList.remove('active');
            chessFields[6].classList.remove('active');
            chessFields[2].classList.remove('active');
            return;
        }

        for (let i = 3; i >= 2; i--) {
            chessFields[4].className = 'chessField';
            chessFields[4].removeEventListener('click', kingClickBlack);
            chessFields[i].classList.remove('active');
            chessFields[i].onclick = null;
            chessFields[i].className = 'chessField black king';
            chessFields[i].addEventListener('click', kingClickBlack);
            if (isCheckForKingBlack()) {
                chessFields[i].className = 'chessField';
                chessFields[i].removeEventListener('click', kingClickBlack);
                chessFields[4].className = 'chessField black king';
                chessFields[4].addEventListener('click', kingClickBlack);
                break
            } else if (!isCheckForKingBlack() && i == 6) {
                chessFields[0].className = 'chessField';
                chessFields[0].removeEventListener('click', rookClickBlack);
                chessFields[3].className = 'chessField black rook';
                chessFields[3].addEventListener('click', rookClickBlack);
                kingMayCastleBlack = false;
                whitesPlay = true;
            }
        }

        chessFields[11].onclick = null;
        chessFields[12].onclick = null;
        chessFields[13].onclick = null;
        chessFields[5].onclick = null;
        chessFields[3].onclick = null;
        chessFields[6].onclick = null;
        chessFields[2].onclick = null;
        chessFields[11].classList.remove('active');
        chessFields[12].classList.remove('active');
        chessFields[13].classList.remove('active');
        chessFields[5].classList.remove('active');
        chessFields[3].classList.remove('active');
        chessFields[6].classList.remove('active');
        chessFields[2].classList.remove('active');
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    if (kingMayCastleBlack && chessFields[7].className == 'chessField black rook'
        && chessFields[6].className == 'chessField' && chessFields[5].className == 'chessField') {
        chessFields[6].classList.add('active');
        chessFields[6].onclick = kingCastlesShort;
    }

    if (kingMayCastleBlack && chessFields[0].className == 'chessField black rook'
        && chessFields[3].className == 'chessField' && chessFields[2].className == 'chessField'
        && chessFields[1].className == 'chessField') {
        chessFields[2].classList.add('active');
        chessFields[2].onclick = kingCastlesLong;
    }

    if (index % 8 != 0 && chessFields[index - 1].className == 'chessField') {
        chessFields[index - 1].onclick = kingMove;
        chessFields[index - 1].classList.add('active');
        possibleMovements.push(index - 1)
    } else if (index % 8 != 0 && chessFields[index - 1].classList.contains('white') && !chessFields[index - 1].classList.contains('king')) {
        chessFields[index - 1].onclick = kingEats;
        possibleMovements.push(index - 1);
        chessFields[index - 1].classList.add('active');
    }

    if ((index + 1) % 8 != 0 && chessFields[index + 1].className == 'chessField') {
        chessFields[index + 1].onclick = kingMove;
        possibleMovements.push(index + 1)
        chessFields[index + 1].classList.add('active');
    } else if ((index + 1) % 8 != 0 && chessFields[index + 1].classList.contains('white') && !chessFields[index + 1].classList.contains('king')) {
        chessFields[index + 1].onclick = kingEats;
        possibleMovements.push(index + 1);
        chessFields[index + 1].classList.add('active');
    }

    if (index > 7) {
        if (chessFields[index - 8].className == 'chessField') {
            chessFields[index - 8].onclick = kingMove;
            possibleMovements.push(index - 8)
            chessFields[index - 8].classList.add('active')
        } else if (chessFields[index - 8].classList.contains('white') && !chessFields[index - 8].classList.contains('king')) {
            chessFields[index - 8].onclick = kingEats;
            possibleMovements.push(index - 8);
            chessFields[index - 8].classList.add('active')
        }
        if (index % 8 != 0 && chessFields[index - 9].className == 'chessField') {
            chessFields[index - 9].onclick = kingMove;
            possibleMovements.push(index - 9)
            chessFields[index - 9].classList.add('active')
        } else if (index % 8 != 0 && chessFields[index - 9].classList.contains('white') && !chessFields[index - 9].classList.contains('king')) {
            chessFields[index - 9].onclick = kingEats;
            possibleMovements.push(index - 9);
            chessFields[index - 9].classList.add('active')
        }
        if ((index + 1) % 8 != 0 && chessFields[index - 7].className == 'chessField') {
            chessFields[index - 7].onclick = kingMove;
            possibleMovements.push(index - 7)
            chessFields[index - 7].classList.add('active')
        } else if ((index + 1) % 8 != 0 && chessFields[index - 7].classList.contains('white') && !chessFields[index - 7].classList.contains('king')) {
            chessFields[index - 7].onclick = kingEats;
            possibleMovements.push(index - 7);
            chessFields[index - 7].classList.add('active')
        }
    }

    if (index < 56) {
        if (chessFields[index + 8].className == 'chessField') {
            chessFields[index + 8].onclick = kingMove;
            possibleMovements.push(index + 8)
            chessFields[index + 8].classList.add('active')
        } else if (chessFields[index + 8].classList.contains('white') && !chessFields[index + 8].classList.contains('king')) {
            chessFields[index + 8].onclick = kingEats;
            possibleMovements.push(index + 8);
            chessFields[index + 8].classList.add('active')
        }
        if ((index + 1) % 8 != 0 && chessFields[index + 9].className == 'chessField') {
            chessFields[index + 9].onclick = kingMove;
            possibleMovements.push(index + 9)
            chessFields[index + 9].classList.add('active')
        } else if ((index + 1) % 8 != 0 && chessFields[index + 9].classList.contains('white') && !chessFields[index + 9].classList.contains('king')) {
            chessFields[index + 9].onclick = kingEats;
            possibleMovements.push(index + 9);
            chessFields[index + 9].classList.add('active')
        }
        if (index % 8 != 0 && chessFields[index + 7].className == 'chessField') {
            chessFields[index + 7].onclick = kingMove;
            possibleMovements.push(index + 7)
            chessFields[index + 7].classList.add('active')
        } else if (index % 8 != 0 && chessFields[index + 7].classList.contains('white') && !chessFields[index + 7].classList.contains('king')) {
            chessFields[index + 7].onclick = kingEats;
            possibleMovements.push(index + 7);
            chessFields[index + 7].classList.add('active')
        }
    }

    areActiveFields = true;

    return possibleMovements;
}

function queenClickBlack(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (whitesPlay) return;

    function queenMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', queenClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('black', 'queen');
        chessFields[indexOfTarget].addEventListener('click', queenClickBlack);
        if (!mateCheck) {
            for (let i = index + 7; i <= 63; i += 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index + 9; i <= 63; i += 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 9; i >= 0; i -= 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 7; i >= 0; i -= 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = Math.floor(index / 8) * 8; i < Math.ceil(index / 8) * 8; i++) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - Math.floor(index / 8) * 8; i <= 63; i += 8) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', queenClickBlack)
            chessFields[index].className = "chessField black queen";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].removeEventListener('click', queenClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    function queenEats(event) {
        let indexOfPrey = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[indexOfPrey]);
        let initialClassName = chessFields[indexOfPrey].className;
        chessFields[index].removeEventListener('click', queenClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfPrey].className = "chessField";
        chessFields[indexOfPrey].classList.add('black', 'queen');
        chessFields[indexOfPrey].addEventListener('click', queenClickBlack);
        if (!mateCheck) {
            for (let i = index + 7; i <= 63; i += 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index + 9; i <= 63; i += 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 9; i >= 0; i -= 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 7; i >= 0; i -= 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = Math.floor(index / 8) * 8; i < Math.ceil(index / 8) * 8; i++) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - Math.floor(index / 8) * 8; i <= 63; i += 8) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', queenClickBlack)
            chessFields[index].className = "chessField black queen";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', queenClickBlack);
            areActiveFields = false;
            return;
        }


        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }


    for (let i = index; i <= 63; i += 7) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if (i % 8 == 0) {
                chessFields[i].onclick = queenMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = queenMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].onclick = queenEats
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i <= 63; i += 9) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if ((i + 1) % 8 == 0) {
                chessFields[i].onclick = queenMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = queenMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            chessFields[i].onclick = queenEats;
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 7) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if ((i + 1) % 8 == 0) {
                chessFields[i].onclick = queenMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = queenMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            chessFields[i].onclick = queenEats;
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 9) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if (i % 8 == 0) {
                chessFields[i].onclick = queenMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = queenMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            chessFields[i].onclick = queenEats;
            break;
        } else {
            break;
        }
    }

    for (let i = index + 1; i < Math.ceil(index / 8) * 8; i++) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index - 1; i >= Math.floor(index / 8) * 8; i--) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index + 8; i <= 64; i += 8) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index - 8; i >= 0; i -= 8) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    areActiveFields = true;

    return possibleMovements;
}

function queenClickWhite(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (!whitesPlay) return;

    function queenMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', queenClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'queen');
        chessFields[indexOfTarget].addEventListener('click', queenClickWhite);
        if (!mateCheck) {
            for (let i = index + 7; i <= 63; i += 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index + 9; i <= 63; i += 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 9; i >= 0; i -= 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 7; i >= 0; i -= 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = Math.floor(index / 8) * 8; i < Math.ceil(index / 8) * 8; i++) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - Math.floor(index / 8) * 8; i <= 63; i += 8) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', queenClickWhite)
            chessFields[index].className = "chessField white queen";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].removeEventListener('click', queenClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    function queenEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        let initialClassName = chessFields[indexOfTarget].className;
        chessFields[index].removeEventListener('click', queenClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'queen');
        chessFields[indexOfTarget].addEventListener('click', queenClickWhite);
        if (!mateCheck) {
            for (let i = index + 7; i <= 63; i += 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index + 9; i <= 63; i += 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 9; i >= 0; i -= 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 7; i >= 0; i -= 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = Math.floor(index / 8) * 8; i < Math.ceil(index / 8) * 8; i++) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - Math.floor(index / 8) * 8; i <= 63; i += 8) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', queenClickWhite)
            chessFields[index].className = "chessField white queen";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', queenClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }


    for (let i = index; i <= 63; i += 7) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if (i % 8 == 0) {
                chessFields[i].onclick = queenMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = queenMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].onclick = queenEats
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i <= 63; i += 9) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if ((i + 1) % 8 == 0) {
                chessFields[i].onclick = queenMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = queenMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            chessFields[i].onclick = queenEats;
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 7) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if ((i + 1) % 8 == 0) {
                chessFields[i].onclick = queenMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = queenMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            chessFields[i].onclick = queenEats;
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 9) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if (i % 8 == 0) {
                chessFields[i].onclick = queenMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = queenMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            chessFields[i].onclick = queenEats;
            break;
        } else {
            break;
        }
    }

    for (let i = index + 1; i < Math.ceil(index / 8) * 8; i++) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index - 1; i >= Math.floor(index / 8) * 8; i--) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index + 8; i <= 64; i += 8) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index - 8; i >= 0; i -= 8) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = queenEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    areActiveFields = true;

    return possibleMovements;
}

function bishopClickBlack(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (whitesPlay) return;

    function bishopMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', bishopClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('black', 'bishop');
        chessFields[indexOfTarget].addEventListener('click', bishopClickBlack);

        if (!mateCheck) {
            for (let i = index + 7; i <= 63; i += 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index + 9; i <= 63; i += 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 9; i >= 0; i -= 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 7; i >= 0; i -= 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', bishopClickBlack)
            chessFields[index].className = "chessField black bishop";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].removeEventListener('click', bishopClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    function bishopEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        let initialClassName = chessFields[indexOfTarget].className;
        chessFields[index].removeEventListener('click', bishopClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField";
        chessFields[indexOfTarget].classList.add('black', 'bishop');
        chessFields[indexOfTarget].addEventListener('click', bishopClickBlack);

        if (!mateCheck) {
            for (let i = index + 7; i <= 63; i += 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index + 9; i <= 63; i += 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 9; i >= 0; i -= 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 7; i >= 0; i -= 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', bishopClickBlack)
            chessFields[index].className = "chessField black bishop";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', bishopClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    for (let i = index; i <= 63; i += 7) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if (i % 8 == 0) {
                chessFields[i].onclick = bishopMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = bishopMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = bishopEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i <= 63; i += 9) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if ((i + 1) % 8 == 0) {
                chessFields[i].onclick = bishopMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = bishopMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = bishopEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 7) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if ((i + 1) % 8 == 0) {
                chessFields[i].onclick = bishopMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = bishopMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = bishopEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 9) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if (i % 8 == 0) {
                chessFields[i].onclick = bishopMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = bishopMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            chessFields[i].onclick = bishopEats;
            break;
        } else {
            break;
        }
    }

    areActiveFields = true;

    return possibleMovements;

}

function bishopClickWhite(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (whitesPlay == false) return;

    function bishopMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', bishopClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'bishop');
        chessFields[indexOfTarget].addEventListener('click', bishopClickWhite);
        if (!mateCheck) {
            for (let i = index + 7; i <= 63; i += 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index + 9; i <= 63; i += 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 9; i >= 0; i -= 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 7; i >= 0; i -= 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', bishopClickWhite)
            chessFields[index].className = "chessField white bishop";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].removeEventListener('click', bishopClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    function bishopEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        let initialClassName = chessFields[indexOfTarget].className;
        chessFields[index].removeEventListener('click', bishopClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'bishop');
        chessFields[indexOfTarget].addEventListener('click', bishopClickWhite);
        if (!mateCheck) {
            for (let i = index + 7; i <= 63; i += 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index + 9; i <= 63; i += 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 9; i >= 0; i -= 9) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - 7; i >= 0; i -= 7) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', bishopClickWhite)
            chessFields[index].className = "chessField white bishop";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', bishopClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    for (let i = index; i <= 63; i += 7) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if (i % 8 == 0) {
                chessFields[i].onclick = bishopMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = bishopMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = bishopEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i <= 63; i += 9) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if ((i + 1) % 8 == 0) {
                chessFields[i].onclick = bishopMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = bishopMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = bishopEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 7) {
        if ((index + 1) % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if ((i + 1) % 8 == 0) {
                chessFields[i].onclick = bishopMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = bishopMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = bishopEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 9) {
        if (index % 8 == 0) break;
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            if (i % 8 == 0) {
                chessFields[i].onclick = bishopMove;
                chessFields[i].classList.add('active')
                possibleMovements.push(i);
                break;
            }
            chessFields[i].onclick = bishopMove;
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            possibleMovements.push(i);
            chessFields[i].onclick = bishopEats;
            break;
        } else {
            break;
        }
    }

    areActiveFields = true;

    return possibleMovements;
}

function pawnClickWhite(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (!whitesPlay) return;

    function pawnEatsLeft(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[index - 9]);
        let initialClassName = chessFields[index - 9].className;
        chessFields[index].removeEventListener('click', pawnClickWhite)
        chessFields[index].className = "chessField";

        if (index - 8 >= 0 && index - 8 <= 7) {
            removeClickers(chessFields[index - 9]);
            if (!mateCheck) {
                chessFields[index - 7].classList.remove('active');
                chessFields[index - 8].classList.remove('active');
                if (index - 9 >= 0) chessFields[index - 9].classList.remove('active');
                chessFields[index - 7].onclick = null;
                chessFields[index - 8].onclick = null;
                if (index - 9 >= 0) chessFields[index - 9].onclick = null;
            }
            let newFigure = (prompt("Какую фигуру хотите поставить вместо пешки?", "Ферзь") || "").toLowerCase();
            console.log(newFigure);

            switch (newFigure) {
                case "ферзь":
                case "queen":
                    chessFields[index - 9].className = 'chessField white queen';
                    chessFields[index - 9].addEventListener('click', queenClickWhite);
                    break;
                case "слон":
                case "bishop":
                    chessFields[index - 9].className = 'chessField white bishop';
                    chessFields[index - 9].addEventListener('click', bishopClickWhite);
                    break;
                case "конь":
                case "knight":
                    chessFields[index - 9].className = 'chessField white knight';
                    chessFields[index - 9].addEventListener('click', knightClickWhite);
                    break;
                case "ладья":
                case "rook":
                    chessFields[index - 9].className = 'chessField white rook';
                    chessFields[index - 9].addEventListener('click', rookClickWhite);
                    break;
                default:
                    chessFields[index - 9].className = 'chessField white queen';
                    chessFields[index - 9].addEventListener('click', queenClickWhite);
            }
        } else {
            chessFields[index - 9].className = "chessField white";
            chessFields[index - 9].classList.add('white', 'pawn');
            removeClickers(chessFields[index - 9]);
            chessFields[index - 9].addEventListener('click', pawnClickWhite);
            if (!mateCheck) {
                chessFields[index - 7].classList.remove('active');
                chessFields[index - 8].classList.remove('active');
                chessFields[index - 9].classList.remove('active');
                chessFields[index - 16].classList.remove('active');
                chessFields[index - 7].onclick = null;
                chessFields[index - 8].onclick = null;
                chessFields[index - 9].onclick = null;
                chessFields[index - 16].onclick = null;
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', pawnClickWhite)
            chessFields[index].className = "chessField white pawn";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', pawnClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    function pawnEatsRight(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[index - 7]);
        let initialClassName = chessFields[index - 7].className;
        chessFields[index].removeEventListener('click', pawnClickWhite)
        chessFields[index].className = "chessField";

        if (index - 8 >= 0 && index - 8 <= 7) {
            removeClickers(chessFields[index - 7]);
            if (!mateCheck) {
                chessFields[index - 7].classList.remove('active');
                chessFields[index - 8].classList.remove('active');
                if (index - 9 >= 0) chessFields[index - 9].classList.remove('active');
                chessFields[index - 7].onclick = null;
                chessFields[index - 8].onclick = null;
                if (index - 9 >= 0) chessFields[index - 9].onclick = null;
            }
            let newFigure = (prompt("Какую фигуру хотите поставить вместо пешки?", "Ферзь") || "").toLowerCase();

            switch (newFigure) {
                case "ферзь":
                case "queen":
                    chessFields[index - 7].className = 'chessField white queen';
                    chessFields[index - 7].addEventListener('click', queenClickWhite);
                    break;
                case "слон":
                case "bishop":
                    chessFields[index - 7].className = 'chessField white bishop';
                    chessFields[index - 7].addEventListener('click', bishopClickWhite);
                    break;
                case "конь":
                case "knight":
                    chessFields[index - 7].className = 'chessField white knight';
                    chessFields[index - 7].addEventListener('click', knightClickWhite);
                    break;
                case "ладья":
                case "rook":
                    chessFields[index - 7].className = 'chessField white rook';
                    chessFields[index - 7].addEventListener('click', rookClickWhite);
                    break;
                default:
                    chessFields[index - 7].className = 'chessField white queen';
                    chessFields[index - 7].addEventListener('click', queenClickWhite);
            }
        } else {
            chessFields[index - 7].className = "chessField white";
            chessFields[index - 7].classList.add('white', 'pawn');
            removeClickers(chessFields[index - 7]);
            chessFields[index - 7].addEventListener('click', pawnClickWhite);
            if (!mateCheck) {
                chessFields[index - 7].classList.remove('active');
                chessFields[index - 8].classList.remove('active');
                chessFields[index - 9].classList.remove('active');
                chessFields[index - 16].classList.remove('active');
                chessFields[index - 7].onclick = null;
                chessFields[index - 8].onclick = null;
                chessFields[index - 9].onclick = null;
                chessFields[index - 16].onclick = null;
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', pawnClickWhite)
            chessFields[index].className = "chessField white pawn";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', pawnClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    function pawnMoveOne(event) {
        chessFields[index].removeEventListener('click', pawnClickWhite)
        chessFields[index].className = "chessField";
        if (index - 8 >= 0 && index - 8 <= 7) {
            if (!mateCheck) {
                chessFields[index - 7].classList.remove('active');
                chessFields[index - 8].classList.remove('active');
                if (index - 9 >= 0) chessFields[index - 9].classList.remove('active');
                chessFields[index - 7].onclick = null;
                chessFields[index - 8].onclick = null;
                if (index - 9 >= 0) chessFields[index - 9].onclick = null;
            }
            let newFigure = (prompt("Какую фигуру хотите поставить вместо пешки?", "Ферзь") || "").toLowerCase();

            switch (newFigure) {
                case "ферзь":
                case "queen":
                    chessFields[index - 8].className = 'chessField white queen';
                    chessFields[index - 8].addEventListener('click', queenClickWhite);
                    break;
                case "слон":
                case "bishop":
                    chessFields[index - 8].className = 'chessField white bishop';
                    chessFields[index - 8].addEventListener('click', bishopClickWhite);
                    break;
                case "конь":
                case "knight":
                    chessFields[index - 8].className = 'chessField white knight';
                    chessFields[index - 8].addEventListener('click', knightClickWhite);
                    break;
                case "ладья":
                case "rook":
                    chessFields[index - 8].className = 'chessField white rook';
                    chessFields[index - 8].addEventListener('click', rookClickWhite);
                    break;
                default:
                    chessFields[index - 8].className = 'chessField white queen';
                    chessFields[index - 8].addEventListener('click', queenClickWhite);
            }
        } else {
            chessFields[index - 8].classList.add('white', 'pawn');
            chessFields[index - 8].addEventListener('click', pawnClickWhite);
            if (!mateCheck) {
                chessFields[index - 7].classList.remove('active');
                chessFields[index - 8].classList.remove('active');
                chessFields[index - 9].classList.remove('active');
                chessFields[index - 16].classList.remove('active');
                chessFields[index - 7].onclick = null;
                chessFields[index - 8].onclick = null;
                chessFields[index - 9].onclick = null;
                chessFields[index - 16].onclick = null;
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(index - 8)
            chessFields[index].addEventListener('click', pawnClickWhite)
            chessFields[index].className = "chessField white pawn";
            chessFields[index - 8].className = 'chessField';
            chessFields[index - 8].onclick = null;
            chessFields[index - 8].classList.remove('active');
            chessFields[index - 8].removeEventListener('click', pawnClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    function pawnMoveTwo(event) {
        chessFields[index].removeEventListener('click', pawnClickWhite)
        chessFields[index].className = "chessField";
        chessFields[index - 16].classList.add('white', 'pawn');
        chessFields[index - 16].addEventListener('click', pawnClickWhite);
        if (!mateCheck) {
            chessFields[index - 7].classList.remove('active');
            chessFields[index - 8].classList.remove('active');
            chessFields[index - 9].classList.remove('active');
            chessFields[index - 16].classList.remove('active');
            chessFields[index - 7].onclick = null;
            chessFields[index - 8].onclick = null;
            chessFields[index - 9].onclick = null;
            chessFields[index - 16].onclick = null;
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(index - 16)
            chessFields[index].addEventListener('click', pawnClickWhite)
            chessFields[index].className = "chessField white pawn";
            chessFields[index - 16].className = 'chessField';
            chessFields[index - 16].onclick = null;
            chessFields[index - 16].classList.remove('active');
            chessFields[index - 16].removeEventListener('click', pawnClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }
        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    if (chessFields[index - 8].className == 'chessField') {
        chessFields[index - 8].classList.add('active');

        chessFields[index - 8].onclick = pawnMoveOne;
        possibleMovements.push(index - 8);
        if (index - 16 >= 0) {
            if (chessFields[index - 16].className == 'chessField' && index >= 48 && index <= 55) {
                chessFields[index - 16].classList.add('active');

                chessFields[index - 16].onclick = pawnMoveTwo;
                possibleMovements.push(index - 16);

                moveListeners.push(index - 8, index - 16);
            }
        }

        if (index - 9 >= 0) {
            if (chessFields[index - 9] && chessFields[index - 9].classList.contains('black')
                && index % 8 != 0 && !chessFields[index - 9].classList.contains('king')) {
                chessFields[index - 9].classList.add('active');

                chessFields[index - 9].onclick = pawnEatsLeft;
                possibleMovements.push(index - 9);

                moveListeners.push(index - 9);
            }
        }

        if (chessFields[index - 7] && chessFields[index - 7].classList.contains('black')
            && (index + 1) % 8 != 0 && !chessFields[index - 7].classList.contains('king')) {
            chessFields[index - 7].classList.add('active');

            chessFields[index - 7].onclick = pawnEatsRight;
            possibleMovements.push(index - 7);

            moveListeners.push(index - 9);
        }
    }

    if (chessFields[index - 7] && chessFields[index - 7].classList.contains('black')
        && (index + 1) % 8 != 0 && !chessFields[index - 7].classList.contains('king')) {
        chessFields[index - 7].classList.add('active');

        chessFields[index - 7].onclick = pawnEatsRight;
        possibleMovements.push(index - 7);

        moveListeners.push(index - 7);
    }

    if (index - 9 >= 0) {
        if (chessFields[index - 9] && chessFields[index - 9].classList.contains('black')
            && index % 8 != 0 && !chessFields[index - 9].classList.contains('king')) {
            chessFields[index - 9].classList.add('active');

            chessFields[index - 9].onclick = pawnEatsLeft;
            possibleMovements.push(index - 9);

            moveListeners.push(index - 9);
        }
    }

    areActiveFields = true;

    return possibleMovements;
}


function pawnClickBlack(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (whitesPlay) return;

    function pawnEatsRight(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[index + 9]);
        let initialClassName = chessFields[index + 9].className;
        chessFields[index].removeEventListener('click', pawnClickBlack)
        chessFields[index].className = "chessField";

        if (index + 9 >= 56 && index + 9 <= 63) {
            removeClickers(chessFields[index + 7]);
            if (!mateCheck) {
                chessFields[index + 7].classList.remove('active');
                chessFields[index + 8].classList.remove('active');
                if (index + 9 <= 63) chessFields[index + 9].classList.remove('active');
                chessFields[index + 7].onclick = null;
                chessFields[index + 8].onclick = null;
                if (index + 9 <= 63) chessFields[index + 9].onclick = null;
            }
            let newFigure = (prompt("Какую фигуру хотите поставить вместо пешки?", "Ферзь") || "").toLowerCase();

            switch (newFigure) {
                case "ферзь":
                case "queen":
                    chessFields[index + 9].className = 'chessField black queen';
                    chessFields[index + 9].addEventListener('click', queenClickBlack);
                    break;
                case "слон":
                case "bishop":
                    chessFields[index + 9].className = 'chessField black bishop';
                    chessFields[index + 9].addEventListener('click', bishopClickBlack);
                    break;
                case "конь":
                case "knight":
                    chessFields[index + 9].className = 'chessField black knight';
                    chessFields[index + 9].addEventListener('click', knightClickBlack);
                    break;
                case "ладья":
                case "rook":
                    chessFields[index + 9].className = 'chessField black rook';
                    chessFields[index + 9].addEventListener('click', rookClickBlack);
                    break;
                default:
                    chessFields[index + 9].className = 'chessField black queen';
                    chessFields[index + 9].addEventListener('click', queenClickBlack);
            }
        } else {
            chessFields[index + 9].className = "chessField";
            chessFields[index + 9].classList.add('black', 'pawn');
            removeClickers(chessFields[index + 9]);
            chessFields[index + 9].addEventListener('click', pawnClickBlack);
            if (!mateCheck) {
                chessFields[index + 7].classList.remove('active');
                chessFields[index + 8].classList.remove('active');
                chessFields[index + 9].classList.remove('active');
                chessFields[index + 16].classList.remove('active');
                chessFields[index + 7].onclick = null;
                chessFields[index + 8].onclick = null;
                chessFields[index + 9].onclick = null;
                chessFields[index + 16].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', pawnClickBlack)
            chessFields[index].className = "chessField black pawn";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', pawnClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    function pawnEatsLeft(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let removedClicker = removeClickers(chessFields[index + 7]);
        let initialClassName = chessFields[index + 7].className;
        chessFields[index].removeEventListener('click', pawnClickBlack)
        chessFields[index].className = "chessField";

        if (index + 7 >= 56 && index + 7 <= 63) {
            removeClickers(chessFields[index + 7]);
            if (!mateCheck) {
                chessFields[index + 7].classList.remove('active');
                chessFields[index + 8].classList.remove('active');
                if (index + 9 <= 63) chessFields[index + 9].classList.remove('active');
                chessFields[index + 7].onclick = null;
                chessFields[index + 8].onclick = null;
                if (index + 9 <= 63) chessFields[index + 9].onclick = null;
            }
            let newFigure = (prompt("Какую фигуру хотите поставить вместо пешки?", "Ферзь") || "").toLowerCase();

            switch (newFigure) {
                case "ферзь":
                case "queen":
                    chessFields[index + 7].className = 'chessField black queen';
                    chessFields[index + 7].addEventListener('click', queenClickBlack);
                    break;
                case "слон":
                case "bishop":
                    chessFields[index + 7].className = 'chessField black bishop';
                    chessFields[index + 7].addEventListener('click', bishopClickBlack);
                    break;
                case "конь":
                case "knight":
                    chessFields[index + 7].className = 'chessField black knight';
                    chessFields[index + 7].addEventListener('click', knightClickBlack);
                    break;
                case "ладья":
                case "rook":
                    chessFields[index + 7].className = 'chessField black rook';
                    chessFields[index + 7].addEventListener('click', rookClickBlack);
                    break;
                default:
                    chessFields[index + 7].className = 'chessField black queen';
                    chessFields[index + 7].addEventListener('click', queenClickBlack);
            }
        } else {
            chessFields[index + 7].className = "chessField";
            chessFields[index + 7].classList.add('black', 'pawn');
            removeClickers(chessFields[index + 7]);
            chessFields[index + 7].addEventListener('click', pawnClickBlack);
            if (!mateCheck) {
                chessFields[index + 7].classList.remove('active');
                chessFields[index + 8].classList.remove('active');
                chessFields[index + 9].classList.remove('active');
                chessFields[index + 16].classList.remove('active');
                chessFields[index + 7].onclick = null;
                chessFields[index + 8].onclick = null;
                chessFields[index + 9].onclick = null;
                chessFields[index + 16].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', pawnClickBlack)
            chessFields[index].className = "chessField black pawn";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', pawnClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    function pawnMoveOne(event) {
        chessFields[index].removeEventListener('click', pawnClickBlack)
        chessFields[index].className = "chessField";
        if (index + 8 >= 56 && index + 8 <= 63) {
            if (!mateCheck) {
                chessFields[index + 7].classList.remove('active');
                chessFields[index + 8].classList.remove('active');
                if (index + 9 <= 63) chessFields[index + 9].classList.remove('active');
                chessFields[index + 7].onclick = null;
                chessFields[index + 8].onclick = null;
                if (index + 9 <= 63) chessFields[index + 9].onclick = null;
            }
            let newFigure = (prompt("Какую фигуру хотите поставить вместо пешки?", "Ферзь") || "").toLowerCase();

            switch (newFigure) {
                case "ферзь":
                case "queen":
                    chessFields[index + 8].className = 'chessField black queen';
                    chessFields[index + 8].addEventListener('click', queenClickBlack);
                    break;
                case "слон":
                case "bishop":
                    chessFields[index + 8].className = 'chessField black bishop';
                    chessFields[index + 8].addEventListener('click', bishopClickBlack);
                    break;
                case "конь":
                case "knight":
                    chessFields[index + 8].className = 'chessField black knight';
                    chessFields[index + 8].addEventListener('click', knightClickBlack);
                    break;
                case "ладья":
                case "rook":
                    chessFields[index + 8].className = 'chessField black rook';
                    chessFields[index + 8].addEventListener('click', rookClickBlack);
                    break;
                default:
                    chessFields[index + 8].className = 'chessField black queen';
                    chessFields[index + 8].addEventListener('click', queenClickBlack);
            }
        } else {
            chessFields[index + 8].classList.add('black', 'pawn');
            chessFields[index + 8].addEventListener('click', pawnClickBlack);
            if (!mateCheck) {
                chessFields[index + 7].classList.remove('active');
                chessFields[index + 8].classList.remove('active');
                chessFields[index + 9].classList.remove('active');
                chessFields[index + 16].classList.remove('active');
                chessFields[index + 7].onclick = null;
                chessFields[index + 8].onclick = null;
                chessFields[index + 9].onclick = null;
                chessFields[index + 16].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(index + 8)
            chessFields[index].addEventListener('click', pawnClickBlack)
            chessFields[index].className = "chessField black pawn";
            chessFields[index + 8].className = 'chessField';
            chessFields[index + 8].onclick = null;
            chessFields[index + 8].classList.remove('active');
            chessFields[index + 8].removeEventListener('click', pawnClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    function pawnMoveTwo(event) {
        chessFields[index].removeEventListener('click', pawnClickBlack)
        chessFields[index].className = "chessField";
        chessFields[index + 16].classList.add('black', 'pawn');
        chessFields[index + 16].addEventListener('click', pawnClickBlack);
        if (!mateCheck) {
            chessFields[index + 7].classList.remove('active');
            chessFields[index + 8].classList.remove('active');
            chessFields[index + 9].classList.remove('active');
            chessFields[index + 16].classList.remove('active');
            chessFields[index + 7].onclick = null;
            chessFields[index + 8].onclick = null;
            chessFields[index + 9].onclick = null;
            chessFields[index + 16].onclick = null;
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(index + 16)
            chessFields[index].addEventListener('click', pawnClickBlack)
            chessFields[index].className = "chessField black pawn";
            chessFields[index + 16].className = 'chessField';
            chessFields[index + 16].onclick = null;
            chessFields[index + 16].classList.remove('active');
            chessFields[index + 16].removeEventListener('click', pawnClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = []

    if (chessFields[index + 8].className == 'chessField') {
        chessFields[index + 8].classList.add('active');

        chessFields[index + 8].onclick = pawnMoveOne;
        possibleMovements.push(index + 8);
        if (index + 16 <= 63) {
            if (chessFields[index + 16].className == 'chessField' && index >= 8 && index <= 15) {
                chessFields[index + 16].classList.add('active');

                chessFields[index + 16].onclick = pawnMoveTwo;
                possibleMovements.push(index + 16);

                moveListeners.push(index + 8, index + 16);
            }
        }

        if (index + 7 <= 63) {
            if (chessFields[index + 7] && chessFields[index + 7].classList.contains('white')
                && index % 8 != 0 && !chessFields[index + 7].classList.contains('king')) {
                chessFields[index + 7].classList.add('active');

                chessFields[index + 7].onclick = pawnEatsLeft;
                possibleMovements.push(index + 7);

                moveListeners.push(index + 7);
            }
        }

        if (index + 9 <= 63) {
            if (chessFields[index + 9] && chessFields[index + 9].classList.contains('white')
                && (index + 1) % 8 != 0 && !chessFields[index + 9].classList.contains('king')) {
                chessFields[index + 9].classList.add('active');

                chessFields[index + 9].onclick = pawnEatsRight;
                possibleMovements.push(index + 9);

                moveListeners.push(index + 9);
            }
        }
    }

    if (index + 9 <= 63) {
        if (chessFields[index + 9] && chessFields[index + 9].classList.contains('white')
            && (index + 1) % 8 != 0 && !chessFields[index + 9].classList.contains('king')) {
            chessFields[index + 9].classList.add('active');

            chessFields[index + 9].onclick = pawnEatsRight;
            possibleMovements.push(index + 9);

            moveListeners.push(index + 9);
        }
    }

    if (index + 7 <= 63) {
        if (chessFields[index + 7] && chessFields[index + 7].classList.contains('white')
            && index % 8 != 0 && !chessFields[index + 7].classList.contains('king')) {
            chessFields[index + 7].classList.add('active');

            chessFields[index + 7].onclick = pawnEatsLeft;
            possibleMovements.push(index + 7);

            moveListeners.push(index + 7);
        }
    }

    areActiveFields = true;

    return possibleMovements;
}

function rookClickWhite(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (whitesPlay == false) return;

    function rookMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', rookClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'rook');
        chessFields[indexOfTarget].addEventListener('click', rookClickWhite);
        if (!mateCheck) {
            for (let i = Math.floor(index / 8) * 8; i < Math.floor((index / 8) + 1) * 8; i++) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - Math.floor(index / 8) * 8; i <= 63; i += 8) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', rookClickWhite)
            chessFields[index].className = "chessField white rook";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].removeEventListener('click', rookClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    function rookEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let initialClassName = chessFields[indexOfTarget].className;
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        chessFields[index].removeEventListener('click', rookClickWhite)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField";
        chessFields[indexOfTarget].classList.add('white', 'rook');
        chessFields[indexOfTarget].addEventListener('click', rookClickWhite);
        if (!mateCheck) {
            for (let i = Math.floor(index / 8) * 8; i < Math.floor((index / 8) + 1) * 8; i++) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - Math.floor(index / 8) * 8; i <= 63; i += 8) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingWhite() || mateCheck) {
            if (!isCheckForKingWhite()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', rookClickWhite)
            chessFields[index].className = "chessField white rook";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', rookClickWhite);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingBlack()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = false;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedBlackKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = false;
    }

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    for (let i = index; i < Math.floor((index / 8) + 1) * 8; i++) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookMove;
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookEats;
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= Math.floor(index / 8) * 8; i--) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i <= 63; i += 8) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 8) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('black') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    areActiveFields = true;

    return possibleMovements;
}

function rookClickBlack(event, mateCheck, possibleSteps) {
    if (isMated) return;
    if (whitesPlay) return;

    function rookMove(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        chessFields[index].removeEventListener('click', rookClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].classList.add('black', 'rook');
        chessFields[indexOfTarget].addEventListener('click', rookClickBlack);
        if (!mateCheck) {
            for (let i = Math.floor(index / 8) * 8; i < Math.floor((index / 8) + 1) * 8; i++) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - Math.floor(index / 8) * 8; i <= 63; i += 8) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', rookClickBlack)
            chessFields[index].className = "chessField black rook";
            chessFields[indexOfTarget].className = 'chessField';
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].removeEventListener('click', rookClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    function rookEats(event) {
        let indexOfTarget = Array.from(chessFields).indexOf(event.target);
        let initialClassName = chessFields[indexOfTarget].className;
        let removedClicker = removeClickers(chessFields[indexOfTarget]);
        chessFields[index].removeEventListener('click', rookClickBlack)
        chessFields[index].className = "chessField";
        chessFields[indexOfTarget].className = "chessField";
        chessFields[indexOfTarget].classList.add('black', 'rook');
        chessFields[indexOfTarget].addEventListener('click', rookClickBlack);
        if (!mateCheck) {
            for (let i = Math.floor(index / 8) * 8; i < Math.floor((index / 8) + 1) * 8; i++) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }

            for (let i = index - Math.floor(index / 8) * 8; i <= 63; i += 8) {
                chessFields[i].classList.remove('active');
                chessFields[i].onclick = null;
            }
        }

        if (isCheckForKingBlack() || mateCheck) {
            if (!isCheckForKingBlack()) possibleSteps.push(indexOfTarget)
            chessFields[index].addEventListener('click', rookClickBlack)
            chessFields[index].className = "chessField black rook";
            chessFields[indexOfTarget].className = initialClassName;
            chessFields[indexOfTarget].onclick = null;
            chessFields[indexOfTarget].classList.remove('active');
            chessFields[indexOfTarget].addEventListener('click', removedClicker);
            chessFields[indexOfTarget].removeEventListener('click', rookClickBlack);
            areActiveFields = false;
            return;
        }

        if (isCheckForKingWhite()) {
            moveListeners = [];
            areActiveFields = false;
            whitesPlay = true;
            alert('CHECK!');
            if (isMated == true) {
                alert('MATE!')
            } else {
                isMatedWhiteKing();
                if (isMated == true) alert('MATE!')
            }
            return;
        }

        moveListeners = [];
        areActiveFields = false;
        whitesPlay = true;
    }

    if (areActiveFields == true) {
        chessFields.forEach(elem => {
            elem.onclick = null;
        })
        document.querySelectorAll('.active').forEach(elem => {
            elem.classList.remove('active');
        })
    }

    let index = Array.from(chessFields).indexOf(event.target);
    let possibleMovements = [];

    for (let i = index; i < Math.floor((index / 8) + 1) * 8; i++) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookMove;
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookEats;
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= Math.floor(index / 8) * 8; i--) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i <= 63; i += 8) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    for (let i = index; i >= 0; i -= 8) {
        if (i == index) continue;
        if (chessFields[i].className == 'chessField') {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookMove;
            possibleMovements.push(i);
        } else if (chessFields[i].classList.contains('white') && !chessFields[i].classList.contains('king')) {
            chessFields[i].classList.add('active');
            chessFields[i].onclick = rookEats;
            possibleMovements.push(i);
            break;
        } else {
            break;
        }
    }

    areActiveFields = true;

    return possibleMovements;
}


