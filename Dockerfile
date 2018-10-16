FROM ruby:2.5
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /overseer
WORKDIR /overseer
COPY Gemfile /overseer/Gemfile
COPY Gemfile.lock /overseer/Gemfile.lock
RUN bundle install
COPY . /overseer
