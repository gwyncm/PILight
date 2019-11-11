# PI Web Control
**Raspberry PI web lighting control with React and NodeJS**


This project was created to allow web based control of IOT hubs such as the HUE.  
Initial support for HUE with a plan for other hubs in future.  
The server was intended to run on Raspberry PI to allow access to PI peripherals as
well as local control via sensors and schedules. 

## Getting Started

These instructions will get the project up and running on your Raspberry PI for
testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Nodejs


### Installing

Install NodeJS on your PI

```
sudo apt install nodejs

```

Test installation

```
node --version
```
## Running the tests

npm test

### You can also access the server via http

http://x.x.x.x:8075/lights

```
<json result>

```

## Deployment

npm build

## Built With

[Create React App](https://github.com/facebook/create-react-app)  - The web framework used - See READMECRA.md

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Gwyneth C. Morrison** - *Initial work* - [gwyncm](https://github.com/gwyncm)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* [Huejay] (https://github.com/sqmk/huejay) - Excellent HUE control library


