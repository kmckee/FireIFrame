FBL.ns(function() { with (FBL) {

  Firebug.FireFrameModel = extend(Firebug.Module, {
    onSelectFrame: function(context) {
        var panel = context.getPanel('console');
        panel.inspectable = true;
        Firebug.Inspector.startInspecting(context);
        panel.inspectable = false;
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

    alert('Node selected.  Need to walk iframe stack and target it.');
  }

  Firebug.ConsolePanel.prototype.supportsObject = function(object, type) {
    var tagName = object.tagName.toLowerCase();
    return (tagName == "iframe") ? 1 : 0;
  }

  Firebug.ConsolePanel.prototype.inspectHighlightColor = "green";


  Firebug.registerModule(Firebug.FireFrameModel);

}});
