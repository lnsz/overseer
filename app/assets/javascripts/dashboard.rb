require 'opal'
require 'clearwater'
require 'tile'

class Dashboard
  include Clearwater::Component
  
  def render
    div({style: Style.dashboard}, [
      Tile.new("https://", "google.com"),
      Tile.new("https://", "googleapis.com"),
      Tile.new("https://", "github.com"),
      Tile.new("https://", "reddit.com"),
      Tile.new("https://", "twitch.tv"),
      Tile.new("https://", "g894122r.com"),
      Tile.new("https://", "facebook.com"),
      Tile.new("https://", "y532rfd.com"),
      Tile.new("https://", "instagram.com")
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
