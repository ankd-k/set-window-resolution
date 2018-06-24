'use babel';

export default class SetWindowResolutionView {

  constructor(serializedState) {
    // Create root element
    this.element = document.createElement('div');
    this.element.classList.add('set-window-resolution');

    // Create message element
    const message = document.createElement('div');
    message.textContent = 'Please enter width and height resolution.';
    message.classList.add('message');
    this.element.appendChild(message);

    const input1 = document.createElement('input');
    const input2 = document.createElement('input');
    input1.type = 'text';
    input2.type = 'text';
    input1.classList.add('input');
    input2.classList.add('input');
    input1.id = 'width';
    input2.id = 'height';
    input1.value = String(atom.config.get('set-window-resolution.width'));
    input2.value = String(atom.config.get('set-window-resolution.height'));
    const pre1 = document.createElement('pre');
    const pre2 = document.createElement('pre');
    pre1.textContent = 'width\t: ';
    pre2.textContent = 'height\t: ';
    pre1.appendChild(input1);
    pre2.appendChild(input2);
    this.element.appendChild(pre1);
    this.element.appendChild(pre2);

    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = 'set size';
    button.classList.add('button');
    button.id = 'button';
    button.onclick = ()=>{this.setResolution();};
    this.element.appendChild(button);
  }

  // Returns an object that can be retrieved when package is activated
  serialize() {}

  // Tear down any state and detach
  destroy() {
    this.element.remove();
  }

  getElement() {
    return this.element;
  }

  setResolution() {
    const w = parseInt(document.getElementById('width').value, 10);
    const h = parseInt(document.getElementById('height').value, 10);

    if(!Number.isSafeInteger(w)||!Number.isSafeInteger(h)){
      console.error('w/h is not safe intager.');
      return;
    }else if((w<200||window.screen.availWidth<w) || (h<200||window.screen.availHeight<h)) {
      console.error('w or h is too large or small.');
      return;
    }

    atom.setSize(w, h);
    console.log('set window size : ' + w + ', ' + h);
  }

}
