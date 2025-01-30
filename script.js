document.addEventListener('DOMContentLoaded', () => { const gameContainer = document.getElementById('game-container'); const startButton = document.getElementById('start-button'); const themeButton = document.getElementById('theme-button'); let theme = 1; const tileValues = [1, 2, 3, 4, 5, 6, 7, 8]; let tiles = []; function generateTiles() { const doubledValues = [...tileValues, ...tileValues]; const shuffledValues = doubledValues.sort(() => Math.random() - 0.5); gameContainer.innerHTML = ''; tiles = shuffledValues.map((value, index) => { const tile = document.createElement('div'); tile.classList.add('tile'); tile.dataset.value = value; tile.innerHTML = '?'; tile.addEventListener('click', () => flipTile(tile)); gameContainer.appendChild(tile); return tile; }); } let firstTile = null; let secondTile = null; let lockBoard = false; function flipTile(tile) { if (lockBoard || tile === firstTile || tile.classList.contains('flipped')) return; tile.classList.add('flipped'); tile.innerHTML = tile.dataset.value; if (!firstTile) { firstTile = tile; } else { secondTile = tile; checkForMatch(); } } function checkForMatch() { const isMatch = firstTile.dataset.value === secondTile.dataset.value; if (isMatch) { disableTiles(); } else { unflipTiles(); } } function disableTiles() { firstTile.removeEventListener('click', () => flipTile(firstTile)); secondTile.removeEventListener('click', () => flipTile(secondTile)); resetBoard(); } function unflipTiles() { lockBoard = true; setTimeout(() => { firstTile.classList.remove('flipped'); secondTile.classList.remove('flipped'); firstTile.innerHTML = '?'; secondTile.innerHTML = '?'; resetBoard(); }, 1000); } function resetBoard() { [firstTile, secondTile] = [null, null]; lockBoard = false; } startButton.addEventListener('click', () => { console.log('Start button clicked'); generateTiles(); startButton.textContent = 'Restart'; }); themeButton.addEventListener('click', () => { console.log('Theme button clicked'); theme = theme === 1 ? 2 : 1; document.body.className = `theme-${theme}`; }); // Initial setup generateTiles(); });

let touchStartX, touchStartY;

function handleTouchStart(e) {
  if (lockedPieces.has(e.target.dataset.index)) {
    e.preventDefault();
    return;
  }
  draggedPiece = e.target;
  const touch = e.touches[0];
  touchStartX = touch.pageX;
  touchStartY = touch.pageY;
}

function handleTouchMove(e) {
  if (!draggedPiece) return;
  const touch = e.touches[0];
  const deltaX = touch.pageX - touchStartX;
  const deltaY = touch.pageY - touchStartY;
  
  draggedPiece.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
}

function handleTouchEnd(e) {
  if (draggedPiece) {
    draggedPiece.style.transform = '';
    draggedPiece = null;
  }
}

// Add touch event listeners
piece.addEventListener("touchstart", handleTouchStart);
piece.addEventListener("touchmove", handleTouchMove);
piece.addEventListener("touchend", handleTouchEnd);
