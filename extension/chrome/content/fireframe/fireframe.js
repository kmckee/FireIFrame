FBL.ns(function() { with (FBL) {

  Firebug.FireFrameModel = extend(Firebug.Module,
  {
    onMyButton: function(context) {
        alert("hi");
    }
  });

  Firebug.registerModule(Firebug.FireFrameModel);

}});
