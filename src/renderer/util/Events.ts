export default class Events {
  element: Comment;
  _renderMiniMap: CustomEvent;
  _setNeightbours: CustomEvent;
  _setDoors: CustomEvent;
  _renderHitboxes: CustomEvent;

  constructor() {
    this.element = new Comment("eventBus");
    this._renderMiniMap = new CustomEvent("renderMiniMap");
    this._setNeightbours = new CustomEvent("setNeightbours");
    this._setDoors = new CustomEvent("setDoors");
    this._renderHitboxes = new CustomEvent("renderHitboxes");
  }

  renderHitboxes() {
    this.element.dispatchEvent(this._renderHitboxes);
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
