import { useState, useEffect, useRef } from 'react'
import { classroomParagraphs } from './SoftwareIdentityPageData'
import NavPageHeader from '../../../components/NavPageHeader'

const styles = `
@import url('https://fonts.googleapis.com/css2?family=Caveat:wght@600;700&family=Patrick+Hand&family=Schoolbell&display=swap');

* { box-sizing: border-box; }

.watermark-bg:has(.classroom) {
  background-color: transparent !important;
}
.watermark-bg:has(.classroom)::before {
  opacity: 0.18 !important;
  display: block !important;
}

.classroom-page-bg {
  background-color: rgba(173, 219, 159, 0.76) !important;
  position: relative;
  z-index: 10;
}

.classroom { width: 100%; min-height: 100svh; overflow: hidden; background: transparent; }
.classroom__canvas { position: relative; width: 100%; height: 100svh; overflow: hidden; container-type: inline-size; --unit: .078125cqw; background: transparent; }
.classroom__canvas > *, .classroom__canvas span, .classroom__canvas i { position: absolute; display: block; }

.classroom__lower-wall { inset: 0; background: rgba(216, 234, 201, 0.78); clip-path: polygon(0.00% 55.83%, 1.25% 55.02%, 2.50% 53.83%, 3.75% 52.51%, 5.00% 51.33%, 6.25% 50.56%, 7.50% 50.14%, 8.75% 50.23%, 10.00% 50.69%, 11.25% 51.37%, 12.50% 52.30%, 13.75% 53.50%, 15.00% 54.97%, 16.25% 56.51%, 17.50% 58.34%, 18.75% 60.27%, 20.00% 62.07%, 21.25% 63.61%, 22.50% 65.41%, 23.75% 66.46%, 25.00% 66.75%, 26.25% 66.12%, 27.50% 64.81%, 28.75% 62.86%, 30.00% 60.93%, 31.25% 59.97%, 32.50% 59.43%, 33.75% 59.11%, 35.00% 59.00%, 36.25% 59.11%, 37.50% 59.40%, 38.75% 59.92%, 40.00% 60.72%, 41.25% 61.86%, 42.50% 63.42%, 43.75% 65.23%, 45.00% 67.01%, 46.25% 68.50%, 47.50% 69.74%, 48.75% 70.84%, 50.00% 71.80%, 51.25% 72.60%, 52.50% 73.24%, 53.75% 73.73%, 55.00% 74.06%, 56.25% 74.25%, 57.50% 74.32%, 58.75% 74.19%, 60.00% 73.76%, 61.25% 73.02%, 62.50% 72.18%, 63.75% 71.15%, 65.00% 69.98%, 66.25% 68.76%, 67.50% 67.44%, 68.75% 65.94%, 70.00% 64.43%, 71.25% 63.07%, 72.50% 61.91%, 73.75% 60.90%, 75.00% 60.11%, 76.25% 59.55%, 77.50% 59.12%, 78.75% 59.14%, 80.00% 59.74%, 81.25% 60.76%, 82.50% 62.06%, 83.75% 63.22%, 85.00% 63.82%, 86.25% 63.76%, 87.50% 63.15%, 88.75% 62.16%, 90.00% 60.90%, 91.25% 59.31%, 92.50% 57.51%, 93.75% 55.29%, 95.00% 52.41%, 96.25% 49.99%, 97.50% 49.14%, 98.75% 50.25%, 100.00% 51.39%, 100% 100%, 0 100%); }
.classroom__wave { inset: 0; background: rgba(161, 213, 141, 0.78); clip-path: polygon(0.00% 50.97%, 1.25% 49.99%, 2.50% 48.53%, 3.75% 46.93%, 5.00% 45.50%, 6.25% 44.58%, 7.50% 44.16%, 8.75% 44.39%, 10.00% 45.04%, 11.25% 45.93%, 12.50% 47.08%, 13.75% 48.54%, 15.00% 50.32%, 16.25% 52.18%, 17.50% 54.37%, 18.75% 56.69%, 20.00% 58.86%, 21.25% 60.77%, 22.50% 63.11%, 23.75% 64.57%, 25.00% 64.97%, 26.25% 64.14%, 27.50% 62.68%, 28.75% 60.62%, 30.00% 58.59%, 31.25% 57.59%, 32.50% 57.06%, 33.75% 56.75%, 35.00% 56.65%, 36.25% 56.74%, 37.50% 57.01%, 38.75% 57.49%, 40.00% 58.19%, 41.25% 59.08%, 42.50% 60.27%, 43.75% 61.63%, 45.00% 62.99%, 46.25% 64.16%, 47.50% 65.20%, 48.75% 66.18%, 50.00% 67.05%, 51.25% 67.77%, 52.50% 68.29%, 53.75% 68.65%, 55.00% 68.88%, 56.25% 69.00%, 57.50% 69.04%, 58.75% 68.99%, 60.00% 68.69%, 61.25% 68.04%, 62.50% 67.24%, 63.75% 66.25%, 65.00% 65.12%, 66.25% 63.90%, 67.50% 62.56%, 68.75% 61.02%, 70.00% 59.44%, 71.25% 57.99%, 72.50% 56.69%, 73.75% 55.43%, 75.00% 54.38%, 76.25% 53.61%, 77.50% 53.08%, 78.75% 53.13%, 80.00% 53.78%, 81.25% 54.87%, 82.50% 56.27%, 83.75% 57.51%, 85.00% 58.12%, 86.25% 58.01%, 87.50% 57.26%, 88.75% 56.03%, 90.00% 54.31%, 91.25% 52.12%, 92.50% 49.91%, 93.75% 47.77%, 95.00% 45.45%, 96.25% 43.60%, 97.50% 42.88%, 98.75% 43.63%, 100.00% 44.44%, 100.00% 51.39%, 98.75% 50.25%, 97.50% 49.14%, 96.25% 49.99%, 95.00% 52.41%, 93.75% 55.29%, 92.50% 57.51%, 91.25% 59.31%, 90.00% 60.90%, 88.75% 62.16%, 87.50% 63.15%, 86.25% 63.76%, 85.00% 63.82%, 83.75% 63.22%, 82.50% 62.06%, 81.25% 60.76%, 80.00% 59.74%, 78.75% 59.14%, 77.50% 59.12%, 76.25% 59.55%, 75.00% 60.11%, 73.75% 60.90%, 72.50% 61.91%, 71.25% 63.07%, 70.00% 64.43%, 68.75% 65.94%, 67.50% 67.44%, 66.25% 68.76%, 65.00% 69.98%, 63.75% 71.15%, 62.50% 72.18%, 61.25% 73.02%, 60.00% 73.76%, 58.75% 74.19%, 57.50% 74.32%, 56.25% 74.25%, 55.00% 74.06%, 53.75% 73.73%, 52.50% 73.24%, 51.25% 72.60%, 50.00% 71.80%, 48.75% 70.84%, 47.50% 69.74%, 46.25% 68.50%, 45.00% 67.01%, 43.75% 65.23%, 42.50% 63.42%, 41.25% 61.86%, 40.00% 60.72%, 38.75% 59.92%, 37.50% 59.40%, 36.25% 59.11%, 35.00% 59.00%, 33.75% 59.11%, 32.50% 59.43%, 31.25% 59.97%, 30.00% 60.93%, 28.75% 62.86%, 27.50% 64.81%, 26.25% 66.12%, 25.00% 66.75%, 23.75% 66.46%, 22.50% 65.41%, 21.25% 63.61%, 20.00% 62.07%, 18.75% 60.27%, 17.50% 58.34%, 16.25% 56.51%, 15.00% 54.97%, 13.75% 53.50%, 12.50% 52.30%, 11.25% 51.37%, 10.00% 50.69%, 8.75% 50.23%, 7.50% 50.14%, 6.25% 50.56%, 5.00% 51.33%, 3.75% 52.51%, 2.50% 53.83%, 1.25% 55.02%, 0.00% 55.83%); }
.classroom__floor { left: 0; right: 0; bottom: 0; height: 14.9%; background: rgba(170, 181, 199, 0.9); }

.blackboard {
  left: 13.9%;
  top: 9.86%;
  width: 55.86%;
  height: 50.55%;
  border: clamp(4px, .5cqw, 7px) solid #9c9f9d;
  background: radial-gradient(ellipse at 50% 30%, #29302b 0%, #1e2520 70%, #151a16 100%);
  box-shadow: inset 0 0 0 clamp(3px, .35cqw, 5px) #d6d7d4, inset 0 0 35px rgba(0, 0, 0, 0.45), 0 2px 8px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  user-select: text;
}
.blackboard__shine { inset: 1.5% 0 0; background: #ffffff06; clip-path: polygon(0 0, 100% 0, 100% 63%, 0 0); pointer-events: none; }
.blackboard__reading {
  position: absolute;
  top: 7%;
  right: 5.5%;
  bottom: 20%;
  left: 5.5%;
  overflow-y: auto;
  color: #f3f2e9;
  scrollbar-width: thin;
  scrollbar-color: #7b887a transparent;
  cursor: pointer;
}
.blackboard__heading {
  margin: 0 0 clamp(8px, 1cqw, 14px);
  color: #fffdec;
  font: 700 clamp(18px, 2.1cqw, 29px)/1.25 'Patrick Hand', 'Schoolbell', 'Caveat', Georgia, serif;
  text-align: center;
  text-shadow: 0 0 3px rgba(255, 255, 255, 0.65), 0 0 1px #fff;
  letter-spacing: 0.02em;
}
.blackboard__paragraph {
  margin: 0;
  color: #f7f6ec;
  font: 400 clamp(15px, 1.45cqw, 22px)/1.45 'Patrick Hand', 'Caveat', 'Comic Sans MS', Georgia, serif;
  letter-spacing: 0.02em;
  text-shadow: 0 0 2px rgba(255, 255, 255, 0.55);
  white-space: pre-wrap;
  word-break: break-word;
}
.blackboard__chalk-cursor {
  display: inline-block;
  width: clamp(2px, 0.22cqw, 3px);
  height: 1.15em;
  margin-left: 2px;
  vertical-align: -0.15em;
  background-color: #fff9d8;
  box-shadow: 0 0 5px #fff9d8, 0 0 1px #fff;
  border-radius: 1px;
  animation: chalk-blink 0.55s infinite alternate ease-in-out;
}
@keyframes chalk-blink {
  0% { opacity: 1; transform: scaleY(1); }
  50% { opacity: 0.75; }
  100% { opacity: 0.2; transform: scaleY(0.85); }
}
.blackboard__navigation {
  position: absolute;
  right: 5.5%;
  bottom: 5.5%;
  left: 5.5%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(10px, 1.5cqw, 24px);
  color: #f3f2e9;
  font: 600 clamp(12px, 1.08cqw, 16px)/1.2 Arial, sans-serif;
}
.blackboard__navigation button {
  min-width: clamp(58px, 5.5cqw, 84px);
  min-height: 32px;
  padding: 5px 12px;
  border: 1px solid #deded1;
  border-radius: 4px;
  background: #e9e8dc;
  color: #282828;
  font: inherit;
  cursor: pointer;
  transition: background .2s ease, transform .2s ease, box-shadow .2s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
}
.blackboard__navigation button:hover:not(:disabled) {
  background: #fff;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.blackboard__navigation button:active:not(:disabled) {
  transform: translateY(0);
}
.blackboard__navigation button:focus-visible { outline: 3px solid #c8d984; outline-offset: 2px; }
.blackboard__navigation button:disabled { opacity: .42; cursor: not-allowed; }
.blackboard__navigation .blackboard__page-number { position: static; display: block; min-width: 55px; text-align: center; white-space: nowrap; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

.science-poster { left: 78.3%; top: 11.5%; width: 10.6%; height: 27%; }
.science-poster__wire { top: 4%; width: 34%; height: 1px; background: #30392e; transform-origin: center; }
.science-poster__wire--left { left: 18%; transform: rotate(-30deg); }.science-poster__wire--right { right: 17%; transform: rotate(30deg); }
.science-poster__pin { left: 48%; top: 0; width: 6%; aspect-ratio: 1; border-radius: 50%; background: #101513; }
.science-poster__board { position: absolute; left: 0; right: 0; top: 13%; bottom: 0; border: clamp(2px, .23cqw, 3px) solid #9ea69b; background: #080a08; box-shadow: 1px 2px 2px #1a271944; overflow: hidden; }
.science-poster__scribble { color: #e4e5df; font-family: Georgia, serif; font-size: clamp(6px, .9cqw, 12px); font-weight: 400; line-height: 1; opacity: .85; text-shadow: 0 0 1px #fff; }
.science-poster__scribble--one { left: 34%; top: 8%; transform: rotate(10deg); font-size: 1.5cqw; }
.science-poster__scribble--two { right: 9%; top: 14%; transform: rotate(-6deg); }
.science-poster__scribble--three { left: 13%; top: 23%; transform: rotate(95deg); font-size: 1.5cqw; }
.science-poster__scribble--four { left: 50%; top: 27%; transform: rotate(25deg); font-size: 1.3cqw; }
.science-poster__scribble--five { left: 46%; top: 47%; transform: rotate(-15deg); font-size: 1.3cqw; }
.science-poster__scribble--six { right: 12%; top: 43%; font-size: 1.3cqw; }
.science-poster__scribble--seven { left: 14%; top: 58%; font-size: 1.25cqw; letter-spacing: -.2em; }
.science-poster__scribble--eight { right: 5%; top: 65%; font-size: .7cqw; }
.science-poster__scribble--nine { left: 41%; top: 76%; font-size: 1.5cqw; }
.science-poster__scribble--ten { right: 18%; bottom: 6%; font-size: 1.4cqw; }

.left-table, .right-desk { inset: 0; pointer-events: none; }
.left-table__top { left: 6%; top: 66.8%; width: 31.9%; height: 2.1%; border-radius: 2px; background: #783207; box-shadow: inset 0 2px #924416; }
.left-table__leg { top: 68.7%; height: 31.5%; width: 1.05%; background: #863c0d; transform-origin: top center; }
.left-table__leg--left { left: 10.25%; transform: skewX(-7deg); }.left-table__leg--right { left: 30.95%; transform: skewX(7deg); }

.book-stack { left: 7.35%; top: 49.9%; width: 8.25%; height: 17.2%; }
.book-stack__book { left: var(--book-left); bottom: calc(var(--book-index) * 16.3%); width: var(--book-width); height: 16%; border-left: clamp(5px, .75cqw, 10px) solid var(--book-color); border-top: clamp(2px, .27cqw, 4px) solid var(--book-color); border-bottom: clamp(2px, .27cqw, 4px) solid var(--book-color); border-radius: 16px 3px 3px 16px; background: repeating-linear-gradient(0deg, #f8faf4 0 2px, #d9e1df 2px 3px, #f8faf4 3px 5px); box-shadow: 1px 1px 2px #40261933; }
.book-stack__book i { left: 9%; top: 14%; bottom: 14%; width: 4%; border-radius: 50%; background: #fbede5; opacity: .8; }

.bouquet { left: 18.3%; top: 42.6%; width: 8.5%; height: 24.5%; }
.bouquet__stem { left: 47%; bottom: 26%; width: 1.2%; height: 62%; background: #38593e; transform-origin: bottom center; }
.bouquet__stem--one { transform: rotate(-28deg); height: 58%; }.bouquet__stem--two { transform: rotate(-9deg); height: 68%; }.bouquet__stem--three { transform: rotate(13deg); height: 72%; }.bouquet__stem--four { transform: rotate(33deg); height: 55%; }
.bouquet__leaf { width: 15%; height: 7%; border-radius: 100% 0 100% 0; background: #497453; transform: rotate(25deg); }
.bouquet__leaf--one { left: 34%; top: 57%; }.bouquet__leaf--two { left: 55%; top: 48%; transform: rotate(80deg); }
.bouquet__flower { color: #f6a8c1; line-height: 1; text-shadow: 1px 1px #e6829f; transform: translate(-50%, -50%); }
.bouquet__vase { left: 34%; bottom: 0; width: 32%; height: 40%; background: linear-gradient(90deg, #69b0b3 0 28%, #77c1c0 50%, #67a9ae 100%); clip-path: polygon(15% 0, 85% 0, 72% 28%, 86% 82%, 77% 100%, 23% 100%, 14% 82%, 28% 28%); border-radius: 12% 12% 30% 30%; }
.bouquet__vase::before { content: ''; position: absolute; left: 0; top: 0; width: 100%; height: 9%; border-radius: 50%; background: #82c9c5; }

.right-desk__top { left: 80.25%; top: 66.55%; width: 19.75%; height: 1.75%; border-radius: 2px 0 0 2px; background: #753107; }
.right-desk__body { left: 84.35%; top: 68.3%; width: 15.65%; height: 31.7%; background: linear-gradient(130deg, #7b3218 0 52%, #813719 52%, #772c12 100%); }
.flask { left: 88%; top: 59.7%; width: 3.4%; height: 7.3%; background: #a2b3ab; clip-path: polygon(38% 0, 62% 0, 61% 29%, 91% 92%, 84% 100%, 16% 100%, 9% 92%, 39% 29%); }
.flask::after { content: ''; position: absolute; inset: 34% 13% 6%; background: #a83d77; clip-path: polygon(33% 0, 67% 0, 100% 100%, 0 100%); }

.microscope { left: 92.1%; top: 49.4%; width: 7.5%; height: 17.8%; }
.microscope__arm { left: 43%; top: 37%; width: 32%; height: 43%; border: clamp(7px, 1cqw, 13px) solid #373b59; border-left: 0; border-radius: 0 85% 75% 0; transform: rotate(-6deg); }
.microscope__tube { left: 42%; top: 4%; width: 19%; height: 61%; border-radius: 4px; background: linear-gradient(90deg, #353a55, #596276 55%, #343750); transform: rotate(29deg); box-shadow: inset 0 0 0 2px #ffffff22; }
.microscope__eyepiece { left: 56%; top: 0; width: 30%; height: 9%; border-radius: 3px; background: #41455d; transform: rotate(29deg); }
.microscope__nosepiece { left: 28%; top: 54%; width: 28%; height: 9%; border-radius: 3px; background: #383b58; transform: rotate(29deg); }
.microscope__objective { left: 24%; top: 58%; width: 12%; height: 12%; border-radius: 2px; background: #4e536b; transform: rotate(29deg); }
.microscope__knob { left: 55%; top: 34%; width: 12%; aspect-ratio: 1; border-radius: 50%; background: #676c7c; border: 2px solid #313650; }
.microscope__stage { left: 0; top: 77%; width: 69%; height: 7%; border-radius: 4px; background: #393d5a; }
.microscope__foot { left: 13%; bottom: 0; width: 80%; height: 10%; border-radius: 100% 100% 4px 4px; background: #333752; }

@media (max-width: 700px) {
  .classroom__canvas { height: max(100svh, 800px); --unit: max(.68px, .078125cqw); }

  .blackboard { z-index: 1; left: 4%; top: 3%; width: 92%; height: 60%; }
  .blackboard__reading { top: 6%; right: 6%; bottom: 20%; left: 6%; }
  .blackboard__heading { font-size: clamp(17px, 4cqw, 21px); }
  .blackboard__paragraph { font-size: clamp(13px, 3.5cqw, 16px); }
  .blackboard__navigation { bottom: 4%; }

  .book-stack { left: 7%; top: 64%; width: 20%; height: 8%; }
  .bouquet { left: 25%; top: 61%; width: 18%; height: 11%; }
  .science-poster { left: 55%; top: 64%; width: 17%; height: 8%; }

  .left-table__top { left: 6%; top: 72%; width: 41%; }
  .left-table__leg { top: 73.9%; height: 26.1%; width: 1.2%; }
  .left-table__leg--left { left: 11%; }
  .left-table__leg--right { left: 39%; }

  .right-desk__top { left: 68%; top: 72%; width: 32%; }
  .right-desk__body { left: 78%; top: 73.7%; width: 22%; height: 26.3%; }
  .flask { left: 75%; top: 65%; width: 6%; height: 7%; }
  .microscope { left: 83%; top: 61%; width: 12%; height: 11%; }
}
`

const books = [
  { color: '#e8897d', left: 15, width: 84 },
  { color: '#dd6069', left: 1, width: 97 },
  { color: '#dc7182', left: 10, width: 89 },
  { color: '#c66e7d', left: 3, width: 96 },
  { color: '#d9626c', left: 2, width: 95 },
  { color: '#e7a24d', left: 0, width: 96 },
]

const flowers = [
  [37, 9, 15], [55, 5, 16], [28, 20, 15], [66, 19, 13], [47, 25, 14],
  [72, 32, 13], [19, 39, 13], [43, 42, 14], [60, 48, 14], [30, 55, 12],
  [76, 55, 13], [52, 63, 12], [37, 69, 11], [61, 12, 11], [25, 11, 10],
]

function BookStack() {
  return <div className="book-stack" aria-hidden="true">
    {books.map((book, index) => <span
      key={index}
      className="book-stack__book"
      style={{ '--book-index': index, '--book-color': book.color, '--book-left': `${book.left}%`, '--book-width': `${book.width}%` }}
    ><i /></span>)}
  </div>
}

function Flowers() {
  return <div className="bouquet" aria-hidden="true">
    <span className="bouquet__stem bouquet__stem--one" />
    <span className="bouquet__stem bouquet__stem--two" />
    <span className="bouquet__stem bouquet__stem--three" />
    <span className="bouquet__stem bouquet__stem--four" />
    <span className="bouquet__leaf bouquet__leaf--one" />
    <span className="bouquet__leaf bouquet__leaf--two" />
    {flowers.map(([x, y, size], index) => <span
      key={index}
      className="bouquet__flower"
      style={{ left: `${x}%`, top: `${y}%`, fontSize: `calc(${size} * var(--unit))` }}
    >✿</span>)}
    <span className="bouquet__vase" />
  </div>
}

function SciencePoster() {
  return <div className="science-poster" aria-hidden="true">
    <span className="science-poster__wire science-poster__wire--left" />
    <span className="science-poster__wire science-poster__wire--right" />
    <span className="science-poster__pin" />
    <div className="science-poster__board">
      <span className="science-poster__scribble science-poster__scribble--one">⌬</span>
      <span className="science-poster__scribble science-poster__scribble--two">H₂O</span>
      <span className="science-poster__scribble science-poster__scribble--three">∿</span>
      <span className="science-poster__scribble science-poster__scribble--four">♧</span>
      <span className="science-poster__scribble science-poster__scribble--five">α</span>
      <span className="science-poster__scribble science-poster__scribble--six">⚗</span>
      <span className="science-poster__scribble science-poster__scribble--seven">H O</span>
      <span className="science-poster__scribble science-poster__scribble--eight">∴ ∽ ∴</span>
      <span className="science-poster__scribble science-poster__scribble--nine">◌</span>
      <span className="science-poster__scribble science-poster__scribble--ten">⌁</span>
    </div>
  </div>
}

function Microscope() {
  return <div className="microscope" aria-hidden="true">
    <span className="microscope__arm" />
    <span className="microscope__tube" />
    <span className="microscope__eyepiece" />
    <span className="microscope__nosepiece" />
    <span className="microscope__objective" />
    <span className="microscope__knob" />
    <span className="microscope__stage" />
    <span className="microscope__foot" />
  </div>
}

function BlackboardReading({ paragraph, animate }) {
  const [displayedHeading, setDisplayedHeading] = useState(animate ? '' : paragraph.heading)
  const [displayedContent, setDisplayedContent] = useState(animate ? '' : paragraph.content)
  const [writingStage, setWritingStage] = useState(animate ? 'heading' : 'done')

  const readingAreaRef = useRef(null)
  const isCancelledRef = useRef(false)
  const timeoutRef = useRef(null)

  const completeImmediately = () => {
    if (writingStage === 'done') return
    isCancelledRef.current = true
    if (timeoutRef.current) clearTimeout(timeoutRef.current)
    setDisplayedHeading(paragraph.heading)
    setDisplayedContent(paragraph.content)
    setWritingStage('done')
  }

  useEffect(() => {
    if (!animate) return

    isCancelledRef.current = false
    const headingText = paragraph.heading
    const contentText = paragraph.content

    let hIdx = 0
    let cIdx = 0

    function typeHeadingChar() {
      if (isCancelledRef.current) return
      hIdx++
      setDisplayedHeading(headingText.slice(0, hIdx))

      if (hIdx < headingText.length) {
        timeoutRef.current = setTimeout(typeHeadingChar, 20)
      } else {
        setWritingStage('content')
        timeoutRef.current = setTimeout(typeContentChar, 80)
      }
    }

    function typeContentChar() {
      if (isCancelledRef.current) return
      cIdx++
      setDisplayedContent(contentText.slice(0, cIdx))

      if (readingAreaRef.current) {
        readingAreaRef.current.scrollTop = readingAreaRef.current.scrollHeight
      }

      if (cIdx < contentText.length) {
        const char = contentText[cIdx - 1]
        let delay = 10
        if (char === '.' || char === '?' || char === '!') {
          delay = 50
        } else if (char === ',' || char === ';') {
          delay = 30
        }
        timeoutRef.current = setTimeout(typeContentChar, delay)
      } else {
        setWritingStage('done')
      }
    }

    timeoutRef.current = setTimeout(typeHeadingChar, 40)

    return () => {
      isCancelledRef.current = true
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [paragraph, animate])

  return (
    <div
      className="blackboard__reading"
      ref={readingAreaRef}
      onClick={completeImmediately}
      title={writingStage !== 'done' ? 'Click to show all text' : undefined}
    >
      <h2 className="blackboard__heading">
        {displayedHeading}
        {writingStage === 'heading' && <span className="blackboard__chalk-cursor" aria-hidden="true" />}
      </h2>

      <p className="blackboard__paragraph">
        {displayedContent}
        {writingStage === 'content' && <span className="blackboard__chalk-cursor" aria-hidden="true" />}
      </p>
    </div>
  )
}

export default function CybersecurityServices({ paragraphs = classroomParagraphs }) {
  const list = paragraphs && paragraphs.length > 0 ? paragraphs : [{ heading: 'CR Cyber Threat Intelligence', content: 'No paragraphs available.' }]
  const [paragraphIndex, setParagraphIndex] = useState(0)
  const [animate, setAnimate] = useState(false)
  const currentParagraph = list[paragraphIndex] || list[0]

  const handlePrev = () => {
    setAnimate(true)
    setParagraphIndex((index) => Math.max(0, index - 1))
  }

  const handleNext = () => {
    setAnimate(true)
    setParagraphIndex((index) => Math.min(list.length - 1, index + 1))
  }

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: styles }} />
      <div className="w-full min-h-screen classroom-page-bg !bg-[#addb9f]/75 text-slate-800 flex flex-col overflow-x-hidden pt-4 pb-12 relative z-10">
        {/* Page Hero Header */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-20">
          <NavPageHeader
            title="Software Identity"
            description="Discover our software’s official identity, defining characteristics, and digital presence in the field of cyber threat intelligence and cybersecurity awareness across 50 dedicated reading modules."
            className="!mt-2 sm:!mt-4 !mb-4 sm:!mb-6 px-4 [&_.nav-description-unified]:text-slate-800 [&_.nav-description-unified]:font-medium"
          />
        </div>

        <main className="classroom" aria-label="Illustrated science classroom">
        <div className="classroom__canvas">
          <div className="classroom__lower-wall" />
          <div className="classroom__wave" />
          <div className="classroom__floor" />

          <section className="blackboard" aria-label="Classroom reading board">
            <span className="blackboard__shine" aria-hidden="true" />
            <BlackboardReading
              key={paragraphIndex}
              paragraph={currentParagraph}
              animate={animate}
            />

            <span className="sr-only" aria-live="polite">
              {currentParagraph.heading} - {currentParagraph.content}
            </span>

            <nav className="blackboard__navigation" aria-label="Paragraph navigation">
              <button
                type="button"
                onClick={handlePrev}
                disabled={paragraphIndex === 0}
              >
                Prev
              </button>
              <span className="blackboard__page-number" aria-label={`Paragraph ${paragraphIndex + 1} of ${list.length}`}>
                {paragraphIndex + 1} / {list.length}
              </span>
              <button
                type="button"
                onClick={handleNext}
                disabled={paragraphIndex === list.length - 1}
              >
                Next
              </button>
            </nav>
          </section>
          <SciencePoster />

          <div className="left-table" aria-hidden="true">
            <span className="left-table__top" />
            <span className="left-table__leg left-table__leg--left" />
            <span className="left-table__leg--right" />
          </div>
          <BookStack />
          <Flowers />

          <div className="right-desk" aria-hidden="true"><span className="right-desk__top" /><span className="right-desk__body" /></div>
          <span className="flask" aria-hidden="true" />
          <Microscope />
        </div>
      </main>
    </div>
  </>
)
}

export const SoftwareIdentityPage = CybersecurityServices;
