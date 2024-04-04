/* eslint-disable require-jsdoc */
class Entry {
  constructor(filename, link, type = 'file') {
    this.filename = filename;
    this.link = link;
    this.type = type;
  }
}

module.exports = Entry;
