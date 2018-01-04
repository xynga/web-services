<img src="https://s3.amazonaws.com/xynga/images/XYNGA.png" width="400" alt="Xynga Community Logo"/>

# Web Services

# Synopisis

Xynga-Web-Services is an Angular 4 library that is made up of injectable services that are easy to implement and utilize in any Angular application. Web services include making HTTP calls, Idle services and notifications, and file upload/download functionality. 

- `ApiService` - a service consisting of functions that reference `WebService` to make HTTP calls which interact with an API.
- `WebService` - a service that directly makes HTTP calls. 
- `IdleService` - a service that tracks user idleness and redirects the browser based on an idle countdown.

# Motivation

Xynga-Web-Services is one of the 7 Xynga libraries. Each of the 7 libraries are made up of components, services, and directives that were originally developed for Vertex's Country-By-Country Reporting application. They were repackaged under the Xynga name and published on npm so that they could be made available to anyone that wishes to use them in their Angular 4 application.

# Installation

To install Xynga-Web-Services, run the command <code>npm install xynga-web-services</code> from the Angular project directory that you wish to install the library to. It will then be available in the project's <code>node_modules</code> directory. All of Xynga-Web-Services' third party dependencies will be automatically downloaded and placed in the project's <code>node_modules</code> directory as well. Then, simply import <code>ServiceModule</code> (from 'xynga-web-services') to the appropriate module in the project. <br/>

Additionally, it is important that <code>"types" : ["node"]</code> and <code>"typeRoots" : ["../node_modules/@types"]</code> are added to the <code>"compilerOptions"</code> array in the project's tsconfig.app.json file, or else the project might not compile properly.
# Additional Information

Detailed descriptions on how to use each individual component and directive in Xynga-Web-Services, along with examples and APIs, can be found at [XYNGA WEBSITE]
# Contact 

If you have a question about how a particular component or directive works, or would like to report a bug, please email
xyngaba@gmail.com <br/>

Xynga website: [XYNGA WEBSITE] <br/>

github: https://www.github.com/xynga/web-services <br/>

npm: https://www.npmjs.com/package/xynga-web-services <br/>

# License 

The MIT License (MIT)

Copyright (c) 2017 [ADD NAME]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.