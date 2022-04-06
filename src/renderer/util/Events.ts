export default class Events {
  element: Comment;
  _renderMiniMap: CustomEvent;
  _setNeightbours: CustomEvent;
  _setDoors: CustomEvent;
  constructor() {
    this.element = new Comment("eventBus");
    this._renderMiniMap = new CustomEvent("renderMiniMap");
    this._setNeightbours = new CustomEvent("setNeightbours");
    this._setDoors = new CustomEvent("setDoors");
  }

  renderMiniMap() {
    this.element.dispatchEvent(this._renderMiniMap);
  }

  setNeightbours() {
    this.element.dispatchEvent(this._setNeightbours);
  }

  setDoors() {
    this.element.dispatchEvent(this._setDoors);
  }
}
