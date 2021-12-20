[![codecov](https://codecov.io/gh/JacobJS56/CSC3131/branch/main/graph/badge.svg?token=SDYID483YB)](https://codecov.io/gh/JacobJS56/CSC3131)

# CSC3131

In the CSC3131 module I created an application called "Fans Opinion" which is a three tier application consisting of a client, server and a MongoDB database. The application's aim is to allow fans to rate players that have played in a specific Gameweek and compare their rating with other fans by averaging the result.

## Installation

Use Git to clone the repository allowing for an editable local version of the above code.

```bash
git clone https://github.com/JacobJS56/CSC3131
```

[Docker](https://docs.docker.com/) will also need to be installed

## How to use

To run the application both Dockerfiles need to initially be built

Enter the server directory ./CSC3131/server and run

```bash
docker build -t server
```

Enter the client directory ./CSC3131/client and run

```bash
docker build -t react-docker
```

Return to the main directory in CSC3131 and run

```bash
docker-compose up
```

The application will now run using Docker containers.

## Contributing

In order to contribute you will need a local copy of the above repository and also an issue to be made to discuss further the need for a modification to take place. For example, a bug fix, new feature or UX enhancement.

Once the code changes have been made ensure to create unit tests via Jest in-order to verify the code created fulfils its purpose.

## License

[MIT](https://choosealicense.com/licenses/mit/)
