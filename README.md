# Ponysay.ml

A curl playground for the `ponysay` command

```
# Try it now :P
curl -X POST -d 'say=Welcome!!!' http://ponysay.ml
```

![](https://i.imgur.com/KqIiDgR.png)

```bash
curl -X POST http://ponysay.ml -d 'say=20% cooler&pony=rainbowdash'
```

## Development

Clone the git repo into your local development machine

```
git clone https://github.com/ponydevs/ponysay.ml && \
cd ponysay.ml
```

Install all the Node dependencies
```
yarn install
```

Start the local development server with Docker
```
yarn run dev:docker
```

And once you are inside the Docker container, start the Node environment
```
# Inside the Docker container
npm run dev:docker:server
```

And now you can open up a new tab inside your terminal, and start access the `localhost:3000` for the ponysay.ml server
![](https://i.imgur.com/AfcSpD9.png)