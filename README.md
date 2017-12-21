# FlexionCodeReview

## Welcome to TryAngle

This package requires Node and will be easily installed in a Linux environment. 
To install the latest version, visit https://nodejs.org/en/download/package-manager/ and follow the instructions for your
environment. 

Once you have Node installed...
```
cd ~
git clone https://github.com/bwheel181/FlexionCodeReview.git
cd FlexionCodeReview
npm install
```
There are two versions you can run, the command line interface and a simple browser interface

To install the command line interface
```
npm run compile-cli
```
Then to run the command
```
npm run tryangle 2 2 2
```
where the last three arguments are the lengths of the triangle to test

To run the browser interface
```
npm run dev
```
Then navigate to http://localhost:8080 to view the browser interface

If you are running your environment from a hosted environment like Cloud9, the compiler will need to know the public IP 
in order to access the browser interface. To set this, add a file called `.env.development` or `.env` to the root
of the project and add the line:
```
PUBLIC=YOUR_PUBLIC_FACING_IP
```
The compiler will load any environment variables in the .env files and use those to configure the server

### Known issues
- The browser interface was completed quickly as an added feature and isn't optimized. For example it won't handle floats. The command line interface will handle floats however.
