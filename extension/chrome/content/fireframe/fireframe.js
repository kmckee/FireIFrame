FBL.ns(function() { with (FBL) {

  Firebug.FireFrameModel = extend(Firebug.Module,
  {
    onSelectFrame: function(context) {
        alert("hi");
    }
  });

  Firebug.registerModule(Firebug.FireFrameModel);

}});
