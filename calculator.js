//JS Goes HERE
function Calculator() {
  this.display = null;
  this.left = null;
  this.right = null;
  this.operator = null;
  this.input = null;

  this.init = function(){
    var self = this;
    self.clear();
    self.bind();
    return self;
  }

  this.keyEntry = function(key){
    var self = this;

    if ( self.input ) {
      self.input = self.input + key;
    } else {
      self.input = key;
    }

    self.updateDisplay();
    return self;

  };

  this.operatorEntry = function(key){
    var self = this;

    if ( key == "=" || self.operator ) {
      self.right = self.input;
      self.performOperation();
    }

    self.left = self.input;
    self.right = null;

    if ( key == "=" ) {
      self.operator = null;
    } else {
      //Reset input and set operator
      self.operator = key;
      self.input = null;
    }

    return self;
  };

  this.clear = function(){
    var self = this;
    self.display = 0;
    self.left = null;
    self.right = null;
    self.operator = null;
    self.input = 0;

    self.updateDisplay();
    return self;
  }

  this.bind = function(){
    var self = this;
    // Binds Keys

    // These could all be one button handler with a switch statement instead
    $("button.number").on("click", function(e){
      e.preventDefault();
      self.keyEntry(e.target.value);
    });
    $("button.operator").on("click", function(e){
      e.preventDefault();
      self.operatorEntry(e.target.value);
    });
    $("button.clear").on("click", function(e){
      e.preventDefault();
      self.clear();
    });
    return;
  };

  this.updateDisplay = function(){
    var self = this;

    //Update display
    self.display = self.input;
    $("input[name=display]").val(self.input);

    return;
  };

  this.performOperation = function(){
    var self = this;

    if ( self.operator && self.left && self.right ) {

      switch(self.operator){

      case "*":
        self.input = parseFloat(self.left) * parseFloat(self.right);
        break;
      case "/":
        self.input = parseFloat(self.left) / parseFloat(self.right);
        break;
      case "+":
        self.input = parseFloat(self.left) + parseFloat(self.right);
        break;
      case "-":
        self.input = parseFloat(self.left) - parseFloat(self.right);
        break;
      default:
        break;
      }

      self.updateDisplay();

    } else {
      //console.log("error");
      return;
    }
    self.operator = null;
    self.left = null;
    self.right = null;

    return;
  };


}
