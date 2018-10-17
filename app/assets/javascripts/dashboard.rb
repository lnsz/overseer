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
      Tile.memoize("https://", "google.com"),
      Tile.memoize("https://", "github.com"),
      Tile.memoize("https://", "youtube.com"),
      Tile.memoize("https://", "reddit.com"),
      Tile.memoize("https://", "twitch.tv"),
      Tile.memoize("https://", "g894122r.com"),
      Tile.memoize("https://", "facebook.com"),
      Tile.memoize("https://", "y532rfd.com"),
      Tile.memoize("https://", "rdq.tdlab.ca")
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
        flex_direction: 'row',
      }
    end

  end
end
