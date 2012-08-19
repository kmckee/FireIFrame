FBL.ns(function() { with (FBL) {

  Firebug.FireFrameModel = extend(Firebug.Module, {
    
    onSelectFrame: function(context) {
      // Ordinarily, the console panel does not support the inspector.  
      // We need to temporarily allow it, so that clicking "Select Frame"
      // doesn't move the user to a different panel.  Shut it back off afterward
      // so that clicking the normal inspector button will send them to the html
      // panel as expected.
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

    walkFrameStack: function(frames, context)
    {
      this.cd(top, context);
      var currentFrame = frames.pop();
      while (currentFrame)
      {
          this.cd(currentFrame.contentWindow, context);
          currentFrame = frames.pop();
      }
    },

    attachConsoleToFrameContaining: function(element, context)
    {
      this.walkFrameStack(this.getFrameStackRecursive(element), context);
    }, 

    cd: function(object, context)
    {
        if (!(object instanceof window.Window))
            throw "Object must be a window.";

        // Make sure the command line is attached into the target iframe.
        var consoleReady = Firebug.Console.isReadyElsePreparing(context, object);
        if (FBTrace.DBG_COMMANDLINE)
            FBTrace.sysout("commandLine.cd; console ready: " + consoleReady);

        // The window object parameter uses XPCSafeJSObjectWrapper, but we need XPCNativeWrapper
        // So, look within all registered consoleHandlers for
        // the same window (from tabWatcher) that uses uses XPCNativeWrapper (operator "==" works).
        var entry = Firebug.Console.injector.getConsoleHandler(context, object);
        if (entry)
            context.baseWindow = entry.win;

        Firebug.Console.log(["Current window:", context.baseWindow], context, "info");
        return Firebug.Console.getDefaultReturnValue(context.window);
    }
  });


  //***********************************************************
  // Modify the Console Panel to enable the inspector.
  //***********************************************************
  Firebug.ConsolePanel.prototype.startInspecting = function() {
  
  }

  Firebug.ConsolePanel.prototype.inspectNode = function(node) {
    return false;
  }

  Firebug.ConsolePanel.prototype.stopInspecting = function(node, canceled) {
    if (canceled === true)
      return;
    Firebug.FireFrameModel.attachConsoleToFrameContaining(node, this.context);
  }

  Firebug.ConsolePanel.prototype.supportsObject = function(object, type) {
    var tagName = object.tagName.toLowerCase();
    return (tagName == "iframe") ? 1 : 0;
  }

  Firebug.ConsolePanel.prototype.inspectHighlightColor = "green";


  //***********************************************************
  // Register components with Firebug.
  //***********************************************************
  Firebug.registerModule(Firebug.FireFrameModel);
}});
