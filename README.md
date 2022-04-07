# Vue OIDC Plugin

Not sure of the best pattern for this module.  
It seems to me that defining the routes to handle the authentication logic is a good thing.  
At the same time I don't think that including the router navigation guards is appropriate
as that may make this a little too opinionated to fit everyone's needs, however, without
defining the guards here it's not quite a "drop-in" solution.  
At some point in the future this will become more clear, so expect what is here to change.
