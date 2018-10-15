require 'opal' # Not necessary if you load Opal from a CDN
require 'clearwater'

class Layout
  include Clearwater::Component

  def render
    h1('Hello, world!')
  end
end

app = Clearwater::Application.new(component: Layout.new)
app.call