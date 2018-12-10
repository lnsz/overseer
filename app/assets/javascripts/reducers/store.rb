require 'grand_central'

def combine_reducers(reducers)
  return lambda { |state={}, action|, return reducers.keys}
end

store = GrandCentral::Store.new(a: 1, b: 2) do |state, action|
  case action
  when :a
    # Notice we aren't updating the state in-place. We are returning a new
    # value for it by passing a new value for the :a key
    state.merge a: state[:a] + 1
  when :b
    state.merge b: state[:b] + 1
  else # Always return the given state if you aren't updating it.
    state
  end
end
