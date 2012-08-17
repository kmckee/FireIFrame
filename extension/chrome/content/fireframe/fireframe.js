FBL.ns(function() { with (FBL) {
  function FireFramePanel() {}
  FireFramePanel.prototype = extend(Firebug.Panel,
  {
    name: "Frames",
    title: "Frames",

    initialize: function() {
      Firebug.Panel.initialize.apply(this, arguments);
    },
  });

  Firebug.registerPanel(FireFramePanel);

}});
