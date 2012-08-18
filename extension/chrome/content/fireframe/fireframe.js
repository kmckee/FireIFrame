FBL.ns(function() { with (FBL) {

  var panelName = "Frames";
  Firebug.FireFrameModel = extend(Firebug.Module,
  {
    showPanel: function(browser, panel) {
        var isHwPanel = panel && panel.name == panelName;
        var hwButtons = browser.chrome.$("fbFireFrameButtons");
        collapse(hwButtons, !isHwPanel);
    },
    onMyButton: function(context) {
        alert("hi");
    }
  });

  function FireFramePanel() {}
  FireFramePanel.prototype = extend(Firebug.Panel,
  {
    name: panelName,
    title: "Frames",

    initialize: function() {
      Firebug.Panel.initialize.apply(this, arguments);
    },
  });

  Firebug.registerModule(Firebug.FireFrameModel);
  Firebug.registerPanel(FireFramePanel);

}});
