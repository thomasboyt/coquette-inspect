Getting detail info for an entity:

1. Flux action to openEntity(idx)
2. Send a message to the agent thru [???]
3. Agent registers a new hook in the debug loop that will send a JSON rep of the obj on each tick
    a. There's a high chance that each tick will be too much JSON serialization, so consider using https://github.com/melanke/Watch.JS or similar so it is only sent on change
    b. Could get real fancy and only send the *changed attributes*?
4. Flux action loads entity detail
