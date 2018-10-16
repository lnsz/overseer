require 'opal'
require 'clearwater'
require 'dashboard'
require 'header'
require 'tile'

class Layout
  include Clearwater::Component

  def render
    div({style: Style.background}, [
      Header.new,
      Dashboard.new
    ])
  end

  module Style
    module_function

    def background 
      {
        margin: 0,
        background_color: 'rgba(0, 0, 0, 1)',
        position: 'absolute',
        display: 'flex',
        flex_direction: 'column',
        top: 0, left: 0, bottom: 0, right: 0,
        width: '100%', height: '100%'
      }
    end
  end
end

app = Clearwater::Application.new(component: Layout.new)
app.call