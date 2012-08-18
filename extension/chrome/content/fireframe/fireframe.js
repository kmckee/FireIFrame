FBL.ns(function() { with (FBL) {

  Firebug.FireFrameModel = extend(Firebug.Module, {
    
    onSelectFrame: function(context) {
      var panel = context.getPanel('console');
      panel.inspectable = true;
      Firebug.Inspector.startInspecting(context);
      panel.inspectable = false;
    },
    
    getParentFrame: function(element)
    {
      return element.ownerDocument.defaultView.frameElement;
    },

    getFrameStackRecursive: function(element, frames)
    {
      frames = frames || [];
      var parent = this.getParentFrame(element);
      if (parent)
      {
          frames.push(parent);
          this.getFrameStackRecursive(parent, frames);
      }
      return frames;
    },

    walkFrameStack: function(frames)
    {
      Firebug.Console.log('1');
      cd(top);
      Firebug.Console.log('2');
      var currentFrame = frames.pop();
      while (currentFrame)
      {
          this.cd(currentFrame.contentWindow);
          currentFrame = frames.pop();
      }
    },

    attachConsoleToFrameContaining: function(element)
    {
      this.walkFrameStack(this.getFrameStackRecursive(element));
    }
  });


  Firebug.ConsolePanel.prototype.startInspecting = function() {
  
  }

  Firebug.ConsolePanel.prototype.inspectNode = function(node) {
    return false;
  }

  Firebug.ConsolePanel.prototype.stopInspecting = function(node, canceled) {
    if (canceled === true)
      return;

    Firebug.FireFrameModel.attachConsoleToFrameContaining(node);
  }

  Firebug.ConsolePanel.prototype.supportsObject = function(object, type) {
    var tagName = object.tagName.toLowerCase();
    return (tagName == "iframe") ? 1 : 0;
  }

  Firebug.ConsolePanel.prototype.inspectHighlightColor = "green";

  Firebug.registerModule(Firebug.FireFrameModel);
}});
