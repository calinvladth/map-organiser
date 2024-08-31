### Improvement ideas, suggestion of TODO's for this project.

#### Code quality
- [ ] Fix imports to auto import from alias
- [ ] Check typescript all over project and add / improve typing where needed
- [ ] Check html repetition and simplify by creating components
- [ ] Check typescript code simplify where needed
- [ ] Debatable, move all on:click logic to methods. Example: `<Button on:click{() => {logic}}/>` -> `<Button on:click={handleMethod}/>`
- [ ] Move all text to components. EG: `<h1> -> <Title>`, `<p> -> <Text>` This way, it's easier to have consistency all over the app.
- [ ] Replace wherever marker is named as pick.

#### Interactions quality
- [ ] Catch invalid routes in 404 page
- [ ] Save active map zoom changes. When you get back to the map, it should be as you left it. The save should be done to server
- [x] Manage map loading if you don't allow current location permissions from browser. The fallback location should be somewhere on earth
- [ ] On /map/mapId, make a view somewhere with the markers list. All markers from that map should be present both in map and in list for an easier interaction. The marker list on click should change the map location to the clicked marker
- [ ] Add number of markers on map list
- [ ] Refreshing page should not move to another page

### User Management
- [ ] Manage password reset flow
- [ ] Manage change password from account page
- [ ] Add avatar option to account. An account can upload remove an avatar
- [ ] Nested Account routes. The account page should be a view with multiple edit options. The change password form can be on a separate page. Flow: Account -> Change password -> on success redirect somewhere
- [ ] Request Account deletion. There should be an option in the account area that has a request account deletion with a textarea for details.
- [ ] Update email address. Find a way to update the email address from Account.

### Map Management
- [ ] Add option for map to make it public. This will require a route for public view where you can fetch the markers. Since it's a public view, the markers can only be read. This way, you can share a map and integrate it externally. The public path should check for map isPublic param, and based on that display the map or a 403 status code
- [ ] Improve map management flow for 

### Marker Management
- [ ] Improve marker management flow for view / create / update
- [ ] Handle view only case


