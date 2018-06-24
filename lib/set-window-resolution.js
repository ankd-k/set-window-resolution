'use babel';

import SetWindowResolutionView from './set-window-resolution-view';
import { CompositeDisposable } from 'atom';

export default {

  setWindowResolutionView: null,
  modalPanel: null,
  subscriptions: null,

  config: {
    width:{
      title: 'width',
      description: `init width resolution`,
      type: 'integer',
      default: '1280',
      order: 1,
    },
    height:{
      title: 'height',
      description: `init height resolution`,
      type: 'integer',
      default: '720',
      order: 1,
    },
  },

  activate(state) {
    console.log(state);
    this.setWindowResolutionView = new SetWindowResolutionView(state.setWindowResolutionViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.setWindowResolutionView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'set-window-resolution:toggle': () => this.toggle()
    }));

  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.setWindowResolutionView.destroy();
  },

  serialize() {
    return {
      setWindowResolutionViewState: this.setWindowResolutionView.serialize()
    };
  },

  toggle() {
    console.log('SetWindowResolution was toggled!');
    return (
      this.modalPanel.isVisible() ?
        this.modalPanel.hide() :
        this.modalPanel.show()
    );
  },
};
