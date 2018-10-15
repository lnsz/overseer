FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /api-monitor
WORKDIR /api-monitor
COPY Gemfile /api-monitor/Gemfile
COPY Gemfile.lock /api-monitor/Gemfile.lock
RUN bundle install
COPY . /api-monitor
