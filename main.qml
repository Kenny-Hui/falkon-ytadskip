import QtQuick 2.3
import org.kde.falkon 1.0 as Falkon

Falkon.PluginInterface {
    Falkon.UserScript {
        id: ytadskipper
        name: 'YouTube Ad Skipper'
        runsOnSubFrames: false
        sourceCode: Falkon.FileUtils.readAllFileContents('skip.js')
        injectionPoint: Falkon.UserScript.DocumentReady
        worldId: Falkon.UserScript.MainWorld
    }

    init: function(state, settingsPath){
        print("YouTubeAdSkipper loaded!");
    }

    unload: function() {
        print("YouTubeAdSkipper unloaded.");
    }
    
    testPlugin: function() {
        return true
    }
}
