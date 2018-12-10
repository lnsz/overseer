FROM ruby:alpine

# Install packages
RUN apk add --update \
            build-base \
            postgresql-dev \
            tzdata \
            git \
            openssh \
            nodejs \
            paxctl
RUN paxctl -cm $(command -v ruby)
RUN paxctl -v $(command -v ruby)

# Add User
RUN addgroup -S docker && \
    adduser -S docker -G docker
USER docker

# Install rails
RUN gem install rails -v '5.1.6'

# Copy project
WORKDIR /home/docker
COPY ./ overseer

# Bundle install
WORKDIR /home/docker/overseer
RUN bundle install

# Start server
#EXPOSE 4000
CMD sleep 5 && rails db:create && rails db:migrate && rails s 