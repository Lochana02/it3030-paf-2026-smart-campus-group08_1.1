# it3030-paf-2026-smart-campus-group-WD_08_1.1

## To run Backend only 
    .\mvnw.cmd spring-boot:run

## Installed dependencirs
    Spring Web
    Spring Security
    OAuth2 Client
    -------------------
    Spring Data MongoDB
    -------------------
    Lombok
    Validation
    -------------------
    Spring Boot DevTools

## Structure 
    Frontend
        pages = screens
        components = reusable parts
        services = API calls
        context = global state
        hooks = reusable logic
        layouts = page structure
        routes = route protection
        utils = helpers
        assets = static files

    Backend
        controller = endpoints
        service = logic
        repository = DB access
        entity = DB model
        dto = request/response data
        config = settings
        security = auth stuff
        exception = error handling
        enums = fixed values