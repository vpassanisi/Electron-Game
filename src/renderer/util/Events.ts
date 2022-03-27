export default class Events {
  element: Comment
  _renderMiniMap: CustomEvent
  _setNeightbours: CustomEvent
  constructor() {
    this.element = new Comment('eventBus');
    this._renderMiniMap = new CustomEvent('renderMiniMap');
    this._setNeightbours = new CustomEvent('setNeightbours');
  }

  renderMiniMap() {
    this.element.dispatchEvent(this._renderMiniMap);
  }

  setNeightbours() {
    this.element.dispatchEvent(this._setNeightbours);
  }
}