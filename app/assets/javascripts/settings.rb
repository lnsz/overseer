require 'opal'
require 'clearwater'
require 'tile'

class Settings
  include Clearwater::Component
  
  def render
    input({style: Style.input})
  end

  module Style
    module_function
    
    def input
      {
        background_color: 'rgba(100, 100, 100, 0.1)',
        border_color: 'rgba(200, 200, 200, 0.5)',
        color: 'rgba(255, 255, 255, 1)',
        width: '100%',
        margin: '20px'
      }
    end
  end
end
