# Overseer

![Alt text](demo/overseer.gif)

## Build Setup

### build
```
./overseer build
```

### start in dev
```
./overseer start
```

### start in prod
```
MODE=prod ./overseer start
```

### stop
```
./overseer stop
```

### reset db
```
./overseer reset
```

### push to dockerhub
```
docker login docker.io
./overseer push
```

### install from dockerhub
```
docker login docker.io
./overseer install
```

### Create db backup
```
./overseer backup
```

### Restore db from backup
```
./overseer restore [filename]
```
