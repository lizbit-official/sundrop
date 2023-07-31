# Sundrop Weather

A weather app for those partial to the bleeding edge!

Live Demo: [https://sundrop.loginchanged.com](https://sundrop.loginchanged.com)

## Building 
### Production
```
npm install
npm run build
npm run start  ; to run nodejs server
```

### Development
```
npm install
npm run dev
```

## Testing
```
npm run test
```

## Deployment
The app is automatically deployed to Google App Engine via GitHub actions, whenever the `prod` branch is pushed.

## Background
I've long appreciated NOAA for their weather reporting, especially
for their chart interface which no other website seems to provide.

I decided to use their API, but since it doesn't require authentication, I implemented the 
address and place lookup using the Google Places/Maps API proxied through the backend to securely handle keys. 
The weather API isn't proxied in the traditional sense, but makes use of React Server Components.

Initially, I started this app as a separate React frontend and a NestJS backend, 
but I wanted to try out the new React Server Components and the new Next.js app router
in an attempt to offer better initial and repeat page loading times via server-side component caching. 

Admittedly, using these new technologies and having to learn the Next.js framework slowed me down considerably.
I believe that additional time and re-architecting the app to follow a more traditional approach
would ultimately lead to a better user (and developer) experience.
                                                                                  
I'm proud of the comprehensive platform I've set up with this project, although, naturally, 
there's so much more I can envision putting into this app.
