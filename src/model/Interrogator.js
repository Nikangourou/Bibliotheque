import { makeAutoObservable, runInAction } from 'mobx';

class Interrogator {
  _worker;

  _pendingQuestion = '';

  _answers = [];

  constructor() {
    makeAutoObservable(this, {
      _worker: false,
      _initWorker: false,
    });
    this._initWorker();
  }

  get answers() {
    return this._answers;
  }

  get pendingQuestion() {
    return this._pendingQuestion;
  }

  set pendingQuestion(question) {
    this._pendingQuestion = question;
  }

  get canAskQuestion() {
    return !!this.pendingQuestion;
  }

  askQuestion() {
    if (!this.pendingQuestion) {
      return;
    }
    this._worker.postMessage({
      question: this.pendingQuestion,
    });
    this.pendingQuestion = '';
  }

  reset() {
    this._answers = [];
  }

  _initWorker() {
    this._worker = new Worker(new URL('../services/stupidAnsweringWorker.js', import.meta.url));
    this._worker.onmessage = ({ data: { answer } }) => {
      this._processAnswer(answer);
    };
  }

  _processAnswer(answer) {
    runInAction(() => {
      this._answers.push({ ...answer, id: this._answers.length });
    });
  }
}

export default Interrogator;
