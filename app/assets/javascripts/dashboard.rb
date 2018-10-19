require 'opal'
require 'clearwater'
require 'tile'
require 'settings'

class Dashboard
  include Clearwater::Component

  def initialize(mode)
    @mode = mode
  end

  def tiles
    return div({style: Style.mode}, [    
      Tile.memoize("https://", "google.com", "Google"),
      Tile.memoize("https://", "github.com", "Github"),
      Tile.memoize("https://", "youtube.com", "Youtube"),
      Tile.memoize("https://", "reddit.com", "Reddit"),
      Tile.memoize("https://", "twitch.tv", "Twitch"),
      Tile.memoize("https://", "g894122r.com", "Test 1"),
      Tile.memoize("https://", "facebook.com", "Facebook"),
      Tile.memoize("https://", "y532rfd.com", "Test 2"),
      Tile.memoize("https://", "rdq.tdlab.ca", "RDQ")
    ])
  end

  def settings
    return div({style: Style.mode}, [  
      Settings.new
    ])
  end
  
  def render
    div({style: Style.dashboard}, [
      @mode == 'tiles' ? tiles : div(),
      @mode == 'settings' ? settings : div()
    ])
  end

  module Style
    module_function

    def dashboard
      {
        background_color: 'rgba(100, 100, 100, 0)',
        display: 'flex',
        flex_wrap: 'wrap',
        flex_direction: 'row',
        flex: 0.9
      }
    end

    def mode
      {
        width: '100%', height: '100%',
        display: 'flex',
        flex_wrap: 'wrap',
        flex_direction: 'row'
      }
    end

  end
end
