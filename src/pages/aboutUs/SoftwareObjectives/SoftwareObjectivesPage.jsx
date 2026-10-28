import React, {
  StrictMode,
  useRef,
  useState,
  useEffect,
  useCallback,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {
  BookOpen,
  X,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Bookmark,
  Search,
  ListFilter,
} from 'lucide-react';
import {
  INITIAL_CHALK_STATE,
  INITIAL_DUSTER_STATE,
  INITIAL_TEXT_LENGTHS,
  INITIAL_STROKES,
  LESSON_PAGES,
  BOOK_DATA,
  BASE_CANVAS_CONFIG,
  SOFTWARE_OBJECTIVES,
} from './SoftwareObjectivesPageData';
import NavPageHeader from '../../../components/NavPageHeader';

// Sound effects disabled per user specifications
const playChalkStroke = () => {};
const playChalkTap = () => {};
const playEraserWipe = () => {};
const playPageFlip = () => {};

/* ========================================================================= */
/* 1. TEXTBOOK LESSON POPUP MODAL COMPONENT (RESPONSIVE)                     */
/* ========================================================================= */
function BookDetailModal({ bookId, onClose }) {
  const [currentPage, setCurrentPage] = useState(0);

  if (!bookId || !BOOK_DATA[bookId]) return null;

  const data = BOOK_DATA[bookId];
  const page = data.pages[currentPage];

  const handleNextPage = () => {
    playPageFlip();
    setCurrentPage((prev) => (prev + 1) % data.pages.length);
  };

  const handlePrevPage = () => {
    playPageFlip();
    setCurrentPage((prev) => (prev - 1 + data.pages.length) % data.pages.length);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-slate-100">
        {/* Top Header */}
        <div
          className="px-5 py-3.5 sm:px-6 sm:py-4 flex items-center justify-between border-b border-slate-800 shrink-0 bg-slate-950/40"
          style={{ borderTop: `4px solid ${data.accentColor}` }}
        >
          <div className="flex items-center gap-3 min-w-0 pr-2">
            <div
              className="p-2 rounded-lg shrink-0"
              style={{ backgroundColor: `${data.accentColor}20` }}
            >
              <BookOpen className="w-5 h-5" style={{ color: data.accentColor }} />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] sm:text-xs uppercase tracking-wider text-slate-400 font-semibold font-sans truncate block">
                {data.subject}
              </span>
              <h3 className="text-sm sm:text-base font-bold text-white leading-tight font-sans truncate">
                {data.title}
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Book Content Body */}
        <div className="p-4 sm:p-6 space-y-3.5 font-sans flex-1 overflow-y-auto">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="flex items-center gap-1.5 font-medium">
              <Bookmark className="w-3.5 h-3.5 text-emerald-400" />
              Lesson Note #{currentPage + 1}
            </span>
            <span className="font-mono text-slate-500">
              Page {currentPage + 1} of {data.pages.length}
            </span>
          </div>

          <div className="bg-slate-950/60 p-3.5 sm:p-4 rounded-xl border border-slate-800/80">
            <h4 className="text-xs sm:text-sm font-semibold text-emerald-400 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{page.heading}</span>
            </h4>
            <p className="text-xs sm:text-sm leading-relaxed text-slate-300">
              {page.content}
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-5 py-3 sm:px-6 sm:py-3.5 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between font-sans shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white transition cursor-pointer"
          >
            Close
          </button>

          {data.pages.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevPage}
                className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition active:scale-95 shadow cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Prev</span>
              </button>
              <button
                type="button"
                onClick={handleNextPage}
                className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition active:scale-95 shadow cursor-pointer"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 2. OBJECTIVES SEARCH & DRAWER JUMPER MODAL (RESPONSIVE)                   */
/* ========================================================================= */
function ObjectivesDrawerModal({ isOpen, onClose, currentIndex, onSelectObjective }) {
  const [searchTerm, setSearchTerm] = useState('');

  if (!isOpen) return null;

  const filtered = SOFTWARE_OBJECTIVES.filter((obj) => {
    const q = searchTerm.toLowerCase();
    return (
      obj.title.toLowerCase().includes(q) ||
      obj.description.toLowerCase().includes(q) ||
      String(obj.id).includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
              <ListFilter className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Software Objectives</h3>
              <p className="text-xs text-slate-400">Select any of the 50 objectives to display on whiteboard</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input */}
        <div className="p-3 border-b border-slate-800/80 bg-slate-900">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 pointer-events-none" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by keyword (e.g., phishing, AI, women, scam, privacy)..."
              className="w-full bg-slate-950/80 border border-slate-700/70 rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              autoFocus
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 p-1 text-slate-400 hover:text-white cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* List of Objectives */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1.5 text-xs sm:text-sm">
          {filtered.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No objectives found matching "{searchTerm}"
            </div>
          ) : (
            filtered.map((obj) => {
              const isActive = currentIndex === obj.id - 1;
              return (
                <button
                  key={obj.id}
                  type="button"
                  onClick={() => {
                    onSelectObjective(obj.id - 1);
                    onClose();
                  }}
                  className={`w-full text-left p-2.5 sm:p-3 rounded-xl transition flex items-start gap-3 cursor-pointer ${
                    isActive
                      ? 'bg-blue-600/20 border border-blue-500/40 text-blue-200'
                      : 'bg-slate-950/40 hover:bg-slate-800/60 border border-transparent text-slate-300'
                  }`}
                >
                  <span
                    className={`inline-flex items-center justify-center font-mono font-bold text-xs px-2 py-1 rounded-md shrink-0 ${
                      isActive ? 'bg-blue-500 text-white' : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    #{obj.id}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-slate-200 leading-tight mb-1 truncate">
                      {obj.title}
                    </div>
                    <p className="text-[11px] text-slate-400 line-clamp-1 leading-normal">
                      {obj.description}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Showing {filtered.length} of {SOFTWARE_OBJECTIVES.length} objectives</span>
          <span className="text-[11px] text-slate-500 hidden sm:inline">Use Arrow keys (◀/▶) to flip pages</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 3. DESK BOOKS DRAWER MODAL (RESPONSIVE)                                   */
/* ========================================================================= */
function DeskBooksDrawerModal({ isOpen, onClose, onSelectBook }) {
  if (!isOpen) return null;

  const bookList = [
    { id: 'stand', ...BOOK_DATA.stand, location: 'Instructor Podium' },
    { id: 'desk1', ...BOOK_DATA.desk1, location: 'Front Left Desk' },
    { id: 'deskCenter', ...BOOK_DATA.deskCenter, location: 'Center Student Desk' },
    { id: 'deskRightCenter', ...BOOK_DATA.deskRightCenter, location: 'Right Center Desk' },
    { id: 'deskFarRight', ...BOOK_DATA.deskFarRight, location: 'Far Right Desk' },
    { id: 'lowBench', ...BOOK_DATA.lowBench, location: 'Bench Library Stack' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-xl max-h-[85vh] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl flex flex-col text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="px-5 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/60">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Classroom Desk Books</h3>
              <p className="text-xs text-slate-400">6 interactive volumes placed across classroom desks</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Books Grid */}
        <div className="flex-1 overflow-y-auto p-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
          {bookList.map((book) => (
            <button
              key={book.id}
              type="button"
              onClick={() => {
                onSelectBook(book.id);
                onClose();
              }}
              className="text-left p-3.5 rounded-xl bg-slate-950/50 hover:bg-slate-800/70 border border-slate-800 hover:border-slate-700 transition flex flex-col justify-between group cursor-pointer"
              style={{ borderLeft: `4px solid ${book.accentColor}` }}
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                  <span className="font-medium text-slate-400">{book.location}</span>
                  <span className="font-mono text-slate-500">{book.pages?.length || 0} pages</span>
                </div>
                <h4 className="font-bold text-slate-100 text-sm group-hover:text-emerald-300 transition leading-snug mb-1">
                  {book.title}
                </h4>
                <p className="text-xs text-slate-400 leading-normal">
                  {book.subject}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                <span>Read Notes</span>
                <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition" />
              </div>
            </button>
          ))}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-950/80 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
          <span>Click any book to read detailed curriculum pages</span>
        </div>
      </div>
    </div>
  );
}

/* ========================================================================= */
/* 4. CLASSROOM CANVAS VECTOR ARTWORK COMPONENT                              */
/* ========================================================================= */
export const ClassroomCanvas = forwardRef(function ClassroomCanvas({
  lightingMode = 'day',
  drawingEnabled = false,
  chalkColor = '#ffffff',
  chalkBrushSize = 4,
  onBookClick = null,
  customLines = [],
  onAddLine = null,
  isMobile = false,
  viewMode = 'board',
  requestedPageIndex = null,
  onPageIndexChange = null,
  onOpenObjectivesDrawer = null,
  onOpenBooksDrawer = null,
}, ref) {
  const svgRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState(null);

  // Multi-Page Lesson & Eraser State
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [dusterState, setDusterState] = useState(INITIAL_DUSTER_STATE);
  const [isErasing, setIsErasing] = useState(false);
  const isErasingRef = useRef(false);

  // Whiteboard Chalk Sequential Letter-by-Letter Writing Engine
  const cancelAnimRef = useRef(false);
  const timersRef = useRef([]);
  const [textLengths, setTextLengths] = useState(INITIAL_TEXT_LENGTHS);
  const [strokes, setStrokes] = useState(INITIAL_STROKES);
  const [chalkState, setChalkState] = useState(INITIAL_CHALK_STATE);
  const [isCompleted, setIsCompleted] = useState(false);

  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
  }, []);

  const sleep = useCallback((ms) => {
    return new Promise((resolve) => {
      const tid = setTimeout(resolve, ms);
      timersRef.current.push(tid);
    });
  }, []);

  // Types an individual text line character-by-character
  const typeLine = useCallback(async (key, startX, endX, y, color, speedMs = 22, pageObj = null) => {
    if (cancelAnimRef.current) return;
    const lesson = pageObj || LESSON_PAGES[currentPageIndex];
    const str = lesson[key];
    if (!str) return;
    const total = str.length;
    if (!total) return;

    // Glide chalk smoothly to start of line (pen-up repositioning)
    setChalkState((prev) => ({
      ...prev,
      x: startX,
      y: y,
      rot: -35,
      color: color,
      visible: true,
      isWriting: false,
      duration: 170,
      ease: 'ease-out',
    }));
    await sleep(180);
    if (cancelAnimRef.current) return;

    // Type character by character
    for (let i = 1; i <= total; i++) {
      if (cancelAnimRef.current) return;
      const progress = i / total;
      const charX = startX + progress * (endX - startX);
      const jitterY = (i % 3 === 0 ? -1.5 : (i % 3 === 1 ? 1.5 : 0));
      const jitterRot = -35 + (i % 2 === 0 ? 2 : -2);

      setTextLengths((prev) => ({ ...prev, [key]: i }));
      setChalkState({
        x: charX,
        y: y + jitterY,
        rot: jitterRot,
        color: color,
        visible: true,
        isWriting: true,
        duration: speedMs,
        ease: 'linear',
      });

      if (i % 3 === 0 || str[i - 1] === ' ' || i === total) {
        playChalkStroke();
      }

      await sleep(speedMs);
    }

    // Lift chalk slightly after finishing line
    setChalkState((prev) => ({ ...prev, isWriting: false }));
    await sleep(60);
  }, [sleep, currentPageIndex]);

  // Master handwriting orchestrator for a given page index
  const runFullSequenceForPage = useCallback(async (pageIdx) => {
    cancelAnimRef.current = false;
    clearAllTimers();
    const lesson = LESSON_PAGES[pageIdx];
    if (!lesson) return;

    // Initial pause while board is clean blank
    await sleep(220);
    if (cancelAnimRef.current) return;

    // 1. Header Title
    const titleWidth = Math.min(500, lesson.title.length * 11);
    await typeLine('title', 452, 452 + titleWidth, 126, '#0f172a', 15, lesson);
    if (cancelAnimRef.current) return;

    // 2. Underline swoosh right under heading
    setChalkState({ x: 452, y: 138, rot: -28, color: '#2563eb', visible: true, isWriting: false, duration: 140, ease: 'ease' });
    await sleep(150);
    if (cancelAnimRef.current) return;
    setStrokes((prev) => ({ ...prev, underline: true }));
    playChalkStroke();
    setChalkState({ x: 1014, y: 138, rot: -28, color: '#2563eb', visible: true, isWriting: true, duration: 280, ease: 'ease-out' });
    await sleep(300);
    if (cancelAnimRef.current) return;

    // 3. Smooth typing of the description text
    const descText = lesson.description || '';
    const totalChars = descText.length;
    const step = 2;
    for (let i = 1; i <= totalChars; i += step) {
      if (cancelAnimRef.current) return;
      setTextLengths((prev) => ({ ...prev, description: i }));

      // Move chalk across reading lines
      const lineIdx = Math.floor(i / 62);
      const charInLine = i % 62;
      const curX = 454 + (charInLine / 62) * 530;
      const curY = 166 + lineIdx * 28;

      setChalkState({
        x: curX,
        y: Math.min(curY, 410),
        rot: -35 + (i % 2 === 0 ? 2 : -2),
        color: '#1e293b',
        visible: true,
        isWriting: true,
        duration: 16,
        ease: 'linear',
      });

      if (i % 12 === 0 || descText[i - 1] === ' ') {
        playChalkStroke();
      }
      await sleep(14);
    }
    setTextLengths((prev) => ({ ...prev, description: totalChars }));

    // 4. Chalk smoothly returns to resting tray
    setChalkState({
      ...INITIAL_CHALK_STATE,
      duration: 350,
      ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
    });
    await sleep(350);
    setIsCompleted(true);
  }, [clearAllTimers, sleep, typeLine]);

  // Duster wiping animation across whiteboard
  const eraseBoardAndGoToPage = useCallback(async (targetIndex) => {
    if (isErasingRef.current) return;
    if (targetIndex < 0 || targetIndex >= LESSON_PAGES.length) return;
    isErasingRef.current = true;
    setIsErasing(true);
    cancelAnimRef.current = true;
    clearAllTimers();

    // 1. Chalk lifts from wherever it is and docks back into tray
    setChalkState({
      x: 472,
      y: 462,
      rot: 85,
      color: '#0f172a',
      visible: true,
      isWriting: false,
      duration: 200,
      ease: 'ease-out',
    });

    // 2. Duster lifts to wipe board
    setDusterState({
      x: 880,
      y: 320,
      rot: -12,
      visible: true,
      isErasing: true,
      duration: 200,
      ease: 'ease-out',
    });
    playEraserWipe();
    await sleep(200);

    // Sweep 1: Wipe description across to left
    setDusterState({
      x: 460,
      y: 280,
      rot: 10,
      visible: true,
      isErasing: true,
      duration: 200,
      ease: 'linear',
    });
    playEraserWipe();
    setTextLengths((prev) => ({ ...prev, description: 0 }));
    await sleep(200);

    // Sweep 2: Wipe title and underline across top
    setDusterState({
      x: 900,
      y: 135,
      rot: -10,
      visible: true,
      isErasing: true,
      duration: 200,
      ease: 'linear',
    });
    playEraserWipe();
    setStrokes({ underline: false });
    setTextLengths({ title: 0, description: 0 });
    await sleep(200);

    // Duster docks smoothly back into the tray
    setDusterState({
      ...INITIAL_DUSTER_STATE,
      duration: 250,
      ease: 'cubic-bezier(0.25, 1, 0.5, 1)',
    });
    await sleep(260);

    // Update active page
    setCurrentPageIndex(targetIndex);
    isErasingRef.current = false;
    setIsErasing(false);
    cancelAnimRef.current = false;
    setIsCompleted(false);

    // Start handwriting animation for the new page
    runFullSequenceForPage(targetIndex);
  }, [clearAllTimers, sleep, runFullSequenceForPage]);

  const startAnimation = useCallback(() => {
    eraseBoardAndGoToPage(currentPageIndex);
  }, [eraseBoardAndGoToPage, currentPageIndex]);

  const skipToEnd = useCallback(() => {
    cancelAnimRef.current = true;
    clearAllTimers();
    const lesson = LESSON_PAGES[currentPageIndex];
    if (lesson) {
      setTextLengths({
        title: lesson.title.length,
        description: lesson.description.length,
      });
    }
    setStrokes({
      underline: true,
    });
    setChalkState({
      ...INITIAL_CHALK_STATE,
      duration: 250,
    });
    setIsCompleted(true);
  }, [clearAllTimers, currentPageIndex]);

  useEffect(() => {
    runFullSequenceForPage(0);
    return () => {
      cancelAnimRef.current = true;
      clearAllTimers();
    };
  }, [runFullSequenceForPage, clearAllTimers]);

  // Arrow key navigation between objectives
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isErasing) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        if (currentPageIndex < LESSON_PAGES.length - 1) {
          playChalkTap();
          eraseBoardAndGoToPage(currentPageIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        if (currentPageIndex > 0) {
          playChalkTap();
          eraseBoardAndGoToPage(currentPageIndex - 1);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex, isErasing, eraseBoardAndGoToPage]);

  // Synchronize externally requested page index (e.g. from Objectives drawer)
  useEffect(() => {
    if (
      requestedPageIndex !== null &&
      requestedPageIndex !== undefined &&
      requestedPageIndex !== currentPageIndex
    ) {
      eraseBoardAndGoToPage(requestedPageIndex);
    }
  }, [requestedPageIndex, currentPageIndex, eraseBoardAndGoToPage]);

  // Notify parent component of current active objective index
  useEffect(() => {
    if (onPageIndexChange) {
      onPageIndexChange(currentPageIndex);
    }
  }, [currentPageIndex, onPageIndexChange]);

  // Expose methods to parent components via ref
  useImperativeHandle(
    ref,
    () => ({
      replay: () => {
        if (!isErasing) {
          playChalkTap();
          startAnimation();
        }
      },
      skip: () => {
        if (!isCompleted && !isErasing) {
          playChalkTap();
          skipToEnd();
        }
      },
      goToPage: (idx) => eraseBoardAndGoToPage(idx),
      isCompleted,
      isErasing,
      currentPageIndex,
    }),
    [isErasing, startAnimation, isCompleted, skipToEnd, eraseBoardAndGoToPage, currentPageIndex]
  );

  // Touch Swipe Gesture Detection for Mobile / Tablet
  const touchStartXRef = useRef(null);
  const touchStartYRef = useRef(null);

  const handleCanvasTouchStart = (e) => {
    handlePointerDown(e);
    if (e.touches && e.touches.length === 1) {
      touchStartXRef.current = e.touches[0].clientX;
      touchStartYRef.current = e.touches[0].clientY;
    }
  };

  const handleCanvasTouchEnd = (e) => {
    handlePointerUp();
    if (touchStartXRef.current !== null && e.changedTouches && e.changedTouches.length === 1) {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchEndX - touchStartXRef.current;
      const diffY = touchEndY - touchStartYRef.current;

      // Horizontal swipe threshold: > 40px and predominantly horizontal
      if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY) * 1.3) {
        if (diffX < 0) {
          // Swipe Left -> Next Objective
          if (currentPageIndex < LESSON_PAGES.length - 1 && !isErasing) {
            playChalkTap();
            eraseBoardAndGoToPage(currentPageIndex + 1);
          }
        } else {
          // Swipe Right -> Previous Objective
          if (currentPageIndex > 0 && !isErasing) {
            playChalkTap();
            eraseBoardAndGoToPage(currentPageIndex - 1);
          }
        }
      }
      touchStartXRef.current = null;
      touchStartYRef.current = null;
    }
  };

  // Window dimensions for responsive desktop viewBox calculation
  const [windowDimensions, setWindowDimensions] = useState(() => ({
    w: typeof window !== 'undefined' ? window.innerWidth : BASE_CANVAS_CONFIG.width,
    h: typeof window !== 'undefined' ? window.innerHeight : BASE_CANVAS_CONFIG.height,
  }));

  useEffect(() => {
    const handleWinResize = () => {
      setWindowDimensions({
        w: window.innerWidth,
        h: window.innerHeight,
      });
    };
    handleWinResize();
    window.addEventListener('resize', handleWinResize);
    window.addEventListener('orientationchange', handleWinResize);
    return () => {
      window.removeEventListener('resize', handleWinResize);
      window.removeEventListener('orientationchange', handleWinResize);
    };
  }, []);

  const BASE_W = BASE_CANVAS_CONFIG.width;
  const BASE_H = BASE_CANVAS_CONFIG.height;
  const BASE_ASPECT = BASE_W / BASE_H;
  const currentAspect = windowDimensions.w / Math.max(windowDimensions.h, 1);

  let roomX = 0;
  let roomY = 0;
  let roomW = BASE_W;
  let roomH = BASE_H;

  if (currentAspect > BASE_ASPECT) {
    roomW = BASE_H * currentAspect;
    roomX = (BASE_W - roomW) / 2;
    roomH = BASE_H;
    roomY = 0;
  } else {
    roomH = BASE_W / currentAspect;
    roomY = BASE_H - roomH;
    roomW = BASE_W;
    roomX = 0;
  }

  const ROOM_VB = { x: roomX, y: roomY, w: roomW, h: roomH };
  const BOARD_VB = BASE_CANVAS_CONFIG.boardViewBox;

  // Responsive ViewBox Selection
  const isBoardView = viewMode === 'board' || (isMobile && viewMode !== 'room');
  const activeVB = isBoardView ? BOARD_VB : ROOM_VB;
  const activeViewBoxStr = `${activeVB.x} ${activeVB.y} ${activeVB.w} ${activeVB.h}`;

  // Dynamic pointer coordinates
  const getCoordinates = (e) => {
    if (!svgRef.current) return null;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = activeVB.w / rect.width;
    const scaleY = activeVB.h / rect.height;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);
    return {
      x: activeVB.x + (clientX - rect.left) * scaleX,
      y: activeVB.y + (clientY - rect.top) * scaleY,
    };
  };

  const handlePointerDown = (e) => {
    if (!drawingEnabled) return;
    const coords = getCoordinates(e);
    if (!coords) return;
    setIsDrawing(true);
    setCurrentPath({
      color: chalkColor,
      size: chalkBrushSize,
      points: [coords],
    });
  };

  const handlePointerMove = (e) => {
    if (!isDrawing || !currentPath) return;
    const coords = getCoordinates(e);
    if (!coords) return;
    setCurrentPath((prev) => ({
      ...prev,
      points: [...prev.points, coords],
    }));
  };

  const handlePointerUp = () => {
    if (isDrawing && currentPath && currentPath.points.length > 1) {
      if (onAddLine) onAddLine(currentPath);
    }
    setIsDrawing(false);
    setCurrentPath(null);
  };

  const pointsToSvgPath = (points) => {
    if (!points || points.length === 0) return '';
    if (points.length === 1) return `M ${points[0].x} ${points[0].y} L ${points[0].x + 0.1} ${points[0].y + 0.1}`;
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      d += ` L ${points[i].x} ${points[i].y}`;
    }
    return d;
  };

  const getLightingFilter = () => {
    switch (lightingMode) {
      case 'sunset':
        return 'sepia(0.2) saturate(1.2) hue-rotate(-10deg) brightness(0.96)';
      case 'night':
        return 'brightness(0.7) contrast(1.15) hue-rotate(210deg) saturate(0.85)';
      default:
        return 'none';
    }
  };

  const currentLesson = LESSON_PAGES[currentPageIndex] || LESSON_PAGES[0];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden bg-transparent select-none">
      {/* Embedded CSS Animations & Button Micro-Interactions */}
      <style>{`
        @keyframes chalkWritingJitter {
          0% { transform: translate(0px, 0px) rotate(0deg); }
          25% { transform: translate(1px, -1.2px) rotate(2deg); }
          50% { transform: translate(-0.8px, 1px) rotate(-1.5deg); }
          75% { transform: translate(1.2px, -0.6px) rotate(1deg); }
          100% { transform: translate(0px, 0px) rotate(0deg); }
        }
        .chalk-writing-active {
          animation: chalkWritingJitter 0.18s ease-in-out infinite;
          transform-origin: 0px 0px;
        }
        .tray-btn {
          cursor: pointer;
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.18s ease;
        }
        .tray-btn:hover {
          transform: translateY(-1.5px);
        }
        .tray-btn:hover rect {
          filter: brightness(1.22) drop-shadow(0 2px 8px rgba(45, 212, 191, 0.4));
        }
        .tray-btn:active {
          transform: translateY(0.5px);
        }
        .tray-btn-replay:hover rect {
          filter: brightness(1.25) drop-shadow(0 2px 8px rgba(16, 185, 129, 0.45));
        }
        .tray-btn-skip:hover rect {
          filter: brightness(1.25) drop-shadow(0 2px 8px rgba(245, 158, 11, 0.45));
        }
        .tray-btn-disabled {
          opacity: 0.35;
          cursor: not-allowed;
          pointer-events: none;
        }
        .objective-scroll {
          scrollbar-width: thin;
          scrollbar-color: #94a3b8 transparent;
        }
        .objective-scroll::-webkit-scrollbar {
          width: 6px;
        }
        .objective-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .objective-scroll::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .objective-scroll::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <svg
        ref={svgRef}
        viewBox={activeViewBoxStr}
        className={`w-full h-full select-none transition-all duration-700 ${
          isMobile ? 'filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.18)]' : ''
        }`}
        style={{ filter: getLightingFilter() }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onTouchStart={handleCanvasTouchStart}
        onTouchMove={handlePointerMove}
        onTouchEnd={handleCanvasTouchEnd}
      >
        <defs>
          <linearGradient id="woodDeskGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#d48a43" />
            <stop offset="100%" stopColor="#ba7234" />
          </linearGradient>
          <linearGradient id="woodApronGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#874218" />
            <stop offset="100%" stopColor="#6e3512" />
          </linearGradient>
          <linearGradient id="boardFrameGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8c441b" />
            <stop offset="100%" stopColor="#753815" />
          </linearGradient>
          <linearGradient id="chalkStickGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#d1d5db" />
            <stop offset="30%" stopColor="#ffffff" />
            <stop offset="75%" stopColor="#f3f4f6" />
            <stop offset="100%" stopColor="#9ca3af" />
          </linearGradient>
        </defs>

        {/* 1. ROOM BACKGROUND: WALL & FLOOR */}
        <rect
          x={Math.min(roomX - 300, -300)}
          y={Math.min(roomY - 300, -300)}
          width={Math.max(roomW + 600, BASE_W + 600)}
          height={682 - Math.min(roomY - 300, -300)}
          fill="#687588"
        />
        <rect
          x={Math.min(roomX - 300, -300)}
          y="682"
          width={Math.max(roomW + 600, BASE_W + 600)}
          height={Math.max(roomH - 682 + 300, 300)}
          fill="#24202d"
        />
        <line
          x1={Math.min(roomX - 300, -300)}
          y1="682"
          x2={Math.max(roomX + roomW + 300, BASE_W + 300)}
          y2="682"
          stroke="#1d1a24"
          strokeWidth="2"
        />

        {/* 2. TOP CENTER SPEAKER / PLAQUE */}
        <g id="topCenterBox">
          <rect x="668" y="0" width="142" height="48" fill="url(#boardFrameGrad)" stroke="#5c2c0f" strokeWidth="3" />
          <rect x="680" y="0" width="118" height="36" fill="#0f3b30" />
        </g>

        {/* 3. LEFT BLACKBOARD */}
        <g id="leftBlackboard">
          <rect x="20" y="72" width="362" height="480" fill="url(#boardFrameGrad)" stroke="#5e2d11" strokeWidth="3" />
          <rect x="38" y="90" width="326" height="444" fill="#0f3d30" />
          <circle cx="30" cy="82" r="4" fill="#f8fafc" />
          <circle cx="372" cy="82" r="4" fill="#f8fafc" />
          <circle cx="30" cy="542" r="4" fill="#f8fafc" />
          <circle cx="372" cy="542" r="4" fill="#f8fafc" />

          {/* Clean Cyber Threat Awareness Blackboard Notes */}
          <g id="leftBoardCyberNotes">
            <text x="201" y="132" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="15" fontWeight="800" fill="#99f6e4" letterSpacing="0.8px">
              CORE PRINCIPLES
            </text>
            <line x1="72" y1="144" x2="330" y2="144" stroke="#2dd4bf" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
            <g fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="16" fill="#f1f5f9">
              <text x="64" y="185">• Verification Before Action</text>
              <text x="64" y="225">• Strong Password &amp; 2FA</text>
              <text x="64" y="265">• Strict Data Privacy</text>
              <text x="64" y="305">• Recognize Impersonation</text>
              <text x="64" y="345">• Prompt Incident Reporting</text>
            </g>
            <rect x="64" y="380" width="274" height="40" rx="8" fill="#042118" stroke="#134e3f" strokeWidth="1" />
            <text x="201" y="405" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="700" fill="#2dd4bf" letterSpacing="0.5px">
              CR CYBER THREAT INTEL
            </text>
          </g>
        </g>

        {/* 4. CENTER WHITEBOARD */}
        <g id="centerWhiteboard">
          <rect x="410" y="84" width="646" height="416" rx="8" fill="url(#boardFrameGrad)" stroke="#5e2d11" strokeWidth="3" />
          <rect x="430" y="98" width="606" height="336" fill="#ffffff" />

          {/* Clean Handwritten Objective Content: Heading, Underline, Description */}
          <g id="whiteboardContent" className="select-none cursor-pointer" onClick={() => !isCompleted && skipToEnd()}>
            {/* 1. Objective Heading */}
            {textLengths.title > 0 && (
              <text
                x="452"
                y="126"
                fontFamily="'Patrick Hand', cursive, sans-serif"
                fontSize="21"
                fontWeight="700"
                fill="#0f172a"
                letterSpacing="0.2px"
              >
                {currentLesson.title.slice(0, textLengths.title)}
              </text>
            )}

            {/* Top-Right Objective Counter Badge */}
            {textLengths.title > 0 && (
              <text
                x="1014"
                y="124"
                textAnchor="end"
                fontFamily="'Inter', sans-serif"
                fontSize="12"
                fontWeight="700"
                fill="#2563eb"
              >
                {`Objective ${currentPageIndex + 1} of ${LESSON_PAGES.length}`}
              </text>
            )}

            {/* 2. Line below Heading */}
            <line
              x1="452"
              y1="138"
              x2="1014"
              y2="138"
              stroke="#2563eb"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeDasharray="562"
              strokeDashoffset={strokes.underline ? 0 : 562}
              style={{ transition: strokes.underline ? 'stroke-dashoffset 280ms ease-out' : 'none' }}
            />

            {/* 3. Objective Description Content */}
            <foreignObject x="452" y="152" width="562" height="270">
              <div
                xmlns="http://www.w3.org/1999/xhtml"
                className="objective-scroll"
                style={{
                  width: '100%',
                  height: '100%',
                  overflowY: 'auto',
                  fontFamily: "'Patrick Hand', cursive, sans-serif",
                  fontSize: '18px',
                  lineHeight: '1.65',
                  color: '#1e293b',
                  userSelect: 'none',
                  paddingRight: '6px',
                  boxSizing: 'border-box',
                  WebkitOverflowScrolling: 'touch',
                }}
              >
                <p style={{ margin: 0, paddingBottom: '8px' }}>
                  {currentLesson.description?.slice(0, textLengths.description)}
                  {textLengths.description > 0 && textLengths.description < (currentLesson.description?.length || 0) && (
                    <span style={{ color: '#2563eb', fontWeight: 'bold' }}>|</span>
                  )}
                </p>
              </div>
            </foreignObject>
          </g>

          {/* Mounting Clips */}
          <rect x="425" y="92" width="10" height="28" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="1031" y="92" width="10" height="28" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="430" y="434" width="606" height="6" fill="#753815" />
          <rect x="430" y="440" width="606" height="42" fill="#0f3d30" />

          {/* Left Chalk Groove & Resting Colorful Chalks */}
          <g id="trayChalkGroove">
            <rect x="442" y="448" width="58" height="26" rx="4" fill="#09261e" stroke="#124838" strokeWidth="0.8" />
            <rect x="446" y="452" width="22" height="7" rx="2" fill="#fef08a" stroke="#ca8a04" strokeWidth="0.6" opacity="0.85" />
            <rect x="446" y="463" width="20" height="7" rx="2" fill="#bae6fd" stroke="#0284c7" strokeWidth="0.6" opacity="0.85" />
            <rect x="473" y="452" width="22" height="7" rx="2" fill="#fbcfe8" stroke="#db2777" strokeWidth="0.6" opacity="0.85" />
          </g>

          {/* INTERACTIVE WHITEBOARD CONTROLS IN BOTTOM TRAY */}
          <g id="whiteboardTrayControls" className="select-none">
            <rect x="508" y="446" width="426" height="30" rx="15" fill="#06221a" stroke="#134e3f" strokeWidth="1.2" />
            <line x1="528" y1="447" x2="914" y2="447" stroke="#2dd4bf" strokeWidth="0.8" opacity="0.35" />

            {/* 1. PREV PAGE BUTTON */}
            <g
              onClick={(e) => {
                e.stopPropagation();
                if (currentPageIndex > 0 && !isErasing) {
                  playChalkTap();
                  eraseBoardAndGoToPage(currentPageIndex - 1);
                }
              }}
              className={currentPageIndex > 0 && !isErasing ? "tray-btn group" : "tray-btn-disabled"}
            >
              <title>Previous Lesson Page</title>
              <rect x="516" y="449" width="68" height="24" rx="12" fill={currentPageIndex > 0 ? "#0f3e30" : "#081d16"} stroke={currentPageIndex > 0 ? "#2dd4bf" : "#174235"} strokeWidth="1.2" />
              <text x="550" y="465" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="700" fill={currentPageIndex > 0 ? "#e6fffa" : "#3b6959"}>
                ◀ Prev
              </text>
            </g>

            {/* 2. LIVE OBJECTIVE BADGE & PROGRESS BAR */}
            <g
              className="tray-btn cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenObjectivesDrawer) onOpenObjectivesDrawer();
              }}
            >
              <title>Click to browse all 50 Software Objectives</title>
              <rect x="592" y="449" width="98" height="24" rx="12" fill="#041812" stroke="#165141" strokeWidth="1" />
              <text x="641" y="460" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="9" fontWeight="800" letterSpacing="0.6px" fill="#99f6e4">
                OBJ {currentPageIndex + 1} / {LESSON_PAGES.length}
              </text>
              <rect x="606" y="464" width="70" height="3" rx="1.5" fill="#134e3f" />
              <rect
                x="606"
                y="464"
                width={Math.max(4, Math.round(70 * ((currentPageIndex + 1) / LESSON_PAGES.length)))}
                height="3"
                rx="1.5"
                fill="#2dd4bf"
              />
            </g>

            {/* 3. NEXT PAGE BUTTON */}
            <g
              onClick={(e) => {
                e.stopPropagation();
                if (currentPageIndex < LESSON_PAGES.length - 1 && !isErasing) {
                  playChalkTap();
                  eraseBoardAndGoToPage(currentPageIndex + 1);
                }
              }}
              className={currentPageIndex < LESSON_PAGES.length - 1 && !isErasing ? "tray-btn group" : "tray-btn-disabled"}
            >
              <title>Next Lesson Page</title>
              <rect x="698" y="449" width="68" height="24" rx="12" fill={currentPageIndex < LESSON_PAGES.length - 1 ? "#0f3e30" : "#081d16"} stroke={currentPageIndex < LESSON_PAGES.length - 1 ? "#2dd4bf" : "#174235"} strokeWidth="1.2" />
              <text x="732" y="465" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="700" fill={currentPageIndex < LESSON_PAGES.length - 1 ? "#e6fffa" : "#3b6959"}>
                Next ▶
              </text>
            </g>

            {/* 4. REPLAY BUTTON */}
            <g
              onClick={(e) => {
                e.stopPropagation();
                if (!isErasing) {
                  playChalkTap();
                  startAnimation();
                }
              }}
              className={!isErasing ? "tray-btn tray-btn-replay group" : "tray-btn-disabled"}
            >
              <title>Erase & Replay Handwriting Animation</title>
              <rect x="774" y="449" width="76" height="24" rx="12" fill="#064e3b" stroke="#10b981" strokeWidth="1.2" />
              <text x="812" y="465" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="700" fill="#a7f3d0">
                ↺ Replay
              </text>
            </g>

            {/* 5. SKIP BUTTON */}
            <g
              onClick={(e) => {
                e.stopPropagation();
                if (!isCompleted && !isErasing) {
                  playChalkTap();
                  skipToEnd();
                }
              }}
              className={!isCompleted && !isErasing ? "tray-btn tray-btn-skip group" : "opacity-60"}
            >
              <title>{!isCompleted ? "Fast-forward writing" : "Writing complete"}</title>
              <rect x="858" y="449" width="68" height="24" rx="12" fill={!isCompleted ? "#78350f" : "#064e3b"} stroke={!isCompleted ? "#f59e0b" : "#059669"} strokeWidth="1.2" />
              <text x="892" y="465" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="11" fontWeight="700" fill={!isCompleted ? "#fef3c7" : "#6ee7b7"}>
                {!isCompleted ? "⚡ Skip" : "✓ Done"}
              </text>
            </g>

            {/* Generous touch-target hitboxes for mobile and tablet fingers */}
            <rect
              x="510"
              y="442"
              width="80"
              height="38"
              fill="transparent"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (currentPageIndex > 0 && !isErasing) {
                  playChalkTap();
                  eraseBoardAndGoToPage(currentPageIndex - 1);
                }
              }}
            />
            <rect
              x="590"
              y="442"
              width="102"
              height="38"
              fill="transparent"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenObjectivesDrawer) onOpenObjectivesDrawer();
              }}
            />
            <rect
              x="692"
              y="442"
              width="80"
              height="38"
              fill="transparent"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (currentPageIndex < LESSON_PAGES.length - 1 && !isErasing) {
                  playChalkTap();
                  eraseBoardAndGoToPage(currentPageIndex + 1);
                }
              }}
            />
            <rect
              x="772"
              y="442"
              width="82"
              height="38"
              fill="transparent"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!isErasing) {
                  playChalkTap();
                  startAnimation();
                }
              }}
            />
            <rect
              x="854"
              y="442"
              width="76"
              height="38"
              fill="transparent"
              className="cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                if (!isCompleted && !isErasing) {
                  playChalkTap();
                  skipToEnd();
                }
              }}
            />
          </g>

          {/* Bottom Wooden Tray Ledge */}
          <rect x="410" y="482" width="646" height="18" fill="url(#boardFrameGrad)" stroke="#5e2d11" strokeWidth="2" />
          <rect x="424" y="436" width="12" height="48" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />
          <rect x="1030" y="436" width="12" height="48" rx="2" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1" />

          {/* Felt Chalkboard Eraser (Duster) */}
          <g
            id="trayEraser"
            transform={`translate(${dusterState.x}, ${dusterState.y})`}
            style={{
              transition: `transform ${dusterState.duration || 300}ms ${dusterState.ease || 'ease'}`,
              pointerEvents: 'none',
            }}
          >
            <rect x="2" y="3" width="62" height="23" rx="3" fill="#0f172a" opacity={dusterState.isErasing ? 0.35 : 0.22} />
            <g transform={`rotate(${dusterState.rot})`}>
              <rect x="0" y="0" width="62" height="17" rx="3" fill="#8c441b" stroke="#5e2d11" strokeWidth="1" />
              <line x1="6" y1="8" x2="56" y2="8" stroke="#a35422" strokeWidth="1" opacity="0.6" />
              <rect x="0" y="15" width="62" height="7" rx="1.5" fill="#1e293b" />
              <line x1="2" y1="18" x2="60" y2="18" stroke="#334155" strokeWidth="0.8" />
            </g>
            {dusterState.isErasing && (
              <g id="dusterChalkPuff">
                <circle cx="-6" cy="12" r="3.2" fill="#e2e8f0" opacity="0.8" />
                <circle cx="16" cy="24" r="2.6" fill="#cbd5e1" opacity="0.75" />
                <circle cx="48" cy="22" r="2.8" fill="#f8fafc" opacity="0.7" />
                <circle cx="68" cy="14" r="2.2" fill="#cbd5e1" opacity="0.65" />
              </g>
            )}
          </g>

          {/* Animated Floating Chalk Stick */}
          <g
            id="animatedChalkStick"
            transform={`translate(${chalkState.x}, ${chalkState.y})`}
            style={{
              transition: `transform ${chalkState.duration || 300}ms ${chalkState.ease || 'linear'}`,
              opacity: chalkState.visible ? 1 : 0,
              pointerEvents: 'none',
            }}
          >
            <ellipse cx="1" cy="2" rx={chalkState.isWriting ? 6 : 9} ry={chalkState.isWriting ? 2.5 : 4} fill="#0f172a" opacity={chalkState.isWriting ? 0.35 : 0.22} />
            <g transform={`rotate(${chalkState.rot})`}>
              <g className={chalkState.isWriting ? 'chalk-writing-active' : ''}>
                <rect x="-5" y="-48" width="10" height="40" rx="2.5" fill="url(#chalkStickGrad)" stroke="#cbd5e1" strokeWidth="0.8" />
                <line x1="-2.5" y1="-46" x2="-2.5" y2="-10" stroke="#ffffff" strokeWidth="1" opacity="0.85" />
                <rect x="-5" y="-32" width="10" height="10" fill={chalkState.color || '#3b82f6'} opacity="0.4" />
                <polygon points="-5,-8 0,0 5,-8" fill={chalkState.color || '#ffffff'} stroke="#94a3b8" strokeWidth="0.6" />
              </g>
            </g>
            {chalkState.isWriting && (
              <g id="chalkWritingEffects">
                <circle cx="0" cy="0" r="2.2" fill={chalkState.color || '#2563eb'} opacity="0.85" />
                <circle cx="-2" cy="-1.5" r="1.2" fill="#94a3b8" opacity="0.65" />
                <circle cx="2" cy="-2" r="1" fill="#cbd5e1" opacity="0.6" />
              </g>
            )}
          </g>
        </g>

        {/* 5. RIGHT BLACKBOARD */}
        <g id="rightBlackboard">
          <rect x="1084" y="72" width="340" height="480" fill="url(#boardFrameGrad)" stroke="#5e2d11" strokeWidth="3" />
          <rect x="1102" y="90" width="304" height="444" fill="#0f3d30" />
          <circle cx="1094" cy="82" r="4" fill="#f8fafc" />
          <circle cx="1414" cy="82" r="4" fill="#f8fafc" />
          <circle cx="1094" cy="542" r="4" fill="#f8fafc" />
          <circle cx="1414" cy="542" r="4" fill="#f8fafc" />

          {/* Clean Cyber Threat Awareness Blackboard Notes */}
          <g id="rightBoardCyberNotes">
            <text x="1254" y="132" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="15" fontWeight="800" fill="#fde047" letterSpacing="0.8px">
              SAFETY GUIDELINES
            </text>
            <line x1="1126" y1="144" x2="1382" y2="144" stroke="#eab308" strokeWidth="2" strokeLinecap="round" opacity="0.85" />
            <g fontFamily="'Patrick Hand', cursive, sans-serif" fontSize="16" fill="#f8fafc">
              <text x="1122" y="185">• Women &amp; Girls Safety Focus</text>
              <text x="1122" y="225">• Deceptive Offer Warning</text>
              <text x="1122" y="265">• Fact-Check Before Sharing</text>
              <text x="1122" y="305">• Evidence-Based Claims</text>
              <text x="1122" y="345">• Multi-Language Readiness</text>
            </g>
            <rect x="1126" y="380" width="256" height="40" rx="8" fill="#1e1804" stroke="#713f12" strokeWidth="1" />
            <text x="1254" y="405" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="12" fontWeight="700" fill="#fde047" letterSpacing="0.5px">
              50 SOFTWARE OBJECTIVES
            </text>
          </g>
        </g>

        {/* User Drawing Layer */}
        <g id="customChalkDrawings">
          {customLines.map((line, idx) => (
            <path
              key={`line-${idx}`}
              d={pointsToSvgPath(line.points)}
              fill="none"
              stroke={line.color}
              strokeWidth={line.size}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {isDrawing && currentPath && (
            <path
              d={pointsToSvgPath(currentPath.points)}
              fill="none"
              stroke={currentPath.color}
              strokeWidth={currentPath.size}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          )}
        </g>

        {/* 6. CLASSROOM FURNITURE: DESKS, CHAIRS & BOOKS */}
        {/* High Stand / Teacher Podium */}
        <g
          id="highTable"
          className="cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
          onClick={() => onBookClick && onBookClick('stand')}
        >
          <line x1="428" y1="580" x2="428" y2="706" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <line x1="550" y1="580" x2="550" y2="706" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
          <line x1="428" y1="615" x2="550" y2="615" stroke="#ffffff" strokeWidth="5" />
          <polygon points="398,580 430,626 550,626 572,580" fill="#874218" />
          <rect x="380" y="554" width="192" height="26" fill="url(#woodDeskGrad)" stroke="#874218" strokeWidth="2" />
          {/* Books */}
          <rect x="434" y="546" width="102" height="9" fill="#15803d" />
          <rect x="438" y="540" width="98" height="6" fill="#f8fafc" />
          <rect x="432" y="530" width="104" height="10" fill="#0f766e" />
          <rect x="438" y="522" width="96" height="8" fill="#eab308" />
          <rect x="442" y="516" width="92" height="6" fill="#22c55e" />
        </g>

        {/* Desk 1 (Far Left) & Chair 1 */}
        <g id="desk1Group">
          <line x1="42" y1="632" x2="42" y2="818" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="84" y1="632" x2="84" y2="818" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="210" y1="632" x2="210" y2="818" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="256" y1="632" x2="256" y2="818" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <rect x="32" y="626" width="248" height="28" fill="url(#woodApronGrad)" />
          <rect x="20" y="604" width="276" height="24" fill="url(#woodDeskGrad)" stroke="#874218" strokeWidth="2" />
          <g className="cursor-pointer" onClick={() => onBookClick && onBookClick('desk1')}>
            <rect x="68" y="594" width="86" height="10" fill="#0d9488" />
            <rect x="80" y="591" width="70" height="4" fill="#f8fafc" />
            <rect x="172" y="592" width="94" height="12" fill="#0f766e" />
            <rect x="176" y="586" width="88" height="6" fill="#f8fafc" />
            <rect x="172" y="576" width="94" height="11" fill="#14b8a6" />
            <rect x="176" y="571" width="88" height="5" fill="#f8fafc" />
            <rect x="174" y="563" width="90" height="9" fill="#0d9488" />
          </g>
          {/* Chair 1 */}
          <g id="chair1">
            <line x1="106" y1="742" x2="82" y2="818" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="132" y1="742" x2="118" y2="818" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="172" y1="742" x2="186" y2="818" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="198" y1="742" x2="222" y2="818" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="94" y="730" width="120" height="15" fill="#874218" />
            <rect x="92" y="718" width="124" height="16" rx="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="130" y1="696" x2="130" y2="724" stroke="#ffffff" strokeWidth="5" />
            <line x1="174" y1="696" x2="174" y2="724" stroke="#ffffff" strokeWidth="5" />
            <rect x="100" y="658" width="114" height="70" rx="28" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          </g>
        </g>

        {/* Center Desk & Chair 2 */}
        <g id="centerDeskGroup">
          <line x1="640" y1="620" x2="640" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="710" y1="620" x2="710" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="860" y1="620" x2="860" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="918" y1="620" x2="918" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <rect x="626" y="608" width="310" height="34" fill="url(#woodApronGrad)" />
          <rect x="610" y="584" width="342" height="26" fill="url(#woodDeskGrad)" stroke="#874218" strokeWidth="2" />
          <g className="cursor-pointer" onClick={() => onBookClick && onBookClick('deskCenter')}>
            <rect x="640" y="574" width="94" height="11" fill="#15803d" />
            <rect x="644" y="570" width="88" height="5" fill="#f8fafc" />
            <rect x="638" y="560" width="98" height="11" fill="#ee5545" />
            <rect x="774" y="574" width="124" height="11" fill="#0d9488" />
            <rect x="778" y="570" width="118" height="5" fill="#f8fafc" />
            <rect x="774" y="558" width="102" height="13" fill="#eab308" />
            <rect x="874" y="548" width="68" height="24" fill="#14b8a6" />
            <rect x="876" y="544" width="62" height="5" fill="#f8fafc" />
          </g>
          {/* Chair 2 */}
          <g id="chair2">
            <line x1="648" y1="732" x2="630" y2="814" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="672" y1="732" x2="662" y2="814" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="708" y1="732" x2="718" y2="814" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="730" y1="732" x2="752" y2="814" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="638" y="730" width="86" height="14" fill="#874218" />
            <rect x="634" y="718" width="94" height="16" rx="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="666" y1="690" x2="666" y2="724" stroke="#ffffff" strokeWidth="5" />
            <line x1="702" y1="690" x2="702" y2="724" stroke="#ffffff" strokeWidth="5" />
            <rect x="640" y="642" width="82" height="76" rx="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          </g>
        </g>

        {/* Desk 5 (Right of Center) & Chair 3 */}
        <g id="desk5Group">
          <line x1="970" y1="626" x2="970" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="1004" y1="626" x2="1004" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="1130" y1="626" x2="1130" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="1166" y1="626" x2="1166" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <rect x="960" y="612" width="216" height="34" fill="url(#woodApronGrad)" />
          <rect x="946" y="588" width="244" height="26" fill="url(#woodDeskGrad)" stroke="#874218" strokeWidth="2" />
          <g className="cursor-pointer" onClick={() => onBookClick && onBookClick('deskRightCenter')}>
            <rect x="982" y="578" width="98" height="11" fill="#0f766e" />
            <rect x="986" y="574" width="92" height="5" fill="#f8fafc" />
            <rect x="984" y="562" width="96" height="13" fill="#0d9488" />
            <rect x="988" y="557" width="88" height="6" fill="#f8fafc" />
            <rect x="984" y="548" width="96" height="10" fill="#14b8a6" />
          </g>
          {/* Chair 3 */}
          <g id="chair3">
            <line x1="1010" y1="732" x2="990" y2="814" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="1034" y1="732" x2="1024" y2="814" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="1074" y1="732" x2="1084" y2="814" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <line x1="1096" y1="732" x2="1118" y2="814" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" />
            <rect x="996" y="730" width="108" height="14" fill="#874218" />
            <rect x="992" y="718" width="116" height="16" rx="7" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <line x1="1030" y1="690" x2="1030" y2="724" stroke="#ffffff" strokeWidth="5" />
            <line x1="1070" y1="690" x2="1070" y2="724" stroke="#ffffff" strokeWidth="5" />
            <rect x="1000" y="642" width="100" height="76" rx="26" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
          </g>
        </g>

        {/* Desk 6 (Far Right Desk) */}
        <g id="desk6Group">
          <line x1="1200" y1="630" x2="1200" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="1234" y1="630" x2="1234" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="1356" y1="630" x2="1356" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <line x1="1394" y1="630" x2="1394" y2="816" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />
          <polygon points="1178,616 1410,616 1390,652 1198,652" fill="url(#woodApronGrad)" />
          <rect x="1162" y="592" width="258" height="26" fill="url(#woodDeskGrad)" stroke="#874218" strokeWidth="2" />
          <g className="cursor-pointer" onClick={() => onBookClick && onBookClick('deskFarRight')}>
            <g transform="rotate(-12, 1260, 580)">
              <polygon points="1242,576 1308,564 1308,588 1242,596" fill="#0d9488" />
              <polygon points="1246,578 1304,567 1304,584 1246,593" fill="#f8fafc" />
            </g>
            <rect x="1284" y="580" width="88" height="13" fill="#ee5545" />
            <rect x="1288" y="574" width="82" height="7" fill="#f8fafc" />
          </g>
        </g>

        {/* Low Bench with Stack of Books in Foreground */}
        <g
          id="lowBenchBookStack"
          className="cursor-pointer transition-transform duration-200 hover:scale-[1.01]"
          onClick={() => onBookClick && onBookClick('lowBench')}
        >
          <rect x="306" y="774" width="236" height="24" fill="#874218" />
          <rect x="338" y="798" width="32" height="24" fill="#6e3512" />
          <rect x="488" y="798" width="32" height="24" fill="#6e3512" />
          <rect x="330" y="748" width="192" height="26" fill="#16a34a" />
          <rect x="334" y="742" width="186" height="7" fill="#f8fafc" />
          <rect x="312" y="718" width="208" height="26" fill="#ee5545" />
          <rect x="338" y="712" width="180" height="7" fill="#f8fafc" />
          <rect x="362" y="692" width="176" height="22" fill="#f5c542" />
          <rect x="328" y="668" width="128" height="25" fill="#0d9488" />
          <rect x="330" y="663" width="122" height="6" fill="#f8fafc" />
        </g>
      </svg>
    </div>
  );
});

/* ========================================================================= */
/* 5. MAIN RESPONSIVE CLASSROOM APP COMPONENT                                */
/* ========================================================================= */
export default function SoftwareObjectivesPage() {
  const canvasRef = useRef(null);

  // Responsive device state
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // Lesson & View State
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [requestedPageIndex, setRequestedPageIndex] = useState(null);

  // Modals state
  const [activeBook, setActiveBook] = useState(null);
  const [isObjectivesOpen, setIsObjectivesOpen] = useState(false);
  const [isBooksOpen, setIsBooksOpen] = useState(false);

  // Responsive resize & orientation listener
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target && (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA')) {
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        e.preventDefault();
        if (currentPageIndex < LESSON_PAGES.length - 1) {
          setRequestedPageIndex(currentPageIndex + 1);
        }
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        if (currentPageIndex > 0) {
          setRequestedPageIndex(currentPageIndex - 1);
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        if (canvasRef.current) canvasRef.current.skip();
      } else if (e.key.toLowerCase() === 'r') {
        e.preventDefault();
        if (canvasRef.current) canvasRef.current.replay();
      } else if (e.key.toLowerCase() === 'o') {
        e.preventDefault();
        setIsObjectivesOpen((prev) => !prev);
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        setIsBooksOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPageIndex]);

  // Navigation Handlers
  const handleSelectObjective = (index) => {
    setRequestedPageIndex(index);
    setIsObjectivesOpen(false);
  };

  return (
    <div
      className={`w-full min-h-[calc(100vh-80px)] software-objectives-environment flex flex-col items-center justify-start select-none font-sans py-2 sm:py-4 px-2 sm:px-4`}
    >
      <style>{`
        .software-objectives-environment {
          background: transparent !important;
        }
        .watermark-bg:has(.software-objectives-environment) {
          background-color: #f8fafc !important;
        }
        .watermark-bg:has(.software-objectives-environment)::before {
          opacity: 0.18 !important;
          display: block !important;
        }
      `}</style>

      {/* NavPageHeader with unified design */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20 mb-2 sm:mb-4">
        <NavPageHeader
          title="Software Objectives"
          description="Explore our 50 core objectives for improving cyber awareness, sharing useful security information, and encouraging responsible digital participation."
        />
      </div>

      {/* 
        Single Unified Frame Architecture:
        - In Mobile View (isMobile): Whiteboard is cleanly framed by its wooden frame on a slate background.
        - In Desktop View: The whole classroom design fills the screen edge-to-edge as ONE single seamless frame.
      */}
      <div
        className={`relative w-full max-w-7xl mx-auto flex-1 flex items-center justify-center rounded-2xl overflow-hidden shadow-2xl border border-slate-700/20 ${
          isMobile ? 'aspect-[666/426] max-w-[1020px] max-h-[85vh]' : 'w-full h-[76vh] min-h-[560px] max-h-[860px]'
        }`}
      >
        <ClassroomCanvas
          ref={canvasRef}
          lightingMode="day"
          isMobile={isMobile}
          viewMode={isMobile ? 'board' : 'room'}
          requestedPageIndex={requestedPageIndex}
          onPageIndexChange={(idx) => setCurrentPageIndex(idx)}
          onBookClick={(bookId) => setActiveBook(bookId)}
          onOpenObjectivesDrawer={() => setIsObjectivesOpen(true)}
          onOpenBooksDrawer={() => setIsBooksOpen(true)}
        />
      </div>

      {/* 
        ========================================================================
        3. MODAL POPUPS & DRAWERS
        ========================================================================
      */}
      {/* 50 Objectives Search & Jump Drawer Modal */}
      <ObjectivesDrawerModal
        isOpen={isObjectivesOpen}
        onClose={() => setIsObjectivesOpen(false)}
        currentIndex={currentPageIndex}
        onSelectObjective={handleSelectObjective}
      />

      {/* 6 Desk Books Drawer Modal */}
      <DeskBooksDrawerModal
        isOpen={isBooksOpen}
        onClose={() => setIsBooksOpen(false)}
        onSelectBook={(bookId) => setActiveBook(bookId)}
      />

      {/* Textbook Lesson Reader Modal */}
      {activeBook && (
        <BookDetailModal
          bookId={activeBook}
          onClose={() => setActiveBook(null)}
        />
      )}
    </div>
  );
}

export { SoftwareObjectivesPage, SoftwareObjectivesPage as ClassroomApp };
