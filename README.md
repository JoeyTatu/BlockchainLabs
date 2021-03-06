## Deterministic Wallets ##

To run a deterministic wallet:

```$node crypto/wallet.js```

## Sorting out dependencies ##

When we use a dependancy, we have to npm install it

But we can make this simplier, by using a package.json file, which remembers the dependancies. Then we
can install all dependancies by running:

```$npm install```


## Docker Commands ##

Check what docker containers are running
```$docker ps```

Check what images I have built
```$docker image ls```

Remove all docker images/networks/etc
```$docker system prune -a -f```

Build an image
```$docker build -t nci/erc20 .```

Run docker:
```$docker run --name erc20 nci/erc20```
or
```$docker run -d -p 80:80 --name erc20 nci/erc20``` (from Docker Desktop)

To kill a running docker conianter

```$docker kill <container name>```

## Docker Compose ##

To run a docker-compose instance:

```$docker-compose up```
