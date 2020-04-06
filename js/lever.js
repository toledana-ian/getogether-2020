function StateManager(args) {
    this._state = null;
    this.states = args.states || [];
    this.node = args.node || null;
}

StateManager.prototype = {
    setNodeState: function setNodeState() {
        this.node.classList.remove.apply(this.node.classList, this.states);
        this.node.classList.add(this.state);
    },
    get state() {
        return this._state || this.states[0];
    },
    set state(_state) {
        if (this.states.indexOf(_state) === -1) {
            throw new Error('Not a valid state', _state);
        } else if (this._state !== _state) {
            this._state = _state;
            this.setNodeState();
        }
    } };


function Lever(args) {
    this.node = args.node;
    this.states = args.states;
}

Lever.prototype = Object.create(StateManager.prototype);

// --- Initializer
Lever.prototype.init = function () {
    var onLeverPull = this.onLeverPull.bind(this);
    var onAnimationIteration = this.onAnimationIteration.bind(this);
    var onAnimationEnd = this.onAnimationEnd.bind(this);

    this.node.addEventListener('click', onLeverPull);
    this.node.addEventListener('animationiteration', onAnimationIteration);
    this.node.addEventListener('animationend', onAnimationEnd);

    this.setNodeState();
};

var LEVER = new Lever({
    node: document.querySelector('.lever'),
    states: [
    'enabled',
    'disabled'] });

