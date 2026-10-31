import React, { useState, useEffect } from 'react';
import bgImage from './assets/bg.png';

const Calculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [equation, setEquation] = useState('');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const playClickSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.04, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.05);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.05);
    } catch {
      // Bỏ qua nếu trình duyệt không hỗ trợ âm thanh
    }
  };

  const handleNumber = (num: string) => {
    playClickSound();
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const handleDot = () => {
    playClickSound();
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const calculate = (a: number, b: number, op: string): number => {
    switch (op) {
      case '+': return a + b;
      case '-': return a - b;
      case '×':
      case '*': return a * b;
      case '÷':
      case '/': return b !== 0 ? a / b : 0;
      default: return b;
    }
  };

  const handleOperator = (op: string) => {
    playClickSound();
    const current = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(current);
      setEquation(`${current} ${op}`);
    } else if (operation && !waitingForNewValue) {
      const result = calculate(prevValue, current, operation);
      setPrevValue(result);
      setDisplay(String(result));
      setEquation(`${result} ${op}`);
    } else {
      setEquation(`${prevValue} ${op}`);
    }

    setOperation(op);
    setWaitingForNewValue(true);
  };

  const handleEqual = () => {
    playClickSound();
    if (prevValue !== null && operation) {
      const current = parseFloat(display);
      const result = calculate(prevValue, current, operation);
      const formula = `${prevValue} ${operation} ${current} = ${result}`;
      setHistory(prev => [formula, ...prev.slice(0, 9)]);
      setDisplay(String(result));
      setEquation('');
      setPrevValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const handleClear = () => {
    playClickSound();
    setDisplay('0');
    setEquation('');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const handleToggleSign = () => {
    playClickSound();
    const val = parseFloat(display);
    if (val !== 0) setDisplay(String(val * -1));
  };

  const handlePercent = () => {
    playClickSound();
    setDisplay(String(parseFloat(display) / 100));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isNaN(Number(e.key))) handleNumber(e.key);
      if (['+', '-', '*', '/'].includes(e.key)) {
        const mapOp: { [key: string]: string } = { '*': '×', '/': '÷', '+': '+', '-': '-' };
        handleOperator(mapOp[e.key] || e.key);
      }
      if (e.key === 'Enter' || e.key === '=') handleEqual();
      if (e.key === 'Escape' || e.key.toLowerCase() === 'c') handleClear();
      if (e.key === '.') handleDot();
      if (e.key === 'Backspace') {
        setDisplay(prev => (prev.length > 1 ? prev.slice(0, -1) : '0'));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  });

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>React Calculator Pro</h1>
      <p style={styles.subtitle}>Student Assignment: Custom Background Edition</p>

      <div style={styles.wrapper}>
        <div
          style={{
            ...styles.calculatorCard,
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.25), rgba(0, 0, 0, 0.45)), url(${bgImage})`,
          }}
        >
          <div style={styles.screen}>
            <div style={styles.screenTop}>
              <button
                style={styles.historyToggleBtn}
                onClick={() => setShowHistory(!showHistory)}
              >
                🕒 {showHistory ? 'Đóng' : 'Lịch sử'}
              </button>
              <div style={styles.equationText}>{equation || ''}</div>
            </div>
            <div style={styles.displayText}>{display}</div>
          </div>

          <div style={styles.grid}>
            <button style={{ ...styles.btn, ...styles.orangeBtn }} onClick={handleClear}>AC</button>
            <button style={{ ...styles.btn, ...styles.lightBtn }} onClick={handleToggleSign}>+/-</button>
            <button style={{ ...styles.btn, ...styles.lightBtn }} onClick={handlePercent}>%</button>
            <button style={{ ...styles.btn, ...styles.orangeBtn }} onClick={() => handleOperator('÷')}>÷</button>

            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('7')}>7</button>
            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('8')}>8</button>
            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('9')}>9</button>
            <button style={{ ...styles.btn, ...styles.orangeBtn }} onClick={() => handleOperator('×')}>×</button>

            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('4')}>4</button>
            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('5')}>5</button>
            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('6')}>6</button>
            <button style={{ ...styles.btn, ...styles.orangeBtn }} onClick={() => handleOperator('-')}>-</button>

            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('1')}>1</button>
            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('2')}>2</button>
            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={() => handleNumber('3')}>3</button>
            <button style={{ ...styles.btn, ...styles.orangeBtn }} onClick={() => handleOperator('+')}>+</button>

            <button style={{ ...styles.btn, ...styles.darkBtn, gridColumn: 'span 2' }} onClick={() => handleNumber('0')}>0</button>
            <button style={{ ...styles.btn, ...styles.darkBtn }} onClick={handleDot}>.</button>
            <button style={{ ...styles.btn, ...styles.orangeBtn }} onClick={handleEqual}>=</button>
          </div>
        </div>

        {showHistory && (
          <div style={styles.historyCard}>
            <div style={styles.historyHeader}>
              <h3 style={{ margin: 0, fontSize: '18px' }}>Lịch sử tính</h3>
              <button style={styles.clearHistoryBtn} onClick={() => setHistory([])}>
                Xóa
              </button>
            </div>
            <div style={styles.historyList}>
              {history.length === 0 ? (
                <p style={{ color: '#aaa', textAlign: 'center', marginTop: '20px' }}>Chưa có phép tính nào</p>
              ) : (
                history.map((item, index) => (
                  <div key={index} style={styles.historyItem}>{item}</div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #090d16 0%, #171d2b 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    padding: '20px',
  },
  title: {
    fontSize: '32px',
    fontWeight: '800',
    color: '#ffffff',
    margin: '0 0 6px 0',
  },
  subtitle: {
    fontSize: '15px',
    color: '#94a3b8',
    margin: '0 0 24px 0',
  },
  wrapper: {
    display: 'flex',
    gap: '20px',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  calculatorCard: {
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    padding: '22px',
    borderRadius: '28px',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.65)',
    width: '320px',
    border: '1.5px solid rgba(255, 255, 255, 0.25)',
  },
  screen: {
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    backdropFilter: 'blur(8px)',
    borderRadius: '16px',
    padding: '16px 18px',
    marginBottom: '20px',
    color: '#ffffff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    minHeight: '85px',
    border: '1px solid rgba(255, 255, 255, 0.15)',
  },
  screenTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '24px',
  },
  historyToggleBtn: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    color: '#f8fafc',
    borderRadius: '6px',
    padding: '3px 8px',
    fontSize: '12px',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
  },
  equationText: {
    fontSize: '15px',
    color: '#38bdf8',
  },
  displayText: {
    fontSize: '38px',
    fontWeight: '700',
    textAlign: 'right',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '12px',
  },
  btn: {
    height: '56px',
    borderRadius: '14px',
    fontSize: '20px',
    fontWeight: 'bold',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    cursor: 'pointer',
    backdropFilter: 'blur(4px)',
    transition: 'all 0.15s ease',
  },
  darkBtn: {
    backgroundColor: 'rgba(30, 41, 59, 0.65)',
    color: '#ffffff',
  },
  lightBtn: {
    backgroundColor: 'rgba(100, 116, 139, 0.65)',
    color: '#ffffff',
  },
  orangeBtn: {
    backgroundColor: 'rgba(249, 115, 22, 0.85)',
    color: '#ffffff',
  },
  historyCard: {
    background: 'rgba(30, 34, 45, 0.9)',
    backdropFilter: 'blur(10px)',
    padding: '20px',
    borderRadius: '26px',
    width: '240px',
    height: '380px',
    boxShadow: '0 20px 45px rgba(0,0,0,0.5)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    display: 'flex',
    flexDirection: 'column',
    color: '#fff',
  },
  historyHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #334155',
    paddingBottom: '10px',
  },
  clearHistoryBtn: {
    background: '#ef4444',
    border: 'none',
    color: '#fff',
    borderRadius: '6px',
    padding: '4px 8px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  historyList: {
    flex: 1,
    overflowY: 'auto',
    marginTop: '10px',
  },
  historyItem: {
    padding: '8px 10px',
    backgroundColor: 'rgba(15, 23, 42, 0.6)',
    borderRadius: '8px',
    marginBottom: '8px',
    fontSize: '14px',
    color: '#38bdf8',
    wordBreak: 'break-all',
  },
};

export default Calculator;