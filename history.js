class HistoryManager {
  constructor() {
    this.history = [];
    this.position = -1;
  }

  push(url) {
    if (this.position < this.history.length - 1) {
      this.history = this.history.slice(0, this.position + 1);
    }
    this.history.push(url);
    this.position++;
  }

  back() {
    if (this.position > 0) {
      this.position--;
      return this.history[this.position];
    }
    return null;
  }

  forward() {
    if (this.position < this.history.length - 1) {
      this.position++;
      return this.history[this.position];
    }
    return null;
  }

  canGoBack() {
    return this.position > 0;
  }

  canGoForward() {
    return this.position < this.history.length - 1;
  }

  current() {
    return this.history[this.position] || null;
  }
}
