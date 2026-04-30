import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Platform,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
} from 'react-native-reanimated';
import Svg, { Path, Circle } from 'react-native-svg';
import AppleIcon from '../assets/icons/AppleIcon';
import OrangeIcon from '../assets/icons/OrangeIcon';
import GrapeIcon from '../assets/icons/GrapeIcon';
import PearIcon from '../assets/icons/PearIcon';
import WatermelonIcon from '../assets/icons/WatermelonIcon';
import StrawberryIcon from '../assets/icons/StrawberryIcon';
import PeachIcon from '../assets/icons/PeachIcon';
import PineappleIcon from '../assets/icons/PineappleIcon';
import FruitBlock from '../assets/icons/FruitBlock';

const workerImg = require('../assets/img/S1.png');
const workerImgDelivery = require('../assets/img/S2.png');
const customerImgs = {
  c1: require('../assets/img/C1.png'),
  c2: require('../assets/img/C2.png'),
  c3: require('../assets/img/C3.png'),
  c4: require('../assets/img/C4.png'),
  c5: require('../assets/img/C5.png'),
};

const getCustomerImg = (request, seed, isC5) => {
  if (isC5) return customerImgs.c5;
  if (request <= 9) return seed % 2 === 0 ? customerImgs.c2 : customerImgs.c4;
  return seed % 2 === 0 ? customerImgs.c1 : customerImgs.c3;
};

const { width } = Dimensions.get('window');
const DEFAULT_GRID_SIZE = 6;
const FRUITS = ['apple', 'orange', 'grape', 'pear', 'watermelon', 'strawberry', 'peach', 'pineapple'];

const FRUIT_ICON = {
  apple: AppleIcon, orange: OrangeIcon, grape: GrapeIcon, pear: PearIcon,
  watermelon: WatermelonIcon, strawberry: StrawberryIcon, peach: PeachIcon, pineapple: PineappleIcon,
};

const generateC5Condition = (board) => {
  const type = Math.random() < 0.5 ? 'include' : 'exclude';
  if (type === 'include' && board) {
    const presentFruits = [...new Set(
      board.flat().filter(cell => !cell.removed).map(cell => cell.fruit)
    )];
    const fruit = presentFruits.length > 0
      ? presentFruits[Math.floor(Math.random() * presentFruits.length)]
      : FRUITS[Math.floor(Math.random() * FRUITS.length)];
    return { fruit, type };
  }
  const fruit = FRUITS[Math.floor(Math.random() * FRUITS.length)];
  return { fruit, type };
};

const getNextNumber = (currentTargetSum) => {
  const roll = Math.random();

  // 너무 낮은 숫자만 생성되는거 방지
  if (currentTargetSum <= 10) {
    currentTargetSum = 10;
  }

  if (roll < 0.1) {
    // 10% 확률로 손님이 부른 숫자의 절반 값을 생성 (가장 강력한 재료)
    return Math.ceil(currentTargetSum / 2);
  } else if (roll < 0.4) {
    // 30% 확률로 아주 작은 숫자(1~3) 생성 (세밀한 합 조절용)
    return Math.floor(Math.random() * 3) + 1;
  } else {
    // 나머지 60%는 현재 난이도에 맞는 적절한 숫자 생성
    // (예: 현재 목표의 20%~40% 사이)
    const min = Math.max(1, Math.floor(currentTargetSum * 0.2));
    const max = Math.floor(currentTargetSum * 0.4);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};

const generateBoard = (score = 0, gridSize = DEFAULT_GRID_SIZE, customerRequest = 5) => {
  return Array(gridSize).fill(null).map(() =>
    Array(gridSize).fill(null).map(() => ({ 
      value: getNextNumber(customerRequest),
      fruit: FRUITS[Math.floor(Math.random() * FRUITS.length)],
      removed: false,
    }))
  );
};

const CELL_MARGIN = 2;
const START_TIME = 15;
const getMaxTime = () => START_TIME;
// Customer request ranges based on score level
const getCustomerRequestRange = (score) => {
  const max = 9 + Math.floor(score / 100);
  return { min: 5, max };
};

const getLevel = (score) => Math.floor(score / 100) + 1;

const generateCustomerRequest = (score) => {
  const { min, max } = getCustomerRequestRange(score);
  const range = max - min + 1;

  const roll = Math.random();

  let adjustedMin, adjustedMax;

  if (roll < 0.15) {
    // 1. [15% 확률] 
    adjustedMin = min;
    adjustedMax = min + Math.floor(range * 0.2);
  } else if (roll < 0.6) {
    // 2. [45% 확률] 
    adjustedMin = min + Math.floor(range * 0.3);
    adjustedMax = max - Math.floor(range * 0.2);
  } else {
    // 3. [40% 확률] 
    adjustedMin = max - Math.floor(range * 0.3);
    adjustedMax = max;
  }

  // 최종 숫자 산출 (최소 min, 최대 max 보장)
  const finalMin = Math.max(min, adjustedMin);
  const finalMax = Math.min(max, adjustedMax);

  return Math.floor(Math.random() * (finalMax - finalMin + 1)) + finalMin;
};

export default function FruitBoxScreen({ onBackToStart, mapSize = DEFAULT_GRID_SIZE }) {
  const GRID_SIZE = mapSize;
  const CELL_SIZE = Math.floor((width - 40) / GRID_SIZE);
  
  const [board, setBoard] = useState(() => generateBoard(0, GRID_SIZE, customerRequest));
  const [selection, setSelection] = useState(null);
  const [dragRect, setDragRect] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [customerRequest, setCustomerRequest] = useState(() => generateCustomerRequest(0));
  const [customerImgSeed, setCustomerImgSeed] = useState(() => Math.floor(Math.random() * 20));
  const [c5Condition, setC5Condition] = useState(null);
  const [showDelivery, setShowDelivery] = useState(false);
  const [timeLeft, setTimeLeft] = useState(START_TIME);
  const [showTimeBonus, setShowTimeBonus] = useState(null); // { amount: number }
  const [showScoreBonus, setShowScoreBonus] = useState(null); // { amount: number }
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [paused, setPaused] = useState(false);
  const prevLevelRef = useRef(1);
  const [chance, setChance] = useState(1);
  const [hintCells, setHintCells] = useState(null); // { r1, c1, r2, c2 }
  const chanceUsedRef = useRef(false);
  const combosRef = useRef([]);
  const c5ConditionRef = useRef(c5Condition);
  c5ConditionRef.current = c5Condition;
  const timeLeftRef = useRef(timeLeft);
  timeLeftRef.current = timeLeft;
  const dragStartPos = useRef({ x: 0, y: 0 });
  const selectionRef = useRef(null);
  const deliveryTimeoutRef = useRef(null);
  const timerRef = useRef(null);
  const timeBonusTimeoutRef = useRef(null);
  
  const cellAnims = useRef(
    Array(GRID_SIZE).fill(null).map(() =>
      Array(GRID_SIZE).fill(null).map(() => ({
        opacity: useSharedValue(1),
        scale: useSharedValue(1),
        translateY: useSharedValue(0),
        rotateY: useSharedValue(0),
      }))
    )
  ).current;
  
  const scoreScale = useSharedValue(1);
  const deliveryScale = useSharedValue(0);
  const deliveryY = useSharedValue(0);
  const timerBarFlash = useSharedValue(0);
  const levelUpScale = useSharedValue(0);
  const levelUpOpacity = useSharedValue(0);
  const customerSlideX = useSharedValue(200);
  const customerSlideOpacity = useSharedValue(0);
  const customerSlideStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: customerSlideX.value }],
    opacity: customerSlideOpacity.value,
  }));
  const levelUpAnimStyle = useAnimatedStyle(() => ({
    transform: [{ scale: levelUpScale.value }],
    opacity: levelUpOpacity.value,
  }));
  
  // Timer
  useEffect(() => {
    if (gameOver || paused) {
      clearInterval(timerRef.current);
      return;
    }
    timerRef.current = setInterval(() => {
      if (possibleCombinationsRef.current === 0) return;
      setTimeLeft(prev => {
        if (prev <= 0.1) {
          setGameOver(true);
          return 0;
        }
        const next = Math.max(0, prev - 0.1);
        if (next <= 5.05 && !chanceUsedRef.current) {
          chanceUsedRef.current = true;
          setChance(c => {
            if (c > 0) {
              // trigger hint via separate effect
              setHintCells('TRIGGER');
              return 0;
            }
            return c;
          });
        }
        return next;
      });
    }, 100);
    return () => clearInterval(timerRef.current);
  }, [gameOver, paused]);
  
  const addTime = useCallback((bonusSeconds) => {
    const maxTime = getMaxTime();
    const currentTime = timeLeftRef.current;
    const overflowScore = (currentTime + bonusSeconds) > maxTime ? Math.floor((currentTime + bonusSeconds - maxTime) * 10) : 0;
    const actualBonus = Math.round(Math.min(bonusSeconds, maxTime - currentTime));
    
    timeLeftRef.current = Math.min(maxTime, currentTime + bonusSeconds);
    setTimeLeft(timeLeftRef.current);
    
    // Show time bonus text (actual amount added)
    setShowTimeBonus({ amount: actualBonus });
    timerBarFlash.value = withTiming(1, { duration: 100 });
    
    clearTimeout(timeBonusTimeoutRef.current);
    timeBonusTimeoutRef.current = setTimeout(() => {
      setShowTimeBonus(null);
      timerBarFlash.value = withTiming(0, { duration: 300 });
    }, 1000);
    
    return overflowScore;
  }, [timerBarFlash]);
  
  useEffect(() => {
    const preventContextMenu = (e) => {
      e.preventDefault();
      return false;
    };
    document.addEventListener('contextmenu', preventContextMenu, true);
    return () => {
      document.removeEventListener('contextmenu', preventContextMenu, true);
    };
  }, []);

  const calculateSum = (sel) => {
    if (!sel) return { sum: 0, minRow: 0, maxRow: 0, minCol: 0, maxCol: 0 };
    const minRow = Math.min(sel.startRow, sel.endRow);
    const maxRow = Math.max(sel.startRow, sel.endRow);
    const minCol = Math.min(sel.startCol, sel.endCol);
    const maxCol = Math.max(sel.startCol, sel.endCol);
    let sum = 0;
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        if (!board[r][c].removed) {
          sum += board[r][c].value;
        }
      }
    }
    return { sum, minRow, maxRow, minCol, maxCol };
  };
  
  const currentSum = useMemo(() => calculateSum(selection), [selection, board]);
  
  const [assistMode, setAssistMode] = useState(false);
  const assistTapCount = useRef(0);
  const assistTapTimer = useRef(null);

  const handlePossibleTap = useCallback(() => {
    assistTapCount.current += 1;
    clearTimeout(assistTapTimer.current);
    if (assistTapCount.current >= 3) {
      assistTapCount.current = 0;
      setAssistMode(prev => !prev);
    } else {
      assistTapTimer.current = setTimeout(() => {
        assistTapCount.current = 0;
      }, 600);
    }
  }, []);

  // Hint effect: when hintCells === 'TRIGGER', pick first combo and animate
  useEffect(() => {
    if (hintCells !== 'TRIGGER') return;
    if (combosRef.current.length === 0) { setHintCells(null); return; }
    const combo = combosRef.current[0];
    setHintCells(combo);
    // Flip animation: rotateY 0 → 90 → 0
    for (let r = combo.r1; r <= combo.r2; r++) {
      for (let c = combo.c1; c <= combo.c2; c++) {
        const anim = cellAnims[r][c];
        anim.rotateY.value = withTiming(90, { duration: 250 }, () => {
          anim.rotateY.value = withTiming(0, { duration: 250 });
        });
      }
    }
    setTimeout(() => setHintCells(null), 1200);
  }, [hintCells]);

  const combos = useMemo(() => { // eslint-disable-line
    const result = [];
    for (let r1 = 0; r1 < GRID_SIZE; r1++) {
      for (let c1 = 0; c1 < GRID_SIZE; c1++) {
        for (let r2 = r1; r2 < GRID_SIZE; r2++) {
          for (let c2 = c1; c2 < GRID_SIZE; c2++) {
            let sum = 0;
            for (let r = r1; r <= r2; r++) {
              for (let c = c1; c <= c2; c++) {
                if (!board[r][c].removed) sum += board[r][c].value;
              }
            }
            const cellCount = (r2 - r1 + 1) * (c2 - c1 + 1);
            if (sum === customerRequest && cellCount >= 2) {
              if (c5Condition) {
                let hasFruit = false;
                for (let r = r1; r <= r2; r++)
                  for (let c = c1; c <= c2; c++)
                    if (!board[r][c].removed && board[r][c].fruit === c5Condition.fruit) hasFruit = true;
                const fruitOk = c5Condition.type === 'include' ? hasFruit : !hasFruit;
                if (!fruitOk) continue;
              }
              result.push({ r1, c1, r2, c2 });
            }
          }
        }
      }
    }
    return result;
  }, [board, c5Condition]);

  combosRef.current = combos;
  const possibleCombinations = combos.length;
  const possibleCombinationsRef = useRef(possibleCombinations);
  possibleCombinationsRef.current = possibleCombinations;

  const assistCombos = useMemo(() => {
    const picked = [];
    const usedCells = new Set();
    for (const combo of combos) {
      let overlaps = false;
      for (let r = combo.r1; r <= combo.r2; r++) {
        for (let c = combo.c1; c <= combo.c2; c++) {
          if (usedCells.has(`${r},${c}`)) { overlaps = true; break; }
        }
        if (overlaps) break;
      }
      if (!overlaps) {
        picked.push(combo);
        for (let r = combo.r1; r <= combo.r2; r++)
          for (let c = combo.c1; c <= combo.c2; c++)
            usedCells.add(`${r},${c}`);
      }
      if (picked.length >= 5) break;
    }
    return picked;
  }, [combos]);
  
  const resetBoard = useCallback(() => {
    const newBoard = generateBoard(score, GRID_SIZE, customerRequest);
    setBoard(newBoard);
    setTimeLeft(START_TIME);
    for (let r = 0; r < GRID_SIZE; r++) {
      for (let c = 0; c < GRID_SIZE; c++) {
        cellAnims[r][c].opacity.value = withTiming(1, { duration: 300 });
        cellAnims[r][c].scale.value = withSpring(1, { damping: 15 });
      }
    }
  }, [score, customerRequest, cellAnims, GRID_SIZE, setTimeLeft]);
  
  // Delivery animation
  const playDeliveryAnimation = useCallback(() => {
    setShowDelivery(true);
    deliveryScale.value = withSpring(1, { damping: 12 });
    deliveryY.value = withTiming(-50, { duration: 500 });
    
    deliveryTimeoutRef.current = setTimeout(() => {
      deliveryScale.value = withTiming(0, { duration: 200 });
      deliveryY.value = withTiming(0, { duration: 200 });
      setTimeout(() => setShowDelivery(false), 200);
    }, 800);
  }, [deliveryScale, deliveryY]);

  const removeApples = useCallback((minRow, maxRow, minCol, maxCol) => {
    const count = (maxRow - minRow + 1) * (maxCol - minCol + 1);
    const level = getLevel(score);
    const points = level + count;
    const timeBonus = count >= 4 ? 7 : count >= 3 ? 6 : 5;
    
    // Play delivery animation first
    playDeliveryAnimation();
    const scoreBonus = addTime(timeBonus);
    const newScore = score + points + scoreBonus;
    
    for (let r = minRow; r <= maxRow; r++) {
      for (let c = minCol; c <= maxCol; c++) {
        const anims = cellAnims[r][c];
        anims.opacity.value = withTiming(0, { duration: 200 });
        anims.scale.value = withTiming(0.8, { duration: 200 });
      }
    }
    
    setTimeout(() => {
      setScore(newScore);
      // Show combined score gain effect
      setShowScoreBonus({ amount: points + scoreBonus });
      // Generate new customer request based on new score
      setCustomerRequest(generateCustomerRequest(newScore));
      const newSeed = Math.floor(Math.random() * 20);
      setCustomerImgSeed(newSeed);
      const newLevel = getLevel(newScore);
      const c5Threshold = newLevel >= 18 ? 8 : newLevel >= 15 ? 6 : newLevel >= 10 ? 4 : 0;
      const isC5 = newSeed < c5Threshold;
      setC5Condition(isC5 ? generateC5Condition(board) : null);
      customerSlideX.value = 200;
      customerSlideOpacity.value = 0;
      customerSlideX.value = withSpring(0, { damping: 18, stiffness: 120 });
      customerSlideOpacity.value = withTiming(1, { duration: 200 });
      scoreScale.value = withSpring(1.15, { damping: 12 });
      // Level up check
      if (newLevel > prevLevelRef.current) {
        prevLevelRef.current = newLevel;
        setShowLevelUp(true);
        setChance(1);
        chanceUsedRef.current = false;
        levelUpScale.value = 0;
        levelUpOpacity.value = 0;
        levelUpScale.value = withSpring(1, { damping: 8, stiffness: 120 });
        levelUpOpacity.value = withTiming(1, { duration: 200 });
        setTimeout(() => {
          levelUpOpacity.value = withTiming(0, { duration: 300 });
          setTimeout(() => setShowLevelUp(false), 300);
        }, 800);
      }
      
      // Hide score bonus after 1 second
      setTimeout(() => {
        setShowScoreBonus(null);
      }, 1000);
      
      setBoard(prev => {
        const newBoard = prev.map(row => row.map(cell => ({ ...cell })));
        
        for (let r = minRow; r <= maxRow; r++) {
          for (let c = minCol; c <= maxCol; c++) {
            newBoard[r][c].removed = true;
          }
        }
        
        // Gravity: move existing fruits down
        for (let c = minCol; c <= maxCol; c++) {
          const columnCells = [];
          for (let r = 0; r < GRID_SIZE; r++) {
            if (!newBoard[r][c].removed) {
              columnCells.push({ cell: { ...newBoard[r][c] }, originalRow: r });
            }
          }
          let writeRow = GRID_SIZE - 1;
          for (let i = columnCells.length - 1; i >= 0; i--) {
            const { cell, originalRow } = columnCells[i];
            newBoard[writeRow][c] = cell;
            // Animate fall: start from original position
            if (writeRow !== originalRow) {
              const fallDist = (writeRow - originalRow) * (CELL_SIZE + CELL_MARGIN * 2);
              const anims = cellAnims[writeRow][c];
              anims.translateY.value = -fallDist;
              anims.opacity.value = 1;
            }
            writeRow--;
          }
          for (let r = 0; r <= writeRow; r++) {
            newBoard[r][c] = { 
              value: getNextNumber(customerRequest), 
              fruit: FRUITS[Math.floor(Math.random() * FRUITS.length)],
              removed: false 
            };
            const dropDist = (writeRow + 1) * (CELL_SIZE + CELL_MARGIN * 2);
            const anims = cellAnims[r][c];
            anims.opacity.value = 1;
            anims.scale.value = 1;
            anims.translateY.value = -dropDist;
          }
        }
        
        return newBoard;
      });
      
      setTimeout(() => {
        for (let c = minCol; c <= maxCol; c++) {
          for (let r = 0; r < GRID_SIZE; r++) {
            const anims = cellAnims[r][c];
            anims.translateY.value = withSpring(0, { damping: 14, stiffness: 120 });
            anims.opacity.value = withTiming(1, { duration: 150 });
            anims.scale.value = withSpring(1, { damping: 15 });
          }
        }
      }, 50);
    }, 200);
  }, [board, score, cellAnims, scoreScale, GRID_SIZE, CELL_SIZE, playDeliveryAnimation]);

  const getCellFromPos = (x, y) => {
    const col = Math.floor(x / (CELL_SIZE + CELL_MARGIN * 2));
    const row = Math.floor(y / (CELL_SIZE + CELL_MARGIN * 2));
    return {
      row: Math.max(0, Math.min(GRID_SIZE - 1, row)),
      col: Math.max(0, Math.min(GRID_SIZE - 1, col)),
    };
  };

  const isInSelection = (row, col) => {
    if (!selection || !isDragging) return false;
    const minRow = Math.min(selection.startRow, selection.endRow);
    const maxRow = Math.max(selection.startRow, selection.endRow);
    const minCol = Math.min(selection.startCol, selection.endCol);
    const maxCol = Math.max(selection.startCol, selection.endCol);
    return row >= minRow && row <= maxRow && col >= minCol && col <= maxCol;
  };

  const onDragStart = useCallback((x, y) => {
    if (gameOver) return;
    dragStartPos.current = { x, y };
    setIsDragging(true);
    const cell = getCellFromPos(x, y);
    const newSelection = {
      startRow: cell.row,
      startCol: cell.col,
      endRow: cell.row,
      endCol: cell.col,
    };
    selectionRef.current = newSelection;
    setSelection(newSelection);
    setDragRect({ x1: x, y1: y, x2: x, y2: y });
  }, [gameOver]);

  const onDragUpdate = useCallback((x, y) => {
    if (gameOver) return;
    setDragRect({ x1: dragStartPos.current.x, y1: dragStartPos.current.y, x2: x, y2: y });
    const startCell = getCellFromPos(dragStartPos.current.x, dragStartPos.current.y);
    const endCell = getCellFromPos(x, y);
    const newSelection = {
      startRow: startCell.row,
      startCol: startCell.col,
      endRow: endCell.row,
      endCol: endCell.col,
    };
    selectionRef.current = newSelection;
    setSelection(newSelection);
  }, [gameOver]);

  const onDragEnd = useCallback(() => {
    if (gameOver) return;
    const currentSelection = selectionRef.current;
    selectionRef.current = null;
    setIsDragging(false);
    setSelection(null);
    setDragRect(null);
    if (currentSelection) {
      const { sum, minRow, maxRow, minCol, maxCol } = calculateSum(currentSelection);
      if (sum === customerRequest) {
        const cond = c5ConditionRef.current;
        let fruitOk = true;
        if (cond) {
          let hasFruit = false;
          for (let r = minRow; r <= maxRow; r++) {
            for (let c = minCol; c <= maxCol; c++) {
              if (!board[r][c].removed && board[r][c].fruit === cond.fruit) {
                hasFruit = true;
              }
            }
          }
          fruitOk = cond.type === 'include' ? hasFruit : !hasFruit;
        }
        if (fruitOk) {
          removeApples(minRow, maxRow, minCol, maxCol);
        }
      }
    }
  }, [removeApples, customerRequest, gameOver, board]);

  const panGesture = Gesture.Pan()
    .onBegin((e) => { onDragStart(e.x, e.y); })
    .onUpdate((e) => { onDragUpdate(e.x, e.y); })
    .onEnd(() => { onDragEnd(); })
    .onFinalize(() => { onDragEnd(); });

  useEffect(() => {
    const newBoard = generateBoard(0, GRID_SIZE, customerRequest);
    setBoard(newBoard);
  }, [GRID_SIZE]);

  // Initial customer slide-in on mount
  useEffect(() => {
    customerSlideX.value = 200;
    customerSlideOpacity.value = 0;
    customerSlideX.value = withSpring(0, { damping: 18, stiffness: 120 });
    customerSlideOpacity.value = withTiming(1, { duration: 200 });
  }, []);

  // Delivery animation styles
  const deliveryAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: deliveryScale.value },
      { translateY: deliveryY.value },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={onBackToStart}>
          <Svg width={28} height={28} viewBox="0 0 28 28">
            <Path d="M18 5 L9 14 L18 23" stroke="#8B7355" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          </Svg>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.resetBtn} onPress={() => setPaused(p => !p)}><Text style={styles.resetIcon}>{paused ? '▶' : '⏸'}</Text></TouchableOpacity> */}
      </View>

      {/* Score + Level Row */}
      <View style={{ alignItems: 'center' }}>
        <View style={styles.scoreRow}>
          <View style={styles.levelBox}>
            <Text style={styles.levelLabel}>LEVEL</Text>
            <Text style={styles.levelValue}>{getLevel(score)}</Text>
          </View>
          <TouchableOpacity style={styles.scoreBox} onPress={handlePossibleTap}>
            <Text style={styles.scoreLabel}>SCORE</Text>
            <Animated.Text style={[styles.scoreValue, useAnimatedStyle(() => ({ transform: [{ scale: scoreScale.value }] }))]}>
              {score}
            </Animated.Text>
          </TouchableOpacity>
        </View>
        {showScoreBonus && (
          <Text style={styles.scoreBonusText}>+{showScoreBonus.amount}점</Text>
        )}
      </View>

      <TimerBar timeLeft={timeLeft} maxTime={getMaxTime()} flashValue={timerBarFlash} showTimeBonus={showTimeBonus} />

      {/* Level Up Banner */}
      {showLevelUp && (
        <Animated.View style={[styles.levelUpBanner, levelUpAnimStyle]}>
          <Text style={styles.levelUpBannerText}>⭐ LEVEL UP! Lv.{getLevel(score)}</Text>
        </Animated.View>
      )}

      {/* Worker and Customer */}
      <View style={styles.charactersRow}>
        {/* Worker (Left) */}
        <View style={styles.characterWrapper}>
          <Image source={showDelivery ? workerImgDelivery : workerImg} style={styles.workerImage} resizeMode="contain" />
        </View>

        {/* Customer (Right) */}
        <View style={styles.characterWrapper}>
          <Animated.View style={[styles.characterEmojiWrapper, customerSlideStyle]}>
            <Image source={getCustomerImg(customerRequest, customerImgSeed, c5Condition !== null)} style={customerRequest <= 9 ? styles.customerImageSmall : styles.customerImage} resizeMode="contain" />
            <View style={[styles.svgBubbleContainer, c5Condition && styles.svgBubbleContainerLarge]}>
              {Platform.OS === 'web' ? (
                <img
                  src={c5Condition
                    ? "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 180'%3E%3Cpath d='M100 155C138.66 155 170 129.614 170 98C170 66.3858 138.66 41 100 41C61.3401 41 30 66.3858 30 98C30 114.517 38.6946 129.49 52.4838 139.396C51.6885 145.516 49.3333 155.833 40 167C53.3333 165 70 160.5 78.5 153.5C85.4221 154.628 92.6288 155 100 155Z' fill='%23FF6B42'/%3E%3C/svg%3E"
                    : "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 150'%3E%3Cpath d='M100 125C138.66 125 170 102.614 170 75C170 47.3858 138.66 25 100 25C61.3401 25 30 47.3858 30 75C30 89.5167 38.6946 102.49 52.4838 111.396C51.6885 116.516 49.3333 124.833 40 135C53.3333 133 70 128.5 78.5 122.5C85.4221 124.128 92.6288 125 100 125Z' fill='%23FF6B42'/%3E%3C/svg%3E"
                  }
                  style={{ width: '100%', height: '100%', position: 'absolute' }}
                  alt=""
                />
              ) : (
                c5Condition ? (
                  <Svg width="100%" height="100%" viewBox="0 0 200 180">
                    <Path d="M100 155C138.66 155 170 129.614 170 98C170 66.3858 138.66 41 100 41C61.3401 41 30 66.3858 30 98C30 114.517 38.6946 129.49 52.4838 139.396C51.6885 145.516 49.3333 155.833 40 167C53.3333 165 70 160.5 78.5 153.5C85.4221 154.628 92.6288 155 100 155Z" fill="#FF6B42" />
                  </Svg>
                ) : (
                  <Svg width="100%" height="100%" viewBox="0 0 200 150">
                    <Path d="M100 125C138.66 125 170 102.614 170 75C170 47.3858 138.66 25 100 25C61.3401 25 30 47.3858 30 75C30 89.5167 38.6946 102.49 52.4838 111.396C51.6885 116.516 49.3333 124.833 40 135C53.3333 133 70 128.5 78.5 122.5C85.4221 124.128 92.6288 125 100 125Z" fill="#FF6B42" />
                  </Svg>
                )
              )}
              <View style={styles.bubbleContent}>
                <Text style={styles.svgBubbleText}>{customerRequest}</Text>
                {c5Condition && (() => {
                  const FruitIconComp = FRUIT_ICON[c5Condition.fruit];
                  return (
                    <View style={styles.bubbleFruitRow}>
                      {FruitIconComp && <FruitIconComp size={20} />}
                      {c5Condition.type === 'exclude' && <Text style={styles.bubbleFruitType}>❌</Text>}
                    </View>
                  );
                })()}
              </View>
            </View>
          </Animated.View>
        </View>
      </View>


      {!gameOver && possibleCombinations === 0 && (
        <View style={styles.noComboBanner}>
          <View style={styles.noComboPopup}>
            <Text style={styles.noComboEmoji}>🔄</Text>
            <Text style={styles.noComboTitle}>조합 없음!</Text>
            <Text style={styles.noComboDesc}>가능한 조합이 없습니다{`\n`}보드를 새로고침하세요</Text>
            <TouchableOpacity style={styles.noComboBtn} onPress={() => { setPaused(false); resetBoard(); }}>
              <Text style={styles.noComboBtnText}>새로고침</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {gameOver && (
        <View style={styles.gameOverOverlay}>
          <Text style={styles.gameOverText}>GAME OVER</Text>
          <Text style={styles.gameOverScore}>Score: {score}</Text>
          <Text style={styles.gameOverHint} onPress={onBackToStart}>← Back to Menu</Text>
        </View>
      )}

      <GestureHandlerRootView style={[styles.board, gameOver && styles.boardDisabled]}>
        <GestureDetector gesture={panGesture}>
        <View style={styles.gridWrapper}>
          {assistMode && assistCombos.map((combo, i) => (
            <View
              key={i}
              pointerEvents="none"
              style={[styles.assistOverlay, {
                left: combo.c1 * (CELL_SIZE + CELL_MARGIN * 2),
                top: combo.r1 * (CELL_SIZE + CELL_MARGIN * 2),
                width: (combo.c2 - combo.c1 + 1) * (CELL_SIZE + CELL_MARGIN * 2) - CELL_MARGIN * 2,
                height: (combo.r2 - combo.r1 + 1) * (CELL_SIZE + CELL_MARGIN * 2) - CELL_MARGIN * 2,
              }]}
            />
          ))}
          {dragRect && (
            <View style={[styles.dragOverlay, {
              left: Math.min(dragRect.x1, dragRect.x2),
              top: Math.min(dragRect.y1, dragRect.y2),
              width: Math.abs(dragRect.x2 - dragRect.x1),
              height: Math.abs(dragRect.y2 - dragRect.y1),
            }]}>
              <View style={styles.sumBadgeWrapper}>
                <Text style={[styles.sumBadge, currentSum.sum === customerRequest && styles.sumBadgePerfect]}>
                  {currentSum.sum}
                </Text>
              </View>
            </View>
          )}
          {board.map((row, rowIndex) => (
            <View key={rowIndex} style={styles.row}>
              {row.map((cell, colIndex) => (
                <Cell
                  key={colIndex}
                  cell={cell}
                  rowIndex={rowIndex}
                  colIndex={colIndex}
                  anims={cellAnims[rowIndex][colIndex]}
                  isSelected={isInSelection(rowIndex, colIndex)}
                  cellSize={CELL_SIZE}
                />
              ))}
            </View>
          ))}
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}

function TimerBar({ timeLeft, maxTime, flashValue, showTimeBonus }) {
  const progress = timeLeft / maxTime;
  const fillColor = progress > 0.5 ? '#4CAF50' : progress > 0.3 ? '#FF9800' : '#FF4444';
  const secondsLeft = Math.ceil(timeLeft);
  
  const flashStyle = useAnimatedStyle(() => ({
    shadowOpacity: 0.2 + flashValue.value * 0.5,
    shadowRadius: 4 + flashValue.value * 8,
  }));
  
  return (
    <View style={timerStyles.wrapper}>
      {showTimeBonus && (
        <Text style={timerStyles.bonusText}>+{Math.round(showTimeBonus.amount)}초</Text>
      )}
      <Animated.View style={[timerStyles.container, flashStyle]}>
        <View style={timerStyles.track}>
          <View style={[timerStyles.fill, { width: `${progress * 100}%`, backgroundColor: fillColor }]} />
          <View style={timerStyles.timeOverlay}>
            <Text style={timerStyles.timeText}>{secondsLeft}</Text>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const timerStyles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 20,
    marginVertical: 8,
    position: 'relative',
  },
  container: { 
    flexDirection: 'row', 
    alignItems: 'center',
    shadowColor: '#FFD700',
    shadowOffset: { width: 0, height: 0 },
  },
  track: { flex: 1, height: 24, backgroundColor: '#E0E0E0', borderRadius: 12, overflow: 'hidden', position: 'relative' },
  fill: { height: '100%', backgroundColor: '#4CAF50', borderRadius: 12, position: 'absolute', left: 0, top: 0 },
  timeOverlay: { 
    position: 'absolute',
    right: 10,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  timeText: { 
    color: '#333', 
    fontSize: 16, 
    fontWeight: '900',
  },
  bonusText: {
    position: 'absolute',
    top: -20,
    right: 20,
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: '800',
  },
});

function Cell({ cell, anims, isSelected, cellSize }) {
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: anims.opacity.value,
    transform: [
      { translateY: anims.translateY.value },
      { scale: isSelected ? 0.95 : anims.scale.value },
      { perspective: 600 },
      { rotateY: `${anims.rotateY.value}deg` },
    ],
  }));

  const appleFontSize = Math.floor(cellSize * 0.55);
  const numberFontSize = Math.floor(cellSize * 0.32);

  return (
    <Animated.View style={[styles.cellContainer, { width: cellSize, height: cellSize }, animatedStyle]}>
      {cell.value > 0 && (
        <>
          <FruitBlock 
            size={cellSize} 
            fruit={cell.fruit || FRUITS[0]} 
            selected={isSelected}
            style={styles.cellBackground}
          />
          <View style={styles.cellContent}>
            {(() => {
              const iconSize = appleFontSize * 1.2;
              switch (cell.fruit) {
                case 'apple':       return <AppleIcon size={iconSize} />;
                case 'orange':      return <OrangeIcon size={iconSize} />;
                case 'grape':       return <GrapeIcon size={iconSize} />;
                case 'pear':        return <PearIcon size={iconSize} />;
                case 'watermelon':  return <WatermelonIcon size={iconSize} />;
                case 'strawberry':  return <StrawberryIcon size={iconSize} />;
                case 'peach':       return <PeachIcon size={iconSize} />;
                case 'pineapple':   return <PineappleIcon size={iconSize} />;
                default: return <AppleIcon size={iconSize} />;
              }
            })()}
            <Text style={[styles.number, { fontSize: numberFontSize }]}>{cell.value}</Text>
          </View>
        </>
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF8E7', paddingTop: 12, overflow: 'hidden' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 2 },
  backBtn: { width: 40, height: 40, backgroundColor: 'rgba(139,115,85,0.12)', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: '900', color: '#FF8C42', letterSpacing: 2 },
  resetBtn: { width: 44, height: 44, backgroundColor: '#4CAF50', borderRadius: 22, justifyContent: 'center', alignItems: 'center', shadowColor: '#388E3C', shadowOffset: { width: 0, height: 3 }, shadowOpacity: 0.4, shadowRadius: 6, elevation: 6, borderWidth: 2, borderColor: '#81C784' },
  resetIcon: { color: '#FFF', fontSize: 22, fontWeight: 'bold', includeFontPadding: false, textAlign: 'center', textAlignVertical: 'center', marginTop: -2 },
  
  // Level Up Overlay
  levelUpBanner: { position: 'absolute', top: 60, alignSelf: 'center', zIndex: 200, backgroundColor: '#FF8C42', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 8 },
  levelUpBannerText: { fontSize: 16, fontWeight: '900', color: '#FFF', letterSpacing: 1 },

  // Score Box
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 6 },
  scoreBox: { backgroundColor: '#FFF', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, alignItems: 'center', minWidth: 80, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  levelBox: { backgroundColor: '#FFF', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10, alignItems: 'center', minWidth: 70, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  levelLabel: { fontSize: 12, color: '#8B7355', fontWeight: '600', marginBottom: 4 },
  levelValue: { fontSize: 32, fontWeight: '900', color: '#FF8C42' },
  scoreLabel: { fontSize: 12, color: '#8B7355', fontWeight: '600', marginBottom: 4 },
  scoreValue: { fontSize: 32, fontWeight: '900', color: '#FF8C42' },
  scoreBonusText: {
    position: 'absolute',
    top: 70,
    color: '#FF8C42',
    fontSize: 16,
    fontWeight: '800',
  },
  
  // Characters (Worker & Customer)
  charactersRow: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginBottom: 6, marginTop: 6 },
  characterWrapper: { 
    alignItems: 'center', 
    flex: 1,
    justifyContent: 'flex-end',
  },
  workerImage: {
    height: 110,
    aspectRatio: 677 / 369,
  },
  customerImage: {
    height: 110,
    aspectRatio: 677 / 369,
  },
  customerImageSmall: {
    height: 75,
    aspectRatio: 677 / 369,
  },
  characterEmojiWrapper: {
    position: 'relative',
    width: 275,
    height: 110,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bigCharacter: { fontSize: 52 },
  // SVG bubble for mobile (iOS/Android)
  svgBubbleContainer: {
    position: 'absolute',
    top: 0,
    right: 40,
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  svgBubbleContainerLarge: {
    width: 80,
    height: 70,
  },
  bubbleContent: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 0,
  },
  svgBubbleText: { 
    fontSize: 16, 
    fontWeight: '900', 
    color: '#FFF',
    lineHeight: 18,
  },
  bubbleFruitRow: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  bubbleFruitType: {
    position: 'absolute',
    fontSize: 14,
  },
  // Cartoon style bubble
  cartoonBubble: { 
    backgroundColor: '#FF6B42', 
    borderRadius: 16, 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    minWidth: 56, 
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginBottom: 10,
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  cartoonBubbleText: { 
    fontSize: 20, 
    fontWeight: '900', 
    color: '#FFF',
  },
  // Simple tail pointing left
  cartoonBubbleTail: {
    position: 'absolute',
    left: -8,
    bottom: 12,
    width: 0,
    height: 0,
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    borderRightWidth: 10,
    borderRightColor: '#FF6B42',
  },
  
  // Delivery Animation
  deliveryAnimation: { position: 'absolute', top: '28%', left: '50%', marginLeft: -80, alignItems: 'center', zIndex: 100 },
  deliveryCard: { backgroundColor: '#FFF', borderRadius: 20, paddingHorizontal: 20, paddingVertical: 14, alignItems: 'center', shadowColor: '#FF8C42', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 10, elevation: 10, borderWidth: 2, borderColor: '#FFD700' },
  deliveryText: { fontSize: 15, fontWeight: '800', color: '#FF8C42', marginTop: 6, letterSpacing: 1 },
  
  sumBadgeWrapper: { flex: 1, alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' },
  sumBadge: { color: '#FFF', fontWeight: '900', fontSize: 22, textShadowColor: 'rgba(0,0,0,0.6)', textShadowOffset: { width: 0, height: 1 }, textShadowRadius: 4 },
  sumBadgePerfect: { color: '#AFFFB0', textShadowColor: 'rgba(0,100,0,0.5)' },
  board: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  boardDisabled: { opacity: 0.3 },
  noComboBanner: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', zIndex: 100 },
  noComboPopup: { backgroundColor: 'rgba(30,20,10,0.92)', borderRadius: 24, paddingVertical: 28, paddingHorizontal: 32, alignItems: 'center', borderWidth: 2, borderColor: '#FF8C42', shadowColor: '#000', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.4, shadowRadius: 16, elevation: 12 },
  noComboEmoji: { fontSize: 40, marginBottom: 8 },
  noComboTitle: { fontSize: 22, fontWeight: '900', color: '#FF8C42', marginBottom: 8 },
  noComboDesc: { fontSize: 14, color: '#FFE0B2', textAlign: 'center', marginBottom: 20, lineHeight: 20 },
  noComboBtn: { backgroundColor: '#FF8C42', paddingHorizontal: 28, paddingVertical: 12, borderRadius: 20 },
  noComboBtnText: { fontSize: 16, fontWeight: '900', color: '#FFF' },
  gameOverOverlay: { position: 'absolute', top: '40%', left: 20, right: 20, backgroundColor: '#FFF8E7', borderRadius: 20, padding: 30, alignItems: 'center', zIndex: 1000, shadowColor: '#FF8C42', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 8, borderWidth: 3, borderColor: '#FF8C42' },
  gameOverText: { fontSize: 36, fontWeight: '900', color: '#FF8C42', marginBottom: 12, letterSpacing: 2 },
  gameOverScore: { fontSize: 24, color: '#8B7355', fontWeight: 'bold', marginBottom: 24 },
  gameOverHint: { fontSize: 16, color: '#FFF', backgroundColor: '#FF8C42', paddingHorizontal: 24, paddingVertical: 12, borderRadius: 25, fontWeight: 'bold', overflow: 'hidden' },
  gridWrapper: { position: 'relative' },
  assistOverlay: { position: 'absolute', backgroundColor: 'rgba(255, 140, 66, 0.25)', borderWidth: 2, borderColor: '#FF8C42', borderRadius: 8, zIndex: 50 },
  dragOverlay: { position: 'absolute', backgroundColor: 'rgba(255, 140, 66, 0.3)', borderWidth: 2, borderColor: '#FF8C42', zIndex: 100, pointerEvents: 'none' },
  row: { flexDirection: 'row' },
  cellContainer: { justifyContent: 'center', alignItems: 'center', margin: CELL_MARGIN },
  cellBackground: { position: 'absolute', top: 0, left: 0 },
  cellContent: { justifyContent: 'center', alignItems: 'center', zIndex: 10 },
  cellSelected: { transform: [{ scale: 0.98 }] },
  apple: { fontSize: 28 },
  number: { 
    position: 'absolute', 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#FFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 3,
  },
});
