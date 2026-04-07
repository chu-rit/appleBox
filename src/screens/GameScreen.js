import React, { useState, useCallback, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Alert,
  PanResponder,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const GRID_SIZE = 12;
const CELL_SIZE = Math.floor((width - 40) / GRID_SIZE);
const APPLE_EMOJI = '🍎';

// Generate random board (1-9)
const generateBoard = () => {
  return Array(GRID_SIZE).fill(null).map(() =>
    Array(GRID_SIZE).fill(null).map(() => ({
      value: Math.floor(Math.random() * 9) + 1,
      removed: false,
    }))
  );
};

export default function GameScreen({ onBackToStart }) {
  const [board, setBoard] = useState(generateBoard());
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const boardRef = useRef(null);
  const [boardOffset, setBoardOffset] = useState({ x: 0, y: 0 });
  
  // Selection rectangle state
  const [selection, setSelection] = useState(null);
  const [dragStart, setDragStart] = useState(null);

  const updateBoardOffset = () => {
    if (boardRef.current) {
      boardRef.current.measure((x, y, width, height, pageX, pageY) => {
        setBoardOffset({ x: pageX, y: pageY });
      });
    }
  };

  const getCellFromLocation = (pageX, pageY) => {
    const col = Math.floor((pageX - boardOffset.x) / CELL_SIZE);
    const row = Math.floor((pageY - boardOffset.y) / CELL_SIZE);
    return { 
      row: Math.max(0, Math.min(GRID_SIZE - 1, row)), 
      col: Math.max(0, Math.min(GRID_SIZE - 1, col)) 
    };
  };

  const calculateSum = useCallback((startRow, startCol, endRow, endCol) => {
    let sum = 0;
    const minRow = Math.min(startRow, endRow);
    const maxRow = Math.max(startRow, endRow);
    const minCol = Math.min(startCol, endCol);
    const maxCol = Math.max(startCol, endCol);
    
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        if (!board[r][c].removed) {
          sum += board[r][c].value;
        }
      }
    }
    return { sum, minRow, maxRow, minCol, maxCol };
  }, [board]);

  const removeApples = (minRow, maxRow, minCol, maxCol) => {
    setBoard(prev => {
      const newBoard = prev.map(row => row.map(cell => ({ ...cell })));
      for (let r = minRow; r <= maxRow; r++) {
        for (let c = minCol; c <= maxCol; c++) {
          newBoard[r][c].removed = true;
        }
      }
      return newBoard;
    });
    
    const count = (maxRow - minRow + 1) * (maxCol - minCol + 1);
    setScore(s => s + count * 10);
    setMoves(m => m + 1);
  };

  const handleDragStart = (row, col) => {
    setDragStart({ row, col });
    setSelection({ startRow: row, startCol: col, endRow: row, endCol: col });
  };

  const handleDragMove = (row, col) => {
    if (!dragStart) return;
    setSelection({
      startRow: dragStart.row,
      startCol: dragStart.col,
      endRow: row,
      endCol: col,
    });
  };

  const handleDragEnd = () => {
    if (!selection) return;
    
    const { startRow, startCol, endRow, endCol } = selection;
    const { sum, minRow, maxRow, minCol, maxCol } = calculateSum(startRow, startCol, endRow, endCol);
    
    if (sum === 10) {
      removeApples(minRow, maxRow, minCol, maxCol);
    }
    
    setSelection(null);
    setDragStart(null);
  };

  const resetGame = () => {
    Alert.alert(
      'New Game',
      'Start a new game?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'OK', onPress: () => {
          setBoard(generateBoard());
          setScore(0);
          setMoves(0);
          setSelection(null);
          setDragStart(null);
        }}
      ]
    );
  };

  const isInSelection = (row, col) => {
    if (!selection) return false;
    const minRow = Math.min(selection.startRow, selection.endRow);
    const maxRow = Math.max(selection.startRow, selection.endRow);
    const minCol = Math.min(selection.startCol, selection.endCol);
    const maxCol = Math.max(selection.startCol, selection.endCol);
    return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
  };

  const currentSum = selection ? calculateSum(selection.startRow, selection.startCol, selection.endRow, selection.endCol).sum : 0;
  const remaining = board.flat().filter(c => !c.removed).length;

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt) => {
      updateBoardOffset();
      const { pageX, pageY } = evt.nativeEvent;
      const { row, col } = getCellFromLocation(pageX, pageY);
      if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
        handleDragStart(row, col);
      }
    },
    onPanResponderMove: (evt) => {
      const { pageX, pageY } = evt.nativeEvent;
      const { row, col } = getCellFromLocation(pageX, pageY);
      if (row >= 0 && row < GRID_SIZE && col >= 0 && col < GRID_SIZE) {
        handleDragMove(row, col);
      }
    },
    onPanResponderRelease: handleDragEnd,
    onPanResponderTerminate: handleDragEnd,
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.backText} onPress={onBackToStart}>←</Text>
        <Text style={styles.title}>APPLE BOX</Text>
        <Text style={styles.resetText} onPress={resetGame}>↻</Text>
      </View>

      <View style={styles.stats}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>SCORE</Text>
          <Text style={styles.statValue}>{score}</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>SUM</Text>
          <Text style={[styles.statValue, currentSum === 10 && styles.sumPerfect, currentSum > 10 && styles.sumOver]}>
            {currentSum}
          </Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>LEFT</Text>
          <Text style={styles.statValue}>{remaining}</Text>
        </View>
      </View>

      <View style={styles.hint}>
        <Text style={styles.hintText}>Drag to select rectangle with sum = 10</Text>
      </View>

      <View style={styles.boardContainer} ref={boardRef} {...panResponder.panHandlers}>
        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((cell, colIndex) => (
              <View
                key={colIndex}
                style={[
                  styles.cell,
                  { width: CELL_SIZE, height: CELL_SIZE },
                  isInSelection(rowIndex, colIndex) && styles.cellSelected,
                  cell.removed && styles.cellRemoved,
                ]}
              >
                {!cell.removed && (
                  <>
                    <Text style={styles.apple}>{APPLE_EMOJI}</Text>
                    <Text style={[styles.number, isInSelection(rowIndex, colIndex) && styles.numberSelected]}>
                      {cell.value}
                    </Text>
                  </>
                )}
              </View>
            ))}
          </View>
        ))}
      </View>

      <View style={styles.footer}>
        <Text style={styles.moves}>Moves: {moves}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  backText: {
    width: 40,
    height: 40,
    backgroundColor: '#FF4444',
    borderRadius: 20,
    textAlign: 'center',
    lineHeight: 40,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: '900',
    color: '#FF4444',
    letterSpacing: 2,
  },
  resetText: {
    width: 40,
    height: 40,
    backgroundColor: '#8B7355',
    borderRadius: 20,
    textAlign: 'center',
    lineHeight: 40,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  statBox: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    minWidth: 80,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statLabel: {
    fontSize: 12,
    color: '#8B7355',
    marginBottom: 4,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  sumPerfect: {
    color: '#4CAF50',
  },
  sumOver: {
    color: '#FF4444',
  },
  hint: {
    alignItems: 'center',
    marginBottom: 10,
  },
  hintText: {
    fontSize: 14,
    color: '#8B7355',
  },
  boardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFE4E1',
    margin: 1,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FFB6C1',
  },
  cellSelected: {
    backgroundColor: '#FF6B6B',
    borderColor: '#FF4444',
  },
  cellRemoved: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
  apple: {
    fontSize: 20,
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  number: {
    position: 'absolute',
    bottom: 2,
    right: 4,
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  numberSelected: {
    color: '#FFF',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  moves: {
    fontSize: 14,
    color: '#8B7355',
    userSelect: 'none',
    WebkitUserSelect: 'none',
  },
});
