require 'opal'
require 'clearwater'

class Header
  include Clearwater::Component

  def render
    div({style: Style.header}, [
      div({style: Style.title}, [
        h1({style: Style.h1}, ["Overseer"])
      ])
    ])
  end

  module Style
    module_function

    def header 
      {
        background_color: 'rgba(20, 20, 20, 1)',
        flex: 0.1,
        display: 'flex',
        align_items: 'center',
        color: 'rgba(255, 255, 255, 1)'
      }
    end

    def title
      {
        margin_left: '20px',
        font_family: 'Trebuchet MS'
      }
    end

    def h1
      {
        margin: '0px'
      }
    end
  end
end