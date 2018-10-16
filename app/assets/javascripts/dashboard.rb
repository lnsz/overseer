require 'opal'
require 'clearwater'
require 'tile'

class Dashboard
  include Clearwater::Component
  
  def render
    div({style: Style.dashboard}, [
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
  end
end
